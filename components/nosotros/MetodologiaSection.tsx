'use client'

import { useState } from 'react'
import Image from 'next/image'
import SectionHeader from '@/components/ui/SectionHeader'
import Reveal from '@/components/ui/Reveal'
import { useSiteConfig, useUpdateConfig } from '@/components/providers/ConfigProvider'
import EditableSection from '@/components/admin/EditableSection'
import SectionEditModal from '@/components/admin/SectionEditModal'
import { Field, Input, Textarea } from '@/components/admin/ConfigFormControls'

export default function MetodologiaSection() {
  const [modalOpen, setModalOpen] = useState(false)
  const { metodologia_block } = useSiteConfig()
  const updateConfig = useUpdateConfig()
  return (
    <>
    <EditableSection onEdit={() => setModalOpen(true)}>
    <section className="relative overflow-hidden bg-[#F5F3EE] px-4 py-24 sm:px-6 lg:px-8">

      {/* ─── Isotipo águila — marca de agua ───── */}
      <div
        className="pointer-events-none absolute inset-0 flex items-center justify-center"
        aria-hidden="true"
      >
        <Image
          src="/isotipo-aguila.png"
          alt=""
          width={700}
          height={636}
          className="h-[80%] w-auto max-w-[90%] select-none object-contain"
          style={{ opacity: 0.08 }}
        />
      </div>

      <div className="relative mx-auto max-w-4xl">
        <SectionHeader
          title={metodologia_block.titulo}
          subtitle={metodologia_block.subtitulo}
          invert
        />
        <div className="relative">
          <div className="absolute bottom-0 left-5 top-0 w-px bg-gold/50 md:left-1/2" />
          <div className="space-y-8">
            {metodologia_block.pasos.map(({ titulo, texto }, index) => (
              <Reveal key={titulo} delay={index * 0.06}>
                <article className={`relative grid gap-4 md:grid-cols-2 ${index % 2 === 0 ? '' : 'md:text-right'}`}>
                  <div className={`${index % 2 === 0 ? 'md:col-start-2' : ''} ml-14 border border-gold/25 bg-white p-6 shadow-sm md:ml-0`}>
                    <span className="absolute left-3 top-6 flex h-5 w-5 items-center justify-center rounded-full border border-gold bg-[#F5F3EE] md:left-1/2 md:-ml-2.5" />
                    <p className="font-cinzel text-xs font-semibold uppercase tracking-[0.25em] text-gold">
                      Paso {index + 1}
                    </p>
                    <h3 className="mt-3 font-cinzel text-xl font-semibold text-primary">{titulo}</h3>
                    <p className="mt-3 font-inter text-sm font-light text-primary/70">{texto}</p>
                  </div>
                </article>
              </Reveal>
            ))}
          </div>
        </div>
      </div>
    </section>
    </EditableSection>

    <SectionEditModal
      clave="metodologia_block"
      title="Editar metodología — Nosotros"
      value={metodologia_block}
      open={modalOpen}
      onClose={() => setModalOpen(false)}
      onSaved={(v) => updateConfig('metodologia_block', v)}
    >
      {(draft, setDraft) => (
        <>
          <Field label="Título de la sección">
            <Input value={draft.titulo} onChange={(e) => setDraft((p) => ({ ...p, titulo: e.target.value }))} />
          </Field>
          <Field label="Subtítulo de la sección">
            <Textarea rows={2} value={draft.subtitulo} onChange={(e) => setDraft((p) => ({ ...p, subtitulo: e.target.value }))} />
          </Field>
          <div className="grid gap-4 md:grid-cols-2">
            {draft.pasos.map((paso, i) => (
              <div key={paso.titulo || `paso-${i}`} className="space-y-2 border border-border bg-card-bg p-4">
                <p className="font-montserrat text-xs font-bold uppercase tracking-widest text-gold">Paso {i + 1}</p>
                <Input
                  value={paso.titulo}
                  placeholder="Título del paso"
                  onChange={(e) => setDraft((p) => ({
                    ...p,
                    pasos: p.pasos.map((x, idx) => (idx === i ? { ...x, titulo: e.target.value } : x)),
                  }))}
                />
                <Textarea
                  rows={2}
                  value={paso.texto}
                  placeholder="Descripción del paso"
                  onChange={(e) => setDraft((p) => ({
                    ...p,
                    pasos: p.pasos.map((x, idx) => (idx === i ? { ...x, texto: e.target.value } : x)),
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
