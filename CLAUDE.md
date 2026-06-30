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
| M4 | ✅ | Panel admin — Auth, consultas, CMS blog, testimonios |
| Portal cliente | ✅ | Google OAuth, chat en tiempo real, mis citas, modal login-antes-de-enviar |

## Funcionalidades extra (fuera del plan original M1-M4)

Implementadas en sesión 2026-06-29:

| Feature | Ruta(s) | Estado |
|---------|---------|--------|
| Login cliente con Google OAuth | `/login` | ✅ |
| Chat cliente ↔ abogado (Realtime) | `/chat` · `/admin/chats` · `/admin/chats/[clienteId]` | ✅ |
| "Mis citas" — historial por cliente | `/mis-citas` | ✅ Pendiente prueba |
| Modal login antes de enviar formulario | `/agenda` · `/contacto` | ✅ Pendiente prueba |
| NavAuthButton — avatar + dropdown en navbar | Navbar público | ✅ |
| ChatInviteBanner post-envío | `/agenda` · `/contacto` (estado `sent`) | ✅ |
| `cliente_id` en tabla `citas` | API `/api/appointments` | ✅ SQL pendiente de ejecutar |

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
| cliente_id | uuid nullable | FK → `auth.users(id)` ON DELETE SET NULL. Nulo si el cliente no estaba logueado al agendar |
| created_at | timestamptz | |

> `cliente_id` fue agregado en 2026-06-29. SQL ejecutado:
> ```sql
> alter table public.citas add column cliente_id uuid references auth.users(id) on delete set null;
> create index citas_cliente_id_idx on public.citas(cliente_id);
> ```

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

**SQL ejecutado para mensajes:**
```sql
create table public.mensajes (
  id          uuid primary key default gen_random_uuid(),
  cliente_id  uuid not null references auth.users(id) on delete cascade,
  remitente   text not null check (remitente in ('cliente', 'abogado')),
  texto       text not null,
  leido       boolean not null default false,
  created_at  timestamptz not null default now()
);

alter table public.mensajes enable row level security;

-- Grants (CRÍTICO: tablas creadas por SQL no tienen grants automáticos)
grant select, insert, update on public.mensajes to authenticated;
grant select on public.mensajes to anon;
grant all on public.mensajes to service_role;

-- RLS policies
create policy "cliente_select_mensajes" on public.mensajes
  for select using (
    auth.uid() = cliente_id
    or (auth.jwt() -> 'app_metadata' ->> 'role') = 'admin'
  );

create policy "cliente_insert_mensajes" on public.mensajes
  for insert with check (
    auth.uid() = cliente_id and remitente = 'cliente'
  );

create policy "admin_update_mensajes" on public.mensajes
  for update using (
    (auth.jwt() -> 'app_metadata' ->> 'role') = 'admin'
  );

-- Realtime
alter publication supabase_realtime add table public.mensajes;
```

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
| `/auth/callback` | Callback OAuth — exchange code → session, redirect a `?next=` o `/` |
| `/chat` | Chat en tiempo real cliente ↔ abogado |
| `/mis-citas` | Historial de citas del cliente autenticado |

### Panel admin
| Ruta | Descripción |
|------|-------------|
| `/admin/login` | Login admin (email/contraseña). Sin enlace visible en el sitio |
| `/admin/agenda` | Gestión de citas |
| `/admin/consultas` | Gestión de consultas de contacto |
| `/admin/blog` | CMS de artículos |
| `/admin/testimonios` | Moderación de testimonios |
| `/admin/chats` | Lista de conversaciones de clientes |
| `/admin/chats/[clienteId]` | Chat individual admin ↔ cliente |

---

## Flujo de chat (arquitectura)

```
Cliente (browser)                    Admin (browser)
    │                                      │
    │  supabase-browser (anon key)         │  supabase-browser (anon key)
    │  INSERT mensajes (RLS: uid=cliente_id)│  Server Action → supabase (service role)
    │                                      │  INSERT mensajes (remitente='abogado')
    │                                      │
    └──── Supabase Realtime (postgres_changes) ────┘
              filter: cliente_id=eq.<uuid>
```

- El cliente inserta mensajes directamente desde el browser (RLS valida `auth.uid() = cliente_id`).
- El admin inserta mensajes vía **server action** (`app/admin/chats/[clienteId]/actions.ts`) para mantener el `service_role` key server-side.
- Ambos lados escuchan Realtime con `filter: cliente_id=eq.<uuid>`.

---

