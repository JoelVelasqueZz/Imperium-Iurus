import type { Metadata } from 'next'
import ServicesBlock from '@/components/home/ServicesBlock'
import CatalogoServicios from '@/components/servicios/CatalogoServicios'
import { getCatalogo } from '@/lib/catalogo'
import { SITE_URL } from '@/lib/site'

export const metadata: Metadata = {
  title: 'Servicios',
  description: 'Defensa penal para personas, empresas, funcionarios públicos y casos mediáticos en Ecuador. Estrategia jurídica integral con cobertura nacional.',
  alternates: { canonical: `${SITE_URL}/servicios` },
  openGraph: {
    title: 'Servicios | Imperium Iuris',
    description: 'Defensa penal estratégica para personas, empresas y funcionarios en Ecuador.',
    url: `${SITE_URL}/servicios`,
  },
}
import FinalCTA from '@/components/home/FinalCTA'

export const dynamic = 'force-dynamic'

export default async function ServiciosPage() {
  const areas = await getCatalogo()

  return (
    <main className="pt-20">
      <CatalogoServicios areas={areas} />
      <ServicesBlock bottomButton />
      <FinalCTA />
    </main>
  )
}
