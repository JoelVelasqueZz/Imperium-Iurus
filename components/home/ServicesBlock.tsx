'use client'

// IMPERIUM IURIS — T04 Sección Áreas de Práctica
// Módulo: M1 — Sitio Web Público
// RF: RF-18, RF-19, RF-20
import { useState } from 'react'
import { Check, ChevronDown } from 'lucide-react'
import { AnimatePresence, motion } from 'framer-motion'
import SectionHeader from '@/components/ui/SectionHeader'
import { HOME, serviceBlocks } from '@/lib/constants'

export default function ServicesBlock() {
  const [open, setOpen] = useState(serviceBlocks[0].id)

  return (
    <section className="bg-secondary px-4 py-24 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-7xl">
        <SectionHeader
          eyebrow={HOME.services.eyebrow}
          title={HOME.services.title}
          subtitle={HOME.services.subtitle}
        />
        <div className="grid gap-6 lg:grid-cols-2">
          {serviceBlocks.map(({ id, icon: Icon, title, headline, desc, services, impact }) => {
            const isOpen = open === id
            return (
              <motion.article
                key={id}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-80px' }}
                className="border border-border bg-card-bg/85 p-7 transition-all duration-300 hover:border-l-[3px] hover:border-l-gold hover:bg-primary/80"
              >
                <button
                  className="focus-gold flex w-full items-start justify-between gap-4 text-left"
                  onClick={() => setOpen(isOpen ? '' : id)}
                  aria-expanded={isOpen}
                >
                  <span className="flex gap-4">
                    <span className="flex h-12 w-12 shrink-0 items-center justify-center border border-gold/50 text-gold">
                      <Icon size={24} aria-hidden="true" />
                    </span>
                    <span>
                      <span className="font-cinzel text-xs font-semibold uppercase tracking-[0.28em] text-gold-light">{title}</span>
                      <h3 className="mt-3 font-cinzel text-xl font-semibold tracking-wide text-text-light">{headline}</h3>
                    </span>
                  </span>
                  <ChevronDown className={`mt-2 shrink-0 text-gold transition-transform ${isOpen ? 'rotate-180' : ''}`} aria-hidden="true" />
                </button>
                <p className="mt-5 font-montserrat text-sm font-light leading-7 text-text-muted">{desc}</p>
                <AnimatePresence initial={false}>
                  {isOpen ? (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: 'auto', opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      className="overflow-hidden"
                    >
                      <ul className="mt-6 grid gap-3 sm:grid-cols-2">
                        {services.map((service) => (
                          <li key={service} className="flex gap-2 text-sm font-light text-text-muted">
                            <Check size={16} className="mt-0.5 shrink-0 text-gold" aria-hidden="true" />
                            {service}
                          </li>
                        ))}
                      </ul>
                      <p className="mt-6 border-t border-border pt-5 font-cinzel text-sm font-semibold tracking-wide text-gold-light">{impact}</p>
                    </motion.div>
                  ) : null}
                </AnimatePresence>
              </motion.article>
            )
          })}
        </div>
      </div>
    </section>
  )
}
