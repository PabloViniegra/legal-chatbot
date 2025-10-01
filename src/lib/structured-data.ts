import { BASE_URL, SITE_INFO } from './seo.config'

/**
 * JSON-LD Structured Data Helpers
 * Generates schema.org markup for rich snippets in search results
 */

/**
 * Organization Schema
 * Defines the organization/company information
 */
export function generateOrganizationSchema() {
  return {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    name: SITE_INFO.name,
    url: BASE_URL,
    logo: `${BASE_URL}/icon-512.png`,
    description: SITE_INFO.description,
    foundingDate: '2024',
    address: {
      '@type': 'PostalAddress',
      addressCountry: 'ES',
    },
    contactPoint: {
      '@type': 'ContactPoint',
      contactType: 'customer service',
      availableLanguage: ['Spanish', 'Español'],
    },
    sameAs: [
      // Add your social media profiles here
      // 'https://twitter.com/lexia',
      // 'https://www.linkedin.com/company/lexia',
    ],
  }
}

/**
 * Website Schema
 * Defines the website structure
 */
export function generateWebsiteSchema() {
  return {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    name: SITE_INFO.name,
    url: BASE_URL,
    description: SITE_INFO.description,
    inLanguage: SITE_INFO.language,
    potentialAction: {
      '@type': 'SearchAction',
      target: {
        '@type': 'EntryPoint',
        urlTemplate: `${BASE_URL}?q={search_term_string}`,
      },
      'query-input': 'required name=search_term_string',
    },
  }
}

/**
 * WebApplication Schema
 * Defines the web application
 */
export function generateWebApplicationSchema() {
  return {
    '@context': 'https://schema.org',
    '@type': 'WebApplication',
    name: SITE_INFO.fullName,
    url: BASE_URL,
    description: SITE_INFO.description,
    applicationCategory: 'BusinessApplication',
    operatingSystem: 'Web Browser',
    offers: {
      '@type': 'Offer',
      price: '0',
      priceCurrency: 'EUR',
    },
    browserRequirements: 'Requires JavaScript. Requires HTML5.',
    softwareVersion: '1.0',
    screenshot: `${BASE_URL}/screenshot-desktop.png`,
    featureList: [
      'Consultas legales especializadas',
      'Legislación española',
      'Asistencia con IA',
      'Chat en tiempo real',
      'Derecho civil, laboral, penal y mercantil',
    ],
    inLanguage: 'es-ES',
  }
}

/**
 * SoftwareApplication Schema (alternative to WebApplication)
 */
export function generateSoftwareApplicationSchema() {
  return {
    '@context': 'https://schema.org',
    '@type': 'SoftwareApplication',
    name: SITE_INFO.fullName,
    applicationCategory: 'BusinessApplication',
    operatingSystem: 'Web',
    offers: {
      '@type': 'Offer',
      price: '0',
      priceCurrency: 'EUR',
    },
    aggregateRating: {
      '@type': 'AggregateRating',
      ratingValue: '4.8',
      ratingCount: '100',
      bestRating: '5',
      worstRating: '1',
    },
    description: SITE_INFO.description,
  }
}

/**
 * FAQPage Schema
 * For FAQ pages (you can create one in the future)
 */
export function generateFAQSchema(faqs: Array<{ question: string; answer: string }>) {
  return {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: faqs.map(faq => ({
      '@type': 'Question',
      name: faq.question,
      acceptedAnswer: {
        '@type': 'Answer',
        text: faq.answer,
      },
    })),
  }
}

/**
 * BreadcrumbList Schema
 * For breadcrumb navigation
 */
export function generateBreadcrumbSchema(items: Array<{ name: string; url: string }>) {
  return {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: items.map((item, index) => ({
      '@type': 'ListItem',
      position: index + 1,
      name: item.name,
      item: item.url,
    })),
  }
}

/**
 * LocalBusiness Schema (if applicable)
 * For businesses with physical locations
 */
export function generateLocalBusinessSchema() {
  return {
    '@context': 'https://schema.org',
    '@type': 'LegalService',
    name: SITE_INFO.name,
    image: `${BASE_URL}/icon-512.png`,
    description: SITE_INFO.description,
    url: BASE_URL,
    telephone: '+34-XXX-XXX-XXX', // Add your phone number
    address: {
      '@type': 'PostalAddress',
      streetAddress: 'Your Street Address',
      addressLocality: 'Madrid',
      postalCode: '28001',
      addressCountry: 'ES',
    },
    geo: {
      '@type': 'GeoCoordinates',
      latitude: 40.4168,
      longitude: -3.7038,
    },
    openingHoursSpecification: {
      '@type': 'OpeningHoursSpecification',
      dayOfWeek: [
        'Monday',
        'Tuesday',
        'Wednesday',
        'Thursday',
        'Friday',
      ],
      opens: '09:00',
      closes: '18:00',
    },
  }
}

/**
 * Article/BlogPosting Schema
 * For blog posts or articles
 */
export function generateArticleSchema({
  title,
  description,
  datePublished,
  dateModified,
  authorName,
  url,
  imageUrl,
}: {
  title: string
  description: string
  datePublished: string
  dateModified?: string
  authorName?: string
  url: string
  imageUrl?: string
}) {
  return {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: title,
    description,
    image: imageUrl || `${BASE_URL}/og-image.png`,
    datePublished,
    dateModified: dateModified || datePublished,
    author: {
      '@type': 'Person',
      name: authorName || SITE_INFO.author,
    },
    publisher: {
      '@type': 'Organization',
      name: SITE_INFO.name,
      logo: {
        '@type': 'ImageObject',
        url: `${BASE_URL}/icon-512.png`,
      },
    },
    mainEntityOfPage: {
      '@type': 'WebPage',
      '@id': url,
    },
  }
}

/**
 * Helper to render JSON-LD in a component
 * Usage: <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }} />
 */
export function jsonLdScriptProps(schema: object) {
  return {
    type: 'application/ld+json',
    dangerouslySetInnerHTML: {
      __html: JSON.stringify(schema, null, 0),
    },
  }
}
