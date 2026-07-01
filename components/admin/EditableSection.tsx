'use client'

import { Pencil } from 'lucide-react'
import { useEditMode } from '@/components/providers/EditModeProvider'

export default function EditableSection({
  label = 'Editar',
  onEdit,
  topSafe = false,
  children,
}: {
  label?: string
  onEdit: () => void
  /** Agrega mt-16 al wrapper para secciones que renderizan justo debajo del navbar fijo */
  topSafe?: boolean
  children: React.ReactNode
}) {
  const { editMode } = useEditMode()

  if (!editMode) return <>{children}</>

  return (
    <div className={`relative ${topSafe ? 'mt-16' : ''}`}>
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
