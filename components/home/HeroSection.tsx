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

const bgImages = ['/IMG1.jpeg', '/IMG6.jpeg', '/IMG7.jpeg']

export default function HeroSection() {
  const [current, setCurrent] = useState(0)

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrent((prev) => (prev + 1) % bgImages.length)
    }, 5000)
    return () => clearInterval(timer)
  }, [])

  return (
    <section className="relative isolate flex min-h-screen items-center overflow-hidden bg-primary px-4 pt-24 sm:px-6 lg:px-8">
      {/* Carousel background images — crossfade via opacity transition */}
      {bgImages.map((src, i) => (
        <div
          key={src}
          className="absolute inset-0 -z-30 transition-opacity duration-1000 ease-in-out"
          style={{ opacity: i === current ? 1 : 0 }}
        >
          <Image src={src} alt="" fill sizes="100vw" className="object-cover" priority={i === 0} />
        </div>
      ))}

      <div className="absolute inset-0 -z-20 bg-[radial-gradient(circle_at_50%_25%,rgba(184,134,11,0.22),transparent_28rem),linear-gradient(135deg,#1A1A2E_0%,#0A0A1A_72%)]" />
      <div className="absolute inset-0 -z-10 bg-primary/80" />

      <motion.div
        className="mx-auto max-w-5xl text-center"
        initial="hidden"
        animate="show"
        transition={{ staggerChildren: 0.2 }}
      >
        <motion.div variants={item} transition={{ duration: 0.7, delay: 0.2 }} className="mb-8 flex justify-center">
          <Image
            src="/logo-imperium.png"
            alt="Logo Imperium Iuris"
            width={156}
            height={142}
            className="h-28 w-auto object-contain md:h-36"
            priority
          />
        </motion.div>

        <motion.p variants={item} transition={{ duration: 0.7 }} className="mb-4 font-cinzel text-xs font-semibold uppercase tracking-[0.35em] text-gold-light">
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

        <motion.p
          variants={item}
          transition={{ duration: 0.7 }}
          className="mx-auto mt-7 max-w-3xl font-montserrat text-lg font-light leading-8 text-text-muted md:text-xl"
        >
          {HOME.hero.subtitle}
        </motion.p>

        <motion.p variants={item} transition={{ duration: 0.7 }} className="mt-5 font-montserrat text-base italic text-gold-light">
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
          <Button href="/contacto" variant="tertiary">
            {HOME.hero.ctas.tertiary} <ArrowRight size={16} />
          </Button>
        </motion.div>

        {/* Carousel dots */}
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
