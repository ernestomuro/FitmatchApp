-- Fit Match · borrado completo de datos de perfil
-- Ejecutar una vez en Supabase SQL Editor.
-- Permite que cada usuario borre sus propios datos de Fit Match desde la app.
-- Nota: esto NO borra el usuario de Authentication; solo elimina perfiles, datos privados,
-- solicitudes, valoraciones y datos PRO asociados a la app.

alter table public.profiles enable row level security;
alter table public.client_profiles enable row level security;
alter table public.professional_profiles enable row level security;
alter table public.private_profile_data enable row level security;
alter table public.contact_requests enable row level security;

-- Perfil base
drop policy if exists profiles_delete_own on public.profiles;
create policy profiles_delete_own
on public.profiles
for delete
to authenticated
using (auth.uid() = id);

-- Perfil cliente
drop policy if exists client_profiles_delete_own on public.client_profiles;
create policy client_profiles_delete_own
on public.client_profiles
for delete
to authenticated
using (auth.uid() = user_id);

-- Perfil profesional
drop policy if exists professional_profiles_delete_own on public.professional_profiles;
create policy professional_profiles_delete_own
on public.professional_profiles
for delete
to authenticated
using (auth.uid() = user_id);

-- Datos privados
drop policy if exists private_profile_data_delete_own on public.private_profile_data;
create policy private_profile_data_delete_own
on public.private_profile_data
for delete
to authenticated
using (auth.uid() = user_id);

-- Solicitudes y mensajes entre dos usuarios
drop policy if exists contact_requests_participants_delete on public.contact_requests;
create policy contact_requests_participants_delete
on public.contact_requests
for delete
to authenticated
using (auth.uid() = sender_id or auth.uid() = recipient_id);

-- Valoraciones: quien valora o quien recibe la valoracion puede limpiar sus datos al borrar perfil.
alter table public.profile_ratings enable row level security;
drop policy if exists "users delete own ratings" on public.profile_ratings;
drop policy if exists profile_ratings_participants_delete on public.profile_ratings;
create policy profile_ratings_participants_delete
on public.profile_ratings
for delete
to authenticated
using (auth.uid() = rater_id or auth.uid() = target_id);

-- Tablas PRO opcionales. Si existen, tambien deben permitir borrar datos propios.
do $$
begin
  if to_regclass('public.professional_subscriptions') is not null then
    execute 'alter table public.professional_subscriptions enable row level security';
    execute 'drop policy if exists professional_subscriptions_delete_own on public.professional_subscriptions';
    execute 'create policy professional_subscriptions_delete_own on public.professional_subscriptions for delete to authenticated using (auth.uid() = user_id)';
  end if;

  if to_regclass('public.professional_metrics') is not null then
    execute 'alter table public.professional_metrics enable row level security';
    execute 'drop policy if exists professional_metrics_delete_own on public.professional_metrics';
    execute 'create policy professional_metrics_delete_own on public.professional_metrics for delete to authenticated using (auth.uid() = user_id)';
  end if;
end $$;
