'use client'

import Image from 'next/image'
import { ArrowRight, Phone } from 'lucide-react'
import { motion } from 'framer-motion'
import { useEffect, useState } from 'react'
import Button from '@/components/ui/Button'
import { BRAND, HOME } from '@/lib/constants'

const item = {
  hidden: { opacity: 0, y: 28 },
  show: { opacity: 1, y: 0 },
}

// Revisa que estas imágenes no estén en blanco en /public
// Si alguna sale blanca, elimínala de este array
const bgImages = ['/IMG1.jpeg', '/IMG6.jpeg', '/IMG7.jpeg']

export default function HeroSection() {
  const [current, setCurrent] = useState(0)
  // Slides 1 y 2 se montan solo después de hidratación — evita 3 descargas
  // simultáneas en el LCP inicial (el browser compite por ancho de banda)
  const [slidesReady, setSlidesReady] = useState(false)

  useEffect(() => {
    setSlidesReady(true)
    const timer = setInterval(() => {
      setCurrent((prev) => (prev + 1) % bgImages.length)
    }, 5000)
    return () => clearInterval(timer)
  }, [])

  return (
    <section className="relative isolate flex min-h-screen items-center overflow-hidden bg-[#0F1115] px-4 pt-24 sm:px-6 lg:px-8">

      {/* ─── Carousel de fondos ─────────────────────────────── */}
      {bgImages.map((src, i) => (
        <div
          key={src}
          className="absolute inset-0 -z-30 transition-opacity duration-1000 ease-in-out"
          style={{ opacity: i === current ? 1 : 0 }}
        >
          {/* Slide 0: siempre en DOM (es el LCP). Slides 1-2: se montan tras hidratación */}
          {(i === 0 || slidesReady) && (
            <Image
              src={src}
              alt=""
              fill
              sizes="100vw"
              className="object-cover"
              priority={i === 0}
              loading={i === 0 ? 'eager' : 'lazy'}
              quality={50}
            />
          )}
          {/* Desenfoque suave sobre cada imagen — efecto glass leve */}
          <div className="absolute inset-0 backdrop-blur-[2px]" />
        </div>
      ))}

      {/* ─── Overlay degradado — más suave para ver las imágenes ── */}
      <div className="absolute inset-0 -z-20 bg-[radial-gradient(circle_at_50%_30%,rgba(201,166,70,0.08),transparent_40rem),linear-gradient(160deg,rgba(13,22,36,0.65)_0%,rgba(15,17,21,0.75)_100%)]" />
      <div className="absolute inset-0 -z-10 bg-[#0F1115]/30" />

      {/* ─── Contenido Hero ─────────────────────────────────── */}
      <motion.div
        className="relative mx-auto max-w-5xl text-center"
        initial="hidden"
        animate="show"
        transition={{ staggerChildren: 0.2 }}
      >
        <motion.p
          variants={item}
          transition={{ duration: 0.7 }}
          className="mb-5 font-cinzel text-xs font-semibold uppercase tracking-[0.35em] text-gold-light"
        >
          {BRAND.location}
        </motion.p>

        <motion.h1
          variants={item}
          transition={{ duration: 0.7 }}
          className="text-balance font-trajan text-4xl font-bold uppercase tracking-[0.08em] text-white sm:text-5xl lg:text-7xl"
        >
          {HOME.hero.titleBefore}{' '}
          <span className="text-gold">{HOME.hero.titleHighlight}</span>{' '}
          {HOME.hero.titleAfter}
        </motion.h1>

        {/* Línea divisoria dorada bajo el título */}
        <motion.div
          variants={item}
          transition={{ duration: 0.7 }}
          className="mx-auto mt-6 h-px w-24 bg-gradient-to-r from-transparent via-gold to-transparent"
        />

        <motion.p
          variants={item}
          transition={{ duration: 0.7 }}
          className="mx-auto mt-7 max-w-2xl font-montserrat text-lg font-light leading-8 text-text-muted md:text-xl"
        >
          {HOME.hero.subtitle}
        </motion.p>

        <motion.p
          variants={item}
          transition={{ duration: 0.7 }}
          className="mt-5 font-montserrat text-base italic text-gold-light/80"
        >
          {HOME.hero.emotional}
        </motion.p>

        <motion.div
          variants={item}
          transition={{ duration: 0.7 }}
          className="mt-10 flex flex-col items-stretch justify-center gap-4 sm:flex-row sm:items-center"
        >
          <Button href="/contacto">{HOME.hero.ctas.primary}</Button>
          <Button href="/contacto?tipo=urgencia" variant="secondary">
            <Phone size={16} /> {HOME.hero.ctas.urgent}
          </Button>
          <Button href="/agenda" variant="tertiary">
            {HOME.hero.ctas.tertiary} <ArrowRight size={16} />
          </Button>
        </motion.div>

        {/* Dots del carousel */}
        <motion.div variants={item} transition={{ duration: 0.7 }} className="mt-10 flex justify-center gap-2">
          {bgImages.map((_, i) => (
            <button
              key={i}
              onClick={() => setCurrent(i)}
              aria-label={`Slide ${i + 1}`}
              className={`h-1.5 rounded-full transition-all duration-500 ${
                i === current ? 'w-8 bg-gold' : 'w-2 bg-white/30'
              }`}
            />
          ))}
        </motion.div>
      </motion.div>
    </section>
  )
}