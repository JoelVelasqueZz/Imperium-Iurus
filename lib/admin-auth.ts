// Sin dependencias de Next.js — seguro para usar en middleware (Edge runtime),
// Server Components y Route Handlers por igual.
import type { User } from '@supabase/supabase-js'

export function isAdminUser(user: User | null | undefined): boolean {
  return (
    !!user &&
    (user.app_metadata?.role === 'admin' ||
      (!!process.env.ADMIN_EMAIL && user.email === process.env.ADMIN_EMAIL))
  )
}
