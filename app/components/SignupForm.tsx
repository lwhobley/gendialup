'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { supabase } from '@/lib/supabase-client'

export default function SignupForm() {
  const router = useRouter()
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)

  const handleSignup = async (e: React.FormEvent) => {
    e.preventDefault()
    setError('')
    setLoading(true)

    // Validate passwords match
    if (password !== confirmPassword) {
      setError('Passwords do not match')
      setLoading(false)
      return
    }

    // Validate password strength
    if (password.length < 8) {
      setError('Password must be at least 8 characters')
      setLoading(false)
      return
    }

    try {
      const { error } = await supabase.auth.signUp({
        email,
        password,
        options: {
          emailRedirectTo: `${process.env.NEXT_PUBLIC_APP_URL}/auth/callback`,
        },
      })

      if (error) {
        setError(error.message)
        setLoading(false)
        return
      }

      // Signup successful - redirect to profile setup
      router.push('/onboarding')
    } catch (err) {
      setError('An error occurred. Please try again.')
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-cream to-warm-gray/15 flex items-center justify-center px-4">
      <div className="w-full max-w-md bg-white rounded-2xl shadow-lg p-8">
        <h1 className="text-3xl font-bold text-dark-text mb-2 text-center">
          Gen Dial Up
        </h1>
        <p className="text-light-text text-center mb-8">
          Create your account
        </p>

        <form onSubmit={handleSignup} className="space-y-4">
          {/* Email Input */}
          <div>
            <label className="block text-sm font-medium text-dark-text mb-2">
              Email
            </label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="you@example.com"
              required
              className="w-full px-4 py-3 border-2 border-warm-gray rounded-lg focus:outline-none focus:border-sage transition"
            />
          </div>

          {/* Password Input */}
          <div>
            <label className="block text-sm font-medium text-dark-text mb-2">
              Password
            </label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="••••••••"
              required
              className="w-full px-4 py-3 border-2 border-warm-gray rounded-lg focus:outline-none focus:border-sage transition"
            />
            <p className="text-xs text-light-text mt-1">
              Minimum 8 characters
            </p>
          </div>

          {/* Confirm Password Input */}
          <div>
            <label className="block text-sm font-medium text-dark-text mb-2">
              Confirm Password
            </label>
            <input
              type="password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              placeholder="••••••••"
              required
              className="w-full px-4 py-3 border-2 border-warm-gray rounded-lg focus:outline-none focus:border-sage transition"
            />
          </div>

          {/* Error Message */}
          {error && (
            <div className="p-3 bg-red-100 border-l-4 border-red-500 text-red-700 text-sm">
              {error}
            </div>
          )}

          {/* Signup Button */}
          <button
            type="submit"
            disabled={loading}
            className="w-full bg-sage hover:bg-sage/90 disabled:bg-sage/50 text-white font-semibold py-3 px-4 rounded-lg transition"
          >
            {loading ? 'Creating account...' : 'Sign Up'}
          </button>
        </form>

        {/* Login Link */}
        <p className="text-center text-light-text mt-6">
          Already have an account?{' '}
          <a href="/login" className="text-sage font-semibold hover:underline">
            Log in
          </a>
        </p>
      </div>
    </div>
  )
}
