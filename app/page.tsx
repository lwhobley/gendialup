'use client'

import Link from 'next/link'

export default function Home() {
  return (
    <main className="min-h-screen bg-gradient-retro relative overflow-hidden">
      {/* Animated background shapes */}
      <div className="absolute top-10 left-10 w-40 h-40 bg-neon-pink opacity-20 shape-blob blur-3xl"></div>
      <div className="absolute bottom-20 right-20 w-60 h-60 bg-neon-cyan opacity-20 shape-blob blur-3xl"></div>
      <div className="absolute top-1/2 left-1/3 w-48 h-48 bg-neon-purple opacity-15 shape-blob blur-3xl"></div>

      {/* Grid overlay */}
      <div className="absolute inset-0 grid-background pointer-events-none"></div>

      {/* Content */}
      <div className="relative z-10 flex flex-col justify-between min-h-screen px-5 py-12">
        <div className="flex-1 flex flex-col justify-center items-center text-center">
          {/* Main title with rainbow gradient */}
          <h1 className="text-6xl md:text-8xl font-black mb-6 rainbow-text animate-float drop-shadow-lg">
            GEN DIAL UP
          </h1>

          {/* Subtitle */}
          <div className="mb-4">
            <p className="text-2xl md:text-3xl text-neon-cyan font-bold drop-shadow-lg">
              Find your people.
            </p>
            <p className="text-xl md:text-2xl text-neon-pink font-bold drop-shadow-lg">
              Locally.
            </p>
          </div>

          <div className="divider-90s w-20 mx-auto mb-12"></div>

          {/* Features grid with vibrant cards */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-16 max-w-3xl w-full">
            {[
              { icon: '✨', label: 'Quality Matches', color: 'from-neon-pink to-neon-orange' },
              { icon: '🔐', label: 'Verified Users', color: 'from-neon-purple to-neon-blue' },
              { icon: '📍', label: 'Local Focus', color: 'from-neon-cyan to-neon-lime' },
              { icon: '💬', label: 'Safe Chat', color: 'from-neon-orange to-neon-yellow' },
            ].map((feature, i) => (
              <div
                key={i}
                className={`bg-gradient-to-br ${feature.color} p-1 rounded-2xl shadow-retro hover:shadow-neon-pink transition transform hover:scale-105`}
              >
                <div className="bg-white rounded-2xl p-6 h-full flex flex-col items-center justify-center glass-card">
                  <div className="text-4xl mb-2">{feature.icon}</div>
                  <p className="text-sm font-bold text-neon-pink text-center">{feature.label}</p>
                </div>
              </div>
            ))}
          </div>

          {/* CTA Buttons with 90s style */}
          <div className="flex flex-col sm:flex-row gap-6 mb-8">
            <Link
              href="/login"
              className="btn-90s px-10 py-4 bg-gradient-to-r from-neon-pink to-neon-orange text-white rounded-full shadow-neon-pink hover:shadow-lg transform transition border-0 font-black text-lg"
            >
              LOGIN
            </Link>
            <Link
              href="/signup"
              className="btn-90s px-10 py-4 bg-white border-4 border-neon-cyan text-neon-cyan rounded-full shadow-lg hover:bg-neon-cyan hover:text-white hover:shadow-neon-cyan transition transform font-black text-lg"
            >
              SIGN UP
            </Link>
          </div>

          {/* Call to action text */}
          <div className="text-center max-w-md">
            <p className="text-neon-purple font-bold text-lg drop-shadow-lg">
              💫 No Swiping. No Nonsense. Just Real Friendships 💫
            </p>
          </div>
        </div>

        {/* Footer */}
        <footer className="text-center">
          <p className="text-neon-pink font-bold text-sm drop-shadow-lg">
            ✌️ For adults 28–43 who want meaningful local connections ✌️
          </p>
          <p className="text-neon-cyan font-bold text-xs mt-2">
            Your vibe. Your people. Your city.
          </p>
        </footer>
      </div>
    </main>
  )
}
