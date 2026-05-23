create extension if not exists pgcrypto;

create table if not exists public.app_profiles (
  id uuid primary key references auth.users (id) on delete cascade,
  user_key text not null unique check (user_key in ('svetlana', 'diab')),
  display_name text not null,
  room_slug text not null default 'svetlana-diab',
  created_at timestamptz not null default timezone('utc', now())
);

create table if not exists public.app_memories (
  id text primary key,
  room_slug text not null default 'svetlana-diab',
  sort_order integer not null default 0,
  title text not null default '',
  date_label text not null default '',
  date_value text not null default '',
  note text not null default '',
  image_data text not null default '',
  created_at timestamptz not null default timezone('utc', now())
);

create table if not exists public.app_events (
  id text primary key,
  room_slug text not null default 'svetlana-diab',
  sort_order integer not null default 0,
  is_locked boolean not null default false,
  is_custom boolean not null default false,
  title text not null default '',
  date_label text not null default '',
  date_value text not null default '',
  description text not null default '',
  created_at timestamptz not null default timezone('utc', now())
);

create table if not exists public.app_live_messages (
  id text primary key,
  room_slug text not null default 'svetlana-diab',
  sender_key text not null check (sender_key in ('svetlana', 'diab')),
  sender_name text not null,
  text text not null default '',
  created_at timestamptz not null default timezone('utc', now()),
  edited_at timestamptz,
  attachments jsonb not null default '[]'::jsonb
);

create table if not exists public.app_cycle_states (
  room_slug text primary key default 'svetlana-diab',
  cycle_data jsonb not null default '{}'::jsonb,
  updated_by text not null default '',
  updated_at timestamptz not null default timezone('utc', now())
);

create table if not exists public.app_media_files (
  id text primary key,
  room_slug text not null default 'svetlana-diab',
  category text not null check (category in ('music', 'memory-gallery', 'shared-files')),
  name text not null default '',
  mime_type text not null default 'application/octet-stream',
  size_bytes bigint not null default 0,
  storage_bucket text not null default 'app-media',
  storage_path text not null default '',
  public_url text not null default '',
  owner_key text not null default '',
  created_at timestamptz not null default timezone('utc', now()),
  updated_at timestamptz not null default timezone('utc', now())
);

create table if not exists public.app_notification_events (
  id text primary key,
  room_slug text not null default 'svetlana-diab',
  event_type text not null default 'activity',
  actor_key text not null default '',
  target_user_key text not null default '',
  message_id text not null default '',
  title text not null default '',
  body text not null default '',
  metadata jsonb not null default '{}'::jsonb,
  created_at timestamptz not null default timezone('utc', now())
);

create index if not exists app_live_messages_room_created_idx
on public.app_live_messages (room_slug, created_at desc);

create index if not exists app_media_files_room_category_created_idx
on public.app_media_files (room_slug, category, created_at desc);

create index if not exists app_notification_events_room_created_idx
on public.app_notification_events (room_slug, created_at);

create index if not exists app_notification_events_target_created_idx
on public.app_notification_events (room_slug, target_user_key, created_at desc);

alter table public.app_profiles enable row level security;
alter table public.app_memories enable row level security;
alter table public.app_events enable row level security;
alter table public.app_live_messages enable row level security;
alter table public.app_cycle_states enable row level security;
alter table public.app_media_files enable row level security;
alter table public.app_notification_events enable row level security;

grant usage on schema public to anon, authenticated;
grant select, insert, update, delete on public.app_profiles to authenticated;
grant select, insert, update, delete on public.app_memories to authenticated;
grant select, insert, update, delete on public.app_events to authenticated;
grant select, insert, update, delete on public.app_live_messages to authenticated;
grant select, insert, update, delete on public.app_cycle_states to authenticated;
grant select, insert, update, delete on public.app_media_files to authenticated;
grant select, insert, update, delete on public.app_notification_events to authenticated;

drop policy if exists "profiles_select_own" on public.app_profiles;
create policy "profiles_select_own"
on public.app_profiles
for select
to authenticated
using (auth.uid() = id);

drop policy if exists "profiles_insert_own" on public.app_profiles;
create policy "profiles_insert_own"
on public.app_profiles
for insert
to authenticated
with check (auth.uid() = id);

drop policy if exists "profiles_update_own" on public.app_profiles;
create policy "profiles_update_own"
on public.app_profiles
for update
to authenticated
using (auth.uid() = id)
with check (auth.uid() = id);

drop policy if exists "room_members_manage_memories" on public.app_memories;
create policy "room_members_manage_memories"
on public.app_memories
for all
to authenticated
using (
  exists (
    select 1
    from public.app_profiles profiles
    where profiles.id = auth.uid()
      and profiles.room_slug = app_memories.room_slug
  )
)
with check (
  exists (
    select 1
    from public.app_profiles profiles
    where profiles.id = auth.uid()
      and profiles.room_slug = app_memories.room_slug
  )
);

