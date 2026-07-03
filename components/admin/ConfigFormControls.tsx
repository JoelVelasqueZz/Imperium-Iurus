'use client'

import { useState } from 'react'
import { Check, Loader2, Plus, Trash2 } from 'lucide-react'
import type { SaveState } from '@/components/admin/useSave'

export function Field({ label, hint, children }: { label: string; hint?: string; children: React.ReactNode }) {
  return (
    <label className="block">
      <span className="mb-1.5 block font-montserrat text-xs font-medium uppercase tracking-widest text-text-muted">
        {label}
      </span>
      {children}
      {hint && <p className="mt-1 text-[11px] text-text-muted/60">{hint}</p>}
    </label>
  )
}

export function Input(props: React.InputHTMLAttributes<HTMLInputElement>) {
  return (
    <input
      {...props}
      className="w-full border border-border bg-card-bg px-4 py-3 text-sm text-text-light outline-none transition-colors focus:border-gold"
    />
  )
}

export function Textarea(props: React.TextareaHTMLAttributes<HTMLTextAreaElement>) {
  return (
    <textarea
      {...props}
      className="w-full resize-y border border-border bg-card-bg px-4 py-3 text-sm text-text-light outline-none transition-colors focus:border-gold"
    />
  )
}

export function SaveButton({ state, onClick }: { state: SaveState; onClick: () => void }) {
  return (
    <button
      type="button"
      onClick={onClick}
      disabled={state === 'saving'}
      className={`flex items-center gap-2 border px-6 py-2.5 font-montserrat text-xs font-bold uppercase tracking-widest transition-colors disabled:opacity-60 ${
        state === 'saved'
          ? 'border-emerald-500 bg-emerald-500/10 text-emerald-400'
          : state === 'error'
          ? 'border-red-500 bg-red-500/10 text-red-400'
          : 'border-gold bg-gold text-primary hover:bg-gold/90'
      }`}
    >
      {state === 'saving' && <Loader2 size={13} className="animate-spin" />}
      {state === 'saved'  && <Check size={13} />}
      {state === 'saving' ? 'Guardando...' : state === 'saved' ? 'Guardado' : state === 'error' ? 'Error — reintentar' : 'Guardar'}
    </button>
  )
}

export function ListEditor({
  items,
  onChange,
  placeholder,
}: {
  items: string[]
  onChange: (items: string[]) => void
  placeholder?: string
}) {
  const [draft, setDraft] = useState('')

  function add() {
    if (!draft.trim()) return
    onChange([...items, draft.trim()])
    setDraft('')
  }

  return (
    <div className="space-y-2">
      <div className="flex gap-2">
        <input
          value={draft}
          onChange={(e) => setDraft(e.target.value)}
          onKeyDown={(e) => { if (e.key === 'Enter') { e.preventDefault(); add() } }}
          placeholder={placeholder}
          aria-label={placeholder ?? 'Agregar elemento'}
          className="flex-1 border border-border bg-card-bg px-3 py-2 text-sm text-text-light outline-none focus:border-gold"
        />
        <button
          type="button"
          onClick={add}
          className="flex items-center gap-1 border border-gold/50 px-3 py-2 text-xs font-bold uppercase tracking-widest text-gold hover:border-gold"
        >
          <Plus size={13} />
        </button>
      </div>
      <div className="flex flex-wrap gap-2">
        {items.map((item, i) => (
          <span
            key={`${item}-${i}`}
            className="flex items-center gap-2 border border-border bg-primary px-3 py-1.5 text-xs text-text-light"
          >
            {item}
            <button
              type="button"
              onClick={() => onChange(items.filter((_, idx) => idx !== i))}
              className="text-text-muted hover:text-red-400"
            >
              <Trash2 size={11} />
            </button>
          </span>
        ))}
      </div>
    </div>
  )
}

