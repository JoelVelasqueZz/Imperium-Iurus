# Documentación del proyecto (Imperium Iuris) — Plan de implementación

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Producir `docs/DOCUMENTACION.md`, un documento único en prosa que explique qué es Imperium Iuris y cómo está construido, para estudiantes que se unan al proyecto — reemplazando a `docs/ENTREGA.md`.

**Architecture:** Un solo archivo Markdown en el vault de Obsidian (`docs/`), construido sección por sección (8 secciones + anexo de capturas), con placeholders de imagen que apuntan a `docs/attachments/`. No hay código de producción involucrado — el "trabajo" de cada tarea es contenido verificado contra el código fuente, no manuscrito de memoria.

**Tech Stack:** Markdown. Sin dependencias, sin build step.

## Global Constraints

- El documento vive en `docs/DOCUMENTACION.md` (ruta exacta, no en subcarpeta).
- Las imágenes van en `docs/attachments/`, referenciadas como `![Alt](attachments/nombre-archivo.png)` (ruta relativa desde `docs/DOCUMENTACION.md`).
- Los 12 nombres de archivo de imagen son exactamente los de la tabla del spec (`docs/superpowers/specs/2026-07-06-documentacion-proyecto-design.md`) — no renombrar.
- Nada de contenido sobre variables de entorno, setup de Supabase/Vercel/GitHub o comandos de desarrollo — eso es la guía del programador, fuera de alcance de este plan.
- `docs/ENTREGA.md` se elimina solo en la última tarea, después de confirmar que todo su contenido vigente ya está migrado.
- `docs/AUDITORIA_SEGURIDAD.md`, `docs/QA_REPORT.md`, `docs/pendientes-cliente.md` no se tocan.
- Cero placeholders tipo "TBD"/"pendiente de redactar" en el cuerpo del documento — la única excepción explícitamente permitida es la referencia a la guía del programador como "pendiente de redactar por separado" en la sección de Créditos, porque es un documento distinto y futuro, no un hueco de este documento.

---

### Task 1: Crear el documento con Portada + Recorrido del sitio público

**Files:**
- Create: `docs/DOCUMENTACION.md`
- Create: `docs/attachments/.gitkeep`

**Interfaces:**
- Produces: el archivo `docs/DOCUMENTACION.md` con las secciones 1 y 2, que las tareas siguientes van a extender agregando contenido al final del archivo.

- [ ] **Step 1: Crear la carpeta de adjuntos**

```bash
mkdir -p "docs/attachments"
touch "docs/attachments/.gitkeep"
```

- [ ] **Step 2: Escribir el archivo con Sección 1 y Sección 2**

Crear `docs/DOCUMENTACION.md` con exactamente este contenido:

```markdown
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
```

- [ ] **Step 3: Verificar que no quedaron placeholders ni nombres de imagen incorrectos**

```bash
grep -n "TBD\|TODO\|pendiente de redactar" docs/DOCUMENTACION.md
grep -oE "attachments/[a-z-]+\.png" docs/DOCUMENTACION.md
```

Expected: el primer comando no imprime nada (sin matches). El segundo imprime exactamente `attachments/home-hero.png`, `attachments/nosotros.png`, `attachments/servicios.png`, `attachments/blog-listado.png`, `attachments/contacto.png`, `attachments/agenda.png` — estos 6, en ese orden, sin duplicados ni nombres distintos.

- [ ] **Step 4: Commit**

```bash
git add docs/DOCUMENTACION.md docs/attachments/.gitkeep
git commit -m "docs: iniciar documentacion del proyecto (portada + sitio publico)"
```

---

### Task 2: Agregar sección "Portal de cliente"

**Files:**
- Modify: `docs/DOCUMENTACION.md` (append al final)

**Interfaces:**
- Consumes: el archivo creado en Task 1 (debe terminar con la sección "Agenda").
- Produces: el archivo con la sección "Portal de cliente" agregada, para que Task 3 continúe desde ahí.

- [ ] **Step 1: Append la sección al final del archivo**

