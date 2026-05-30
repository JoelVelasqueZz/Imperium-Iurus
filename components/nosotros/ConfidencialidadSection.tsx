import { Lock } from 'lucide-react'
import SectionHeader from '@/components/ui/SectionHeader'
import { confidentialityItems, NOSOTROS } from '@/lib/constants'

export default function ConfidencialidadSection() {
  return (
    <section className="bg-primary px-4 py-24 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-5xl">
        <SectionHeader
          title={NOSOTROS.confidencialidad.title}
          subtitle={NOSOTROS.confidencialidad.subtitle}
        />
        <div className="grid gap-4 md:grid-cols-5">
          {confidentialityItems.map((item) => (
            <div
              key={item}
              className="border border-gold/20 bg-card-bg p-5 text-center transition-colors hover:border-gold"
            >
              <Lock className="mx-auto mb-4 text-gold" size={24} aria-hidden="true" />
              <p className="font-inter text-sm font-medium text-text-light">{item}</p>
            </div>
          ))}
        </div>
        <p className="mt-10 text-center font-cinzel text-xl font-semibold text-gold">
          {NOSOTROS.confidencialidad.closing}
        </p>
      </div>
    </section>
  )
}