---
name: project-imperium-iuris
description: Estado actual y arquitectura del portal jurídico Imperium Iuris (Next.js 15)
metadata:
  type: project
---

Portal jurídico **IMPERIUM IURIS** — firma de defensa penal estratégica en Guayaquil, Ecuador.
Stack: Next.js 15.3 App Router, TypeScript strict, Tailwind CSS, Framer Motion, React Hook Form + Zod.

**Why:** Proyecto académico (7mo semestre PPL) en construcción por módulos.

**Módulos planificados:**
- M1 ✅ Sitio web público (completado)
- M2 🔜 WhatsApp Business API + Resend email
- M3 🔜 Supabase (base de datos: consultas, citas, clientes)
- M4 🔜 Agenda de citas online (Cal.com o Google Calendar)

**How to apply:** Usar estos módulos para priorizar trabajo y vincular TODOs en los route handlers.

**Estado de la base técnica (preparada en sesión 2026-05-19):**
- `lib/schemas.ts` — contactSchema + appointmentSchema + tipos ApiResponse
- `app/api/contact/route.ts` — stub listo para Resend
- `app/api/whatsapp/webhook/route.ts` — GET (verificación Meta) + POST (mensajes entrantes)
- `app/api/appointments/route.ts` — GET (slots) + POST (crear cita)
- `app/api/appointments/[id]/route.ts` — GET, PATCH, DELETE
- `.env.example` — todos los slots para WhatsApp, Resend, Supabase, Cal.com
- Formulario contacto refactorizado con zodResolver + useSearchParams (?tipo=urgencia)

**Pendiente antes de WhatsApp API:**
- Reemplazar placeholders en lib/constants.ts (CONTACT.phone, CONTACT.whatsapp)
- Verificar dominio imperiumiuris.ec en Resend
- Crear cuenta Meta Business y obtener credenciales reales
