export interface User {
  id: string
  email?: string
  phone?: string
  created_at: string
}

export interface Profile {
  id: string
  firstName: string
  age: number
  interests: string[]
  trustScore: number
  profileComplete: boolean
}

export interface Match {
  id: string
  userAId: string
  userBId: string
  status: 'pending' | 'mutual' | 'declined' | 'expired'
}

export interface Message {
  id: string
  chatId: string
  senderId: string
  text?: string
  createdAt: string
}
