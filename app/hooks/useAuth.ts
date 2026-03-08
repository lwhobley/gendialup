import { useEffect } from 'react'
import { supabase } from '@/lib/supabase-client'
import { useAuthStore } from '@/store/auth'

export const useAuth = () => {
  const { user, isLoading, setUser, setLoading } = useAuthStore()

  useEffect(() => {
    const checkAuth = async () => {
      try {
        const { data: { user } } = await supabase.auth.getUser()
        setUser(user || null)
      } finally {
        setLoading(false)
      }
    }

    checkAuth()

    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      (event, session) => {
        setUser(session?.user || null)
      }
    )

    return () => subscription?.unsubscribe()
  }, [setUser, setLoading])

  return { user, isLoading }
}
