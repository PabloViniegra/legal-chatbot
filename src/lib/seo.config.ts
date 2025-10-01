import type { Metadata } from 'next'

/**
 * SEO Configuration for LexIA
 * Centralized metadata configuration following Next.js 15 best practices
 */

// Base URL - should be set via environment variable in production
export const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL || 'http://localhost:3000'

// Site Information
export const SITE_INFO = {
  name: 'LexIA',
  fullName: 'LexIA - Asistente Legal con IA',
  description: 'Asistente legal inteligente especializado en legislación española. Obtén respuestas precisas sobre derecho civil, laboral, penal y mercantil con inteligencia artificial.',
  tagline: 'Tu asistente legal inteligente para legislación española',
  keywords: [
    'asistente legal',
    'IA legal',
    'legislación española',
    'derecho español',
    'consulta legal',
    'chatbot legal',
    'inteligencia artificial legal',
    'derecho civil',
    'derecho laboral',
    'derecho penal',
    'derecho mercantil',
    'asesoría legal online',
    'consulta jurídica',
    'leyes españolas',
    'normativa española',
  ],
  author: 'LexIA',
  locale: 'es_ES' as const,
  language: 'es' as const,
}

// Social Media & Open Graph
export const SOCIAL = {
  twitter: {
    handle: '@LexIA',
    site: '@LexIA',
    cardType: 'summary_large_image' as const,
  },
  ogImage: {
    url: '/og-image.png',
    alt: 'LexIA - Asistente Legal con IA',
    width: 1200,
    height: 630,
  },
} as const

// Default Metadata Template
export const DEFAULT_METADATA: Metadata = {
  metadataBase: new URL(BASE_URL),
  title: {
    default: SITE_INFO.fullName,
    template: `%s | ${SITE_INFO.name}`,
  },
  description: SITE_INFO.description,
  keywords: SITE_INFO.keywords,
  authors: [{ name: SITE_INFO.author }],
  creator: SITE_INFO.author,
  publisher: SITE_INFO.author,

  // Open Graph
  openGraph: {
    type: 'website',
    locale: SITE_INFO.locale,
    url: BASE_URL,
    siteName: SITE_INFO.name,
    title: SITE_INFO.fullName,
    description: SITE_INFO.description,
    images: [
      {
        url: SOCIAL.ogImage.url,
        width: SOCIAL.ogImage.width,
        height: SOCIAL.ogImage.height,
        alt: SOCIAL.ogImage.alt,
      },
    ],
  },

  // Twitter Card
  twitter: {
    card: SOCIAL.twitter.cardType,
    title: SITE_INFO.fullName,
    description: SITE_INFO.description,
    creator: SOCIAL.twitter.handle,
    site: SOCIAL.twitter.site,
    images: [SOCIAL.ogImage.url],
  },

  // Robots
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },

  // Icons
  icons: {
    icon: [
      { url: '/favicon.ico', sizes: 'any' },
      { url: '/icon-192.png', type: 'image/png', sizes: '192x192' },
      { url: '/icon-512.png', type: 'image/png', sizes: '512x512' },
    ],
    apple: [
      { url: '/apple-icon.png', sizes: '180x180', type: 'image/png' },
    ],
  },

  // Web App Manifest
  manifest: '/manifest.json',

  // Verification (add your verification codes when available)
  verification: {
    google: process.env.NEXT_PUBLIC_GOOGLE_VERIFICATION,
    // yandex: 'your-yandex-verification-code',
    // bing: 'your-bing-verification-code',
  },

  // Other
  alternates: {
    canonical: BASE_URL,
    languages: {
      'es-ES': BASE_URL,
    },
  },

  category: 'technology',

  // App Links (for mobile apps if applicable in the future)
  // appLinks: {},
}

/**
 * Generate metadata for specific pages
 */
export function generatePageMetadata({
  title,
  description,
  path = '',
  image,
  noIndex = false,
}: {
  title: string
  description: string
  path?: string
  image?: string
  noIndex?: boolean
}): Metadata {
  const url = `${BASE_URL}${path}`
  const ogImage = image || SOCIAL.ogImage.url

  return {
    title,
    description,
    openGraph: {
      title,
      description,
      url,
      images: [ogImage],
    },
    twitter: {
      title,
      description,
      images: [ogImage],
    },
    alternates: {
      canonical: url,
    },
    robots: noIndex ? {
      index: false,
      follow: false,
    } : undefined,
  }
}
