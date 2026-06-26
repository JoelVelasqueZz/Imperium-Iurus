# IMPERIUM IURIS — Notas de arquitectura para Claude

## Stack
Next.js 15.3 App Router · TypeScript strict · Tailwind CSS · Framer Motion · Supabase · Resend

## Módulos completados

| Módulo | Estado | Descripción |
|--------|--------|-------------|
| M1 | ✅ | Sitio web público (home, nosotros, servicios, blog, contacto, agenda) |
| M2 | ✅ | Emails con Resend — confirmación al cliente + notificación al abogado |
| M3 | ✅ | Agenda online — formulario, disponibilidad, guardado en Supabase |
| M4 | ✅ | Panel admin — Auth, consultas, CMS blog, testimonios |

## Modelo de acceso de clientes

### Modelo A — ACTIVO (Fase I)
El cliente agenda citas y envía consultas **sin crear cuenta**. Flujo:
- Completa formulario en `/agenda` o `/contacto`
- Los datos se guardan en Supabase (`citas`, `consultas`)
- Recibe confirmación por email (Resend)
- El abogado gestiona todo desde `/admin/*`

### Modelo B — PLANIFICADO (Fase II)
Portal privado para clientes con autenticación propia:
- Login individual por cliente
- Historial de citas propias
- Estado del caso en tiempo real
- Subida y descarga de documentos
- Mensajería directa con el abogado
- Panel de cliente separado del panel admin

> Modelo B requiere nuevas tablas (`clientes`, `casos`, `documentos`, `mensajes`),
> roles de Supabase separados (admin vs cliente), y rutas `/cliente/*` con su propio layout.
> No implementar hasta que se complete la validación del Modelo A.

## Panel de administración

- URL de acceso: `/admin/login` — **sin enlace visible en el sitio público**
- Crear usuario admin desde: Supabase Dashboard → Authentication → Users
- Middleware en `middleware.ts` protege todas las rutas `/admin/*`:
  - Sin sesión → redirige a `/admin/login?redirect=<ruta>`
  - Con sesión en login → redirige a `/admin/agenda`
- El navbar público se oculta en `/admin/*` via `PublicShell` (no hay interferencia visual)

## Clientes Supabase

| Archivo | Clave | Uso |
|---------|-------|-----|
| `lib/supabase.ts` | `SUPABASE_SERVICE_ROLE_KEY` | Operaciones de datos admin (bypassa RLS) |
| `lib/supabase-server.ts` | `NEXT_PUBLIC_SUPABASE_ANON_KEY` | Verificación de sesión Auth en Server Components |
| `lib/supabase-browser.ts` | `NEXT_PUBLIC_SUPABASE_ANON_KEY` | Login/logout en Client Components |

## Convenciones

- Timezone Ecuador: `America/Guayaquil` (UTC-5, sin DST)
- Emails: `Promise.allSettled` + verificar `result.value.error` (Resend nunca lanza excepciones)
- Tablas Supabase: RLS habilitado + `GRANT ALL TO service_role` en todas las tablas admin
- Blog público lee solo artículos con `publicado = true`
- Testimonios públicos leen solo con `estado = 'aprobado'`
