-- Fit Match · valoraciones públicas y consentimiento legal beta
-- Ejecutar en Supabase SQL Editor después de tener las tablas base creadas.

create extension if not exists pgcrypto;

create table if not exists public.profile_ratings (
  id uuid primary key default gen_random_uuid(),
  request_id uuid references public.contact_requests(id) on delete set null,
  rater_id uuid not null references public.profiles(id) on delete cascade,
  target_id uuid not null references public.profiles(id) on delete cascade,
  rater_role public.app_role not null,
  target_role public.app_role not null,
  criteria jsonb not null default '{}'::jsonb,
  average_score numeric(3,2) not null check (average_score >= 1 and average_score <= 5),
  comment text default '',
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  constraint profile_ratings_no_self_rating check (rater_id <> target_id),
  constraint profile_ratings_one_per_request unique (request_id, rater_id, target_id)
);

alter table public.profile_ratings enable row level security;

drop policy if exists "ratings are readable" on public.profile_ratings;
create policy "ratings are readable"
  on public.profile_ratings
  for select
  to authenticated
  using (true);

drop policy if exists "users insert own ratings" on public.profile_ratings;
create policy "users insert own ratings"
  on public.profile_ratings
  for insert
  to authenticated
  with check (auth.uid() = rater_id);

drop policy if exists "users update own ratings" on public.profile_ratings;
create policy "users update own ratings"
  on public.profile_ratings
  for update
  to authenticated
  using (auth.uid() = rater_id)
  with check (auth.uid() = rater_id);

drop policy if exists "users delete own ratings" on public.profile_ratings;
create policy "users delete own ratings"
  on public.profile_ratings
  for delete
  to authenticated
  using (auth.uid() = rater_id);

drop trigger if exists set_profile_ratings_updated_at on public.profile_ratings;
create trigger set_profile_ratings_updated_at
  before update on public.profile_ratings
  for each row
  execute function public.set_updated_at();

create index if not exists profile_ratings_target_idx on public.profile_ratings (target_id);
create index if not exists profile_ratings_rater_idx on public.profile_ratings (rater_id);
create index if not exists profile_ratings_request_idx on public.profile_ratings (request_id);

-- El consentimiento legal beta se guarda dentro de private_profile_data.private_notes
-- como JSON bajo la clave legalConsent, junto a otros datos privados de usuario.
