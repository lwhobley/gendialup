'use client'

export default function NostalgiaImageCollage() {
  return (
    <div 
      className="absolute inset-0 overflow-hidden opacity-40"
      style={{
        backgroundImage: `url('/90s-collage.jpg')`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundAttachment: 'fixed',
      }}
    >
      {/* Overlay gradient for cohesion and readability */}
      <div className="absolute inset-0 bg-gradient-to-br from-neon-pink/20 via-transparent to-neon-blue/20"></div>
      
      {/* Grid overlay for 90s aesthetic */}
      <div className="absolute inset-0 opacity-10 bg-gradient-to-br from-neon-pink via-neon-yellow to-neon-cyan"></div>
      
      {/* Vignette effect for focus on center/form */}
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-black/10"></div>
    </div>
  )
}
