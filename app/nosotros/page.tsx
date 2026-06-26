import type { Metadata } from 'next'
import AperturaSection from '@/components/nosotros/AperturaSection'

export const metadata: Metadata = {
  title: 'Nosotros',
  description: 'Conozca al equipo de Imperium Iuris — firma jurídica de defensa penal estratégica en Guayaquil. Experiencia, metodología y compromiso con cada caso.',
  alternates: { canonical: 'https://imperiumiuris.ec/nosotros' },
  openGraph: {
    title: 'Nosotros | Imperium Iuris',
    description: 'Equipo de abogados penalistas con experiencia en casos complejos en Ecuador.',
    url: 'https://imperiumiuris.ec/nosotros',
  },
}
import FilosofiaSection from '@/components/nosotros/FilosofiaSection'
import PorQueSection from '@/components/nosotros/PorQueSection'
import EquipoSection from '@/components/nosotros/EquipoSection'
import FirmaGallery from '@/components/nosotros/FirmaGallery'
import MetodologiaSection from '@/components/nosotros/MetodologiaSection'
import ConfidencialidadSection from '@/components/nosotros/ConfidencialidadSection'
import VisionSection from '@/components/nosotros/VisionSection'
import CTANosotros from '@/components/nosotros/CTANosotros'

export default function NosotrosPage() {
  return (
    <main>
      <AperturaSection />
      <FilosofiaSection />
      <PorQueSection />
      <EquipoSection />
      <FirmaGallery />
      <MetodologiaSection />
      <ConfidencialidadSection />
      <VisionSection />
      <CTANosotros />
    </main>
  )
}
