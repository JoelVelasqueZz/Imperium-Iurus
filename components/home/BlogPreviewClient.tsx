'use client'

import { useState } from 'react'
import Link from 'next/link'
import { ArrowRight } from 'lucide-react'
import SectionHeader from '@/components/ui/SectionHeader'
import Reveal from '@/components/ui/Reveal'
import EditableSection from '@/components/admin/EditableSection'
import SectionEditModal from '@/components/admin/SectionEditModal'
import { Field, Input } from '@/components/admin/ConfigFormControls'
import { useSiteConfig, useUpdateConfig } from '@/components/providers/ConfigProvider'

type ArticuloPreview = {
  slug: string
  titulo: string
  categoria: string
  resumen: string
  tiempo_lectura: string
}

export default function BlogPreviewClient({ articulos }: { articulos: ArticuloPreview[] }) {
  const [modalOpen, setModalOpen] = useState(false)
  const { blog_preview } = useSiteConfig()
  const updateConfig = useUpdateConfig()

  if (articulos.length === 0) return null

  return (
    <>
      <EditableSection onEdit={() => setModalOpen(true)}>
        <section className="bg-text-light px-4 py-24 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-7xl">
            <SectionHeader
              eyebrow={blog_preview.eyebrow}
              title={blog_preview.titulo}
              subtitle={blog_preview.subtitulo}
              invert
            />
            <div className="grid gap-6 md:grid-cols-3">
              {articulos.map((art, index) => (
                <Reveal key={art.slug} delay={index * 0.08}>
                  <article className="h-full border border-primary/15 bg-white p-7 transition-colors hover:border-gold">
                    <p className="font-inter text-xs font-medium uppercase tracking-[0.25em] text-gold">
                      {art.categoria} · {art.tiempo_lectura}
                    </p>
                    <h3 className="mt-5 font-cinzel text-xl font-semibold tracking-wide text-primary">{art.titulo}</h3>
                    <p className="mt-4 font-inter text-sm font-light leading-7 text-primary/65">{art.resumen}</p>
                    <Link
                      href={`/blog/${art.slug}`}
                      className="focus-gold mt-6 inline-flex items-center gap-2 font-inter text-xs font-bold uppercase tracking-widest text-gold hover:text-gold-bright"
                    >
                      Leer artículo <ArrowRight size={16} />
                    </Link>
                  </article>
                </Reveal>
              ))}
            </div>
          </div>
        </section>
      </EditableSection>

      <SectionEditModal
        clave="blog_preview"
        title="Editar encabezado del blog — Inicio"
        value={blog_preview}
        open={modalOpen}
        onClose={() => setModalOpen(false)}
        onSaved={(v) => updateConfig('blog_preview', v)}
      >
        {(draft, setDraft) => (
          <div className="space-y-5">
            <Field label="Eyebrow (texto pequeño superior)">
              <Input value={draft.eyebrow} onChange={(e) => setDraft((p) => ({ ...p, eyebrow: e.target.value }))} />
            </Field>
            <Field label="Título">
              <Input value={draft.titulo} onChange={(e) => setDraft((p) => ({ ...p, titulo: e.target.value }))} />
            </Field>
            <Field label="Subtítulo">
              <Input value={draft.subtitulo} onChange={(e) => setDraft((p) => ({ ...p, subtitulo: e.target.value }))} />
            </Field>
          </div>
        )}
      </SectionEditModal>
    </>
  )
}
