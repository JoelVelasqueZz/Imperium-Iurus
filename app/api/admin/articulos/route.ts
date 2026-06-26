import { type NextRequest, NextResponse } from 'next/server'
import { z } from 'zod'
import { supabase } from '@/lib/supabase'
import { getUser } from '@/lib/supabase-server'

const articuloSchema = z.object({
  titulo:         z.string().min(3),
  slug:           z.string().min(3).regex(/^[a-z0-9-]+$/),
  categoria:      z.string().min(1),
  resumen:        z.string().max(500),
  contenido:      z.string().min(1),
  tiempo_lectura: z.string().default('5 min'),
  publicado:      z.boolean().default(false),
})

export async function GET() {
  const user = await getUser()
  if (!user) return NextResponse.json({ error: 'No autorizado' }, { status: 401 })

  const { data, error } = await supabase.from('articulos').select('*').order('created_at', { ascending: false })
  if (error) return NextResponse.json({ error: error.message }, { status: 502 })
  return NextResponse.json({ success: true, data })
}

export async function POST(request: NextRequest) {
  const user = await getUser()
  if (!user) return NextResponse.json({ error: 'No autorizado' }, { status: 401 })

  const parsed = articuloSchema.safeParse(await request.json().catch(() => ({})))
  if (!parsed.success) return NextResponse.json({ error: 'Datos inválidos', issues: parsed.error.flatten().fieldErrors }, { status: 422 })

  const { data, error } = await supabase.from('articulos').insert(parsed.data).select('id').single()
  if (error) return NextResponse.json({ error: error.message }, { status: 502 })
  return NextResponse.json({ success: true, data }, { status: 201 })
}
