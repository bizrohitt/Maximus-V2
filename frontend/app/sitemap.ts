import type { MetadataRoute } from 'next'
import { tools } from '@/lib/tools-data'

const BASE_URL = 'https://maximus.io'

const marketingPages = [
  { path: '', priority: 1.0, changeFrequency: 'weekly' as const },
  { path: '/ai-tools', priority: 0.9, changeFrequency: 'weekly' as const },
  { path: '/blog', priority: 0.8, changeFrequency: 'daily' as const },
  { path: '/directories', priority: 0.7, changeFrequency: 'monthly' as const },
  { path: '/resources', priority: 0.7, changeFrequency: 'monthly' as const },
  { path: '/mini-courses', priority: 0.7, changeFrequency: 'monthly' as const },
  { path: '/newsletter', priority: 0.6, changeFrequency: 'monthly' as const },
  { path: '/about', priority: 0.5, changeFrequency: 'monthly' as const },
  { path: '/contact', priority: 0.5, changeFrequency: 'monthly' as const },
  { path: '/contact-business', priority: 0.4, changeFrequency: 'monthly' as const },
  { path: '/affiliate', priority: 0.5, changeFrequency: 'monthly' as const },
  { path: '/affiliate-disclosure', priority: 0.2, changeFrequency: 'yearly' as const },
  { path: '/terms', priority: 0.2, changeFrequency: 'yearly' as const },
  { path: '/privacy', priority: 0.2, changeFrequency: 'yearly' as const },
]

export default function sitemap(): MetadataRoute.Sitemap {
  const staticPages = marketingPages.map((page) => ({
    url: `${BASE_URL}${page.path}`,
    lastModified: new Date(),
    changeFrequency: page.changeFrequency,
    priority: page.priority,
  }))

  const toolPages = tools.map((tool) => ({
    url: `${BASE_URL}/ai-tools/${tool.slug}`,
    lastModified: new Date(),
    changeFrequency: 'weekly' as const,
    priority: 0.8,
  }))

  return [...staticPages, ...toolPages]
}
