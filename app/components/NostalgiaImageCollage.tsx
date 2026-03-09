'use client'

import { useEffect, useState } from 'react'
import Image from 'next/image'

interface UnsplashImage {
  id: string
  urls: {
    regular: string
    thumb: string
  }
  alt_description: string
  user: {
    name: string
  }
}

export default function NostalgiaImageCollage() {
  const [images, setImages] = useState<UnsplashImage[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchNostalgiaImages = async () => {
      try {
        // Search queries for 90s nostalgia
        const queries = [
          '90s concert music festival',
          '90s television retro aesthetic',
          '90s fashion vibe',
          '1990s entertainment neon',
          '90s pop culture vibes',
          'vintage 90s media',
        ]

        const randomQuery = queries[Math.floor(Math.random() * queries.length)]

        const response = await fetch(
          `https://api.unsplash.com/search/photos?query=${randomQuery}&per_page=12&orientation=portrait&client_id=4sqiR8LMd6PVsYwjLKmn8ug0W8Aq5OvhFDUMgn7KhGU`
        )

        if (!response.ok) {
          throw new Error('Failed to fetch images')
        }

        const data = await response.json()
        setImages(data.results.slice(0, 12))
      } catch (error) {
        console.error('Error fetching nostalgia images:', error)
        // Fallback to gradient boxes if API fails
        setImages([])
      } finally {
        setLoading(false)
      }
    }

    fetchNostalgiaImages()
  }, [])

  // Fallback gradient colors for 90s aesthetic
  const fallbackGradients = [
    'from-neon-pink to-neon-orange',
    'from-neon-orange to-neon-yellow',
    'from-neon-yellow to-neon-purple',
    'from-neon-purple to-neon-blue',
    'from-neon-blue to-neon-cyan',
    'from-neon-cyan to-neon-lime',
    'from-neon-lime to-neon-pink',
    'from-neon-pink to-neon-blue',
    'from-neon-cyan to-neon-orange',
    'from-neon-yellow to-neon-purple',
    'from-neon-blue to-neon-pink',
    'from-neon-orange to-neon-cyan',
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
    <div className="absolute inset-0 overflow-hidden opacity-40">
      {/* Image Grid - 12 images in collage layout */}
      {Array.from({ length: 12 }).map((_, index) => (
        <div
          key={index}
          className={`absolute ${positions[index]} rounded-lg shadow-lg overflow-hidden border-4 border-white`}
        >
          {images[index] && !loading ? (
            <div className="relative w-full h-full">
              <Image
                src={images[index].urls.regular}
                alt={images[index].alt_description || '90s nostalgia image'}
                fill
                className="object-cover"
                priority={index < 4}
              />
              {/* Overlay gradient for cohesion */}
              <div className="absolute inset-0 bg-gradient-to-br from-neon-pink/20 to-neon-blue/20"></div>
            </div>
          ) : (
            /* Fallback: Gradient boxes with 90s emoji */
            <div
              className={`w-full h-full bg-gradient-to-br ${fallbackGradients[index]} flex items-center justify-center text-5xl shadow-lg`}
            >
              {['🎸', '🎤', '📺', '🎬', '🌟', '✨', '🎪', '🎭', '📻', '📼', '🎉', '🎊'][index]}
            </div>
          )}
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
