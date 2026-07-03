import type { Metadata } from 'next'
import Link from 'next/link'

export const metadata: Metadata = {
  title: 'Términos y Condiciones | Imperium Iuris',
  description: 'Términos y condiciones de uso del portal y servicios jurídicos de Imperium Iuris.',
  alternates: { canonical: 'https://imperiumiuris.ec/legal/terminos' },
}

const LAST_UPDATED = '30 de junio de 2026'

const sections = [
  {
    id: 'objeto',
    title: 'I. Objeto y Ámbito de Aplicación',
    content: [
      'Los presentes Términos y Condiciones (en adelante, «los Términos») regulan el acceso y uso del sitio web imperiumiuris.ec y del portal de cliente de IMPERIUM IURIS (en adelante, «el Portal»), operado por el Estudio Jurídico Imperium Iuris, con sede en Guayaquil, Ecuador.',
      'El acceso al Portal implica la aceptación plena y sin reservas de los presentes Términos. Si no está de acuerdo con alguna de sus disposiciones, deberá abstenerse de utilizar el Portal.',
      'Estos Términos se aplican a todos los usuarios del Portal, incluyendo visitantes, clientes registrados y cualquier persona que acceda a los contenidos o servicios disponibles.',
    ],
  },
  {
    id: 'uso',
    title: 'II. Uso del Portal',
    content: [
      'El Portal tiene como finalidad informar sobre los servicios jurídicos de la firma, permitir el agendamiento de citas, la consulta confidencial en línea y la comunicación entre clientes y abogados a través del chat en tiempo real.',
      'El registro en el portal de cliente requiere autenticación mediante Google OAuth. El usuario es responsable de mantener la confidencialidad de sus credenciales y de todas las actividades realizadas bajo su cuenta.',
      'El usuario se compromete a: (i) proporcionar información veraz y actualizada; (ii) no utilizar el Portal para fines ilegales o no autorizados; (iii) no intentar acceder a áreas restringidas o a cuentas de otros usuarios; (iv) no reproducir, distribuir ni explotar comercialmente los contenidos sin autorización expresa.',
    ],
  },
  {
    id: 'servicios',
    title: 'III. Naturaleza de los Servicios Jurídicos',
    content: [
      'Los contenidos publicados en el Portal —artículos de blog, guías informativas, descripciones de áreas de práctica— tienen carácter meramente informativo y no constituyen asesoría jurídica ni establecen relación cliente-abogado.',
      'La relación profesional entre el cliente y la firma se establece únicamente mediante la suscripción de un contrato de servicios jurídicos debidamente firmado y la aceptación de los honorarios correspondientes.',
      'El agendamiento de una cita a través del Portal no implica la aceptación del caso ni el inicio de ninguna relación jurídica contractual. IMPERIUM IURIS se reserva el derecho de aceptar o rechazar cualquier caso a su discreción.',
      'La comunicación a través del chat del portal constituye un canal de contacto preliminar. La información intercambiada en dicho canal está sujeta a confidencialidad, pero no reemplaza la asesoría jurídica formal.',
    ],
  },
  {
    id: 'responsabilidad',
    title: 'IV. Limitaciones de Responsabilidad',
    content: [
      'IMPERIUM IURIS no garantiza la disponibilidad continua e ininterrumpida del Portal. El servicio puede ser suspendido temporal o definitivamente por razones técnicas, de mantenimiento o de fuerza mayor, sin que ello genere responsabilidad alguna frente al usuario.',
      'La firma no será responsable por daños directos, indirectos, incidentales, especiales o consecuentes derivados del uso o la imposibilidad de uso del Portal, incluyendo pérdida de datos, lucro cesante o daño emergente.',
      'El Portal puede contener enlaces a sitios web de terceros. IMPERIUM IURIS no controla ni es responsable por los contenidos, políticas de privacidad o prácticas de dichos sitios, y no otorga ninguna garantía respecto de los mismos.',
      'La información publicada en el Portal es de carácter general y puede no reflejar cambios legislativos recientes. El usuario no debe tomar decisiones jurídicas basándose exclusivamente en los contenidos del Portal sin consultar previamente con un abogado.',
    ],
  },
  {
    id: 'propiedad',
    title: 'V. Propiedad Intelectual',
    content: [
      'Todos los contenidos del Portal —incluyendo textos, gráficos, logotipos, iconos, imágenes, clips de audio, descargas digitales, recopilaciones de datos y software— son propiedad de IMPERIUM IURIS o de sus proveedores de contenido y están protegidos por las leyes ecuatorianas e internacionales de propiedad intelectual.',
      'Se prohíbe expresamente la reproducción, distribución, modificación, comunicación pública o cualquier otra forma de explotación, total o parcial, de los contenidos del Portal sin la autorización previa y por escrito de IMPERIUM IURIS.',
      'El nombre «IMPERIUM IURIS», su logotipo y demás signos distintivos son marcas registradas o en proceso de registro. Su uso no autorizado está prohibido y puede dar lugar a acciones legales.',
    ],
  },
  {
    id: 'confidencialidad',
    title: 'VI. Confidencialidad',
    content: [
      'Toda la información proporcionada por los usuarios a través del Portal será tratada con estricta confidencialidad, de conformidad con la deontología profesional de la abogacía y la Ley Orgánica de Protección de Datos Personales del Ecuador.',
      'Los abogados de IMPERIUM IURIS están sujetos al secreto profesional. La información compartida en el contexto de una consulta, cita o chat no podrá ser divulgada a terceros sin el consentimiento expreso del cliente, salvo obligación legal.',
      'Para conocer cómo se tratan sus datos personales, consulte nuestra Política de Privacidad disponible en /legal/privacidad.',
    ],
  },
  {
    id: 'modificaciones',
    title: 'VII. Modificaciones de los Términos',
    content: [
      'IMPERIUM IURIS se reserva el derecho de modificar los presentes Términos en cualquier momento. Las modificaciones entrarán en vigor desde su publicación en el Portal.',
      'Se recomienda al usuario revisar periódicamente los Términos. El uso continuado del Portal tras la publicación de cambios implica la aceptación de los Términos modificados.',
    ],
  },
  {
    id: 'ley',
    title: 'VIII. Ley Aplicable y Jurisdicción',
    content: [
      'Los presentes Términos se rigen por las leyes de la República del Ecuador. Para cualquier controversia derivada de la interpretación o ejecución de estos Términos, las partes se someten a la jurisdicción de los Juzgados y Tribunales de la ciudad de Guayaquil, Ecuador, con renuncia expresa a cualquier otro fuero.',
      'En caso de conflicto entre estos Términos y la legislación ecuatoriana aplicable, prevalecerá lo dispuesto por la ley.',
    ],
  },
]

