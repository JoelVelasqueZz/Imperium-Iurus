'use client'

import { useState } from 'react'
import SectionHeader from '@/components/ui/SectionHeader'
import { NOSOTROS } from '@/lib/constants'
import { useSiteConfig, useUpdateConfig } from '@/components/providers/ConfigProvider'
import EditableSection from '@/components/admin/EditableSection'
import SectionEditModal from '@/components/admin/SectionEditModal'
import { Field, Textarea } from '@/components/admin/ConfigFormControls'

export default function VisionSection() {
  const [modalOpen, setModalOpen] = useState(false)
  const { nosotros_page } = useSiteConfig()
  const updateConfig = useUpdateConfig()
  return (
    <>
    <EditableSection onEdit={() => setModalOpen(true)}>
    <section className="bg-[#F5F3EE] px-4 py-24 text-center sm:px-6 lg:px-8">
      <div className="mx-auto max-w-4xl">
        <SectionHeader title={NOSOTROS.vision.title} invert />
        <p className="text-lg font-light leading-8 text-primary/70">
          {nosotros_page.vision}
        </p>
        <p className="mt-8 font-trajan text-2xl font-bold uppercase tracking-[0.1em] text-primary">
          {NOSOTROS.vision.tagline}
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
        <Field label="Visión">
          <Textarea rows={4} value={draft.vision} onChange={(e) => setDraft((p) => ({ ...p, vision: e.target.value }))} />
        </Field>
      )}
    </SectionEditModal>
    </>
  )
}
