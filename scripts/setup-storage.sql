-- Storage Buckets Setup
-- Run this in your Supabase SQL Editor or via the Supabase Dashboard

-- Create docs bucket (private)
insert into storage.buckets (id, name, public)
values ('docs', 'docs', false)
on conflict (id) do nothing;

-- Create qr bucket (public)
insert into storage.buckets (id, name, public)
values ('qr', 'qr', true)
on conflict (id) do nothing;

-- Storage policies for docs bucket
create policy "Users can upload their own docs"
on storage.objects for insert
to authenticated
with check (
  bucket_id = 'docs' and
  (storage.foldername(name))[1] = auth.uid()::text
);

create policy "Users can read their own docs"
on storage.objects for select
to authenticated
using (
  bucket_id = 'docs' and
  (storage.foldername(name))[1] = auth.uid()::text
);

create policy "Users can delete their own docs"
on storage.objects for delete
to authenticated
using (
  bucket_id = 'docs' and
  (storage.foldername(name))[1] = auth.uid()::text
);

-- Storage policies for qr bucket (public read, authenticated write)
create policy "Anyone can read QR codes"
on storage.objects for select
to public
using (bucket_id = 'qr');

create policy "Authenticated users can upload QR codes"
on storage.objects for insert
to authenticated
with check (bucket_id = 'qr');

create policy "Users can delete their own QR codes"
on storage.objects for delete
to authenticated
using (
  bucket_id = 'qr' and
  (storage.foldername(name))[1] = auth.uid()::text
);

