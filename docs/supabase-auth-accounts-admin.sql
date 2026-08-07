-- Fit Match · Cuentas Auth visibles para Admin
-- Objetivo:
-- 1. Registrar automaticamente cada cuenta creada en Supabase Auth.
-- 2. Permitir que el panel Admin vea cuentas aunque todavia no tengan perfil publico.
-- 3. Marcar la cuenta admin como no visible en el directorio de matches.

create extension if not exists pgcrypto;

create table if not exists public.admin_users (
  user_id uuid primary key references auth.users(id) on delete cascade,
  email text not null unique,
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

insert into public.admin_users (user_id, email)
select id, email
from auth.users
where lower(email) = lower('ernestomuro1980@gmail.com')
on conflict (user_id) do update set email = excluded.email;

create table if not exists public.app_user_accounts (
  user_id uuid primary key references auth.users(id) on delete cascade,
  email text,
  role text not null default 'visitor' check (role in ('client', 'professional', 'visitor')),
  display_name text default '',
  has_profile boolean not null default false,
  profile_saved_at timestamptz,
  metadata jsonb not null default '{}'::jsonb,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

alter table public.app_user_accounts enable row level security;

drop policy if exists app_user_accounts_read_own_or_admin on public.app_user_accounts;
create policy app_user_accounts_read_own_or_admin
on public.app_user_accounts
for select
to authenticated
using (auth.uid() = user_id or public.is_fit_match_admin());

drop policy if exists app_user_accounts_insert_own on public.app_user_accounts;
create policy app_user_accounts_insert_own
on public.app_user_accounts
for insert
to authenticated
with check (auth.uid() = user_id);

drop policy if exists app_user_accounts_update_own_or_admin on public.app_user_accounts;
create policy app_user_accounts_update_own_or_admin
on public.app_user_accounts
for update
to authenticated
using (auth.uid() = user_id or public.is_fit_match_admin())
with check (auth.uid() = user_id or public.is_fit_match_admin());

create or replace function public.sync_fit_match_auth_account()
returns trigger
language plpgsql
security definer
set search_path = public
as $$
declare
  account_role text;
  account_name text;
begin
  account_role := coalesce(new.raw_user_meta_data ->> 'role', 'visitor');
  if account_role not in ('client', 'professional', 'visitor') then
    account_role := 'visitor';
  end if;

  account_name := coalesce(new.raw_user_meta_data ->> 'display_name', '');

  insert into public.app_user_accounts (
    user_id,
    email,
    role,
    display_name,
    metadata,
    created_at,
    updated_at
  )
  values (
    new.id,
    new.email,
    account_role,
    account_name,
    coalesce(new.raw_user_meta_data, '{}'::jsonb),
    coalesce(new.created_at, now()),
    now()
  )
  on conflict (user_id) do update
  set email = excluded.email,
      role = excluded.role,
      display_name = coalesce(nullif(excluded.display_name, ''), public.app_user_accounts.display_name),
      metadata = excluded.metadata,
      updated_at = now();

  return new;
end;
$$;

drop trigger if exists fit_match_auth_account_created on auth.users;
create trigger fit_match_auth_account_created
after insert or update of email, raw_user_meta_data
on auth.users
for each row
execute function public.sync_fit_match_auth_account();

insert into public.app_user_accounts (
  user_id,
  email,
  role,
  display_name,
  metadata,
  created_at,
  updated_at
)
select
  id,
  email,
  case
    when raw_user_meta_data ->> 'role' in ('client', 'professional', 'visitor')
      then raw_user_meta_data ->> 'role'
    else 'visitor'
  end,
  coalesce(raw_user_meta_data ->> 'display_name', ''),
  coalesce(raw_user_meta_data, '{}'::jsonb),
  coalesce(created_at, now()),
  now()
from auth.users
on conflict (user_id) do update
set email = excluded.email,
    role = excluded.role,
    display_name = coalesce(nullif(excluded.display_name, ''), public.app_user_accounts.display_name),
    metadata = excluded.metadata,
    updated_at = now();

do $$
begin
  if to_regclass('public.profiles') is not null then
    alter table public.profiles
      add column if not exists directory_visible boolean not null default true;

    update public.profiles p
    set directory_visible = false
    where exists (
      select 1
      from public.admin_users au
      where au.user_id = p.id
    );

    update public.app_user_accounts a
    set has_profile = true,
        profile_saved_at = coalesce(p.updated_at, now()),
        role = p.role::text,
        display_name = coalesce(nullif(p.display_name, ''), a.display_name),
        updated_at = now()
    from public.profiles p
    where p.id = a.user_id;
  end if;
end $$;

create index if not exists app_user_accounts_role_idx
on public.app_user_accounts (role);

create index if not exists app_user_accounts_has_profile_idx
on public.app_user_accounts (has_profile);

create index if not exists app_user_accounts_updated_at_idx
on public.app_user_accounts (updated_at desc);
