'use client'

import { useAuth } from '@/hooks/useAuth'
import { useRouter } from 'next/navigation'
import { useEffect, useState } from 'react'
import { supabase } from '@/lib/supabase-client'

interface Profile {
  id: string
  first_name: string
  age: number
  interests: string[]
}

export default function MatchesPage() {
  const { user, loading } = useAuth()
  const router = useRouter()
  const [userProfile, setUserProfile] = useState<Profile | null>(null)
  const [matches, setMatches] = useState<Profile[]>([])
  const [loadingData, setLoadingData] = useState(true)
  const [error, setError] = useState('')

  useEffect(() => {
    if (!loading && !user) {
      router.push('/login')
      return
    }

    if (!loading && user) {
      fetchUserProfile()
    }
  }, [user, loading, router])

  const fetchUserProfile = async () => {
    try {
      const { data, error: err } = await supabase
        .from('profiles')
        .select('*')
        .eq('id', user?.id)
        .single()

      if (err) {
        console.error('Error fetching profile:', err)
        setError('Could not load your profile')
        setLoadingData(false)
        return
      }

      setUserProfile(data as Profile)
      fetchMatches()
    } catch (err) {
      console.error('Error:', err)
      setError('An error occurred')
      setLoadingData(false)
    }
  }

  const fetchMatches = async () => {
    try {
      const { data, error: err } = await supabase
        .from('profiles')
        .select('*')
        .neq('id', user?.id)
        .limit(10)

      if (err) {
        console.error('Error fetching matches:', err)
        setError('Could not load matches')
        setLoadingData(false)
        return
      }

      setMatches((data as Profile[]) || [])
      setLoadingData(false)
    } catch (err) {
      console.error('Error:', err)
      setError('An error occurred')
      setLoadingData(false)
    }
  }

  if (loading || loadingData) {
    return (
      <div className="min-h-screen bg-gradient-90s-neon flex items-center justify-center">
        <p className="text-2xl font-black text-white animate-pulse">Loading matches...</p>
      </div>
    )
  }

  if (!userProfile) {
    return (
      <div className="min-h-screen bg-gradient-retro relative overflow-hidden p-6 flex items-center justify-center">
        <div className="max-w-md w-full">
          <div className="bg-gradient-to-br from-neon-purple to-neon-blue p-1 rounded-3xl shadow-retro">
            <div className="bg-white rounded-3xl p-8 glass-card text-center">
              <p className="text-6xl mb-4">❌</p>
              <p className="text-2xl font-black text-dark-text mb-4">Profile Not Found</p>
              <p className="text-lg text-neon-cyan font-bold mb-8">{error}</p>
              <button
                onClick={() => router.push('/onboarding')}
                className="btn-90s px-10 py-4 bg-gradient-to-r from-neon-pink to-neon-orange text-white rounded-full shadow-lg font-black text-lg uppercase"
              >
                Complete Profile
              </button>
            </div>
          </div>
        </div>
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
      <div className="relative z-10 max-w-4xl mx-auto">
        <h1 className="text-5xl font-black text-center mb-2 rainbow-text animate-float">
          Your Matches
        </h1>
        <p className="text-center text-neon-cyan font-bold mb-8 text-lg">
          👋 Hi {userProfile.first_name}! Here are people in your area (Age {userProfile.age})
        </p>
        <div className="divider-90s max-w-xs mx-auto mb-12"></div>

        {error && (
          <div className="mb-8 p-4 bg-gradient-to-r from-neon-red to-neon-orange border-4 border-neon-red rounded-xl text-white font-bold text-center shadow-lg">
            {error}
          </div>
        )}

        {matches.length === 0 ? (
          <div className="bg-gradient-to-br from-neon-purple to-neon-blue p-1 rounded-3xl shadow-retro">
            <div className="bg-white rounded-3xl shadow-lg p-12 glass-card text-center">
              <p className="text-6xl mb-4">💫</p>
              <p className="text-2xl font-black text-dark-text mb-4">
                No Matches Yet
              </p>
              <p className="text-lg text-neon-cyan font-bold mb-8">
                Be the first! More people are joining Gen Dial Up every day.
              </p>

              <div className="divider-90s max-w-xs mx-auto my-8"></div>

              <p className="text-neon-pink font-bold">
                ✨ Your next great friendship is waiting ✨
              </p>
            </div>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {matches.map((match) => (
              <div
                key={match.id}
                className="bg-gradient-to-br from-neon-pink to-neon-orange p-1 rounded-2xl shadow-retro hover:shadow-lg transition"
              >
                <div className="bg-white rounded-2xl p-6 glass-card">
                  <h3 className="text-2xl font-black text-neon-pink mb-2">
                    {match.first_name}
                  </h3>
                  <p className="text-lg text-neon-purple font-bold mb-4">
                    {match.age} years old
                  </p>

                  <div className="mb-4">
                    <p className="text-sm font-black text-neon-cyan mb-3 uppercase">
                      Interests:
                    </p>
                    <div className="flex flex-wrap gap-2">
                      {(match.interests || []).slice(0, 4).map((interest) => (
                        <span
                          key={interest}
                          className="bg-gradient-to-r from-neon-cyan to-neon-lime text-dark-text px-3 py-1 rounded-full text-xs font-black"
                        >
                          {interest}
                        </span>
                      ))}
                      {(match.interests || []).length > 4 && (
                        <span className="text-xs font-black text-neon-purple">
                          +{(match.interests || []).length - 4} more
                        </span>
                      )}
                    </div>
                  </div>

                  <button className="w-full btn-90s bg-gradient-to-r from-neon-cyan to-neon-lime text-dark-text font-black py-2 px-4 rounded-full transition shadow-neon-cyan hover:shadow-lg border-0 text-sm uppercase">
                    💬 Say Hi
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}
