'use client'

import { useState, useEffect, useCallback } from 'react'
import Image from 'next/image'
import { X, ChevronLeft, ChevronRight } from 'lucide-react'
import { useSiteConfig, useUpdateConfig } from '@/components/providers/ConfigProvider'
import EditableSection from '@/components/admin/EditableSection'
import SectionEditModal from '@/components/admin/SectionEditModal'
import { Field, Input } from '@/components/admin/ConfigFormControls'
import ImageUploadField from '@/components/admin/ImageUploadField'

const GALLERY_ALTS = [
  'Área de recepción — IMPERIUM IURIS',
  'Sala de juntas principal',
  'Lobby de entrada',
  'Lobby con emblema IMPERIUM IURIS',
]

export default function FirmaGallery() {
  const [modalOpen, setModalOpen] = useState(false)
  const { imagenes } = useSiteConfig()
  const updateConfig = useUpdateConfig()
  const galleryImages = imagenes.galeria_nosotros.map((src, i) => ({
    src,
    alt: GALLERY_ALTS[i] ?? 'IMPERIUM IURIS',
  }))
  const [lightbox, setLightbox] = useState<number | null>(null)

  const close = useCallback(() => setLightbox(null), [])

  const prev = useCallback(() =>
    setLightbox((i) => (i === null ? null : (i - 1 + galleryImages.length) % galleryImages.length)),
  [galleryImages.length])

  const next = useCallback(() =>
    setLightbox((i) => (i === null ? null : (i + 1) % galleryImages.length)),
  [galleryImages.length])

  useEffect(() => {
    if (lightbox === null) return
    const handler = (e: KeyboardEvent) => {
      if (e.key === 'Escape') close()
      if (e.key === 'ArrowLeft') prev()
      if (e.key === 'ArrowRight') next()
    }
    window.addEventListener('keydown', handler)
    return () => window.removeEventListener('keydown', handler)
  }, [lightbox, close, prev, next])

  return (
    <>
    <EditableSection onEdit={() => setModalOpen(true)}>
    <section className="bg-primary px-4 py-16 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-7xl">
        <p className="mb-3 text-center font-cinzel text-xs font-semibold uppercase tracking-[0.35em] text-gold-light">
          {imagenes.galeria_nosotros_eyebrow}
        </p>
        <h2 className="mb-10 text-center font-cinzel text-2xl font-semibold uppercase tracking-wide text-text-light md:text-3xl">
          {imagenes.galeria_nosotros_titulo}
        </h2>

        <div className="grid grid-cols-2 gap-3 md:grid-cols-4">
          {galleryImages.map(({ src, alt }, i) => (
            <button
              type="button"
              key={src}
              onClick={() => setLightbox(i)}
              className="group relative aspect-video overflow-hidden border border-border transition-colors hover:border-gold focus-visible:outline focus-visible:outline-2 focus-visible:outline-gold"
              aria-label={`Ver imagen: ${alt}`}
            >
              <Image
                src={src}
                alt={alt}
                fill
                sizes="(min-width: 1024px) 25vw, 50vw"
                className="object-cover transition-transform duration-500 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-black/0 transition-colors duration-300 group-hover:bg-black/30" />
            </button>
          ))}
        </div>
      </div>

      {/* Lightbox */}
      {lightbox !== null && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/92"
          onClick={close}
        >
          {/* Close */}
          <button
            type="button"
            onClick={close}
            aria-label="Cerrar"
            className="absolute right-5 top-5 flex h-10 w-10 items-center justify-center text-white/70 transition-colors hover:text-gold"
          >
            <X size={28} />
          </button>

          {/* Prev */}
          <button
            type="button"
            onClick={(e) => { e.stopPropagation(); prev() }}
            aria-label="Anterior"
            className="absolute left-4 top-1/2 -translate-y-1/2 flex h-10 w-10 items-center justify-center border border-gold/40 text-gold/70 transition-colors hover:border-gold hover:text-gold"
          >
            <ChevronLeft size={22} />
          </button>

          {/* Image */}
          <div
            className="relative h-[80vh] w-[90vw] max-w-5xl"
            onClick={(e) => e.stopPropagation()}
          >
            <Image
              src={galleryImages[lightbox].src}
              alt={galleryImages[lightbox].alt}
              fill
              sizes="90vw"
              className="object-contain"
              priority
            />
          </div>

          {/* Next */}
          <button
            type="button"
            onClick={(e) => { e.stopPropagation(); next() }}
            aria-label="Siguiente"
            className="absolute right-4 top-1/2 -translate-y-1/2 flex h-10 w-10 items-center justify-center border border-gold/40 text-gold/70 transition-colors hover:border-gold hover:text-gold"
          >
            <ChevronRight size={22} />
          </button>

          {/* Counter */}
          <p className="absolute bottom-5 left-1/2 -translate-x-1/2 font-montserrat text-sm text-white/50">
            {lightbox + 1} / {galleryImages.length}
          </p>
        </div>
      )}
    </section>
    </EditableSection>

    <SectionEditModal
      clave="imagenes"
      title="Editar galería de la firma — Nosotros"
      value={imagenes}
      open={modalOpen}
      onClose={() => setModalOpen(false)}
      onSaved={(v) => updateConfig('imagenes', v)}
    >
      {(draft, setDraft) => (
        <>
          <Field label="Eyebrow (texto pequeño superior)">
            <Input
              value={draft.galeria_nosotros_eyebrow}
              onChange={(e) => setDraft((p) => ({ ...p, galeria_nosotros_eyebrow: e.target.value }))}
            />
          </Field>
          <Field label="Título de la sección">
            <Input
              value={draft.galeria_nosotros_titulo}
              onChange={(e) => setDraft((p) => ({ ...p, galeria_nosotros_titulo: e.target.value }))}
            />
          </Field>
          <div className="space-y-4">
            {draft.galeria_nosotros.map((url, i) => (
              <ImageUploadField
                key={i}
                label={`Imagen ${i + 1}`}
                value={url}
                carpeta="galeria"
                onChange={(newUrl) => setDraft((p) => ({
                  ...p,
                  galeria_nosotros: p.galeria_nosotros.map((u, idx) => (idx === i ? newUrl : u)),
                }))}
              />
            ))}
          </div>
        </>
      )}
    </SectionEditModal>
    </>
  )
}
