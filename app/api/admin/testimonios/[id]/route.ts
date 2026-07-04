import { type NextRequest, NextResponse } from 'next/server'
import { z } from 'zod'
import { supabase } from '@/lib/supabase'
import { getUser } from '@/lib/supabase-server'
import { isAdminUser } from '@/lib/admin-auth'
import { supabaseErrorResponse } from '@/lib/api-errors'

const schema = z.object({
  estado: z.enum(['pendiente', 'aprobado', 'rechazado']),
})

export async function PATCH(request: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  const user = await getUser()
  if (!isAdminUser(user)) return NextResponse.json({ error: 'No autorizado' }, { status: 401 })

  const { id } = await params
  const parsed = schema.safeParse(await request.json().catch(() => ({})))
  if (!parsed.success) return NextResponse.json({ error: 'Estado inválido' }, { status: 422 })

  const { error } = await supabase.from('testimonios').update({ estado: parsed.data.estado }).eq('id', id)
  if (error) return supabaseErrorResponse('admin/testimonios PATCH', error, 'Error al actualizar el testimonio.')
  return NextResponse.json({ success: true })
}

export async function DELETE(_req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  const user = await getUser()
  if (!isAdminUser(user)) return NextResponse.json({ error: 'No autorizado' }, { status: 401 })

  const { id } = await params
  const { error } = await supabase.from('testimonios').delete().eq('id', id)
  if (error) return supabaseErrorResponse('admin/testimonios DELETE', error, 'Error al eliminar el testimonio.')
  return NextResponse.json({ success: true })
}
