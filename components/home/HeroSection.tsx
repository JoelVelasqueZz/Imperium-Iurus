'use client'

import Image from 'next/image'
import { ArrowRight, Phone } from 'lucide-react'
import { motion } from 'framer-motion'
import { useEffect, useState } from 'react'
import Button from '@/components/ui/Button'
import { BRAND } from '@/lib/constants'
import { useSiteConfig, useUpdateConfig } from '@/components/providers/ConfigProvider'
import EditableSection from '@/components/admin/EditableSection'
import SectionEditModal from '@/components/admin/SectionEditModal'
import { Field, Input, Textarea } from '@/components/admin/ConfigFormControls'

const item = {
  hidden: { opacity: 0, y: 28 },
  show:   { opacity: 1, y: 0 },
}

export default function HeroSection() {
  const [current, setCurrent] = useState(0)
  const [modalOpen, setModalOpen] = useState(false)
  const { hero, imagenes } = useSiteConfig()
  const updateConfig = useUpdateConfig()
  const bgImages = imagenes.hero_carousel

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrent((prev) => (prev + 1) % bgImages.length)
    }, 5000)
    return () => clearInterval(timer)
  }, [bgImages.length])

  return (
    <>
    <EditableSection onEdit={() => setModalOpen(true)}>
    <section className="relative isolate flex min-h-screen items-center overflow-hidden bg-[#0F1115] px-4 pt-24 sm:px-6 lg:px-8">

      {/* Carousel de fondos */}
      {bgImages.map((src, i) => (
        <div
          key={src}
          className="absolute inset-0 -z-30 transition-opacity duration-1000 ease-in-out"
          style={{ opacity: i === current ? 1 : 0 }}
        >
          <Image
            src={src}
            alt=""
            fill
            sizes="100vw"
            className="object-cover"
            priority={i === 0}
            loading={i === 0 ? 'eager' : 'lazy'}
            quality={75}
          />
          <div className="absolute inset-0 backdrop-blur-[2px]" />
        </div>
      ))}

      {/* Overlay */}
      <div className="absolute inset-0 -z-20 bg-[radial-gradient(circle_at_50%_30%,rgba(201,166,70,0.08),transparent_40rem),linear-gradient(160deg,rgba(13,22,36,0.65)_0%,rgba(15,17,21,0.75)_100%)]" />
      <div className="absolute inset-0 -z-10 bg-[#0F1115]/30" />

      {/* Contenido */}
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
          {hero.title_before}{' '}
          <span className="text-gold">{hero.title_highlight}</span>{' '}
          {hero.title_after}
        </motion.h1>

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
          {hero.subtitle}
        </motion.p>

        <motion.p
          variants={item}
          transition={{ duration: 0.7 }}
          className="mt-5 font-montserrat text-base italic text-gold-light/80"
        >
          {hero.emotional}
        </motion.p>

        <motion.div
          variants={item}
          transition={{ duration: 0.7 }}
          className="mt-10 flex flex-col items-stretch justify-center gap-4 sm:flex-row sm:items-center"
        >
          <Button href="/contacto">{hero.cta_primary}</Button>
          <Button href="/contacto?tipo=urgencia" variant="secondary">
            <Phone size={16} /> {hero.cta_urgent}
          </Button>
          <Button href="/agenda" variant="tertiary">
            {hero.cta_tertiary} <ArrowRight size={16} />
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
    </EditableSection>

    <SectionEditModal
      clave="hero"
      title="Editar Hero"
      value={hero}
      open={modalOpen}
      onClose={() => setModalOpen(false)}
      onSaved={(v) => updateConfig('hero', v)}
    >
      {(draft, setDraft) => (
        <>
          <div className="grid gap-5 md:grid-cols-3">
            <Field label="Título — parte 1">
              <Input value={draft.title_before} onChange={(e) => setDraft((p) => ({ ...p, title_before: e.target.value }))} />
            </Field>
            <Field label="Palabra dorada (énfasis)">
              <Input value={draft.title_highlight} onChange={(e) => setDraft((p) => ({ ...p, title_highlight: e.target.value }))} />
            </Field>
            <Field label="Título — parte 3">
              <Input value={draft.title_after} onChange={(e) => setDraft((p) => ({ ...p, title_after: e.target.value }))} />
            </Field>
          </div>
          <Field label="Subtítulo">
            <Textarea rows={3} value={draft.subtitle} onChange={(e) => setDraft((p) => ({ ...p, subtitle: e.target.value }))} />
          </Field>
          <Field label="Frase emocional">
            <Input value={draft.emotional} onChange={(e) => setDraft((p) => ({ ...p, emotional: e.target.value }))} />
          </Field>
          <div className="grid gap-5 md:grid-cols-3">
            <Field label="Botón principal">
              <Input value={draft.cta_primary} onChange={(e) => setDraft((p) => ({ ...p, cta_primary: e.target.value }))} />
            </Field>
            <Field label="Botón urgencia">
              <Input value={draft.cta_urgent} onChange={(e) => setDraft((p) => ({ ...p, cta_urgent: e.target.value }))} />
            </Field>
            <Field label="Botón agenda">
              <Input value={draft.cta_tertiary} onChange={(e) => setDraft((p) => ({ ...p, cta_tertiary: e.target.value }))} />
            </Field>
          </div>
        </>
      )}
    </SectionEditModal>
    </>
  )
}
