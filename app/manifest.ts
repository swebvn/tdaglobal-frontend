import { MetadataRoute } from 'next'

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: 'TDA Global - Connect Vietnamese Products with Global Markets',
    short_name: 'TDA Global',
    description: 'TDA Global brings precision, creativity, and clarity to global eCommerce.',
    start_url: '/',
    display: 'standalone',
    background_color: '#ffffff',
    theme_color: '#2563eb',
    icons: [
      {
        src: '/favicon.ico',
        sizes: 'any',
        type: 'image/x-icon',
      },
      {
        src: '/images/tda-global-logo.png',
        sizes: '192x192',
        type: 'image/png',
      },
      {
        src: '/images/tda-global-logo.png',
        sizes: '512x512',
        type: 'image/png',
      },
    ],
  }
}
