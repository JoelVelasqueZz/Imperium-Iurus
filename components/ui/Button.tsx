// IMPERIUM IURIS — T02 Botón reutilizable
// Módulo: M1 — Sitio Web Público
// RF: RF-01, RF-05
// Desarrollado: 2026-05-19
import Link from 'next/link'
import type { ComponentPropsWithoutRef, ReactNode } from 'react'

type ButtonProps = {
  href?: string
  variant?: 'primary' | 'secondary' | 'tertiary' | 'danger'
  children: ReactNode
  className?: string
} & ComponentPropsWithoutRef<'button'>

const variants = {
  primary: 'border-gold bg-gold text-primary hover:bg-gold-light',
  secondary: 'border-gold bg-transparent text-gold hover:bg-gold hover:text-primary',
  tertiary: 'border-transparent bg-transparent text-gold hover:text-gold-light',
  danger: 'border-gold-bright bg-red-950/80 text-gold-bright hover:bg-gold-bright hover:text-primary',
}

export default function Button({ href, variant = 'primary', children, className = '', ...props }: ButtonProps) {
  const classes = `focus-gold inline-flex items-center justify-center gap-2 border px-7 py-4 text-center font-montserrat text-xs font-bold uppercase tracking-widest transition-all duration-300 ${variants[variant]} ${className}`

  if (href) {
    return (
      <Link href={href} className={classes}>
        {children}
      </Link>
    )
  }

  return (
    <button className={classes} {...props}>
      {children}
    </button>
  )
}
