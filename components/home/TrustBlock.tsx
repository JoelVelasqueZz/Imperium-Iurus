'use client'

import { motion } from 'framer-motion'
import SectionHeader from '@/components/ui/SectionHeader'
import { HOME, trustCards } from '@/lib/constants'

export default function TrustBlock() {
  return (
    <section className="bg-primary px-4 py-24 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-7xl">
        <SectionHeader
          eyebrow={HOME.trust.eyebrow}
          title={HOME.trust.title}
          subtitle={HOME.trust.subtitle}
        />
        <motion.div
          className="grid gap-5 md:grid-cols-2 lg:grid-cols-3"
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: '-100px' }}
          variants={{ show: { transition: { staggerChildren: 0.1 } }, hidden: {} }}
        >
          {trustCards.map(({ icon: Icon, title, body, sub }) => (
            <motion.article
              key={title}
              variants={{ hidden: { opacity: 0, y: 24 }, show: { opacity: 1, y: 0 } }}
              className="group border border-border bg-card-bg p-8 shadow-lg shadow-black/40 transition-all duration-300 hover:border-gold"
            >
              <Icon className="mb-5 text-gold" size={32} aria-hidden="true" />
              <h3 className="font-cinzel text-lg font-semibold tracking-wide text-text-light">{title}</h3>
              <p className="mt-4 font-inter text-sm font-light leading-7 text-text-muted">{body}</p>
              <p className="mt-5 border-t border-border pt-4 font-inter text-xs font-medium uppercase tracking-widest text-gold">{sub}</p>
            </motion.article>
          ))}
        </motion.div>
      </div>
    </section>
  )
}
