'use client'

import { useAuth } from '@/hooks/useAuth'
import { useRouter } from 'next/navigation'
import { useEffect, useState } from 'react'
import { supabase } from '@/lib/supabase-client'

interface Profile {
  first_name: string
  age: number
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
  } as any)
  const [saving, setSaving] = useState(false)
  const [error, setError] = useState('')
  const [successMessage, setSuccessMessage] = useState('')
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
    setSuccessMessage('')
    setSaving(true)

    try {
      if (!user) {
        setError('Not authenticated')
        setSaving(false)
        return
      }

      // Validation
      if (!profile.first_name.trim()) {
        setError('Please enter your name')
        setSaving(false)
        return
      }

      if (!profile.age || parseInt(profile.age as any) < 28 || parseInt(profile.age as any) > 43) {
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
          age: parseInt(profile.age as any),
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
      setSuccessMessage('Profile saved! Redirecting to matches...')

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
      <div className="min-h-screen bg-gradient-90s-warm flex items-center justify-center">
        <p className="text-2xl font-black text-neon-orange animate-pulse">Loading...</p>
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
    <div className="min-h-screen bg-gradient-90s-warm relative overflow-hidden flex items-center justify-center px-4 py-8">
      <div className="absolute top-10 right-20 w-56 h-56 bg-neon-orange opacity-20 shape-blob blur-3xl"></div>
      <div className="absolute bottom-10 left-10 w-48 h-48 bg-neon-yellow opacity-15 shape-blob blur-3xl"></div>
      <div className="absolute inset-0 grid-background pointer-events-none"></div>

      <div className="relative z-10 w-full max-w-3xl">
        <div className="bg-gradient-to-br from-neon-orange to-neon-yellow p-1 rounded-3xl shadow-retro">
          <div className="bg-white rounded-3xl p-8 glass-card max-h-[95vh] overflow-y-auto">
            <h1 className="text-4xl font-black text-center mb-2 rainbow-text">
              COMPLETE YOUR PROFILE
            </h1>
            <p className="text-center text-neon-orange font-bold mb-8">
              Tell us about yourself
            </p>

            <div className="divider-90s mb-6"></div>

            <form onSubmit={handleSubmit} className="space-y-8">
              {/* BASIC INFO */}
              <div className="bg-gradient-to-r from-neon-pink/5 to-neon-orange/5 p-4 rounded-2xl border-2 border-neon-pink">
                <h2 className="text-xl font-black text-neon-pink mb-4 uppercase">👤 Basic Info</h2>

                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-black text-neon-pink mb-2 uppercase">Name</label>
                    <input
                      type="text"
                      value={profile.first_name}
                      onChange={(e) => setProfile({ ...profile, first_name: e.target.value })}
                      placeholder="Your name"
                      required
                      className="w-full px-4 py-3 border-4 border-neon-cyan rounded-xl focus:outline-none focus:border-neon-pink transition text-dark-text font-bold"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-black text-neon-pink mb-2 uppercase">Age</label>
                    <input
                      type="number"
                      value={profile.age}
                      onChange={(e) => setProfile({ ...profile, age: e.target.value })}
                      placeholder="28-43"
                      min="28"
                      max="43"
                      required
                      className="w-full px-4 py-3 border-4 border-neon-cyan rounded-xl focus:outline-none focus:border-neon-pink transition text-dark-text font-bold"
                    />
                  </div>
                </div>
              </div>

              {/* LOCATION & BACKGROUND */}
              <div className="bg-gradient-to-r from-neon-cyan/5 to-neon-lime/5 p-4 rounded-2xl border-2 border-neon-cyan">
                <h2 className="text-xl font-black text-neon-cyan mb-4 uppercase">🌍 Location & Background</h2>

                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-black text-neon-cyan mb-2 uppercase">Hometown</label>
                    <input
                      type="text"
                      value={profile.hometown}
                      onChange={(e) => setProfile({ ...profile, hometown: e.target.value })}
                      placeholder="City, State"
                      required
                      className="w-full px-4 py-3 border-4 border-neon-cyan rounded-xl focus:outline-none focus:border-neon-blue transition text-dark-text font-bold"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-black text-neon-cyan mb-2 uppercase">Current City</label>
                    <input
                      type="text"
                      value={profile.current_city}
                      onChange={(e) => setProfile({ ...profile, current_city: e.target.value })}
                      placeholder="City, State"
                      required
                      className="w-full px-4 py-3 border-4 border-neon-cyan rounded-xl focus:outline-none focus:border-neon-blue transition text-dark-text font-bold"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-black text-neon-cyan mb-2 uppercase">College</label>
                    <select
                      value={profile.college}
                      onChange={(e) => setProfile({ ...profile, college: e.target.value })}
                      required
                      className="w-full px-4 py-3 border-4 border-neon-cyan rounded-xl focus:outline-none focus:border-neon-blue transition text-dark-text font-bold"
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
                    <label className="block text-sm font-black text-neon-cyan mb-2 uppercase">Profession</label>
                    <select
                      value={profile.profession}
                      onChange={(e) => setProfile({ ...profile, profession: e.target.value })}
                      required
                      className="w-full px-4 py-3 border-4 border-neon-cyan rounded-xl focus:outline-none focus:border-neon-blue transition text-dark-text font-bold"
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

                  <div>
                    <label className="block text-sm font-black text-neon-cyan mb-2 uppercase">Ethnic Background</label>
                    <select
                      value={profile.ethnic_background}
                      onChange={(e) => setProfile({ ...profile, ethnic_background: e.target.value })}
                      required
                      className="w-full px-4 py-3 border-4 border-neon-cyan rounded-xl focus:outline-none focus:border-neon-blue transition text-dark-text font-bold"
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
                    <label className="block text-sm font-black text-neon-cyan mb-2 uppercase">Religion</label>
                    <select
                      value={profile.religion}
                      onChange={(e) => setProfile({ ...profile, religion: e.target.value })}
                      required
                      className="w-full px-4 py-3 border-4 border-neon-cyan rounded-xl focus:outline-none focus:border-neon-blue transition text-dark-text font-bold"
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
                </div>
              </div>

              {/* PHOTOS */}
              <div className="bg-gradient-to-r from-neon-purple/5 to-neon-blue/5 p-4 rounded-2xl border-2 border-neon-purple">
                <h2 className="text-xl font-black text-neon-purple mb-4 uppercase">📸 Photos ({profile.photo_urls.length}/6)</h2>

                {/* Photo Upload */}
                {profile.photo_urls.length < 6 && (
                  <div className="mb-4">
                    <label className="block cursor-pointer">
                      <div className="border-4 border-dashed border-neon-purple rounded-xl p-4 text-center hover:bg-neon-purple/5 transition">
                        <p className="text-neon-purple font-black text-sm">📤 Click to upload photos</p>
                        <p className="text-xs text-neon-purple/60">{6 - profile.photo_urls.length} remaining</p>
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
                  </div>
                )}

                {/* Photo Grid */}
                {profile.photo_urls.length > 0 && (
                  <div className="grid grid-cols-3 gap-3">
                    {profile.photo_urls.map((photo, idx) => (
                      <div key={idx} className="relative">
                        <img
                          src={photo}
                          alt={`Photo ${idx + 1}`}
                          className="w-full h-24 object-cover rounded-lg border-2 border-neon-purple"
                        />
                        <button
                          type="button"
                          onClick={() => handleRemovePhoto(idx)}
                          className="absolute -top-2 -right-2 bg-neon-red text-white rounded-full w-6 h-6 flex items-center justify-center font-black text-sm hover:bg-neon-orange"
                        >
                          ✕
                        </button>
                      </div>
                    ))}
                  </div>
                )}
              </div>

              {/* INTERESTS */}
              <div className="bg-gradient-to-r from-neon-pink/5 to-neon-lime/5 p-4 rounded-2xl border-2 border-neon-pink">
                <h2 className="text-xl font-black text-neon-pink mb-4 uppercase">✨ Your Interests ({profile.interests.length})</h2>

                {profile.interests.length > 0 && (
                  <div className="mb-4 flex flex-wrap gap-3 p-3 bg-neon-cyan/10 rounded-xl">
                    {profile.interests.map((interest) => (
                      <button
                        key={interest}
                        type="button"
                        onClick={() => handleRemoveInterest(interest)}
                        className="bg-gradient-to-r from-neon-cyan to-neon-lime text-dark-text px-3 py-1 rounded-full text-sm font-black hover:shadow-neon-cyan transition"
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
                      className={`px-3 py-2 rounded-full text-xs font-black transition ${
                        profile.interests.includes(interest)
                          ? 'bg-neon-pink text-white shadow-neon-pink'
                          : 'border-2 border-neon-purple text-neon-purple hover:bg-neon-purple hover:text-white'
                      }`}
                    >
                      {interest}
                    </button>
                  ))}
                </div>
              </div>

              {/* REASON FOR JOINING */}
              <div className="bg-gradient-to-r from-neon-lime/5 to-neon-cyan/5 p-4 rounded-2xl border-2 border-neon-lime">
                <h2 className="text-xl font-black text-neon-lime mb-4 uppercase">💭 Why are you joining Gen Dial Up?</h2>
                <textarea
                  value={profile.reason_for_joining}
                  onChange={(e) => setProfile({ ...profile, reason_for_joining: e.target.value })}
                  placeholder="Tell us what you're looking for..."
                  required
                  rows={4}
                  className="w-full px-4 py-3 border-4 border-neon-cyan rounded-xl focus:outline-none focus:border-neon-lime transition text-dark-text font-bold resize-none"
                />
              </div>

              {/* Messages */}
              {successMessage && (
                <div className="p-4 bg-gradient-to-r from-neon-lime to-neon-cyan border-4 border-neon-lime rounded-xl text-dark-text font-black text-center shadow-lg">
                  ✅ {successMessage}
                </div>
              )}

              {error && (
                <div className="p-4 bg-gradient-to-r from-neon-red to-neon-orange border-4 border-neon-red rounded-xl text-white font-black text-center shadow-lg">
                  {error}
                </div>
              )}

              {/* Submit Button */}
              <button
                type="submit"
                disabled={saving || uploadingPhotos || !profile.first_name || !profile.age || profile.interests.length === 0}
                className="btn-90s w-full bg-gradient-to-r from-neon-cyan to-neon-lime text-dark-text font-black py-4 px-6 rounded-full transition shadow-neon-cyan hover:shadow-lg border-0 text-lg uppercase disabled:opacity-50"
              >
                {saving ? '⏳ Saving...' : '🚀 Continue to Matches 🚀'}
              </button>
            </form>

            <div className="divider-90s my-6"></div>

            <p className="text-center font-bold text-neon-purple text-sm">
              ✌️ Complete your profile to find your people ✌️
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}
