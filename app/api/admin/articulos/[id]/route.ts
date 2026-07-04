import { type NextRequest, NextResponse } from 'next/server'
import { z } from 'zod'
import { supabase } from '@/lib/supabase'
import { getUser } from '@/lib/supabase-server'
import { isAdminUser } from '@/lib/admin-auth'
import { supabaseErrorResponse } from '@/lib/api-errors'

const patchSchema = z.object({
  titulo:         z.string().min(3).optional(),
  slug:           z.string().regex(/^[a-z0-9-]+$/).optional(),
  categoria:      z.string().optional(),
  resumen:        z.string().max(500).optional(),
  contenido:      z.string().optional(),
  tiempo_lectura: z.string().optional(),
  publicado:      z.boolean().optional(),
})

type Params = { params: Promise<{ id: string }> }

export async function GET(_req: NextRequest, { params }: Params) {
  const user = await getUser()
  if (!isAdminUser(user)) return NextResponse.json({ error: 'No autorizado' }, { status: 401 })

  const { id } = await params
  const { data, error } = await supabase.from('articulos').select('*').eq('id', id).single()
  if (error) return NextResponse.json({ error: 'Artículo no encontrado' }, { status: 404 })
  return NextResponse.json({ success: true, data })
}

export async function PATCH(request: NextRequest, { params }: Params) {
  const user = await getUser()
  if (!isAdminUser(user)) return NextResponse.json({ error: 'No autorizado' }, { status: 401 })

  const { id } = await params
  const parsed = patchSchema.safeParse(await request.json().catch(() => ({})))
  if (!parsed.success) return NextResponse.json({ error: 'Datos inválidos' }, { status: 422 })

  const { error } = await supabase
    .from('articulos')
    .update({ ...parsed.data, updated_at: new Date().toISOString() })
    .eq('id', id)
  if (error) return supabaseErrorResponse('admin/articulos PATCH', error, 'Error al actualizar el artículo.')
  return NextResponse.json({ success: true })
}

export async function DELETE(_req: NextRequest, { params }: Params) {
  const user = await getUser()
  if (!isAdminUser(user)) return NextResponse.json({ error: 'No autorizado' }, { status: 401 })

  const { id } = await params
  const { error } = await supabase.from('articulos').delete().eq('id', id)
  if (error) return supabaseErrorResponse('admin/articulos DELETE', error, 'Error al eliminar el artículo.')
  return NextResponse.json({ success: true })
}
