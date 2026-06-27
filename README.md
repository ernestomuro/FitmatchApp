# Fit Match

Fit Match es una primera versión funcional de una web app para conectar clientes con entrenadores, nutricionistas, fisioterapeutas y profesionales fitness mediante afinidad de perfil.

Esta versión permite crear cuentas reales con Supabase, registrar perfiles de cliente o profesional, calcular matches entre ambos lados y preparar solicitudes de contacto.

## Qué incluye

- Landing funcional con propuesta clara de producto.
- Rutas separadas para cliente y profesional.
- Registro e ingreso con email y contraseña mediante Supabase.
- Perfil cliente y perfil profesional con foto pública y datos privados separados de la tarjeta pública.
- Matching por objetivo, modalidad, nivel, ciudad, servicios, deporte y observaciones.
- Listado de perfiles compatibles sin datos de ejemplo precargados.
- Orden por afinidad, precio/presupuesto o fecha de creación.
- Perfil completo en modal desplazable y espacio personal al iniciar sesión.
- Solicitudes, propuestas, bandeja de entrada y respuesta rápida.
- Contacto directo por email, SMS o llamada cuando la otra persona ha compartido esos datos.
- Diseño responsive para móvil y escritorio.
- Estructura preparada para desplegar en Vercel o Netlify.

## Estructura

```text
.
├── index.html
├── assets
│   ├── css
│   │   ├── styles.css
│   │   └── premium-style.css
│   └── js
│       ├── app.js
│       ├── dataProvider.js
│       ├── data.js
│       └── supabaseConfig.js
├── docs
│   └── roadmap.md
├── netlify.toml
├── package.json
├── vercel.json
└── README.md
```

## Abrir localmente

Opción recomendada:

```bash
npm run dev
```

Después abre:

```text
http://localhost:4173
```

También puedes abrir `index.html` directamente en el navegador, aunque para probar Supabase y navegación real es mejor usar `npm run dev`.

## Desplegar en Vercel

1. Sube el proyecto a GitHub.
2. En Vercel, crea un nuevo proyecto desde ese repositorio.
3. Usa esta configuración:
   - Framework Preset: `Other`
   - Build Command: vacío
   - Output Directory: `.`
4. Publica.

El archivo `vercel.json` ya deja la app preparada para servir archivos estáticos.

## Desplegar en Netlify

1. Sube el proyecto a GitHub.
2. En Netlify, crea un nuevo sitio desde ese repositorio.
3. Usa esta configuración:
   - Build command: vacío
   - Publish directory: `.`
4. Publica.

El archivo `netlify.toml` ya define la publicación estática.

## Supabase

La conexión pública está configurada en `assets/js/supabaseConfig.js` y la UI accede a los datos a través de `assets/js/dataProvider.js`.

La app separa datos públicos y privados:

- Tarjetas públicas: nombre, ciudad, objetivo, modalidad, nivel, servicios, deporte, disponibilidad, bio y notas de afinidad.
- Datos privados: email, teléfono y fecha de nacimiento.
- Contacto: email y teléfono solo se comparten dentro de solicitudes o propuestas recibidas.

## Próximas fases

La app queda lista para evolucionar hacia:

- Recuperación de contraseña.
- Estados de solicitud: aceptada, rechazada o cancelada.
- Chat real.
- Notificaciones por email.
- Pagos.
- Calendario y reservas.
- Panel de administración.

Ver más detalle en `docs/roadmap.md`.
