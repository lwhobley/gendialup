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

    if (password !== confirmPassword) {
      setError('Passwords do not match')
      setLoading(false)
      return
    }

    if (password.length < 8) {
      setError('Password must be at least 8 characters')
      setLoading(false)
      return
    }

    try {
      const { data, error: signupError } = await supabase.auth.signUp({
        email,
        password,
        options: {
          emailRedirectTo: `${process.env.NEXT_PUBLIC_APP_URL}/auth/callback`,
        },
      })

      if (signupError) {
        setError(signupError.message)
        setLoading(false)
        return
      }

      if (!data.user) {
        setError('Failed to create account')
        setLoading(false)
        return
      }

      await new Promise(resolve => setTimeout(resolve, 500))
      router.push('/onboarding')
    } catch (err) {
      console.error('Signup error:', err)
      setError('An error occurred. Please try again.')
      setLoading(false)
    }
  }

  return (
    <div className="w-full max-w-md">
      <div className="mb-8">
        <h1 className="text-4xl font-light tracking-tight text-black mb-2">
          Join Gen Dial Up
        </h1>
        <p className="text-sm text-gray-600">For Millennials. For friendship.</p>
      </div>

      <form onSubmit={handleSignup} className="space-y-6">
        <div>
          <label className="block text-xs font-semibold text-gray-700 uppercase tracking-widest mb-3">
            Email
          </label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="you@example.com"
            required
            className="w-full px-0 py-3 bg-transparent border-b border-gray-300 focus:border-black outline-none transition text-base placeholder-gray-300"
          />
        </div>

        <div>
          <label className="block text-xs font-semibold text-gray-700 uppercase tracking-widest mb-3">
            Password
          </label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="••••••••"
            required
            className="w-full px-0 py-3 bg-transparent border-b border-gray-300 focus:border-black outline-none transition text-base placeholder-gray-300"
          />
          <p className="text-xs text-gray-500 mt-2">Minimum 8 characters</p>
        </div>

        <div>
          <label className="block text-xs font-semibold text-gray-700 uppercase tracking-widest mb-3">
            Confirm Password
          </label>
          <input
            type="password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            placeholder="••••••••"
            required
            className="w-full px-0 py-3 bg-transparent border-b border-gray-300 focus:border-black outline-none transition text-base placeholder-gray-300"
          />
        </div>

        {error && (
          <div className="p-4 bg-red-50 border border-red-200 rounded-lg text-sm text-red-600">
            {error}
          </div>
        )}

        <button
          type="submit"
          disabled={loading}
          className="w-full bg-black text-white py-3 rounded-lg text-sm font-medium hover:bg-gray-900 transition disabled:opacity-50 mt-8"
        >
          {loading ? 'Creating account...' : 'Create Account'}
        </button>
      </form>

      <div className="mt-8 text-center">
        <p className="text-sm text-gray-700">
          Already have an account?{' '}
          <a
            href="/login"
            className="text-black font-medium hover:underline"
          >
            Sign in
          </a>
        </p>
      </div>
    </div>
  )
}
