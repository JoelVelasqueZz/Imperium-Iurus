'use client'

import { useState } from 'react'
import Reveal from '@/components/ui/Reveal'
import SectionHeader from '@/components/ui/SectionHeader'
import { HOME } from '@/lib/constants'
import { useSiteConfig, useUpdateConfig } from '@/components/providers/ConfigProvider'
import EditableSection from '@/components/admin/EditableSection'
import SectionEditModal from '@/components/admin/SectionEditModal'
import { Field, Input, Textarea } from '@/components/admin/ConfigFormControls'

export default function TestimonialsBlockClient({
  dbTestimonios,
}: {
  dbTestimonios: { texto: string; autor: string }[] | null
}) {
  const [modalOpen, setModalOpen] = useState(false)
  const { testimonials_block } = useSiteConfig()
  const updateConfig = useUpdateConfig()
  const quotes = dbTestimonios ?? testimonials_block.testimonios

  return (
    <>
    <EditableSection onEdit={() => setModalOpen(true)}>
    <section className="bg-primary px-4 py-24 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-6xl">
        <SectionHeader
          eyebrow={HOME.testimonials.eyebrow}
          title={testimonials_block.titulo}
          subtitle={testimonials_block.subtitulo}
        />
        <div className="grid gap-6 md:grid-cols-3">
          {quotes.map((quote, index) => (
            <Reveal key={quote.texto} delay={index * 0.08}>
              <blockquote className="h-full border border-border bg-card-bg p-8">
                <p className="font-inter text-lg font-light italic leading-8 text-text-light">&ldquo;{quote.texto}&rdquo;</p>
                <footer className="mt-6 font-cinzel text-xs font-semibold uppercase tracking-[0.25em] text-gold">
                  {quote.autor}
                </footer>
              </blockquote>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
    </EditableSection>

    <SectionEditModal
      clave="testimonials_block"
      title="Editar testimonios"
      value={testimonials_block}
      open={modalOpen}
      onClose={() => setModalOpen(false)}
      onSaved={(v) => updateConfig('testimonials_block', v)}
    >
      {(draft, setDraft) => (
        <>
          <div className="grid gap-5 md:grid-cols-2">
            <Field label="Título de la sección">
              <Input value={draft.titulo} onChange={(e) => setDraft((p) => ({ ...p, titulo: e.target.value }))} />
            </Field>
            <Field label="Subtítulo de la sección">
              <Input value={draft.subtitulo} onChange={(e) => setDraft((p) => ({ ...p, subtitulo: e.target.value }))} />
            </Field>
          </div>
          <p className="text-[11px] text-text-muted/60">
            Estos testimonios se muestran solo mientras no haya testimonios aprobados en /admin/testimonios.
          </p>
          <div className="grid gap-4 md:grid-cols-3">
            {draft.testimonios.map((testimonio, i) => (
              <div key={i} className="space-y-2 border border-border bg-card-bg p-4">
                <Textarea
                  rows={3}
                  value={testimonio.texto}
                  placeholder="Texto del testimonio"
                  onChange={(e) => setDraft((p) => ({
                    ...p,
                    testimonios: p.testimonios.map((t, idx) => (idx === i ? { ...t, texto: e.target.value } : t)),
                  }))}
                />
                <Input
                  value={testimonio.autor}
                  placeholder="Autor"
                  onChange={(e) => setDraft((p) => ({
                    ...p,
                    testimonios: p.testimonios.map((t, idx) => (idx === i ? { ...t, autor: e.target.value } : t)),
                  }))}
                />
              </div>
            ))}
          </div>
        </>
      )}
    </SectionEditModal>
    </>
  )
}
