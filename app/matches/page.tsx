'use client'

import { useAuth } from '@/hooks/useAuth'
import { useRouter } from 'next/navigation'
import { useEffect } from 'react'

export default function MatchesPage() {
  const { user, loading } = useAuth()
  const router = useRouter()

  useEffect(() => {
    if (!loading && !user) {
      router.push('/login')
    }
  }, [user, loading, router])

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-90s-neon flex items-center justify-center">
        <p className="text-2xl font-black text-white animate-pulse">Loading...</p>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-retro relative overflow-hidden p-6">
      {/* Background shapes */}
      <div className="absolute top-10 right-20 w-48 h-48 bg-neon-pink opacity-20 shape-blob blur-3xl"></div>
      <div className="absolute bottom-10 left-10 w-56 h-56 bg-neon-cyan opacity-15 shape-blob blur-3xl"></div>
      <div className="absolute inset-0 grid-background pointer-events-none"></div>

      {/* Content */}
      <div className="relative z-10 max-w-3xl mx-auto">
        <h1 className="text-5xl font-black text-center mb-2 rainbow-text animate-float">
          Your Matches
        </h1>
        <div className="divider-90s max-w-xs mx-auto mb-12"></div>

        <div className="bg-gradient-to-br from-neon-purple to-neon-blue p-1 rounded-3xl shadow-retro">
          <div className="bg-white rounded-3xl shadow-lg p-12 glass-card text-center">
            <p className="text-6xl mb-4">💫</p>
            <p className="text-2xl font-black text-dark-text mb-4">
              Welcome to Your Matches!
            </p>
            <p className="text-lg text-neon-cyan font-bold mb-8">
              Complete your profile to see potential matches in your area.
            </p>

            <button
              onClick={() => router.push('/onboarding')}
              className="btn-90s px-10 py-4 bg-gradient-to-r from-neon-orange to-neon-yellow text-dark-text rounded-full shadow-lg hover:shadow-xl transition border-0 font-black text-lg uppercase"
            >
              Complete Profile
            </button>

            <div className="divider-90s max-w-xs mx-auto my-8"></div>

            <p className="text-neon-pink font-bold">
              ✨ Your next great friendship is waiting ✨
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}
