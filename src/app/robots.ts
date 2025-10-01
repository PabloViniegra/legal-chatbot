import { MetadataRoute } from 'next'
import { BASE_URL } from '@/lib/seo.config'

/**
 * Dynamic robots.txt generation
 * Next.js 15 App Router - robots.ts
 */
export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: '*',
        allow: [
          '/',
          '/signin',
          '/signup',
        ],
        disallow: [
          '/api/*',
          '/_next/*',
          '/dashboard/*', // Protected routes
        ],
      },
      {
        userAgent: 'GPTBot', // OpenAI crawler
        disallow: '/',
      },
      {
        userAgent: 'ChatGPT-User', // ChatGPT user agent
        disallow: '/',
      },
      {
        userAgent: 'CCBot', // Common Crawl
        disallow: '/',
      },
      {
        userAgent: 'anthropic-ai', // Anthropic crawler
        disallow: '/',
      },
      {
        userAgent: 'Claude-Web', // Claude crawler
        disallow: '/',
      },
    ],
    sitemap: `${BASE_URL}/sitemap.xml`,
  }
}
