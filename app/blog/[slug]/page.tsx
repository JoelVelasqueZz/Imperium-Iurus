// IMPERIUM IURIS — T06 Artículo individual
// Módulo: M1 — Sitio Web Público
// RF: RF-48, RF-49
// Desarrollado: 2026-05-19
import Link from 'next/link'
import { notFound } from 'next/navigation'
import Button from '@/components/ui/Button'
import { blogPosts } from '@/lib/blog-data'

export function generateStaticParams() {
  return blogPosts.map((post) => ({ slug: post.slug }))
}

export default async function BlogPostPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params
  const post = blogPosts.find((item) => item.slug === slug)
  if (!post) notFound()
  const related = blogPosts.filter((item) => item.slug !== post.slug).slice(0, 2)

  return (
    <main className="bg-primary px-4 pb-24 pt-32 sm:px-6 lg:px-8">
      <div className="mx-auto grid max-w-7xl gap-10 lg:grid-cols-[1fr_340px]">
        <article>
          <nav className="mb-8 text-sm text-text-muted">
            <Link href="/blog" className="focus-gold hover:text-gold">Blog</Link>
            <span className="mx-2">/</span>
            <span>{post.category}</span>
          </nav>
          <p className="font-montserrat text-xs font-medium uppercase tracking-[0.25em] text-gold-light">{post.category} · {post.date} · {post.readTime}</p>
          <h1 className="mt-5 font-cinzel text-4xl font-bold tracking-wide text-text-light md:text-5xl">{post.title}</h1>
          <div className="mt-10 max-w-none space-y-6 font-montserrat text-lg font-light leading-9 text-text-muted [&_h2]:font-cinzel [&_h2]:text-2xl [&_h2]:font-semibold [&_h2]:text-gold [&_p]:mb-6" dangerouslySetInnerHTML={{ __html: post.content }} />
          <div className="mt-12 border-t border-border pt-8">
            <h2 className="font-cinzel text-2xl font-semibold text-gold">Articulos relacionados</h2>
            <div className="mt-5 grid gap-4 md:grid-cols-2">
              {related.map((item) => (
                <Link key={item.slug} href={`/blog/${item.slug}`} className="focus-gold border border-border bg-card-bg p-5 hover:border-gold">
                  <span className="text-xs uppercase tracking-widest text-gold-light">{item.category}</span>
                  <span className="mt-2 block font-cinzel text-lg text-text-light">{item.title}</span>
                </Link>
              ))}
            </div>
          </div>
        </article>
        <aside className="h-fit border border-gold/40 bg-card-bg p-7 lg:sticky lg:top-28">
          <h2 className="font-cinzel text-xl font-semibold tracking-wide text-text-light">¿Tiene una situacion similar?</h2>
          <p className="mt-4 text-sm font-light leading-7 text-text-muted">Converse con un abogado y reciba una evaluacion estrategica y confidencial.</p>
          <Button href="/contacto" className="mt-6 w-full px-4">Consulte con nosotros</Button>
        </aside>
      </div>
    </main>
  )
}