drop policy if exists "room_members_manage_events" on public.app_events;
create policy "room_members_manage_events"
on public.app_events
for all
to authenticated
using (
  exists (
    select 1
    from public.app_profiles profiles
    where profiles.id = auth.uid()
      and profiles.room_slug = app_events.room_slug
  )
)
with check (
  exists (
    select 1
    from public.app_profiles profiles
    where profiles.id = auth.uid()
      and profiles.room_slug = app_events.room_slug
  )
);

drop policy if exists "room_members_manage_live_messages" on public.app_live_messages;
create policy "room_members_manage_live_messages"
on public.app_live_messages
for all
to authenticated
using (
  exists (
    select 1
    from public.app_profiles profiles
    where profiles.id = auth.uid()
      and profiles.room_slug = app_live_messages.room_slug
  )
)
with check (
  exists (
    select 1
    from public.app_profiles profiles
    where profiles.id = auth.uid()
      and profiles.room_slug = app_live_messages.room_slug
  )
);

drop policy if exists "room_members_manage_cycle_states" on public.app_cycle_states;
create policy "room_members_manage_cycle_states"
on public.app_cycle_states
for all
to authenticated
using (
  exists (
    select 1
    from public.app_profiles profiles
    where profiles.id = auth.uid()
      and profiles.room_slug = app_cycle_states.room_slug
  )
)
with check (
  exists (
    select 1
    from public.app_profiles profiles
    where profiles.id = auth.uid()
      and profiles.room_slug = app_cycle_states.room_slug
  )
);

drop policy if exists "room_members_manage_media_files" on public.app_media_files;
create policy "room_members_manage_media_files"
on public.app_media_files
for all
to authenticated
using (
  exists (
    select 1
    from public.app_profiles profiles
    where profiles.id = auth.uid()
      and profiles.room_slug = app_media_files.room_slug
  )
)
with check (
  exists (
    select 1
    from public.app_profiles profiles
    where profiles.id = auth.uid()
      and profiles.room_slug = app_media_files.room_slug
  )
);

drop policy if exists "room_members_manage_notification_events" on public.app_notification_events;
create policy "room_members_manage_notification_events"
on public.app_notification_events
for all
to authenticated
using (
  exists (
    select 1
    from public.app_profiles profiles
    where profiles.id = auth.uid()
      and profiles.room_slug = app_notification_events.room_slug
  )
)
with check (
  exists (
    select 1
    from public.app_profiles profiles
    where profiles.id = auth.uid()
      and profiles.room_slug = app_notification_events.room_slug
  )
);

insert into storage.buckets (id, name, public, file_size_limit)
values ('app-media', 'app-media', true, 52428800)
on conflict (id) do update
set public = excluded.public,
    file_size_limit = excluded.file_size_limit;

drop policy if exists "room_members_upload_app_media" on storage.objects;
create policy "room_members_upload_app_media"
on storage.objects
for insert
to authenticated
with check (
  bucket_id = 'app-media'
  and exists (
    select 1
    from public.app_profiles profiles
    where profiles.id = auth.uid()
      and profiles.room_slug = split_part(storage.objects.name, '/', 1)
  )
);

drop policy if exists "room_members_update_app_media" on storage.objects;
create policy "room_members_update_app_media"
on storage.objects
for update
to authenticated
using (
  bucket_id = 'app-media'
  and exists (
    select 1
    from public.app_profiles profiles
    where profiles.id = auth.uid()
      and profiles.room_slug = split_part(storage.objects.name, '/', 1)
  )
)
with check (
  bucket_id = 'app-media'
  and exists (
    select 1
    from public.app_profiles profiles
    where profiles.id = auth.uid()
      and profiles.room_slug = split_part(storage.objects.name, '/', 1)
  )
);

drop policy if exists "room_members_delete_app_media" on storage.objects;
create policy "room_members_delete_app_media"
on storage.objects
for delete
to authenticated
using (
  bucket_id = 'app-media'
  and exists (
    select 1
    from public.app_profiles profiles
    where profiles.id = auth.uid()
      and profiles.room_slug = split_part(storage.objects.name, '/', 1)
  )
);

do $$
begin
  if not exists (
    select 1
    from pg_publication_tables
    where pubname = 'supabase_realtime'
      and schemaname = 'public'
      and tablename = 'app_live_messages'
  ) then
    alter publication supabase_realtime add table public.app_live_messages;
  end if;

  if not exists (
    select 1
    from pg_publication_tables
    where pubname = 'supabase_realtime'
      and schemaname = 'public'
      and tablename = 'app_cycle_states'
  ) then
    alter publication supabase_realtime add table public.app_cycle_states;
  end if;

  if not exists (
    select 1
    from pg_publication_tables
    where pubname = 'supabase_realtime'
      and schemaname = 'public'
      and tablename = 'app_media_files'
  ) then
    alter publication supabase_realtime add table public.app_media_files;
  end if;
end
$$;
