# Documentación del Proyecto — Imperium Iuris

> Este documento explica **qué es** Imperium Iuris y **cómo está construido**, pensado para quien se une al proyecto por primera vez. Para instrucciones de instalación, variables de entorno y despliegue, ver la guía del programador (`docs/GUIA_PROGRAMADOR.md`). Para cómo operar el panel día a día, ver el manual de usuario.
>
> La referencia técnica de trabajo para el día a día de desarrollo (convenciones, rutas exactas, esquema de Supabase) vive en `CLAUDE.md`, en la raíz del repo — este documento la complementa en forma de recorrido narrativo, no la reemplaza.

## Qué es Imperium Iuris

Imperium Iuris es el portal web de un despacho de defensa penal estratégica: sitio público de captación de clientes, un sistema de agenda de citas, un panel de administración para el equipo del despacho, y un portal privado donde los clientes ya registrados pueden hacer seguimiento de sus casos y chatear en tiempo real con su abogado.

**Producción:** https://imperiumiuris.ec

**Stack:** Next.js 15.3 (App Router) · TypeScript en modo `strict` · Tailwind CSS · Framer Motion · Supabase (base de datos, auth, storage, realtime) · Resend (emails transaccionales) · Vercel (hosting).

## Estado actual

| Módulo | Estado | Qué hace |
|--------|--------|----------|
| Sitio web público | ✅ | Home, Nosotros, Servicios, Blog, Contacto, Agenda |
| Emails automáticos | ✅ | Confirmación al cliente + notificación al abogado (Resend) |
| Agenda online | ✅ | Reserva de citas con disponibilidad en tiempo real |
| Panel de administración | ✅ | Auth, gestión de citas/consultas, CMS de blog, moderación de testimonios |
| Portal de cliente | ✅ | Login con Google, chat en tiempo real, historial de citas, 2FA opcional |
| Edición inline | ✅ | El admin edita textos e imágenes del sitio público sin tocar código |
| Notificaciones push | ✅ | El admin recibe una notificación del navegador ante cita/consulta/mensaje nuevo |

El detalle de qué falta o quedó a medias está en la sección **"Módulos y estado del proyecto"** más abajo.

---

## Recorrido del sitio público

Todas las páginas públicas leen su contenido editable (títulos, textos, imágenes) de la tabla `configuracion` de Supabase a través de `getSiteConfig()` — ver la sección "Arquitectura y flujos clave" para el detalle de cómo funciona la edición en vivo.

### Home (`/`)

La página de aterrizaje: hero con la propuesta de valor del despacho, bloque de confianza (`trust_block`), áreas de práctica (`services_block`), bloque de urgencia con los tres escenarios más comunes por los que alguien contacta a un abogado penalista (`urgency_block`), diferenciales del despacho (`differential_block`), testimonios de clientes (`testimonials_block`, solo lee testimonios con `estado = 'aprobado'`), preview de los últimos artículos del blog, y una llamada a la acción final (`final_cta`).

![Home](attachments/home-hero.png)

### Nosotros (`/nosotros`)

Página institucional: apertura/misión, filosofía de trabajo, por qué elegir al despacho, presentación del equipo, metodología de trabajo en 6 pasos, compromiso de confidencialidad, y una llamada a la acción de cierre. Todo editable vía inline editing (`nosotros_page`, `por_que_block`, `equipo_block`, `metodologia_block`, `confidencialidad_block`, `cta_nosotros`).

![Nosotros](attachments/nosotros.png)

### Servicios (`/servicios`)

Detalle de las áreas de práctica del despacho.

![Servicios](attachments/servicios.png)

### Blog (`/blog` y `/blog/[slug]`)

Blog jurídico. El listado (`/blog`) lee de la tabla `articulos` en Supabase, solo artículos con `publicado = true`. Cada artículo individual (`/blog/[slug]`) se identifica por su `slug` único y su contenido se guarda en Markdown, sanitizado antes de renderizarse (`lib/sanitize.ts`).

![Blog](attachments/blog-listado.png)

### Contacto (`/contacto`)

Formulario de consulta general. Al enviarse, guarda el registro en la tabla `consultas`, dispara un email de confirmación al cliente y una notificación al abogado (ambos vía Resend, `Promise.allSettled` — un fallo de email no bloquea el guardado), y está protegido por rate limiting (`lib/rate-limit.ts`) para evitar spam.

