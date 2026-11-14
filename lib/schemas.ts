import { z } from 'zod'

// ─── Formulario de contacto ───────────────────────────────────────────────────

export const contactSchema = z.object({
  nombre: z.string().min(3, 'Nombre requerido (mínimo 3 caracteres)'),
  correo: z.string().email('Correo electrónico inválido'),
  telefono: z.string().min(10, 'Teléfono requerido (mínimo 10 dígitos)'),
  tipoConsulta: z.enum(['personal', 'empresarial', 'funcionario', 'urgencia', 'otro']),
  mensaje: z.string().min(20, 'Describa brevemente su situación (mínimo 20 caracteres)').max(500),
  confidencial: z.boolean(),
})

export type ContactFormData = z.infer<typeof contactSchema>

// ─── Agenda de citas ──────────────────────────────────────────────────────────

export const appointmentSchema = z.object({
  nombre:       z.string().min(3, 'Nombre requerido'),
  correo:       z.string().email('Correo electrónico inválido'),
  telefono:     z.string().min(10, 'Teléfono requerido (mínimo 10 dígitos)'),
  tipoConsulta: z.enum(['personal', 'empresarial', 'urgencia']),
  fecha:        z.string().regex(/^\d{4}-\d{2}-\d{2}$/, 'Fecha inválida'),
  hora:         z.string().regex(/^\d{2}:\d{2}$/, 'Hora inválida'),
  mensaje:      z.string().max(500).optional(),
})

export type AppointmentFormData = z.infer<typeof appointmentSchema>

export const citaEstadoSchema = z.object({
  estado: z.enum(['pendiente', 'confirmada', 'cancelada']),
})

export type CitaEstado = z.infer<typeof citaEstadoSchema>['estado']

// ─── Respuestas de API ────────────────────────────────────────────────────────

export type ApiSuccess<T = null> = { success: true; data: T }
export type ApiError = { success: false; error: string; issues?: Record<string, string[]> }
export type ApiResponse<T = null> = ApiSuccess<T> | ApiError


// T11 — Reglas de validación para crear un evento en Google Calendar
// Archivo: lib/schemas.ts (se pega al final; la línea 1 del archivo ya trae
// `import { z } from 'zod'`, que es la librería de validación).
// Devuelve un texto con la forma "2026-11-12T17:48" (año-mes-día T hora:min).
// La usamos para saber si la cita que nos piden ya pasó.
function ahoraEcuador(): string {
  return new Date() 
    // 2. Conversión de la hora usando el formato de Suecia (2026-11-12 17:48:05). 
    .toLocaleString('sv-SE', { timeZone: 'America/Guayaquil' })
    // 3. Cambiamos el espacio por una "T": "2026-11-12T17:48:05".
    .replace(' ', 'T')
    // 4. Nos quedamos con los primeros 16 caracteres (sin segundos):"2026-11-12T17:48".
    .slice(0, 16)
}


export const eventoCalendarioSchema = z
  .object({
    // titulo: texto obligatorio, corto y sin datos privados del caso
    titulo: z
      // Debe ser texto. Si no viene, este es el mensaje de error.
      .string({ required_error: 'El título es obligatorio' })
      // Quita espacios al inicio y al final.
      .trim()
      // Mínimo 3 letras.
      .min(3, 'El título es obligatorio')
      // Máximo 80 letras.
      .max(80, 'El título es demasiado largo')
      // Regla propia ("título neutro"): rechaza si tiene una @ (correo)
      // o 5 o más números seguidos (teléfono, número de juicio).
      .refine((t) => !/@|\d{5,}/.test(t), 'El título no debe llevar correos, teléfonos ni números de caso'),

    // fecha: texto con forma AAAA-MM-DD y que sea una fecha real
    fecha: z
      .string({ required_error: 'La fecha es obligatoria' })
      // La forma: 4 números, guion, 2 números, guion, 2 números.
      .regex(/^\d{4}-\d{2}-\d{2}$/, 'La fecha debe tener el formato AAAA-MM-DD')
      // Valida fechas inexistentes como 2026-02-30 y las cambia al dia más cercano (2026-03-02).
      .refine((f) => {
        const d = new Date(`${f}T00:00:00Z`)
        return !Number.isNaN(d.getTime()) && d.toISOString().slice(0, 10) === f
      }, 'La fecha no existe'),
    // hora: texto con forma HH:MM entre 00:00 y 23:59
    hora: z
      .string({ required_error: 'La hora es obligatoria' })
      // ([01]\d|2[0-3]) = horas 00 a 19, o 20 a 23.  [0-5]\d = minutos 00 a 59.
      .regex(/^([01]\d|2[0-3]):[0-5]\d$/, 'La hora debe tener el formato HH:MM, por ejemplo 09:30'),

    // duracion: número entero de minutos, entre 15 y 480 (8 horas)
    duracion: z
      // required_error: si no viene. invalid_type_error: si viene como texto ("30").
      .number({ required_error: 'La duración es obligatoria', invalid_type_error: 'La duración debe ser un número de minutos' })
      .int() // Sin decimales (30.5 no vale).
      .min(15, 'La duración mínima es 15 minutos')
      .max(480, 'La duración máxima es 8 horas'),

    // ── descripcion: opcional; si viene, máximo 500 caracteres
    descripcion: z.string().max(500).optional(),

    // ── enlace: opcional; si viene, debe ser una dirección web segura ──
    // Con startsWith exigimos que la URL empiece con https://
    enlace: z
      .string()
      .url('El enlace no es válido')
      .startsWith('https://', 'El enlace debe empezar con https://')
      .optional(),
  })
  // ── Regla que mira dos campos a la vez: fecha + hora no pueden haber pasado ──
  // Juntamos "2026-11-20" + "T" + "10:00" = "2026-11-20T10:00" y lo comparamos
  // con ahoraEcuador(). Como los dos textos tienen exactamente la misma forma,
  // compararlos como texto da el mismo resultado que compararlos como fechas.
  // Zod solo revisa esta regla cuando todos los campos de arriba están bien.
  .refine((d) => `${d.fecha}T${d.hora}` > ahoraEcuador(), {
    message: 'La fecha y hora ya pasaron',
    path: ['fecha'], // El error se muestra como si fuera del campo "fecha".
  })

// TypeScript lo saca automáticamente de las reglas de arriba:
// { titulo: string; fecha: string; hora: string; duracion: number;
//   descripcion?: string; enlace?: string }
// Lo usa la T09 para saber qué datos tiene en la mano después de validar.
export type EventoCalendario = z.infer<typeof eventoCalendarioSchema>