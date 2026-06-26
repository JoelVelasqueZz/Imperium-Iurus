'use client'

import { useState, useCallback } from 'react'
import Image from 'next/image'
import { ChevronLeft, ChevronRight } from 'lucide-react'
import { AnimatePresence, motion } from 'framer-motion'
import Button from '@/components/ui/Button'
import SectionHeader from '@/components/ui/SectionHeader'
import { differentialItems, HOME } from '@/lib/constants'

const slideImages = [
  '/IMG1.jpeg', // Diagnóstico Estratégico
  '/IMG5.jpeg', // Defensa Multidisciplinaria
  '/IMG2.jpeg', // Máxima Confidencialidad
  '/IMG6.jpeg', // Litigación de Alto Impacto
  '/IMG7.jpeg', // Protección Reputacional
  '/IMG8.jpeg', // Tecnología Legal Avanzada
]

// Definido fuera del componente — referencia estable, framer-motion no re-registra
const slideVariants = {
  enter:  (d: number) => ({ opacity: 0, x: d * 50 }),
  center: { opacity: 1, x: 0 },
  exit:   (d: number) => ({ opacity: 0, x: d * -50 }),
}

const total = differentialItems.length

export default function DifferentialBlock() {
  const [current, setCurrent] = useState(0)
  const [direction, setDirection] = useState(1)

  const prev = useCallback(() => {
    setDirection(-1)
    setCurrent((c) => (c - 1 + total) % total)
  }, [])

  const next = useCallback(() => {
    setDirection(1)
    setCurrent((c) => (c + 1) % total)
  }, [])

  const goTo = useCallback((i: number, cur: number) => {
    setDirection(i > cur ? 1 : -1)
    setCurrent(i)
  }, [])

  const { icon: Icon, title, text, impact } = differentialItems[current]

  return (
    <section className="relative overflow-hidden bg-text-light px-4 py-24 sm:px-6 lg:px-8">
      {/* IMG4 como textura de fondo de sección con overlay claro */}
      <div className="absolute inset-0 -z-20">
        <Image src="/IMG4.jpeg" alt="" fill sizes="100vw" className="object-cover" quality={60} loading="lazy" />
      </div>
      <div className="absolute inset-0 -z-10 bg-text-light/92" />

      <div className="mx-auto max-w-7xl">
        <SectionHeader
          eyebrow={HOME.differential.eyebrow}
          title={HOME.differential.title}
          subtitle={HOME.differential.subtitle}
          invert
        />

        {/* Carrusel */}
        <div className="relative mt-12 px-12 md:px-16">
          {/* Flecha anterior */}
          <button
            onClick={prev}
            aria-label="Anterior"
            className="absolute left-0 top-1/2 z-10 flex h-10 w-10 -translate-y-1/2 items-center justify-center border border-gold/60 bg-white text-gold transition-colors hover:border-gold hover:bg-gold/10"
          >
            <ChevronLeft size={20} aria-hidden="true" />
          </button>

          {/* Flecha siguiente */}
          <button
            onClick={next}
            aria-label="Siguiente"
            className="absolute right-0 top-1/2 z-10 flex h-10 w-10 -translate-y-1/2 items-center justify-center border border-gold/60 bg-white text-gold transition-colors hover:border-gold hover:bg-gold/10"
          >
            <ChevronRight size={20} aria-hidden="true" />
          </button>

          {/* Slides — todas las imágenes preloadadas en el DOM, solo la activa visible */}
          <div className="overflow-hidden">
            <AnimatePresence mode="wait" custom={direction}>
              <motion.article
                key={current}
                custom={direction}
                variants={slideVariants}
                initial="enter"
                animate="center"
                exit="exit"
                transition={{ duration: 0.35, ease: 'easeInOut' }}
                className="relative min-h-[280px] overflow-hidden border border-primary/15 bg-white p-8 md:p-14"
              >
                {/* Imagen de fondo del slide actual */}
                <Image
                  src={slideImages[current]}
                  alt=""
                  fill
                  sizes="(min-width: 1280px) 1280px, 100vw"
                  className="object-cover opacity-10"
                  priority={current === 0}
                />
                <div className="absolute inset-0 bg-white/88" />

                <div className="relative z-10">
                  <div className="mb-6 flex h-14 w-14 items-center justify-center border border-gold bg-primary text-gold">
                    <Icon size={24} aria-hidden="true" />
                  </div>
                  <h3 className="font-cinzel text-xl font-semibold uppercase tracking-wider text-primary md:text-2xl">
                    {title}
                  </h3>
                  <p className="mt-4 max-w-2xl font-inter text-base font-light leading-7 text-primary/65">
                    {text}
                  </p>
                  <p className="mt-6 font-cinzel text-sm font-semibold uppercase tracking-widest text-gold">
                    {impact}
                  </p>
                </div>
              </motion.article>
            </AnimatePresence>
          </div>

          {/* Dots */}
          <div className="mt-6 flex justify-center gap-2">
            {differentialItems.map((_, i) => (
              <button
                key={i}
                onClick={() => goTo(i, current)}
                aria-label={`Diferencial ${i + 1}`}
                className={`h-1.5 rounded-full transition-all duration-300 ${
                  i === current ? 'w-8 bg-gold' : 'w-2 bg-primary/20 hover:bg-gold/40'
                }`}
              />
            ))}
          </div>
        </div>

        <div className="mt-14 text-center">
          <p className="mb-5 font-cinzel text-lg font-semibold tracking-wide text-primary">
            {HOME.differential.closing}
          </p>
          <Button href="/contacto">{HOME.differential.cta}</Button>
        </div>
      </div>
    </section>
  )
}
