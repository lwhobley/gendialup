'use client'

import { useAuth } from '@/hooks/useAuth'
import { useRouter } from 'next/navigation'
import { useEffect } from 'react'

export default function Home() {
  const { user, loading } = useAuth()
  const router = useRouter()

  useEffect(() => {
    if (!loading) {
      if (user) {
        router.push('/matches')
      } else {
        router.push('/signup')
      }
    }
  }, [user, loading, router])

  return (
    <div className="min-h-screen bg-white flex items-center justify-center">
      <p className="text-sm tracking-widest text-gray-400 uppercase">Loading...</p>
    </div>
  )
}
