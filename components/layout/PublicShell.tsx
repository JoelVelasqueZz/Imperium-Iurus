'use client'

import { usePathname } from 'next/navigation'
import Navbar from './Navbar'
import Footer from './Footer'
import UrgencyFloatingButton from '@/components/shared/UrgencyFloatingButton'

export default function PublicShell({ children }: { children: React.ReactNode }) {
  const pathname = usePathname()
  const isAdmin  = pathname.startsWith('/admin')

  if (isAdmin) return <>{children}</>

  return (
    <>
      <Navbar />
      {children}
      <Footer />
      <UrgencyFloatingButton />
    </>
  )
}
