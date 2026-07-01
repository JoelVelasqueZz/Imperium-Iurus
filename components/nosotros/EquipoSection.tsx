'use client'

import { useState } from 'react'
import { UserRound } from 'lucide-react'
import SectionHeader from '@/components/ui/SectionHeader'
import Reveal from '@/components/ui/Reveal'
import { useSiteConfig, useUpdateConfig } from '@/components/providers/ConfigProvider'
import EditableSection from '@/components/admin/EditableSection'
import SectionEditModal from '@/components/admin/SectionEditModal'
import { Field, Input, Textarea, ListEditor } from '@/components/admin/ConfigFormControls'

export default function EquipoSection() {
  const [modalOpen, setModalOpen] = useState(false)
  const { equipo_block } = useSiteConfig()
  const updateConfig = useUpdateConfig()
  return (
    <>
    <EditableSection onEdit={() => setModalOpen(true)}>
    <section className="bg-text-light px-4 py-24 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-7xl">
        <SectionHeader
          title={equipo_block.titulo}
          subtitle={equipo_block.subtitulo}
          invert
        />
        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {equipo_block.especialistas.map((name, index) => (
            <Reveal key={name} delay={index * 0.04}>
              <article className="border border-primary/15 bg-white p-6 text-center transition-colors hover:border-gold">
                <div className="mx-auto mb-5 flex h-16 w-16 items-center justify-center rounded-full border border-gold/60 bg-primary text-gold">
                  <UserRound size={28} aria-hidden="true" />
                </div>
                <h3 className="font-cinzel text-sm font-semibold uppercase tracking-wider text-primary">{name}</h3>
              </article>
            </Reveal>
          ))}
        </div>
        <p className="mt-12 text-center font-cinzel text-xl font-semibold tracking-wide text-gold">
          {equipo_block.closing}
        </p>
      </div>
    </section>
    </EditableSection>

    <SectionEditModal
      clave="equipo_block"
      title="Editar equipo — Nosotros"
      value={equipo_block}
      open={modalOpen}
      onClose={() => setModalOpen(false)}
      onSaved={(v) => updateConfig('equipo_block', v)}
    >
      {(draft, setDraft) => (
        <>
          <Field label="Título de la sección">
            <Input value={draft.titulo} onChange={(e) => setDraft((p) => ({ ...p, titulo: e.target.value }))} />
          </Field>
          <Field label="Subtítulo de la sección">
            <Textarea rows={2} value={draft.subtitulo} onChange={(e) => setDraft((p) => ({ ...p, subtitulo: e.target.value }))} />
          </Field>
          <Field label="Especialistas (8 items)">
            <ListEditor
              items={draft.especialistas}
              onChange={(especialistas) => setDraft((p) => ({ ...p, especialistas }))}
              placeholder="Agregar especialista..."
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
