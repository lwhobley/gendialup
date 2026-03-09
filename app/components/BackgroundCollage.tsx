'use client'

export default function BackgroundCollage() {
  return (
    <div className="absolute inset-0 overflow-hidden opacity-30">
      {/* Grid of 90s style background images using Unicode/Emoji as placeholders */}
      
      {/* Top row - 90s Musicians & Icons */}
      <div className="absolute top-0 left-0 w-48 h-48 bg-gradient-to-br from-neon-pink via-purple-400 to-neon-blue rounded-lg transform -rotate-12 shadow-lg flex items-center justify-center text-6xl">
        🎸
      </div>
      
      <div className="absolute top-10 left-1/3 w-40 h-40 bg-gradient-to-br from-neon-orange via-yellow-400 to-neon-yellow rounded-lg transform rotate-6 shadow-lg flex items-center justify-center text-6xl">
        🎤
      </div>

      <div className="absolute top-20 right-32 w-52 h-52 bg-gradient-to-br from-neon-cyan via-blue-400 to-neon-purple rounded-lg transform -rotate-45 shadow-lg flex items-center justify-center text-6xl">
        📺
      </div>

      <div className="absolute top-40 right-10 w-44 h-44 bg-gradient-to-br from-neon-lime via-green-400 to-neon-cyan rounded-lg transform rotate-12 shadow-lg flex items-center justify-center text-6xl">
        🎬
      </div>

      {/* Middle row - 90s Culture */}
      <div className="absolute top-1/3 left-10 w-48 h-48 bg-gradient-to-br from-neon-yellow via-orange-400 to-neon-orange rounded-lg transform rotate-45 shadow-lg flex items-center justify-center text-6xl">
        🎉
      </div>

      <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 w-56 h-56 bg-gradient-to-br from-neon-pink via-purple-400 to-neon-blue rounded-lg transform -rotate-20 shadow-2xl flex items-center justify-center text-7xl">
        ✨
      </div>

      <div className="absolute top-1/3 right-20 w-40 h-40 bg-gradient-to-br from-neon-purple via-pink-400 to-neon-pink rounded-lg transform -rotate-6 shadow-lg flex items-center justify-center text-6xl">
        🌟
      </div>

      {/* Bottom row - 90s Events & Entertainment */}
      <div className="absolute bottom-32 left-1/4 w-48 h-48 bg-gradient-to-br from-neon-cyan via-blue-400 to-neon-purple rounded-lg transform rotate-30 shadow-lg flex items-center justify-center text-6xl">
        🎪
      </div>

      <div className="absolute bottom-20 left-10 w-44 h-44 bg-gradient-to-br from-neon-orange via-yellow-400 to-neon-yellow rounded-lg transform -rotate-15 shadow-lg flex items-center justify-center text-6xl">
        🎊
      </div>

      <div className="absolute bottom-40 right-1/4 w-52 h-52 bg-gradient-to-br from-neon-lime via-green-400 to-neon-cyan rounded-lg transform rotate-20 shadow-lg flex items-center justify-center text-6xl">
        🎭
      </div>

      <div className="absolute bottom-10 right-10 w-48 h-48 bg-gradient-to-br from-neon-pink via-purple-400 to-neon-blue rounded-lg transform -rotate-30 shadow-lg flex items-center justify-center text-6xl">
        🎸
      </div>

      {/* Additional decorative elements */}
      <div className="absolute top-1/4 right-1/3 w-40 h-40 bg-gradient-to-br from-neon-yellow via-orange-400 to-neon-orange rounded-lg transform rotate-45 shadow-lg flex items-center justify-center text-5xl">
        📻
      </div>

      <div className="absolute bottom-1/3 right-1/3 w-36 h-36 bg-gradient-to-br from-neon-cyan via-blue-400 to-neon-purple rounded-lg transform -rotate-25 shadow-lg flex items-center justify-center text-5xl">
        📼
      </div>

      {/* Geometric shapes for 90s vibe */}
      <div className="absolute top-1/2 right-5 w-32 h-32 bg-gradient-to-br from-neon-pink to-neon-orange rounded-full transform rotate-90 shadow-lg opacity-20"></div>
      
      <div className="absolute bottom-1/4 left-1/3 w-40 h-40 bg-gradient-to-br from-neon-cyan to-neon-purple transform -rotate-45 shadow-lg opacity-20"></div>

      {/* Grid lines for extra 90s effect */}
      <div className="absolute inset-0 opacity-5 bg-gradient-to-br from-neon-pink via-neon-yellow to-neon-cyan"></div>
    </div>
  )
}
