'use client'

import { useState } from 'react'
import { Plus, Trash2 } from 'lucide-react'
import type { SiteConfig } from '@/lib/config'
import { Field, Input, Textarea, SaveButton, useSave } from '@/components/admin/ConfigFormControls'

type Props = { initialConfig: SiteConfig }

const DIAS_LABELS = ['Dom', 'Lun', 'Mar', 'Mié', 'Jue', 'Vie', 'Sáb']
const INTERVALOS  = [15, 20, 30, 45, 60]

// ─── Helpers de UI ────────────────────────────────────────────────────────────

function SectionHeader({ title, subtitle }: { title: string; subtitle?: string }) {
  return (
    <div className="mb-6 border-b border-border pb-4">
      <h2 className="font-cinzel text-lg font-bold uppercase tracking-wider text-gold">{title}</h2>
      {subtitle && <p className="mt-1 text-xs font-light text-text-muted">{subtitle}</p>}
    </div>
  )
}

function DiasCheckboxes({
  value,
  onChange,
}: {
  value: number[]
  onChange: (v: number[]) => void
}) {
  const toggle = (d: number) =>
    onChange(value.includes(d) ? value.filter((x) => x !== d) : [...value, d].sort((a, b) => a - b))

  return (
    <div className="flex flex-wrap gap-2">
      {DIAS_LABELS.map((label, i) => (
        <button
          key={i}
          type="button"
          onClick={() => toggle(i)}
          className={`rounded border px-3 py-1.5 font-montserrat text-xs uppercase tracking-widest transition-colors ${
            value.includes(i)
              ? 'border-gold bg-gold text-primary'
              : 'border-border text-text-muted hover:border-gold/50 hover:text-gold/70'
          }`}
        >
          {label}
        </button>
      ))}
    </div>
  )
}

// ─── Componente principal ─────────────────────────────────────────────────────

