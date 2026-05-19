'use client'

// IMPERIUM IURIS — T03 Animación scroll reusable
// Módulo: M1 — Sitio Web Público
// RF: RF-01, RF-03
// Desarrollado: 2026-05-19
import { motion, useInView, type Variants } from 'framer-motion'
import { useRef, type ReactNode } from 'react'

const variants: Variants = {
  hidden: { opacity: 0, y: 28 },
  show: { opacity: 1, y: 0, transition: { duration: 0.6, ease: 'easeOut' } },
}

export default function Reveal({
  children,
  className,
  delay = 0,
}: {
  children: ReactNode
  className?: string
  delay?: number
}) {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: '-80px' })

  return (
    <motion.div
      ref={ref}
      className={className}
      variants={variants}
      initial="hidden"
      animate={isInView ? 'show' : 'hidden'}
      transition={{ delay }}
    >
      {children}
    </motion.div>
  )
}
