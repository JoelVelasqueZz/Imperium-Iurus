// Solo servidor — importa lib/supabase que usa SUPABASE_SERVICE_ROLE_KEY.
// No importar este archivo desde client components.

import { supabase } from '@/lib/supabase'

// Solo columnas públicas.
const AREA_COLUMNS = 'slug, numero, nombre, orden'
const SERVICIO_COLUMNS = 'slug, numero, nombre, orden'

export type ServicioPublico = {
  slug: string
  numero: number
  nombre: string
  orden: number
}

export type AreaConServicios = {
  slug: string
  numero: number
  nombre: string
  orden: number
  servicios: ServicioPublico[]
}

type AreaFila = Omit<AreaConServicios, 'servicios'> & { id: string }
type ServicioFila = ServicioPublico & { area_id: string }

// Áreas activas con sus servicios activos.
export async function getCatalogo(): Promise<AreaConServicios[]> {
  const { data: areas, error: areasError } = await supabase
    .from('areas_practica')
    .select(`id, ${AREA_COLUMNS}`)
    .eq('activo', true)
    .order('orden', { ascending: true })
    .order('numero', { ascending: true })

  if (areasError) {
    console.error('[catalogo] getCatalogo (áreas):', areasError)
    return []
  }

  const { data: servicios, error: serviciosError } = await supabase
    .from('servicios')
    .select(`area_id, ${SERVICIO_COLUMNS}`)
    .eq('activo', true)
    .order('orden', { ascending: true })
    .order('numero', { ascending: true })

  if (serviciosError) {
    console.error('[catalogo] getCatalogo (servicios):', serviciosError)
    return []
  }

  // id y area_id solo sirven para agrupar, no se devuelven
  const porArea = new Map<string, ServicioPublico[]>()
  for (const { area_id, ...servicio } of (servicios ?? []) as ServicioFila[]) {
    const lista = porArea.get(area_id) ?? []
    lista.push(servicio)
    porArea.set(area_id, lista)
  }

  return ((areas ?? []) as AreaFila[]).map(({ id, ...area }) => ({
    ...area,
    servicios: porArea.get(id) ?? [],
  }))
}

// Un área activa por slug con sus servicios activos, o null si no existe.
export async function getAreaConServicios(slug: string): Promise<AreaConServicios | null> {
  const { data: area, error: areaError } = await supabase
    .from('areas_practica')
    .select(`id, ${AREA_COLUMNS}`)
    .eq('slug', slug)
    .eq('activo', true)
    .maybeSingle()

  if (areaError) {
    console.error('[catalogo] getAreaConServicios (área):', areaError)
    return null
  }
  if (!area) return null

  const { id, ...datosArea } = area as AreaFila

  const { data: servicios, error: serviciosError } = await supabase
    .from('servicios')
    .select(SERVICIO_COLUMNS)
    .eq('area_id', id)
    .eq('activo', true)
    .order('orden', { ascending: true })
    .order('numero', { ascending: true })

  if (serviciosError) {
    console.error('[catalogo] getAreaConServicios (servicios):', serviciosError)
    return null
  }

  return { ...datosArea, servicios: (servicios ?? []) as ServicioPublico[] }
}
