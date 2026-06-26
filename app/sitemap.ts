import { MetadataRoute } from 'next'
import { supabase } from '@/lib/supabase'

const BASE = 'https://imperiumiuris.ec'

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  // Artículos publicados del blog
  const { data: articulos } = await supabase
    .from('articulos')
    .select('slug, updated_at')
    .eq('publicado', true)
    .order('updated_at', { ascending: false })

  const blogUrls: MetadataRoute.Sitemap = (articulos ?? []).map((art) => ({
    url:          `${BASE}/blog/${art.slug}`,
    lastModified: new Date(art.updated_at),
    changeFrequency: 'weekly',
    priority: 0.7,
  }))

  return [
    { url: BASE,                    lastModified: new Date(), changeFrequency: 'weekly',  priority: 1.0 },
    { url: `${BASE}/nosotros`,      lastModified: new Date(), changeFrequency: 'monthly', priority: 0.8 },
    { url: `${BASE}/servicios`,     lastModified: new Date(), changeFrequency: 'monthly', priority: 0.9 },
    { url: `${BASE}/agenda`,        lastModified: new Date(), changeFrequency: 'weekly',  priority: 0.9 },
    { url: `${BASE}/contacto`,      lastModified: new Date(), changeFrequency: 'monthly', priority: 0.8 },
    { url: `${BASE}/blog`,          lastModified: new Date(), changeFrequency: 'weekly',  priority: 0.8 },
    ...blogUrls,
  ]
}
