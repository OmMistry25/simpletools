# Simple Tools Made Simple — Architecture

## Stack

- Next.js 15 App Router. React Server Components by default.
- Supabase for Postgres, Auth, Storage, Row Level Security.
- Tailwind + shadcn/ui. Lucide icons.
- Server Actions for mutations. No custom API layer unless needed.
- Edge Functions for heavy or isolated jobs:
  - `generate-qr` for QR PNG/SVG.
  - `extract-doc` for OCR and key-value parsing.
- Client libs:
  - `zustand` for thin UI state where needed.
  - `zod` for schema validation.
  - `tesseract.js` or `@tensorflow-models/ocr` in MVP if you prefer client-side OCR. Swap to server-side in `extract-doc`.
- Analytics to Postgres via `events` table.

## High-level flows

- Visitor lands on `/`. Sees tool cards. Click opens external product or an internal route.
- Auth via Supabase. Session available on server through cookies. Client gets typed user via `@supabase/ssr`.
- QuickSave:
  - User hits a minimal capture UI `/save` or browser bookmarklet that posts text to a Server Action. Text stored in `saves`.
  - Dashboard lists saves with filter and search.
- QR/Link:
  - Create short link in `links`. Optional QR generated on demand by Edge Function. QR cached in Storage.
- OnCue:
  - Marketing landing only in this repo. The Chrome extension is a separate repo. Link out. Optional settings page for hotkey and telemetry consent.
- DocReader:
  - Upload image or PDF. Run extraction. Store raw file in Storage, JSON extraction in `document_extractions`. Show parsed fields with confidence and allow corrections saved back.

## App routes and responsibilities

```
/app
  /(public)
    page.tsx                 // Hero + tools grid
    tools/
      page.tsx               // Full list view with filters
    tool/[slug]/
      page.tsx               // Detail page, CTA to launch
    login/
      page.tsx
    privacy/
      page.tsx
    terms/
      page.tsx

  /(authed)
    dashboard/
      page.tsx               // Tabs: Saves, Links, Docs, Activity
      saves/
        page.tsx
      links/
        page.tsx
      docs/
        page.tsx
      settings/
        page.tsx

    qr/
      new/page.tsx           // Create short link + QR
      [id]/page.tsx          // View link stats and download QR

    save/
      page.tsx               // Minimal capture UI. PWA-friendly.

    docreader/
      new/page.tsx           // Upload and run extraction
      [id]/page.tsx          // Extracted fields, edit and confirm

  /api                         // Only if you need route handlers beyond Server Actions
    link/[slug]/route.ts       // Redirect short links

/components
  ui/                         // shadcn components
  ToolCard.tsx
  EmptyState.tsx
  FileDrop.tsx
  QRPreview.tsx
  DocKVTable.tsx
  CopyButton.tsx
  AuthGuard.tsx

/lib
  supabase/server.ts          // createClient for server
  supabase/client.ts          // createClient for client
  db.ts                       // typed queries
  actions.ts                  // Server Actions grouped by domain
  validators.ts               // zod schemas
  storage.ts                  // helpers for Supabase Storage
  qr.ts                       // client helpers for QR previews
  parse.ts                    // document post-processing utilities
  tracking.ts                 // event logging helper

/hooks
  useToast.ts
  useConfirm.ts
  useUpload.ts
  useClipboard.ts
  useLocalSearch.ts

/styles
  globals.css
  tailwind.css

/config
  tools.ts                    // static catalog to render the grid
  constants.ts

/edge-functions
  generate-qr/index.ts        // returns PNG/SVG for input text/url
  extract-doc/index.ts        // runs OCR + field extraction, writes JSON

/types
  db.ts                       // types generated from Supabase
  domain.ts                   // app domain types

/scripts
  seed.ts                     // seed tools catalog
  migrate.sql                 // schema
```

## Data model (Supabase)

