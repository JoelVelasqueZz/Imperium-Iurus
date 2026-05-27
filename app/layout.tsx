import type { Metadata } from 'next'
import localFont from 'next/font/local'
import { Inter, Cormorant_Garamond } from 'next/font/google'
import './globals.css'
import Navbar from '@/components/layout/Navbar'
import Footer from '@/components/layout/Footer'
import WhatsAppButton from '@/components/shared/WhatsAppButton'
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
  preload: true,
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
  title: `${BRAND.name} | ${BRAND.tagline}`,
  description: 'Firma juridica penal estrategica en Guayaquil con cobertura nacional.',
  openGraph: {
    title: `${BRAND.name} | ${BRAND.tagline}`,
    description: 'Defensa penal estrategica para escenarios complejos.',
    images: ['/og-image.jpg'],
    locale: 'es_EC',
    type: 'website',
  },
}

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html
      lang="es"
      className={`${trajanPro.variable} ${cinzel.variable} ${montserrat.variable} ${inter.variable} ${cormorantGaramond.variable}`}
    >
      <body className="bg-primary font-inter text-text-light antialiased" suppressHydrationWarning>
        <Navbar />
        {children}
        <Footer />
        <WhatsAppButton />
      </body>
    </html>
  )
}
