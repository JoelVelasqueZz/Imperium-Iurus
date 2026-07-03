import { type NextRequest, NextResponse } from 'next/server'
import { Resend } from 'resend'
import { contactSchema, type ApiResponse, type ContactFormData } from '@/lib/schemas'
import { supabase } from '@/lib/supabase'
import { checkRateLimit, getClientIp } from '@/lib/rate-limit'

const resend = new Resend(process.env.RESEND_API_KEY)

function esc(str: string): string {
  return str.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;')
}

const TIPO_LABEL: Record<ContactFormData['tipoConsulta'], string> = {
  personal:     'Defensa Personal',
  empresarial:  'Asesoría Empresarial',
  funcionario:  'Funcionario Público',
  urgencia:     'URGENCIA',
  otro:         'Otra consulta',
}

function emailAbogado(data: ContactFormData): string {
  return `
    <div style="font-family:Arial,sans-serif;max-width:600px;margin:0 auto;color:#1a1a1a">
      <div style="background:#1a1a2e;padding:24px 32px;border-radius:8px 8px 0 0">
        <h1 style="color:#c9a96e;margin:0;font-size:20px;letter-spacing:1px">
          IMPERIUM IURIS — Nueva Consulta
        </h1>
      </div>
      <div style="background:#ffffff;padding:32px;border:1px solid #e5e7eb;border-top:none;border-radius:0 0 8px 8px">
        <table style="width:100%;border-collapse:collapse">
          <tr>
            <td style="padding:10px 0;border-bottom:1px solid #f0f0f0;font-weight:600;width:160px;color:#555">Tipo de consulta</td>
            <td style="padding:10px 0;border-bottom:1px solid #f0f0f0">${data.tipoConsulta === 'urgencia' ? `<strong style="color:#dc2626">${TIPO_LABEL[data.tipoConsulta]}</strong>` : TIPO_LABEL[data.tipoConsulta]}</td>
          </tr>
          <tr>
            <td style="padding:10px 0;border-bottom:1px solid #f0f0f0;font-weight:600;color:#555">Nombre</td>
            <td style="padding:10px 0;border-bottom:1px solid #f0f0f0">${esc(data.nombre)}</td>
          </tr>
          <tr>
            <td style="padding:10px 0;border-bottom:1px solid #f0f0f0;font-weight:600;color:#555">Correo</td>
            <td style="padding:10px 0;border-bottom:1px solid #f0f0f0"><a href="mailto:${esc(data.correo)}" style="color:#1a1a2e">${esc(data.correo)}</a></td>
          </tr>
          <tr>
            <td style="padding:10px 0;border-bottom:1px solid #f0f0f0;font-weight:600;color:#555">Teléfono</td>
            <td style="padding:10px 0;border-bottom:1px solid #f0f0f0"><a href="tel:${esc(data.telefono)}" style="color:#1a1a2e">${esc(data.telefono)}</a></td>
          </tr>
          <tr>
            <td style="padding:10px 0;border-bottom:1px solid #f0f0f0;font-weight:600;color:#555">Confidencial</td>
            <td style="padding:10px 0;border-bottom:1px solid #f0f0f0">${data.confidencial ? 'Sí — manejo discreto' : 'No'}</td>
          </tr>
          <tr>
            <td style="padding:14px 0 0;font-weight:600;color:#555;vertical-align:top">Mensaje</td>
            <td style="padding:14px 0 0;line-height:1.6;white-space:pre-wrap">${esc(data.mensaje)}</td>
          </tr>
        </table>
        <div style="margin-top:28px;padding:16px;background:#fafafa;border-left:3px solid #c9a96e;font-size:13px;color:#666">
          Recibido el ${new Date().toLocaleString('es-EC', { timeZone: 'America/Guayaquil', dateStyle: 'full', timeStyle: 'short' })}
        </div>
      </div>
    </div>
  `
}

