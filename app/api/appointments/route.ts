import { type NextRequest, NextResponse } from 'next/server'
import { Resend } from 'resend'
import { appointmentSchema, type ApiResponse, type AppointmentFormData } from '@/lib/schemas'
import { supabase } from '@/lib/supabase'
import { createSupabaseServerClient } from '@/lib/supabase-server'
import { CONFIG_DEFAULTS, generateSlots, isDateAvailable } from '@/lib/config'
import type { HorarioCitasConfig, FestivosConfig } from '@/lib/config'

const resend = new Resend(process.env.RESEND_API_KEY)

const TIPO_LABEL: Record<AppointmentFormData['tipoConsulta'], string> = {
  personal:    'Consulta Personal',
  empresarial: 'Consulta Empresarial',
  urgencia:    'Urgencia Penal',
}

// ─── Leer horario de citas desde configuracion ────────────────────────────────

async function getScheduleConfig(): Promise<{ horario: HorarioCitasConfig; festivos: FestivosConfig }> {
  const { data } = await supabase
    .from('configuracion')
    .select('clave, valor')
    .in('clave', ['horario_citas', 'festivos'])

  const map = Object.fromEntries((data ?? []).map((r) => [r.clave as string, r.valor]))
  return {
    horario:  { ...CONFIG_DEFAULTS.horario_citas, ...(map['horario_citas'] ?? {}) } as HorarioCitasConfig,
    festivos: { ...CONFIG_DEFAULTS.festivos,      ...(map['festivos']      ?? {}) } as FestivosConfig,
  }
}

function todayEcuador(): string {
  return new Date().toLocaleDateString('en-CA', { timeZone: 'America/Guayaquil' })
}

function currentTimeEcuador(): { h: number; m: number } {
  const now = new Date(new Date().toLocaleString('en-US', { timeZone: 'America/Guayaquil' }))
  return { h: now.getHours(), m: now.getMinutes() }
}

// GET — slots disponibles para una fecha
export async function GET(request: NextRequest): Promise<NextResponse> {
  const fecha = request.nextUrl.searchParams.get('fecha')

  if (!fecha || !/^\d{4}-\d{2}-\d{2}$/.test(fecha)) {
    return NextResponse.json({ success: false, error: 'Parámetro fecha requerido (YYYY-MM-DD)' }, { status: 400 })
  }

  const { horario, festivos } = await getScheduleConfig()

  if (!isDateAvailable(fecha, horario, festivos)) {
    return NextResponse.json({ success: true, data: { fecha, slots: [] } })
  }

  // Horarios ya reservados (excluye canceladas)
  const { data: booked } = await supabase
    .from('citas')
    .select('hora')
    .eq('fecha', fecha)
    .neq('estado', 'cancelada')

  const bookedSet = new Set((booked ?? []).map((r) => (r.hora as string).slice(0, 5)))

  let slots = generateSlots(horario).filter((s) => !bookedSet.has(s))

  // Si es hoy, filtrar slots pasados (con 30 min de margen)
  if (fecha === todayEcuador()) {
    const { h: nowH, m: nowM } = currentTimeEcuador()
    slots = slots.filter((slot) => {
      const [slotH, slotM] = slot.split(':').map(Number)
      return slotH * 60 + slotM > nowH * 60 + nowM + 30
    })
  }

  return NextResponse.json({ success: true, data: { fecha, slots } })
}

// ─── Emails ───────────────────────────────────────────────────────────────────

function esc(str: string): string {
  return str.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;')
}

function fmtFecha(fecha: string, hora: string): string {
  const [y, mo, d] = fecha.split('-')
  const date = new Date(`${fecha}T${hora}:00`)
  const diasSemana = ['domingo', 'lunes', 'martes', 'miércoles', 'jueves', 'viernes', 'sábado']
  const meses = ['enero','febrero','marzo','abril','mayo','junio','julio','agosto','septiembre','octubre','noviembre','diciembre']
  return `${diasSemana[date.getDay()]}, ${d} de ${meses[Number(mo) - 1]} de ${y} a las ${hora}`
}

