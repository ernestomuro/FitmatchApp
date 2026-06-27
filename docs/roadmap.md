# Roadmap de Fit Match

Este documento resume la evolución de Fit Match desde demo estática hacia producto real.

## Fase 1: Demo pública enseñable

Completada.

- Web estática desplegable en Vercel o Netlify.
- Sin perfiles de ejemplo precargados.
- Matching explicable.
- Diseño responsive.
- Separación inicial entre cliente y profesional.

## Fase 2: Base funcional con Supabase

Estado actual.

- Registro e ingreso con email y contraseña.
- Perfil cliente y perfil profesional separados por ruta, con foto pública de perfil.
- Datos privados separados de la tarjeta pública.
- Matching entre clientes y profesionales reales registrados.
- Solicitudes y propuestas guardadas en Supabase.
- Espacio personal tras iniciar sesión, bandeja de entrada y enviadas.
- Respuesta rápida dentro de Fit Match.
- Contacto directo por email, SMS o llamada si la otra persona compartió esos datos.

## Fase 3: Cuentas y seguridad

- Recuperación de contraseña.
- Edición clara de cuenta y perfil.
- Confirmaciones antes de eliminar datos.
- Revisión de políticas RLS en Supabase.
- Gestión de datos privados con mayor control para el usuario.

## Fase 4: Comunicación

- Estados: pendiente, aceptada, rechazada, cancelada.
- Chat real entre cliente y profesional.
- Notificaciones por email.
- Plantillas de primer contacto.
- Historial completo de conversación.

## Fase 5: Reservas y pagos

- Calendario de disponibilidad.
- Reserva de sesión.
- Pago inicial o suscripción.
- Historial de pagos.
- Cancelaciones y reprogramaciones.

## Fase 6: Confianza y calidad

- Verificación de profesionales.
- Reseñas.
- Valoraciones.
- Moderación de perfiles.
- Panel básico de administración.

## Recomendación técnica futura

- Frontend: mantener HTML/CSS/JS mientras el alcance sea pequeño; valorar React o Next.js si crece la complejidad.
- Backend y auth: Supabase.
- Pagos: Stripe.
- Email transaccional: Resend, Postmark o similar.
- Calendario: integración con Google Calendar en una fase posterior.
