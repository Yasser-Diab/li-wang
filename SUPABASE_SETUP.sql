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

alter table public.app_profiles enable row level security;
alter table public.app_memories enable row level security;
alter table public.app_events enable row level security;
alter table public.app_live_messages enable row level security;

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
end
$$;
