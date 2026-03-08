# Gen Dial Up - Complete Implementation Guide

## Table of Contents
1. [Architecture Overview](#architecture-overview)
2. [Tech Stack](#tech-stack)
3. [Backend Setup](#backend-setup)
4. [Frontend Implementation](#frontend-implementation)
5. [Database Schema](#database-schema)
6. [Matching Algorithm](#matching-algorithm)
7. [Security & Privacy](#security--privacy)
8. [Deployment](#deployment)

---

## Architecture Overview

```
┌──────────────────────────────────────────────────────────────┐
│                    Gen Dial Up Platform                       │
├──────────────────────────────────────────────────────────────┤
│                                                               │
│  ┌────────────────────┐  ┌────────────────────┐            │
│  │   Mobile (React    │  │   Web (React +     │            │
│  │   Native/Expo)     │  │   Next.js PWA)     │            │
│  │                    │  │                    │            │
│  │  • Bottom nav      │  │  • Sidebar nav     │            │
│  │  • Touch-optimized │  │  • Responsive grid │            │
│  │  • Expo Camera     │  │  • Drag-drop       │            │
│  └────────────────────┘  └────────────────────┘            │
│           │                       │                          │
│           └───────────┬───────────┘                          │
│                       │                                      │
│         (Shared API Base URL via .env)                       │
│                       │                                      │
│  ┌────────────────────────────────────────┐                │
│  │        API Layer (Next.js/Node.js)     │                │
│  │                                        │                │
│  │  Routes:                               │                │
│  │  • /api/auth/* (Firebase Auth)         │                │
│  │  • /api/profiles/*                     │                │
│  │  • /api/matches/*                      │                │
│  │  • /api/meetups/*                      │                │
│  │  • /api/messages/*                     │                │
│  │  • /api/venues/*                       │                │
│  │  • /api/uploads/* (Cloud Storage)      │                │
│  │  • /api/verify/* (Background checks)   │                │
│  │  • /api/social/* (OAuth integration)   │                │
│  └────────────────────────────────────────┘                │
│           │                                                 │
│  ┌────────┴────────────────────────┐                       │
│  │    Backend Services             │                       │
│  │  (Firebase / Supabase)          │                       │
│  │                                 │                       │
│  │  • Authentication               │                       │
│  │  • Firestore / PostgreSQL       │                       │
│  │  • Cloud Storage                │                       │
│  │  • Cloud Functions              │                       │
│  │  • Real-time Database           │                       │
│  └────────────────────────────────┘                        │
│                                                              │
└──────────────────────────────────────────────────────────────┘
```

---

## Tech Stack

### Frontend
- **Mobile**: React Native (Expo SDK 50+)
- **Web**: Next.js 14 (App Router) + React 18
- **State Management**: React Query + Zustand
- **UI Components**: Tailwind CSS + custom design system
- **Maps**: `react-native-maps` (mobile), Google Maps JS API (web)
- **Camera**: `expo-image-picker` (mobile), HTML5 File Input (web)
- **Notifications**: Expo Notifications (mobile), Firebase Cloud Messaging (web)
- **Forms**: React Hook Form + Zod validation

### Backend
- **Primary**: Supabase (PostgreSQL + Auth + Storage)
  - Alternative: Firebase (Firestore + Auth + Storage)
- **API**: Next.js API Routes or Node.js Express
- **Real-time**: Supabase Realtime (PostgreSQL LISTEN/NOTIFY) or Firebase Realtime DB
- **Payments**: Stripe (premium features)
- **Background Jobs**: Cloud Functions or Bull/Agenda
- **Email**: SendGrid or Firebase Cloud Messaging

### DevOps & Hosting
- **Web Hosting**: Vercel (Next.js native)
- **Mobile Build**: Expo EAS Build & Expo Go
- **Database Hosting**: Supabase (AWS-backed)
- **File Storage**: Supabase Storage (AWS S3-backed) or Firebase Cloud Storage
- **CDN**: Vercel Edge Network + Supabase edge functions

---

## Backend Setup

### 1. Supabase Project Setup

```bash
# Install Supabase CLI
npm install -g supabase

# Login to Supabase
supabase login

# Create new project (via dashboard or CLI)
supabase projects create --name "gen-dial-up"

# Initialize local supabase
supabase init
```

### 2. Environment Variables

Create `.env.local`:
```env
# Supabase
NEXT_PUBLIC_SUPABASE_URL=https://xxxxx.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=xxxxx
SUPABASE_SERVICE_ROLE_KEY=xxxxx

# OAuth (Meta Graph API for Instagram)
NEXT_PUBLIC_INSTAGRAM_APP_ID=xxxxx
INSTAGRAM_APP_SECRET=xxxxx

# Google
NEXT_PUBLIC_GOOGLE_CLIENT_ID=xxxxx
GOOGLE_CLIENT_SECRET=xxxxx

# Stripe (Premium features)
NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=pk_live_xxxxx
STRIPE_SECRET_KEY=sk_live_xxxxx

# Google Maps
NEXT_PUBLIC_GOOGLE_MAPS_API_KEY=xxxxx

# SendGrid Email
SENDGRID_API_KEY=xxxxx

# JWT Secret (for custom tokens)
JWT_SECRET=xxxxx

# App URLs
NEXT_PUBLIC_APP_URL=https://gendialup.com
NEXT_PUBLIC_API_URL=https://api.gendialup.com
```

### 3. Database Setup (PostgreSQL via Supabase)

Run these migrations in Supabase SQL Editor:

```sql
-- Create users table (extends Supabase auth.users)
CREATE TABLE public.profiles (
  id UUID PRIMARY KEY REFERENCES auth.users(id),
  first_name VARCHAR(50) NOT NULL,
  display_name VARCHAR(50),
  birthdate DATE NOT NULL,
  age INT NOT NULL,
  pronouns TEXT[] DEFAULT ARRAY[]::TEXT[],
  
  -- Photos
  primary_photo_url TEXT,
  photos JSONB DEFAULT '[]'::JSONB, -- [{url, isPrimary, prompt}]
  
  -- Bio
  bio_headline VARCHAR(100),
  bio_full TEXT,
  conversation_starters JSONB DEFAULT '{}'::JSONB,
  
  -- Life stage
  relationship_status VARCHAR(50),
  living_situation VARCHAR(50),
  work_style VARCHAR(50),
  kids VARCHAR(50),
  pets TEXT[] DEFAULT ARRAY[]::TEXT[],
  
  -- Interests (max 8)
  interests TEXT[] DEFAULT ARRAY[]::TEXT[],
  
  -- Availability
  availability JSONB DEFAULT '{
    "weekdayLunch": false,
    "weekdayAfterWork": false,
    "weekdayEvening": false,
    "weekendMorning": false,
    "weekendAfternoon": false,
    "weekendEvening": false
  }'::JSONB,
  
  -- Location
  location_city VARCHAR(100),
  location_neighborhood VARCHAR(100),
  location_state VARCHAR(50),
  location_geo GEOGRAPHY(POINT, 4326),
  radius_miles INT DEFAULT 5,
  willing_to_travel BOOLEAN DEFAULT false,
  
  -- Meetup preferences
  venue_vibes TEXT[] DEFAULT ARRAY[]::TEXT[],
  group_size_preference VARCHAR(50),
  first_meetup_style VARCHAR(50),
  
  -- Social media
  social_media JSONB DEFAULT '{
    "instagram": {"connected": false},
    "facebook": {"connected": false},
    "linkedin": {"connected": false}
  }'::JSONB,
  
  -- Verification
  phone_verified BOOLEAN DEFAULT false,
  phone_verified_at TIMESTAMP,
  photo_verified BOOLEAN DEFAULT false,
  photo_verified_at TIMESTAMP,
  background_check_id VARCHAR(100),
  background_check_status VARCHAR(50), -- pending, approved, denied
  
  trust_score INT DEFAULT 0, -- 0-100
  profile_complete BOOLEAN DEFAULT false,
  profile_strength INT DEFAULT 0, -- 0-100
  
  -- Discovery settings
  interested_in TEXT[] DEFAULT ARRAY['Women', 'Men', 'Non-binary']::TEXT[],
  age_range_min INT DEFAULT 28,
  age_range_max INT DEFAULT 43,
  match_frequency VARCHAR(50) DEFAULT 'weekly', -- daily, weekly, bi-weekly
  is_paused BOOLEAN DEFAULT false,
  
  created_at TIMESTAMP DEFAULT NOW(),
  updated_at TIMESTAMP DEFAULT NOW(),
  last_active TIMESTAMP DEFAULT NOW()
);

-- Create matches table
CREATE TABLE public.matches (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_a_id UUID NOT NULL REFERENCES auth.users(id),
  user_b_id UUID NOT NULL REFERENCES auth.users(id),
  
  shared_interests TEXT[] DEFAULT ARRAY[]::TEXT[],
  
  status VARCHAR(50) DEFAULT 'pending', -- pending, mutual, declined, expired
  user_a_interested BOOLEAN DEFAULT false,
  user_b_interested BOOLEAN DEFAULT false,
  
  created_at TIMESTAMP DEFAULT NOW(),
  expires_at TIMESTAMP DEFAULT (NOW() + INTERVAL '7 days'),
  
  CONSTRAINT different_users CHECK (user_a_id != user_b_id),
  UNIQUE(user_a_id, user_b_id, created_at)
);

-- Create meetups table
CREATE TABLE public.meetups (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  match_id UUID NOT NULL REFERENCES public.matches(id),
  user_a_id UUID NOT NULL REFERENCES auth.users(id),
  user_b_id UUID NOT NULL REFERENCES auth.users(id),
  
  venue_id VARCHAR(255), -- Google Places ID
  venue_name VARCHAR(255),
  venue_address TEXT,
  venue_geo GEOGRAPHY(POINT, 4326),
  
  scheduled_at TIMESTAMP NOT NULL,
  status VARCHAR(50) DEFAULT 'scheduled', -- scheduled, completed, cancelled, no-show
  
  chat_unlocked BOOLEAN DEFAULT false,
  check_in_a BOOLEAN DEFAULT false,
  check_in_b BOOLEAN DEFAULT false,
  
  feedback_a JSONB, -- {attended, rating, comment}
  feedback_b JSONB,
  
  created_at TIMESTAMP DEFAULT NOW(),
  updated_at TIMESTAMP DEFAULT NOW()
);

-- Create chats table
CREATE TABLE public.chats (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  match_id UUID REFERENCES public.matches(id),
  meetup_id UUID REFERENCES public.meetups(id),
  
  user_a_id UUID NOT NULL REFERENCES auth.users(id),
  user_b_id UUID NOT NULL REFERENCES auth.users(id),
  
  last_message_text TEXT,
  last_message_sender_id UUID,
  last_message_at TIMESTAMP,
  
  user_a_archived BOOLEAN DEFAULT false,
  user_b_archived BOOLEAN DEFAULT false,
  
  created_at TIMESTAMP DEFAULT NOW(),
  updated_at TIMESTAMP DEFAULT NOW()
);

-- Create messages table
CREATE TABLE public.messages (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  chat_id UUID NOT NULL REFERENCES public.chats(id) ON DELETE CASCADE,
  
  sender_id UUID NOT NULL REFERENCES auth.users(id),
  text TEXT,
  image_url TEXT,
  
  read BOOLEAN DEFAULT false,
  read_at TIMESTAMP,
  
  created_at TIMESTAMP DEFAULT NOW()
);

-- Create venues table (partner venues)
CREATE TABLE public.venues (
  id VARCHAR(255) PRIMARY KEY, -- Google Places ID
  
  name VARCHAR(255) NOT NULL,
  address TEXT NOT NULL,
  geo GEOGRAPHY(POINT, 4326) NOT NULL,
  
  vibes TEXT[] DEFAULT ARRAY[]::TEXT[],
  photos TEXT[] DEFAULT ARRAY[]::TEXT[],
  
  hours JSONB DEFAULT '{}'::JSONB, -- {monday: {open, close}, ...}
  amenities JSONB DEFAULT '{
    "wifi": false,
    "outletAccess": false,
    "parking": false,
    "dogFriendly": false,
    "kidFriendly": false
  }'::JSONB,
  
  partner_venue BOOLEAN DEFAULT false,
  contact_phone VARCHAR(20),
  safety_trained BOOLEAN DEFAULT false,
  
  created_at TIMESTAMP DEFAULT NOW(),
  updated_at TIMESTAMP DEFAULT NOW()
);

-- Create blocks table (user blocks)
CREATE TABLE public.blocks (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  blocker_id UUID NOT NULL REFERENCES auth.users(id),
  blocked_id UUID NOT NULL REFERENCES auth.users(id),
  
  reason VARCHAR(255),
  created_at TIMESTAMP DEFAULT NOW(),
  
  CONSTRAINT different_users CHECK (blocker_id != blocked_id),
  UNIQUE(blocker_id, blocked_id)
);

-- Create reports table
CREATE TABLE public.reports (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  reporter_id UUID NOT NULL REFERENCES auth.users(id),
  reported_id UUID NOT NULL REFERENCES auth.users(id),
  
  reason VARCHAR(255) NOT NULL,
  description TEXT,
  
  status VARCHAR(50) DEFAULT 'pending', -- pending, investigating, resolved
  
  created_at TIMESTAMP DEFAULT NOW(),
  resolved_at TIMESTAMP,
  
  CONSTRAINT different_users CHECK (reporter_id != reported_id)
);

-- Indexes for performance
CREATE INDEX idx_profiles_location ON public.profiles USING GIST(location_geo);
CREATE INDEX idx_profiles_age ON public.profiles(age);
CREATE INDEX idx_profiles_created_at ON public.profiles(created_at DESC);
CREATE INDEX idx_matches_user_a ON public.matches(user_a_id);
CREATE INDEX idx_matches_user_b ON public.matches(user_b_id);
CREATE INDEX idx_matches_status ON public.matches(status);
CREATE INDEX idx_meetups_users ON public.meetups(user_a_id, user_b_id);
CREATE INDEX idx_messages_chat ON public.messages(chat_id);
CREATE INDEX idx_messages_sender ON public.messages(sender_id);
CREATE INDEX idx_chats_users ON public.chats(user_a_id, user_b_id);

-- Enable Row Level Security
ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.matches ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.meetups ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.chats ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.messages ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.blocks ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.reports ENABLE ROW LEVEL SECURITY;
```

### 4. Row-Level Security (RLS) Policies

```sql
-- Profiles: Users can read their own + verified profiles, only edit own
CREATE POLICY "Users can view their own profile" ON public.profiles
  FOR SELECT USING (auth.uid() = id);

CREATE POLICY "Users can edit their own profile" ON public.profiles
  FOR UPDATE USING (auth.uid() = id);

CREATE POLICY "Users can view verified profiles" ON public.profiles
  FOR SELECT USING (
    auth.uid() IS NOT NULL 
    AND (id = auth.uid() OR profile_complete = true)
  );

-- Matches: Users can view their own matches
CREATE POLICY "Users can view their matches" ON public.matches
  FOR SELECT USING (
    auth.uid() = user_a_id 
    OR auth.uid() = user_b_id
  );

CREATE POLICY "Users can create matches" ON public.matches
  FOR INSERT WITH CHECK (
    auth.uid() = user_a_id 
    OR auth.uid() = user_b_id
  );

-- Messages: Users can read/write only their own chat messages
CREATE POLICY "Users can read their messages" ON public.messages
  FOR SELECT USING (
    chat_id IN (
      SELECT id FROM public.chats 
      WHERE user_a_id = auth.uid() OR user_b_id = auth.uid()
    )
  );

CREATE POLICY "Users can send messages" ON public.messages
  FOR INSERT WITH CHECK (
    auth.uid() = sender_id 
    AND chat_id IN (
      SELECT id FROM public.chats 
      WHERE user_a_id = auth.uid() OR user_b_id = auth.uid()
    )
  );
```

---

## Frontend Implementation

### Project Structure

```
gen-dial-up/
├── apps/
│   ├── web/              # Next.js web app
│   │   ├── app/
│   │   │   ├── page.tsx             # Welcome
│   │   │   ├── onboarding/          # Onboarding flow
│   │   │   ├── matches/             # Matches screen
│   │   │   ├── chat/                # Chat screen
│   │   │   ├── venues/              # Venue finder
│   │   │   ├── profile/             # Profile screen
│   │   │   └── api/                 # API routes
│   │   ├── components/
│   │   │   ├── MatchCard.tsx
│   │   │   ├── ChatBubble.tsx
│   │   │   ├── VenueCard.tsx
│   │   │   └── ...
│   │   ├── hooks/
│   │   │   ├── useMatches.ts
│   │   │   ├── useChat.ts
│   │   │   └── useProfile.ts
│   │   ├── lib/
│   │   │   ├── supabase-client.ts
│   │   │   ├── api.ts
│   │   │   └── validators.ts
│   │   └── styles/
│   │       └── globals.css
│   │
│   └── mobile/           # React Native/Expo
│       ├── app/          # Expo Router
│       ├── components/
│       ├── hooks/
│       └── lib/
│
├── packages/
│   └── shared/           # Shared types, utils
│       ├── types.ts
│       ├── validators.ts
│       └── constants.ts
│
└── docs/
    └── IMPLEMENTATION.md
```

### Key Hooks (Next.js)

```typescript
// hooks/useMatches.ts
import { useQuery, useMutation } from '@tanstack/react-query';
import { supabase } from '@/lib/supabase-client';

export function useMatches() {
  const { data, isLoading, error } = useQuery({
    queryKey: ['matches'],
    queryFn: async () => {
      const { data: { user } } = await supabase.auth.getUser();
      const { data, error } = await supabase
        .from('matches')
        .select('*')
        .or(`user_a_id.eq.${user?.id},user_b_id.eq.${user?.id}`)
        .order('created_at', { ascending: false });
      
      if (error) throw error;
      return data;
    },
  });

  const interested = useMutation({
    mutationFn: async (matchId: string) => {
      const { data: { user } } = await supabase.auth.getUser();
      const { error } = await supabase
        .from('matches')
        .update({ user_a_interested: true })
        .eq('id', matchId)
        .eq('user_a_id', user?.id);
      
      if (error) throw error;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['matches'] });
    },
  });

  return { matches: data, isLoading, interested };
}

// hooks/useChat.ts
export function useChat(matchId: string) {
  const { data: messages } = useQuery({
    queryKey: ['messages', matchId],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('messages')
        .select('*')
        .in('chat_id', supabase.from('chats').select('id').eq('match_id', matchId))
        .order('created_at', { ascending: true });
      
      if (error) throw error;
      return data;
    },
  });

  const sendMessage = useMutation({
    mutationFn: async (text: string) => {
      const { data: { user } } = await supabase.auth.getUser();
      const { error } = await supabase
        .from('messages')
        .insert({
          chat_id: chatId,
          sender_id: user?.id,
          text,
        });
      
      if (error) throw error;
    },
  });

  // Subscribe to real-time updates
  useEffect(() => {
    const subscription = supabase
      .channel(`messages:${matchId}`)
      .on('postgres_changes', 
        { event: 'INSERT', schema: 'public', table: 'messages' },
        (payload) => {
          queryClient.invalidateQueries({ queryKey: ['messages', matchId] });
        }
      )
      .subscribe();

    return () => subscription.unsubscribe();
  }, [matchId]);

  return { messages, sendMessage };
}
```

### API Routes (Next.js)

```typescript
// app/api/auth/signup/route.ts
import { NextRequest, NextResponse } from 'next/server';
import { supabase } from '@/lib/supabase-client';

export async function POST(req: NextRequest) {
  const { email, phone, password } = await req.json();

  try {
    const { data, error } = await supabase.auth.signUp({
      email: email || undefined,
      phone: phone || undefined,
      password,
    });

    if (error) throw error;

    // Create empty profile
    await supabase.from('profiles').insert({
      id: data.user?.id,
      first_name: '',
      birthdate: null,
      age: null,
    });

    return NextResponse.json({ user: data.user });
  } catch (error) {
    return NextResponse.json(
      { error: error.message },
      { status: 400 }
    );
  }
}

// app/api/social/instagram/callback/route.ts
export async function GET(req: NextRequest) {
  const code = req.nextUrl.searchParams.get('code');
  const state = req.nextUrl.searchParams.get('state');

  try {
    // Exchange code for token via Instagram Graph API
    const tokenResponse = await fetch(
      'https://graph.instagram.com/v18.0/oauth/access_token',
      {
        method: 'POST',
        headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
        body: new URLSearchParams({
          client_id: process.env.NEXT_PUBLIC_INSTAGRAM_APP_ID!,
          client_secret: process.env.INSTAGRAM_APP_SECRET!,
          grant_type: 'authorization_code',
          redirect_uri: `${process.env.NEXT_PUBLIC_APP_URL}/api/social/instagram/callback`,
          code,
        }),
      }
    );

    const token = await tokenResponse.json();

    // Get user info
    const userResponse = await fetch(
      `https://graph.instagram.com/v18.0/me?fields=id,username,name,media_count&access_token=${token.access_token}`
    );

    const instagramUser = await userResponse.json();

    // Get recent posts
    const mediaResponse = await fetch(
      `https://graph.instagram.com/v18.0/me/media?fields=id,media_type,media_url,timestamp&limit=3&access_token=${token.access_token}`
    );

    const media = await mediaResponse.json();

    // Save to profile
    const { data: { user } } = await supabase.auth.getUser();
    await supabase
      .from('profiles')
      .update({
        social_media: {
          instagram: {
            connected: true,
            username: instagramUser.username,
            followerCount: instagramUser.media_count,
            recentPosts: media.data,
            connectedAt: new Date().toISOString(),
          },
        },
      })
      .eq('id', user?.id);

    return NextResponse.redirect(new URL('/matches', req.url));
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 400 });
  }
}

// app/api/matches/generate/route.ts (Cloud Function alternative)
export async function POST(req: NextRequest) {
  const { data: { user } } = await supabase.auth.getUser();

  try {
    // 1. Get user profile
    const { data: profile } = await supabase
      .from('profiles')
      .select('*')
      .eq('id', user?.id)
      .single();

    // 2. Find candidates within radius
    const { data: candidates } = await supabase
      .from('profiles')
      .select('*')
      .not('id', 'eq', user?.id)
      .gte('age', profile.age_range_min)
      .lte('age', profile.age_range_max)
      .icontains('interested_in', profile.gender);

    // 3. Score candidates (see Matching Algorithm section)
    const scored = candidates
      .map(candidate => ({
        ...candidate,
        score: calculateMatchScore(profile, candidate),
      }))
      .sort((a, b) => b.score - a.score)
      .slice(0, 3);

    // 4. Create match records
    for (const candidate of scored) {
      await supabase.from('matches').insert({
        user_a_id: user?.id,
        user_b_id: candidate.id,
        shared_interests: findSharedInterests(profile.interests, candidate.interests),
      });
    }

    // 5. Send notifications
    // (via Firebase Cloud Messaging or Expo Push Notifications)

    return NextResponse.json({ matched: scored.length });
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 400 });
  }
}
```

---

## Database Schema

### Key Tables

#### `profiles`
- Extends Supabase `auth.users`
- Stores all user profile data
- **Critical fields**: `interests`, `availability`, `location_geo`, `social_media`, `verification`
- **Indexes**: GiST on `location_geo` for geo-queries

#### `matches`
- Bidirectional match relationship
- Status: `pending` (new) → `mutual` (both interested) → `expired` (7 days)
- Includes `shared_interests` array for matching summary

#### `meetups`
- Concrete meetup event
- Ties together: `match_id`, `venue_id`, `scheduled_at`
- Tracks: feedback, check-ins, chat unlock status

#### `chats` & `messages`
- Real-time chat per match
- `chats.last_message_*` fields for fast list queries
- Messages are **soft-deleted** (no cascade) to preserve history

---

## Matching Algorithm

### Scoring Function (TypeScript)

```typescript
interface MatchScore {
  interestScore: number;      // 0-40
  availabilityScore: number;  // 0-20
  lifeStageScore: number;     // 0-20
  distanceScore: number;      // 0-10
  verificationScore: number;  // 0-10
  total: number;              // 0-100
}

function calculateMatchScore(
  user: Profile,
  candidate: Profile
): MatchScore {
  // Interest Overlap (40 points max)
  const sharedInterests = user.interests.filter(i => 
    candidate.interests.includes(i)
  );
  const interestScore = Math.min(sharedInterests.length * 5, 40);

  // Availability Overlap (20 points max)
  const userTimes = Object.values(user.availability).filter(Boolean).length;
  const candidateTimes = Object.values(candidate.availability).filter(Boolean).length;
  const timeOverlap = Math.min(
    Object.entries(user.availability).filter(
      ([key, val]) => val && candidate.availability[key]
    ).length,
    4
  );
  const availabilityScore = timeOverlap * 5; // 0-20

  // Life Stage Compatibility (20 points max)
  const lifeStageScore = getLifeStageScore(user, candidate);

  // Distance (10 points max: closer = higher)
  const distance = calculateDistance(
    user.location_geo,
    candidate.location_geo
  );
  const distanceScore = Math.max(
    10 - (distance / user.radius_miles) * 10,
    0
  );

  // Verification Badges (10 points max)
  const verificationScore = (
    (candidate.phone_verified ? 2 : 0) +
    (candidate.photo_verified ? 3 : 0) +
    (candidate.social_media.instagram.connected ? 2 : 0) +
    (candidate.background_check_status === 'approved' ? 3 : 0)
  );

  const total = 
    interestScore + 
    availabilityScore + 
    lifeStageScore + 
    distanceScore + 
    Math.min(verificationScore, 10);

  return {
    interestScore,
    availabilityScore,
    lifeStageScore,
    distanceScore,
    verificationScore: Math.min(verificationScore, 10),
    total,
  };
}

function getLifeStageScore(user: Profile, candidate: Profile): number {
  // Similar life stages get higher scores
  const stageWeights: Record<string, number> = {
    kids: 5,
    relationship_status: 5,
    work_style: 5,
    living_situation: 5,
  };

  let score = 0;
  if (user.kids === candidate.kids) score += 5;
  if (user.living_situation === candidate.living_situation) score += 5;
  if (user.work_style === candidate.work_style) score += 5;
  // Relationship status less critical for platonic
  if (user.relationship_status === candidate.relationship_status) score += 5;

  return Math.min(score, 20);
}

function calculateDistance(
  point1: GeoPoint,
  point2: GeoPoint
): number {
  // Haversine formula
  const R = 3959; // Earth radius in miles
  const dLat = toRad(point2.latitude - point1.latitude);
  const dLon = toRad(point2.longitude - point1.longitude);
  const a =
    Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.cos(toRad(point1.latitude)) *
      Math.cos(toRad(point2.latitude)) *
      Math.sin(dLon / 2) *
      Math.sin(dLon / 2);
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  return R * c;
}

const toRad = (degrees: number) => (degrees * Math.PI) / 180;
```

### Weekly Batch Job (Cloud Function)

```typescript
// functions/generateMatches.ts (Google Cloud Function or Supabase Edge Function)
import { createClient } from '@supabase/supabase-js';

const supabase = createClient(
  process.env.SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!
);

export async function generateMatches(req, res) {
  try {
    // 1. Get all active users
    const { data: users } = await supabase
      .from('profiles')
      .select('*')
      .eq('profile_complete', true)
      .eq('is_paused', false);

    // 2. For each user, generate matches
    for (const user of users) {
      const matches = await generateUserMatches(user);
      
      // 3. Save matches
      for (const match of matches) {
        await supabase.from('matches').insert({
          user_a_id: user.id,
          user_b_id: match.id,
          shared_interests: match.sharedInterests,
        });
      }

      // 4. Send notification
      await sendMatchNotification(user.id, matches.length);
    }

    res.json({ success: true, processedUsers: users.length });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}

async function generateUserMatches(user: Profile): Promise<CandidateMatch[]> {
  // Get candidates (same logic as API route)
  const { data: candidates } = await supabase
    .from('profiles')
    .select('*')
    .neq('id', user.id)
    .gte('age', user.age_range_min)
    .lte('age', user.age_range_max);

  // Score & sort
  const scored = candidates
    .map(candidate => ({
      ...candidate,
      score: calculateMatchScore(user, candidate),
      sharedInterests: findSharedInterests(user.interests, candidate.interests),
    }))
    .sort((a, b) => b.score - a.score)
    .slice(0, 3); // Max 3 per week

  return scored;
}

async function sendMatchNotification(userId: string, count: number) {
  const { data: user } = await supabase
    .from('profiles')
    .select('id, first_name')
    .eq('id', userId)
    .single();

  // Send via Firebase Cloud Messaging or custom email
  await fetch('https://fcm.googleapis.com/fcm/send', {
    method: 'POST',
    headers: {
      'Authorization': `key=${process.env.FIREBASE_SERVER_KEY}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      to: `/topics/${userId}`,
      notification: {
        title: `${count} new matches!`,
        body: 'Your weekly matches are ready. Check them out now.',
        click_action: 'FLUTTER_NOTIFICATION_CLICK',
      },
    }),
  });
}
```

---

## Security & Privacy

### Authentication Flow

```
1. User signs up via phone/email/Google/Apple OAuth
   ↓
2. Supabase Auth creates session
   ↓
3. User completes photo verification (live selfie vs. ID)
   ↓
4. Optional: Background check via Checkr API
   ↓
5. Profile marked complete; eligible for matching
```

### Row-Level Security (RLS)

All tables use RLS:

```sql
-- Profiles: Only user can edit own, everyone can read verified ones
-- Matches: Only participants can read
-- Messages: Only participants can read/write
-- Blocks: Only participants can modify
```

### Privacy Rules

1. **Location**: Never store exact address; use geohash + neighborhood
2. **Photos**: Client-side compression before upload; CDN caching
3. **Chats**: Encrypted at rest (Supabase default); no backup of message history
4. **Blocks**: Bidirectional; user B cannot see User A ever again
5. **Data Retention**: Delete after 1 year of inactivity (GDPR compliance)

### OAuth Scopes (Minimal)

- **Instagram**: `instagram_basic` (username, media count, 3 recent posts)
- **Facebook**: `public_profile` only (friend count range, not full list)
- **LinkedIn**: `profile`, `email` (headline, industry)

---

## Deployment

### Frontend Deployment (Next.js → Vercel)

```bash
# Install Vercel CLI
npm i -g vercel

# Link project
vercel link

# Set environment variables
vercel env add NEXT_PUBLIC_SUPABASE_URL
vercel env add NEXT_PUBLIC_SUPABASE_ANON_KEY
# ... etc

# Deploy
vercel deploy --prod
```

### Mobile Build (React Native → Expo)

```bash
# Install Expo CLI
npm install -g expo-cli

# Build for iOS/Android
eas build --platform ios
eas build --platform android

# Submit to App Store / Google Play
eas submit --platform ios
eas submit --platform android
```

### Database Migrations (Supabase)

```bash
# Create migration
supabase migration new add_venues_table

# Apply locally
supabase db push

# Apply to production
supabase db push --linked

# Reset local DB
supabase db reset
```

### Edge Functions (Real-time Processing)

```bash
# Deploy edge function
supabase functions deploy process_match_feedback

# Invoke
supabase functions invoke process_match_feedback \
  --body '{"matchId":"..."}'
```

---

## File Structures

### Key React Components

```tsx
// components/MatchCard.tsx
export function MatchCard({ match, onInterested, onPass }: Props) {
  return (
    <div className="card">
      <Image src={match.primaryPhotoUrl} />
      <div className="info">
        <h3>{match.firstName}, {match.age}</h3>
        <p className="shared">✓ You both love {match.sharedInterests[0]}</p>
        <div className="tags">
          {match.interests.map(interest => (
            <Tag key={interest}>{interest}</Tag>
          ))}
        </div>
      </div>
      <div className="actions">
        <Button onClick={onPass}>Maybe Later</Button>
        <Button onClick={onInterested}>Interested</Button>
      </div>
    </div>
  );
}
```

---

## Next Steps

1. **Set up Supabase project** → database migrations
2. **Create Next.js app** → install dependencies
3. **Implement auth flow** → phone, email, OAuth
4. **Build profile setup** → 10-step form
5. **Set up matching algorithm** → weekly batch job
6. **Implement real-time chat** → Supabase Realtime
7. **Add push notifications** → Expo Notifications (mobile)
8. **Integrate Google Maps** → venue search
9. **Deploy to Vercel** → web app live
10. **Build React Native version** → Expo EAS builds

---

## Resources

- **Supabase Docs**: https://supabase.com/docs
- **Next.js App Router**: https://nextjs.org/docs/app
- **Expo Docs**: https://docs.expo.dev
- **Zod Validation**: https://zod.dev
- **React Query**: https://tanstack.com/query
- **Vercel Deployment**: https://vercel.com/docs