![Contacto](attachments/contacto.png)

### Agenda (`/agenda`)

Formulario de reserva de citas. Calcula disponibilidad en tiempo real según el horario de citas configurado (`horario_citas`) y los días festivos (`festivos`), respetando la zona horaria de Ecuador (`America/Guayaquil`, sin horario de verano). Igual que Contacto, guarda en Supabase (tabla `citas`) y dispara los emails correspondientes.

![Agenda](attachments/agenda.png)

---

## Portal de cliente

A diferencia del sitio público, estas páginas requieren que el visitante inicie sesión. El proyecto usa un único proyecto de Supabase Auth tanto para clientes como para el admin (ver "Arquitectura y flujos clave" para cómo se distinguen).

### Ingreso (`/login`)

Dos formas de iniciar sesión: con Google OAuth (el callback en `/auth/callback` intercambia el código de Google por una sesión de Supabase), o con correo y contraseña, con un enlace a `/registro` para crear cuenta nueva. Solo el login por contraseña pasa por la verificación en dos pasos descrita abajo — el login con Google no la dispara.

![Login cliente](attachments/login-cliente.png)

### Verificación en dos pasos (`/cuenta/seguridad`)

El cliente puede activar opcionalmente un segundo factor de autenticación (TOTP, usando el soporte nativo de MFA de Supabase Auth — compatible con apps como Google Authenticator) desde `/cuenta/seguridad`. Si lo activa, el login por correo y contraseña pide el código de 6 dígitos después de validar la contraseña (a menos que el dispositivo ya esté marcado como confiable); el login con Google no pasa por esta verificación. Permite generar el código QR/secreto, verificar el primer código para activarlo, o desactivarlo.

Para no pedir el código en cada inicio de sesión desde el mismo navegador, existe un mecanismo de **dispositivo confiable** (`lib/trusted-device.ts` y `lib/trusted-device-server.ts`): al verificar el 2FA una vez, el servidor emite un token firmado que el navegador guarda en `localStorage`; en logins posteriores, el navegador manda ese token a `/api/auth/trusted-device/verify` y, si es válido, se salta el paso del código.

### Chat con el abogado (`/chat`)

Mensajería en tiempo real entre el cliente y el abogado, usando Supabase Realtime sobre la tabla `mensajes`. El admin ve y responde estos chats desde `/admin/chats`.

![Chat cliente](attachments/chat-cliente.png)

### Mis citas (`/mis-citas`)

Historial de las citas agendadas por el cliente autenticado (se asocian por `cliente_id`, la columna que conecta `citas` con `auth.users`).

![Mis citas](attachments/mis-citas.png)

---

## Panel de administración

Todas las rutas bajo `/admin/*` requieren sesión con `role === 'admin'` (o el correo configurado en `ADMIN_EMAIL`) — el `middleware.ts` redirige a `/admin/login` si no hay sesión válida.

### Agenda (`/admin/agenda`)

Ver y gestionar todas las citas agendadas: cambiar su estado entre `pendiente`, `confirmada` y `cancelada`.

![Panel — Agenda](attachments/admin-agenda.png)

### Consultas (`/admin/contacto`)

Leer los mensajes recibidos por el formulario de contacto y marcarlos como `nuevo`, `leido`, `respondido` o `archivado`.

### Blog (`/admin/blog`)

CMS del blog: crear, editar y publicar/despublicar artículos, con un editor de texto enriquecido (TipTap).

![Panel — Blog](attachments/admin-blog.png)

### Testimonios (`/admin/testimonios`)

Aprobar o rechazar los testimonios enviados por clientes antes de que aparezcan en el sitio público (solo se muestran los que tienen `estado = 'aprobado'`).

### Chats (`/admin/chats` y `/admin/chats/[clienteId]`)

Lista de conversaciones de clientes y la vista de chat individual para responder — la contraparte de `/chat` en el portal de cliente.

### Configuración (`/admin/configuracion`)

Configuraciones técnicas del sitio que no son parte de la edición inline: datos de contacto (WhatsApp, teléfono, correo, dirección), redes sociales, horario de atención (controla el botón flotante) y horario de citas + días festivos.

![Panel — Configuración](attachments/admin-configuracion.png)

> El resto del contenido del sitio (textos, imágenes de hero, testimonios destacados, etc.) no se edita aquí — se edita directamente sobre el sitio público con el modo de edición inline. Ver la siguiente sección.

