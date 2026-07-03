import { notFound } from 'next/navigation'
import { supabase } from '@/lib/supabase'
import EditarArticuloForm from './EditarArticuloForm'
import type { ArticuloForm } from '@/components/admin/ArticuloFormFields'

export const dynamic = 'force-dynamic'

async function getArticulo(id: string): Promise<ArticuloForm | null> {
  const { data, error } = await supabase
    .from('articulos')
    .select('titulo, slug, categoria, resumen, contenido, tiempo_lectura, publicado')
    .eq('id', id)
    .single()
  if (error || !data) return null
  return { ...data, resumen: data.resumen ?? '' }
}

export default async function EditarArticuloPage({
  params,
}: {
  params: Promise<{ id: string }>
}) {
  const { id } = await params
  const articulo = await getArticulo(id)
  if (!articulo) notFound()

  return <EditarArticuloForm id={id} initial={articulo} />
}
