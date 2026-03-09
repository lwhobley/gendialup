'use client'

import Link from 'next/link'

export default function Home() {
  return (
    <main className="min-h-screen bg-gradient-to-br from-cream to-warm-gray/15 flex flex-col justify-between px-5 py-12">
      <div className="flex-1 flex flex-col justify-center items-center text-center">
        <h1 className="text-5xl md:text-6xl font-bold mb-4 text-dark-text">
          Gen Dial Up
        </h1>
        <p className="text-xl text-light-text mb-12 max-w-md">
          Find your people. Locally.
        </p>
        
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-16 max-w-2xl w-full">
          {[
            { icon: '✓', label: 'Quality Matches' },
            { icon: '🔒', label: 'Verified Users' },
            { icon: '📍', label: 'Local Focus' },
            { icon: '💬', label: 'Safe Chat' }
          ].map((feature, i) => (
            <div key={i} className="bg-white p-4 rounded-xl shadow-sm hover:shadow-md transition">
              <div className="text-2xl mb-2">{feature.icon}</div>
              <p className="text-sm font-medium text-light-text">{feature.label}</p>
            </div>
          ))}
        </div>

        <div className="flex flex-col sm:flex-row gap-4 mb-8">
          <Link
            href="/login"
            className="bg-sage hover:bg-sage/90 text-white font-semibold py-3 px-8 rounded-lg transition shadow-md hover:shadow-lg"
          >
            Login
          </Link>
          <Link
            href="/signup"
            className="bg-white hover:bg-cream border-2 border-sage text-sage font-semibold py-3 px-8 rounded-lg transition shadow-md hover:shadow-lg"
          >
            Sign Up
          </Link>
        </div>
      </div>

      <footer className="text-center text-light-text text-sm">
        <p>Find meaningful friendships for adults 28-43</p>
      </footer>
    </main>
  )
}
