import { createHmac, timingSafeEqual } from 'crypto'
import { type NextRequest, NextResponse } from 'next/server'

// Verifica que el payload viene de Meta comparando X-Hub-Signature-256
// (HMAC-SHA256 del cuerpo crudo firmado con el App Secret de la app de Meta)
function isValidMetaSignature(rawBody: string, signatureHeader: string | null): boolean {
  if (!signatureHeader?.startsWith('sha256=')) return false

  const appSecret = process.env.WHATSAPP_APP_SECRET
  if (!appSecret) return false

  const expected = createHmac('sha256', appSecret).update(rawBody).digest('hex')
  const received = signatureHeader.slice('sha256='.length)

  const expectedBuf = Buffer.from(expected, 'hex')
  const receivedBuf = Buffer.from(received, 'hex')
  if (expectedBuf.length !== receivedBuf.length) return false

  return timingSafeEqual(expectedBuf, receivedBuf)
}

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
  const rawBody = await request.text()

  if (!isValidMetaSignature(rawBody, request.headers.get('x-hub-signature-256'))) {
    return NextResponse.json({ error: 'Firma inválida' }, { status: 403 })
  }

  let body: unknown
  try {
    body = JSON.parse(rawBody)
  } catch {
    return NextResponse.json({ error: 'Body inválido' }, { status: 400 })
  }

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
