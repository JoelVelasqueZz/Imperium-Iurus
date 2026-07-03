'use client'

import { useState, useCallback } from 'react'
import Image from 'next/image'
import { ChevronLeft, ChevronRight } from 'lucide-react'
import { AnimatePresence, m } from 'framer-motion'
import Button from '@/components/ui/Button'
import SectionHeader from '@/components/ui/SectionHeader'
import { differentialItems } from '@/lib/constants'
import { useSiteConfig, useUpdateConfig } from '@/components/providers/ConfigProvider'
import EditableSection from '@/components/admin/EditableSection'
import SectionEditModal from '@/components/admin/SectionEditModal'
import { Field, Input, Textarea } from '@/components/admin/ConfigFormControls'
import ImageUploadField from '@/components/admin/ImageUploadField'
import type { ImagenesConfig } from '@/lib/config-utils'

const slideVariants = {
  enter:  (d: number) => ({ opacity: 0, x: d * 50 }),
  center: { opacity: 1, x: 0 },
  exit:   (d: number) => ({ opacity: 0, x: d * -50 }),
}

const total = differentialItems.length

export default function DifferentialBlock() {
  const [current, setCurrent] = useState(0)
  const [direction, setDirection] = useState(1)
  const [textModalOpen, setTextModalOpen] = useState(false)
  const [imagesModalOpen, setImagesModalOpen] = useState(false)
  const { differential_block, imagenes } = useSiteConfig()
  const updateConfig = useUpdateConfig()
  const slideImages = imagenes.diferencial_carousel

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

  const { icon: Icon } = differentialItems[current]
  const { title, text, impact } = differential_block.items[current] ?? differentialItems[current]

  return (
    <>
    <EditableSection onEdit={() => setTextModalOpen(true)} label="Editar textos">
    <section className="relative overflow-hidden bg-text-light px-4 py-24 sm:px-6 lg:px-8">
      {/* IMG4 como textura de fondo de sección con overlay claro */}
      <div className="absolute inset-0 -z-20">
        <Image src="/IMG4.jpeg" alt="" fill sizes="100vw" className="object-cover" quality={60} loading="lazy" />
      </div>
      <div className="absolute inset-0 -z-10 bg-text-light/92" />

      <div className="mx-auto max-w-7xl">
        <SectionHeader
          eyebrow={differential_block.eyebrow}
          title={differential_block.titulo}
          subtitle={differential_block.subtitulo}
          invert
        />

        {/* Carrusel */}
        <div className="relative mt-12 px-12 md:px-16">
          {/* Flecha anterior */}
          <button
            type="button"
            onClick={prev}
            aria-label="Anterior"
            className="absolute left-0 top-1/2 z-10 flex h-10 w-10 -translate-y-1/2 items-center justify-center border border-gold/60 bg-white text-gold transition-colors hover:border-gold hover:bg-gold/10"
          >
            <ChevronLeft size={20} aria-hidden="true" />
          </button>

          {/* Flecha siguiente */}
          <button
            type="button"
            onClick={next}
            aria-label="Siguiente"
            className="absolute right-0 top-1/2 z-10 flex h-10 w-10 -translate-y-1/2 items-center justify-center border border-gold/60 bg-white text-gold transition-colors hover:border-gold hover:bg-gold/10"
          >
            <ChevronRight size={20} aria-hidden="true" />
          </button>

          {/* Slides */}
          <div className="overflow-hidden">
            <AnimatePresence mode="wait" custom={direction}>
              <m.article
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
                  src={slideImages[current] ?? '/IMG1.jpeg'}
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
              </m.article>
            </AnimatePresence>
          </div>

          {/* Dots */}
          <div className="mt-6 flex justify-center gap-2">
            {differentialItems.map(({ title }, i) => (
              <button
                type="button"
                key={title}
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
            {differential_block.closing}
          </p>
          <Button href="/contacto">{differential_block.cta}</Button>
        </div>
      </div>
    </section>
    </EditableSection>

    {/* Modal para editar textos */}
    <SectionEditModal
      clave="differential_block"
      title="Editar diferencial — Textos"
      value={differential_block}
      open={textModalOpen}
      onClose={() => setTextModalOpen(false)}
      onSaved={(v) => updateConfig('differential_block', v)}
    >
      {(draft, setDraft) => (
        <>
          <Field label="Eyebrow (texto pequeño superior)">
            <Input value={draft.eyebrow} onChange={(e) => setDraft((p) => ({ ...p, eyebrow: e.target.value }))} />
          </Field>
          <div className="grid gap-5 md:grid-cols-2">
            <Field label="Título de la sección">
              <Input value={draft.titulo} onChange={(e) => setDraft((p) => ({ ...p, titulo: e.target.value }))} />
            </Field>
            <Field label="Subtítulo de la sección">
              <Input value={draft.subtitulo} onChange={(e) => setDraft((p) => ({ ...p, subtitulo: e.target.value }))} />
            </Field>
          </div>
          <div className="grid gap-5 md:grid-cols-2">
            <Field label="Frase de cierre">
              <Input value={draft.closing} onChange={(e) => setDraft((p) => ({ ...p, closing: e.target.value }))} />
            </Field>
            <Field label="Texto del botón CTA">
              <Input value={draft.cta} onChange={(e) => setDraft((p) => ({ ...p, cta: e.target.value }))} />
            </Field>
          </div>
          <button
            type="button"
            onClick={() => { setTextModalOpen(false); setImagesModalOpen(true) }}
            className="w-full border border-gold/50 px-4 py-3 font-montserrat text-xs font-bold uppercase tracking-widest text-gold transition-colors hover:border-gold hover:bg-gold/10"
          >
            Editar imágenes de fondo →
          </button>
          <div className="space-y-4">
            {draft.items.map((diff, i) => (
              <div key={differentialItems[i]?.title ?? `diferencial-${i}`} className="space-y-3 border border-border bg-card-bg p-4">
                <p className="font-montserrat text-xs font-bold uppercase tracking-widest text-gold">
                  {differentialItems[i]?.title ?? `Diferencial ${i + 1}`}
                </p>
                <Field label="Título">
                  <Input
                    value={diff.title}
                    onChange={(e) => setDraft((p) => ({
                      ...p,
                      items: p.items.map((x, idx) => (idx === i ? { ...x, title: e.target.value } : x)),
                    }))}
                  />
                </Field>
                <Field label="Texto">
                  <Textarea
                    rows={2}
                    value={diff.text}
                    onChange={(e) => setDraft((p) => ({
                      ...p,
                      items: p.items.map((x, idx) => (idx === i ? { ...x, text: e.target.value } : x)),
                    }))}
                  />
                </Field>
                <Field label="Frase de impacto">
                  <Input
                    value={diff.impact}
                    onChange={(e) => setDraft((p) => ({
                      ...p,
                      items: p.items.map((x, idx) => (idx === i ? { ...x, impact: e.target.value } : x)),
                    }))}
                  />
                </Field>
              </div>
            ))}
          </div>
        </>
      )}
    </SectionEditModal>

    {/* Modal separado para editar imágenes */}
    <SectionEditModal<ImagenesConfig>
      clave="imagenes"
      title="Editar diferencial — Imágenes"
      value={imagenes}
      open={imagesModalOpen}
      onClose={() => setImagesModalOpen(false)}
      onSaved={(v) => updateConfig('imagenes', v)}
    >
      {(draft, setDraft) => (
        <div className="space-y-4">
          {differentialItems.map(({ title }, i) => (
            <div key={title} className="border border-border bg-card-bg p-4">
              <p className="mb-3 font-montserrat text-xs font-bold uppercase tracking-widest text-gold">
                Slide {i + 1}: {title}
              </p>
              <ImageUploadField
                label="Imagen de fondo"
                value={draft.diferencial_carousel[i] ?? ''}
                carpeta="diferencial"
                onChange={(url) => setDraft((p) => ({
                  ...p,
                  diferencial_carousel: p.diferencial_carousel.map((u, idx) => (idx === i ? url : u)),
                }))}
              />
            </div>
          ))}
        </div>
      )}
    </SectionEditModal>
    </>
  )
}
