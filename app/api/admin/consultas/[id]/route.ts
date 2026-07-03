import { type NextRequest, NextResponse } from 'next/server'
import { z } from 'zod'
import { supabase } from '@/lib/supabase'
import { getUser } from '@/lib/supabase-server'
import { isAdminUser } from '@/lib/admin-auth'

const schema = z.object({
  estado: z.enum(['nuevo', 'leido', 'respondido', 'archivado']),
})

export async function PATCH(request: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  const user = await getUser()
  if (!isAdminUser(user)) return NextResponse.json({ error: 'No autorizado' }, { status: 401 })

  const { id } = await params
  const parsed = schema.safeParse(await request.json().catch(() => ({})))
  if (!parsed.success) return NextResponse.json({ error: 'Estado inválido' }, { status: 422 })

  const { error } = await supabase.from('consultas').update({ estado: parsed.data.estado }).eq('id', id)
  if (error) return NextResponse.json({ error: error.message }, { status: 502 })

  return NextResponse.json({ success: true })
}
