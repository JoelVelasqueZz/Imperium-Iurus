'use client'

import { useState } from 'react'
import SectionHeader from '@/components/ui/SectionHeader'
import Reveal from '@/components/ui/Reveal'
import { NOSOTROS, philosophyPillars } from '@/lib/constants'
import { useSiteConfig, useUpdateConfig } from '@/components/providers/ConfigProvider'
import EditableSection from '@/components/admin/EditableSection'
import SectionEditModal from '@/components/admin/SectionEditModal'
import { Field, Input, Textarea } from '@/components/admin/ConfigFormControls'

const ROMANOS = philosophyPillars.map((p) => p.roman)

export default function FilosofiaSection() {
  const [modalOpen, setModalOpen] = useState(false)
  const { nosotros_page } = useSiteConfig()
  const updateConfig = useUpdateConfig()
  return (
    <>
    <EditableSection onEdit={() => setModalOpen(true)}>
    <section className="bg-primary px-4 py-24 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-7xl">
        <SectionHeader
          title={NOSOTROS.filosofia.title}
          subtitle={NOSOTROS.filosofia.subtitle}
        />
        <div className="grid gap-6 md:grid-cols-4">
          {nosotros_page.pilares.map((pillar, index) => (
            <Reveal key={pillar.title} delay={index * 0.08}>
              <article className="h-full border border-border bg-card-bg p-7">
                <p className="font-trajan text-4xl font-bold text-gold">{ROMANOS[index]}</p>
                <h3 className="mt-5 font-cinzel text-xl font-semibold text-text-light">{pillar.title}</h3>
                <p className="mt-4 font-inter text-sm font-light leading-7 text-text-muted">{pillar.text}</p>
              </article>
            </Reveal>
          ))}
        </div>
        <p className="mt-12 text-center font-cinzel text-xl font-semibold tracking-wide text-gold">
          {NOSOTROS.filosofia.closing}
        </p>
      </div>
    </section>
    </EditableSection>

    <SectionEditModal
      clave="nosotros_page"
      title="Editar filosofía — Nosotros"
      value={nosotros_page}
      open={modalOpen}
      onClose={() => setModalOpen(false)}
      onSaved={(v) => updateConfig('nosotros_page', v)}
    >
      {(draft, setDraft) => (
        <div className="grid gap-4 md:grid-cols-2">
          {draft.pilares.map((pilar, i) => (
            <div key={i} className="space-y-2 border border-border bg-card-bg p-4">
              <p className="font-cinzel text-xs font-bold text-gold">{ROMANOS[i]}</p>
              <Field label="Título del pilar">
                <Input
                  value={pilar.title}
                  onChange={(e) => setDraft((p) => ({
                    ...p,
                    pilares: p.pilares.map((x, idx) => (idx === i ? { ...x, title: e.target.value } : x)),
                  }))}
                />
              </Field>
              <Field label="Texto del pilar">
                <Textarea
                  rows={2}
                  value={pilar.text}
                  onChange={(e) => setDraft((p) => ({
                    ...p,
                    pilares: p.pilares.map((x, idx) => (idx === i ? { ...x, text: e.target.value } : x)),
                  }))}
                />
              </Field>
            </div>
          ))}
        </div>
      )}
    </SectionEditModal>
    </>
  )
}
