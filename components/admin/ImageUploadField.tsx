'use client'

import { useRef, useState } from 'react'
import { Loader2, Upload } from 'lucide-react'

type Props = {
  label: string
  value: string
  carpeta: string
  onChange: (url: string) => void
}

export default function ImageUploadField({ label, value, carpeta, onChange }: Props) {
  const [uploading, setUploading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const inputRef = useRef<HTMLInputElement>(null)

  async function handleFile(file: File) {
    setError(null)
    setUploading(true)
    try {
      const formData = new FormData()
      formData.append('file', file)
      formData.append('carpeta', carpeta)
      const res = await fetch('/api/admin/configuracion/upload', { method: 'POST', body: formData })
      const json = await res.json()
      if (!res.ok) {
        setError(json.error ?? 'Error al subir la imagen.')
        return
      }
      onChange(json.url)
    } catch {
      setError('Error de conexión al subir la imagen.')
    } finally {
      setUploading(false)
    }
  }

  return (
    <div>
      <label className="mb-1.5 block font-montserrat text-xs font-medium uppercase tracking-widest text-text-muted">
        {label}
      </label>
      <div className="flex items-center gap-4">
        <div className="relative h-20 w-32 shrink-0 overflow-hidden border border-border bg-card-bg">
          {value ? (
            // eslint-disable-next-line @next/next/no-img-element
            <img src={value} alt="" className="h-full w-full object-cover" />
          ) : (
            <div className="flex h-full items-center justify-center text-[10px] text-text-muted">Sin imagen</div>
          )}
        </div>
        <div className="flex-1 space-y-2">
          <input
            value={value}
            onChange={(e) => onChange(e.target.value)}
            placeholder="https://... o /imagen.jpg"
            className="w-full border border-border bg-card-bg px-4 py-2.5 text-sm text-text-light outline-none focus:border-gold"
          />
          <button
            type="button"
            onClick={() => inputRef.current?.click()}
            disabled={uploading}
            className="flex items-center gap-2 border border-gold/50 px-3 py-1.5 font-montserrat text-xs font-bold uppercase tracking-widest text-gold transition-colors hover:border-gold hover:bg-gold/10 disabled:opacity-60"
          >
            {uploading ? <Loader2 size={13} className="animate-spin" /> : <Upload size={13} />}
            {uploading ? 'Subiendo...' : 'Subir desde Supabase Storage'}
          </button>
          <input
            ref={inputRef}
            type="file"
            accept="image/jpeg,image/png,image/webp,image/avif"
            aria-label={label}
            className="hidden"
            onChange={(e) => {
              const file = e.target.files?.[0]
              if (file) handleFile(file)
              e.target.value = ''
            }}
          />
          {error && <p className="text-[11px] text-red-400">{error}</p>}
        </div>
      </div>
    </div>
  )
}
