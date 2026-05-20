import { type NextRequest, NextResponse } from 'next/server'
import { appointmentSchema, type ApiResponse, type AppointmentFormData } from '@/lib/schemas'

// GET — Obtener slots disponibles para agendar
// Query params: fecha (ISO date), tipo (tipoConsulta)
export async function GET(request: NextRequest): Promise<NextResponse> {
  const { searchParams } = request.nextUrl
  const fecha = searchParams.get('fecha')
  const tipo = searchParams.get('tipo')

  if (!fecha) {
    return NextResponse.json({ success: false, error: 'Parámetro fecha requerido' }, { status: 400 })
  }

  // TODO M4: consultar disponibilidad en Cal.com
  //   → GET https://api.cal.com/v1/slots?eventTypeId=CAL_EVENT_TYPE_CONSULTA&startTime=...&endTime=...
  //   → filtrar según tipo (urgencia tiene slots adicionales fuera de horario)

  // TODO M4: convertir slots a zona horaria America/Guayaquil (UTC-5)

  // TODO M4: excluir slots ya reservados en Supabase (doble check de disponibilidad)

  void tipo

  return NextResponse.json({
    success: true,
    data: {
      fecha,
      tipo,
      slots: [] as string[], // ISO datetime strings de slots disponibles
    },
  })
}

// POST — Crear nueva cita
export async function POST(request: NextRequest): Promise<NextResponse<ApiResponse<{ appointmentId: string } | null>>> {
  let body: unknown
  try {
    body = await request.json()
  } catch {
    return NextResponse.json({ success: false, error: 'Body inválido' }, { status: 400 })
  }

  const parsed = appointmentSchema.safeParse(body)
  if (!parsed.success) {
    return NextResponse.json(
      {
        success: false,
        error: 'Datos inválidos',
        issues: parsed.error.flatten().fieldErrors as Record<string, string[]>,
      },
      { status: 422 },
    )
  }

  const data: AppointmentFormData = parsed.data

  // TODO M4: verificar disponibilidad del slot antes de reservar (race condition)

  // TODO M4: crear evento en Cal.com
  //   → POST https://api.cal.com/v1/bookings
  //   → body: { eventTypeId, start, name: data.nombre, email: data.correo, ... }

  // TODO M3: guardar cita en Supabase (tabla: citas)
  //   → campos: nombre, correo, telefono, tipoConsulta, fecha, duracionMinutos, notas, estado, externalId

  // TODO M2: enviar email de confirmación al cliente via Resend
  //   → asunto: 'Cita confirmada — Imperium Iuris'
  //   → incluir: fecha, hora, tipo de consulta, instrucciones

  // TODO M2: enviar notificación al equipo via Resend

  // TODO M2: enviar confirmación por WhatsApp al cliente
  //   → template aprobado: 'confirmacion_cita' con fecha y hora

  void data

  return NextResponse.json({ success: true, data: { appointmentId: '' } }, { status: 201 })
}
