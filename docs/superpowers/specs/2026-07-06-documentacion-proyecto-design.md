# Diseño — Documentación del proyecto (Imperium Iuris)

## Contexto

Joel va a dejar el proyecto y quiere dejar dos documentos de traspaso para los estudiantes que lo continúen:

1. **Documentación del proyecto** (este spec) — qué es el sistema, cómo está construido, cómo se conectan sus piezas.
2. **Guía del programador** (spec/trabajo futuro, no cubierto aquí) — cómo configurar y correr el proyecto: GitHub, Supabase, variables de entorno, deploy.

Una amiga de Joel hará por separado un **manual de usuario** (cómo usar el panel admin desde la perspectiva de quien lo opera). No es responsabilidad de este trabajo.

`docs/ENTREGA.md` es un snapshot de la entrega v1.0.0 (26/06/2026) que ya trae en su propio encabezado la nota: *"será reemplazado por una guía de onboarding completa"*. Este spec formaliza ese reemplazo: su contenido vigente (URLs, módulos, estructura de archivos, variables de entorno, tablas Supabase) se redistribuye entre la documentación del proyecto y la futura guía del programador, y el archivo se elimina. `AUDITORIA_SEGURIDAD.md`, `QA_REPORT.md` y `pendientes-cliente.md` no se tocan — quedan como referencia técnica puntual, sin fusionar.

`docs/` es un vault de Obsidian (existe `docs/.obsidian/`).

## Objetivo

Un único archivo Markdown, `docs/DOCUMENTACION.md`, que le permita a un estudiante nuevo entender qué es Imperium Iuris y cómo está armado sin tener que leer el código primero — complementario a `CLAUDE.md` (que es la referencia técnica de trabajo para agentes/desarrolladores activos), pero escrito en prosa para una persona que recién llega.

**Fuera de alcance de este documento** (van en la guía del programador): variables de entorno, creación del proyecto en Supabase, deploy en Vercel/GitHub, comandos de desarrollo (`npm install`, `npm run dev`, etc.).

## Estructura del documento

1. **Portada / resumen** — qué es Imperium Iuris, stack (Next.js 15.3, TypeScript, Supabase, Resend, Vercel), estado actual (M1–M4 + portal cliente + push + inline editing, todos completados), link a producción (`https://imperiumiuris.ec`).
2. **Recorrido del sitio público** — una subsección por página (Home, Nosotros, Servicios, Blog, Contacto, Agenda): qué hace cada una, de dónde saca sus datos (config de Supabase vs. contenido estático), captura de pantalla.
3. **Portal de cliente** — login con Google OAuth + 2FA/dispositivo confiable, chat en tiempo real, mis-citas. Con capturas.
4. **Panel de administración** — un apartado por sección (Agenda, Consultas, Blog CMS, Testimonios, Chats, Configuración): qué gestiona cada una. Con capturas de Agenda, Blog y Configuración (ver lista de capturas).
5. **Arquitectura y flujos clave** — contenido ya maduro en `CLAUDE.md` (sistema de configuración inline, notificaciones push, autenticación, clientes Supabase) reescrito en prosa narrativa para alguien nuevo, no como referencia rápida de tablas. Incluye el diagrama de call-graph generado con noodles (link al viewer publicado: https://fascinating-dasik-c50921.netlify.app/) y la nota sobre su limitación conocida con el alias `@/` de TypeScript (ver `CLAUDE.md`, sección "Análisis de call graph con noodles").
6. **Modelo de datos** — las 7 tablas de Supabase (`configuracion`, `citas`, `consultas`, `articulos`, `testimonios`, `mensajes`, `push_subscriptions`) explicadas en lenguaje llano: qué guarda cada una y cómo se relacionan entre sí.
7. **Módulos y estado del proyecto** — tabla de módulos completados (de `CLAUDE.md`) + lo que quedó pendiente para fase II, actualizado desde `ENTREGA.md` sección 7 (`Pendientes para Fase II`) a la fecha de este documento.
8. **Créditos / continuidad** — quién construyó el proyecto, dónde está la guía del programador y el manual de usuario (una vez existan), a quién preguntar dudas si aplica.

## Flujo de trabajo para las imágenes

Se redacta el documento completo primero, con placeholders exactos en cada punto donde va una captura (`![Descripción](attachments/nombre-archivo.png)`), más la lista de capturas como anexo al final del documento con las instrucciones de qué tomar. Joel toma las capturas cuando pueda y las coloca en `docs/attachments/` con el nombre exacto — el documento ya las enlaza automáticamente al existir el archivo. El documento es 100% legible sin las imágenes desde el primer borrador.

### Recomendaciones técnicas para las capturas

- Viewport 1440×900, zoom 100%, ventana sin barra de marcadores.
- Formato PNG. Página completa (no solo el viewport) cuando el navegador lo permita, especialmente para el home.
- Guardar en `docs/attachments/` con el nombre exacto de la tabla siguiente (kebab-case).
- **Privacidad:** en cualquier pantalla de `/admin/agenda`, `/admin/contacto` o `/admin/chats` que muestre citas, consultas o chats reales, usar registros de **prueba** creados para la captura, o tapar/difuminar nombre, teléfono, correo y mensaje — varias consultas están marcadas `confidencial` y corresponden a clientes reales.

### Lista de capturas (12)

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

Testimonios, consultas y chats-admin quedan fuera de la lista inicial por ser visualmente redundantes con `admin-agenda.png` (misma plantilla de tabla admin) — se pueden agregar después reutilizando el mismo patrón de placeholder.

## Fuentes de contenido

- `CLAUDE.md` — arquitectura, sistema de configuración, notificaciones push, autenticación, tablas Supabase, rutas, convenciones.
- `docs/ENTREGA.md` — URLs, módulos entregados, pendientes de fase II (antes de eliminarlo).
- Análisis de call-graph con noodles (memoria de sesión, `noodles_mcp_installed.md`) — diagrama publicado y su limitación conocida.
- Exploración directa del código donde `CLAUDE.md` no cubra el detalle necesario (ej. estructura exacta de páginas del portal cliente).

## Criterios de aceptación

- `docs/DOCUMENTACION.md` existe, cubre las 8 secciones descritas, y es legible de corrido sin las imágenes.
- Los 12 placeholders de imagen usan exactamente los nombres de archivo de la tabla, apuntando a `docs/attachments/`.
- `docs/ENTREGA.md` se elimina; cualquier dato vigente que contenía (URLs, módulos, pendientes) ya vive en `docs/DOCUMENTACION.md`.
- `AUDITORIA_SEGURIDAD.md`, `QA_REPORT.md`, `pendientes-cliente.md` no se modifican.
- No se incluye contenido de configuración de entorno/despliegue (eso es la guía del programador, fuera de alcance).

## Fuera de alcance

- La guía del programador (setup: GitHub, Supabase, Vercel, variables de entorno, comandos de desarrollo) — spec y trabajo separados, a iniciar después de aprobar este documento.
- El manual de usuario — lo hace la amiga de Joel, no se toca aquí.
- Tomar las capturas de pantalla reales — responsabilidad de Joel siguiendo la lista de este spec.
