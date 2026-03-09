/* eslint-disable react/no-unescaped-entities */
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

      router.push('/onboarding')
    } catch (err) {
      setError('An error occurred. Please try again.')
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-gradient-90s-cool relative overflow-hidden flex items-center justify-center px-4 py-8">
      {/* Background shapes */}
      <div className="absolute top-20 left-20 w-56 h-56 bg-neon-cyan opacity-20 shape-blob blur-3xl"></div>
      <div className="absolute bottom-20 right-10 w-48 h-48 bg-neon-purple opacity-15 shape-blob blur-3xl"></div>
      <div className="absolute inset-0 grid-background pointer-events-none"></div>

      {/* Card */}
      <div className="relative z-10 w-full max-w-md">
        <div className="bg-gradient-to-br from-neon-purple to-neon-blue p-1 rounded-3xl shadow-retro">
          <div className="bg-white rounded-3xl p-8 glass-card">
            <h1 className="text-4xl font-black text-center mb-2 rainbow-text">
              SIGN UP
            </h1>
            <p className="text-center text-neon-purple font-bold mb-8">
              Join the Gen Dial Up community
            </p>

            <div className="divider-90s mb-6"></div>

            <form onSubmit={handleSignup} className="space-y-6">
              {/* Email Input */}
              <div>
                <label className="block text-sm font-black text-neon-purple mb-3 uppercase">
                  📧 Email
                </label>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="you@example.com"
                  required
                  className="w-full px-4 py-3 border-4 border-neon-cyan rounded-xl focus:outline-none focus:border-neon-purple transition text-dark-text font-bold"
                />
              </div>

              {/* Password Input */}
              <div>
                <label className="block text-sm font-black text-neon-purple mb-3 uppercase">
                  🔐 Password
                </label>
                <input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••"
                  required
                  className="w-full px-4 py-3 border-4 border-neon-cyan rounded-xl focus:outline-none focus:border-neon-purple transition text-dark-text font-bold"
                />
                <p className="text-xs font-bold text-neon-cyan mt-2">
                  Minimum 8 characters
                </p>
              </div>

              {/* Confirm Password Input */}
              <div>
                <label className="block text-sm font-black text-neon-purple mb-3 uppercase">
                  ✓ Confirm Password
                </label>
                <input
                  type="password"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  placeholder="••••••••"
                  required
                  className="w-full px-4 py-3 border-4 border-neon-cyan rounded-xl focus:outline-none focus:border-neon-purple transition text-dark-text font-bold"
                />
              </div>

              {/* Error Message */}
              {error && (
                <div className="p-4 bg-gradient-to-r from-neon-red to-neon-orange border-4 border-neon-red rounded-xl text-white font-bold text-center shadow-lg">
                  {error}
                </div>
              )}

              {/* Signup Button */}
              <button
                type="submit"
                disabled={loading}
                className="btn-90s w-full bg-gradient-to-r from-neon-lime to-neon-cyan text-dark-text font-black py-4 px-6 rounded-full transition shadow-neon-cyan hover:shadow-lg border-0 text-lg uppercase"
              >
                {loading ? '⏳ Creating account...' : '🚀 Sign Up 🚀'}
              </button>
            </form>

            <div className="divider-90s my-6"></div>

            {/* Login Link */}
            <p className="text-center font-bold">
              <span className="text-dark-text">Already have an account? </span>
              <a
                href="/login"
                className="text-neon-purple hover:text-neon-blue font-black uppercase transition"
              >
                Login
              </a>
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}
