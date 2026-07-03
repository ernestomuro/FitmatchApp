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

No hay cobros activos. No hay Stripe activo. No hay checkout. No hay suscripcion real todavia.

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
- Profesionales PRO: veran analisis completo cuando el plan se active.

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
