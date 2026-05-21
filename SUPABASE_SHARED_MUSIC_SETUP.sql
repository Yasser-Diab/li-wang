create table if not exists public.shared_music_files (
  id text primary key,
  room_slug text not null default 'svetlana-diab',
  name text not null default 'music',
  mime_type text not null default 'audio/*',
  size_bytes bigint not null default 0,
  storage_bucket text not null default 'shared-music',
  storage_path text not null default '',
  public_url text not null default '',
  owner_key text not null default '',
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

alter table public.shared_music_files enable row level security;
grant usage on schema public to anon, authenticated;
grant select, insert, update, delete on public.shared_music_files to anon, authenticated;

drop policy if exists "shared_music_public_read" on public.shared_music_files;
create policy "shared_music_public_read"
on public.shared_music_files
for select
to anon, authenticated
using (room_slug = 'svetlana-diab');

drop policy if exists "shared_music_public_insert" on public.shared_music_files;
create policy "shared_music_public_insert"
on public.shared_music_files
for insert
to anon, authenticated
with check (room_slug = 'svetlana-diab');

drop policy if exists "shared_music_public_update" on public.shared_music_files;
create policy "shared_music_public_update"
on public.shared_music_files
for update
to anon, authenticated
using (room_slug = 'svetlana-diab')
with check (room_slug = 'svetlana-diab');

drop policy if exists "shared_music_public_delete" on public.shared_music_files;
create policy "shared_music_public_delete"
on public.shared_music_files
for delete
to anon, authenticated
using (room_slug = 'svetlana-diab');

insert into storage.buckets (
  id,
  name,
  public,
  file_size_limit,
  allowed_mime_types
)
values (
  'shared-music',
  'shared-music',
  true,
  104857600,
  array[
    'audio/aac',
    'audio/m4a',
    'audio/mp4',
    'audio/mpeg',
    'audio/mp3',
    'audio/ogg',
    'audio/wav',
    'audio/webm',
    'audio/x-m4a',
    'audio/x-wav'
  ]
)
on conflict (id) do update
set
  public = excluded.public,
  file_size_limit = excluded.file_size_limit,
  allowed_mime_types = excluded.allowed_mime_types;

drop policy if exists "shared_music_objects_public_read" on storage.objects;
create policy "shared_music_objects_public_read"
on storage.objects
for select
to anon, authenticated
using (
  bucket_id = 'shared-music'
  and split_part(name, '/', 1) = 'svetlana-diab'
);

drop policy if exists "shared_music_objects_public_insert" on storage.objects;
create policy "shared_music_objects_public_insert"
on storage.objects
for insert
to anon, authenticated
with check (
  bucket_id = 'shared-music'
  and split_part(name, '/', 1) = 'svetlana-diab'
);

drop policy if exists "shared_music_objects_public_update" on storage.objects;
create policy "shared_music_objects_public_update"
on storage.objects
for update
to anon, authenticated
using (
  bucket_id = 'shared-music'
  and split_part(name, '/', 1) = 'svetlana-diab'
)
with check (
  bucket_id = 'shared-music'
  and split_part(name, '/', 1) = 'svetlana-diab'
);

drop policy if exists "shared_music_objects_public_delete" on storage.objects;
create policy "shared_music_objects_public_delete"
on storage.objects
for delete
to anon, authenticated
using (
  bucket_id = 'shared-music'
  and split_part(name, '/', 1) = 'svetlana-diab'
);
