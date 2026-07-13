-- Fit Match Admin Beta
-- Ejecutar en Supabase SQL Editor despues de crear la cuenta auth:
-- email: ernestomuro1980@gmail.com
-- password: fitmatchadmin

create extension if not exists pgcrypto;

create table if not exists public.admin_users (
  user_id uuid primary key references auth.users(id) on delete cascade,
  email text not null unique,
  created_at timestamptz not null default now()
);

create table if not exists public.app_events (
  id uuid primary key default gen_random_uuid(),
  user_id uuid references auth.users(id) on delete set null,
  email text,
  event_type text not null,
  metadata jsonb not null default '{}'::jsonb,
  created_at timestamptz not null default now()
);

create or replace function public.is_fit_match_admin()
returns boolean
language sql
stable
security definer
set search_path = public
as $$
  select exists (
    select 1
    from public.admin_users au
    where au.user_id = auth.uid()
       or lower(au.email) = lower(coalesce(auth.jwt() ->> 'email', ''))
  );
$$;

alter table public.admin_users enable row level security;
alter table public.app_events enable row level security;

drop policy if exists admin_users_admin_read on public.admin_users;
create policy admin_users_admin_read
on public.admin_users
for select
to authenticated
using (public.is_fit_match_admin());

drop policy if exists app_events_insert_own on public.app_events;
create policy app_events_insert_own
on public.app_events
for insert
to authenticated
with check (auth.uid() = user_id);

drop policy if exists app_events_admin_read on public.app_events;
create policy app_events_admin_read
on public.app_events
for select
to authenticated
using (public.is_fit_match_admin());

drop policy if exists contact_requests_admin_read on public.contact_requests;
create policy contact_requests_admin_read
on public.contact_requests
for select
to authenticated
using (public.is_fit_match_admin());

create index if not exists app_events_user_id_idx
on public.app_events (user_id);

create index if not exists app_events_event_type_idx
on public.app_events (event_type);

create index if not exists app_events_created_at_idx
on public.app_events (created_at desc);

insert into public.admin_users (user_id, email)
select id, email
from auth.users
where lower(email) = lower('ernestomuro1980@gmail.com')
on conflict (user_id) do update set email = excluded.email;
