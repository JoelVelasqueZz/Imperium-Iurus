import type { Metadata } from 'next'
import Link from 'next/link'

export const metadata: Metadata = {
  title: 'Política de Cookies | Imperium Iuris',
  description:
    'Política de cookies de Imperium Iuris: qué cookies utilizamos, para qué y cómo gestionarlas.',
  alternates: { canonical: 'https://imperiumiuris.ec/legal/cookies' },
}

const LAST_UPDATED = '30 de junio de 2026'

const cookieTable = [
  {
    categoria: 'Estrictamente necesarias',
    descripcion:
      'Indispensables para el funcionamiento del Portal. Sin ellas, el sitio no puede operar correctamente.',
    cookies: [
      {
        nombre: 'sb-access-token',
        proveedor: 'Supabase',
        finalidad: 'Token de sesión JWT para autenticar al usuario en el portal de cliente.',
        duracion: 'Sesión (expira al cerrar el navegador o al renovarse)',
        tipo: 'HTTP Cookie',
      },
      {
        nombre: 'sb-refresh-token',
        proveedor: 'Supabase',
        finalidad: 'Token de refresco que permite renovar la sesión sin que el usuario vuelva a hacer login.',
        duracion: '60 días',
        tipo: 'HTTP Cookie',
      },
      {
        nombre: '__Host-next-auth.csrf-token',
        proveedor: 'Next.js',
        finalidad: 'Protección contra ataques CSRF (Cross-Site Request Forgery) en formularios.',
        duracion: 'Sesión',
        tipo: 'HTTP Cookie',
      },
    ],
  },
  {
    categoria: 'Funcionales',
    descripcion:
      'Mejoran la experiencia del usuario recordando preferencias y configuraciones previas.',
    cookies: [
      {
        nombre: 'pending_agenda / pending_contacto',
        proveedor: 'imperiumiuris.ec',
        finalidad: 'Almacena temporalmente los datos del formulario mientras el usuario completa el proceso de autenticación con Google para evitar que tenga que volver a rellenarlos.',
        duracion: 'Sesión (sessionStorage — eliminada al cerrar la pestaña)',
        tipo: 'sessionStorage',
      },
    ],
  },
  {
    categoria: 'De análisis y rendimiento',
    descripcion:
      'Nos permiten conocer cómo los usuarios interactúan con el Portal para mejorar su funcionamiento. Los datos son agregados y anónimos.',
    cookies: [
      {
        nombre: 'No aplicable',
        proveedor: '—',
        finalidad: 'Actualmente no utilizamos herramientas de análisis de terceros (Google Analytics, Mixpanel, etc.). Los únicos datos de rendimiento que se recopilan son los logs del servidor de Vercel, que son agregados y no permiten identificar usuarios individuales.',
        duracion: '—',
        tipo: '—',
      },
    ],
  },
  {
    categoria: 'De terceros (OAuth)',
    descripcion:
      'Utilizadas por Google durante el proceso de autenticación con Google OAuth. Estas cookies son establecidas por Google y están sujetas a su propia política de privacidad.',
    cookies: [
      {
        nombre: 'Cookies de Google',
        proveedor: 'Google LLC',
        finalidad: 'Durante el proceso de login con Google OAuth, Google puede establecer sus propias cookies para gestionar la sesión de autenticación y proteger contra accesos no autorizados.',
        duracion: 'Variable (según política de Google)',
        tipo: 'HTTP Cookie / localStorage',
      },
    ],
  },
]

