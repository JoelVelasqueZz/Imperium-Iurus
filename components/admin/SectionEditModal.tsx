'use client'

import { useState } from 'react'
import { X } from 'lucide-react'
import { SaveButton } from '@/components/admin/ConfigFormControls'
import type { SaveState } from '@/components/admin/useSave'

export default function SectionEditModal<T>({
  clave,
  title,
  value,
  open,
  onClose,
  onSaved,
  customSave,
  children,
}: {
  clave: string
  title: string
  value: T
  open: boolean
  onClose: () => void
  onSaved: (value: T) => void
  customSave?: (draft: T) => Promise<void>
  children: (draft: T, setDraft: (updater: (prev: T) => T) => void) => React.ReactNode
}) {
  const [draft, setDraft] = useState(value)
  const [state, setState] = useState<SaveState>('idle')
  const [prevOpen, setPrevOpen] = useState(open)

  // Reinicia el borrador con el valor vigente cada vez que el modal pasa a abierto.
  // Se hace en render (no en un efecto) para que no haya un frame con datos viejos.
  if (open !== prevOpen) {
    setPrevOpen(open)
    if (open) {
      setDraft(value)
      setState('idle')
    }
  }

  if (!open) return null

  async function handleSave() {
    setState('saving')
    try {
      if (customSave) {
        await customSave(draft)
      } else {
        const res = await fetch('/api/admin/configuracion', {
          method: 'PATCH',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ clave, valor: draft }),
        })
        if (!res.ok) {
          setState('error')
          return
        }
      }
      onSaved(draft)
      onClose()
    } catch {
      setState('error')
    }
  }

  return (
    // El backdrop cierra al hacer click como conveniencia — el botón "Cerrar" (X)
    // y "Cancelar" de abajo ya cubren el cierre accesible por teclado.
    // eslint-disable-next-line jsx-a11y/no-static-element-interactions, jsx-a11y/click-events-have-key-events
    <div
      className="fixed inset-0 z-[100] flex items-center justify-center bg-black/70 p-4"
      onClick={onClose}
    >
      <div
        className="max-h-[85vh] w-full max-w-2xl overflow-y-auto border border-gold/40 bg-[#0D1624] p-6 shadow-2xl"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="mb-5 flex items-center justify-between border-b border-border pb-4">
          <h2 className="font-cinzel text-lg font-bold uppercase tracking-wider text-gold">{title}</h2>
          <button
            type="button"
            onClick={onClose}
            aria-label="Cerrar"
            className="text-text-muted transition-colors hover:text-gold"
          >
            <X size={20} />
          </button>
        </div>

        <div className="space-y-5">{children(draft, setDraft)}</div>

        {state === 'error' && (
          <p className="mt-4 text-sm text-red-400">Error al guardar. Intente nuevamente.</p>
        )}

        <div className="mt-6 flex justify-end gap-3 border-t border-border pt-5">
          <button
            type="button"
            onClick={onClose}
            className="border border-border px-6 py-2.5 font-montserrat text-xs font-bold uppercase tracking-widest text-text-muted transition-colors hover:border-text-muted"
          >
            Cancelar
          </button>
          <SaveButton state={state} onClick={handleSave} />
        </div>
      </div>
    </div>
  )
}
