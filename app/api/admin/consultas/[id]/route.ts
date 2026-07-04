import { type NextRequest, NextResponse } from 'next/server'
import { z } from 'zod'
import { supabase } from '@/lib/supabase'
import { getUser } from '@/lib/supabase-server'
import { isAdminUser } from '@/lib/admin-auth'
import { supabaseErrorResponse } from '@/lib/api-errors'

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
  if (error) return supabaseErrorResponse('admin/consultas PATCH', error, 'Error al actualizar la consulta.')

  return NextResponse.json({ success: true })
}
