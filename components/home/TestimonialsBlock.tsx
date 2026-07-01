import { supabase } from '@/lib/supabase'
import TestimonialsBlockClient from './TestimonialsBlockClient'

type TestimonioRow = { id: string; nombre: string; texto: string }

async function getTestimonios(): Promise<{ texto: string; autor: string }[] | null> {
  const { data } = await supabase
    .from('testimonios')
    .select('id, nombre, texto')
    .eq('estado', 'aprobado')
    .order('created_at', { ascending: false })
    .limit(3)

  if (!data || data.length === 0) return null
  return (data as TestimonioRow[]).map((t) => ({ texto: t.texto, autor: t.nombre || 'Cliente confidencial' }))
}

export default async function TestimonialsBlock() {
  const dbTestimonios = await getTestimonios()
  return <TestimonialsBlockClient dbTestimonios={dbTestimonios} />
}
