# Auditoria funcional beta · Fit Match

## Alcance revisado

- Bandeja de contactos y agrupacion de conversaciones.
- Estados de lectura y eliminacion de mensajes.
- Flujo de valoraciones de primer contacto y servicio real.
- Persistencia local/remota de valoraciones.
- Duplicidades visuales por perfiles con varios mensajes.
- Preparacion de Supabase para diferenciar tipos de valoracion.

## Hallazgos

1. La bandeja agrupaba conversaciones usando primero el id de la solicitud/persona. Si una misma persona aparecia con mas de un id historico, se generaban varias tarjetas.
2. La seccion de valoraciones podia mostrar varias entradas del mismo usuario por el mismo motivo.
3. Al marcar un mensaje entrante como leido, la bandeja se renderizaba de nuevo y podia cerrar el desplegable que el usuario acababa de abrir.
4. Supabase no tenia una columna explicita para distinguir `first_contact` y `service`; la app lo guardaba dentro de `criteria`, pero la base quedaba menos blindada para futuras consultas.

## Cambios aplicados

- Las conversaciones ahora se agrupan por identidad canonica: email si existe, despues id, y solo al final nombre/ciudad como compatibilidad heredada.
- Las valoraciones tambien se deduplican por la identidad real de la persona, no por cada solicitud suelta.
- La lectura de mensajes actualiza el estado sin cerrar el desplegable abierto.
- El guardado remoto de valoraciones envia `rating_type` cuando la base ya lo soporta y mantiene compatibilidad con bases antiguas si todavia no existe esa columna.
- El SQL de valoraciones queda preparado para una unica valoracion por usuario evaluador, usuario evaluado y tipo de valoracion.

## Pendiente recomendado antes de beta amplia

- Ejecutar `docs/supabase-ratings-consent.sql` en Supabase para activar la columna `rating_type` y la restriccion `profile_ratings_one_per_person_type`.
- Probar con dos cuentas reales: cliente envia solicitud, profesional lee, responde, confirma primer contacto, valora, confirma servicio y vuelve a valorar.
- Revisar desde movil que cada conversacion aparece una sola vez y que el desplegable no se cierra al marcar como leido.
