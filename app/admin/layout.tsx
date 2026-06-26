'use client'

import { usePathname } from 'next/navigation'
import AdminNav from '@/components/admin/AdminNav'

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname()

  if (pathname === '/admin/login') {
    return <div className="min-h-screen bg-primary">{children}</div>
  }

  return (
    <div className="flex min-h-screen bg-primary">
      <AdminNav />
      <div className="ml-56 flex-1 overflow-auto">{children}</div>
    </div>
  )
}