Agregar exactamente esto al final de `docs/DOCUMENTACION.md`:

```markdown

---

## Portal de cliente

A diferencia del sitio público, estas páginas requieren que el visitante inicie sesión. El proyecto usa un único proyecto de Supabase Auth tanto para clientes como para el admin (ver "Arquitectura y flujos clave" para cómo se distinguen).

### Ingreso (`/login`)

Login sin contraseña vía Google OAuth. El callback de OAuth (`/auth/callback`) intercambia el código de Google por una sesión de Supabase.

![Login cliente](attachments/login-cliente.png)

### Verificación en dos pasos (`/cuenta/seguridad`)

El cliente puede activar opcionalmente un segundo factor de autenticación (TOTP, usando el soporte nativo de MFA de Supabase Auth — compatible con apps como Google Authenticator) desde `/cuenta/seguridad`: generar el código QR/secreto, verificar el primer código para activarlo, o desactivarlo.

Para no pedir el código en cada inicio de sesión desde el mismo navegador, existe un mecanismo de **dispositivo confiable** (`lib/trusted-device.ts` y `lib/trusted-device-server.ts`): al verificar el 2FA una vez, el servidor emite un token firmado que el navegador guarda en `localStorage`; en logins posteriores, el navegador manda ese token a `/api/auth/trusted-device/verify` y, si es válido, se salta el paso del código.

### Chat con el abogado (`/chat`)

Mensajería en tiempo real entre el cliente y el abogado, usando Supabase Realtime sobre la tabla `mensajes`. El admin ve y responde estos chats desde `/admin/chats`.

![Chat cliente](attachments/chat-cliente.png)

### Mis citas (`/mis-citas`)

Historial de las citas agendadas por el cliente autenticado (se asocian por `cliente_id`, la columna que conecta `citas` con `auth.users`).

![Mis citas](attachments/mis-citas.png)
```

- [ ] **Step 2: Verificar contra el código fuente**

```bash
grep -n "mfa.enroll\|mfa.listFactors" "app/cuenta/seguridad/page.tsx"
grep -n "trusted-device" "app/login/page.tsx"
```

Expected: ambos comandos devuelven al menos una línea — confirma que la descripción de 2FA/TOTP nativo de Supabase y del flujo de dispositivo confiable sigue siendo precisa antes de darla por buena.

- [ ] **Step 3: Verificar que no quedaron placeholders**

```bash
grep -n "TBD\|TODO\|pendiente de redactar" docs/DOCUMENTACION.md
```

Expected: sin matches.

- [ ] **Step 4: Commit**

```bash
git add docs/DOCUMENTACION.md
git commit -m "docs: agregar seccion portal de cliente"
```

---

### Task 3: Agregar sección "Panel de administración"

**Files:**
- Modify: `docs/DOCUMENTACION.md` (append al final)

**Interfaces:**
- Consumes: el archivo con las secciones de Task 1 y Task 2.
- Produces: el archivo con la sección "Panel de administración" agregada.

- [ ] **Step 1: Append la sección al final del archivo**

