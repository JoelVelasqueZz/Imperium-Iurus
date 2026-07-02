import { supabase } from '@/lib/supabase'
import BlogPreviewClient from './BlogPreviewClient'

type ArticuloPreview = {
  slug: string
  titulo: string
  categoria: string
  resumen: string
  tiempo_lectura: string
}

async function getArticulos(): Promise<ArticuloPreview[]> {
  const { data } = await supabase
    .from('articulos')
    .select('slug, titulo, categoria, resumen, tiempo_lectura')
    .eq('publicado', true)
    .order('created_at', { ascending: false })
    .limit(3)
  return (data ?? []) as ArticuloPreview[]
}

export default async function BlogPreview() {
  const articulos = await getArticulos()
  return <BlogPreviewClient articulos={articulos} />
}
