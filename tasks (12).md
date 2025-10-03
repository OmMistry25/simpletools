# MVP Build Plan

Principle: tiny tasks. Each with start and end. Test after each.

## 0. Repo and base

1. Init repo
   - Start: create Git repo with README.
   - End: Next.js 15 app created with Tailwind, shadcn, lucide.

2. Add Supabase client libs
   - Start: install `@supabase/ssr @supabase/supabase-js`.
   - End: `/lib/supabase/{server,client}.ts` return typed clients.

3. Configure env
   - Start: add `.env.local.example`.
   - End: app boots with Supabase URL and anon key.

4. Install shadcn and base UI
   - Start: run shadcn init and add Button, Card, Input, Tabs, Table, Toast.
   - End: components available and render.

## 1. Database

5. Create schema
   - Start: write `scripts/migrate.sql` with tables above.
   - End: schema applied locally via `supabase db push`.

6. Enable RLS + policies
   - Start: add policies in migrate.
   - End: RLS enabled. Auth user can CRUD own rows.

7. Seed tools catalog
   - Start: add `scripts/seed.ts`.
   - End: `tools` rows exist or static `TOOL_CATALOG` file ready.

## 2. Auth

8. Add login page
   - Start: `/app/login/page.tsx` with Supabase magic link or OAuth.
   - End: can sign in and see session.

9. Auth guard
   - Start: `components/AuthGuard.tsx`.
   - End: protects authed routes and redirects to `/login`.

## 3. Home and catalog

10. Build hero and tools grid
   - Start: `/app/page.tsx` uses `TOOL_CATALOG`.
   - End: grid cards link to routes or external URLs.

11. Tools list page
   - Start: `/app/tools/page.tsx` with filter input.
   - End: search filters in URL query param.

12. Tool detail route
   - Start: `/app/tool/[slug]/page.tsx`.
   - End: renders from catalog and provides Launch button.

## 4. QuickSave

13. Saves table wiring
   - Start: add zod schema for save.
   - End: Server Action `createSave` inserts with user_id.

14. Minimal capture page
   - Start: `/app/save/page.tsx` textarea + Save button.
   - End: saves row, toast success, clears input.

15. Dashboard list for saves
   - Start: `/app/(authed)/dashboard/saves/page.tsx`.
   - End: paginated list with search.

16. Edit and delete save
   - Start: actions `updateSave`, `deleteSave`.
   - End: inline edit, delete with confirm.

17. Bookmarklet
   - Start: generate small JS snippet that posts selected text to `/save`.
   - End: user can drag to bookmarks and capture from any page.

## 5. QR + Link

18. Slug generator and validation
   - Start: Server helper to create unique slug.
   - End: returns collision-free code.

19. Create link form
   - Start: `/app/qr/new/page.tsx` inputs: target_url, optional slug, note.
   - End: persists row in `links`.

20. Redirect handler
   - Start: `/app/api/link/[slug]/route.ts`.
   - End: 302 to target and increments counters.

21. QR preview
   - Start: client-side QR preview using `qrcode` lib.
   - End: shows live QR before save.

22. Edge Function generate-qr
   - Start: scaffold `edge-functions/generate-qr`.
   - End: POST returns PNG. Test via curl.

23. Store QR image
   - Start: on create, call Edge Function and store in `qr` bucket. Save path in row.
   - End: detail page shows downloadable QR.

24. Link analytics table write
   - Start: in redirect handler log `link_clicks` with ua and referrer.
   - End: row exists on click.

25. Link list UI
   - Start: `/dashboard/links/page.tsx`.
   - End: table with slug, target, total clicks, download QR.

## 6. DocReader

26. Storage bucket `docs`
   - Start: create private bucket.
   - End: policy allows owner read.

27. Upload UI
   - Start: `/docreader/new/page.tsx` with FileDrop.
   - End: uploads to Storage with user path and inserts `documents`.

28. Queue extraction
   - Start: create `document_extractions` row status=queued.
   - End: row created with document_id.

29. Edge Function extract-doc
   - Start: scaffold. Pull file by path. Run simple OCR.
   - End: writes `raw_json` and `fields`, status=done.

30. Poll extraction
   - Start: client polls the extraction record or uses Realtime channel.
   - End: when done, navigates to `/docreader/[id]`.

31. Display KV table
   - Start: `DocKVTable` shows fields with confidence bars.
   - End: editable cells and Save corrections action.

32. Save corrections
   - Start: `updateExtractionFields` Server Action.
   - End: `fields` updated and timestamp set.

## 7. Dashboard shell

33. Dashboard tabs
   - Start: `/dashboard/page.tsx` with Tabs to Saves, Links, Docs, Settings.
   - End: tab routing works.

34. Settings
   - Start: update profile fields and telemetry consent.
   - End: Server Action persists to `profiles`.

## 8. Analytics

35. Event helper
   - Start: `/lib/tracking.ts` server insert to `events`.
   - End: `track('view_home')` writes.

36. Wire key events
   - Start: add events on create save, create link, upload doc.
   - End: rows appear.

## 9. Access and keyboard

37. Keyboard shortcuts
   - Start: add global listener. `q` → `/save`, `l` → `/qr/new`, `d` → `/docreader/new`.
   - End: works only when inputs not focused.

38. Focus and a11y
   - Start: ensure focus rings and labels.
   - End: axe audit passes with no criticals.

## 10. Deployment

39. Configure Supabase project
   - Start: create project, run migrations, buckets, RLS.
   - End: keys stored in hosting provider.

40. Deploy Next.js
   - Start: Vercel project. Set env vars.
   - End: site live. Test end to end.

## 11. Tests

41. Unit tests for actions
   - Start: set up Vitest.
   - End: create, update, delete tests for saves and links.

42. Playwright flows
   - Start: tests for login, create save, create link, redirect.
   - End: CI green.

## 12. Polishing

43. Empty states
   - Start: add `EmptyState` to lists.
   - End: show CTA when no data.

44. Error boundaries
   - Start: route-level error.tsx for key pages.
   - End: user sees clear recovery actions.

45. Loading states
   - Start: route-level loading.tsx.
   - End: skeletons render.

## 13. Docs

46. README quickstart
   - Start: write setup steps.
   - End: teammate can run in 5 minutes.

47. Seed script
   - Start: `pnpm tsx scripts/seed.ts`.
   - End: tools catalog and demo rows inserted.

---

### Acceptance checks per tool

- QuickSave: user can save, view, edit, delete text. Works offline-friendly.
- QR/Link: user can create short link, download QR, and redirect works with click count.
- DocReader: user can upload a sample insurance card image, see extracted policy number and name, edit fields, and save.
- Dashboard: all three data types list correctly under the user.
