// IMPERIUM IURIS — T05 Visión
// Módulo: M1 — Sitio Web Público
// RF: RF-43, RF-44, RF-45
import SectionHeader from '@/components/ui/SectionHeader'
import { NOSOTROS } from '@/lib/constants'

export default function VisionSection() {
  return (
    <section className="bg-secondary px-4 py-24 text-center sm:px-6 lg:px-8">
      <div className="mx-auto max-w-4xl">
        <SectionHeader title={NOSOTROS.vision.title} />
        <p className="text-lg font-light leading-8 text-text-muted">{NOSOTROS.vision.body}</p>
        <p className="mt-8 font-trajan text-2xl font-bold uppercase tracking-[0.1em] text-white">
          {NOSOTROS.vision.tagline}
        </p>
      </div>
    </section>
  )
}
