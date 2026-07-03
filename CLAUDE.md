# IMPERIUM IURIS — Notas de arquitectura para Claude

## Stack
Next.js 15.3 App Router · TypeScript strict · Tailwind CSS · Framer Motion · Supabase · Resend

---

## Módulos completados

| Módulo | Estado | Descripción |
|--------|--------|-------------|
| M1 | ✅ | Sitio web público (home, nosotros, servicios, blog, contacto, agenda) |
| M2 | ✅ | Emails con Resend — confirmación al cliente + notificación al abogado |
| M3 | ✅ | Agenda online — formulario, disponibilidad, guardado en Supabase |
| M4 | ✅ | Panel admin — Auth, consultas, CMS blog, testimonios, configuración |
| Portal cliente | ✅ | Google OAuth, chat en tiempo real, mis citas, modal login-antes-de-enviar |
| Inline editing | ✅ | Edición en vivo de textos e imágenes desde el sitio público (modo edición) |

---

## Sistema de configuración del sitio

### Arquitectura

El sitio tiene dos formas de editar contenido:

1. **Panel `/admin/configuracion`** — Para configuraciones técnicas:
   - Datos de contacto (WhatsApp, teléfono, correo, dirección)
   - Mensaje predefinido de WhatsApp
   - Redes sociales (LinkedIn, Instagram, Facebook)
   - Horario de atención (controla botón flotante)
   - Horario para citas + días festivos

2. **Inline editing (modo edición)** — Para textos e imágenes:
   - Activar con el toggle en el navbar (solo visible para admins)
   - Click en el botón "Editar" que aparece en cada sección
   - Los cambios se guardan en Supabase y se reflejan en todo el sitio

### Flujo de datos

```
Supabase (tabla configuracion)
    ↓
getSiteConfig() — lib/config.ts (server-side)
    ↓
<ConfigProvider> — components/providers/ConfigProvider.tsx
    ↓
useSiteConfig() — hook para leer config en cualquier componente
useUpdateConfig() — hook para actualizar config (usado por modales de edición)
```

### Claves de configuración

| Clave | Descripción | Editable desde |
|-------|-------------|----------------|
| `contacto` | WhatsApp, teléfono, correo, dirección, horas, emergencia, whatsapp_mensaje | Panel admin |
| `redes_sociales` | LinkedIn, Instagram, Facebook URLs | Panel admin |
| `horario_atencion` | Días, hora inicio/fin, mensaje fuera de horario | Panel admin |
| `horario_citas` | Días, hora inicio/fin, intervalo | Panel admin |
| `festivos` | Array de fechas bloqueadas | Panel admin |
| `hero` | Título (3 partes), subtítulo, frase emocional, botones | Inline editing |
| `trust_block` | Eyebrow, título, subtítulo, 6 tarjetas | Inline editing |
| `services_block` | Eyebrow, título, subtítulo, 4 áreas de práctica | Inline editing |
| `urgency_block` | Eyebrow, título, texto, badge, CTA, footer, 3 escenarios | Inline editing |
| `differential_block` | Eyebrow, título, subtítulo, closing, CTA, 6 diferenciales | Inline editing |
| `testimonials_block` | Eyebrow, título, subtítulo, testimonios | Inline editing |
| `blog_preview` | Eyebrow, título, subtítulo (bloque en home) | Inline editing |
| `blog_page` | Eyebrow, título, subtítulo (página /blog) | Inline editing |
| `final_cta` | Título, subtítulo, botones | Inline editing |
| `agenda_page` | Eyebrow, título, subtítulo, textos del sidebar | Inline editing |
| `contacto_page` | Eyebrow, título, subtítulo | Inline editing |
| `nosotros_page` | Eyebrow, título, intro, descripción, tagline, filosofía, visión | Inline editing |
| `por_que_block` | Título, subtítulo, items, texto, closing | Inline editing |
| `equipo_block` | Título, subtítulo, especialistas, closing | Inline editing |
| `metodologia_block` | Título, subtítulo, 6 pasos | Inline editing |
| `confidencialidad_block` | Título, subtítulo, items, closing | Inline editing |
| `cta_nosotros` | Título, subtítulo, botones | Inline editing |
| `footer` | Descripción de la firma | Inline editing |
| `imagenes` | Hero carousel, servicios, diferencial carousel, galería nosotros | Inline editing |

### Propagación automática de datos de contacto

Los datos de contacto se usan en múltiples lugares y se actualizan automáticamente:

| Campo | Usado en |
|-------|----------|
| `contacto.whatsapp` | Botón flotante (WhatsApp), UrgencyBlock |
| `contacto.whatsapp_mensaje` | Mensaje predefinido en todos los links wa.me |
| `contacto.telefono` | Botón flotante (Llamada), Navbar (botón urgencia), Footer, ContactInfoBlock |
| `contacto.correo` | Footer, ContactInfoBlock |
| `contacto.direccion` | Footer, ContactInfoBlock, mapa en /contacto |
| `contacto.horas` | Footer, ContactInfoBlock |
| `contacto.emergencia` | Footer, ContactInfoBlock |
| `redes_sociales.*` | Footer (íconos), ContactInfoBlock (badges clickeables) |

