import { type NextRequest, NextResponse } from 'next/server'
import { contactSchema, type ApiResponse } from '@/lib/schemas'

export async function POST(request: NextRequest): Promise<NextResponse<ApiResponse>> {
  let body: unknown
  try {
    body = await request.json()
  } catch {
    return NextResponse.json({ success: false, error: 'Body inválido' }, { status: 400 })
  }

  const parsed = contactSchema.safeParse(body)
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

  const data = parsed.data

  // TODO M2: enviar email de notificación al equipo via Resend
  //   → asunto: `Nueva consulta ${data.tipoConsulta} — ${data.nombre}`
  //   → destinatario: process.env.RESEND_REPLY_TO

  // TODO M2: enviar email de confirmación al cliente via Resend
  //   → asunto: 'Hemos recibido su consulta — Imperium Iuris'
  //   → destinatario: data.correo

  // TODO M3: guardar consulta en Supabase (tabla: consultas)
  //   → campos: nombre, correo, telefono, tipoConsulta, mensaje, confidencial, createdAt

  // TODO M2: si es urgencia, notificar al equipo por WhatsApp Business API
  //   → if (data.tipoConsulta === 'urgencia') → sendWhatsAppAlert(data)

  void data

  return NextResponse.json({ success: true, data: null })
}
