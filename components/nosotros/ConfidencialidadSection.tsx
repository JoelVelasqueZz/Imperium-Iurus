// IMPERIUM IURIS — T05 Confidencialidad
// Módulo: M1 — Sitio Web Público
// RF: RF-43, RF-44, RF-45
// Desarrollado: 2026-05-19
import { Lock } from 'lucide-react'
import SectionHeader from '@/components/ui/SectionHeader'
import { confidentialityItems } from '@/lib/constants'

export default function ConfidencialidadSection() {
  return (
    <section className="bg-primary px-4 py-24 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-5xl">
        <SectionHeader title="La discrecion es parte de nuestra defensa" subtitle="Aplicamos protocolos estrictos para proteger informacion critica antes, durante y despues del proceso." />
        <div className="grid gap-4 md:grid-cols-5">
          {confidentialityItems.map((item) => (
            <div key={item} className="border border-border bg-card-bg p-5 text-center">
              <Lock className="mx-auto mb-4 text-gold" size={24} aria-hidden="true" />
              <p className="font-montserrat text-sm font-medium text-text-light">{item}</p>
            </div>
          ))}
        </div>
        <p className="mt-10 text-center font-cinzel text-xl font-semibold text-gold-light">Lo que nos confia permanece protegido.</p>
      </div>
    </section>
  )
}
