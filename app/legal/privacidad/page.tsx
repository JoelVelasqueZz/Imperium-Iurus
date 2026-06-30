import type { Metadata } from 'next'
import Link from 'next/link'

export const metadata: Metadata = {
  title: 'Política de Privacidad | Imperium Iuris',
  description:
    'Política de privacidad de Imperium Iuris conforme a la Ley Orgánica de Protección de Datos Personales del Ecuador (LOPDP).',
  alternates: { canonical: 'https://imperiumiuris.ec/legal/privacidad' },
}

const LAST_UPDATED = '30 de junio de 2026'

export default function PrivacidadPage() {
  return (
    <main>
      {/* Hero */}
      <section className="premium-surface px-4 pb-16 pt-36 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-4xl">
          <p className="font-cinzel text-xs font-semibold uppercase tracking-[0.35em] text-gold-light">
            Legal
          </p>
          <h1 className="mt-4 font-trajan text-4xl font-bold uppercase tracking-[0.08em] text-white md:text-5xl">
            Política de Privacidad
          </h1>
          <p className="mt-5 text-sm font-light text-text-muted">
            Última actualización: {LAST_UPDATED}
          </p>
          <p className="mt-4 max-w-3xl text-base font-light leading-8 text-text-light">
            IMPERIUM IURIS está comprometido con la protección de sus datos personales. Esta política describe cómo recopilamos, usamos y protegemos su información, en cumplimiento de la{' '}
            <span className="text-gold">Ley Orgánica de Protección de Datos Personales (LOPDP)</span>{' '}
            de la República del Ecuador.
          </p>

          {/* Índice */}
          <nav className="mt-10 rounded-sm border border-gold/20 bg-secondary/60 p-6">
            <p className="mb-4 font-cinzel text-xs font-semibold uppercase tracking-widest text-gold">
              Contenido
            </p>
            <ol className="space-y-2">
              {[
                ['responsable', 'I. Responsable del Tratamiento'],
                ['datos', 'II. Datos Personales que Recopilamos'],
                ['finalidad', 'III. Finalidad del Tratamiento'],
                ['base', 'IV. Base Legal del Tratamiento'],
                ['almacenamiento', 'V. Almacenamiento y Seguridad'],
                ['terceros', 'VI. Transferencia a Terceros'],
                ['derechos', 'VII. Derechos del Titular de los Datos'],
                ['conservacion', 'VIII. Tiempo de Conservación'],
                ['menores', 'IX. Menores de Edad'],
                ['cambios', 'X. Cambios en esta Política'],
                ['contacto-privacidad', 'XI. Contacto'],
              ].map(([id, label]) => (
                <li key={id}>
                  <a
                    href={`#${id}`}
                    className="text-sm font-light text-text-muted transition-colors hover:text-gold focus-gold"
                  >
                    {label}
                  </a>
                </li>
              ))}
            </ol>
          </nav>
        </div>
      </section>

      {/* Contenido */}
      <section className="bg-primary px-4 py-16 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-4xl space-y-14">

          {/* I */}
          <article id="responsable" className="scroll-mt-24">
            <h2 className="mb-5 font-cinzel text-base font-semibold uppercase tracking-widest text-gold">
              I. Responsable del Tratamiento
            </h2>
            <div className="space-y-4 border-l border-gold/20 pl-6">
              <p className="text-sm font-light leading-8 text-text-muted">
                El responsable del tratamiento de sus datos personales es el <strong className="font-medium text-text-light">Estudio Jurídico Imperium Iuris</strong>, con domicilio en la ciudad de Guayaquil, Ecuador.
              </p>
              <div className="rounded-sm border border-gold/15 bg-secondary/40 p-5 text-sm font-light text-text-muted space-y-1">
                <p><span className="text-text-light">Razón Social:</span> Imperium Iuris</p>
                <p><span className="text-text-light">Correo de contacto:</span>{' '}
                  <a href="mailto:contacto@imperiumiuris.ec" className="text-gold hover:underline underline-offset-4">
                    contacto@imperiumiuris.ec
                  </a>
                </p>
                <p><span className="text-text-light">Ciudad:</span> Guayaquil, Ecuador</p>
                <p><span className="text-text-light">Marco legal aplicable:</span> LOPDP (Ley Orgánica de Protección de Datos Personales, R.O. Suplemento N.° 459, 26 de mayo de 2021)</p>
              </div>
            </div>
          </article>

          {/* II */}
          <article id="datos" className="scroll-mt-24">
            <h2 className="mb-5 font-cinzel text-base font-semibold uppercase tracking-widest text-gold">
              II. Datos Personales que Recopilamos
            </h2>
            <div className="space-y-6 border-l border-gold/20 pl-6">
              <p className="text-sm font-light leading-8 text-text-muted">
                Recopilamos únicamente los datos estrictamente necesarios para prestar los servicios solicitados. A continuación se detalla qué datos se recopilan según la interacción del usuario:
              </p>

              <div className="space-y-5">
                {[
                  {
                    titulo: 'Formulario de contacto y consulta',
                    datos: ['Nombre completo', 'Correo electrónico', 'Número de teléfono', 'Tipo de consulta', 'Mensaje o descripción del caso', 'Carácter confidencial de la consulta (checkbox)'],
                  },
                  {
                    titulo: 'Formulario de cita online',
                    datos: ['Nombre completo', 'Correo electrónico', 'Número de teléfono', 'Tipo de consulta', 'Fecha y hora preferida', 'Mensaje adicional (opcional)'],
                  },
                  {
                    titulo: 'Registro en el portal de cliente (Google OAuth)',
                    datos: ['Nombre y apellidos (desde perfil de Google)', 'Dirección de correo electrónico de Google', 'Foto de perfil de Google (opcional, si el perfil es público)'],
                  },
                  {
                    titulo: 'Chat cliente-abogado',
                    datos: ['Mensajes de texto enviados a través del chat', 'Identificador único de sesión', 'Fecha y hora de cada mensaje'],
                  },
                  {
                    titulo: 'Datos técnicos (recopilación automática)',
                    datos: ['Dirección IP', 'Tipo de navegador y versión', 'Sistema operativo', 'Páginas visitadas y tiempo de navegación', 'Datos de sesión (cookies de autenticación)'],
                  },
                ].map((cat) => (
                  <div key={cat.titulo} className="rounded-sm border border-gold/15 bg-secondary/30 p-5">
                    <p className="mb-3 font-cinzel text-xs font-semibold uppercase tracking-wider text-gold-light">
                      {cat.titulo}
                    </p>
                    <ul className="space-y-1">
                      {cat.datos.map((d) => (
                        <li key={d} className="flex items-start gap-2 text-sm font-light text-text-muted">
                          <span className="mt-2 block h-1 w-1 shrink-0 rounded-full bg-gold" />
                          {d}
                        </li>
                      ))}
                    </ul>
                  </div>
                ))}
              </div>
            </div>
          </article>

          {/* III */}
          <article id="finalidad" className="scroll-mt-24">
            <h2 className="mb-5 font-cinzel text-base font-semibold uppercase tracking-widest text-gold">
              III. Finalidad del Tratamiento
            </h2>
            <div className="space-y-4 border-l border-gold/20 pl-6">
              <p className="text-sm font-light leading-8 text-text-muted">
                Sus datos personales son tratados para las siguientes finalidades:
              </p>
              <ul className="space-y-3">
                {[
                  'Gestionar y atender sus consultas, solicitudes de cita y mensajes enviados a través del Portal.',
                  'Establecer comunicación previa con el equipo de abogados para evaluar su caso.',
                  'Enviar confirmaciones de cita y notificaciones relacionadas con los servicios solicitados.',
                  'Autenticar su identidad y mantener la seguridad de su cuenta en el portal de cliente.',
                  'Cumplir con las obligaciones legales aplicables al ejercicio de la profesión jurídica.',
                  'Mejorar el funcionamiento y la experiencia del Portal mediante análisis técnico agregado y anónimo.',
                ].map((item, i) => (
                  <li key={i} className="flex items-start gap-3 text-sm font-light leading-7 text-text-muted">
                    <span className="mt-1 font-cinzel text-xs font-bold text-gold">{String(i + 1).padStart(2, '0')}</span>
                    {item}
                  </li>
                ))}
              </ul>
              <p className="mt-4 text-sm font-light leading-8 text-text-muted">
                Sus datos <strong className="font-medium text-text-light">no serán utilizados</strong> para fines de marketing, publicidad o envío de comunicaciones no solicitadas sin su consentimiento previo y expreso.
              </p>
            </div>
          </article>

          {/* IV */}
          <article id="base" className="scroll-mt-24">
            <h2 className="mb-5 font-cinzel text-base font-semibold uppercase tracking-widest text-gold">
              IV. Base Legal del Tratamiento
            </h2>
            <div className="space-y-4 border-l border-gold/20 pl-6">
              <p className="text-sm font-light leading-8 text-text-muted">
                El tratamiento de sus datos personales se fundamenta en alguna de las siguientes bases legales previstas en la LOPDP:
              </p>
              <div className="space-y-4">
                {[
                  {
                    base: 'Consentimiento del titular',
                    desc: 'Cuando el usuario completa un formulario, se registra en el portal o utiliza el chat, otorga su consentimiento expreso para el tratamiento de los datos conforme a esta política.',
                    art: 'Art. 6 lit. a) LOPDP',
                  },
                  {
                    base: 'Ejecución de una relación contractual',
                    desc: 'El tratamiento es necesario para la prestación de los servicios jurídicos solicitados y para la gestión de la relación cliente-abogado.',
                    art: 'Art. 6 lit. b) LOPDP',
                  },
                  {
                    base: 'Cumplimiento de obligaciones legales',
                    desc: 'El tratamiento puede ser necesario para cumplir con obligaciones legales aplicables al ejercicio de la abogacía en Ecuador.',
                    art: 'Art. 6 lit. c) LOPDP',
                  },
                  {
                    base: 'Interés legítimo',
                    desc: 'El tratamiento de datos técnicos de navegación para garantizar la seguridad e integridad del Portal y prevenir usos fraudulentos.',
                    art: 'Art. 6 lit. f) LOPDP',
                  },
                ].map((item) => (
                  <div key={item.base} className="rounded-sm border border-gold/15 bg-secondary/30 p-5">
                    <div className="mb-2 flex items-center justify-between gap-4">
                      <p className="font-cinzel text-xs font-semibold uppercase tracking-wider text-gold-light">{item.base}</p>
                      <span className="shrink-0 rounded-sm bg-gold/10 px-2 py-1 font-cinzel text-xs text-gold">{item.art}</span>
                    </div>
                    <p className="text-sm font-light leading-7 text-text-muted">{item.desc}</p>
                  </div>
                ))}
              </div>
            </div>
          </article>

          {/* V */}
          <article id="almacenamiento" className="scroll-mt-24">
            <h2 className="mb-5 font-cinzel text-base font-semibold uppercase tracking-widest text-gold">
              V. Almacenamiento y Seguridad
            </h2>
            <div className="space-y-4 border-l border-gold/20 pl-6">
              <p className="text-sm font-light leading-8 text-text-muted">
                Sus datos son almacenados en la plataforma <strong className="font-medium text-text-light">Supabase</strong> (infraestructura en servidores de AWS en Virginia del Norte, EE. UU.), que cumple con estándares internacionales de seguridad (SOC 2 Type II, ISO 27001).
              </p>
              <p className="text-sm font-light leading-8 text-text-muted">
                Las medidas de seguridad implementadas incluyen:
              </p>
              <ul className="space-y-2">
                {[
                  'Cifrado en tránsito mediante TLS 1.2/1.3 para todas las comunicaciones.',
                  'Cifrado en reposo de los datos almacenados en la base de datos.',
                  'Políticas de seguridad a nivel de fila (Row Level Security) que garantizan que cada usuario accede únicamente a sus propios datos.',
                  'Autenticación mediante OAuth 2.0 con proveedores externos (Google) para el portal de cliente.',
                  'Acceso restringido al panel de administración mediante credenciales específicas y control de roles.',
                  'Copias de seguridad automáticas de la base de datos.',
                ].map((item, i) => (
                  <li key={i} className="flex items-start gap-2 text-sm font-light leading-7 text-text-muted">
                    <span className="mt-2 block h-1 w-1 shrink-0 rounded-full bg-gold" />
                    {item}
                  </li>
                ))}
              </ul>
              <p className="text-sm font-light leading-8 text-text-muted">
                A pesar de las medidas técnicas adoptadas, ningún sistema de transmisión de datos por internet puede garantizar seguridad absoluta. El usuario asume los riesgos inherentes a la transmisión de información a través de internet.
              </p>
            </div>
          </article>

          {/* VI */}
          <article id="terceros" className="scroll-mt-24">
            <h2 className="mb-5 font-cinzel text-base font-semibold uppercase tracking-widest text-gold">
              VI. Transferencia a Terceros
            </h2>
            <div className="space-y-4 border-l border-gold/20 pl-6">
              <p className="text-sm font-light leading-8 text-text-muted">
                IMPERIUM IURIS no vende, alquila ni comparte sus datos personales con terceros con fines comerciales. Sus datos pueden ser accedidos por los siguientes encargados del tratamiento, en el marco estricto de la prestación del servicio:
              </p>
              <div className="space-y-3">
                {[
                  { proveedor: 'Supabase Inc.', rol: 'Almacenamiento de datos y autenticación', pais: 'EE. UU. (AWS)' },
                  { proveedor: 'Resend Inc.', rol: 'Envío de correos electrónicos transaccionales (confirmaciones de cita y notificaciones)', pais: 'EE. UU.' },
                  { proveedor: 'Google LLC', rol: 'Autenticación OAuth para el portal de cliente', pais: 'EE. UU.' },
                  { proveedor: 'Vercel Inc.', rol: 'Hosting y despliegue del sitio web', pais: 'EE. UU.' },
                ].map((t) => (
                  <div key={t.proveedor} className="grid grid-cols-[1fr_2fr_auto] gap-4 rounded-sm border border-gold/15 bg-secondary/30 px-5 py-4 text-sm font-light text-text-muted">
                    <p className="font-medium text-text-light">{t.proveedor}</p>
                    <p>{t.rol}</p>
                    <p className="text-right text-xs text-text-muted">{t.pais}</p>
                  </div>
                ))}
              </div>
              <p className="text-sm font-light leading-8 text-text-muted">
                Todos los encargados del tratamiento están sujetos a cláusulas contractuales de confidencialidad y seguridad. Las transferencias internacionales de datos se realizan conforme al Art. 54 y siguientes de la LOPDP, dado que los países receptores cuentan con niveles adecuados de protección o se aplican garantías apropiadas.
              </p>
              <p className="text-sm font-light leading-8 text-text-muted">
                Sus datos podrán ser divulgados a autoridades públicas ecuatorianas cuando así lo exija la ley o una orden judicial.
              </p>
            </div>
          </article>

          {/* VII */}
          <article id="derechos" className="scroll-mt-24">
            <h2 className="mb-5 font-cinzel text-base font-semibold uppercase tracking-widest text-gold">
              VII. Derechos del Titular de los Datos
            </h2>
            <div className="space-y-4 border-l border-gold/20 pl-6">
              <p className="text-sm font-light leading-8 text-text-muted">
                De conformidad con los artículos 20 a 33 de la LOPDP, usted tiene los siguientes derechos sobre sus datos personales:
              </p>
              <div className="grid gap-4 sm:grid-cols-2">
                {[
                  {
                    derecho: 'Acceso',
                    desc: 'Obtener confirmación de si sus datos están siendo tratados y acceder a una copia de los mismos.',
                    art: 'Art. 20 LOPDP',
                  },
                  {
                    derecho: 'Rectificación',
                    desc: 'Solicitar la corrección de datos personales inexactos o incompletos.',
                    art: 'Art. 22 LOPDP',
                  },
                  {
                    derecho: 'Eliminación',
                    desc: 'Solicitar la supresión de sus datos cuando ya no sean necesarios o cuando retire su consentimiento.',
                    art: 'Art. 23 LOPDP',
                  },
                  {
                    derecho: 'Oposición',
                    desc: 'Oponerse al tratamiento de sus datos en determinadas circunstancias, incluyendo el uso para fines de marketing.',
                    art: 'Art. 24 LOPDP',
                  },
                  {
                    derecho: 'Portabilidad',
                    desc: 'Recibir sus datos en un formato estructurado, de uso común y lectura mecánica, y transmitirlos a otro responsable.',
                    art: 'Art. 25 LOPDP',
                  },
                  {
                    derecho: 'Limitación del tratamiento',
                    desc: 'Solicitar la suspensión del tratamiento de sus datos en ciertas situaciones previstas por la ley.',
                    art: 'Art. 26 LOPDP',
                  },
                ].map((d) => (
                  <div key={d.derecho} className="rounded-sm border border-gold/15 bg-secondary/30 p-5">
                    <div className="mb-2 flex items-start justify-between gap-2">
                      <p className="font-cinzel text-sm font-semibold text-gold">{d.derecho}</p>
                      <span className="shrink-0 rounded-sm bg-gold/10 px-2 py-1 font-cinzel text-xs text-gold">{d.art}</span>
                    </div>
                    <p className="text-sm font-light leading-7 text-text-muted">{d.desc}</p>
                  </div>
                ))}
              </div>
              <div className="mt-4 rounded-sm border border-gold/30 bg-gold/5 p-5">
                <p className="font-cinzel text-xs font-semibold uppercase tracking-wider text-gold">
                  Cómo ejercer sus derechos
                </p>
                <p className="mt-3 text-sm font-light leading-7 text-text-muted">
                  Para ejercer cualquiera de los derechos anteriores, envíe un correo electrónico a{' '}
                  <a href="mailto:contacto@imperiumiuris.ec" className="text-gold underline-offset-4 hover:underline">
                    contacto@imperiumiuris.ec
                  </a>{' '}
                  indicando su nombre completo, el derecho que desea ejercer y, en su caso, la información adicional necesaria para atender su solicitud. Responderemos en un plazo máximo de{' '}
                  <strong className="font-medium text-text-light">15 días hábiles</strong> conforme al Art. 10 de la LOPDP.
                </p>
                <p className="mt-3 text-sm font-light leading-7 text-text-muted">
                  Si considera que sus derechos no han sido atendidos, puede presentar una reclamación ante la{' '}
                  <strong className="font-medium text-text-light">Autoridad de Protección de Datos Personales del Ecuador</strong>{' '}
                  (creada mediante los Arts. 62 y ss. de la LOPDP).
                </p>
              </div>
            </div>
          </article>

          {/* VIII */}
          <article id="conservacion" className="scroll-mt-24">
            <h2 className="mb-5 font-cinzel text-base font-semibold uppercase tracking-widest text-gold">
              VIII. Tiempo de Conservación
            </h2>
            <div className="space-y-4 border-l border-gold/20 pl-6">
              <p className="text-sm font-light leading-8 text-text-muted">
                Sus datos serán conservados durante el tiempo estrictamente necesario para cumplir las finalidades descritas en esta política, y posteriormente durante el tiempo requerido para cumplir con obligaciones legales o para la formulación, ejercicio o defensa de reclamaciones jurídicas.
              </p>
              <div className="space-y-3">
                {[
                  { tipo: 'Consultas y formularios de contacto', plazo: '5 años desde la última interacción' },
                  { tipo: 'Datos de citas agendadas', plazo: '5 años desde la fecha de la cita' },
                  { tipo: 'Mensajes del chat cliente-abogado', plazo: 'Mientras la cuenta esté activa + 3 años' },
                  { tipo: 'Datos de cuenta del portal de cliente', plazo: 'Mientras la cuenta esté activa o hasta solicitud de eliminación' },
                  { tipo: 'Datos de sesión y técnicos', plazo: '12 meses desde la última sesión' },
                ].map((item) => (
                  <div key={item.tipo} className="flex flex-col gap-1 rounded-sm border border-gold/15 bg-secondary/30 px-5 py-4 sm:flex-row sm:items-center sm:justify-between">
                    <p className="text-sm font-light text-text-muted">{item.tipo}</p>
                    <p className="shrink-0 text-sm font-medium text-gold-light">{item.plazo}</p>
                  </div>
                ))}
              </div>
              <p className="text-sm font-light leading-8 text-text-muted">
                Transcurridos estos plazos, los datos serán eliminados o anonimizados de forma segura.
              </p>
            </div>
          </article>

          {/* IX */}
          <article id="menores" className="scroll-mt-24">
            <h2 className="mb-5 font-cinzel text-base font-semibold uppercase tracking-widest text-gold">
              IX. Menores de Edad
            </h2>
            <div className="space-y-4 border-l border-gold/20 pl-6">
              <p className="text-sm font-light leading-8 text-text-muted">
                El Portal no está dirigido a menores de 18 años. No recopilamos conscientemente datos personales de menores de edad. Si usted es padre, madre o tutor legal y detecta que un menor ha proporcionado datos personales a través del Portal, le rogamos que lo comunique a{' '}
                <a href="mailto:contacto@imperiumiuris.ec" className="text-gold underline-offset-4 hover:underline">
                  contacto@imperiumiuris.ec
                </a>{' '}
                para proceder a su inmediata eliminación.
              </p>
            </div>
          </article>

          {/* X */}
          <article id="cambios" className="scroll-mt-24">
            <h2 className="mb-5 font-cinzel text-base font-semibold uppercase tracking-widest text-gold">
              X. Cambios en esta Política
            </h2>
            <div className="space-y-4 border-l border-gold/20 pl-6">
              <p className="text-sm font-light leading-8 text-text-muted">
                IMPERIUM IURIS se reserva el derecho de actualizar esta Política de Privacidad para adaptarla a novedades legislativas, reglamentarias o de práctica empresarial. La fecha de última actualización figura siempre al inicio del documento.
              </p>
              <p className="text-sm font-light leading-8 text-text-muted">
                Le recomendamos revisar periódicamente esta política. Si los cambios son significativos y afectan al tratamiento de sus datos, le notificaremos por correo electrónico o mediante un aviso destacado en el Portal.
              </p>
            </div>
          </article>

          {/* XI */}
          <article id="contacto-privacidad" className="scroll-mt-24">
            <h2 className="mb-5 font-cinzel text-base font-semibold uppercase tracking-widest text-gold">
              XI. Contacto
            </h2>
            <div className="space-y-4 border-l border-gold/20 pl-6">
              <p className="text-sm font-light leading-8 text-text-muted">
                Para cualquier consulta, reclamación o solicitud relacionada con el tratamiento de sus datos personales:
              </p>
              <p className="text-sm font-light text-text-light">
                Correo electrónico:{' '}
                <a href="mailto:contacto@imperiumiuris.ec" className="text-gold underline-offset-4 hover:underline">
                  contacto@imperiumiuris.ec
                </a>
              </p>
              <p className="text-sm font-light text-text-muted">
                Dirección: Guayaquil, Ecuador
              </p>
            </div>
          </article>

          {/* Links relacionados */}
          <div className="border-t border-gold/10 pt-10">
            <p className="mb-5 font-cinzel text-xs font-semibold uppercase tracking-widest text-gold">
              Documentos relacionados
            </p>
            <div className="flex flex-wrap gap-4">
              <Link
                href="/legal/terminos"
                className="text-sm font-light text-text-muted transition-colors hover:text-gold focus-gold"
              >
                → Términos y Condiciones
              </Link>
              <Link
                href="/legal/cookies"
                className="text-sm font-light text-text-muted transition-colors hover:text-gold focus-gold"
              >
                → Política de Cookies
              </Link>
            </div>
          </div>
        </div>
      </section>
    </main>
  )
}
