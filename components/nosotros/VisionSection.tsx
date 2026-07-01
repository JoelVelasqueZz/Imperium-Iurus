'use client'

import { useState } from 'react'
import SectionHeader from '@/components/ui/SectionHeader'
import { useSiteConfig, useUpdateConfig } from '@/components/providers/ConfigProvider'
import EditableSection from '@/components/admin/EditableSection'
import SectionEditModal from '@/components/admin/SectionEditModal'
import { Field, Input, Textarea } from '@/components/admin/ConfigFormControls'

export default function VisionSection() {
  const [modalOpen, setModalOpen] = useState(false)
  const { nosotros_page } = useSiteConfig()
  const updateConfig = useUpdateConfig()
  return (
    <>
    <EditableSection onEdit={() => setModalOpen(true)}>
    <section className="bg-[#F5F3EE] px-4 py-24 text-center sm:px-6 lg:px-8">
      <div className="mx-auto max-w-4xl">
        <SectionHeader title={nosotros_page.vision_titulo} invert />
        <p className="text-lg font-light leading-8 text-primary/70">
          {nosotros_page.vision}
        </p>
        <p className="mt-8 font-trajan text-2xl font-bold uppercase tracking-[0.1em] text-primary">
          {nosotros_page.vision_tagline}
        </p>
      </div>
    </section>
    </EditableSection>

    <SectionEditModal
      clave="nosotros_page"
      title="Editar visión — Nosotros"
      value={nosotros_page}
      open={modalOpen}
      onClose={() => setModalOpen(false)}
      onSaved={(v) => updateConfig('nosotros_page', v)}
    >
      {(draft, setDraft) => (
        <>
          <Field label="Título de la sección">
            <Input value={draft.vision_titulo} onChange={(e) => setDraft((p) => ({ ...p, vision_titulo: e.target.value }))} />
          </Field>
          <Field label="Texto de la visión">
            <Textarea rows={4} value={draft.vision} onChange={(e) => setDraft((p) => ({ ...p, vision: e.target.value }))} />
          </Field>
          <Field label="Tagline (frase final)">
            <Input value={draft.vision_tagline} onChange={(e) => setDraft((p) => ({ ...p, vision_tagline: e.target.value }))} />
          </Field>
        </>
      )}
    </SectionEditModal>
    </>
  )
}
