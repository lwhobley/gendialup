'use client'

import { useAuth } from '@/hooks/useAuth'
import { useRouter } from 'next/navigation'
import { useEffect, useState } from 'react'

export default function Home() {
  const { user, loading } = useAuth()
  const router = useRouter()
  const [showIntro, setShowIntro] = useState(true)

  useEffect(() => {
    if (!loading) {
      if (user) {
        router.push('/matches')
      }
    }
  }, [user, loading, router])

  useEffect(() => {
    // Auto-advance to signup/login after intro completes
    const timer = setTimeout(() => {
      setShowIntro(false)
      if (!user) {
        router.push('/signup')
      }
    }, 4500) // Show intro for 4.5 seconds

    return () => clearTimeout(timer)
  }, [user, router])

  if (loading) {
    return (
      <div className="min-h-screen bg-white flex items-center justify-center">
        <p className="text-sm tracking-widest text-gray-400 uppercase">Loading...</p>
      </div>
    )
  }

  if (!showIntro) {
    return null
  }

  return (
    <div className="min-h-screen bg-black flex items-center justify-center overflow-hidden">
      <style>{`
        @keyframes typewriter {
          0% {
            width: 0;
          }
          100% {
            width: 100%;
          }
        }

        @keyframes blink {
          0%, 49% {
            border-right-color: white;
          }
          50%, 100% {
            border-right-color: transparent;
          }
        }

        @keyframes fadeInUp {
          from {
            opacity: 0;
            transform: translateY(20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        .typewriter-text {
          font-family: 'Courier New', monospace;
          font-size: 4rem;
          font-weight: bold;
          color: white;
          letter-spacing: 0.1em;
          border-right: 3px solid white;
          white-space: nowrap;
          overflow: hidden;
          animation: typewriter 2s steps(30, end) forwards,
                    blink 0.7s step-end infinite 2s;
          text-align: center;
        }

        .tagline {
          font-size: 2.5rem;
          font-weight: 300;
          color: white;
          letter-spacing: 0.15em;
          text-align: center;
          animation: fadeInUp 1s ease-out forwards;
          animation-delay: 2.2s;
          opacity: 0;
        }

        .fade-out {
          animation: fadeOut 0.8s ease-in forwards;
          animation-delay: 3.8s;
        }

        @keyframes fadeOut {
          from {
            opacity: 1;
          }
          to {
            opacity: 0;
          }
        }
      `}</style>

      <div className="flex flex-col items-center justify-center gap-8 fade-out">
        <div className="typewriter-text">1981–1996</div>
        <div className="tagline">The Millennials</div>
      </div>
    </div>
  )
}
