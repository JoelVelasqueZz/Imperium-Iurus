'use client'

// IMPERIUM IURIS — T03 Contador animado
// Módulo: M1 — Sitio Web Público
// RF: RF-03
// Desarrollado: 2026-05-19
import { animate, useInView, useMotionValue, useTransform, m } from 'framer-motion'
import { useEffect, useRef } from 'react'

export default function AnimatedCounter({ value, suffix = '' }: { value: number; suffix?: string }) {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true })
  const count = useMotionValue(0)
  const rounded = useTransform(count, (latest) => `${Math.round(latest)}${suffix}`)

  useEffect(() => {
    if (inView) {
      return animate(count, value, { duration: 1.8, ease: 'easeOut' }).stop
    }
  }, [count, inView, value])

  return <m.span ref={ref}>{rounded}</m.span>
}
