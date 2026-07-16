-- Fit Match Admin V2 · Analitica, denuncias, moderacion y salud de beta
-- Ejecutar en Supabase SQL Editor despues de tener creada/iniciada la cuenta admin:
-- email: ernestomuro1980@gmail.com
--
-- Este archivo complementa docs/supabase-admin-beta.sql.
-- No elimina datos existentes. Crea tablas nuevas y politicas RLS para panel admin V2.

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

create table if not exists public.profile_reports (
  id uuid primary key default gen_random_uuid(),
  reporter_id uuid references auth.users(id) on delete set null,
  reporter_email text,
  reporter_name text,
  target_id uuid,
  target_role public.app_role,
  target_name text,
  target_email text,
  reason text not null default 'otro',
  description text default '',
  status text not null default 'pendiente' check (status in ('pendiente', 'en_revision', 'requiere_informacion', 'resuelta', 'descartada')),
  priority text not null default 'media' check (priority in ('baja', 'media', 'alta', 'critica')),
  moderator_id uuid references auth.users(id) on delete set null,
  resolution text default '',
  internal_notes text default '',
  metadata jsonb not null default '{}'::jsonb,
  resolved_at timestamptz,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  constraint profile_reports_no_self_report check (reporter_id is null or target_id is null or reporter_id <> target_id)
);

create table if not exists public.moderation_actions (
  id uuid primary key default gen_random_uuid(),
  report_id uuid references public.profile_reports(id) on delete set null,
  target_id uuid,
  moderator_id uuid references auth.users(id) on delete set null,
  action_type text not null,
  notes text default '',
  metadata jsonb not null default '{}'::jsonb,
  created_at timestamptz not null default now()
);

alter table public.admin_users enable row level security;
alter table public.profile_reports enable row level security;
alter table public.moderation_actions enable row level security;

-- Admin users: solo admins pueden leer la lista de administradores.
drop policy if exists admin_users_admin_read on public.admin_users;
create policy admin_users_admin_read
on public.admin_users
for select
to authenticated
using (public.is_fit_match_admin());

-- Denuncias: usuarios autenticados crean sus propias denuncias.
drop policy if exists profile_reports_insert_own on public.profile_reports;
create policy profile_reports_insert_own
on public.profile_reports
for insert
to authenticated
with check (auth.uid() = reporter_id);

-- Denuncias: un usuario puede leer las denuncias que ha enviado; admin puede leer todas.
drop policy if exists profile_reports_read_own_or_admin on public.profile_reports;
create policy profile_reports_read_own_or_admin
on public.profile_reports
for select
to authenticated
using (auth.uid() = reporter_id or public.is_fit_match_admin());

-- Denuncias: solo admin puede cambiar estado, prioridad, notas internas y resolucion.
drop policy if exists profile_reports_admin_update on public.profile_reports;
create policy profile_reports_admin_update
on public.profile_reports
for update
to authenticated
using (public.is_fit_match_admin())
with check (public.is_fit_match_admin());

-- Moderacion: solo admin puede leer y crear acciones de moderacion.
drop policy if exists moderation_actions_admin_read on public.moderation_actions;
create policy moderation_actions_admin_read
on public.moderation_actions
for select
to authenticated
using (public.is_fit_match_admin());

drop policy if exists moderation_actions_admin_insert on public.moderation_actions;
create policy moderation_actions_admin_insert
on public.moderation_actions
for insert
to authenticated
with check (public.is_fit_match_admin());

-- Permisos de lectura admin complementarios. No sustituyen politicas existentes.
do $$
begin
  if to_regclass('public.profiles') is not null then
    drop policy if exists profiles_admin_read on public.profiles;
    create policy profiles_admin_read on public.profiles for select to authenticated using (public.is_fit_match_admin());
  end if;

  if to_regclass('public.client_profiles') is not null then
    drop policy if exists client_profiles_admin_read on public.client_profiles;
    create policy client_profiles_admin_read on public.client_profiles for select to authenticated using (public.is_fit_match_admin());
  end if;

  if to_regclass('public.professional_profiles') is not null then
    drop policy if exists professional_profiles_admin_read on public.professional_profiles;
    create policy professional_profiles_admin_read on public.professional_profiles for select to authenticated using (public.is_fit_match_admin());
  end if;

  if to_regclass('public.private_profile_data') is not null then
    drop policy if exists private_profile_data_admin_read on public.private_profile_data;
    create policy private_profile_data_admin_read on public.private_profile_data for select to authenticated using (public.is_fit_match_admin());
  end if;

  if to_regclass('public.contact_requests') is not null then
    drop policy if exists contact_requests_admin_read on public.contact_requests;
    create policy contact_requests_admin_read on public.contact_requests for select to authenticated using (public.is_fit_match_admin());
  end if;

  if to_regclass('public.profile_ratings') is not null then
    drop policy if exists profile_ratings_admin_read on public.profile_ratings;
    create policy profile_ratings_admin_read on public.profile_ratings for select to authenticated using (public.is_fit_match_admin());
  end if;

  if to_regclass('public.app_events') is not null then
    drop policy if exists app_events_admin_read on public.app_events;
    create policy app_events_admin_read on public.app_events for select to authenticated using (public.is_fit_match_admin());
  end if;
end $$;

create or replace function public.set_updated_at()
returns trigger
language plpgsql
as $$
begin
  new.updated_at = now();
  return new;
end;
$$;

-- Updated_at automatico para denuncias.
drop trigger if exists set_profile_reports_updated_at on public.profile_reports;
create trigger set_profile_reports_updated_at
before update on public.profile_reports
for each row
execute function public.set_updated_at();

create index if not exists profile_reports_status_idx on public.profile_reports (status);
create index if not exists profile_reports_priority_idx on public.profile_reports (priority);
create index if not exists profile_reports_reason_idx on public.profile_reports (reason);
create index if not exists profile_reports_target_idx on public.profile_reports (target_id);
create index if not exists profile_reports_reporter_idx on public.profile_reports (reporter_id);
create index if not exists profile_reports_created_at_idx on public.profile_reports (created_at desc);
create index if not exists moderation_actions_report_idx on public.moderation_actions (report_id);
create index if not exists moderation_actions_target_idx on public.moderation_actions (target_id);
create index if not exists moderation_actions_created_at_idx on public.moderation_actions (created_at desc);

-- Reglas de reputacion usadas por la app en beta:
-- Atencion: minimo 3 valoraciones y media inferior a 2.5/5.
-- Alta: minimo 5 valoraciones y media inferior a 2/5.
-- Critica: minimo 10 valoraciones y media igual o inferior a 1.5/5,
--          o combinacion de valoraciones bajas y denuncias graves.

-- Nota: una app estatica no debe exponer secretos de servicio.
-- Las decisiones sensibles deben quedarse protegidas por estas politicas RLS y revision humana.
