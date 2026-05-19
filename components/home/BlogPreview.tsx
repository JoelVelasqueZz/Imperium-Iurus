// IMPERIUM IURIS — T06 Últimas entradas blog
// Módulo: M1 — Sitio Web Público
// RF: RF-48, RF-49
// Desarrollado: 2026-05-19
import Link from 'next/link'
import { ArrowRight } from 'lucide-react'
import SectionHeader from '@/components/ui/SectionHeader'
import Reveal from '@/components/ui/Reveal'
import { blogPosts } from '@/lib/blog-data'

export default function BlogPreview() {
  return (
    <section className="bg-primary px-4 py-24 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-7xl">
        <SectionHeader eyebrow="Contenido de autoridad" title="Blog juridico premium" subtitle="Criterios practicos para actuar a tiempo frente a riesgos penales." />
        <div className="grid gap-6 md:grid-cols-3">
          {blogPosts.slice(0, 3).map((post, index) => (
            <Reveal key={post.slug} delay={index * 0.08}>
              <article className="h-full border border-border bg-card-bg p-7 transition-colors hover:border-gold">
                <p className="font-montserrat text-xs font-medium uppercase tracking-[0.25em] text-gold-light">{post.category} · {post.readTime}</p>
                <h3 className="mt-5 font-cinzel text-xl font-semibold tracking-wide text-text-light">{post.title}</h3>
                <p className="mt-4 text-sm font-light leading-7 text-text-muted">{post.excerpt}</p>
                <Link href={`/blog/${post.slug}`} className="focus-gold mt-6 inline-flex items-center gap-2 font-montserrat text-xs font-bold uppercase tracking-widest text-gold hover:text-gold-light">
                  Leer articulo <ArrowRight size={16} />
                </Link>
              </article>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  )
}