### Componentes clave del sistema de edición

| Componente | Descripción |
|------------|-------------|
| `EditableSection` | Wrapper que muestra borde dorado + botón editar en modo edición |
| `SectionEditModal` | Modal genérico para editar cualquier clave de config |
| `EditModeProvider` | Contexto que controla si el modo edición está activo |
| `ConfigProvider` | Contexto que provee la config a todo el sitio |
| `ImageUploadField` | Campo para subir imágenes a Supabase Storage |

### Props de EditableSection

| Prop | Descripción |
|------|-------------|
| `onEdit` | Callback al hacer click en editar |
| `bottomButton` | Pone el botón abajo (para secciones bajo el navbar) |
| `topSafe` | Agrega margen superior (para evitar navbar) |
| `label` | Texto del botón (default: "Editar") |

---

## Arquitectura de autenticación

El proyecto usa **un solo proyecto Supabase Auth** para admin y clientes. Se distinguen por `app_metadata`:

```
Admin:  user.app_metadata.role === 'admin'   (asignado via SQL: UPDATE auth.users ...)
        O: user.email === process.env.ADMIN_EMAIL  (fallback)
Cliente: cualquier usuario OAuth de Google sin role 'admin'
```

### Middleware (`middleware.ts`)

| Ruta | Regla |
|------|-------|
| `/admin/*` | Requiere `role === 'admin'` o email === ADMIN_EMAIL. Sin sesión → `/admin/login?redirect=<ruta>` |
| `/chat` | Requiere sesión (cualquier usuario). Sin sesión → `/login` |
| `/mis-citas` | Requiere sesión (cualquier usuario). Sin sesión → `/login` |
| `/login` | Si hay sesión activa → `/` (home) |

### PublicShell (`components/layout/PublicShell.tsx`)

Oculta Navbar/Footer para:
- `isAdmin`: rutas `/admin/*`
- `isPortal`: `/login`, `/chat`, `/auth`, `/mis-citas` (estas páginas tienen su propio header)

---

## Clientes Supabase

| Archivo | Clave | Uso |
|---------|-------|-----|
| `lib/supabase.ts` | `SUPABASE_SERVICE_ROLE_KEY` | Operaciones admin que bypassan RLS (server-side only) |
| `lib/supabase-server.ts` | `NEXT_PUBLIC_SUPABASE_ANON_KEY` | Verificación de sesión en Server Components y Route Handlers |
| `lib/supabase-browser.ts` | `NEXT_PUBLIC_SUPABASE_ANON_KEY` | Login/logout/realtime en Client Components (singleton) |

`lib/supabase-server.ts` exporta:
- `createSupabaseServerClient()` — crea cliente con cookies de la request
- `getUser()` — shortcut: devuelve `User | null`

---

## Variables de entorno (`.env.local`)

```env
# Supabase
NEXT_PUBLIC_SUPABASE_URL=
NEXT_PUBLIC_SUPABASE_ANON_KEY=
SUPABASE_SERVICE_ROLE_KEY=

# Resend
RESEND_API_KEY=
RESEND_TO_EMAIL=          # Email del abogado para notificaciones

# Auth
ADMIN_EMAIL=              # Email del admin (fallback si app_metadata.role no está seteado)
```

---

## Tablas Supabase

### `configuracion`
Configuración del sitio. Sin RLS (acceso vía service_role).

| Columna | Tipo | Notas |
|---------|------|-------|
| clave | text PK | Identificador único de la config |
| valor | jsonb | Objeto con los valores |
| updated_at | timestamptz | Última actualización |

### `citas`
Agenda de citas. RLS habilitado.

| Columna | Tipo | Notas |
|---------|------|-------|
| id | uuid PK | |
| nombre | text | |
| correo | text | |
| telefono | text | |
| tipo_consulta | text | `personal` · `empresarial` · `urgencia` |
| fecha | date | |
| hora | time | |
| mensaje | text nullable | |
| estado | text | `pendiente` · `confirmada` · `cancelada` |
| cliente_id | uuid nullable | FK → `auth.users(id)` ON DELETE SET NULL |
| created_at | timestamptz | |

### `consultas`
Formulario de contacto. RLS habilitado.

| Columna | Tipo | Notas |
|---------|------|-------|
| id | uuid PK | |
| nombre | text | |
| correo | text | |
| telefono | text | |
| tipo_consulta | text | |
| mensaje | text | |
| confidencial | boolean | |
| estado | text | `nueva` · `revisada` · `respondida` |
| created_at | timestamptz | |

### `articulos`
Blog. RLS habilitado.

| Columna | Tipo | Notas |
|---------|------|-------|
| id | uuid PK | |
| slug | text unique | |
| titulo | text | |
| resumen | text | |
| contenido | text | Markdown |
| imagen_url | text nullable | |
| categoria | text | |
| tiempo_lectura | text | |
| publicado | boolean | Público solo si `true` |
| created_at | timestamptz | |

