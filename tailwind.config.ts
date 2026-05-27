import type { Config } from 'tailwindcss'

const config: Config = {
  content: ['./app/**/*.{ts,tsx}', './components/**/*.{ts,tsx}', './lib/**/*.{ts,tsx}'],
  theme: {
    extend: {
      colors: {
        // Fondos
        primary:    '#101A2D', // Azul Imperial Profundo
        secondary:  '#0D1624', // variante más oscura para secciones alternas
        'card-bg':  '#0F1115', // Negro Carbón

        // Dorados
        gold:         '#C9A646', // Dorado Cepillado — color principal
        'gold-light': '#C9A646', // alias del principal
        'gold-bright':'#E0C36E', // Dorado Interacción — hover / CTAs

        // Texto
        'text-light': '#F5F3EE', // Marfil
        'text-muted': '#A7AFB7', // Gris Ejecutivo

        // Estructura
        border: '#2B3445', // Líneas divisorias
      },
      fontFamily: {
        trajan:    ['var(--font-trajan)',     'serif'],
        cinzel:    ['var(--font-cinzel)',     'serif'],
        inter:     ['var(--font-inter)',      'sans-serif'],
        cormorant: ['var(--font-cormorant)', 'serif'],
        // mantenido para compatibilidad con clases existentes
        montserrat:['var(--font-montserrat)','sans-serif'],
      },
      animation: {
        'pulse-gold':  'pulseGold 2s cubic-bezier(0.4, 0, 0.6, 1) infinite',
        'fade-in-up':  'fadeInUp 0.6s ease-out forwards',
      },
      keyframes: {
        pulseGold: {
          '0%, 100%': { boxShadow: '0 0 0 0 rgba(201, 166, 70, 0.4)' },
          '70%':      { boxShadow: '0 0 0 10px rgba(201, 166, 70, 0)' },
        },
        fadeInUp: {
          '0%':   { opacity: '0', transform: 'translateY(24px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
      },
    },
  },
  plugins: [],
}

export default config
