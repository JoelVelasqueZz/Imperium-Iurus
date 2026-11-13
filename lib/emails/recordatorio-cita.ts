type DatosRecordatorio = { nombre: string; fecha: string; hora: string }

// Copiada de app/api/appointments/route.ts (líneas 86 a 88)
function esc(str: string): string {
  return str.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;')
}

// Copiada de app/api/appointments/route.ts (líneas 90 a 96)
function fmtFecha(fecha: string, hora: string): string {
  const [y, mo, d] = fecha.split('-')
  const date = new Date(`${fecha}T${hora}:00`)
  const diasSemana = ['domingo', 'lunes', 'martes', 'miércoles', 'jueves', 'viernes', 'sábado']
  const meses = ['enero','febrero','marzo','abril','mayo','junio','julio','agosto','septiembre','octubre','noviembre','diciembre']
  return `${diasSemana[date.getDay()]}, ${d} de ${meses[Number(mo) - 1]} de ${y} a las ${hora}`
}

export function asuntoRecordatorio(): string {
  return 'Recordatorio de su cita — Imperium Iuris'
}
// Copiada de app/api/appointments/route.ts (líneas 127 a 156) con <meta name="viewport"> para que sea responsivo en el celular
export function emailRecordatorioCita(datos: DatosRecordatorio): string {
  const fechaTexto = fmtFecha(datos.fecha, datos.hora)
  return `<!DOCTYPE html>
<html lang="es">
<head>
  <meta charset="utf-8">
  <!-- Le dice al celular que use el ancho real de su pantalla -->
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <title>Recordatorio de su cita</title>
  <style>
    /* En pantallas pequeñas: menos margen y letra un poco más grande */
    @media (max-width: 480px) {
      .marco     { padding: 0 !important; }
      .cabecera  { padding: 18px 20px !important; border-radius: 0 !important; }
      .contenido { padding: 22px 20px !important; border-radius: 0 !important; }
      .fecha     { font-size: 18px !important; }
      .texto     { font-size: 16px !important; }
    }
  </style>
</head>
<body style="margin:0;padding:0;background:#f4f4f4">
  <div class="marco" style="padding:24px 12px">
    <div style="font-family:Arial,sans-serif;width:100%;max-width:600px;margin:0 auto;color:#1a1a1a">
      <div class="cabecera" style="background:#1a1a2e;padding:24px 32px;border-radius:8px 8px 0 0">
        <h1 style="color:#c9a96e;margin:0;font-size:20px;letter-spacing:1px">IMPERIUM IURIS</h1>
        <p style="color:#a0aec0;margin:6px 0 0;font-size:13px">Defensa Penal Estratégica — Guayaquil, Ecuador</p>
      </div>
      <div class="contenido" style="background:#fff;padding:32px;border:1px solid #e5e7eb;border-top:none;border-radius:0 0 8px 8px">
        <p class="texto" style="font-size:16px;margin:0 0 16px">Estimado/a <strong>${esc(datos.nombre)}</strong>,</p>
        <p class="texto" style="font-size:15px;line-height:1.7;color:#444;margin:0 0 20px">
          Le recordamos que mañana tiene una cita con nosotros.
        </p>
        <div style="background:#f8f4ee;border-radius:6px;padding:20px;border:1px solid #e8d9c0;margin-bottom:24px">
          <p style="margin:0 0 6px;font-size:12px;font-weight:600;color:#8a6a2e;letter-spacing:.5px;text-transform:uppercase">Detalle de su cita</p>
          <p class="fecha" style="margin:0;font-size:17px;font-weight:600;color:#1a1a2e;line-height:1.4">${fechaTexto}</p>
          <p style="margin:6px 0 0;font-size:13px;color:#666">Duración estimada: 30 minutos</p>
        </div>
        <p class="texto" style="font-size:15px;line-height:1.7;color:#444;margin:0 0 16px">
          Si necesita reprogramar o no puede asistir, contáctenos por WhatsApp al
          <a href="https://wa.me/593985222635" style="color:#1a1a2e;font-weight:600;white-space:nowrap">+593 985 222 635</a>.
        </p>
        <p style="margin:24px 0 0;font-size:12px;color:#888;border-top:1px solid #f0f0f0;padding-top:18px">
          Correo automático de recordatorio — no responder.<br>
          <strong style="color:#1a1a2e">Imperium Iuris</strong> · Guayaquil, Ecuador
        </p>
      </div>
    </div>
  </div>
</body>
</html>`
}