function emailAbogadoCita(data: AppointmentFormData): string {
  const fechaDisplay = fmtFecha(data.fecha, data.hora)
  return `
  <div style="font-family:Arial,sans-serif;max-width:600px;margin:0 auto;color:#1a1a1a">
    <div style="background:#1a1a2e;padding:24px 32px;border-radius:8px 8px 0 0">
      <h1 style="color:#c9a96e;margin:0;font-size:20px;letter-spacing:1px">IMPERIUM IURIS — Nueva Cita</h1>
    </div>
    <div style="background:#fff;padding:32px;border:1px solid #e5e7eb;border-top:none;border-radius:0 0 8px 8px">
      <table style="width:100%;border-collapse:collapse">
        <tr><td style="padding:10px 0;border-bottom:1px solid #f0f0f0;font-weight:600;width:160px;color:#555">Tipo</td>
            <td style="padding:10px 0;border-bottom:1px solid #f0f0f0">${data.tipoConsulta === 'urgencia' ? `<strong style="color:#dc2626">${TIPO_LABEL[data.tipoConsulta]}</strong>` : TIPO_LABEL[data.tipoConsulta]}</td></tr>
        <tr><td style="padding:10px 0;border-bottom:1px solid #f0f0f0;font-weight:600;color:#555">Nombre</td>
            <td style="padding:10px 0;border-bottom:1px solid #f0f0f0">${esc(data.nombre)}</td></tr>
        <tr><td style="padding:10px 0;border-bottom:1px solid #f0f0f0;font-weight:600;color:#555">Correo</td>
            <td style="padding:10px 0;border-bottom:1px solid #f0f0f0"><a href="mailto:${esc(data.correo)}" style="color:#1a1a2e">${esc(data.correo)}</a></td></tr>
        <tr><td style="padding:10px 0;border-bottom:1px solid #f0f0f0;font-weight:600;color:#555">Teléfono</td>
            <td style="padding:10px 0;border-bottom:1px solid #f0f0f0"><a href="tel:${esc(data.telefono)}" style="color:#1a1a2e">${esc(data.telefono)}</a></td></tr>
        <tr><td style="padding:10px 0;border-bottom:1px solid #f0f0f0;font-weight:600;color:#555">Fecha y hora</td>
            <td style="padding:10px 0;border-bottom:1px solid #f0f0f0"><strong>${fechaDisplay}</strong></td></tr>
        ${data.mensaje ? `<tr><td style="padding:14px 0 0;font-weight:600;color:#555;vertical-align:top">Mensaje</td>
            <td style="padding:14px 0 0;line-height:1.6;white-space:pre-wrap">${esc(data.mensaje)}</td></tr>` : ''}
      </table>
      <div style="margin-top:24px;padding:14px;background:#fafafa;border-left:3px solid #c9a96e;font-size:13px;color:#666">
        Agendado el ${new Date().toLocaleString('es-EC', { timeZone: 'America/Guayaquil', dateStyle: 'full', timeStyle: 'short' })}
      </div>
    </div>
  </div>`
}

function emailClienteCita(data: AppointmentFormData): string {
  const fechaDisplay = fmtFecha(data.fecha, data.hora)
  return `
  <div style="font-family:Arial,sans-serif;max-width:600px;margin:0 auto;color:#1a1a1a">
    <div style="background:#1a1a2e;padding:24px 32px;border-radius:8px 8px 0 0">
      <h1 style="color:#c9a96e;margin:0;font-size:20px;letter-spacing:1px">IMPERIUM IURIS</h1>
      <p style="color:#a0aec0;margin:6px 0 0;font-size:13px">Defensa Penal Estratégica — Guayaquil, Ecuador</p>
    </div>
    <div style="background:#fff;padding:32px;border:1px solid #e5e7eb;border-top:none;border-radius:0 0 8px 8px">
      <p style="font-size:16px;margin:0 0 16px">Estimado/a <strong>${esc(data.nombre)}</strong>,</p>
      <p style="line-height:1.7;color:#444;margin:0 0 20px">
        Su cita de <strong>${TIPO_LABEL[data.tipoConsulta]}</strong> ha sido agendada exitosamente.
      </p>
      <div style="background:#f8f4ee;border-radius:6px;padding:22px;border:1px solid #e8d9c0;margin-bottom:24px">
        <p style="margin:0 0 6px;font-size:12px;font-weight:600;color:#8a6a2e;letter-spacing:.5px;text-transform:uppercase">Detalle de su cita</p>
        <p style="margin:0;font-size:17px;font-weight:600;color:#1a1a2e">${fechaDisplay}</p>
        <p style="margin:6px 0 0;font-size:13px;color:#666">Duración estimada: 30 minutos</p>
      </div>
      <p style="line-height:1.7;color:#444;margin:0 0 16px">
        Nuestro equipo se pondrá en contacto para confirmar la cita. Si necesita reprogramar o tiene alguna consulta urgente, contáctenos por WhatsApp al
        <a href="https://wa.me/593985222635" style="color:#1a1a2e;font-weight:600">+593 985 222 635</a>.
      </p>
      ${data.mensaje ? `<div style="background:#f5f5f5;border-radius:4px;padding:14px;margin-bottom:20px;font-size:13px;color:#555;border-left:3px solid #ccc"><strong>Su mensaje:</strong><br>${esc(data.mensaje)}</div>` : ''}
      <p style="margin:24px 0 0;font-size:12px;color:#888;border-top:1px solid #f0f0f0;padding-top:18px">
        Correo automático de confirmación — no responder.<br>
        <strong style="color:#1a1a2e">Imperium Iuris</strong> · Guayaquil, Ecuador
      </p>
    </div>
  </div>`
}

