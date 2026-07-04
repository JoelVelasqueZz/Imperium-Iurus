import { type NextRequest, NextResponse } from 'next/server'
import { z } from 'zod'
import { supabase } from '@/lib/supabase'
import { getUser } from '@/lib/supabase-server'
import { isAdminUser } from '@/lib/admin-auth'
import { supabaseErrorResponse } from '@/lib/api-errors'

const subscribeSchema = z.object({
  endpoint: z.string().url(),
  keys: z.object({
    p256dh: z.string(),
    auth: z.string(),
  }),
})

export async function POST(request: NextRequest) {
  const user = await getUser()
  if (!isAdminUser(user)) return NextResponse.json({ error: 'No autorizado' }, { status: 401 })

  const parsed = subscribeSchema.safeParse(await request.json().catch(() => ({})))
  if (!parsed.success) return NextResponse.json({ error: 'Datos inválidos' }, { status: 422 })

  const { endpoint, keys } = parsed.data

  const { error } = await supabase
    .from('push_subscriptions')
    .upsert({ endpoint, p256dh: keys.p256dh, auth: keys.auth }, { onConflict: 'endpoint' })

  if (error) return supabaseErrorResponse('admin/push/subscribe POST', error, 'Error al guardar la suscripción.')
  return NextResponse.json({ success: true })
}
