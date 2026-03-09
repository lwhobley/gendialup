'use client'

import { useEffect, useState } from 'react'

export default function NostalgiaImageCollage() {
  const [imageLoaded, setImageLoaded] = useState(false)

  useEffect(() => {
    // Preload the image
    const img = new Image()
    img.onload = () => setImageLoaded(true)
    img.src = '/90s-collage.jpg'
  }, [])

  return (
    <div className="absolute inset-0 overflow-hidden">
      {/* Background image */}
      <div
        className="absolute inset-0"
        style={{
          backgroundImage: "url('/90s-collage.jpg')",
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          backgroundRepeat: 'no-repeat',
          opacity: 0.4,
        }}
      />

      {/* Overlay gradient for cohesion and readability */}
      <div className="absolute inset-0 bg-gradient-to-br from-neon-pink/10 via-transparent to-neon-blue/10"></div>

      {/* Grid overlay for 90s aesthetic */}
      <div className="absolute inset-0 opacity-10 bg-gradient-to-br from-neon-pink via-neon-yellow to-neon-cyan"></div>

      {/* Vignette effect for focus on center */}
      <div className="absolute inset-0 shadow-2xl pointer-events-none"></div>
    </div>
  )
}
