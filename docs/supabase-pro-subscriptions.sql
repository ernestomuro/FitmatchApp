-- Fit Match PRO - estructura preparada para KORO y Stripe futuro
-- Ejecutar en Supabase SQL Editor cuando se vaya a guardar PRO en tablas propias.
-- La app actual puede funcionar sin esta tabla usando private_profile_data.

create table if not exists public.professional_subscriptions (
  user_id uuid primary key references public.profiles(id) on delete cascade,
  professional_plan text not null default 'FREE' check (professional_plan in ('FREE', 'PRO', 'TRIAL', 'EXPIRED', 'CANCELLED')),
  status text not null default 'FREE' check (status in ('FREE', 'PRO', 'EXPIRED', 'CANCELLED', 'TRIAL')),
  plan text not null default 'free',
  pro_interest boolean not null default false,
  profile_score integer not null default 0 check (profile_score >= 0 and profile_score <= 100),
  profile_recommendations text[] not null default '{}',
  stripe_customer_id text,
  stripe_subscription_id text,
  trial_started_at timestamptz,
  trial_ends_at timestamptz,
  current_period_end timestamptz,
  cancel_at_period_end boolean not null default false,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table if not exists public.professional_metrics (
  user_id uuid primary key references public.profiles(id) on delete cascade,
  visits integer not null default 0,
  match_count integer not null default 0,
  contact_count integer not null default 0,
  conversion_rate numeric(5,2) not null default 0,
  month_key text not null default to_char(now(), 'YYYY-MM'),
  updated_at timestamptz not null default now()
);

create table if not exists public.stripe_events (
  id text primary key,
  type text not null,
  payload jsonb not null,
  processed_at timestamptz not null default now()
);

alter table public.professional_subscriptions enable row level security;
alter table public.professional_metrics enable row level security;
alter table public.stripe_events enable row level security;

drop policy if exists "users read own subscription" on public.professional_subscriptions;
create policy "users read own subscription"
  on public.professional_subscriptions for select
  using (auth.uid() = user_id);

drop policy if exists "users read own metrics" on public.professional_metrics;
create policy "users read own metrics"
  on public.professional_metrics for select
  using (auth.uid() = user_id);

-- El registro de interes puede escribirse desde Edge Function o desde una politica controlada.
-- Los cobros reales y eventos de Stripe deben escribirlos Edge Functions con service role.
-- No crear politicas publicas de insert/update para pagos desde el navegador.

create index if not exists professional_subscriptions_status_idx
  on public.professional_subscriptions (status);

create index if not exists professional_subscriptions_plan_idx
  on public.professional_subscriptions (professional_plan);

create index if not exists professional_subscriptions_pro_interest_idx
  on public.professional_subscriptions (pro_interest);

create index if not exists professional_subscriptions_stripe_subscription_idx
  on public.professional_subscriptions (stripe_subscription_id);
