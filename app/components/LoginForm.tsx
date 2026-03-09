/* eslint-disable react/no-unescaped-entities */
'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { supabase } from '@/lib/supabase-client'
import NostalgiaImageCollage from './NostalgiaImageCollage'

export default function LoginForm() {
  const router = useRouter()
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault()
    setError('')
    setLoading(true)

    try {
      const { error } = await supabase.auth.signInWithPassword({
        email,
        password,
      })

      if (error) {
        setError(error.message)
        setLoading(false)
        return
      }

      router.push('/matches')
    } catch (err) {
      setError('An error occurred. Please try again.')
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-gradient-90s-neon relative overflow-hidden flex items-center justify-center px-4 py-8">
      {/* 90s Image Collage Background */}
      <NostalgiaImageCollage />

      {/* Grid overlay */}
      <div className="absolute inset-0 grid-background pointer-events-none"></div>

      {/* Card */}
      <div className="relative z-10 w-full max-w-md">
        <div className="bg-gradient-to-br from-neon-pink to-neon-orange p-1 rounded-3xl shadow-retro">
          <div className="bg-white rounded-3xl p-8 glass-card">
            <h1 className="text-4xl font-black text-center mb-2 rainbow-text">
              LOGIN
            </h1>
            <p className="text-center text-neon-cyan font-bold mb-8">
              Welcome back to Gen Dial Up
            </p>

            <div className="divider-90s mb-6"></div>

            <form onSubmit={handleLogin} className="space-y-6">
              {/* Email Input */}
              <div>
                <label className="block text-sm font-black text-neon-pink mb-3 uppercase">
                  📧 Email
                </label>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="you@example.com"
                  required
                  className="w-full px-4 py-3 border-4 border-neon-cyan rounded-xl focus:outline-none focus:border-neon-pink transition text-dark-text font-bold"
                />
              </div>

              {/* Password Input */}
              <div>
                <label className="block text-sm font-black text-neon-pink mb-3 uppercase">
                  🔐 Password
                </label>
                <input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••"
                  required
                  className="w-full px-4 py-3 border-4 border-neon-cyan rounded-xl focus:outline-none focus:border-neon-pink transition text-dark-text font-bold"
                />
              </div>

              {/* Error Message */}
              {error && (
                <div className="p-4 bg-gradient-to-r from-neon-red to-neon-orange border-4 border-neon-red rounded-xl text-white font-bold text-center shadow-lg">
                  {error}
                </div>
              )}

              {/* Login Button */}
              <button
                type="submit"
                disabled={loading}
                className="btn-90s w-full bg-gradient-to-r from-neon-cyan to-neon-lime text-dark-text font-black py-4 px-6 rounded-full transition shadow-neon-cyan hover:shadow-lg border-0 text-lg uppercase"
              >
                {loading ? '⏳ Logging in...' : '✨ Login ✨'}
              </button>
            </form>

            <div className="divider-90s my-6"></div>

            {/* Sign Up Link */}
            <p className="text-center font-bold">
              <span className="text-dark-text">Don&apos;t have an account? </span>
              <a
                href="/signup"
                className="text-neon-pink hover:text-neon-orange font-black uppercase transition"
              >
                Sign Up
              </a>
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}
