'use client'

export default function NostalgiaImageCollage() {
  // Vibrant gradient backgrounds that evoke 90s aesthetic
  const gradients = [
    'linear-gradient(135deg, #FF006E 0%, #FB5607 100%)',      // Pink to Orange
    'linear-gradient(135deg, #FB5607 0%, #FFBE0B 100%)',      // Orange to Yellow
    'linear-gradient(135deg, #FFBE0B 0%, #8338EC 100%)',      // Yellow to Purple
    'linear-gradient(135deg, #8338EC 0%, #3A86FF 100%)',      // Purple to Blue
    'linear-gradient(135deg, #3A86FF 0%, #00D9FF 100%)',      // Blue to Cyan
    'linear-gradient(135deg, #00D9FF 0%, #06FFA5 100%)',      // Cyan to Lime
    'linear-gradient(135deg, #06FFA5 0%, #FF006E 100%)',      // Lime to Pink
    'linear-gradient(135deg, #FF006E 0%, #3A86FF 100%)',      // Pink to Blue
    'linear-gradient(135deg, #00D9FF 0%, #FB5607 100%)',      // Cyan to Orange
    'linear-gradient(135deg, #FFBE0B 0%, #8338EC 100%)',      // Yellow to Purple
    'linear-gradient(135deg, #3A86FF 0%, #FF006E 100%)',      // Blue to Pink
    'linear-gradient(135deg, #FB5607 0%, #00D9FF 100%)',      // Orange to Cyan
  ]

  const emojis = ['🎸', '🎤', '📺', '🎬', '🌟', '✨', '🎪', '🎭', '📻', '📼', '🎉', '🎊']

  const positions = [
    'top-0 left-0 w-48 h-48 -rotate-12',
    'top-10 left-1/3 w-40 h-40 rotate-6',
    'top-20 right-32 w-52 h-52 -rotate-45',
    'top-40 right-10 w-44 h-44 rotate-12',
    'top-1/3 left-10 w-48 h-48 rotate-45',
    'top-1/2 left-1/2 transform -translate-x-1/2 w-56 h-56 -rotate-20',
    'top-1/3 right-20 w-40 h-40 -rotate-6',
    'bottom-32 left-1/4 w-48 h-48 rotate-30',
    'bottom-20 left-10 w-44 h-44 -rotate-15',
    'bottom-40 right-1/4 w-52 h-52 rotate-20',
    'bottom-10 right-10 w-48 h-48 -rotate-30',
    'top-1/4 right-1/3 w-40 h-40 rotate-45',
  ]

  return (
    <div className="absolute inset-0 overflow-hidden opacity-40">
      {/* Gradient boxes representing 90s aesthetic */}
      {gradients.map((gradient, index) => (
        <div
          key={index}
          className={`absolute ${positions[index]} rounded-2xl shadow-lg overflow-hidden border-4 border-white`}
          style={{
            background: gradient,
          }}
        >
          {/* Emoji overlay for 90s vibe */}
          <div className="absolute inset-0 flex items-center justify-center text-6xl drop-shadow-lg">
            {emojis[index]}
          </div>
        </div>
      ))}

      {/* Geometric shapes for extra 90s vibe */}
      <div className="absolute top-1/2 right-5 w-32 h-32 bg-gradient-to-br from-neon-pink to-neon-orange rounded-full shadow-lg opacity-30"></div>

      <div className="absolute bottom-1/4 left-1/3 w-40 h-40 bg-gradient-to-br from-neon-cyan to-neon-purple transform -rotate-45 shadow-lg opacity-30"></div>

      {/* Grid overlay for 90s aesthetic */}
      <div className="absolute inset-0 opacity-5 bg-gradient-to-br from-neon-pink via-neon-yellow to-neon-cyan pointer-events-none"></div>
    </div>
  )
}
