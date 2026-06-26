'use client'

import { useState } from 'react'
import type { CitaEstado } from '@/lib/schemas'

export type Cita = {
  id: string
  nombre: string
  correo: string
  telefono: string
  tipo_consulta: string
  fecha: string
  hora: string
  duracion_minutos: number
  mensaje: string | null
  estado: CitaEstado
  created_at: string
}

const ESTADO_STYLES: Record<CitaEstado, string> = {
  pendiente:  'border-yellow-500/50 bg-yellow-500/10 text-yellow-400',
  confirmada: 'border-emerald-500/50 bg-emerald-500/10 text-emerald-400',
  cancelada:  'border-red-500/50 bg-red-500/10 text-red-400',
}

const TIPO_STYLES: Record<string, string> = {
  personal:    'border-sky-500/50 bg-sky-500/10 text-sky-400',
  empresarial: 'border-purple-500/50 bg-purple-500/10 text-purple-400',
  urgencia:    'border-red-500/50 bg-red-500/10 text-red-400',
}

const TIPO_LABEL: Record<string, string> = {
  personal:    'Personal',
  empresarial: 'Empresarial',
  urgencia:    'Urgencia',
}

const ESTADOS: CitaEstado[] = ['pendiente', 'confirmada', 'cancelada']

function formatFecha(fecha: string, hora: string) {
  const [y, mo, d] = fecha.split('-')
  return `${d}/${mo}/${y} · ${hora.slice(0, 5)}`
}

export default function CitasAdmin({ citas: initial }: { citas: Cita[] }) {
  const [citas, setCitas] = useState<Cita[]>(initial)
  const [updating, setUpdating] = useState<string | null>(null)
  const [filter, setFilter] = useState<CitaEstado | 'todas'>('todas')

  async function changeEstado(id: string, estado: CitaEstado) {
    setUpdating(id)
    try {
      const res = await fetch(`/api/appointments/${id}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ estado }),
      })
      if (res.ok) {
        setCitas((prev) => prev.map((c) => c.id === id ? { ...c, estado } : c))
      }
    } finally {
      setUpdating(null)
    }
  }

  const visible = filter === 'todas' ? citas : citas.filter((c) => c.estado === filter)

  const counts = {
    todas: citas.length,
    pendiente:  citas.filter((c) => c.estado === 'pendiente').length,
    confirmada: citas.filter((c) => c.estado === 'confirmada').length,
    cancelada:  citas.filter((c) => c.estado === 'cancelada').length,
  }

  return (
    <div>
      {/* Filtros */}
      <div className="mb-6 flex flex-wrap gap-2">
        {(['todas', ...ESTADOS] as const).map((f) => (
          <button
            key={f}
            onClick={() => setFilter(f)}
            className={`rounded-full border px-4 py-1.5 font-montserrat text-xs uppercase tracking-widest transition-colors ${
              filter === f
                ? 'border-gold bg-gold text-primary'
                : 'border-gold/30 text-gold/70 hover:border-gold hover:text-gold'
            }`}
          >
            {f === 'todas' ? 'Todas' : f} ({counts[f]})
          </button>
        ))}
      </div>

      {visible.length === 0 ? (
        <p className="py-16 text-center font-light text-text-muted">
          No hay citas {filter !== 'todas' ? `con estado "${filter}"` : ''}.
        </p>
      ) : (
        <div className="space-y-3">
          {visible.map((cita) => (
            <div
              key={cita.id}
              className="border border-border bg-card-bg p-5 transition-colors hover:border-gold/30"
            >
              <div className="flex flex-wrap items-start justify-between gap-4">
                {/* Info principal */}
                <div className="min-w-0 flex-1">
                  <div className="flex flex-wrap items-center gap-2">
                    <span className={`rounded-full border px-2.5 py-0.5 text-[10px] font-bold uppercase tracking-widest ${TIPO_STYLES[cita.tipo_consulta] ?? 'border-gold/30 text-gold'}`}>
                      {TIPO_LABEL[cita.tipo_consulta] ?? cita.tipo_consulta}
                    </span>
                    <span className={`rounded-full border px-2.5 py-0.5 text-[10px] font-bold uppercase tracking-widest ${ESTADO_STYLES[cita.estado]}`}>
                      {cita.estado}
                    </span>
                  </div>
                  <p className="mt-2 font-cinzel text-base font-semibold text-text-light">{cita.nombre}</p>
                  <p className="mt-0.5 text-sm font-light text-text-muted">
                    <a href={`mailto:${cita.correo}`} className="hover:text-gold">{cita.correo}</a>
                    {' · '}
                    <a href={`tel:${cita.telefono}`} className="hover:text-gold">{cita.telefono}</a>
                  </p>
                  {cita.mensaje && (
                    <p className="mt-2 max-w-lg text-xs font-light italic text-text-muted/70">
                      &ldquo;{cita.mensaje}&rdquo;
                    </p>
                  )}
                </div>

                {/* Fecha y acciones */}
                <div className="flex flex-col items-end gap-3">
                  <p className="font-montserrat text-sm font-semibold text-gold">
                    {formatFecha(cita.fecha, cita.hora)}
                  </p>
                  <div className="flex gap-1.5">
                    {ESTADOS.filter((e) => e !== cita.estado).map((e) => (
                      <button
                        key={e}
                        onClick={() => changeEstado(cita.id, e)}
                        disabled={updating === cita.id}
                        className={`rounded border px-3 py-1 font-montserrat text-[10px] uppercase tracking-widest transition-colors disabled:opacity-40 ${ESTADO_STYLES[e]} hover:opacity-80`}
                      >
                        {updating === cita.id ? '...' : e}
                      </button>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}