export default function CookiesPage() {
  return (
    <main>
      {/* Hero */}
      <section className="premium-surface px-4 pb-16 pt-36 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-4xl">
          <p className="font-cinzel text-xs font-semibold uppercase tracking-[0.35em] text-gold-light">
            Legal
          </p>
          <h1 className="mt-4 font-trajan text-4xl font-bold uppercase tracking-[0.08em] text-white md:text-5xl">
            Política de Cookies
          </h1>
          <p className="mt-5 text-sm font-light text-text-muted">
            Última actualización: {LAST_UPDATED}
          </p>
          <p className="mt-4 max-w-2xl text-base font-light leading-8 text-text-light">
            Esta política explica qué son las cookies, cuáles utilizamos en el Portal de IMPERIUM IURIS y cómo puede gestionarlas.
          </p>
        </div>
      </section>

      {/* Contenido */}
      <section className="bg-primary px-4 py-16 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-4xl space-y-14">

          {/* Qué son las cookies */}
          <article id="que-son" className="scroll-mt-24">
            <h2 className="mb-5 font-cinzel text-base font-semibold uppercase tracking-widest text-gold">
              I. ¿Qué son las cookies?
            </h2>
            <div className="space-y-4 border-l border-gold/20 pl-6">
              <p className="text-sm font-light leading-8 text-text-muted">
                Las cookies son pequeños archivos de texto que los sitios web almacenan en el dispositivo del usuario (ordenador, tablet, smartphone) cuando este los visita. Permiten que el sitio recuerde información sobre la visita, como el idioma preferido o el estado de sesión, lo que facilita la navegación y hace que el sitio sea más útil.
              </p>
              <p className="text-sm font-light leading-8 text-text-muted">
                Además de cookies HTTP (almacenadas en el navegador), este Portal puede utilizar mecanismos de almacenamiento web similares, como <code className="rounded bg-secondary px-1.5 py-0.5 font-mono text-xs text-gold-light">localStorage</code> y <code className="rounded bg-secondary px-1.5 py-0.5 font-mono text-xs text-gold-light">sessionStorage</code>, que cumplen funciones equivalentes.
              </p>
              <p className="text-sm font-light leading-8 text-text-muted">
                En virtud de la Ley Orgánica de Protección de Datos Personales del Ecuador (LOPDP) y los principios de transparencia e información, le informamos con detalle sobre el uso de estos mecanismos en nuestro Portal.
              </p>
            </div>
          </article>

          {/* Tabla de cookies */}
          <article id="cookies-que-usamos" className="scroll-mt-24">
            <h2 className="mb-5 font-cinzel text-base font-semibold uppercase tracking-widest text-gold">
              II. Cookies que Utilizamos
            </h2>
            <div className="space-y-10 border-l border-gold/20 pl-6">
              {cookieTable.map((categoria) => (
                <div key={categoria.categoria}>
                  <div className="mb-4">
                    <p className="font-cinzel text-sm font-semibold text-gold-light">
                      {categoria.categoria}
                    </p>
                    <p className="mt-1 text-sm font-light leading-7 text-text-muted">
                      {categoria.descripcion}
                    </p>
                  </div>
                  <div className="space-y-3">
                    {categoria.cookies.map((cookie) => (
                      <div
                        key={cookie.nombre}
                        className="rounded-sm border border-gold/15 bg-secondary/40 p-5"
                      >
                        <div className="mb-3 flex flex-wrap items-start justify-between gap-3">
                          <div>
                            <code className="font-mono text-sm font-semibold text-text-light">
                              {cookie.nombre}
                            </code>
                            <span className="ml-3 text-xs font-light text-text-muted">
                              Proveedor: {cookie.proveedor}
                            </span>
                          </div>
                          <span className="shrink-0 rounded-sm bg-gold/10 px-2 py-1 font-cinzel text-xs text-gold">
                            {cookie.tipo}
                          </span>
                        </div>
                        <p className="mb-2 text-sm font-light leading-7 text-text-muted">
                          {cookie.finalidad}
                        </p>
                        <p className="text-xs font-light text-text-muted">
                          <span className="text-text-light">Duración:</span> {cookie.duracion}
                        </p>
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </article>

          {/* Cookies de terceros */}
          <article id="terceros" className="scroll-mt-24">
            <h2 className="mb-5 font-cinzel text-base font-semibold uppercase tracking-widest text-gold">
              III. Cookies de Terceros
            </h2>
            <div className="space-y-4 border-l border-gold/20 pl-6">
              <p className="text-sm font-light leading-8 text-text-muted">
                El único tercero que puede establecer cookies en su dispositivo desde el Portal de IMPERIUM IURIS es <strong className="font-medium text-text-light">Google LLC</strong>, durante el proceso de autenticación con Google OAuth. IMPERIUM IURIS no tiene control sobre las cookies que Google establece; su uso está sujeto a la{' '}
                <a
                  href="https://policies.google.com/privacy"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-gold underline-offset-4 hover:underline focus-gold"
                >
                  Política de Privacidad de Google
                </a>
                .
              </p>
              <p className="text-sm font-light leading-8 text-text-muted">
                IMPERIUM IURIS <strong className="font-medium text-text-light">no utiliza</strong> cookies de publicidad comportamental, redes de retargeting, ni comparte datos de navegación con plataformas de anuncios de terceros.
              </p>
            </div>
          </article>

          {/* Cómo gestionar cookies */}
          <article id="gestion" className="scroll-mt-24">
            <h2 className="mb-5 font-cinzel text-base font-semibold uppercase tracking-widest text-gold">
              IV. Cómo Gestionar las Cookies
            </h2>
            <div className="space-y-6 border-l border-gold/20 pl-6">
              <div>
                <p className="mb-3 font-cinzel text-xs font-semibold uppercase tracking-wider text-gold-light">
                  Desde el navegador
                </p>
                <p className="mb-4 text-sm font-light leading-8 text-text-muted">
                  Puede configurar su navegador para aceptar, rechazar o eliminar cookies en cualquier momento. Tenga en cuenta que deshabilitar las cookies estrictamente necesarias puede impedir el funcionamiento correcto del portal de cliente (inicio de sesión, chat, mis citas).
                </p>
                <div className="space-y-2">
                  {[
                    { nav: 'Google Chrome', url: 'https://support.google.com/chrome/answer/95647' },
                    { nav: 'Mozilla Firefox', url: 'https://support.mozilla.org/es/kb/habilitar-y-deshabilitar-cookies-sitios-web-rastrear-preferencias' },
                    { nav: 'Safari', url: 'https://support.apple.com/es-es/guide/safari/sfri11471/mac' },
                    { nav: 'Microsoft Edge', url: 'https://support.microsoft.com/es-es/microsoft-edge/eliminar-las-cookies-en-microsoft-edge-63947406-40ac-c3b8-57b9-2a946a29ae09' },
                  ].map((b) => (
                    <div key={b.nav} className="flex items-center justify-between rounded-sm border border-gold/10 bg-secondary/30 px-5 py-3">
                      <span className="text-sm font-light text-text-muted">{b.nav}</span>
                      <a
                        href={b.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-sm font-light text-gold underline-offset-4 hover:underline focus-gold"
                      >
                        Ver instrucciones →
                      </a>
                    </div>
                  ))}
                </div>
              </div>

              <div>
                <p className="mb-3 font-cinzel text-xs font-semibold uppercase tracking-wider text-gold-light">
                  Eliminar datos de sessionStorage / localStorage
                </p>
                <p className="text-sm font-light leading-8 text-text-muted">
                  Para eliminar los datos de almacenamiento de sesión almacenados por el Portal (por ejemplo, los datos de formulario guardados temporalmente), puede hacerlo desde las herramientas de desarrollador de su navegador:{' '}
                  <kbd className="rounded bg-secondary px-2 py-0.5 font-mono text-xs text-text-light">F12</kbd>
                  {' → '}
                  <kbd className="rounded bg-secondary px-2 py-0.5 font-mono text-xs text-text-light">Application</kbd>
                  {' → '}
                  <kbd className="rounded bg-secondary px-2 py-0.5 font-mono text-xs text-text-light">Storage</kbd>
                  {' → '}
                  <kbd className="rounded bg-secondary px-2 py-0.5 font-mono text-xs text-text-light">Clear site data</kbd>.
                </p>
              </div>

              <div>
                <p className="mb-3 font-cinzel text-xs font-semibold uppercase tracking-wider text-gold-light">
                  Cerrar sesión
                </p>
                <p className="text-sm font-light leading-8 text-text-muted">
                  Al hacer clic en «Cerrar sesión» en el portal de cliente, las cookies de sesión de Supabase son eliminadas automáticamente de su dispositivo.
                </p>
              </div>
            </div>
          </article>

          {/* Actualizaciones */}
          <article id="actualizaciones" className="scroll-mt-24">
            <h2 className="mb-5 font-cinzel text-base font-semibold uppercase tracking-widest text-gold">
              V. Actualizaciones de esta Política
            </h2>
            <div className="space-y-4 border-l border-gold/20 pl-6">
              <p className="text-sm font-light leading-8 text-text-muted">
                IMPERIUM IURIS puede actualizar esta Política de Cookies para reflejar cambios en las cookies utilizadas, la tecnología empleada o los requisitos legales aplicables. La fecha de última actualización figura siempre al inicio del documento.
              </p>
              <p className="text-sm font-light leading-8 text-text-muted">
                Le recomendamos revisar esta política periódicamente para mantenerse informado sobre cómo utilizamos las cookies.
              </p>
            </div>
          </article>

          {/* Contacto */}
          <article id="contacto-cookies" className="scroll-mt-24">
            <h2 className="mb-5 font-cinzel text-base font-semibold uppercase tracking-widest text-gold">
              VI. Contacto
            </h2>
            <div className="space-y-4 border-l border-gold/20 pl-6">
              <p className="text-sm font-light leading-8 text-text-muted">
                Si tiene preguntas sobre nuestra Política de Cookies, puede contactarnos en:
              </p>
              <p className="text-sm font-light text-text-light">
                Correo electrónico:{' '}
                <a href="mailto:contacto@imperiumiuris.ec" className="text-gold underline-offset-4 hover:underline">
                  contacto@imperiumiuris.ec
                </a>
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
                href="/legal/privacidad"
                className="text-sm font-light text-text-muted transition-colors hover:text-gold focus-gold"
              >
                → Política de Privacidad
              </Link>
            </div>
          </div>
        </div>
      </section>
    </main>
  )
}
