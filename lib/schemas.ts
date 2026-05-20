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
  nombre: z.string().min(3, 'Nombre requerido'),
  correo: z.string().email('Correo electrónico inválido'),
  telefono: z.string().min(10, 'Teléfono requerido'),
  tipoConsulta: z.enum(['personal', 'empresarial', 'funcionario', 'urgencia']),
  fecha: z.string().datetime({ message: 'Fecha inválida' }),
  duracionMinutos: z.number().int().positive().default(30),
  notas: z.string().max(500).optional(),
})

export type AppointmentFormData = z.infer<typeof appointmentSchema>

// ─── Respuestas de API ────────────────────────────────────────────────────────

export type ApiSuccess<T = null> = { success: true; data: T }
export type ApiError = { success: false; error: string; issues?: Record<string, string[]> }
export type ApiResponse<T = null> = ApiSuccess<T> | ApiError
