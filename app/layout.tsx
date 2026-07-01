import type { Metadata } from 'next'
import localFont from 'next/font/local'
import { Inter, Cormorant_Garamond } from 'next/font/google'
import './globals.css'
import PublicShell from '@/components/layout/PublicShell'
import { ConfigProvider } from '@/components/providers/ConfigProvider'
import { EditModeProvider } from '@/components/providers/EditModeProvider'
import { getSiteConfig } from '@/lib/config'
import { getUser } from '@/lib/supabase-server'
import { isAdminUser } from '@/lib/admin-auth'
import { BRAND } from '@/lib/constants'

const trajanPro = localFont({
  src: [
    { path: '../public/fonts/trajan-pro/TrajanPro-Regular.ttf', weight: '400', style: 'normal' },
    { path: '../public/fonts/trajan-pro/TrajanPro-Bold.otf',    weight: '700', style: 'normal' },
  ],
  variable: '--font-trajan',
  display: 'swap',
  preload: true,
})

const cinzel = localFont({
  src: [
    { path: '../public/fonts/cinzel/Cinzel-Regular.ttf',   weight: '400', style: 'normal' },
    { path: '../public/fonts/cinzel/Cinzel-Medium.ttf',    weight: '500', style: 'normal' },
    { path: '../public/fonts/cinzel/Cinzel-SemiBold.ttf',  weight: '600', style: 'normal' },
    { path: '../public/fonts/cinzel/Cinzel-Bold.ttf',      weight: '700', style: 'normal' },
    { path: '../public/fonts/cinzel/Cinzel-ExtraBold.ttf', weight: '800', style: 'normal' },
    { path: '../public/fonts/cinzel/Cinzel-Black.ttf',     weight: '900', style: 'normal' },
  ],
  variable: '--font-cinzel',
  display: 'swap',
  // Next.js solo preloads el primer archivo del array — Cinzel-Regular
  preload: true,
  adjustFontFallback: false,
})

// Montserrat mantenido como fuente local — disponible vía font-montserrat
const montserrat = localFont({
  src: [
    { path: '../public/fonts/montserrat/Montserrat-Light.ttf',      weight: '300', style: 'normal' },
    { path: '../public/fonts/montserrat/Montserrat-Regular.ttf',    weight: '400', style: 'normal' },
    { path: '../public/fonts/montserrat/Montserrat-Medium.ttf',     weight: '500', style: 'normal' },
    { path: '../public/fonts/montserrat/Montserrat-SemiBold.ttf',   weight: '600', style: 'normal' },
    { path: '../public/fonts/montserrat/Montserrat-Bold.ttf',       weight: '700', style: 'normal' },
    { path: '../public/fonts/montserrat/Montserrat-ExtraBold.ttf',  weight: '800', style: 'normal' },
    { path: '../public/fonts/montserrat/Montserrat-Italic.ttf',     weight: '400', style: 'italic' },
    { path: '../public/fonts/montserrat/Montserrat-BoldItalic.ttf', weight: '700', style: 'italic' },
  ],
  variable: '--font-montserrat',
  display: 'swap',
  preload: false,
})

// Inter — fuente principal de texto del sitio
const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
  display: 'swap',
  preload: true,
})

// Cormorant Garamond — frases institucionales y citas
const cormorantGaramond = Cormorant_Garamond({
  subsets: ['latin'],
  weight: ['300', '400', '500', '600', '700'],
  style: ['normal', 'italic'],
  variable: '--font-cormorant',
  display: 'swap',
  preload: false,
})

export const metadata: Metadata = {
  metadataBase: new URL('https://imperiumiuris.ec'),
  title: {
    default: `${BRAND.name} | ${BRAND.tagline}`,
    template: `%s | ${BRAND.name}`,
  },
  description: 'Firma jurídica de defensa penal estratégica en Guayaquil con cobertura nacional. Protegemos su libertad, patrimonio y reputación.',
  keywords: ['abogado penal Guayaquil', 'defensa penal Ecuador', 'firma jurídica penal', 'abogado penalista', 'Imperium Iuris'],
  authors: [{ name: BRAND.name }],
  creator: BRAND.name,
  robots: { index: true, follow: true },
  openGraph: {
    title: `${BRAND.name} | ${BRAND.tagline}`,
    description: 'Defensa penal estratégica para escenarios complejos. Protegemos su libertad, patrimonio y reputación.',
    url: 'https://imperiumiuris.ec',
    siteName: BRAND.name,
    images: [{ url: '/og-image.jpg', width: 1200, height: 630, alt: `${BRAND.name} — Defensa Penal Estratégica` }],
    locale: 'es_EC',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: `${BRAND.name} | ${BRAND.tagline}`,
    description: 'Defensa penal estratégica en Guayaquil, Ecuador.',
    images: ['/og-image.jpg'],
  },
  alternates: { canonical: 'https://imperiumiuris.ec' },
}

export default async function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  const config = await getSiteConfig()
  const { contacto, horario_atencion } = config

  const user = await getUser()
  const isAdmin = isAdminUser(user)

  const DAYS_EN = ['Sunday','Monday','Tuesday','Wednesday','Thursday','Friday','Saturday']
  const openDays = horario_atencion.dias.map((d: number) => DAYS_EN[d])

  return (
    <html
      lang="es"
      className={`${trajanPro.variable} ${cinzel.variable} ${montserrat.variable} ${inter.variable} ${cormorantGaramond.variable}`}
    >
      <body className="bg-primary font-inter text-text-light antialiased" suppressHydrationWarning>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              '@context': 'https://schema.org',
              '@type': 'LegalService',
              name: 'Imperium Iuris',
              description: 'Firma jurídica de defensa penal estratégica en Guayaquil, Ecuador.',
              url: 'https://imperiumiuris.ec',
              telephone: contacto.whatsapp,
              email: contacto.correo,
              address: {
                '@type': 'PostalAddress',
                addressLocality: 'Guayaquil',
                addressRegion: 'Guayas',
                addressCountry: 'EC',
              },
              geo: { '@type': 'GeoCoordinates', latitude: -2.1894, longitude: -79.8891 },
              openingHoursSpecification: {
                '@type': 'OpeningHoursSpecification',
                dayOfWeek: openDays,
                opens: horario_atencion.hora_inicio,
                closes: horario_atencion.hora_fin,
              },
              priceRange: '$$',
              areaServed: { '@type': 'Country', name: 'Ecuador' },
              hasMap: 'https://maps.google.com/?q=Guayaquil+Ecuador',
            }),
          }}
        />
        <ConfigProvider config={config}>
          <EditModeProvider isAdmin={isAdmin}>
            <PublicShell>{children}</PublicShell>
          </EditModeProvider>
        </ConfigProvider>
      </body>
    </html>
  )
}
