'use client'

import { useState } from 'react'
import Button from '@/components/ui/Button'
import { useSiteConfig, useUpdateConfig } from '@/components/providers/ConfigProvider'
import EditableSection from '@/components/admin/EditableSection'
import SectionEditModal from '@/components/admin/SectionEditModal'
import { Field, Input } from '@/components/admin/ConfigFormControls'

export default function FinalCTA() {
  const [modalOpen, setModalOpen] = useState(false)
  const { final_cta } = useSiteConfig()
  const updateConfig = useUpdateConfig()
  return (
    <>
    <EditableSection onEdit={() => setModalOpen(true)}>
    <section className="bg-black px-4 py-28 text-center sm:px-6 lg:px-8">
      <div className="mx-auto max-w-4xl">
        <h2 className="font-trajan text-4xl font-bold uppercase tracking-[0.1em] text-white md:text-6xl">
          {final_cta.titulo}
        </h2>
        <div className="mx-auto mt-6 h-px w-24 origin-center animate-[fadeInUp_1.2s_ease-out_forwards] bg-gold" />
        <p className="mx-auto mt-7 max-w-2xl text-lg font-light leading-8 text-text-muted">
          {final_cta.subtitulo}
        </p>
        <div className="mt-9 flex flex-col items-center justify-center gap-4 sm:flex-row">
          <Button href={final_cta.boton_url} className="px-12 py-5 text-sm">
            {final_cta.boton}
          </Button>
          <Button href={final_cta.boton2_url} variant="secondary" className="px-12 py-5 text-sm">
            {final_cta.boton2}
          </Button>
        </div>
      </div>
    </section>
    </EditableSection>

    <SectionEditModal
      clave="final_cta"
      title="Editar CTA final"
      value={final_cta}
      open={modalOpen}
      onClose={() => setModalOpen(false)}
      onSaved={(v) => updateConfig('final_cta', v)}
    >
      {(draft, setDraft) => (
        <div className="space-y-5">
          <Field label="Título">
            <Input value={draft.titulo} onChange={(e) => setDraft((p) => ({ ...p, titulo: e.target.value }))} />
          </Field>
          <Field label="Subtítulo">
            <Input value={draft.subtitulo} onChange={(e) => setDraft((p) => ({ ...p, subtitulo: e.target.value }))} />
          </Field>
          <div className="grid gap-5 md:grid-cols-2">
            <Field label="Texto del botón principal">
              <Input value={draft.boton} onChange={(e) => setDraft((p) => ({ ...p, boton: e.target.value }))} />
            </Field>
            <Field label="Texto del segundo botón">
              <Input value={draft.boton2} onChange={(e) => setDraft((p) => ({ ...p, boton2: e.target.value }))} />
            </Field>
          </div>
        </div>
      )}
    </SectionEditModal>
    </>
  )
}