```sql
-- auth.users provided by Supabase

create table profiles (
  user_id uuid primary key references auth.users on delete cascade,
  username text unique,
  display_name text,
  avatar_url text,
  created_at timestamptz default now()
);

create table tools (
  id uuid primary key default gen_random_uuid(),
  slug text unique not null,
  name text not null,
  tagline text,
  href text,                 -- external url or internal route
  icon text,                 -- icon name
  order_index int default 0,
  created_at timestamptz default now()
);

create table saves (
  id uuid primary key default gen_random_uuid(),
  user_id uuid references auth.users on delete cascade,
  title text,
  body text not null,
  source text,               -- optional origin url
  created_at timestamptz default now()
);

create table links (
  id uuid primary key default gen_random_uuid(),
  user_id uuid references auth.users on delete cascade,
  slug text unique not null,        -- short code
  target_url text not null,
  note text,
  qr_storage_path text,             -- cached QR path
  clicks int default 0,
  created_at timestamptz default now()
);

create table link_clicks (
  id bigserial primary key,
  link_id uuid references links on delete cascade,
  ts timestamptz default now(),
  ua text,
  ip inet,
  referrer text
);

create table documents (
  id uuid primary key default gen_random_uuid(),
  user_id uuid references auth.users on delete cascade,
  file_path text not null,          -- storage path
  mime text,
  original_name text,
  created_at timestamptz default now()
);

create table document_extractions (
  id uuid primary key default gen_random_uuid(),
  document_id uuid references documents on delete cascade,
  status text check (status in ('queued','processing','done','error')) default 'queued',
  raw_json jsonb,                   -- OCR raw
  fields jsonb,                     -- normalized KV result
  error text,
  created_at timestamptz default now(),
  updated_at timestamptz default now()
);

create table events (
  id bigserial primary key,
  user_id uuid,
  name text not null,
  props jsonb,
  ts timestamptz default now()
);
```

RLS sketch:

```sql
alter table profiles enable row level security;
create policy "own profile" on profiles for all using (user_id = auth.uid());

alter table saves enable row level security;
create policy "own saves" on saves for all using (user_id = auth.uid());

alter table links enable row level security;
create policy "own links" on links for all using (user_id = auth.uid());

alter table documents enable row level security;
create policy "own docs" on documents for all using (user_id = auth.uid());

alter table document_extractions enable row level security;
create policy "own doc extractions" on document_extractions for all
using (document_id in (select id from documents where user_id = auth.uid()));
```

Storage buckets:

- `docs` public=false.
- `qr` public=true or signed URLs only.

## State management

- Server state: fetched in RSC loaders in each page. Cached by Next.js cache semantics.
- Mutations: Server Actions in `/lib/actions.ts`. They validate with zod, write to Supabase, revalidate tags.
- Client state: local UI state with React state or `zustand` where multi-component coordination is needed. No global data store.
- URL state: filters and search params in query string for shareable views.

## Services and connections

- Next.js server actions talk to Supabase PostgREST over service role on server or user session on client.
- Edge Function `generate-qr` accepts payload `{ text, format }`. Returns image stream. Called from Server Action to store in Storage and persist path on `links.qr_storage_path`.
- Edge Function `extract-doc` accepts `{ document_id, file_path }`. Pulls file from Storage with service key, runs OCR, maps fields using simple regex templates per document type. Writes JSON into `document_extractions`.
- Redirect handler `/api/link/[slug]`:
  1) look up `links.slug`, increment `clicks`, write `link_clicks`.
  2) 302 to `target_url`.

## Env

- `NEXT_PUBLIC_SUPABASE_URL`
- `NEXT_PUBLIC_SUPABASE_ANON_KEY`
- `SUPABASE_SERVICE_ROLE_KEY` server only
- `NEXT_PUBLIC_SITE_URL`
- Optional `OCR_CONCURRENCY`, `QR_DEFAULT_FORMAT`

## Tool catalog seed (example)

```ts
// /config/tools.ts
export const TOOL_CATALOG = [
  { slug: 'qr', name: 'QR + Link', tagline: 'Create short links and QR codes', href: '/qr/new', icon: 'qrcode' },
  { slug: 'save', name: 'QuickSave', tagline: 'Save any text fast', href: '/save', icon: 'bookmark' },
  { slug: 'docreader', name: 'DocReader', tagline: 'Parse insurance cards and bills', href: '/docreader/new', icon: 'file-search' },
  { slug: 'oncue', name: 'OnCue', tagline: 'AI command bar', href: 'https://useoncue.com', icon: 'command' }
];
```

## Minimal UX rules

- One click to action. No modals for primary flows.
- Keyboard first. `q` opens QuickSave, `l` opens QR tool, `d` opens DocReader.
- Accessible components. Focus rings on.

## Testing strategy

- Unit: validators, actions. Use `vitest`.
- E2E: Playwright for save, link redirect, doc upload fake.
- Database: SQL migrations idempotent. Use `snaplet` or `supabase db` for local.
