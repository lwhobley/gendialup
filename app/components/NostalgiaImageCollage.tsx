'use client'

export default function NostalgiaImageCollage() {
  // 90s aesthetic background images from Unsplash (static URLs)
  const images = [
    'https://images.unsplash.com/photo-1511379938547-c1f69b13d835?w=400&h=400&fit=crop', // concert
    'https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=400&h=400&fit=crop', // musician
    'https://images.unsplash.com/photo-1470225620780-dba8ba36b745?w=400&h=400&fit=crop', // 90s aesthetic
    'https://images.unsplash.com/photo-1516280440614-37939635edad?w=400&h=400&fit=crop', // retro
    'https://images.unsplash.com/photo-1459749411175-04bf5292ceea?w=400&h=400&fit=crop', // music stage
    'https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=400&h=400&fit=crop', // entertainment
    'https://images.unsplash.com/photo-1514525253161-7a46d19cd819?w=400&h=400&fit=crop', // concert lights
    'https://images.unsplash.com/photo-1408679713417-d4dc57eeaaf0?w=400&h=400&fit=crop', // festival
    'https://images.unsplash.com/photo-1470225620780-dba8ba36b745?w=400&h=400&fit=crop', // 90s vibes
    'https://images.unsplash.com/photo-1511379938547-c1f69b13d835?w=400&h=400&fit=crop', // neon
    'https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=400&h=400&fit=crop', // vintage
    'https://images.unsplash.com/photo-1459749411175-04bf5292ceea?w=400&h=400&fit=crop', // retro music
  ]

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
    <div className="absolute inset-0 overflow-hidden opacity-35">
      {/* Image Grid - 12 images in collage layout */}
      {images.map((imageUrl, index) => (
        <div
          key={index}
          className={`absolute ${positions[index]} rounded-lg shadow-lg overflow-hidden border-4 border-white`}
          style={{
            backgroundImage: `url('${imageUrl}')`,
            backgroundSize: 'cover',
            backgroundPosition: 'center',
          }}
        >
          {/* Overlay gradient for cohesion */}
          <div className="absolute inset-0 bg-gradient-to-br from-neon-pink/30 to-neon-blue/30"></div>
        </div>
      ))}

      {/* Geometric shapes for extra 90s vibe */}
      <div className="absolute top-1/2 right-5 w-32 h-32 bg-gradient-to-br from-neon-pink to-neon-orange rounded-full shadow-lg opacity-30"></div>

      <div className="absolute bottom-1/4 left-1/3 w-40 h-40 bg-gradient-to-br from-neon-cyan to-neon-purple transform -rotate-45 shadow-lg opacity-30"></div>

      {/* Grid overlay for 90s aesthetic */}
      <div className="absolute inset-0 opacity-5 bg-gradient-to-br from-neon-pink via-neon-yellow to-neon-cyan"></div>
    </div>
  )
}
