// Solo servidor — importa lib/supabase que usa SUPABASE_SERVICE_ROLE_KEY.
// No importar este archivo desde client components.

import { cache } from 'react'
import { unstable_cache } from 'next/cache'
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

// Si la consulta falla lanza el error, así unstable_cache no guarda un resultado vacío.
async function consultarCatalogo(): Promise<AreaConServicios[]> {
  const { data: areas, error: areasError } = await supabase
    .from('areas_practica')
    .select(`id, ${AREA_COLUMNS}`)
    .eq('activo', true)
    .order('orden', { ascending: true })
    .order('numero', { ascending: true })

  if (areasError) throw new Error(`áreas: ${areasError.message}`)

  const { data: servicios, error: serviciosError } = await supabase
    .from('servicios')
    .select(`area_id, ${SERVICIO_COLUMNS}`)
    .eq('activo', true)
    .order('orden', { ascending: true })
    .order('numero', { ascending: true })

  if (serviciosError) throw new Error(`servicios: ${serviciosError.message}`)

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

// Se guarda 5 minutos, el tag permite refrescarlo desde el admin con revalidateTag('catalogo').
const catalogoEnCache = unstable_cache(consultarCatalogo, ['catalogo'], {
  revalidate: 300,
  tags: ['catalogo'],
})

// Áreas activas con sus servicios activos.
export async function getCatalogo(): Promise<AreaConServicios[]> {
  try {
    return await catalogoEnCache()
  } catch (error) {
    console.error('[catalogo] getCatalogo:', error)
    return []
  }
}

// Un área activa por slug, o null si no existe.
// cache() evita repetir la búsqueda entre generateMetadata y la página.
export const getAreaConServicios = cache(async (slug: string): Promise<AreaConServicios | null> => {
  const catalogo = await getCatalogo()
  return catalogo.find((area) => area.slug === slug) ?? null
})
