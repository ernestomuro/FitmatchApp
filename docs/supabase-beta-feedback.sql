-- Fit Match Beta Feedback
-- Cuestionario temporal para testers de beta.
--
-- Ejecutar en Supabase SQL Editor cuando quieras guardar las respuestas en remoto.
-- No modifica perfiles, matches, contactos, valoraciones ni autenticacion.

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

create table if not exists public.beta_feedback (
  id uuid primary key default gen_random_uuid(),
  user_id uuid references auth.users(id) on delete set null,
  email text,
  role text not null default 'visitor' check (role in ('client', 'professional', 'visitor')),
  profile_id uuid,
  route text,
  scores jsonb not null default '{}'::jsonb,
  comments jsonb not null default '{}'::jsonb,
  average_score numeric(3,1) not null default 0 check (average_score >= 0 and average_score <= 5),
  metadata jsonb not null default '{}'::jsonb,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

alter table public.beta_feedback enable row level security;

drop policy if exists beta_feedback_insert_own on public.beta_feedback;
create policy beta_feedback_insert_own
on public.beta_feedback
for insert
to authenticated
with check (auth.uid() = user_id);

drop policy if exists beta_feedback_read_own_or_admin on public.beta_feedback;
create policy beta_feedback_read_own_or_admin
on public.beta_feedback
for select
to authenticated
using (auth.uid() = user_id or public.is_fit_match_admin());

drop policy if exists beta_feedback_admin_update on public.beta_feedback;
create policy beta_feedback_admin_update
on public.beta_feedback
for update
to authenticated
using (public.is_fit_match_admin())
with check (public.is_fit_match_admin());

drop policy if exists beta_feedback_admin_delete on public.beta_feedback;
create policy beta_feedback_admin_delete
on public.beta_feedback
for delete
to authenticated
using (public.is_fit_match_admin());

create or replace function public.set_updated_at()
returns trigger
language plpgsql
as $$
begin
  new.updated_at = now();
  return new;
end;
$$;

drop trigger if exists set_beta_feedback_updated_at on public.beta_feedback;
create trigger set_beta_feedback_updated_at
before update on public.beta_feedback
for each row
execute function public.set_updated_at();

create index if not exists beta_feedback_user_idx on public.beta_feedback (user_id);
create index if not exists beta_feedback_role_idx on public.beta_feedback (role);
create index if not exists beta_feedback_average_idx on public.beta_feedback (average_score);
create index if not exists beta_feedback_created_at_idx on public.beta_feedback (created_at desc);

-- Desactivacion despues de la beta:
-- 1. Oculta o elimina el boton "Beta" en index.html.
-- 2. Conserva esta tabla para analisis historico o exportala antes de borrarla.
