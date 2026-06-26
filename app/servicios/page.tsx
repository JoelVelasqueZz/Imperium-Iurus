import type { Metadata } from 'next'
import ServicesBlock from '@/components/home/ServicesBlock'

export const metadata: Metadata = {
  title: 'Servicios',
  description: 'Defensa penal para personas, empresas, funcionarios públicos y casos mediáticos en Ecuador. Estrategia jurídica integral con cobertura nacional.',
  alternates: { canonical: 'https://imperiumiuris.ec/servicios' },
  openGraph: {
    title: 'Servicios | Imperium Iuris',
    description: 'Defensa penal estratégica para personas, empresas y funcionarios en Ecuador.',
    url: 'https://imperiumiuris.ec/servicios',
  },
}
import FinalCTA from '@/components/home/FinalCTA'

export default function ServiciosPage() {
  return (
    <main className="pt-20">
      <ServicesBlock />
      <FinalCTA />
    </main>
  )
}
