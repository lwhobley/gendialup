'use client'

import { useAuth } from '@/hooks/useAuth'
import { useRouter } from 'next/navigation'
import { useEffect, useState } from 'react'
import { supabase } from '@/lib/supabase-client'

export default function OnboardingPage() {
  const { user, loading } = useAuth()
  const router = useRouter()
  const [firstName, setFirstName] = useState('')
  const [age, setAge] = useState('')
  const [interests, setInterests] = useState<string[]>([])
  const [saving, setSaving] = useState(false)
  const [error, setError] = useState('')
  const [successMessage, setSuccessMessage] = useState('')

  useEffect(() => {
    if (!loading && !user) {
      router.push('/signup')
    }
  }, [user, loading, router])

  const handleAddInterest = (interest: string) => {
    if (!interests.includes(interest)) {
      setInterests([...interests, interest])
    }
  }

  const handleRemoveInterest = (interest: string) => {
    setInterests(interests.filter((i) => i !== interest))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError('')
    setSuccessMessage('')
    setSaving(true)

    try {
      if (!user) {
        setError('Not authenticated')
        setSaving(false)
        return
      }

      if (!firstName.trim()) {
        setError('Please enter your name')
        setSaving(false)
        return
      }

      if (!age || parseInt(age) < 28 || parseInt(age) > 43) {
        setError('Please enter an age between 28 and 43')
        setSaving(false)
        return
      }

      if (interests.length === 0) {
        setError('Please select at least one interest')
        setSaving(false)
        return
      }

      console.log('Saving profile for user:', user.id)
      console.log('Profile data:', { firstName, age, interests })

      const { data, error: err } = await supabase
        .from('profiles')
        .upsert({
          id: user.id,
          first_name: firstName.trim(),
          age: parseInt(age),
          interests: interests,
        })
        .select()

      if (err) {
        console.error('Database error:', err)
        setError(`Error saving profile: ${err.message}`)
        setSaving(false)
        return
      }

      console.log('Profile saved successfully:', data)
      setSuccessMessage('Profile saved! Redirecting to matches...')

      // Add delay to ensure database sync
      await new Promise(resolve => setTimeout(resolve, 1000))

      console.log('Navigating to /matches')
      // Use window.location as fallback
      window.location.href = '/matches'
      
    } catch (err) {
      console.error('Submit error:', err)
      setError(`An error occurred: ${err instanceof Error ? err.message : 'Unknown error'}`)
      setSaving(false)
    }
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-90s-warm flex items-center justify-center">
        <p className="text-2xl font-black text-neon-orange animate-pulse">Loading...</p>
      </div>
    )
  }

  const suggestedInterests = [
    '🥾 Hiking',
    '☕ Coffee',
    '📚 Reading',
    '🎲 Board Games',
    '🍳 Cooking',
    '💪 Fitness',
    '🎵 Music',
    '🎨 Art',
    '✈️ Travel',
    '🧘 Yoga',
    '⚽ Sports',
    '🎬 Movies',
    '🍷 Wine Tasting',
    '🍕 Food Scene',
    '🎭 Theater',
    '📸 Photography',
    '🌍 Local Events',
    '🎮 Gaming',
    '🚴 Cycling',
    '🏖️ Beach Days',
    '🌳 Nature',
    '🎪 Comedy Shows',
    '💡 Entrepreneurs',
    '🧩 Puzzles',
    '📖 Book Clubs',
    '🍜 Cooking Classes',
    '🎸 Live Music',
    '💻 Tech',
    '🌱 Gardening',
    '🏔️ Rock Climbing',
    '🧗 Adventure Sports',
    '🎓 Learning New Things',
    '🌙 Late Night Talks',
    '☕ Cafes',
    '🏃 Running',
    '🎨 Craft Projects',
  ]

  return (
    <div className="min-h-screen bg-gradient-90s-warm relative overflow-hidden flex items-center justify-center px-4 py-8">
      {/* Background shapes */}
      <div className="absolute top-10 right-20 w-56 h-56 bg-neon-orange opacity-20 shape-blob blur-3xl"></div>
      <div className="absolute bottom-10 left-10 w-48 h-48 bg-neon-yellow opacity-15 shape-blob blur-3xl"></div>
      <div className="absolute inset-0 grid-background pointer-events-none"></div>

      {/* Card */}
      <div className="relative z-10 w-full max-w-2xl">
        <div className="bg-gradient-to-br from-neon-orange to-neon-yellow p-1 rounded-3xl shadow-retro">
          <div className="bg-white rounded-3xl p-8 glass-card max-h-[90vh] overflow-y-auto">
            <h1 className="text-4xl font-black text-center mb-2 rainbow-text">
              YOUR PROFILE
            </h1>
            <p className="text-center text-neon-orange font-bold mb-8">
              Tell us about yourself
            </p>

            <div className="divider-90s mb-6"></div>

            <form onSubmit={handleSubmit} className="space-y-8">
              {/* First Name */}
              <div>
                <label className="block text-sm font-black text-neon-pink mb-3 uppercase">
                  👤 First Name
                </label>
                <input
                  type="text"
                  value={firstName}
                  onChange={(e) => setFirstName(e.target.value)}
                  placeholder="Your name"
                  required
                  className="w-full px-4 py-3 border-4 border-neon-cyan rounded-xl focus:outline-none focus:border-neon-pink transition text-dark-text font-bold"
                />
              </div>

              {/* Age */}
              <div>
                <label className="block text-sm font-black text-neon-pink mb-3 uppercase">
                  🎂 Age
                </label>
                <input
                  type="number"
                  value={age}
                  onChange={(e) => setAge(e.target.value)}
                  placeholder="28-43"
                  min="28"
                  max="43"
                  required
                  className="w-full px-4 py-3 border-4 border-neon-cyan rounded-xl focus:outline-none focus:border-neon-pink transition text-dark-text font-bold"
                />
              </div>

              {/* Interests */}
              <div>
                <label className="block text-sm font-black text-neon-pink mb-4 uppercase">
                  ✨ Your Interests ({interests.length} selected)
                </label>

                {/* Selected interests */}
                {interests.length > 0 && (
                  <div className="mb-6 flex flex-wrap gap-3 p-4 bg-gradient-to-r from-neon-cyan/10 to-neon-lime/10 rounded-2xl border-2 border-neon-cyan">
                    {interests.map((interest) => (
                      <button
                        key={interest}
                        onClick={() => handleRemoveInterest(interest)}
                        type="button"
                        className="bg-gradient-to-r from-neon-cyan to-neon-lime text-dark-text px-4 py-2 rounded-full text-sm font-black hover:shadow-neon-cyan transition transform hover:scale-105"
                      >
                        {interest} ✕
                      </button>
                    ))}
                  </div>
                )}

                {/* Suggested interests */}
                <div className="flex flex-wrap gap-3">
                  {suggestedInterests.map((interest) => (
                    <button
                      key={interest}
                      type="button"
                      onClick={() => handleAddInterest(interest)}
                      disabled={interests.includes(interest)}
                      className={`px-4 py-2 rounded-full text-sm font-black transition transform hover:scale-105 ${
                        interests.includes(interest)
                          ? 'bg-neon-pink text-white shadow-neon-pink'
                          : 'border-4 border-neon-purple text-neon-purple hover:bg-neon-purple hover:text-white'
                      }`}
                    >
                      {interest}
                    </button>
                  ))}
                </div>
              </div>

              {/* Success Message */}
              {successMessage && (
                <div className="p-4 bg-gradient-to-r from-neon-lime to-neon-cyan border-4 border-neon-lime rounded-xl text-dark-text font-bold text-center shadow-lg">
                  ✅ {successMessage}
                </div>
              )}

              {/* Error Message */}
              {error && (
                <div className="p-4 bg-gradient-to-r from-neon-red to-neon-orange border-4 border-neon-red rounded-xl text-white font-bold text-center shadow-lg">
                  {error}
                </div>
              )}

              {/* Submit Button */}
              <button
                type="submit"
                disabled={saving || !firstName || !age || interests.length === 0}
                className="btn-90s w-full bg-gradient-to-r from-neon-cyan to-neon-lime text-dark-text font-black py-4 px-6 rounded-full transition shadow-neon-cyan hover:shadow-lg border-0 text-lg uppercase disabled:opacity-50"
              >
                {saving ? '⏳ Saving & redirecting...' : '🚀 Continue to Matches 🚀'}
              </button>
            </form>

            <div className="divider-90s my-6"></div>

            <p className="text-center font-bold text-neon-purple">
              ✌️ Complete your profile to find your people ✌️
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}
