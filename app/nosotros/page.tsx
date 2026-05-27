// IMPERIUM IURIS — T05 Sección Nosotros + perfiles equipo
// Módulo: M1 — Sitio Web Público
// RF: RF-43, RF-44, RF-45
// Desarrollado: 2026-05-19
import AperturaSection from '@/components/nosotros/AperturaSection'
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
