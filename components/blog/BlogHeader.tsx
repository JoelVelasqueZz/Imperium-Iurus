'use client'

import { useState } from 'react'
import SectionHeader from '@/components/ui/SectionHeader'
import EditableSection from '@/components/admin/EditableSection'
import SectionEditModal from '@/components/admin/SectionEditModal'
import { Field, Input } from '@/components/admin/ConfigFormControls'
import { useSiteConfig, useUpdateConfig } from '@/components/providers/ConfigProvider'

export default function BlogHeader() {
  const [modalOpen, setModalOpen] = useState(false)
  const { blog_page } = useSiteConfig()
  const updateConfig = useUpdateConfig()

  return (
    <>
      <EditableSection onEdit={() => setModalOpen(true)} bottomButton>
        <SectionHeader
          eyebrow={blog_page.eyebrow}
          title={blog_page.titulo}
          subtitle={blog_page.subtitulo}
        />
      </EditableSection>

      <SectionEditModal
        clave="blog_page"
        title="Editar encabezado del blog"
        value={blog_page}
        open={modalOpen}
        onClose={() => setModalOpen(false)}
        onSaved={(v) => updateConfig('blog_page', v)}
      >
        {(draft, setDraft) => (
          <div className="space-y-5">
            <Field label="Eyebrow">
              <Input value={draft.eyebrow} onChange={(e) => setDraft((p) => ({ ...p, eyebrow: e.target.value }))} />
            </Field>
            <Field label="Título">
              <Input value={draft.titulo} onChange={(e) => setDraft((p) => ({ ...p, titulo: e.target.value }))} />
            </Field>
            <Field label="Subtítulo">
              <Input value={draft.subtitulo} onChange={(e) => setDraft((p) => ({ ...p, subtitulo: e.target.value }))} />
            </Field>
          </div>
        )}
      </SectionEditModal>
    </>
  )
}
