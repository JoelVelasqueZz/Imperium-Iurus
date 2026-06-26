import { type NextRequest, NextResponse } from 'next/server'
import { citaEstadoSchema, type ApiResponse } from '@/lib/schemas'
import { supabase } from '@/lib/supabase'

type RouteParams = { params: Promise<{ id: string }> }

// GET — Detalle de una cita
export async function GET(
  _request: NextRequest,
  { params }: RouteParams,
): Promise<NextResponse> {
  const { id } = await params
  const { data, error } = await supabase.from('citas').select('*').eq('id', id).maybeSingle()
  if (error || !data) {
    return NextResponse.json({ success: false, error: 'Cita no encontrada' }, { status: 404 })
  }
  return NextResponse.json({ success: true, data })
}

// PATCH — Cambiar estado (admin)
export async function PATCH(
  request: NextRequest,
  { params }: RouteParams,
): Promise<NextResponse<ApiResponse<{ id: string } | null>>> {
  const { id } = await params

  let body: unknown
  try {
    body = await request.json()
  } catch {
    return NextResponse.json({ success: false, error: 'Body inválido' }, { status: 400 })
  }

  const parsed = citaEstadoSchema.safeParse(body)
  if (!parsed.success) {
    return NextResponse.json(
      { success: false, error: 'Estado inválido', issues: parsed.error.flatten().fieldErrors as Record<string, string[]> },
      { status: 422 },
    )
  }

  const { error } = await supabase
    .from('citas')
    .update({ estado: parsed.data.estado })
    .eq('id', id)

  if (error) {
    console.error('[appointments/id] Supabase error:', error)
    return NextResponse.json({ success: false, error: 'Error al actualizar la cita.' }, { status: 502 })
  }

  return NextResponse.json({ success: true, data: { id } })
}

// DELETE — Cancelar cita (marca como cancelada, no borra)
export async function DELETE(
  _request: NextRequest,
  { params }: RouteParams,
): Promise<NextResponse<ApiResponse>> {
  const { id } = await params
  const { error } = await supabase
    .from('citas')
    .update({ estado: 'cancelada' })
    .eq('id', id)

  if (error) {
    return NextResponse.json({ success: false, error: 'Error al cancelar la cita.' }, { status: 502 })
  }
  return NextResponse.json({ success: true, data: null })
}
