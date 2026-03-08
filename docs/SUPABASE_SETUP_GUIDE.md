# Gen Dial Up - Supabase Complete Setup Guide

## Step 1: Create Supabase Project

### 1.1 Sign Up / Login
1. Go to https://supabase.com
2. Click "Start your project"
3. Sign in with GitHub (recommended) or email
4. Create account if needed

### 1.2 Create New Project
1. Click "New project"
2. **Project name**: `gen-dial-up`
3. **Database password**: Create strong password (save securely!)
4. **Region**: Select closest to your users (us-east-1 recommended for US)
5. **Pricing plan**: Free tier (perfect for MVP)
6. Click "Create new project"

*Wait 2-3 minutes for project initialization*

### 1.3 Get Project Credentials
After project is ready:

1. Go to **Settings** → **API** (left sidebar)
2. Copy these values:
   - `Project URL` → `NEXT_PUBLIC_SUPABASE_URL`
   - `anon public` → `NEXT_PUBLIC_SUPABASE_ANON_KEY`
3. Go to **Settings** → **Database** → find password
4. Also copy under "Service Role" key → `SUPABASE_SERVICE_ROLE_KEY`

---

## Step 2: Initialize Database

### 2.1 Install Supabase CLI
```bash
npm install -g supabase
```

### 2.2 Login to Supabase
```bash
supabase login
# Follow the browser authentication
# Paste the provided token when asked
```

### 2.3 Link to Your Project
```bash
supabase link --project-ref YOUR_PROJECT_REF
# Find YOUR_PROJECT_REF in Supabase URL or Settings
# Format: https://YOUR_PROJECT_REF.supabase.co
```

### 2.4 Push Migrations
```bash
cd /path/to/gendialup
supabase db push
```

This creates all tables:
- profiles
- matches
- chats
- messages
- meetups
- venues
- blocks
- reports

---

## Step 3: Setup Environment Variables

### 3.1 Create .env.local
```bash
cp .env.example .env.local
```

### 3.2 Edit .env.local
```env
# Supabase (REQUIRED)
NEXT_PUBLIC_SUPABASE_URL=https://YOUR_PROJECT_REF.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=YOUR_ANON_KEY
SUPABASE_SERVICE_ROLE_KEY=YOUR_SERVICE_ROLE_KEY

# OAuth - Instagram (Optional but recommended)
NEXT_PUBLIC_INSTAGRAM_APP_ID=
INSTAGRAM_APP_SECRET=

# OAuth - Google (Optional but recommended)
NEXT_PUBLIC_GOOGLE_CLIENT_ID=
GOOGLE_CLIENT_SECRET=

# Google Maps API (Optional)
NEXT_PUBLIC_GOOGLE_MAPS_API_KEY=

# App URLs
NEXT_PUBLIC_APP_URL=http://localhost:3000
NEXT_PUBLIC_API_URL=http://localhost:3000/api
```

---

## Step 4: Setup Authentication

### 4.1 Enable Auth Providers
1. Go to Supabase Dashboard
2. Click **Authentication** (left sidebar)
3. Go to **Providers**

#### Email/Password Auth
- Already enabled by default
- No additional setup needed

#### Phone Auth (Optional)
1. Click **Phone**
2. Toggle **Enable Phone Auth**
3. Choose SMS provider (Twilio recommended)
4. Add credentials if using SMS

#### Google OAuth
1. Click **Google**
2. Toggle **Enabled**
3. Go to Google Cloud Console: https://console.cloud.google.com
4. Create new project or select existing
5. Enable "Google+ API"
6. Create OAuth 2.0 credential (Web application)
7. Add authorized redirect URIs:
   - `https://YOUR_PROJECT_REF.supabase.co/auth/v1/callback`
   - `http://localhost:3000/auth/callback` (local dev)
8. Copy Client ID & Secret
9. Paste into Supabase Google provider settings
10. Save

#### GitHub OAuth
1. Click **GitHub**
2. Toggle **Enabled**
3. Go to https://github.com/settings/developers
4. Click "New OAuth App"
5. Fill in:
   - Application name: `Gen Dial Up Dev`
   - Homepage URL: `http://localhost:3000`
   - Authorization callback URL: `https://YOUR_PROJECT_REF.supabase.co/auth/v1/callback`
6. Copy Client ID & Secret
7. Paste into Supabase GitHub settings
8. Save

---

## Step 5: Configure Row-Level Security (RLS)

### 5.1 Enable RLS on All Tables
1. Go to **SQL Editor**
2. Run this query:

```sql
-- Enable RLS on all tables
ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.matches ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.chats ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.messages ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.meetups ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.blocks ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.reports ENABLE ROW LEVEL SECURITY;
```

### 5.2 Create Basic RLS Policies
```sql
-- Profiles: Users can read verified profiles and own profile
CREATE POLICY "Users can view their own profile"
ON public.profiles FOR SELECT
USING (auth.uid() = id);

CREATE POLICY "Users can update their own profile"
ON public.profiles FOR UPDATE
USING (auth.uid() = id);

-- Matches: Users can only see their own matches
CREATE POLICY "Users can view their matches"
ON public.matches FOR SELECT
USING (auth.uid() = user_a_id OR auth.uid() = user_b_id);

-- Messages: Users can only read messages in their chats
CREATE POLICY "Users can read their messages"
ON public.messages FOR SELECT
USING (
  chat_id IN (
    SELECT id FROM public.chats
    WHERE user_a_id = auth.uid() OR user_b_id = auth.uid()
  )
);

-- Messages: Users can insert messages in their chats
CREATE POLICY "Users can send messages"
ON public.messages FOR INSERT
WITH CHECK (
  auth.uid() = sender_id AND
  chat_id IN (
    SELECT id FROM public.chats
    WHERE user_a_id = auth.uid() OR user_b_id = auth.uid()
  )
);
```

