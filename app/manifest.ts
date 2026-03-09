import type { MetadataRoute } from 'next'

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: 'Gen Dial Up - Find Your People Locally',
    short_name: 'Gen Dial Up',
    description: 'Meaningful platonic friendships for adults aged 28-43',
    start_url: '/',
    scope: '/',
    display: 'standalone',
    orientation: 'portrait-primary',
    background_color: '#FAF8F3',
    theme_color: '#9CAF88',
    icons: [
      {
        src: '/icon-192.png',
        sizes: '192x192',
        type: 'image/png',
        purpose: 'any',
      },
      {
        src: '/icon-512.png',
        sizes: '512x512',
        type: 'image/png',
        purpose: 'any',
      },
      {
        src: '/icon-maskable-192.png',
        sizes: '192x192',
        type: 'image/png',
        purpose: 'maskable',
      },
      {
        src: '/icon-maskable-512.png',
        sizes: '512x512',
        type: 'image/png',
        purpose: 'maskable',
      },
    ],
    screenshots: [
      {
        src: '/screenshot-1.png',
        sizes: '540x720',
        type: 'image/png',
        form_factor: 'narrow',
      },
      {
        src: '/screenshot-2.png',
        sizes: '1280x720',
        type: 'image/png',
        form_factor: 'wide',
      },
    ],
    shortcuts: [
      {
        name: 'View Matches',
        short_name: 'Matches',
        description: 'See your potential matches',
        url: '/matches?mode=standalone',
        icons: [
          {
            src: '/icon-shortcut-matches.png',
            sizes: '96x96',
            type: 'image/png',
          },
        ],
      },
      {
        name: 'Messages',
        short_name: 'Chat',
        description: 'View your messages',
        url: '/chat?mode=standalone',
        icons: [
          {
            src: '/icon-shortcut-chat.png',
            sizes: '96x96',
            type: 'image/png',
          },
        ],
      },
    ],
    categories: ['social', 'lifestyle'],
    prefer_related_applications: false,
  }
}
