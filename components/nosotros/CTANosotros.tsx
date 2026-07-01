'use client'

import { useState } from 'react'
import Button from '@/components/ui/Button'
import { useSiteConfig, useUpdateConfig } from '@/components/providers/ConfigProvider'
import EditableSection from '@/components/admin/EditableSection'
import SectionEditModal from '@/components/admin/SectionEditModal'
import { Field, Input, Textarea } from '@/components/admin/ConfigFormControls'

export default function CTANosotros() {
  const [modalOpen, setModalOpen] = useState(false)
  const { cta_nosotros } = useSiteConfig()
  const updateConfig = useUpdateConfig()
  return (
    <>
    <EditableSection onEdit={() => setModalOpen(true)}>
    <section className="bg-black px-4 py-24 text-center sm:px-6 lg:px-8">
      <h2 className="mx-auto max-w-4xl font-trajan text-3xl font-bold uppercase tracking-[0.1em] text-white md:text-5xl">
        {cta_nosotros.titulo}
      </h2>
      <p className="mx-auto mt-6 max-w-2xl text-lg font-light leading-8 text-text-muted">
        {cta_nosotros.subtitulo}
      </p>
      <div className="mt-9 flex flex-col justify-center gap-4 sm:flex-row">
        <Button href="/contacto">{cta_nosotros.boton_primary}</Button>
        <Button href="/contacto?tipo=urgencia" variant="secondary">{cta_nosotros.boton_secondary}</Button>
      </div>
    </section>
    </EditableSection>

    <SectionEditModal
      clave="cta_nosotros"
      title="Editar CTA final — Nosotros"
      value={cta_nosotros}
      open={modalOpen}
      onClose={() => setModalOpen(false)}
      onSaved={(v) => updateConfig('cta_nosotros', v)}
    >
      {(draft, setDraft) => (
        <>
          <Field label="Título">
            <Input value={draft.titulo} onChange={(e) => setDraft((p) => ({ ...p, titulo: e.target.value }))} />
          </Field>
          <Field label="Subtítulo">
            <Textarea rows={2} value={draft.subtitulo} onChange={(e) => setDraft((p) => ({ ...p, subtitulo: e.target.value }))} />
          </Field>
          <div className="grid gap-5 md:grid-cols-2">
            <Field label="Botón principal">
              <Input value={draft.boton_primary} onChange={(e) => setDraft((p) => ({ ...p, boton_primary: e.target.value }))} />
            </Field>
            <Field label="Botón secundario">
              <Input value={draft.boton_secondary} onChange={(e) => setDraft((p) => ({ ...p, boton_secondary: e.target.value }))} />
            </Field>
          </div>
        </>
      )}
    </SectionEditModal>
    </>
  )
}
