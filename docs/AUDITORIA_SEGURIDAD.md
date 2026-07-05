# Auditoría de seguridad y mantenibilidad — IMPERIUM IURIS

**Proyecto:** Imperium Iuris — Portal de Defensa Penal Estratégica
**Fecha de auditoría:** 04/07/2026
**Ejecutado por:** Claude Sonnet 5 (Claude Code)
**Alcance:** Repositorio completo — `app/`, `components/`, `lib/`, `middleware.ts`, `docs/sql/`
**Metodología:** 4 revisores en paralelo (rutas API, páginas/layouts, componentes, lib/config) + pase de verificación estricta de explotabilidad real sobre los hallazgos de seguridad.

Este documento resume la auditoría completa realizada y el estado de cada hallazgo **a la fecha de este archivo**. Los hallazgos ya corregidos incluyen el commit donde se resolvieron.

---

## Resumen ejecutivo

Imperium Iuris es un proyecto sólido para su tamaño: TypeScript en modo `strict`, validación con Zod en el 100% de las rutas que reciben body, separación limpia de los tres clientes de Supabase, un sistema de edición inline bien diseñado, y disciplina real en accesibilidad y performance. La auditoría encontró un bypass de autorización real (severidad bloqueante) y una serie de hallazgos de seguridad y mantenibilidad de menor impacto — la mayoría de los de seguridad **ya fueron corregidos** en la misma sesión de auditoría.

---

## ✅ Hallazgos corregidos

| # | Hallazgo | Severidad | Commit |
|---|----------|-----------|--------|
| 1 | Bypass de autorización en `app/admin/chats/[clienteId]/actions.ts` — la comprobación de admin reimplementada a mano fallaba abierta si `ADMIN_EMAIL` no estaba seteada | **Blocking** | (fix de auth, sesión 2026-07-04) |
| 2 | Filtración de `error.message` de Supabase al cliente en 11 puntos de 7 rutas `/api/admin/**` — centralizado en `lib/api-errors.ts` (`supabaseErrorResponse`) | Important | `df53a50`, `42ca36c`, `a6dcf0a` |
| 3 | Rate limit de `/api/contact` y `/api/appointments` evadible falsificando el header `X-Forwarded-For` (se leía el primer valor, controlable por el cliente) — ahora usa `x-vercel-forwarded-for`/`x-real-ip`, no spoofeables | **Critical (confirmado explotable)** | `bec8903` |
| 4 | `/api/chat/send` sin límite de tasa — un usuario autenticado podía enviar mensajes ilimitados, cada uno disparando una notificación push al admin (spam/flooding) — se agregó rate limit por `user.id` | **Critical (confirmado explotable)** | `bec8903` |

---

## ⚠️ Hallazgos pendientes (por severidad)

### Important / estructurales

| # | Hallazgo | Archivo | Nota |
|---|----------|---------|------|
| 1 | `app/mis-citas/page.tsx` usa el cliente **service_role** (bypassa RLS) para servir citas de un cliente, con `.eq('cliente_id', user.id)` como única barrera de acceso | `app/mis-citas/page.tsx:5,27-31` | No explotable hoy (el filtro usa `user.id` de sesión verificada, no input del cliente) — pero es un único punto de falla sin red de seguridad de RLS. Migrar a `createSupabaseServerClient()`. |
| 2 | Políticas RLS de `mensajes`, `citas`, `consultas`, `testimonios` **no están versionadas** en el repo (solo `push_subscriptions.sql` existe) | `docs/sql/` | No se puede verificar ni auditar su estado real desde el código. Recomendado: exportar y comitear las políticas reales de Supabase. |
| 3 | `TestimoniosAdmin.tsx` usa campos inexistentes (`calificacion`/`empresa` en vez de `estrellas`) — las estrellas nunca se muestran rellenas en el panel admin | `app/admin/testimonios/TestimoniosAdmin.tsx:6-15,96-99` | Bug funcional, no de seguridad. |
| 4 | Número de WhatsApp hardcodeado en 3 lugares en vez de usar `contacto.whatsapp` de la configuración | `appointments/route.ts:147`, `contact/route.ts:81`, `agenda/page.tsx:278` | Rompe la propagación automática de datos de contacto documentada en `CLAUDE.md`. |
| 5 | `SectionEditModal.tsx` sin `role="dialog"`, `aria-modal`, manejo de Escape ni focus trap — usado en ~20 bloques editables | `components/admin/SectionEditModal.tsx:70-77` | Accesibilidad. |
| 6 | ~250 líneas de código muerto en `lib/constants.ts` (`HOME`, `NOSOTROS`, `urgencyCases`, etc.) con comentario obsoleto que dice ser "fuente única de verdad" | `lib/constants.ts:63-170,290-430` | El contenido real vive en `CONFIG_DEFAULTS`/Supabase. |
| 7 | Módulos "server-only" (`lib/supabase.ts`, `lib/config.ts`, `lib/push.ts`) protegidos solo por comentario, sin el paquete `server-only` como guardia de build | — | Verificado: hoy ningún componente cliente los importa. Riesgo latente, no activo. |
| 8 | Falta `Content-Security-Policy` en `next.config.ts` | `next.config.ts:3-14` | Defensa en profundidad. |

### Menor impacto / no urgente

- Condición de carrera en reserva de citas (`appointments/route.ts:192-203`) — check-then-insert sin constraint único en `(fecha, hora)`. Riesgo: doble reserva del mismo horario, no fuga de datos.
- `app/api/whatsapp/webhook/route.ts:68` loguea el payload completo de Meta (posible PII en logs de la plataforma).
- Comparación de `ADMIN_EMAIL` en `lib/admin-auth.ts` sin normalizar mayúsculas/espacios (riesgo de bloqueo operativo del propio admin, no de acceso indebido).
- Duplicación de UI menor: `Field` duplicado, páginas legales con scaffolding repetido, botones de login/registro reimplementados en vez de reusar `components/ui/Button`.

---

## Calificación (al momento de la auditoría inicial, antes de los fixes de esta sesión)

| Aspecto | Nota |
|---|---|
| Calidad de código | 7/10 |
| Legibilidad | 7.5/10 |
| Mantenibilidad | 6.5/10 |
| Arquitectura | 7/10 |
| Seguridad | 6/10 → mejorada tras los 4 fixes aplicados |
| Rendimiento | 8/10 |

---

## Cómo se hizo

1. Auditoría completa del repositorio (no solo diffs) con 4 revisores especializados en paralelo, aplicando guías de arquitectura, seguridad, performance y calidad universal.
2. Revisión enfocada de seguridad con validación estricta de explotabilidad real (no solo teórica) sobre cada hallazgo de la categoría seguridad.
3. Aplicación incremental de fixes, uno por uno, con diff, verificación de tipos (`npx tsc --noEmit`) y confirmación explícita antes de cada cambio.

Este archivo debe actualizarse cada vez que se cierre o se descubra un hallazgo nuevo, para que quede como referencia viva del estado de seguridad del proyecto.