export default function ConfiguracionAdmin({ initialConfig }: Props) {
  // ── Contacto ────────────────────────────────────────────────────────────────
  const [contacto, setContacto] = useState(initialConfig.contacto)
  const saveContacto = useSave('contacto')

  // ── Redes sociales ───────────────────────────────────────────────────────────
  const [redes, setRedes] = useState(initialConfig.redes_sociales)
  const saveRedes = useSave('redes_sociales')

  // ── Horario de atención ──────────────────────────────────────────────────────
  const [horarioAtencion, setHorarioAtencion] = useState(initialConfig.horario_atencion)
  const saveHorarioAtencion = useSave('horario_atencion')

  // ── Horario de citas ─────────────────────────────────────────────────────────
  const [horarioCitas, setHorarioCitas] = useState(initialConfig.horario_citas)
  const saveHorarioCitas = useSave('horario_citas')

  // ── Festivos ─────────────────────────────────────────────────────────────────
  const [festivos, setFestivos] = useState(initialConfig.festivos)
  const saveFestivos = useSave('festivos')
  const [nuevaFecha, setNuevaFecha] = useState('')

  function addFestivo() {
    if (!nuevaFecha || festivos.fechas.includes(nuevaFecha)) return
    setFestivos((p) => ({ fechas: [...p.fechas, nuevaFecha].sort() }))
    setNuevaFecha('')
  }

  function removeFestivo(f: string) {
    setFestivos((p) => ({ fechas: p.fechas.filter((x) => x !== f) }))
  }

  return (
    <main className="min-h-screen bg-primary px-4 pb-24 pt-10 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-3xl space-y-12">

        {/* Page header */}
        <div className="border-b border-border pb-6">
          <p className="font-cinzel text-xs uppercase tracking-[0.3em] text-gold/60">Panel de administración</p>
          <h1 className="mt-2 font-cinzel text-3xl font-bold uppercase tracking-wider text-gold">
            Configuración del sitio
          </h1>
          <p className="mt-2 text-sm font-light text-text-muted">
            Configuraciones técnicas del sitio. Para editar textos e imágenes, usa el modo edición directamente en las páginas públicas.
          </p>
        </div>

        {/* ── 1. CONTACTO ── */}
        <section className="border border-border bg-card-bg p-6">
          <SectionHeader
            title="Datos de contacto"
            subtitle="Estos datos se actualizan automáticamente en todo el sitio: footer, navbar, página de contacto, botón flotante."
          />
          <div className="grid gap-5 md:grid-cols-2">
            <Field label="WhatsApp" hint="Formato internacional para links de wa.me">
              <Input
                value={contacto.whatsapp}
                placeholder="+593 985 222 635"
                onChange={(e) => setContacto((p) => ({ ...p, whatsapp: e.target.value }))}
              />
            </Field>
            <Field label="Teléfono" hint="Para llamadas directas y display en el sitio">
              <Input
                value={contacto.telefono}
                placeholder="0985 222 635"
                onChange={(e) => setContacto((p) => ({ ...p, telefono: e.target.value }))}
              />
            </Field>
            <Field label="Correo electrónico">
              <Input
                type="email"
                value={contacto.correo}
                onChange={(e) => setContacto((p) => ({ ...p, correo: e.target.value }))}
              />
            </Field>
            <Field label="Dirección">
              <Input
                value={contacto.direccion}
                onChange={(e) => setContacto((p) => ({ ...p, direccion: e.target.value }))}
              />
            </Field>
            <Field label="Texto horario (display)" hint="Aparece en footer y contacto">
              <Input
                value={contacto.horas}
                placeholder="Lun-Vie 08:00-18:00"
                onChange={(e) => setContacto((p) => ({ ...p, horas: e.target.value }))}
              />
            </Field>
            <Field label="Texto emergencia" hint="Aparece junto al horario">
              <Input
                value={contacto.emergencia}
                placeholder="24/7 para urgencias penales"
                onChange={(e) => setContacto((p) => ({ ...p, emergencia: e.target.value }))}
              />
            </Field>
          </div>
          <div className="mt-5">
            <Field label="Mensaje predefinido de WhatsApp" hint="Se envía automáticamente al abrir WhatsApp desde cualquier botón del sitio.">
              <Textarea
                rows={2}
                value={contacto.whatsapp_mensaje}
                onChange={(e) => setContacto((p) => ({ ...p, whatsapp_mensaje: e.target.value }))}
              />
            </Field>
          </div>
          <div className="mt-6 flex justify-end">
            <SaveButton state={saveContacto.state} onClick={() => saveContacto.save(contacto)} />
          </div>
        </section>

        {/* ── 2. REDES SOCIALES ── */}
        <section className="border border-border bg-card-bg p-6">
          <SectionHeader
            title="Redes sociales"
            subtitle="Los íconos aparecen en el footer. Deje en blanco las que no tenga."
          />
          <div className="space-y-5">
            <Field label="LinkedIn">
              <Input
                type="url"
                value={redes.linkedin}
                placeholder="https://linkedin.com/company/imperium-iuris"
                onChange={(e) => setRedes((p) => ({ ...p, linkedin: e.target.value }))}
              />
            </Field>
            <Field label="Instagram">
              <Input
                type="url"
                value={redes.instagram}
                placeholder="https://instagram.com/imperiumiuris"
                onChange={(e) => setRedes((p) => ({ ...p, instagram: e.target.value }))}
              />
            </Field>
            <Field label="Facebook">
              <Input
                type="url"
                value={redes.facebook}
                placeholder="https://facebook.com/imperiumiuris"
                onChange={(e) => setRedes((p) => ({ ...p, facebook: e.target.value }))}
              />
            </Field>
          </div>
          <div className="mt-6 flex justify-end">
            <SaveButton state={saveRedes.state} onClick={() => saveRedes.save(redes)} />
          </div>
        </section>

        {/* ── 3. HORARIO DE ATENCIÓN ── */}
        <section className="border border-border bg-card-bg p-6">
          <SectionHeader
            title="Horario de atención"
            subtitle='Controla el mensaje "Disponibles ahora / Fuera de horario" del botón flotante.'
          />
          <div className="space-y-5">
            <Field label="Días de atención">
              <div className="mt-2">
                <DiasCheckboxes
                  value={horarioAtencion.dias}
                  onChange={(v) => setHorarioAtencion((p) => ({ ...p, dias: v }))}
                />
              </div>
            </Field>
            <div className="grid gap-5 md:grid-cols-2">
              <Field label="Hora de inicio">
                <Input
                  type="time"
                  value={horarioAtencion.hora_inicio}
                  onChange={(e) => setHorarioAtencion((p) => ({ ...p, hora_inicio: e.target.value }))}
                />
              </Field>
              <Field label="Hora de cierre">
                <Input
                  type="time"
                  value={horarioAtencion.hora_fin}
                  onChange={(e) => setHorarioAtencion((p) => ({ ...p, hora_fin: e.target.value }))}
                />
              </Field>
            </div>
            <Field label="Mensaje fuera de horario" hint="Aparece en el botón flotante cuando la oficina está cerrada.">
              <Textarea
                rows={2}
                value={horarioAtencion.mensaje_fuera}
                onChange={(e) => setHorarioAtencion((p) => ({ ...p, mensaje_fuera: e.target.value }))}
              />
            </Field>
          </div>
          <div className="mt-6 flex justify-end">
            <SaveButton state={saveHorarioAtencion.state} onClick={() => saveHorarioAtencion.save(horarioAtencion)} />
          </div>
        </section>

        {/* ── 4. HORARIO PARA CITAS ── */}
        <section className="border border-border bg-card-bg p-6">
          <SectionHeader
            title="Horario para agendar citas"
            subtitle="Define qué días y horas pueden seleccionar los clientes en el formulario de citas."
          />
          <div className="space-y-5">
            <Field label="Días disponibles para citas">
              <div className="mt-2">
                <DiasCheckboxes
                  value={horarioCitas.dias}
                  onChange={(v) => setHorarioCitas((p) => ({ ...p, dias: v }))}
                />
              </div>
            </Field>
            <div className="grid gap-5 md:grid-cols-3">
              <Field label="Hora de inicio">
                <Input
                  type="time"
                  value={horarioCitas.hora_inicio}
                  onChange={(e) => setHorarioCitas((p) => ({ ...p, hora_inicio: e.target.value }))}
                />
              </Field>
              <Field label="Hora de cierre">
                <Input
                  type="time"
                  value={horarioCitas.hora_fin}
                  onChange={(e) => setHorarioCitas((p) => ({ ...p, hora_fin: e.target.value }))}
                />
              </Field>
              <Field label="Intervalo entre citas">
                <select
                  value={horarioCitas.intervalo}
                  onChange={(e) => setHorarioCitas((p) => ({ ...p, intervalo: Number(e.target.value) }))}
                  className="w-full border border-border bg-card-bg px-4 py-3 text-sm text-text-light outline-none focus:border-gold"
                >
                  {INTERVALOS.map((i) => (
                    <option key={i} value={i}>{i} minutos</option>
                  ))}
                </select>
              </Field>
            </div>
          </div>
          <div className="mt-6 flex justify-end">
            <SaveButton state={saveHorarioCitas.state} onClick={() => saveHorarioCitas.save(horarioCitas)} />
          </div>
        </section>

        {/* ── 5. FESTIVOS ── */}
        <section className="border border-border bg-card-bg p-6">
          <SectionHeader
            title="Días festivos y excepciones"
            subtitle="El sistema bloquea automáticamente estos días en el formulario de citas."
          />
          <div className="space-y-4">
            <div className="flex gap-3">
              <Input
                type="date"
                value={nuevaFecha}
                onChange={(e) => setNuevaFecha(e.target.value)}
                className="flex-1"
              />
              <button
                type="button"
                onClick={addFestivo}
                className="flex items-center gap-2 border border-gold bg-gold px-5 py-3 font-montserrat text-xs font-bold uppercase tracking-widest text-primary hover:bg-gold/90"
              >
                <Plus size={14} /> Agregar
              </button>
            </div>
            {festivos.fechas.length === 0 ? (
              <p className="py-6 text-center text-sm font-light text-text-muted">
                No hay días festivos configurados.
              </p>
            ) : (
              <div className="space-y-2">
                {festivos.fechas.map((f) => {
                  const [y, m, d] = f.split('-')
                  const display = `${d}/${m}/${y}`
                  return (
                    <div key={f} className="flex items-center justify-between border border-border bg-primary px-4 py-3">
                      <span className="font-mono text-sm text-text-light">{display}</span>
                      <button
                        type="button"
                        onClick={() => removeFestivo(f)}
                        className="text-text-muted transition-colors hover:text-red-400"
                      >
                        <Trash2 size={14} />
                      </button>
                    </div>
                  )
                })}
              </div>
            )}
          </div>
          <div className="mt-6 flex justify-end">
            <SaveButton state={saveFestivos.state} onClick={() => saveFestivos.save(festivos)} />
          </div>
        </section>

      </div>
    </main>
  )
}
