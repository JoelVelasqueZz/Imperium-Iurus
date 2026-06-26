import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Consulta Confidencial',
  description: 'Envíe su consulta jurídica de forma confidencial. Respondemos a la brevedad para evaluar su caso penal, empresarial o de urgencia.',
  alternates: { canonical: 'https://imperiumiuris.ec/contacto' },
  openGraph: {
    title: 'Consulta Confidencial | Imperium Iuris',
    description: 'Contacte a nuestro equipo jurídico. Confidencialidad garantizada.',
    url: 'https://imperiumiuris.ec/contacto',
  },
}

export default function ContactoLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>
}