function emailCliente(data: ContactFormData): string {
  return `
    <div style="font-family:Arial,sans-serif;max-width:600px;margin:0 auto;color:#1a1a1a">
      <div style="background:#1a1a2e;padding:24px 32px;border-radius:8px 8px 0 0">
        <h1 style="color:#c9a96e;margin:0;font-size:20px;letter-spacing:1px">IMPERIUM IURIS</h1>
        <p style="color:#a0aec0;margin:6px 0 0;font-size:13px">Defensa Penal Estratégica — Guayaquil, Ecuador</p>
      </div>
      <div style="background:#ffffff;padding:32px;border:1px solid #e5e7eb;border-top:none;border-radius:0 0 8px 8px">
        <p style="font-size:16px;margin:0 0 16px">Estimado/a <strong>${esc(data.nombre)}</strong>,</p>
        <p style="line-height:1.7;color:#444;margin:0 0 16px">
          Hemos recibido su consulta de tipo <strong>${TIPO_LABEL[data.tipoConsulta]}</strong>.
          Nuestro equipo la revisará con la confidencialidad y seriedad que merece,
          y nos pondremos en contacto con usted a la brevedad posible.
        </p>
        <p style="line-height:1.7;color:#444;margin:0 0 24px">
          Si su situación es urgente, puede contactarnos directamente por WhatsApp al
          <a href="https://wa.me/593985222635" style="color:#1a1a2e;font-weight:600">+593 985 222 635</a>.
        </p>
        <div style="background:#f8f4ee;border-radius:6px;padding:20px;border:1px solid #e8d9c0">
          <p style="margin:0 0 8px;font-size:13px;font-weight:600;color:#8a6a2e;letter-spacing:.5px">SU CONSULTA</p>
          <p style="margin:0;line-height:1.6;color:#555;white-space:pre-wrap;font-size:14px">${esc(data.mensaje)}</p>
        </div>
        <p style="margin:28px 0 0;font-size:13px;color:#888;border-top:1px solid #f0f0f0;padding-top:20px">
          Este es un correo automático de confirmación. Por favor no responda a este mensaje.<br>
          <strong style="color:#1a1a2e">Imperium Iuris</strong> · Guayaquil, Ecuador
        </p>
      </div>
    </div>
  `
}

export async function POST(request: NextRequest): Promise<NextResponse<ApiResponse>> {
  const ip = getClientIp(request)
  if (!checkRateLimit(`contact:${ip}`, 5, 10 * 60 * 1000)) {
    return NextResponse.json({ success: false, error: 'Demasiadas solicitudes. Intente de nuevo en unos minutos.' }, { status: 429 })
  }

  let body: unknown
  try {
    body = await request.json()
  } catch {
    return NextResponse.json({ success: false, error: 'Body inválido' }, { status: 400 })
  }

  const parsed = contactSchema.safeParse(body)
  if (!parsed.success) {
    return NextResponse.json(
      {
        success: false,
        error: 'Datos inválidos',
        issues: parsed.error.flatten().fieldErrors as Record<string, string[]>,
      },
      { status: 422 },
    )
  }

  const data = parsed.data
  const toEmail = process.env.RESEND_TO_EMAIL

  if (!toEmail) {
    return NextResponse.json({ success: false, error: 'Configuración de email incompleta' }, { status: 500 })
  }

  // Guardar consulta en Supabase
  const { error: dbError } = await supabase.from('consultas').insert({
    nombre:        data.nombre,
    correo:        data.correo,
    telefono:      data.telefono,
    tipo_consulta: data.tipoConsulta,
    mensaje:       data.mensaje,
    confidencial:  data.confidencial,
    estado:        'nuevo',
  })
  if (dbError) console.error('[contact] Supabase error:', dbError.message)

  const [notif, confirm] = await Promise.allSettled([
    resend.emails.send({
      from:    'Imperium Iuris <onboarding@resend.dev>',
      to:      toEmail,
      subject: `[${data.tipoConsulta === 'urgencia' ? 'URGENTE' : 'Nueva consulta'}] ${TIPO_LABEL[data.tipoConsulta]} — ${data.nombre}`,
      html:    emailAbogado(data),
      replyTo: data.correo,
    }),
    resend.emails.send({
      from:    'Imperium Iuris <onboarding@resend.dev>',
      to:      data.correo,
      subject: 'Hemos recibido su consulta — Imperium Iuris',
      html:    emailCliente(data),
    }),
  ])

  // Resend SDK resuelve siempre (no lanza), errores vienen en .value.error
  const notifErr   = notif.status   === 'rejected' ? notif.reason   : notif.value.error
  const confirmErr = confirm.status === 'rejected' ? confirm.reason : confirm.value.error
  if (notifErr || confirmErr) {
    // La consulta ya está guardada en DB — solo se loguea, no se falla la respuesta
    console.error('[contact] Resend error:', { notifErr, confirmErr })
  }

  return NextResponse.json({ success: true, data: null })
}
