import { type NextRequest, NextResponse } from 'next/server'
import { getUser } from '@/lib/supabase-server'
import { verifyTrustedDeviceToken } from '@/lib/trusted-device-server'

// Valida el token de "dispositivo recordado" contra la sesión activa
// (AAL1, recién autenticada por contraseña, antes de pedir el 2FA).
export async function POST(request: NextRequest) {
  const user = await getUser()
  if (!user) {
    return NextResponse.json({ trusted: false })
  }

  const body = await request.json().catch(() => null)
  const token = body?.token
  if (typeof token !== 'string') {
    return NextResponse.json({ trusted: false })
  }

  const trusted = verifyTrustedDeviceToken(token, user.id)
  return NextResponse.json({ trusted })
}
