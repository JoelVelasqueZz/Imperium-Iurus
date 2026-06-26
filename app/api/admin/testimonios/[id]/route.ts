import { type NextRequest, NextResponse } from 'next/server'
import { z } from 'zod'
import { supabase } from '@/lib/supabase'
import { getUser } from '@/lib/supabase-server'

const schema = z.object({
  estado: z.enum(['pendiente', 'aprobado', 'rechazado']),
})

export async function PATCH(request: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  const user = await getUser()
  if (!user) return NextResponse.json({ error: 'No autorizado' }, { status: 401 })

  const { id } = await params
  const parsed = schema.safeParse(await request.json().catch(() => ({})))
  if (!parsed.success) return NextResponse.json({ error: 'Estado inválido' }, { status: 422 })

  const { error } = await supabase.from('testimonios').update({ estado: parsed.data.estado }).eq('id', id)
  if (error) return NextResponse.json({ error: error.message }, { status: 502 })
  return NextResponse.json({ success: true })
}

export async function DELETE(_req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  const user = await getUser()
  if (!user) return NextResponse.json({ error: 'No autorizado' }, { status: 401 })

  const { id } = await params
  const { error } = await supabase.from('testimonios').delete().eq('id', id)
  if (error) return NextResponse.json({ error: error.message }, { status: 502 })
  return NextResponse.json({ success: true })
}