---

## Arquitectura y flujos clave

### Dos formas de editar el sitio

El contenido del sitio se edita de dos maneras distintas, según qué tan "técnico" sea el campo:

1. **Panel `/admin/configuracion`** — para datos de contacto, redes sociales, horarios y festivos: configuración que no tiene sentido editar visualmente sobre la página.
2. **Edición inline** — para todo lo demás (títulos, textos, imágenes de cada sección del sitio). El admin activa un toggle de "modo edición" en el navbar, aparece un botón "Editar" sobre cada sección, y los cambios se guardan directo en Supabase y se reflejan en todo el sitio al instante.

Ambas formas terminan escribiendo en la misma tabla `configuracion` (columnas `clave` / `valor jsonb`), y el sitio siempre lee de ahí — no hay contenido hardcodeado en el código para lo que es editable.

**El flujo de lectura**, de servidor a componente:

```
Supabase (tabla configuracion)
    ↓
getSiteConfig() — lib/config.ts (se ejecuta en el servidor, ej. en app/layout.tsx)
    ↓
<ConfigProvider config={config}> — components/providers/ConfigProvider.tsx (Contexto de React)
    ↓
useSiteConfig() — hook para leer la config en cualquier componente cliente
useUpdateConfig() — hook para reflejar un cambio guardado sin esperar un refresh completo
```

`ConfigProvider` envuelve toda la app desde `app/layout.tsx`. Cualquier componente, sin importar qué tan anidado esté, puede llamar a `useSiteConfig()` y leer la config actual sin pasarla por props manualmente en cada nivel — es exactamente para eso que existe un Context de React.

### Notificaciones push al admin

El admin puede activar notificaciones del navegador (sin depender de Firebase ni de un servicio externo, usando la Web Push API nativa) desde un toggle en la barra de navegación del panel. Una vez activado, el navegador queda suscrito y el servidor le avisa de eventos nuevos aunque el panel no esté abierto: mensaje de chat, cita nueva, consulta nueva.

```
Toggle en el panel → pide permiso al navegador → se suscribe → guarda la suscripción en Supabase
                                                                        ↓
                                          Evento nuevo (chat / cita / consulta)
                                                                        ↓
                                          sendPushToAdmin() — lib/push.ts → notificación en el navegador del admin
```

Si el envío a una suscripción falla porque expiró, se borra automáticamente — y un fallo al notificar nunca bloquea el guardado del registro principal (cita, consulta o mensaje), es siempre "mejor esfuerzo".

### Autenticación: un solo proyecto para admin y clientes

Imperium Iuris no tiene dos sistemas de auth separados — usa un único proyecto de Supabase Auth, y distingue quién es admin por metadata:

```
Admin:    user.app_metadata.role === 'admin'  (o su correo coincide con ADMIN_EMAIL)
Cliente:  cualquier otro usuario autenticado (Google OAuth, sin ese rol)
```

El `middleware.ts` es el único punto que aplica esta regla: exige sesión de admin para `/admin/*`, exige cualquier sesión para `/chat` y `/mis-citas`, y redirige a login si falta.

### Los tres clientes de Supabase

El proyecto usa tres formas distintas de hablar con Supabase, cada una con un propósito distinto:

| Cliente | Dónde vive | Para qué |
|---------|-----------|----------|
| Service role | `lib/supabase.ts` | Operaciones de admin que necesitan saltarse RLS — solo se usa en el servidor |
| Servidor (anon) | `lib/supabase-server.ts` | Verificar sesión en Server Components y Route Handlers |
| Navegador (anon) | `lib/supabase-browser.ts` | Login/logout y Realtime desde componentes de cliente (singleton) |

### Mapa de llamadas del código

Para entender rápidamente qué archivo llama a qué sin leer todo el repo, hay un análisis de call-graph generado con la herramienta `noodles` (MCP): **https://fascinating-dasik-c50921.netlify.app/**

Es un snapshot estático del código al 2026-07-06 — si el código cambió mucho desde entonces, puede estar desactualizado. Además tiene una limitación conocida: no resuelve el alias de TypeScript `@/*` que usa casi todo el código del proyecto, así que varias funciones muy usadas (como `getSiteConfig` o `ConfigProvider`) aparecen ahí como "sin conexiones" aunque en la realidad se usan en decenas de archivos. Ver `CLAUDE.md`, sección "Análisis de call graph con noodles", para el detalle completo de esta limitación.