// POST — Crear nueva cita
export async function POST(request: NextRequest): Promise<NextResponse<ApiResponse<{ id: string } | null>>> {
  let body: unknown
  try {
    body = await request.json()
  } catch {
    return NextResponse.json({ success: false, error: 'Body inválido' }, { status: 400 })
  }

  const parsed = appointmentSchema.safeParse(body)
  if (!parsed.success) {
    return NextResponse.json(
      { success: false, error: 'Datos inválidos', issues: parsed.error.flatten().fieldErrors as Record<string, string[]> },
      { status: 422 },
    )
  }

  const data = parsed.data

  // Obtener usuario si hay sesión activa (para vincular cliente_id)
  const serverClient = await createSupabaseServerClient()
  const { data: { user: sessionUser } } = await serverClient.auth.getUser()

  const { horario: horarioCitas, festivos } = await getScheduleConfig()
  if (!isDateAvailable(data.fecha, horarioCitas, festivos)) {
    return NextResponse.json({ success: false, error: 'Esta fecha no está disponible para agendar citas.' }, { status: 422 })
  }

  // Verificar disponibilidad (evita race conditions)
  const { data: conflict } = await supabase
    .from('citas')
    .select('id')
    .eq('fecha', data.fecha)
    .eq('hora', data.hora)
    .neq('estado', 'cancelada')
    .maybeSingle()

  if (conflict) {
    return NextResponse.json({ success: false, error: 'Este horario ya no está disponible. Por favor seleccione otro.' }, { status: 409 })
  }

  // Guardar en Supabase
  const { data: inserted, error: dbError } = await supabase
    .from('citas')
    .insert({
      nombre:        data.nombre,
      correo:        data.correo,
      telefono:      data.telefono,
      tipo_consulta: data.tipoConsulta,
      fecha:         data.fecha,
      hora:          data.hora,
      mensaje:       data.mensaje ?? null,
      estado:        'pendiente',
      cliente_id:    sessionUser?.id ?? null,
    })
    .select('id')
    .single()

  if (dbError || !inserted) {
    console.error('[appointments] Supabase error:', dbError)
    return NextResponse.json({ success: false, error: 'Error al guardar la cita.' }, { status: 502 })
  }

  // Enviar emails
  const toEmail = process.env.RESEND_TO_EMAIL
  if (toEmail) {
    const [notif, confirm] = await Promise.allSettled([
      resend.emails.send({
        from:    'Imperium Iuris <onboarding@resend.dev>',
        to:      toEmail,
        subject: `Nueva cita — ${TIPO_LABEL[data.tipoConsulta]} — ${data.nombre} — ${data.fecha} ${data.hora}`,
        html:    emailAbogadoCita(data),
        replyTo: data.correo,
      }),
      resend.emails.send({
        from:    'Imperium Iuris <onboarding@resend.dev>',
        to:      data.correo,
        subject: 'Su cita ha sido agendada — Imperium Iuris',
        html:    emailClienteCita(data),
      }),
    ])

    const notifErr  = notif.status  === 'rejected' ? notif.reason  : notif.value.error
    const confirmErr = confirm.status === 'rejected' ? confirm.reason : confirm.value.error
    if (notifErr || confirmErr) {
      console.error('[appointments] Resend error:', { notifErr, confirmErr })
    }
  }

  // TODO M2: si urgencia, notificar por WhatsApp Business API

  return NextResponse.json({ success: true, data: { id: inserted.id } }, { status: 201 })
}
