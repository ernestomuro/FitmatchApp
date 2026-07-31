# Fit Match PRO - KORO Profile Coach y pagos futuros

## Filosofia

Fit Match PRO no compra posiciones. La compatibilidad sigue siendo el primer criterio del algoritmo. PRO debe aportar herramientas de crecimiento, confianza y analisis para que el profesional consiga mejores clientes sin alterar la calidad del match.

## Estado actual en la app

La app queda preparada con una primera capa visible solo para profesionales:

- seccion `Fit Match PRO` dentro de Cuenta profesional;
- estado visible `En construccion`;
- CTA `Quiero probar Fit Match PRO`;
- registro de interes mediante `pro_interest = true` en local/Supabase;
- mensaje de confirmacion: `Te avisaremos cuando Fit Match PRO este disponible.`;
- preview limitada de `KORO Profile Coach`;
- score visual de calidad del perfil;
- recomendaciones iniciales para mejorar perfil, confianza y conversion;
- beneficios futuros PRO listados sin activar cobros.
- catalogo interno de funciones PRO por feature;
- permisos centralizados por estado de suscripcion;
- lectura opcional de `professional_subscriptions` si la tabla existe;
- eventos internos para medir interes PRO y visitas de perfil.

No hay cobros activos. No hay Stripe activo. No hay checkout. No hay suscripcion real todavia.

## Cimientos tecnicos preparados

La base PRO se organiza por estados:

- `FREE`: profesional sin PRO.
- `INTERESTED`: profesional que ha pedido probar PRO.
- `TRIAL`: acceso beta manual o prueba futura.
- `PRO`: suscripcion activa.
- `EXPIRED`: acceso caducado.
- `CANCELLED`: suscripcion cancelada.

La app debe consultar siempre permisos por funcion, no por textos sueltos:

- `profile_score_preview`
- `basic_recommendations`
- `pro_waitlist`
- `profile_badge`
- `advanced_metrics`
- `koro_profile_coach`
- `monthly_report`
- `video_profile`
- `verification`
- `conversion_recommendations`

Regla de producto: ninguna funcion PRO debe modificar el porcentaje principal de compatibilidad. PRO puede actuar como desempate suave solo cuando la compatibilidad sea equivalente.

## KORO Profile Coach

KORO sera una herramienta IA exclusiva para profesionales PRO. Su objetivo sera analizar el perfil profesional y ayudar a mejorar visibilidad, confianza y conversion dentro de Fit Match.

Estructura preparada para analizar:

- perfil completado;
- calidad del texto de presentacion;
- especialidades;
- ciudad o zona;
- modalidad;
- fotos;
- video;
- certificaciones;
- disponibilidad;
- visitas;
- contactos;
- matches;
- conversion;
- actividad reciente.

## Reglas de acceso

- Clientes: no ven esta seccion.
- Profesionales FREE: ven Fit Match PRO en construccion, beneficios futuros, preview limitada y registro de interes.
- Profesionales INTERESTED: siguen sin pagar; queda registrado su interes para beta.
- Profesionales TRIAL: podran probar funciones PRO manualmente antes de Stripe.
- Profesionales PRO: veran analisis completo cuando el plan se active.

## Beta manual antes de pagos

Antes de conectar Stripe, conviene probar PRO con pocos profesionales reales:

1. Ejecutar `docs/supabase-pro-subscriptions.sql` cuando se decida usar tabla propia.
2. Registrar interes desde el boton actual.
3. Activar `TRIAL` manualmente desde Supabase para usuarios concretos.
4. Comprobar que el panel desbloquea metricas y KORO sin cobrar.
5. Revisar si las metricas aportan valor antes de convertirlo en producto de pago.

## Preparacion para Stripe futuro

Cuando se decida cobrar:

1. Crear producto en Stripe: Fit Match PRO mensual, 14,90 EUR.
2. Crear producto en Stripe: Fit Match PRO anual, 149 EUR.
3. Crear Supabase Edge Function `create-pro-checkout-session`.
4. Crear Supabase Edge Function `stripe-webhook`.
5. Guardar secretos en Supabase, nunca en el navegador:
   - `STRIPE_SECRET_KEY`
   - `STRIPE_WEBHOOK_SECRET`
   - `STRIPE_PRO_MONTHLY_PRICE_ID`
   - `STRIPE_PRO_YEARLY_PRICE_ID`
   - `APP_URL`
6. El webhook actualizara `professional_subscriptions` cuando Stripe confirme pago, cancelacion o expiracion.

## Cuidado legal

Antes de cobrar a usuarios reales conviene revisar textos de:

- condiciones de suscripcion;
- politica de cancelacion;
- facturacion;
- impuestos;
- responsable legal de la plataforma.
