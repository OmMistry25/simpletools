-- Simple Tools Database Schema
-- Run this in your Supabase SQL Editor

-- Profiles table
create table if not exists profiles (
  user_id uuid primary key references auth.users on delete cascade,
  username text unique,
  display_name text,
  avatar_url text,
  created_at timestamptz default now()
);

-- Tools catalog
create table if not exists tools (
  id uuid primary key default gen_random_uuid(),
  slug text unique not null,
  name text not null,
  tagline text,
  href text,
  icon text,
  order_index int default 0,
  created_at timestamptz default now()
);

-- QuickSave saves
create table if not exists saves (
  id uuid primary key default gen_random_uuid(),
  user_id uuid references auth.users on delete cascade,
  title text,
  body text not null,
  source text,
  created_at timestamptz default now()
);

-- Short links
create table if not exists links (
  id uuid primary key default gen_random_uuid(),
  user_id uuid references auth.users on delete cascade,
  slug text unique not null,
  target_url text not null,
  note text,
  qr_storage_path text,
  clicks int default 0,
  created_at timestamptz default now()
);

-- Link click analytics
create table if not exists link_clicks (
  id bigserial primary key,
  link_id uuid references links on delete cascade,
  ts timestamptz default now(),
  ua text,
  ip inet,
  referrer text
);

-- Document uploads
create table if not exists documents (
  id uuid primary key default gen_random_uuid(),
  user_id uuid references auth.users on delete cascade,
  file_path text not null,
  mime text,
  original_name text,
  created_at timestamptz default now()
);

-- Document extraction results
create table if not exists document_extractions (
  id uuid primary key default gen_random_uuid(),
  document_id uuid references documents on delete cascade,
  status text check (status in ('queued','processing','done','error')) default 'queued',
  raw_json jsonb,
  fields jsonb,
  error text,
  created_at timestamptz default now(),
  updated_at timestamptz default now()
);

-- Analytics events
create table if not exists events (
  id bigserial primary key,
  user_id uuid,
  name text not null,
  props jsonb,
  ts timestamptz default now()
);

-- Row Level Security Policies

-- Profiles
alter table profiles enable row level security;

drop policy if exists "own profile" on profiles;
create policy "own profile" on profiles
  for all using (user_id = auth.uid());

-- Saves
alter table saves enable row level security;

drop policy if exists "own saves" on saves;
create policy "own saves" on saves
  for all using (user_id = auth.uid());

-- Links
alter table links enable row level security;

drop policy if exists "own links" on links;
create policy "own links" on links
  for all using (user_id = auth.uid());

-- Documents
alter table documents enable row level security;

drop policy if exists "own docs" on documents;
create policy "own docs" on documents
  for all using (user_id = auth.uid());

-- Document extractions
alter table document_extractions enable row level security;

drop policy if exists "own doc extractions" on document_extractions;
create policy "own doc extractions" on document_extractions
  for all using (
    document_id in (
      select id from documents where user_id = auth.uid()
    )
  );

-- Tools table is public read
alter table tools enable row level security;

drop policy if exists "public read tools" on tools;
create policy "public read tools" on tools
  for select using (true);

-- Indexes for performance
create index if not exists idx_saves_user_id on saves(user_id);
create index if not exists idx_saves_created_at on saves(created_at desc);
create index if not exists idx_links_user_id on links(user_id);
create index if not exists idx_links_slug on links(slug);
create index if not exists idx_link_clicks_link_id on link_clicks(link_id);
create index if not exists idx_documents_user_id on documents(user_id);
create index if not exists idx_document_extractions_document_id on document_extractions(document_id);
create index if not exists idx_events_user_id on events(user_id);
create index if not exists idx_events_ts on events(ts desc);