### `testimonios`
Testimonios de clientes. RLS habilitado.

| Columna | Tipo | Notas |
|---------|------|-------|
| id | uuid PK | |
| nombre | text | |
| cargo | text nullable | |
| texto | text | |
| estrellas | int | 1-5 |
| estado | text | Público solo si `'aprobado'` |
| created_at | timestamptz | |

### `mensajes`
Chat cliente ↔ abogado en tiempo real. RLS habilitado.

| Columna | Tipo | Notas |
|---------|------|-------|
| id | uuid PK | |
| cliente_id | uuid | FK → `auth.users(id)` ON DELETE CASCADE |
| remitente | text | `'cliente'` · `'abogado'` |
| texto | text | |
| leido | boolean | default false |
| created_at | timestamptz | |

---

## Rutas del sitio

### Públicas
| Ruta | Descripción |
|------|-------------|
| `/` | Home |
| `/nosotros` | Página institucional |
| `/servicios` | Servicios legales |
| `/blog` | Listado de artículos |
| `/blog/[slug]` | Artículo individual |
| `/contacto` | Formulario de consulta |
| `/agenda` | Formulario de cita online |

### Portal de cliente
| Ruta | Descripción |
|------|-------------|
| `/login` | Login con Google OAuth (sin contraseña) |
| `/auth/callback` | Callback OAuth — exchange code → session |
| `/chat` | Chat en tiempo real cliente ↔ abogado |
| `/mis-citas` | Historial de citas del cliente autenticado |

### Panel admin
| Ruta | Descripción |
|------|-------------|
| `/admin/login` | Login admin (email/contraseña) |
| `/admin/agenda` | Gestión de citas |
| `/admin/consultas` | Gestión de consultas de contacto |
| `/admin/blog` | CMS de artículos |
| `/admin/testimonios` | Moderación de testimonios |
| `/admin/chats` | Lista de conversaciones de clientes |
| `/admin/chats/[clienteId]` | Chat individual admin ↔ cliente |
| `/admin/configuracion` | Configuración técnica del sitio |

---

## Convenciones

- **Timezone Ecuador:** `America/Guayaquil` (UTC-5, sin DST). Siempre usar `Intl.DateTimeFormat.formatToParts()` para extraer componentes de fecha/hora.
- **Emails:** `Promise.allSettled` + verificar `result.value.error` (Resend nunca lanza excepciones).
- **RLS + GRANT:** Tablas creadas por SQL necesitan `GRANT SELECT/INSERT/UPDATE ON <tabla> TO authenticated` explícito.
- **Blog público:** lee solo `publicado = true`.
- **Testimonios públicos:** lee solo `estado = 'aprobado'`.
- **`useEffect` cleanup con Realtime:** el canal debe guardarse en variable `let channel` antes del `async function init()`.
- **`createSupabaseBrowserClient()`:** es un singleton — llamarlo múltiples veces no crea múltiples clientes.
- **WhatsApp:** Formato internacional (+593) para links wa.me. El mensaje se configura en `contacto.whatsapp_mensaje`.
- **Teléfono:** Formato local (09...) para display y llamadas. Separado del WhatsApp para flexibilidad.
- **Inline editing:** Usar `bottomButton` en EditableSection solo para el primer bloque de cada página (que queda bajo el navbar).

---

## Archivos clave del sistema de configuración

| Archivo | Descripción |
|---------|-------------|
| `lib/config-utils.ts` | Tipos TypeScript y defaults de toda la config |
| `lib/config.ts` | `getSiteConfig()` — lee config de Supabase (server-side) |
| `components/providers/ConfigProvider.tsx` | Contexto React con `useSiteConfig()` y `useUpdateConfig()` |
| `components/providers/EditModeProvider.tsx` | Contexto para modo edición |
| `components/admin/EditableSection.tsx` | Wrapper visual para secciones editables |
| `components/admin/SectionEditModal.tsx` | Modal genérico de edición |
| `components/admin/ConfigFormControls.tsx` | Inputs, campos, botón guardar reutilizables |
| `app/api/admin/configuracion/route.ts` | API para PATCH de configuración |

---

## API de configuración

### `PATCH /api/admin/configuracion`

```json
{
  "clave": "contacto",
  "valor": { "whatsapp": "+593 985 222 635", ... }
}
```

**Respuestas:**
- `200` — Guardado exitoso
- `401` — No autorizado (requiere admin)
- `422` — Clave inválida (no está en CLAVES_VALIDAS)
- `502` — Error de Supabase

**Claves válidas:** `contacto`, `horario_atencion`, `horario_citas`, `festivos`, `hero`, `redes_sociales`, `agenda_page`, `contacto_page`, `blog_page`, `blog_preview`, `nosotros_page`, `trust_block`, `services_block`, `urgency_block`, `differential_block`, `final_cta`, `testimonials_block`, `footer`, `por_que_block`, `equipo_block`, `metodologia_block`, `confidencialidad_block`, `cta_nosotros`, `imagenes`
