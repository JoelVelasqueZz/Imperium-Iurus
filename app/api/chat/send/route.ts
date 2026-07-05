import { type NextRequest, NextResponse } from 'next/server'
import { z } from 'zod'
import { supabase } from '@/lib/supabase'
import { getUser } from '@/lib/supabase-server'
import { sendPushToAdmin } from '@/lib/push'
import { checkRateLimit } from '@/lib/rate-limit'

const sendSchema = z.object({
  texto: z.string().trim().min(1).max(2000),
})

export async function POST(request: NextRequest) {
  const user = await getUser()
  if (!user) return NextResponse.json({ error: 'No autorizado' }, { status: 401 })

  if (!checkRateLimit(`chat-send:${user.id}`, 20, 60 * 1000)) {
    return NextResponse.json({ error: 'Demasiadas solicitudes. Intente de nuevo en un momento.' }, { status: 429 })
  }

  const parsed = sendSchema.safeParse(await request.json().catch(() => ({})))
  if (!parsed.success) return NextResponse.json({ error: 'Mensaje inválido' }, { status: 422 })

  const { data, error } = await supabase
    .from('mensajes')
    .insert({ cliente_id: user.id, remitente: 'cliente', texto: parsed.data.texto })
    .select()
    .single()

  if (error) return NextResponse.json({ error: error.message }, { status: 502 })

  const nombre = (user.user_metadata?.full_name as string | undefined) ?? user.email ?? 'Un cliente'
  await sendPushToAdmin({
    title: `Nuevo mensaje de ${nombre}`,
    body: parsed.data.texto,
    url: `/admin/chats/${user.id}`,
  })

  return NextResponse.json({ success: true, data })
}
