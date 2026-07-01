'use client'

import { Pencil } from 'lucide-react'
import { useEditMode } from '@/components/providers/EditModeProvider'

export default function EditableSection({
  label = 'Editar',
  onEdit,
  children,
}: {
  label?: string
  onEdit: () => void
  children: React.ReactNode
}) {
  const { editMode } = useEditMode()

  if (!editMode) return <>{children}</>

  return (
    <div className="relative">
      <div className="pointer-events-none absolute inset-0 z-30 border-2 border-gold" />
      <button
        type="button"
        onClick={onEdit}
        className="absolute right-3 top-3 z-40 flex items-center gap-2 border border-gold bg-primary px-3 py-2 font-montserrat text-xs font-bold uppercase tracking-widest text-gold shadow-lg shadow-black/50 transition-colors hover:bg-gold hover:text-primary"
      >
        <Pencil size={13} /> {label}
      </button>
      {children}
    </div>
  )
}
