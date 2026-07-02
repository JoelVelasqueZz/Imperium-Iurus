'use client'

import { useState } from 'react'
import { useSiteConfig, useUpdateConfig } from '@/components/providers/ConfigProvider'
import EditableSection from '@/components/admin/EditableSection'
import SectionEditModal from '@/components/admin/SectionEditModal'
import { Field, Input, Textarea } from '@/components/admin/ConfigFormControls'

export default function AperturaSection() {
  const [modalOpen, setModalOpen] = useState(false)
  const { nosotros_page } = useSiteConfig()
  const updateConfig = useUpdateConfig()
  return (
    <>
    <EditableSection onEdit={() => setModalOpen(true)} bottomButton>
    <section className="premium-surface px-4 pb-20 pt-36 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-5xl text-center">
        <p className="font-cinzel text-xs font-semibold uppercase tracking-[0.35em] text-gold-light">
          {nosotros_page.eyebrow}
        </p>
        <h1 className="mt-6 font-trajan text-4xl font-bold uppercase tracking-[0.08em] text-white md:text-6xl">
          {nosotros_page.titulo}
        </h1>
        <p className="mx-auto mt-7 max-w-3xl text-lg font-light leading-8 text-text-muted">
          {nosotros_page.intro}
        </p>
        <p className="mx-auto mt-8 max-w-4xl text-base font-light leading-8 text-text-light">
          {nosotros_page.descripcion}
        </p>
        <p className="mx-auto mt-4 max-w-4xl text-base font-light leading-8 text-text-muted">
          {nosotros_page.tagline}
        </p>
      </div>
    </section>
    </EditableSection>

    <SectionEditModal
      clave="nosotros_page"
      title="Editar título e introducción — Nosotros"
      value={nosotros_page}
      open={modalOpen}
      onClose={() => setModalOpen(false)}
      onSaved={(v) => updateConfig('nosotros_page', v)}
    >
      {(draft, setDraft) => (
        <>
          <Field label="Eyebrow (texto pequeño superior)">
            <Input value={draft.eyebrow} onChange={(e) => setDraft((p) => ({ ...p, eyebrow: e.target.value }))} />
          </Field>
          <Field label="Título">
            <Input value={draft.titulo} onChange={(e) => setDraft((p) => ({ ...p, titulo: e.target.value }))} />
          </Field>
          <Field label="Introducción">
            <Textarea rows={3} value={draft.intro} onChange={(e) => setDraft((p) => ({ ...p, intro: e.target.value }))} />
          </Field>
          <Field label="Descripción de la firma">
            <Textarea rows={4} value={draft.descripcion} onChange={(e) => setDraft((p) => ({ ...p, descripcion: e.target.value }))} />
          </Field>
          <Field label="Tagline (frase final)">
            <Textarea rows={2} value={draft.tagline} onChange={(e) => setDraft((p) => ({ ...p, tagline: e.target.value }))} />
          </Field>
        </>
      )}
    </SectionEditModal>
    </>
  )
}
