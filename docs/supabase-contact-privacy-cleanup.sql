-- Fit Match · limpieza de contacto privado en solicitudes antiguas
-- Ejecutar en Supabase SQL Editor solo despues de publicar la correccion de privacidad.
--
-- Elimina marcadores heredados contact_email: y contact_phone: de contact_requests.reasons.
-- No borra solicitudes, mensajes, perfiles, matches ni valoraciones.

begin;

select count(*) as solicitudes_con_contacto_privado
from public.contact_requests
where exists (
  select 1
  from unnest(coalesce(reasons, '{}'::text[])) as reason
  where reason like 'contact_email:%'
     or reason like 'contact_phone:%'
);

update public.contact_requests
set reasons = coalesce((
  select array_agg(reason order by ordinality)
  from unnest(coalesce(reasons, '{}'::text[])) with ordinality as existing(reason, ordinality)
  where reason not like 'contact_email:%'
    and reason not like 'contact_phone:%'
), '{}'::text[])
where exists (
  select 1
  from unnest(coalesce(reasons, '{}'::text[])) as reason
  where reason like 'contact_email:%'
     or reason like 'contact_phone:%'
);

select count(*) as solicitudes_con_contacto_privado_restantes
from public.contact_requests
where exists (
  select 1
  from unnest(coalesce(reasons, '{}'::text[])) as reason
  where reason like 'contact_email:%'
     or reason like 'contact_phone:%'
);

commit;
