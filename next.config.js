/** @type {import('next').NextConfig} */
const nextConfig = {
  // Enable PWA support
  headers: async () => {
    return [
      {
        source: '/service-worker.js',
        headers: [
          { key: 'Content-Type', value: 'application/javascript' },
          { key: 'Cache-Control', value: 'public, max-age=0, must-revalidate' },
        ],
      },
    ]
  },

  // Image optimization
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'images.unsplash.com',
      },
      {
        protocol: 'https',
        hostname: 'supabase.co',
      },
    ],
  },

  // React config
  reactStrictMode: true,
  swcMinify: true,
}

module.exports = nextConfig