export default function TerminosPage() {
  return (
    <main>
      {/* Hero */}
      <section className="premium-surface px-4 pb-16 pt-36 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-4xl">
          <p className="font-cinzel text-xs font-semibold uppercase tracking-[0.35em] text-gold-light">
            Legal
          </p>
          <h1 className="mt-4 font-trajan text-4xl font-bold uppercase tracking-[0.08em] text-white md:text-5xl">
            Términos y Condiciones
          </h1>
          <p className="mt-5 text-sm font-light text-text-muted">
            Última actualización: {LAST_UPDATED}
          </p>
          <p className="mt-4 max-w-2xl text-base font-light leading-8 text-text-light">
            Lea detenidamente estos términos antes de utilizar el portal o solicitar nuestros servicios jurídicos.
          </p>

          {/* Índice */}
          <nav className="mt-10 rounded-sm border border-gold/20 bg-secondary/60 p-6">
            <p className="mb-4 font-cinzel text-xs font-semibold uppercase tracking-widest text-gold">
              Contenido
            </p>
            <ol className="space-y-2">
              {sections.map((s) => (
                <li key={s.id}>
                  <a
                    href={`#${s.id}`}
                    className="text-sm font-light text-text-muted transition-colors hover:text-gold focus-gold"
                  >
                    {s.title}
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
          {sections.map((s) => (
            <article key={s.id} id={s.id} className="scroll-mt-24">
              <h2 className="mb-5 font-cinzel text-base font-semibold uppercase tracking-widest text-gold">
                {s.title}
              </h2>
              <div className="space-y-4 border-l border-gold/20 pl-6">
                {s.content.map((p) => (
                  <p key={p} className="text-sm font-light leading-8 text-text-muted">
                    {p}
                  </p>
                ))}
              </div>
            </article>
          ))}

          {/* Contacto */}
          <article id="contacto" className="scroll-mt-24">
            <h2 className="mb-5 font-cinzel text-base font-semibold uppercase tracking-widest text-gold">
              IX. Contacto
            </h2>
            <div className="space-y-4 border-l border-gold/20 pl-6">
              <p className="text-sm font-light leading-8 text-text-muted">
                Para cualquier consulta relacionada con estos Términos y Condiciones, puede contactarnos en:
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

          {/* Links a otras políticas */}
          <div className="border-t border-gold/10 pt-10">
            <p className="mb-5 font-cinzel text-xs font-semibold uppercase tracking-widest text-gold">
              Documentos relacionados
            </p>
            <div className="flex flex-wrap gap-4">
              <Link
                href="/legal/privacidad"
                className="text-sm font-light text-text-muted transition-colors hover:text-gold focus-gold"
              >
                → Política de Privacidad
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