## Flujo modal de login antes de enviar formulario

Cuando un usuario no autenticado completa `/agenda` o `/contacto` y hace click en enviar:

1. `onSubmit` detecta `isLoggedIn === false`
2. Guarda `data` en estado `pendingData`, muestra `<LoginModal />`
3. **Opción A — Iniciar sesión con Google:**
   - Guarda `JSON.stringify(data)` en `sessionStorage('pending_agenda'|'pending_contacto')`
   - Llama `supabase.auth.signInWithOAuth({ redirectTo: '/auth/callback?next=/agenda' })`
   - OAuth completa → callback redirige a `/agenda`
   - Al montar, `useEffect` lee sessionStorage, llama `submitFormData(data)` directo
   - Si la cita se guarda exitosamente, `cliente_id` queda vinculado (el usuario ya tiene sesión)
4. **Opción B — Continuar sin cuenta:**
   - Modal llama `onContinue()` → `submitFormData(pendingData)`
   - La cita se guarda con `cliente_id = null`

**Archivos clave:**
- `components/shared/LoginModal.tsx` — modal reutilizable
- `app/agenda/page.tsx` — lógica `isLoggedIn`, `pendingData`, `submitFormData`, `useEffect` sessionStorage
- `app/contacto/page.tsx` — misma lógica, storage key `'pending_contacto'`

---

## Panel de administración

- URL de acceso: `/admin/login` — **sin enlace visible en el sitio público**
- Crear usuario admin desde: Supabase Dashboard → Authentication → Users
- Asignar rol admin via SQL:
  ```sql
  update auth.users
  set raw_app_meta_data = raw_app_meta_data || '{"role":"admin"}'::jsonb
  where email = 'email-del-admin@ejemplo.com';
  ```
- Middleware protege todas las rutas `/admin/*`

---

## Convenciones

- **Timezone Ecuador:** `America/Guayaquil` (UTC-5, sin DST). Siempre usar `Intl.DateTimeFormat.formatToParts()` para extraer componentes de fecha/hora, nunca `new Date(toLocaleString())`.
- **Emails:** `Promise.allSettled` + verificar `result.value.error` (Resend nunca lanza excepciones).
- **RLS + GRANT:** Tablas creadas por SQL necesitan `GRANT SELECT/INSERT/UPDATE ON <tabla> TO authenticated` explícito. Sin grant → error 403 aunque la policy esté bien.
- **Blog público:** lee solo `publicado = true`.
- **Testimonios públicos:** lee solo `estado = 'aprobado'`.
- **`useEffect` cleanup con Realtime:** el canal debe guardarse en variable `let channel` antes del `async function init()`. El `return () => supabase.removeChannel(channel)` debe estar directamente en el `useEffect`, no dentro de `.then()`.
- **`createSupabaseBrowserClient()`:** es un singleton — llamarlo múltiples veces en el mismo componente no crea múltiples clientes.

---

## Pendiente de probar (próxima sesión)

### Flujo modal login + autoenvío (`/agenda`)
1. Abrir `/agenda` sin sesión
2. Completar todos los campos (nombre, correo, teléfono, tipo, fecha, hora)
3. Hacer click en "Confirmar cita"
4. Verificar que aparece `<LoginModal>` con botón Google y "Continuar sin cuenta"
5. **Ruta A:** Click en Google → login OAuth → redirige a `/agenda` → verificar que la cita se envía automáticamente y aparece pantalla de éxito → verificar en Supabase que la fila tiene `cliente_id` poblado
6. **Ruta B:** Click en "Continuar sin cuenta" → verificar que la cita se envía normalmente → `cliente_id` es null en Supabase

### Flujo modal login + autoenvío (`/contacto`)
- Mismo test que agenda pero con el formulario de consulta
- Verificar que `sessionStorage('pending_contacto')` se usa correctamente

### Página `/mis-citas`
1. Crear al menos una cita estando logueado (para que `cliente_id` quede poblado)
2. Ir a `/mis-citas` → verificar que muestra la cita con fecha, hora, tipo y badge de estado
3. Ir a `/mis-citas` sin sesión → verificar que redirige a `/login`
4. Verificar que el NavAuthButton muestra "Mis citas" en el dropdown al estar logueado

### SQL pendiente de ejecutar en Supabase
```sql
-- Columna cliente_id en citas (si no se ejecutó aún)
alter table public.citas
  add column cliente_id uuid references auth.users(id) on delete set null;
create index citas_cliente_id_idx on public.citas(cliente_id);
```
