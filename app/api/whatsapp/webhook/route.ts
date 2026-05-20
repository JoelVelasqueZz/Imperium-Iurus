import { type NextRequest, NextResponse } from 'next/server'

// GET — Verificación del webhook de Meta
// Meta llama este endpoint con hub.mode, hub.verify_token y hub.challenge
// Documentación: https://developers.facebook.com/docs/whatsapp/cloud-api/guides/set-up-webhooks
export async function GET(request: NextRequest): Promise<NextResponse> {
  const { searchParams } = request.nextUrl
  const mode = searchParams.get('hub.mode')
  const token = searchParams.get('hub.verify_token')
  const challenge = searchParams.get('hub.challenge')

  if (mode === 'subscribe' && token === process.env.WHATSAPP_VERIFY_TOKEN) {
    // Meta espera el challenge en texto plano (no JSON)
    return new NextResponse(challenge, { status: 200 })
  }

  return NextResponse.json({ error: 'Verificación fallida' }, { status: 403 })
}

// POST — Mensajes y eventos entrantes desde WhatsApp Business
// Meta reenvía aquí todos los mensajes recibidos en el número registrado
export async function POST(request: NextRequest): Promise<NextResponse> {
  let body: unknown
  try {
    body = await request.json()
  } catch {
    return NextResponse.json({ error: 'Body inválido' }, { status: 400 })
  }

  // TODO M2: validar X-Hub-Signature-256 header para verificar que viene de Meta
  //   → crypto.createHmac('sha256', process.env.WHATSAPP_ACCESS_TOKEN).update(rawBody).digest('hex')
  //   → comparar con header 'x-hub-signature-256'

  // TODO M2: extraer mensaje entrante del payload
  //   → body.entry[0].changes[0].value.messages[0]
  //   → campos: from (número), type (text/audio/image), text.body

  // TODO M2: clasificar intención del mensaje
  //   → keywords: 'urgencia', 'detenido', 'notificación', 'empresa'
  //   → derivar al flow correcto

  // TODO M2: responder con template aprobado por Meta
  //   → sendWhatsAppTemplate(from, 'saludo_inicial', [...])

  // TODO M2: si es urgencia, notificar al equipo internamente

  console.log('[WhatsApp webhook]', JSON.stringify(body, null, 2))

  // Meta exige respuesta 200 inmediata — si tarda reintenta el envío
  return NextResponse.json({ received: true })
}
