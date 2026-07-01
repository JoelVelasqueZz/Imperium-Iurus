'use client'

import { useState } from 'react'
import { Lock } from 'lucide-react'
import SectionHeader from '@/components/ui/SectionHeader'
import { useSiteConfig, useUpdateConfig } from '@/components/providers/ConfigProvider'
import EditableSection from '@/components/admin/EditableSection'
import SectionEditModal from '@/components/admin/SectionEditModal'
import { Field, Input, Textarea, ListEditor } from '@/components/admin/ConfigFormControls'

export default function ConfidencialidadSection() {
  const [modalOpen, setModalOpen] = useState(false)
  const { confidencialidad_block } = useSiteConfig()
  const updateConfig = useUpdateConfig()
  return (
    <>
    <EditableSection onEdit={() => setModalOpen(true)}>
    <section className="bg-primary px-4 py-24 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-5xl">
        <SectionHeader
          title={confidencialidad_block.titulo}
          subtitle={confidencialidad_block.subtitulo}
        />
        <div className="grid gap-4 md:grid-cols-5">
          {confidencialidad_block.items.map((item) => (
            <div
              key={item}
              className="border border-gold/20 bg-card-bg p-5 text-center transition-colors hover:border-gold"
            >
              <Lock className="mx-auto mb-4 text-gold" size={24} aria-hidden="true" />
              <p className="font-inter text-sm font-medium text-text-light">{item}</p>
            </div>
          ))}
        </div>
        <p className="mt-10 text-center font-cinzel text-xl font-semibold text-gold">
          {confidencialidad_block.closing}
        </p>
      </div>
    </section>
    </EditableSection>

    <SectionEditModal
      clave="confidencialidad_block"
      title="Editar confidencialidad — Nosotros"
      value={confidencialidad_block}
      open={modalOpen}
      onClose={() => setModalOpen(false)}
      onSaved={(v) => updateConfig('confidencialidad_block', v)}
    >
      {(draft, setDraft) => (
        <>
          <Field label="Título de la sección">
            <Input value={draft.titulo} onChange={(e) => setDraft((p) => ({ ...p, titulo: e.target.value }))} />
          </Field>
          <Field label="Subtítulo de la sección">
            <Textarea rows={2} value={draft.subtitulo} onChange={(e) => setDraft((p) => ({ ...p, subtitulo: e.target.value }))} />
          </Field>
          <Field label="Lista de items (5)">
            <ListEditor
              items={draft.items}
              onChange={(items) => setDraft((p) => ({ ...p, items }))}
              placeholder="Agregar item..."
            />
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
