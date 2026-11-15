import Link from 'next/link'
import { ArrowRight, Check } from 'lucide-react'
import SectionHeader from '@/components/ui/SectionHeader'
import Reveal from '@/components/ui/Reveal'
import type { AreaConServicios } from '@/lib/catalogo'

// Tarjetas de las áreas con estilo oscuro + dorado.
export default function CatalogoServicios({ areas }: { areas: AreaConServicios[] }) {
  return (
    <section className="bg-primary px-4 py-24 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-7xl">
        <SectionHeader
          eyebrow="Catálogo de servicios"
          title="Áreas de práctica y servicios"
          subtitle="Seleccione un área para ver todos sus servicios."
        />
        {areas.length === 0 ? (
          <p className="text-center font-inter text-base font-light text-text-muted">
            El catálogo de servicios estará disponible próximamente.
          </p>
        ) : (
          <div className="grid gap-6 lg:grid-cols-2">
            {areas.map((area, index) => (
              <Reveal key={area.slug} delay={(index % 2) * 0.08} className="h-full">
                <article className="flex h-full flex-col border border-border bg-card-bg p-7 transition-colors duration-300 hover:border-gold">
                  <div className="flex gap-4">
                    <span
                      className="flex h-12 w-12 shrink-0 items-center justify-center border border-gold/70 bg-primary font-cinzel text-sm font-semibold text-gold"
                      aria-hidden="true"
                    >
                      {String(area.numero).padStart(2, '0')}
                    </span>
                    <h3 className="font-cinzel text-xl font-semibold tracking-wide text-text-light">{area.nombre}</h3>
                  </div>
                  <ul className="mb-6 mt-6 grid gap-3 sm:grid-cols-2">
                    {area.servicios.map((servicio) => (
                      <li key={servicio.slug} className="flex gap-2 font-inter text-sm font-light text-text-muted">
                        <Check size={16} className="mt-0.5 shrink-0 text-gold" aria-hidden="true" />
                        {servicio.nombre}
                      </li>
                    ))}
                  </ul>
                  <Link
                    href={`/servicios/${area.slug}`}
                    aria-label={`Ver el área: ${area.nombre}`}
                    className="focus-gold mt-auto flex items-center justify-between border-t border-border pt-5 font-cinzel text-sm font-semibold tracking-wide text-gold transition-colors hover:text-gold-bright"
                  >
                    Ver área
                    <ArrowRight size={16} aria-hidden="true" />
                  </Link>
                </article>
              </Reveal>
            ))}
          </div>
        )}
      </div>
    </section>
  )
}
