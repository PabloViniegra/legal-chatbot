import { MetadataRoute } from 'next'
import { BASE_URL } from '@/lib/seo.config'

/**
 * Dynamic sitemap.xml generation
 * Next.js 15 App Router - sitemap.ts
 */
export default function sitemap(): MetadataRoute.Sitemap {
  const currentDate = new Date()

  // Static routes that should be indexed
  const routes: MetadataRoute.Sitemap = [
    {
      url: BASE_URL,
      lastModified: currentDate,
      changeFrequency: 'daily',
      priority: 1.0,
    },
    {
      url: `${BASE_URL}/signin`,
      lastModified: currentDate,
      changeFrequency: 'monthly',
      priority: 0.8,
    },
    {
      url: `${BASE_URL}/signup`,
      lastModified: currentDate,
      changeFrequency: 'monthly',
      priority: 0.8,
    },
  ]

  // Note: Protected routes (/dashboard, etc.) are intentionally excluded
  // as they require authentication and should not be indexed

  return routes
}
