-- Fit Match · borrado completo de cuenta de acceso
-- Ejecutar una vez en Supabase SQL Editor.
-- Permite que un usuario autenticado borre su propia cuenta de Supabase Auth
-- junto con todos sus datos de Fit Match.

create or replace function public.delete_current_user_account()
returns jsonb
language plpgsql
security definer
set search_path = public, auth
as $$
declare
  current_user_id uuid;
begin
  current_user_id := auth.uid();

  if current_user_id is null then
    raise exception 'No authenticated user';
  end if;

  if to_regclass('public.profile_ratings') is not null then
    delete from public.profile_ratings
    where rater_id = current_user_id or target_id = current_user_id;
  end if;

  if to_regclass('public.contact_requests') is not null then
    delete from public.contact_requests
    where sender_id = current_user_id or recipient_id = current_user_id;
  end if;

  if to_regclass('public.private_profile_data') is not null then
    delete from public.private_profile_data where user_id = current_user_id;
  end if;

  if to_regclass('public.client_profiles') is not null then
    delete from public.client_profiles where user_id = current_user_id;
  end if;

  if to_regclass('public.professional_profiles') is not null then
    delete from public.professional_profiles where user_id = current_user_id;
  end if;

  if to_regclass('public.professional_subscriptions') is not null then
    delete from public.professional_subscriptions where user_id = current_user_id;
  end if;

  if to_regclass('public.professional_metrics') is not null then
    delete from public.professional_metrics where user_id = current_user_id;
  end if;

  if to_regclass('public.profiles') is not null then
    delete from public.profiles where id = current_user_id;
  end if;

  delete from auth.users where id = current_user_id;

  return jsonb_build_object('deleted', true, 'user_id', current_user_id);
end;
$$;

revoke all on function public.delete_current_user_account() from public;
grant execute on function public.delete_current_user_account() to authenticated;
