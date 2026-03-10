'use client'

import { useAuth } from '@/hooks/useAuth'
import { useRouter } from 'next/navigation'
import { useEffect, useState } from 'react'
import { supabase } from '@/lib/supabase-client'

interface Profile {
  first_name: string
  age: string
  interests: string[]
  hometown: string
  current_city: string
  college: string
  profession: string
  ethnic_background: string
  religion: string
  reason_for_joining: string
  photo_urls: string[]
}

export default function OnboardingPage() {
  const { user, loading } = useAuth()
  const router = useRouter()
  const [step, setStep] = useState(1)
  const [profile, setProfile] = useState<Profile>({
    first_name: '',
    age: '',
    interests: [],
    hometown: '',
    current_city: '',
    college: '',
    profession: '',
    ethnic_background: '',
    religion: '',
    reason_for_joining: '',
    photo_urls: [],
  })
  const [saving, setSaving] = useState(false)
  const [error, setError] = useState('')
  const [uploadingPhotos, setUploadingPhotos] = useState(false)

  useEffect(() => {
    if (!loading && !user) {
      router.push('/signup')
    }
  }, [user, loading, router])

  const handlePhotoUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.currentTarget.files
    if (!files || profile.photo_urls.length >= 6) return

    setUploadingPhotos(true)
    const newPhotos = [...profile.photo_urls]

    try {
      for (let i = 0; i < files.length && newPhotos.length < 6; i++) {
        const file = files[i]
        const fileExt = file.name.split('.').pop()
        const fileName = `${user?.id}_${Date.now()}_${i}.${fileExt}`
        const filePath = `profile_photos/${fileName}`

        const { error: uploadError } = await supabase.storage
          .from('profile-photos')
          .upload(filePath, file)

        if (uploadError) {
          console.error('Upload error:', uploadError)
          setError(`Failed to upload photo: ${uploadError.message}`)
          setUploadingPhotos(false)
          return
        }

        const { data } = supabase.storage
          .from('profile-photos')
          .getPublicUrl(filePath)

        newPhotos.push(data.publicUrl)
      }

      setProfile({ ...profile, photo_urls: newPhotos })
      setError('')
    } catch (err) {
      console.error('Photo upload error:', err)
      setError('Failed to upload photos')
    }

    setUploadingPhotos(false)
  }

  const handleRemovePhoto = (index: number) => {
    const newPhotos = profile.photo_urls.filter((_, i) => i !== index)
    setProfile({ ...profile, photo_urls: newPhotos })
  }

  const handleAddInterest = (interest: string) => {
    if (!profile.interests.includes(interest)) {
      setProfile({ ...profile, interests: [...profile.interests, interest] })
    }
  }

  const handleRemoveInterest = (interest: string) => {
    setProfile({
      ...profile,
      interests: profile.interests.filter((i) => i !== interest),
    })
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

      if (!profile.first_name.trim()) {
        setError('Please enter your name')
        setSaving(false)
        return
      }

      if (!profile.age || parseInt(profile.age) < 28 || parseInt(profile.age) > 43) {
        setError('Please enter an age between 28 and 43')
        setSaving(false)
        return
      }

      if (profile.interests.length === 0) {
        setError('Please select at least one interest')
        setSaving(false)
        return
      }

      if (!profile.hometown || !profile.current_city || !profile.college || !profile.profession || !profile.ethnic_background || !profile.religion) {
        setError('Please fill in all profile fields')
        setSaving(false)
        return
      }

      if (!profile.reason_for_joining.trim()) {
        setError('Please tell us why you\'re joining')
        setSaving(false)
        return
      }

      console.log('Saving profile for user:', user.id)

      const { error: err } = await supabase
        .from('profiles')
        .upsert({
          id: user.id,
          first_name: profile.first_name.trim(),
          age: parseInt(profile.age),
          interests: profile.interests,
          hometown: profile.hometown,
          current_city: profile.current_city,
          college: profile.college,
          profession: profile.profession,
          ethnic_background: profile.ethnic_background,
          religion: profile.religion,
          reason_for_joining: profile.reason_for_joining.trim(),
          photo_urls: profile.photo_urls,
        })

      if (err) {
        console.error('Database error:', err)
        setError(`Error saving profile: ${err.message}`)
        setSaving(false)
        return
      }

      console.log('Profile saved successfully')
      await new Promise(resolve => setTimeout(resolve, 1000))
      window.location.href = '/matches'
    } catch (err) {
      console.error('Submit error:', err)
      setError(`An error occurred: ${err instanceof Error ? err.message : 'Unknown error'}`)
      setSaving(false)
    }
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-white flex items-center justify-center">
        <p className="text-sm tracking-widest text-gray-400 uppercase">Loading...</p>
      </div>
    )
  }

  const suggestedInterests = [
    '🥾 Hiking', '☕ Coffee', '📚 Reading', '🎲 Board Games',
    '🍳 Cooking', '💪 Fitness', '🎵 Music', '🎨 Art',
    '✈️ Travel', '🧘 Yoga', '⚽ Sports', '🎬 Movies',
    '🍷 Wine Tasting', '🍕 Food Scene', '🎭 Theater', '📸 Photography',
    '🌍 Local Events', '🎮 Gaming', '🚴 Cycling', '🏖️ Beach Days',
    '🌳 Nature', '🎪 Comedy Shows', '💡 Entrepreneurs', '🧩 Puzzles',
    '📖 Book Clubs', '🍜 Cooking Classes', '🎸 Live Music', '💻 Tech',
    '🌱 Gardening', '🏔️ Rock Climbing', '🧗 Adventure Sports', '🎓 Learning',
    '🌙 Late Night Talks', '☕ Cafes', '🏃 Running', '🎨 Craft',
  ]

  return (
    <div className="min-h-screen bg-white">
      {/* Header */}
      <div className="border-b border-gray-100 sticky top-0 bg-white/95 backdrop-blur-sm z-50">
        <div className="max-w-2xl mx-auto px-6 py-4">
          <div className="flex items-center gap-4">
            <div className="flex-1">
              <div className="flex gap-1">
                {[1, 2, 3, 4].map((s) => (
                  <div
                    key={s}
                    className={`h-1 flex-1 rounded-full transition-all ${
                      s <= step ? 'bg-black' : 'bg-gray-200'
                    }`}
                  />
                ))}
              </div>
              <p className="text-xs text-gray-500 mt-2 uppercase tracking-widest">Step {step} of 4</p>
            </div>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="max-w-2xl mx-auto px-6 py-12">
        <form onSubmit={handleSubmit} className="space-y-8">
          {/* STEP 1: BASIC INFO */}
          {step === 1 && (
            <div className="space-y-8 animate-in fade-in duration-300">
              <div>
                <h1 className="text-3xl font-light tracking-tight text-black mb-2">
                  Let's start with the basics
                </h1>
                <p className="text-sm text-gray-500">Tell us a bit about yourself</p>
              </div>

              <div className="space-y-6">
                <div>
                  <label className="block text-xs font-semibold text-gray-700 uppercase tracking-widest mb-3">
                    First Name
                  </label>
                  <input
                    type="text"
                    value={profile.first_name}
                    onChange={(e) => setProfile({ ...profile, first_name: e.target.value })}
                    placeholder="Your name"
                    className="w-full px-0 py-3 bg-transparent border-b border-gray-300 focus:border-black outline-none transition text-base placeholder-gray-300"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-gray-700 uppercase tracking-widest mb-3">
                    Age
                  </label>
                  <input
                    type="number"
                    value={profile.age}
                    onChange={(e) => setProfile({ ...profile, age: e.target.value })}
                    placeholder="28-43"
                    min="28"
                    max="43"
                    className="w-full px-0 py-3 bg-transparent border-b border-gray-300 focus:border-black outline-none transition text-base placeholder-gray-300"
                  />
                </div>
              </div>

              {error && (
                <div className="p-4 bg-red-50 border border-red-200 rounded-lg text-sm text-red-600">
                  {error}
                </div>
              )}

              <button
                type="button"
                onClick={() => {
                  if (!profile.first_name.trim()) {
                    setError('Please enter your name')
                    return
                  }
                  if (!profile.age || parseInt(profile.age) < 28 || parseInt(profile.age) > 43) {
                    setError('Please enter an age between 28 and 43')
                    return
                  }
                  setError('')
                  setStep(2)
                }}
                className="w-full bg-black text-white py-3 rounded-lg text-sm font-medium hover:bg-gray-900 transition"
              >
                Continue
              </button>
            </div>
          )}

          {/* STEP 2: LOCATION & BACKGROUND */}
          {step === 2 && (
            <div className="space-y-8 animate-in fade-in duration-300">
              <div>
                <h1 className="text-3xl font-light tracking-tight text-black mb-2">
                  Where are you from?
                </h1>
                <p className="text-sm text-gray-500">And a bit about your background</p>
              </div>

              <div className="space-y-6">
                <div>
                  <label className="block text-xs font-semibold text-gray-700 uppercase tracking-widest mb-3">
                    Hometown
                  </label>
                  <input
                    type="text"
                    value={profile.hometown}
                    onChange={(e) => setProfile({ ...profile, hometown: e.target.value })}
                    placeholder="City, State"
                    className="w-full px-0 py-3 bg-transparent border-b border-gray-300 focus:border-black outline-none transition text-base placeholder-gray-300"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-gray-700 uppercase tracking-widest mb-3">
                    Current City
                  </label>
                  <input
                    type="text"
                    value={profile.current_city}
                    onChange={(e) => setProfile({ ...profile, current_city: e.target.value })}
                    placeholder="City, State"
                    className="w-full px-0 py-3 bg-transparent border-b border-gray-300 focus:border-black outline-none transition text-base placeholder-gray-300"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-gray-700 uppercase tracking-widest mb-3">
                    Education
                  </label>
                  <select
                    value={profile.college}
                    onChange={(e) => setProfile({ ...profile, college: e.target.value })}
                    className="w-full px-0 py-3 bg-transparent border-b border-gray-300 focus:border-black outline-none transition text-base"
                  >
                    <option value="">Select...</option>
                    <option>High School</option>
                    <option>Some College</option>
                    <option>Bachelor's Degree</option>
                    <option>Master's Degree</option>
                    <option>PhD</option>
                    <option>Trade School</option>
                    <option>Prefer not to say</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-gray-700 uppercase tracking-widest mb-3">
                    Profession
                  </label>
                  <select
                    value={profile.profession}
                    onChange={(e) => setProfile({ ...profile, profession: e.target.value })}
                    className="w-full px-0 py-3 bg-transparent border-b border-gray-300 focus:border-black outline-none transition text-base"
                  >
                    <option value="">Select...</option>
                    <option>Tech & IT</option>
                    <option>Finance & Business</option>
                    <option>Healthcare</option>
                    <option>Education</option>
                    <option>Arts & Entertainment</option>
                    <option>Sales & Marketing</option>
                    <option>Engineering</option>
                    <option>Law & Legal</option>
                    <option>Government & Public Service</option>
                    <option>Hospitality</option>
                    <option>Student</option>
                    <option>Entrepreneur</option>
                    <option>Other</option>
                    <option>Prefer not to say</option>
                  </select>
                </div>
              </div>

              {error && (
                <div className="p-4 bg-red-50 border border-red-200 rounded-lg text-sm text-red-600">
                  {error}
                </div>
              )}

              <div className="flex gap-3">
                <button
                  type="button"
                  onClick={() => setStep(1)}
                  className="flex-1 bg-gray-100 text-black py-3 rounded-lg text-sm font-medium hover:bg-gray-200 transition"
                >
                  Back
                </button>
                <button
                  type="button"
                  onClick={() => {
                    if (!profile.hometown || !profile.current_city || !profile.college || !profile.profession) {
                      setError('Please fill in all fields')
                      return
                    }
                    setError('')
                    setStep(3)
                  }}
                  className="flex-1 bg-black text-white py-3 rounded-lg text-sm font-medium hover:bg-gray-900 transition"
                >
                  Continue
                </button>
              </div>
            </div>
          )}

          {/* STEP 3: DEMOGRAPHICS & PHOTOS */}
          {step === 3 && (
            <div className="space-y-8 animate-in fade-in duration-300">
              <div>
                <h1 className="text-3xl font-light tracking-tight text-black mb-2">
                  About you
                </h1>
                <p className="text-sm text-gray-500">Personal details and photos</p>
              </div>

              <div className="space-y-6">
                <div>
                  <label className="block text-xs font-semibold text-gray-700 uppercase tracking-widest mb-3">
                    Ethnic Background
                  </label>
                  <select
                    value={profile.ethnic_background}
                    onChange={(e) => setProfile({ ...profile, ethnic_background: e.target.value })}
                    className="w-full px-0 py-3 bg-transparent border-b border-gray-300 focus:border-black outline-none transition text-base"
                  >
                    <option value="">Select...</option>
                    <option>White</option>
                    <option>Black</option>
                    <option>Hispanic/Latino</option>
                    <option>Asian</option>
                    <option>Native American</option>
                    <option>Pacific Islander</option>
                    <option>Middle Eastern</option>
                    <option>Indian</option>
                    <option>Mixed</option>
                    <option>Other</option>
                    <option>Prefer not to say</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-gray-700 uppercase tracking-widest mb-3">
                    Religion
                  </label>
                  <select
                    value={profile.religion}
                    onChange={(e) => setProfile({ ...profile, religion: e.target.value })}
                    className="w-full px-0 py-3 bg-transparent border-b border-gray-300 focus:border-black outline-none transition text-base"
                  >
                    <option value="">Select...</option>
                    <option>Christian</option>
                    <option>Muslim</option>
                    <option>Jewish</option>
                    <option>Hindu</option>
                    <option>Buddhist</option>
                    <option>Atheist</option>
                    <option>Agnostic</option>
                    <option>Spiritual</option>
                    <option>Other</option>
                    <option>Prefer not to say</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-gray-700 uppercase tracking-widest mb-3">
                    Photos ({profile.photo_urls.length}/6)
                  </label>
                  {profile.photo_urls.length < 6 && (
                    <label className="block cursor-pointer mb-4">
                      <div className="border-2 border-dashed border-gray-300 rounded-lg p-8 text-center hover:border-black hover:bg-gray-50 transition">
                        <p className="text-sm text-gray-600">Click to upload photos</p>
                        <p className="text-xs text-gray-400 mt-1">{6 - profile.photo_urls.length} remaining</p>
                        <input
                          type="file"
                          multiple
                          accept="image/*"
                          onChange={handlePhotoUpload}
                          disabled={uploadingPhotos}
                          className="hidden"
                        />
                      </div>
                    </label>
                  )}

                  {profile.photo_urls.length > 0 && (
                    <div className="grid grid-cols-3 gap-3">
                      {profile.photo_urls.map((photo, idx) => (
                        <div key={idx} className="relative group">
                          <img
                            src={photo}
                            alt={`Photo ${idx + 1}`}
                            className="w-full h-32 object-cover rounded-lg"
                          />
                          <button
                            type="button"
                            onClick={() => handleRemovePhoto(idx)}
                            className="absolute top-2 right-2 bg-black text-white rounded-full w-6 h-6 flex items-center justify-center text-xs opacity-0 group-hover:opacity-100 transition"
                          >
                            ✕
                          </button>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              </div>

              {error && (
                <div className="p-4 bg-red-50 border border-red-200 rounded-lg text-sm text-red-600">
                  {error}
                </div>
              )}

              <div className="flex gap-3">
                <button
                  type="button"
                  onClick={() => setStep(2)}
                  className="flex-1 bg-gray-100 text-black py-3 rounded-lg text-sm font-medium hover:bg-gray-200 transition"
                >
                  Back
                </button>
                <button
                  type="button"
                  onClick={() => {
                    if (!profile.ethnic_background || !profile.religion) {
                      setError('Please fill in all fields')
                      return
                    }
                    setError('')
                    setStep(4)
                  }}
                  className="flex-1 bg-black text-white py-3 rounded-lg text-sm font-medium hover:bg-gray-900 transition"
                >
                  Continue
                </button>
              </div>
            </div>
          )}

          {/* STEP 4: INTERESTS & REASON */}
          {step === 4 && (
            <div className="space-y-8 animate-in fade-in duration-300">
              <div>
                <h1 className="text-3xl font-light tracking-tight text-black mb-2">
                  Final details
                </h1>
                <p className="text-sm text-gray-500">What are you interested in?</p>
              </div>

              <div className="space-y-6">
                <div>
                  <label className="block text-xs font-semibold text-gray-700 uppercase tracking-widest mb-4">
                    Your Interests ({profile.interests.length})
                  </label>

                  {profile.interests.length > 0 && (
                    <div className="mb-4 flex flex-wrap gap-2">
                      {profile.interests.map((interest) => (
                        <button
                          key={interest}
                          type="button"
                          onClick={() => handleRemoveInterest(interest)}
                          className="bg-black text-white px-3 py-1 rounded-full text-xs hover:bg-gray-800 transition"
                        >
                          {interest} ✕
                        </button>
                      ))}
                    </div>
                  )}

                  <div className="flex flex-wrap gap-2">
                    {suggestedInterests.map((interest) => (
                      <button
                        key={interest}
                        type="button"
                        onClick={() => handleAddInterest(interest)}
                        disabled={profile.interests.includes(interest)}
                        className={`px-3 py-2 rounded-full text-xs transition ${
                          profile.interests.includes(interest)
                            ? 'bg-black text-white'
                            : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                        }`}
                      >
                        {interest}
                      </button>
                    ))}
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-gray-700 uppercase tracking-widest mb-3">
                    Why are you joining Gen Dial Up?
                  </label>
                  <textarea
                    value={profile.reason_for_joining}
                    onChange={(e) => setProfile({ ...profile, reason_for_joining: e.target.value })}
                    placeholder="Tell us what you're looking for..."
                    rows={4}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:border-black outline-none transition text-sm placeholder-gray-400 resize-none"
                  />
                </div>
              </div>

              {error && (
                <div className="p-4 bg-red-50 border border-red-200 rounded-lg text-sm text-red-600">
                  {error}
                </div>
              )}

              <div className="flex gap-3">
                <button
                  type="button"
                  onClick={() => setStep(3)}
                  className="flex-1 bg-gray-100 text-black py-3 rounded-lg text-sm font-medium hover:bg-gray-200 transition"
                >
                  Back
                </button>
                <button
                  type="submit"
                  disabled={saving || uploadingPhotos || profile.interests.length === 0}
                  className="flex-1 bg-black text-white py-3 rounded-lg text-sm font-medium hover:bg-gray-900 transition disabled:opacity-50"
                >
                  {saving ? 'Creating profile...' : 'Complete Profile'}
                </button>
              </div>
            </div>
          )}
        </form>
      </div>
    </div>
  )
}
