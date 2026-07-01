'use client'

import { useState } from 'react'
import { Plus, Trash2 } from 'lucide-react'
import type { SiteConfig } from '@/lib/config'
import ImageUploadField from '@/components/admin/ImageUploadField'
import { Field, Input, Textarea, SaveButton, ListEditor, useSave } from '@/components/admin/ConfigFormControls'

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

  // ── Hero ─────────────────────────────────────────────────────────────────────
  const [hero, setHero] = useState(initialConfig.hero)
  const saveHero = useSave('hero')

  // ── Redes sociales ───────────────────────────────────────────────────────────
  const [redes, setRedes] = useState(initialConfig.redes_sociales)
  const saveRedes = useSave('redes_sociales')

  // ── Página de agenda ─────────────────────────────────────────────────────────
  const [agendaPage, setAgendaPage] = useState(initialConfig.agenda_page)
  const saveAgendaPage = useSave('agenda_page')

  // ── Página de nosotros ───────────────────────────────────────────────────────
  const [nosotrosPage, setNosotrosPage] = useState(initialConfig.nosotros_page)
  const saveNosotrosPage = useSave('nosotros_page')

  function updatePilar(index: number, field: 'title' | 'text', value: string) {
    setNosotrosPage((p) => ({
      ...p,
      pilares: p.pilares.map((pilar, i) => (i === index ? { ...pilar, [field]: value } : pilar)),
    }))
  }

  // ── Bloque de confianza (home) ───────────────────────────────────────────────
  const [trustBlock, setTrustBlock] = useState(initialConfig.trust_block)
  const saveTrustBlock = useSave('trust_block')

  function updateTarjeta(index: number, field: 'title' | 'body', value: string) {
    setTrustBlock((p) => ({
      ...p,
      tarjetas: p.tarjetas.map((t, i) => (i === index ? { ...t, [field]: value } : t)),
    }))
  }

  // ── Bloque de urgencia (home) ────────────────────────────────────────────────
  const [urgencyBlock, setUrgencyBlock] = useState(initialConfig.urgency_block)
  const saveUrgencyBlock = useSave('urgency_block')

  function updateEscenario(index: number, field: 'titulo' | 'subtitulo' | 'boton', value: string) {
    setUrgencyBlock((p) => ({
      ...p,
      escenarios: p.escenarios.map((esc, i) => (i === index ? { ...esc, [field]: value } : esc)),
    }))
  }

  function updateEscenarioItems(index: number, items: string[]) {
    setUrgencyBlock((p) => ({
      ...p,
      escenarios: p.escenarios.map((esc, i) => (i === index ? { ...esc, items } : esc)),
    }))
  }

  // ── CTA final (home) ─────────────────────────────────────────────────────────
  const [finalCta, setFinalCta] = useState(initialConfig.final_cta)
  const saveFinalCta = useSave('final_cta')

  // ── Imágenes del sitio ───────────────────────────────────────────────────────
  const [imagenes, setImagenes] = useState(initialConfig.imagenes)
  const saveImagenes = useSave('imagenes')

  function updateHeroCarousel(index: number, url: string) {
    setImagenes((p) => ({ ...p, hero_carousel: p.hero_carousel.map((u, i) => (i === index ? url : u)) }))
  }

  function updateGaleria(index: number, url: string) {
    setImagenes((p) => ({ ...p, galeria_nosotros: p.galeria_nosotros.map((u, i) => (i === index ? url : u)) }))
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
            Todos los cambios se reflejan en el sitio en menos de 60 segundos.
          </p>
        </div>

        {/* ── 1. CONTACTO ── */}
        <section className="border border-border bg-card-bg p-6">
          <SectionHeader
            title="Datos de contacto"
            subtitle="Número de WhatsApp, teléfono, correo y dirección que aparecen en el sitio."
          />
          <div className="grid gap-5 md:grid-cols-2">
            <Field label="WhatsApp" hint="Con código de país: +593 985 222 635">
              <Input
                value={contacto.whatsapp}
                onChange={(e) => setContacto((p) => ({ ...p, whatsapp: e.target.value }))}
              />
            </Field>
            <Field label="Teléfono">
              <Input
                value={contacto.telefono}
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
            <Field label="Texto horario (display)" hint='Aparece en footer y menú móvil, p.ej. "Lun-Vie 08:00-18:00"'>
              <Input
                value={contacto.horas}
                onChange={(e) => setContacto((p) => ({ ...p, horas: e.target.value }))}
              />
            </Field>
            <Field label="Texto emergencia" hint='Aparece junto al horario, p.ej. "24/7 para urgencias penales"'>
              <Input
                value={contacto.emergencia}
                onChange={(e) => setContacto((p) => ({ ...p, emergencia: e.target.value }))}
              />
            </Field>
          </div>
          <div className="mt-6 flex justify-end">
            <SaveButton state={saveContacto.state} onClick={() => saveContacto.save(contacto)} />
          </div>
        </section>

        {/* ── 2. HORARIO DE ATENCIÓN ── */}
        <section className="border border-border bg-card-bg p-6">
          <SectionHeader
            title="Horario de atención"
            subtitle='Controla el mensaje "Disponibles ahora / Fuera de horario" del botón flotante de urgencia.'
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
                rows={3}
                value={horarioAtencion.mensaje_fuera}
                onChange={(e) => setHorarioAtencion((p) => ({ ...p, mensaje_fuera: e.target.value }))}
              />
            </Field>
          </div>
          <div className="mt-6 flex justify-end">
            <SaveButton state={saveHorarioAtencion.state} onClick={() => saveHorarioAtencion.save(horarioAtencion)} />
          </div>
        </section>

        {/* ── 3. HORARIO PARA CITAS ── */}
        <section className="border border-border bg-card-bg p-6">
          <SectionHeader
            title="Horario para agendar citas"
            subtitle="Define qué días y horas pueden seleccionar los clientes al agendar una cita."
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
              <Field label="Intervalo entre citas" hint="Minutos">
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

        {/* ── 4. FESTIVOS ── */}
        <section className="border border-border bg-card-bg p-6">
          <SectionHeader
            title="Días festivos y excepciones"
            subtitle="Fechas donde no hay atención. El sistema bloquea automáticamente esos días en el formulario de citas."
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

        {/* ── 5. HERO ── */}
        <section className="border border-border bg-card-bg p-6">
          <SectionHeader
            title="Textos del Hero (página de inicio)"
            subtitle='El título principal se compone de 3 partes: antes, la palabra dorada y después. P.ej: "Defensa Penal" + "Estratégica" + "de Alto Nivel".'
          />
          <div className="space-y-5">
            <div className="grid gap-5 md:grid-cols-3">
              <Field label="Título — parte 1">
                <Input
                  value={hero.title_before}
                  onChange={(e) => setHero((p) => ({ ...p, title_before: e.target.value }))}
                />
              </Field>
              <Field label="Palabra dorada (énfasis)">
                <Input
                  value={hero.title_highlight}
                  onChange={(e) => setHero((p) => ({ ...p, title_highlight: e.target.value }))}
                />
              </Field>
              <Field label="Título — parte 3">
                <Input
                  value={hero.title_after}
                  onChange={(e) => setHero((p) => ({ ...p, title_after: e.target.value }))}
                />
              </Field>
            </div>
            <Field label="Vista previa del título" hint="Así aparecerá en el sitio">
              <div className="border border-gold/20 bg-primary px-4 py-3 text-sm text-text-light">
                {hero.title_before}{' '}
                <span className="font-bold text-gold">{hero.title_highlight}</span>{' '}
                {hero.title_after}
              </div>
            </Field>
            <Field label="Subtítulo">
              <Textarea
                rows={3}
                value={hero.subtitle}
                onChange={(e) => setHero((p) => ({ ...p, subtitle: e.target.value }))}
              />
            </Field>
            <Field label='Frase emocional' hint='Aparece en cursiva bajo el subtítulo. P.ej: "Cada minuto importa cuando tu libertad está en riesgo."'>
              <Input
                value={hero.emotional}
                onChange={(e) => setHero((p) => ({ ...p, emotional: e.target.value }))}
              />
            </Field>
            <div className="grid gap-5 md:grid-cols-3">
              <Field label="Botón principal">
                <Input
                  value={hero.cta_primary}
                  onChange={(e) => setHero((p) => ({ ...p, cta_primary: e.target.value }))}
                />
              </Field>
              <Field label="Botón urgencia">
                <Input
                  value={hero.cta_urgent}
                  onChange={(e) => setHero((p) => ({ ...p, cta_urgent: e.target.value }))}
                />
              </Field>
              <Field label="Botón agenda">
                <Input
                  value={hero.cta_tertiary}
                  onChange={(e) => setHero((p) => ({ ...p, cta_tertiary: e.target.value }))}
                />
              </Field>
            </div>
          </div>
          <div className="mt-6 flex justify-end">
            <SaveButton state={saveHero.state} onClick={() => saveHero.save(hero)} />
          </div>
        </section>

        {/* ── 6. REDES SOCIALES ── */}
        <section className="border border-border bg-card-bg p-6">
          <SectionHeader
            title="Redes sociales"
            subtitle="URLs completas. Deje en blanco las que no tenga. Los íconos aparecen en el footer."
          />
          <div className="space-y-5">
            <Field label="LinkedIn" hint="https://linkedin.com/company/...">
              <Input
                type="url"
                value={redes.linkedin}
                placeholder="https://linkedin.com/company/imperium-iuris"
                onChange={(e) => setRedes((p) => ({ ...p, linkedin: e.target.value }))}
              />
            </Field>
            <Field label="Instagram" hint="https://instagram.com/...">
              <Input
                type="url"
                value={redes.instagram}
                placeholder="https://instagram.com/imperiumiuris"
                onChange={(e) => setRedes((p) => ({ ...p, instagram: e.target.value }))}
              />
            </Field>
            <Field label="Facebook" hint="https://facebook.com/...">
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

        {/* ── 7. PÁGINA AGENDA ── */}
        <section className="border border-border bg-card-bg p-6">
          <SectionHeader
            title="Página /agenda"
            subtitle="Encabezado del formulario de agendamiento de citas."
          />
          <div className="space-y-5">
            <Field label="Eyebrow (texto pequeño superior)">
              <Input
                value={agendaPage.eyebrow}
                onChange={(e) => setAgendaPage((p) => ({ ...p, eyebrow: e.target.value }))}
              />
            </Field>
            <Field label="Título">
              <Input
                value={agendaPage.titulo}
                onChange={(e) => setAgendaPage((p) => ({ ...p, titulo: e.target.value }))}
              />
            </Field>
            <Field label="Subtítulo">
              <Textarea
                rows={2}
                value={agendaPage.subtitulo}
                onChange={(e) => setAgendaPage((p) => ({ ...p, subtitulo: e.target.value }))}
              />
            </Field>
          </div>
          <div className="mt-6 flex justify-end">
            <SaveButton state={saveAgendaPage.state} onClick={() => saveAgendaPage.save(agendaPage)} />
          </div>
        </section>

        {/* ── 8. PÁGINA NOSOTROS ── */}
        <section className="border border-border bg-card-bg p-6">
          <SectionHeader
            title="Página /nosotros"
            subtitle="Título e introducción, los 4 pilares de la filosofía, el texto de '¿por qué existimos?' y la visión de la firma."
          />
          <div className="space-y-5">
            <Field label="Título">
              <Input
                value={nosotrosPage.titulo}
                onChange={(e) => setNosotrosPage((p) => ({ ...p, titulo: e.target.value }))}
              />
            </Field>
            <Field label="Introducción">
              <Textarea
                rows={3}
                value={nosotrosPage.intro}
                onChange={(e) => setNosotrosPage((p) => ({ ...p, intro: e.target.value }))}
              />
            </Field>
            <div>
              <label className="mb-2 block font-montserrat text-xs font-medium uppercase tracking-widest text-text-muted">
                Filosofía — 4 pilares
              </label>
              <div className="grid gap-4 md:grid-cols-2">
                {nosotrosPage.pilares.map((pilar, i) => (
                  <div key={i} className="space-y-2 border border-border bg-primary p-4">
                    <Input
                      value={pilar.title}
                      placeholder="Título del pilar"
                      onChange={(e) => updatePilar(i, 'title', e.target.value)}
                    />
                    <Textarea
                      rows={2}
                      value={pilar.text}
                      placeholder="Texto del pilar"
                      onChange={(e) => updatePilar(i, 'text', e.target.value)}
                    />
                  </div>
                ))}
              </div>
            </div>
            <Field label="Texto — ¿Por qué existimos?">
              <Textarea
                rows={3}
                value={nosotrosPage.por_que_texto}
                onChange={(e) => setNosotrosPage((p) => ({ ...p, por_que_texto: e.target.value }))}
              />
            </Field>
            <Field label="Visión">
              <Textarea
                rows={3}
                value={nosotrosPage.vision}
                onChange={(e) => setNosotrosPage((p) => ({ ...p, vision: e.target.value }))}
              />
            </Field>
          </div>
          <div className="mt-6 flex justify-end">
            <SaveButton state={saveNosotrosPage.state} onClick={() => saveNosotrosPage.save(nosotrosPage)} />
          </div>
        </section>

        {/* ── 9. BLOQUE DE CONFIANZA (HOME) ── */}
        <section className="border border-border bg-card-bg p-6">
          <SectionHeader
            title="Bloque de confianza (home)"
            subtitle="Título, subtítulo y las 6 tarjetas de confianza en la página de inicio."
          />
          <div className="mb-5 grid gap-5 md:grid-cols-2">
            <Field label="Título de la sección">
              <Input
                value={trustBlock.titulo}
                onChange={(e) => setTrustBlock((p) => ({ ...p, titulo: e.target.value }))}
              />
            </Field>
            <Field label="Subtítulo de la sección">
              <Input
                value={trustBlock.subtitulo}
                onChange={(e) => setTrustBlock((p) => ({ ...p, subtitulo: e.target.value }))}
              />
            </Field>
          </div>
          <div className="grid gap-4 md:grid-cols-2">
            {trustBlock.tarjetas.map((tarjeta, i) => (
              <div key={i} className="space-y-2 border border-border bg-primary p-4">
                <Input
                  value={tarjeta.title}
                  placeholder="Título de la tarjeta"
                  onChange={(e) => updateTarjeta(i, 'title', e.target.value)}
                />
                <Textarea
                  rows={2}
                  value={tarjeta.body}
                  placeholder="Descripción"
                  onChange={(e) => updateTarjeta(i, 'body', e.target.value)}
                />
              </div>
            ))}
          </div>
          <div className="mt-6 flex justify-end">
            <SaveButton state={saveTrustBlock.state} onClick={() => saveTrustBlock.save(trustBlock)} />
          </div>
        </section>

        {/* ── 10. BLOQUE DE URGENCIA (HOME) ── */}
        <section className="border border-border bg-card-bg p-6">
          <SectionHeader
            title="Bloque de urgencia (home)"
            subtitle="Texto principal de la sección y los 3 escenarios de urgencia."
          />
          <div className="space-y-6">
            <Field label="Texto principal de la sección">
              <Textarea
                rows={2}
                value={urgencyBlock.texto_principal}
                onChange={(e) => setUrgencyBlock((p) => ({ ...p, texto_principal: e.target.value }))}
              />
            </Field>
            <div className="space-y-4">
              {urgencyBlock.escenarios.map((esc, i) => (
                <div key={i} className="space-y-3 border border-border bg-primary p-4">
                  <div className="grid gap-3 md:grid-cols-2">
                    <Field label="Título">
                      <Input value={esc.titulo} onChange={(e) => updateEscenario(i, 'titulo', e.target.value)} />
                    </Field>
                    <Field label="Subtítulo">
                      <Input value={esc.subtitulo} onChange={(e) => updateEscenario(i, 'subtitulo', e.target.value)} />
                    </Field>
                  </div>
                  <Field label="Lista de items">
                    <ListEditor
                      items={esc.items}
                      onChange={(items) => updateEscenarioItems(i, items)}
                      placeholder="Agregar item..."
                    />
                  </Field>
                  <Field label="Texto del botón">
                    <Input value={esc.boton} onChange={(e) => updateEscenario(i, 'boton', e.target.value)} />
                  </Field>
                </div>
              ))}
            </div>
          </div>
          <div className="mt-6 flex justify-end">
            <SaveButton state={saveUrgencyBlock.state} onClick={() => saveUrgencyBlock.save(urgencyBlock)} />
          </div>
        </section>

        {/* ── 11. CTA FINAL (HOME) ── */}
        <section className="border border-border bg-card-bg p-6">
          <SectionHeader
            title="CTA final (home)"
            subtitle="Título y botón de la sección 'Tu defensa no puede esperar'."
          />
          <div className="grid gap-5 md:grid-cols-2">
            <Field label="Título">
              <Input
                value={finalCta.titulo}
                onChange={(e) => setFinalCta((p) => ({ ...p, titulo: e.target.value }))}
              />
            </Field>
            <Field label="Texto del botón">
              <Input
                value={finalCta.boton}
                onChange={(e) => setFinalCta((p) => ({ ...p, boton: e.target.value }))}
              />
            </Field>
          </div>
          <div className="mt-6 flex justify-end">
            <SaveButton state={saveFinalCta.state} onClick={() => saveFinalCta.save(finalCta)} />
          </div>
        </section>

        {/* ── 12. IMÁGENES DEL SITIO ── */}
        <section className="border border-border bg-card-bg p-6">
          <SectionHeader
            title="Imágenes del sitio"
            subtitle="URLs de las imágenes principales. Puede pegar una URL o subir un archivo directamente a Supabase Storage."
          />
          <div className="space-y-6">
            <div>
              <p className="mb-3 font-montserrat text-xs font-bold uppercase tracking-widest text-gold">
                Carrusel del hero (inicio)
              </p>
              <div className="space-y-4">
                {imagenes.hero_carousel.map((url, i) => (
                  <ImageUploadField
                    key={i}
                    label={`Imagen ${i + 1}`}
                    value={url}
                    carpeta="hero"
                    onChange={(newUrl) => updateHeroCarousel(i, newUrl)}
                  />
                ))}
              </div>
            </div>

            <div>
              <p className="mb-3 font-montserrat text-xs font-bold uppercase tracking-widest text-gold">
                Áreas de práctica (servicios)
              </p>
              <div className="space-y-4">
                <ImageUploadField
                  label="Personas naturales"
                  value={imagenes.servicios.personas}
                  carpeta="servicios"
                  onChange={(url) => setImagenes((p) => ({ ...p, servicios: { ...p.servicios, personas: url } }))}
                />
                <ImageUploadField
                  label="Empresas"
                  value={imagenes.servicios.empresas}
                  carpeta="servicios"
                  onChange={(url) => setImagenes((p) => ({ ...p, servicios: { ...p.servicios, empresas: url } }))}
                />
                <ImageUploadField
                  label="Funcionarios públicos"
                  value={imagenes.servicios.funcionarios}
                  carpeta="servicios"
                  onChange={(url) => setImagenes((p) => ({ ...p, servicios: { ...p.servicios, funcionarios: url } }))}
                />
                <ImageUploadField
                  label="Casos de alta exposición mediática"
                  value={imagenes.servicios.mediaticos}
                  carpeta="servicios"
                  onChange={(url) => setImagenes((p) => ({ ...p, servicios: { ...p.servicios, mediaticos: url } }))}
                />
              </div>
            </div>

            <div>
              <p className="mb-3 font-montserrat text-xs font-bold uppercase tracking-widest text-gold">
                Galería de la firma (nosotros)
              </p>
              <div className="space-y-4">
                {imagenes.galeria_nosotros.map((url, i) => (
                  <ImageUploadField
                    key={i}
                    label={`Imagen ${i + 1}`}
                    value={url}
                    carpeta="galeria"
                    onChange={(newUrl) => updateGaleria(i, newUrl)}
                  />
                ))}
              </div>
            </div>
          </div>
          <div className="mt-6 flex justify-end">
            <SaveButton state={saveImagenes.state} onClick={() => saveImagenes.save(imagenes)} />
          </div>
        </section>

      </div>
    </main>
  )
}
