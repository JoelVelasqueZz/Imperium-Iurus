# ENTREGA — IMPERIUM IURIS Portal

> ⚠️ **Snapshot histórico de la entrega v1.0.0 (26/06/2026, M1–M4).** El proyecto avanzó bastante desde entonces (portal de clientes, notificaciones push, edición inline, etc.) — para el estado y la arquitectura actuales, ver `CLAUDE.md`. Este archivo se mantiene como referencia y será reemplazado por una guía de onboarding completa.

**Proyecto:** Portal web de defensa penal estratégica  
**Cliente:** Imperium Iuris  
**Versión entregada:** 1.0.0 — Módulos M1–M4  
**Fecha de entrega:** 26/06/2026  
**Desarrollado con:** Next.js 15.3 · TypeScript · Supabase · Resend · Vercel

---

## 1. URL del Portal

| Entorno | URL |
|---------|-----|
| Producción | `https://imperiumiuris.ec` |
| Panel Admin | `https://imperiumiuris.ec/admin/login` |
| Sitemap | `https://imperiumiuris.ec/sitemap.xml` |

> El panel de administración **no tiene enlace visible** en el sitio público. Solo es accesible escribiendo la URL directamente.

---

## 2. Panel de Administración

### Acceso

**URL:** `https://imperiumiuris.ec/admin/login`  
**Credenciales:** Se configuran directamente en Supabase Dashboard.

Para crear o cambiar el usuario administrador:

1. Ir a [supabase.com](https://supabase.com) → su proyecto → **Authentication → Users**
2. Clic en **Add user** → ingresar email y contraseña
3. El usuario creado puede iniciar sesión en `/admin/login`

> No hay límite de usuarios admin — se pueden crear varios con distintos emails si se requiere acceso para más de una persona.

### Secciones del panel

| Sección | URL | Función |
|---------|-----|---------|
| Agenda | `/admin/agenda` | Ver y gestionar citas (pendiente / confirmada / cancelada) |
| Consultas | `/admin/contacto` | Leer y responder mensajes del formulario de contacto |
| Blog | `/admin/blog` | Crear, editar y publicar artículos jurídicos |
| Testimonios | `/admin/testimonios` | Aprobar o rechazar testimonios de clientes |

---

## 3. Variables de Entorno

Todas las variables deben configurarse en **Vercel → Settings → Environment Variables** antes del primer deploy.

### Obligatorias

| Variable | Dónde obtenerla | Para qué sirve |
|----------|----------------|----------------|
| `NEXT_PUBLIC_SUPABASE_URL` | Supabase → Settings → API → Project URL | URL del proyecto Supabase |
| `NEXT_PUBLIC_SUPABASE_ANON_KEY` | Supabase → Settings → API → anon public | Autenticación del admin (login/logout) |
| `SUPABASE_SERVICE_ROLE_KEY` | Supabase → Settings → API → service_role | Operaciones de datos (lectura/escritura) — mantener secreto |
| `RESEND_API_KEY` | resend.com → API Keys | Envío de emails de confirmación |
| `RESEND_FROM_EMAIL` | Dominio verificado en Resend | Email remitente (ej. `contacto@imperiumiuris.ec`) |
| `RESEND_TO_EMAIL` | Email del abogado | Destinatario de notificaciones de nuevas consultas y citas |

### Opcionales

| Variable | Valor ejemplo | Para qué sirve |
|----------|--------------|----------------|
| `NEXT_PUBLIC_WHATSAPP_NUMBER` | `593985222635` | Número WhatsApp del botón de urgencia (sin `+` ni espacios) |

### Archivo `.env.local` para desarrollo

```env
NEXT_PUBLIC_SUPABASE_URL=https://xxxxxxxxxxxx.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=eyJhbGci...
SUPABASE_SERVICE_ROLE_KEY=eyJhbGci...
RESEND_API_KEY=re_xxxxxxxxxxxx
RESEND_FROM_EMAIL=contacto@imperiumiuris.ec
RESEND_TO_EMAIL=abogado@imperiumiuris.ec
NEXT_PUBLIC_WHATSAPP_NUMBER=593985222635
```

> Este archivo **nunca** debe subirse a Git. Ya está incluido en `.gitignore`.

---

## 4. Base de Datos Supabase

### Tablas requeridas

El proyecto necesita 4 tablas en Supabase. Si no están creadas, ejecutar el SQL de `docs/supabase_schema.sql` en **Supabase → SQL Editor**.

| Tabla | Descripción |
|-------|-------------|
| `citas` | Citas agendadas desde `/agenda` |
| `consultas` | Mensajes del formulario `/contacto` |
| `articulos` | Artículos del blog (CMS) |
| `testimonios` | Testimonios de clientes |

### Políticas de seguridad (RLS)

Todas las tablas tienen RLS habilitado:
- **`citas` y `consultas`:** Solo accesibles con `service_role` (el público solo puede insertar vía API route autenticada)
- **`articulos`:** Lectura pública solo de `publicado = true`. Escritura solo con `service_role`
- **`testimonios`:** Lectura pública solo de `estado = 'aprobado'`. Escritura solo con `service_role`

---

## 5. Scores de Calidad (PageSpeed Insights — Producción)

| Categoría | Móvil | Desktop |
|-----------|:-----:|:-------:|
| Performance | 76 | 95 |
| Accessibility | 92 | 92 |
| Best Practices | 100 | 100 |
| SEO | 100 | 100 |

---

## 6. Módulos Entregados

| Módulo | Estado | Descripción |
|--------|:------:|-------------|
| M1 — Sitio web público | ✅ | Home, Nosotros, Servicios, Blog, Contacto, Agenda |
| M2 — Emails automáticos | ✅ | Confirmación al cliente + notificación al abogado (Resend) |
| M3 — Agenda online | ✅ | Reserva de citas con disponibilidad en tiempo real (Supabase) |
| M4 — Panel administración | ✅ | Auth, gestión de citas, consultas, blog CMS, testimonios |

---

## 7. Pendientes para Fase II (Modelo B — Portal de Clientes)

Los siguientes módulos están **planificados pero no implementados**. Requieren validación del Modelo A antes de iniciar.

### M5 — Portal privado de clientes

Cada cliente tendría su propio login y acceso a:

- [ ] Historial personal de citas
- [ ] Estado de su caso en tiempo real
- [ ] Subida y descarga de documentos del expediente
- [ ] Mensajería directa con el abogado
- [ ] Panel de cliente separado del panel admin (`/cliente/*`)

**Infraestructura requerida:**
- Nuevas tablas en Supabase: `clientes`, `casos`, `documentos`, `mensajes`
- Roles separados: `admin` vs `cliente` (Supabase RLS por `auth.uid()`)
- Layout propio en `app/cliente/layout.tsx`
- Middleware extendido para proteger `/cliente/*`

### Otros pendientes menores (no bloquean operación)

| # | Descripción | Prioridad |
|---|-------------|-----------|
| P1 | Actualizar número de teléfono real en `lib/constants.ts` (actualmente placeholder) | **Alta** |
| P2 | Generar `favicon.ico` desde el isotipo del águila | Media |
| P3 | Validar dimensiones de `og-image.jpg` (debe ser 1200×630 px) | Baja |
| P4 | Implementar CSP (Content-Security-Policy) una vez estabilizada la URL de producción | Baja |
| P5 | Validar firma `X-Hub-Signature-256` en webhook de WhatsApp | Media |

---

## 8. Comandos de Desarrollo

```bash
# Instalar dependencias
npm install

# Servidor de desarrollo local
npm run dev

# Build de producción
npm run build

# Verificar tipos TypeScript
npx tsc --noEmit
```

**Requisitos:** Node.js 18+ · npm 9+

---

## 9. Estructura de Archivos Clave

```
app/
├── (public)          → Sitio web público
│   ├── page.tsx      → Home
│   ├── nosotros/     → Quiénes somos
│   ├── servicios/    → Servicios legales
│   ├── blog/         → Blog jurídico (lee de Supabase)
│   ├── contacto/     → Formulario de consulta
│   └── agenda/       → Reserva de citas
├── admin/            → Panel de administración (protegido)
│   ├── login/        → Acceso con Supabase Auth
│   ├── agenda/       → Gestión de citas
│   ├── contacto/     → Consultas recibidas
│   ├── blog/         → CMS de artículos
│   └── testimonios/  → Moderación de testimonios
├── api/              → API Routes (Next.js)
│   ├── contact/      → POST formulario de contacto
│   ├── appointments/ → GET/POST/PATCH/DELETE citas
│   └── admin/        → Endpoints protegidos del panel
lib/
├── supabase.ts       → Cliente service_role (datos)
├── supabase-server.ts → Cliente anon (auth SSR)
├── supabase-browser.ts → Cliente anon (auth cliente)
├── sanitize.ts       → Sanitización HTML del blog
└── constants.ts      → Textos, teléfono, WhatsApp
middleware.ts         → Protección de rutas /admin/*
```

---

*Documento generado el 26/06/2026 · IMPERIUM IURIS v1.0.0*
