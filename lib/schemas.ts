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
