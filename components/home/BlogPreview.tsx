'use client'

import Link from 'next/link'
import { ArrowRight } from 'lucide-react'
import SectionHeader from '@/components/ui/SectionHeader'
import Reveal from '@/components/ui/Reveal'
import { blogPosts } from '@/lib/blog-data'

export default function BlogPreview() {
  return (
    <section className="bg-text-light px-4 py-24 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-7xl">
        <SectionHeader
          eyebrow="Contenido de autoridad"
          title="Blog jurídico premium"
          subtitle="Criterios prácticos para actuar a tiempo frente a riesgos penales."
          invert
        />
        <div className="grid gap-6 md:grid-cols-3">
          {blogPosts.slice(0, 3).map((post, index) => (
            <Reveal key={post.slug} delay={index * 0.08}>
              <article className="h-full border border-primary/15 bg-white p-7 transition-colors hover:border-gold">
                <p className="font-inter text-xs font-medium uppercase tracking-[0.25em] text-gold">
                  {post.category} · {post.readTime}
                </p>
                <h3 className="mt-5 font-cinzel text-xl font-semibold tracking-wide text-primary">{post.title}</h3>
                <p className="mt-4 font-inter text-sm font-light leading-7 text-primary/65">{post.excerpt}</p>
                <Link
                  href={`/blog/${post.slug}`}
                  className="focus-gold mt-6 inline-flex items-center gap-2 font-inter text-xs font-bold uppercase tracking-widest text-gold hover:text-gold-bright"
                >
                  Leer artículo <ArrowRight size={16} />
                </Link>
              </article>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  )
}
