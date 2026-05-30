'use client'

import Image from 'next/image'
import SectionHeader from '@/components/ui/SectionHeader'
import Reveal from '@/components/ui/Reveal'
import { NOSOTROS, methodologySteps } from '@/lib/constants'

export default function MetodologiaSection() {
  return (
    <section className="relative overflow-hidden bg-[#F5F3EE] px-4 py-24 sm:px-6 lg:px-8">

      {/* ─── Isotipo águila — marca de agua ───── */}
      <div
        className="pointer-events-none absolute inset-0 flex items-center justify-center"
        aria-hidden="true"
      >
        <Image
          src="/isotipo-aguila.png"
          alt=""
          width={700}
          height={636}
          className="h-[80%] w-auto max-w-[90%] select-none object-contain"
          style={{ opacity: 0.08 }}
        />
      </div>

      <div className="relative mx-auto max-w-4xl">
        <SectionHeader
          title={NOSOTROS.metodologia.title}
          subtitle={NOSOTROS.metodologia.subtitle}
          invert
        />
        <div className="relative">
          <div className="absolute bottom-0 left-5 top-0 w-px bg-gold/50 md:left-1/2" />
          <div className="space-y-8">
            {methodologySteps.map(([title, text], index) => (
              <Reveal key={title} delay={index * 0.06}>
                <article className={`relative grid gap-4 md:grid-cols-2 ${index % 2 === 0 ? '' : 'md:text-right'}`}>
                  <div className={`${index % 2 === 0 ? 'md:col-start-2' : ''} ml-14 border border-gold/25 bg-white p-6 shadow-sm md:ml-0`}>
                    <span className="absolute left-3 top-6 flex h-5 w-5 items-center justify-center rounded-full border border-gold bg-[#F5F3EE] md:left-1/2 md:-ml-2.5" />
                    <p className="font-cinzel text-xs font-semibold uppercase tracking-[0.25em] text-gold">
                      Paso {index + 1}
                    </p>
                    <h3 className="mt-3 font-cinzel text-xl font-semibold text-primary">{title}</h3>
                    <p className="mt-3 font-inter text-sm font-light text-primary/70">{text}</p>
                  </div>
                </article>
              </Reveal>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}