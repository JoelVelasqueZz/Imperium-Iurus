'use client'

import { useState } from 'react'
import SectionHeader from '@/components/ui/SectionHeader'
import Reveal from '@/components/ui/Reveal'
import { useSiteConfig, useUpdateConfig } from '@/components/providers/ConfigProvider'
import EditableSection from '@/components/admin/EditableSection'
import SectionEditModal from '@/components/admin/SectionEditModal'
import { Field, Input, Textarea, ListEditor } from '@/components/admin/ConfigFormControls'

export default function PorQueSection() {
  const [modalOpen, setModalOpen] = useState(false)
  const { por_que_block } = useSiteConfig()
  const updateConfig = useUpdateConfig()
  return (
    <>
    <EditableSection onEdit={() => setModalOpen(true)}>
    <section className="bg-secondary px-4 py-24 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-6xl">
        <SectionHeader
          title={por_que_block.titulo}
          subtitle={por_que_block.subtitulo}
        />
        <div className="grid gap-4 md:grid-cols-5">
          {por_que_block.items.map((risk, index) => (
            <Reveal key={risk} delay={index * 0.06}>
              <div className="border border-border bg-card-bg p-5 text-center font-cinzel text-sm font-semibold uppercase tracking-wider text-gold-light">
                {risk}
              </div>
            </Reveal>
          ))}
        </div>
        <p className="mx-auto mt-10 max-w-3xl text-center text-base font-light leading-8 text-text-muted">
          {por_que_block.texto}
        </p>
        <p className="mt-6 text-center font-trajan text-2xl font-bold uppercase tracking-[0.12em] text-white">
          {por_que_block.closing}
        </p>
      </div>
    </section>
    </EditableSection>

    <SectionEditModal
      clave="por_que_block"
      title="Editar '¿Por qué existimos?' — Nosotros"
      value={por_que_block}
      open={modalOpen}
      onClose={() => setModalOpen(false)}
      onSaved={(v) => updateConfig('por_que_block', v)}
    >
      {(draft, setDraft) => (
        <>
          <Field label="Título de la sección">
            <Input value={draft.titulo} onChange={(e) => setDraft((p) => ({ ...p, titulo: e.target.value }))} />
          </Field>
          <Field label="Subtítulo de la sección">
            <Textarea rows={2} value={draft.subtitulo} onChange={(e) => setDraft((p) => ({ ...p, subtitulo: e.target.value }))} />
          </Field>
          <Field label="Lista de riesgos (5 items)">
            <ListEditor
              items={draft.items}
              onChange={(items) => setDraft((p) => ({ ...p, items }))}
              placeholder="Agregar riesgo..."
            />
          </Field>
          <Field label="Texto principal">
            <Textarea rows={3} value={draft.texto} onChange={(e) => setDraft((p) => ({ ...p, texto: e.target.value }))} />
          </Field>
          <Field label="Frase de cierre">
            <Input value={draft.closing} onChange={(e) => setDraft((p) => ({ ...p, closing: e.target.value }))} />
          </Field>
        </>
      )}
    </SectionEditModal>
    </>
  )
}
