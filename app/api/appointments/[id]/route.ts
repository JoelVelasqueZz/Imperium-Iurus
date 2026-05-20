import { type NextRequest, NextResponse } from 'next/server'
import { type ApiResponse } from '@/lib/schemas'

type RouteParams = { params: Promise<{ id: string }> }

// GET — Obtener detalle de una cita por ID
export async function GET(
  _request: NextRequest,
  { params }: RouteParams,
): Promise<NextResponse> {
  const { id } = await params

  // TODO M4: consultar cita en Supabase por ID
  // TODO M4: verificar que pertenece al solicitante (auth / token en query param)

  return NextResponse.json({ success: true, data: { appointment: null, id } })
}

// PATCH — Reprogramar cita (nueva fecha/hora)
export async function PATCH(
  request: NextRequest,
  { params }: RouteParams,
): Promise<NextResponse<ApiResponse<{ appointmentId: string } | null>>> {
  const { id } = await params

  let body: unknown
  try {
    body = await request.json()
  } catch {
    return NextResponse.json({ success: false, error: 'Body inválido' }, { status: 400 })
  }

  // TODO M4: validar nueva fecha/hora con appointmentSchema.pick({ fecha: true })
  // TODO M4: verificar disponibilidad del nuevo slot

  // TODO M4: actualizar evento en Cal.com
  //   → PATCH https://api.cal.com/v1/bookings/{externalId}

  // TODO M3: actualizar registro en Supabase

  // TODO M2: enviar email de reprogramación via Resend
  //   → asunto: 'Su cita ha sido reprogramada — Imperium Iuris'

  // TODO M2: notificar reprogramación por WhatsApp

  void body

  return NextResponse.json({ success: true, data: { appointmentId: id } })
}

// DELETE — Cancelar cita
export async function DELETE(
  _request: NextRequest,
  { params }: RouteParams,
): Promise<NextResponse<ApiResponse>> {
  const { id } = await params

  // TODO M4: cancelar evento en Cal.com
  //   → DELETE https://api.cal.com/v1/bookings/{externalId}

  // TODO M3: marcar como cancelada en Supabase (no borrar — auditoría)
  //   → UPDATE citas SET estado='cancelada', canceladaAt=now() WHERE id=id

  // TODO M2: enviar email de cancelación via Resend

  // TODO M2: notificar cancelación por WhatsApp

  return NextResponse.json({ success: true, data: null })
}
