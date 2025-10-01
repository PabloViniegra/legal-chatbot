import { ImageResponse } from 'next/og'

/**
 * Dynamic Open Graph image generation (og-image.png)
 * Used for social media sharing (Twitter, Facebook, LinkedIn, etc.)
 * Size: 1200x630 (recommended by Open Graph protocol)
 */

export const runtime = 'edge'
export const alt = 'LexIA - Asistente Legal con IA'
export const size = {
  width: 1200,
  height: 630,
}
export const contentType = 'image/png'

export default async function OGImage() {
  return new ImageResponse(
    (
      <div
        style={{
          height: '100%',
          width: '100%',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          background: 'linear-gradient(135deg, #1e3a8a 0%, #2563eb 50%, #3b82f6 100%)',
          fontFamily: 'system-ui, sans-serif',
        }}
      >
        {/* Logo/Icon */}
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            marginBottom: 40,
          }}
        >
          <div
            style={{
              background: 'white',
              borderRadius: 30,
              padding: 30,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
            }}
          >
            <svg
              width="120"
              height="120"
              viewBox="0 0 24 24"
              fill="none"
              stroke="#2563eb"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="m16 16 3-8 3 8c-.87.65-1.92 1-3 1s-2.13-.35-3-1Z" />
              <path d="m2 16 3-8 3 8c-.87.65-1.92 1-3 1s-2.13-.35-3-1Z" />
              <path d="M7 21h10" />
              <path d="M12 3v18" />
              <path d="M3 7h2c2 0 5-1 7-2 2 1 5 2 7 2h2" />
            </svg>
          </div>
        </div>

        {/* Title */}
        <div
          style={{
            display: 'flex',
            fontSize: 72,
            fontWeight: 'bold',
            color: 'white',
            marginBottom: 20,
            textAlign: 'center',
          }}
        >
          LexIA
        </div>

        {/* Subtitle */}
        <div
          style={{
            display: 'flex',
            fontSize: 36,
            color: 'rgba(255, 255, 255, 0.9)',
            marginBottom: 15,
            textAlign: 'center',
          }}
        >
          Asistente Legal con Inteligencia Artificial
        </div>

        {/* Description */}
        <div
          style={{
            display: 'flex',
            fontSize: 28,
            color: 'rgba(255, 255, 255, 0.8)',
            textAlign: 'center',
            maxWidth: 900,
            paddingLeft: 60,
            paddingRight: 60,
          }}
        >
          Consultas especializadas en legislación española
        </div>

        {/* Badge/Tag */}
        <div
          style={{
            display: 'flex',
            marginTop: 40,
            background: 'rgba(255, 255, 255, 0.2)',
            borderRadius: 20,
            padding: '12px 30px',
            fontSize: 24,
            color: 'white',
            fontWeight: 600,
          }}
        >
          🇪🇸 Legislación Española
        </div>
      </div>
    ),
    {
      ...size,
    }
  )
}
