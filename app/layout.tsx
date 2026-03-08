import type { Metadata } from 'next'
import './styles/globals.css'

export const metadata: Metadata = {
  title: 'Gen Dial Up - Find Your People Locally',
  description: 'Meaningful platonic friendships for adults aged 28-43',
  viewport: { width: 'device-width', initialScale: 1, maximumScale: 5 },
  manifest: '/manifest.json',
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <head>
        <link rel="icon" href="/favicon.ico" />
      </head>
      <body className="bg-cream text-dark-text">
        <div className="min-h-screen">{children}</div>
      </body>
    </html>
  )
}
