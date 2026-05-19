// IMPERIUM IURIS — T01 HOME principal
// Módulo: M1 — Sitio Web Público
// RF: RF-01, RF-02, RF-03, RF-04, RF-18, RF-19, RF-20, RF-48
// Desarrollado: 2026-05-19
import HeroSection from '@/components/home/HeroSection'
import TrustBlock from '@/components/home/TrustBlock'
import ServicesBlock from '@/components/home/ServicesBlock'
import UrgencyBlock from '@/components/home/UrgencyBlock'
import DifferentialBlock from '@/components/home/DifferentialBlock'
import TestimonialsBlock from '@/components/home/TestimonialsBlock'
import BlogPreview from '@/components/home/BlogPreview'
import FinalCTA from '@/components/home/FinalCTA'

export default function HomePage() {
  return (
    <main>
      <HeroSection />
      <TrustBlock />
      <ServicesBlock />
      <UrgencyBlock />
      <DifferentialBlock />
      <TestimonialsBlock />
      <BlogPreview />
      <FinalCTA />
    </main>
  )
}
