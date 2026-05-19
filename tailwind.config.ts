// IMPERIUM IURIS — T01 Sistema base de diseño
// Módulo: M1 — Sitio Web Público
// RF: RF-01, RF-02
// Desarrollado: 2026-05-19
import type { Config } from 'tailwindcss'

const config: Config = {
  content: ['./app/**/*.{ts,tsx}', './components/**/*.{ts,tsx}', './lib/**/*.{ts,tsx}'],
  theme: {
    extend: {
      colors: {
        primary: '#1A1A2E',
        secondary: '#16213E',
        'card-bg': '#0F0F23',
        gold: '#B8860B',
        'gold-light': '#C9A84C',
        'gold-bright': '#FFD700',
        'text-light': '#F0F0F6',
        'text-muted': '#9CA3AF',
        border: '#2A2A4A',
      },
      fontFamily: {
        trajan: ['var(--font-trajan)', 'serif'],
        cinzel: ['var(--font-cinzel)', 'serif'],
        montserrat: ['var(--font-montserrat)', 'sans-serif'],
      },
      animation: {
        'pulse-gold': 'pulseGold 2s cubic-bezier(0.4, 0, 0.6, 1) infinite',
        'fade-in-up': 'fadeInUp 0.6s ease-out forwards',
      },
      keyframes: {
        pulseGold: {
          '0%, 100%': { boxShadow: '0 0 0 0 rgba(184, 134, 11, 0.4)' },
          '70%': { boxShadow: '0 0 0 10px rgba(184, 134, 11, 0)' },
        },
        fadeInUp: {
          '0%': { opacity: '0', transform: 'translateY(24px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
      },
    },
  },
  plugins: [],
}

export default config
