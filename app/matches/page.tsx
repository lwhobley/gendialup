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
      <div className="min-h-screen bg-gradient-to-br from-cream to-warm-gray/15 flex items-center justify-center">
        <p className="text-light-text">Loading...</p>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-cream to-warm-gray/15 p-6">
      <div className="max-w-2xl mx-auto">
        <h1 className="text-4xl font-bold text-dark-text mb-8">Your Matches</h1>
        
        <div className="bg-white rounded-2xl shadow-lg p-8 text-center">
          <p className="text-light-text text-lg mb-4">
            Welcome! Complete your profile to see matches.
          </p>
          <button
            onClick={() => router.push('/onboarding')}
            className="bg-sage hover:bg-sage/90 text-white font-semibold py-3 px-8 rounded-lg transition"
          >
            Complete Profile
          </button>
        </div>
      </div>
    </div>
  )
}