---

## Modelo de datos

Todo vive en un único proyecto de Supabase. Siete tablas:

| Tabla | Qué guarda |
|-------|-----------|
| `configuracion` | Todo el contenido editable del sitio (ver "Arquitectura y flujos clave"). Sin RLS — solo se accede vía `service_role`. |
| `citas` | Citas agendadas desde `/agenda`. Cada una puede o no estar asociada a un cliente autenticado (`cliente_id`, se pone en `NULL` si el cliente borra su cuenta). |
| `consultas` | Mensajes del formulario de `/contacto`. Algunas están marcadas `confidencial` — hay que tratarlas con cuidado (ver la nota de privacidad en el anexo de capturas). |
| `articulos` | Artículos del blog. Solo los `publicado = true` son visibles públicamente. |
| `testimonios` | Testimonios de clientes. Solo los `estado = 'aprobado'` aparecen en el sitio. |
| `mensajes` | Chat en tiempo real entre cliente y abogado. Cada mensaje pertenece a un `cliente_id` y tiene un `remitente` (`'cliente'` o `'abogado'`). |
| `push_subscriptions` | Suscripciones de Web Push del navegador del admin. Sin políticas de RLS — acceso solo vía `service_role`, mismo patrón que `configuracion`. |

Todas tienen RLS (Row Level Security) habilitado excepto `configuracion`; `push_subscriptions` lo tiene habilitado pero sin políticas propias, por lo que en la práctica solo `service_role` puede acceder. Una convención importante del proyecto: cualquier tabla nueva necesita un `GRANT` explícito a `service_role` (o `authenticated`, según el caso) — Supabase no da acceso por defecto solo por tener RLS habilitado, y si el código hace `upsert(...)`, el `GRANT` necesita incluir `UPDATE` además de `INSERT`/`SELECT`, porque Postgres lo exige para resolver el `ON CONFLICT DO UPDATE`. El detalle completo de columnas está en `CLAUDE.md`, sección "Tablas Supabase".

---

## Módulos y estado del proyecto

### Completado

| Módulo | Descripción |
|--------|-------------|
| M1 — Sitio web público | Home, Nosotros, Servicios, Blog, Contacto, Agenda |
| M2 — Emails automáticos | Confirmación al cliente + notificación al abogado (Resend) |
| M3 — Agenda online | Reserva de citas con disponibilidad en tiempo real |
| M4 — Panel de administración | Auth, gestión de citas/consultas, CMS de blog, moderación de testimonios |
| Portal de cliente | Login Google OAuth, 2FA opcional + dispositivo confiable, chat en tiempo real, historial de citas |
| Edición inline | Edición en vivo de textos e imágenes desde el sitio público |
| Notificaciones push | Web Push nativo al admin ante cita/consulta/mensaje nuevo |

### Parcial

| Módulo | Qué falta |
|--------|-----------|
| Webhook de WhatsApp Business (`/api/whatsapp/webhook`) | La verificación de firma de Meta (`X-Hub-Signature-256`) **ya está implementada** (HMAC-SHA256 + comparación segura). Lo que falta es procesar el mensaje entrante: hoy el endpoint valida la firma, hace `console.log` del payload y responde 200 — extraer el mensaje, clasificar la intención y responder con una plantilla aprobada por Meta sigue pendiente (son los `TODO M2` dentro de `route.ts`). |
| Portal de cliente — expediente | Lo construido cubre login, chat y ver el historial de citas propio. **No** incluye ver el estado del caso en tiempo real ni subir/descargar documentos del expediente — eso seguía planificado para una fase posterior en la entrega original y no se llegó a implementar. |

### Pendiente

| # | Descripción | Prioridad |
|---|-------------|-----------|
| P1 | Actualizar el número de teléfono real en `lib/constants.ts` — actualmente sigue con el placeholder `+593 XX XXX XXXX` | Alta |
| P3 | Regenerar `og-image.jpg` con las dimensiones correctas — hoy es 1024×1024, debe ser 1200×630 para verse bien al compartir el link en redes sociales | Baja |
| P4 | Implementar cabecera Content-Security-Policy (CSP) una vez estabilizada la URL de producción | Baja |

> El favicon (P2 en la entrega original) ya está resuelto — existe `app/icon.png`, que Next.js usa automáticamente por convención del App Router.
