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
    setSaving(true)

    try {
      if (!user) {
        setError('Not authenticated')
        setSaving(false)
        return
      }

      const { error: err } = await supabase
        .from('profiles')
        .upsert({
          id: user.id,
          first_name: firstName,
          age: parseInt(age),
          interests,
        })

      if (err) {
        setError(err.message)
        setSaving(false)
        return
      }

      router.push('/matches')
    } catch (err) {
      setError('An error occurred')
      setSaving(false)
    }
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-cream to-warm-gray/15 flex items-center justify-center">
        <p className="text-light-text">Loading...</p>
      </div>
    )
  }

  const suggestedInterests = [
    'Hiking',
    'Coffee',
    'Reading',
    'Board Games',
    'Cooking',
    'Fitness',
    'Music',
    'Art',
    'Travel',
    'Yoga',
    'Sports',
    'Movies',
  ]

  return (
    <div className="min-h-screen bg-gradient-to-br from-cream to-warm-gray/15 flex items-center justify-center px-4 py-8">
      <div className="w-full max-w-md bg-white rounded-2xl shadow-lg p-8">
        <h1 className="text-3xl font-bold text-dark-text mb-2 text-center">
          Complete Your Profile
        </h1>
        <p className="text-light-text text-center mb-8">
          Tell us about yourself
        </p>

        <form onSubmit={handleSubmit} className="space-y-6">
          {/* First Name */}
          <div>
            <label className="block text-sm font-medium text-dark-text mb-2">
              First Name
            </label>
            <input
              type="text"
              value={firstName}
              onChange={(e) => setFirstName(e.target.value)}
              placeholder="Your name"
              required
              className="w-full px-4 py-3 border-2 border-warm-gray rounded-lg focus:outline-none focus:border-sage transition"
            />
          </div>

          {/* Age */}
          <div>
            <label className="block text-sm font-medium text-dark-text mb-2">
              Age
            </label>
            <input
              type="number"
              value={age}
              onChange={(e) => setAge(e.target.value)}
              placeholder="28-43"
              min="28"
              max="43"
              required
              className="w-full px-4 py-3 border-2 border-warm-gray rounded-lg focus:outline-none focus:border-sage transition"
            />
          </div>

          {/* Interests */}
          <div>
            <label className="block text-sm font-medium text-dark-text mb-2">
              Interests
            </label>
            <div className="flex flex-wrap gap-2 mb-4">
              {interests.map((interest) => (
                <button
                  key={interest}
                  onClick={() => handleRemoveInterest(interest)}
                  className="bg-sage text-white px-3 py-1 rounded-full text-sm hover:bg-sage/90 transition"
                >
                  {interest} ✕
                </button>
              ))}
            </div>
            <div className="flex flex-wrap gap-2">
              {suggestedInterests.map((interest) => (
                <button
                  key={interest}
                  onClick={() => handleAddInterest(interest)}
                  disabled={interests.includes(interest)}
                  className="border-2 border-warm-gray px-3 py-1 rounded-full text-sm hover:border-sage disabled:bg-warm-gray disabled:text-light-text transition"
                >
                  {interest}
                </button>
              ))}
            </div>
          </div>

          {/* Error Message */}
          {error && (
            <div className="p-3 bg-red-100 border-l-4 border-red-500 text-red-700 text-sm">
              {error}
            </div>
          )}

          {/* Submit Button */}
          <button
            type="submit"
            disabled={saving || !firstName || !age}
            className="w-full bg-sage hover:bg-sage/90 disabled:bg-sage/50 text-white font-semibold py-3 px-4 rounded-lg transition"
          >
            {saving ? 'Saving...' : 'Continue to Matches'}
          </button>
        </form>
      </div>
    </div>
  )
}
