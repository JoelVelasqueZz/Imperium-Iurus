// IMPERIUM IURIS — T06 Blog básico listado
// Módulo: M1 — Sitio Web Público
// RF: RF-48, RF-49
// Desarrollado: 2026-05-19
import Link from 'next/link'
import { ArrowRight } from 'lucide-react'
import SectionHeader from '@/components/ui/SectionHeader'
import { blogCategories, blogPosts } from '@/lib/blog-data'

export default async function BlogPage({ searchParams }: { searchParams: Promise<{ categoria?: string }> }) {
  const query = await searchParams
  const selected = query.categoria ?? 'Todos'
  const posts = selected === 'Todos' ? blogPosts : blogPosts.filter((post) => post.category === selected)

  return (
    <main className="bg-primary px-4 pb-24 pt-32 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-7xl">
        <SectionHeader eyebrow="Blog" title="Contenido juridico de autoridad" subtitle="Guias practicas para decisiones urgentes, empresariales y reputacionales." />
        <div className="mb-10 flex flex-wrap justify-center gap-3">
          {blogCategories.map((category) => (
            <Link key={category} href={category === 'Todos' ? '/blog' : `/blog?categoria=${encodeURIComponent(category)}`} className={`focus-gold border px-4 py-2 font-cinzel text-xs uppercase tracking-widest ${selected === category ? 'border-gold bg-gold text-primary' : 'border-border text-text-muted hover:border-gold hover:text-gold'}`}>
              {category}
            </Link>
          ))}
        </div>
        <div className="grid gap-6 md:grid-cols-3">
          {posts.map((post) => (
            <article key={post.slug} className="border border-border bg-card-bg p-7 transition-colors hover:border-gold">
              <p className="text-xs font-medium uppercase tracking-[0.25em] text-gold-light">{post.category} · {post.date} · {post.readTime}</p>
              <h2 className="mt-5 font-cinzel text-xl font-semibold tracking-wide text-text-light">{post.title}</h2>
              <p className="mt-4 text-sm font-light leading-7 text-text-muted">{post.excerpt}</p>
              <Link href={`/blog/${post.slug}`} className="focus-gold mt-6 inline-flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-gold">
                Leer articulo <ArrowRight size={16} />
              </Link>
            </article>
          ))}
        </div>
      </div>
    </main>
  )
}
