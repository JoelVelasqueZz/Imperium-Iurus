import { type NextRequest, NextResponse } from 'next/server'
import { z } from 'zod'
import { supabase } from '@/lib/supabase'
import { getUser } from '@/lib/supabase-server'
import { isAdminUser } from '@/lib/admin-auth'
import { supabaseErrorResponse } from '@/lib/api-errors'
import { revalidatePath } from 'next/cache'

const CLAVES_VALIDAS = [
  'contacto',
  'horario_atencion',
  'horario_citas',
  'festivos',
  'hero',
  'redes_sociales',
  'agenda_page',
  'contacto_page',
  'blog_page',
  'blog_preview',
  'nosotros_page',
  'trust_block',
  'services_block',
  'urgency_block',
  'differential_block',
  'final_cta',
  'testimonials_block',
  'footer',
  'por_que_block',
  'equipo_block',
  'metodologia_block',
  'confidencialidad_block',
  'cta_nosotros',
  'imagenes',
] as const

const patchSchema = z.object({
  clave: z.enum(CLAVES_VALIDAS),
  valor: z.record(z.unknown()),
})

export async function GET() {
  const user = await getUser()
  if (!isAdminUser(user)) return NextResponse.json({ error: 'No autorizado' }, { status: 401 })

  const { data, error } = await supabase
    .from('configuracion')
    .select('clave, valor, updated_at')
    .order('clave')

  if (error) return supabaseErrorResponse('admin/configuracion GET', error, 'Error al obtener la configuración.')
  return NextResponse.json({ success: true, data })
}

export async function PATCH(request: NextRequest) {
  const user = await getUser()
  if (!isAdminUser(user)) return NextResponse.json({ error: 'No autorizado' }, { status: 401 })

  const parsed = patchSchema.safeParse(await request.json().catch(() => ({})))
  if (!parsed.success) {
    return NextResponse.json({ error: 'Datos inválidos', issues: parsed.error.flatten().fieldErrors }, { status: 422 })
  }

  const { clave, valor } = parsed.data

  console.log('[PATCH /api/admin/configuracion] clave:', clave)
  console.log('[PATCH /api/admin/configuracion] valor:', JSON.stringify(valor, null, 2))

  const { data, error } = await supabase
    .from('configuracion')
    .upsert({ clave, valor }, { onConflict: 'clave' })
    .select()

  console.log('[PATCH /api/admin/configuracion] supabase response:', { data, error })

  if (error) return supabaseErrorResponse('admin/configuracion PATCH', error, 'Error al guardar la configuración.')

  // Invalidar caché del layout para que el nuevo config se propague
  revalidatePath('/', 'layout')

  return NextResponse.json({ success: true })
}
