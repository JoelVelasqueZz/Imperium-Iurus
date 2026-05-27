'use client'

import Reveal from '@/components/ui/Reveal'
import SectionHeader from '@/components/ui/SectionHeader'
import { HOME, testimonials } from '@/lib/constants'

export default function TestimonialsBlock() {
  return (
    <section className="bg-primary px-4 py-24 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-6xl">
        <SectionHeader
          eyebrow={HOME.testimonials.eyebrow}
          title={HOME.testimonials.title}
          subtitle={HOME.testimonials.subtitle}
        />
        <div className="grid gap-6 md:grid-cols-3">
          {testimonials.map((quote, index) => (
            <Reveal key={quote} delay={index * 0.08}>
              <blockquote className="h-full border border-border bg-card-bg p-8">
                <p className="font-inter text-lg font-light italic leading-8 text-text-light">&ldquo;{quote}&rdquo;</p>
                <footer className="mt-6 font-cinzel text-xs font-semibold uppercase tracking-[0.25em] text-gold">
                  Cliente confidencial
                </footer>
              </blockquote>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  )
}