---

## Step 6: Create Test User (Optional but Recommended)

### 6.1 Create Test Account via CLI
```bash
supabase auth users create --email test@example.com --password TestPassword123!
```

### 6.2 Or Create via Dashboard
1. Go to **Authentication** → **Users**
2. Click **Add user**
3. Enter email and password
4. Click **Create user**

### 6.3 Create Test Profile
Run in SQL Editor:
```sql
INSERT INTO public.profiles (
  id,
  first_name,
  age,
  interests,
  profile_complete,
  created_at
) VALUES (
  'USER_ID_FROM_ABOVE',
  'Test User',
  30,
  ARRAY['Hiking', 'Coffee', 'Reading'],
  true,
  NOW()
);
```

---

## Step 7: Verify Setup

### 7.1 Test Database Connection
```bash
cd /path/to/gendialup
npm install
npm run dev
```

Visit http://localhost:3000 → Should see the app

### 7.2 Check Supabase Connection
In browser console:
```javascript
// Should show project URL
console.log(process.env.NEXT_PUBLIC_SUPABASE_URL)
```

### 7.3 Test Tables Exist
Go to Supabase **Table Editor**:
- [ ] profiles
- [ ] matches
- [ ] chats
- [ ] messages
- [ ] meetups
- [ ] blocks
- [ ] reports

---

## Step 8: Setup Additional Features (Optional)

### 8.1 Enable PostGIS for Geographic Queries
Already enabled in migrations, but verify:

```sql
-- In SQL Editor, check if PostGIS is available
SELECT PostGIS_version();

-- Create spatial index on profiles location
CREATE INDEX idx_profiles_location ON public.profiles 
USING GIST(location_geo);
```

### 8.2 Setup Realtime (for live chat)
1. Go to **Realtime** (left sidebar)
2. Click **Broadcast**
3. Toggle tables to enable:
   - [ ] messages (for live chat)
   - [ ] matches (for match notifications)

### 8.3 Setup Storage (for photo uploads)
1. Go to **Storage** (left sidebar)
2. Click **Create a new bucket**
3. Name: `profile-photos`
4. Privacy: Public
5. Click **Create bucket**
6. Repeat for:
   - `venue-photos`
   - `match-photos`

---

## Step 9: Setup Email Service (Optional)

### 9.1 Confirm Email Provider
1. Go to **Authentication** → **Providers** → **Email**
2. Under **Email Templates**, customize:
   - Confirmation link
   - Password reset link
   - Magic link

Default uses Supabase SMTP (included in free tier)

### 9.2 Custom Email (Optional)
For production, use SendGrid or similar:
1. Create SendGrid account
2. Get API key
3. In Supabase: **Settings** → **Email** → Add SendGrid
4. Paste API key
5. Set sender email

---

## Step 10: Deploy to Vercel

### 10.1 Add Environment to Vercel
1. Go to Vercel dashboard
2. Select your project
3. **Settings** → **Environment Variables**
4. Add all values from `.env.local`:
   - `NEXT_PUBLIC_SUPABASE_URL`
   - `NEXT_PUBLIC_SUPABASE_ANON_KEY`
   - `SUPABASE_SERVICE_ROLE_KEY`
   - Any OAuth keys

### 10.2 Add Redirect URIs
For each OAuth provider, add to Supabase:
- Google: `https://YOUR_DOMAIN.vercel.app/auth/callback`
- GitHub: `https://YOUR_DOMAIN.vercel.app/auth/callback`

---

## Troubleshooting

### Connection Issues
```bash
# Test connection
supabase status

# Reconnect
supabase logout && supabase login
supabase link --project-ref YOUR_REF
```

### Migration Errors
```bash
# Rollback
supabase migration down

# Try again
supabase db push
```

### RLS Blocking Access
- Check Supabase **Authentication** → **Users** to verify user exists
- Run policies in SQL Editor
- Test with authenticated user

### Email Not Sending
- Check **Authentication** → **Email Templates**
- Verify sender email in settings
- Check spam folder
- Test with different email service

---

## Security Checklist

- [ ] Strong database password set
- [ ] Row-level security (RLS) enabled on all tables
- [ ] Service role key kept secure (never in client code)
- [ ] OAuth credentials added for all providers
- [ ] Email templates customized
- [ ] Storage buckets created with correct privacy settings
- [ ] Realtime enabled only for necessary tables

---

## Next Steps

1. ✅ Supabase project created
2. ✅ Database initialized with migrations
3. ✅ Authentication configured
4. ✅ Environment variables set
5. Next: Build React components in `app/components/`
6. Next: Create API routes in `app/api/`
7. Next: Test authentication flow
8. Next: Deploy to Vercel

---

## Resources

- **Supabase Docs**: https://supabase.com/docs
- **Auth Guides**: https://supabase.com/docs/guides/auth
- **SQL Editor**: Directly in Supabase dashboard
- **API Documentation**: In Supabase dashboard → API Docs

---

**Status**: Ready for development! 🚀