```markdown

---

## Panel de administración

Todas las rutas bajo `/admin/*` requieren sesión con `role === 'admin'` (o el correo configurado en `ADMIN_EMAIL`) — el `middleware.ts` redirige a `/admin/login` si no hay sesión válida.

### Agenda (`/admin/agenda`)

Ver y gestionar todas las citas agendadas: cambiar su estado entre `pendiente`, `confirmada` y `cancelada`.

![Panel — Agenda](attachments/admin-agenda.png)

### Consultas (`/admin/contacto`)

Leer los mensajes recibidos por el formulario de contacto y marcarlos como `nueva`, `revisada` o `respondida`.

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
```

- [ ] **Step 2: Verificar que no quedaron placeholders ni nombres de imagen incorrectos**

```bash
grep -n "TBD\|TODO\|pendiente de redactar" docs/DOCUMENTACION.md
grep -oE "attachments/admin-[a-z-]+\.png" docs/DOCUMENTACION.md
```

Expected: primer comando sin matches. Segundo imprime exactamente `attachments/admin-agenda.png`, `attachments/admin-blog.png`, `attachments/admin-configuracion.png`.

- [ ] **Step 3: Commit**

```bash
git add docs/DOCUMENTACION.md
git commit -m "docs: agregar seccion panel de administracion"
```

---

### Task 4: Agregar sección "Arquitectura y flujos clave"

**Files:**
- Modify: `docs/DOCUMENTACION.md` (append al final)

**Interfaces:**
- Consumes: el archivo con las secciones de Tasks 1-3.
- Produces: el archivo con la sección de arquitectura agregada.

- [ ] **Step 1: Append la sección al final del archivo**

```markdown

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
```

- [ ] **Step 2: Verificar que no quedaron placeholders**

```bash
grep -n "TBD\|TODO\|pendiente de redactar" docs/DOCUMENTACION.md
```

Expected: sin matches.

- [ ] **Step 3: Commit**

```bash
git add docs/DOCUMENTACION.md
git commit -m "docs: agregar seccion arquitectura y flujos clave"
```

---

### Task 5: Agregar sección "Modelo de datos"

**Files:**
- Modify: `docs/DOCUMENTACION.md` (append al final)

**Interfaces:**
- Consumes: el archivo con las secciones de Tasks 1-4.
- Produces: el archivo con la sección del modelo de datos agregada.

- [ ] **Step 1: Append la sección al final del archivo**

```markdown

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

Todas menos `configuracion` y `push_subscriptions` tienen RLS (Row Level Security) habilitado. Una convención importante del proyecto: cualquier tabla nueva necesita un `GRANT` explícito a `service_role` (o `authenticated`, según el caso) — Supabase no da acceso por defecto solo por tener RLS habilitado, y si el código hace `upsert(...)`, el `GRANT` necesita incluir `UPDATE` además de `INSERT`/`SELECT`, porque Postgres lo exige para resolver el `ON CONFLICT DO UPDATE`. El detalle completo de columnas está en `CLAUDE.md`, sección "Tablas Supabase".
```

- [ ] **Step 2: Verificar que no quedaron placeholders**

```bash
grep -n "TBD\|TODO\|pendiente de redactar" docs/DOCUMENTACION.md
```

Expected: sin matches.

- [ ] **Step 3: Commit**

```bash
git add docs/DOCUMENTACION.md
git commit -m "docs: agregar seccion modelo de datos"
```

---

### Task 6: Agregar sección "Módulos y estado del proyecto"

**Files:**
- Modify: `docs/DOCUMENTACION.md` (append al final)

**Interfaces:**
- Consumes: el archivo con las secciones de Tasks 1-5.
- Produces: el archivo con la sección de estado del proyecto agregada.

Esta tarea depende de hechos verificados en el código (no repetir de memoria sin confirmar), porque el estado de los pendientes de `ENTREGA.md` pudo haber cambiado:

- [ ] **Step 1: Confirmar el estado real de cada pendiente antes de escribir la tabla**

```bash
grep -n "phone:" lib/constants.ts
grep -rn "Content-Security-Policy" --include="*.ts" --include="*.tsx" app/ middleware.ts next.config.ts 2>/dev/null
ls app/icon.png
grep -n "isValidMetaSignature\|timingSafeEqual" app/api/whatsapp/webhook/route.ts
```

Expected (estado al momento de escribir este plan, 2026-07-06 — volver a correr estos comandos si pasó mucho tiempo):
- `lib/constants.ts` → `phone: '+593 XX XXX XXXX'` (sigue siendo un placeholder → P1 sigue pendiente)
- El grep de CSP no devuelve nada en código de producción (solo puede aparecer mencionado en `docs/`) → P4 sigue pendiente
- `app/icon.png` existe → favicon ya resuelto, no listar como pendiente
- `isValidMetaSignature`/`timingSafeEqual` sí existen en el webhook → la validación de firma de Meta ya está implementada

Si alguno de estos resultados es distinto a lo esperado, ajustar la tabla del Step 2 antes de continuar.

- [ ] **Step 2: Append la sección al final del archivo**

```markdown

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
```

- [ ] **Step 3: Verificar que no quedaron placeholders**

```bash
grep -n "TBD\|TODO M2\|pendiente de redactar" docs/DOCUMENTACION.md
```

Expected: sin matches — nota que `TODO M2` como *texto descriptivo dentro de una oración* ("son los `TODO M2` dentro de `route.ts`") es intencional y se refiere al código, no es un placeholder del propio documento; si el grep lo encuentra ahí, está bien, confirma que la referencia sigue en su sitio.

- [ ] **Step 4: Commit**

```bash
git add docs/DOCUMENTACION.md
git commit -m "docs: agregar seccion modulos y estado del proyecto"
```

---

### Task 7: Agregar "Créditos" + Anexo de capturas

**Files:**
- Modify: `docs/DOCUMENTACION.md` (append al final)

**Interfaces:**
- Consumes: el archivo con las secciones de Tasks 1-6.
- Produces: el documento completo y final (sin contar la eliminación de `ENTREGA.md`, que es la Task 8).

- [ ] **Step 1: Append la sección al final del archivo**

```markdown

---

## Créditos y continuidad

Este documento fue redactado como parte del traspaso del proyecto a nuevos contribuidores estudiantes. Los otros dos documentos de la entrega son:

- **Guía del programador** (`docs/GUIA_PROGRAMADOR.md`) — cómo configurar el entorno de desarrollo: GitHub, Supabase, variables de entorno, deploy en Vercel, comandos de desarrollo. (Pendiente de redactar por separado.)
- **Manual de usuario** — cómo operar el panel de administración día a día, a cargo de otra persona del equipo.

Para dudas técnicas de arquitectura no cubiertas aquí, `CLAUDE.md` en la raíz del repo es la referencia de trabajo más detallada y actualizada.

## Anexo — Capturas de pantalla pendientes

Recomendaciones generales: viewport 1440×900, zoom 100%, formato PNG (página completa cuando el navegador lo permita), guardadas en `docs/attachments/` con el nombre exacto de la columna "Archivo". **Privacidad:** en cualquier pantalla de `/admin/agenda`, `/admin/contacto` o `/admin/chats` que muestre citas, consultas o chats reales, usar registros de prueba creados para la captura, o tapar/difuminar nombre, teléfono, correo y mensaje — varias consultas están marcadas `confidencial` y corresponden a clientes reales.

| # | Archivo | URL | Estado a mostrar |
|---|---------|-----|-------------------|
| 1 | `home-hero.png` | `/` | Above the fold: hero + trust block. Sin sesión iniciada. |
| 2 | `nosotros.png` | `/nosotros` | Sección de apertura/misión, scroll arriba. |
| 3 | `servicios.png` | `/servicios` | Listado de las 4 áreas de práctica visibles. |
| 4 | `blog-listado.png` | `/blog` | Grid con artículos publicados reales (`publicado=true`). |
| 5 | `contacto.png` | `/contacto` | Formulario vacío, sin llenar. |
| 6 | `agenda.png` | `/agenda` | Formulario con el selector de fecha/hora abierto si es posible. |
| 7 | `login-cliente.png` | `/login` | Pantalla de login con botón de Google, sin sesión. |
| 8 | `chat-cliente.png` | `/chat` | Cuenta de prueba con 2-3 mensajes de ejemplo (no cliente real). |
| 9 | `mis-citas.png` | `/mis-citas` | Cuenta de prueba con 1 cita de ejemplo. |
| 10 | `admin-agenda.png` | `/admin/agenda` | Lista de citas — solo datos de prueba o campos sensibles tapados. |
| 11 | `admin-blog.png` | `/admin/blog` | Listado de artículos del CMS. |
| 12 | `admin-configuracion.png` | `/admin/configuracion` | Sección "Contacto" expandida (muestra el estilo del formulario técnico). |
```

- [ ] **Step 2: Verificar el documento completo de punta a punta**

```bash
grep -n "TBD\|pendiente de redactar$" docs/DOCUMENTACION.md
grep -c "^## " docs/DOCUMENTACION.md
grep -oE "attachments/[a-z-]+\.png" docs/DOCUMENTACION.md | sort -u | wc -l
```

Expected:
- Primer comando: sin matches (la única mención permitida de "pendiente de redactar" está seguida de "por separado", no al final de línea, así que el patrón `pendiente de redactar$` no debe matchear nada).
- Segundo comando: `10` — los encabezados `##` son, en orden: Qué es Imperium Iuris, Estado actual, Recorrido del sitio público, Portal de cliente, Panel de administración, Arquitectura y flujos clave, Modelo de datos, Módulos y estado del proyecto, Créditos y continuidad, Anexo — Capturas de pantalla pendientes. Si el número no es 10, falta o sobra una sección — revisar cuál antes de continuar.
- Tercer comando: `12` — los 12 nombres de imagen del spec, cada uno una sola vez.

- [ ] **Step 3: Commit**

```bash
git add docs/DOCUMENTACION.md
git commit -m "docs: agregar creditos y anexo de capturas, documentacion completa"
```

---

### Task 8: Eliminar ENTREGA.md

**Files:**
- Delete: `docs/ENTREGA.md`

**Interfaces:**
- Consumes: `docs/DOCUMENTACION.md` completo (de Task 7) — este paso solo procede si ese archivo ya cubre todo el contenido vigente de `ENTREGA.md`.

- [ ] **Step 1: Confirmar que todo el contenido vigente de ENTREGA.md ya está migrado**

Comparar manualmente `docs/ENTREGA.md` contra `docs/DOCUMENTACION.md`, sección por sección de `ENTREGA.md`:
- Sección 1 (URLs) → migrada a "Qué es Imperium Iuris" (Task 1).
- Sección 2 (Panel admin) → migrada a "Panel de administración" (Task 3).
- Sección 3 (Variables de entorno) → **no migrada a propósito**, es contenido de la futura guía del programador (fuera de alcance, ver Global Constraints).
- Sección 4 (Base de datos) → migrada a "Modelo de datos" (Task 5).
- Sección 5 (Scores de PageSpeed) → no migrada; es un dato puntual de una fecha de auditoría específica, ya cubierto con más detalle y más reciente en `docs/QA_REPORT.md`, que no se toca.
- Sección 6 (Módulos entregados) → migrada a "Módulos y estado del proyecto" (Task 6), actualizada con lo construido después de la entrega v1.0.0.
- Sección 7 (Pendientes fase II) → migrada y actualizada a "Módulos y estado del proyecto" (Task 6): M5 pasó de "no implementado" a "parcial", P1-P5 verificados contra el código actual.
- Sección 8 (Comandos de desarrollo) → **no migrada a propósito**, es contenido de la futura guía del programador.
- Sección 9 (Estructura de archivos) → cubierta de forma narrativa a lo largo de todo el documento (cada sección menciona sus archivos clave) en vez de repetir el árbol de `ENTREGA.md` tal cual.

- [ ] **Step 2: Eliminar el archivo**

```bash
git rm docs/ENTREGA.md
```

- [ ] **Step 3: Commit final**

```bash
git commit -m "docs: eliminar ENTREGA.md, reemplazado por DOCUMENTACION.md"
```

- [ ] **Step 4: Verificación final de todo el trabajo**

```bash
git log --oneline -8
ls docs/DOCUMENTACION.md docs/attachments/.gitkeep
test -f docs/ENTREGA.md && echo "ERROR: ENTREGA.md todavia existe" || echo "OK: ENTREGA.md eliminado"
```

Expected: 8 commits nuevos de este plan visibles en el log, `docs/DOCUMENTACION.md` y `docs/attachments/.gitkeep` existen, y el mensaje final es `OK: ENTREGA.md eliminado`.
