# Gen Dial Up - Quick Start & Deployment Guide

## 📋 Phase 1: Setup (Days 1-2)

### 1.1 Create Supabase Project

```bash
# Create account at supabase.com

# Create new project via dashboard:
# - Project name: "gen-dial-up"
# - Password: (save securely)
# - Region: us-east-1 (or closest to your users)
# - Plan: Free tier for MVP

# Once created, navigate to Project Settings:
# Copy these values into .env.local:
NEXT_PUBLIC_SUPABASE_URL=https://xxxxx.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=xxxxx
SUPABASE_SERVICE_ROLE_KEY=xxxxx
```

### 1.2 Initialize Database

In Supabase dashboard, go to **SQL Editor** and run:

```sql
-- Run all migrations from IMPLEMENTATION_GUIDE.md
-- Copy-paste the database setup section
```

Then:

```bash
# Enable Row Level Security policies (from IMPLEMENTATION_GUIDE.md)
# Copy-paste all RLS policy statements
```

### 1.3 Create OAuth Apps

#### Instagram OAuth Setup
1. Go to [Meta Developers](https://developers.facebook.com)
2. Create new app → Select "Consumer"
3. Add product: **Instagram Graph API**
4. Go to Settings → Basic, copy:
   - App ID → `NEXT_PUBLIC_INSTAGRAM_APP_ID`
   - App Secret → `INSTAGRAM_APP_SECRET`
5. Add Redirect URI: `https://yourdomain.com/api/social/instagram/callback`

#### Google OAuth Setup
1. Go to [Google Cloud Console](https://console.cloud.google.com)
2. Create new project
3. Enable: "Google+ API"
4. Create OAuth 2.0 credential (Web application)
5. Add URIs:
   - Authorized redirect: `https://yourdomain.com/api/auth/callback/google`
   - JavaScript origins: `https://yourdomain.com`
6. Copy **Client ID** and **Client Secret**

#### Apple Sign-In (iOS only)
1. Go to [Apple Developer](https://developer.apple.com)
2. Create new App ID with "Sign in with Apple"
3. Create Service ID
4. Configure return URLs: `https://yourdomain.com/api/auth/callback/apple`

### 1.4 Environment File

Create `.env.local` in project root:

```env
# Supabase
NEXT_PUBLIC_SUPABASE_URL=https://xxxxx.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=xxxxx
SUPABASE_SERVICE_ROLE_KEY=xxxxx

# OAuth Providers
NEXT_PUBLIC_INSTAGRAM_APP_ID=xxxxx
INSTAGRAM_APP_SECRET=xxxxx
NEXT_PUBLIC_GOOGLE_CLIENT_ID=xxxxx
GOOGLE_CLIENT_SECRET=xxxxx
NEXT_PUBLIC_APPLE_CLIENT_ID=xxxxx
APPLE_CLIENT_SECRET=xxxxx

# Google Maps
NEXT_PUBLIC_GOOGLE_MAPS_API_KEY=xxxxx

# Stripe (Premium features, optional for MVP)
NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=pk_test_xxxxx
STRIPE_SECRET_KEY=sk_test_xxxxx

# SendGrid Email
SENDGRID_API_KEY=xxxxx

# App URLs
NEXT_PUBLIC_APP_URL=http://localhost:3000 (dev) / https://gendialup.com (prod)
NEXT_PUBLIC_API_URL=http://localhost:3000/api (dev) / https://api.gendialup.com (prod)

# JWT Secret (for custom auth tokens)
JWT_SECRET=xxxxx (generate: openssl rand -base64 32)
```

---

## 📦 Phase 2: Frontend Setup (Days 3-5)

### 2.1 Next.js Web App

```bash
# Create Next.js project
npx create-next-app@latest gen-dial-up --typescript --tailwind

cd gen-dial-up

# Install dependencies
npm install @supabase/supabase-js @supabase/auth-helpers-nextjs
npm install @tanstack/react-query zustand
npm install lucide-react react-hook-form zod
npm install expo next-image-export-optimizer
npm install stripe stripe-js

# For PWA support
npm install next-pwa workbox-cli

# Install mobile libraries (for Expo support)
npm install react-native react-native-web expo expo-router

# Install dev dependencies
npm install -D @types/react @types/node typescript
```

### 2.2 Project Structure

```bash
# Create app structure
mkdir -p app/{onboarding,matches/[id],chat,venues,profile,api}
mkdir -p components/{{auth,matches,chat,venues,profile}}
mkdir -p hooks
mkdir -p lib
mkdir -p store
mkdir -p styles
mkdir -p public/icons

# Copy files
# - Copy gen-dial-up-app.jsx code → components/
# - Copy custom hooks → hooks/
# - Copy utils → lib/
```

### 2.3 Environment Setup

```bash
# Copy .env.local values
cp .env.local.example .env.local
# Edit with real values from 1.4
```

### 2.4 Run Development Server

```bash
npm run dev

# Open http://localhost:3000 in browser
```

---

## 📱 Phase 3: Mobile Setup (Days 6-8)

### 3.1 Expo Project

```bash
# Create Expo app
npx create-expo-app gen-dial-up-mobile

cd gen-dial-up-mobile

# Install dependencies
npm install @react-navigation/native @react-navigation/bottom-tabs
npm install @supabase/supabase-js @tanstack/react-query zustand
npm install expo-location expo-image-picker expo-camera expo-notifications
npm install lucide-react-native
npm install @react-native-async-storage/async-storage

# Copy app.json (from react-native file)
cp app.json ./
```

### 3.2 Environment Setup

```bash
# Create .env
EXPO_PUBLIC_SUPABASE_URL=https://xxxxx.supabase.co
EXPO_PUBLIC_SUPABASE_ANON_KEY=xxxxx
EXPO_PUBLIC_GOOGLE_MAPS_API_KEY=xxxxx
```

### 3.3 Test on Device

```bash
# Start Expo dev server
npx expo start

# iOS: Press 'i' (requires Mac + Xcode)
# Android: Press 'a' (requires Android Studio)
# Web: Press 'w'

# Or scan QR code with Expo Go app
```

---

## 🚀 Phase 4: Deployment

### 4.1 Web Deployment (Vercel)

```bash
# Install Vercel CLI
npm i -g vercel

# Login
vercel login

# Link project
vercel link

# Set environment variables in Vercel dashboard:
# Settings → Environment Variables
# Add all keys from .env.local

# Deploy
vercel deploy --prod

# Your site is live at: https://gen-dial-up.vercel.app
# (or custom domain if configured)
```

### 4.2 Mobile Build (EAS Build)

```bash
# Install EAS CLI
npm i -g eas-cli

# Login with Expo account
eas login

# Build for iOS
eas build --platform ios --auto-submit

# Build for Android
eas build --platform android --auto-submit

# Monitor builds at: https://expo.dev

# Once approved, apps are:
# - iOS: Available on App Store
# - Android: Available on Google Play Store
```

### 4.3 Custom Domain Setup

```bash
# If using custom domain (e.g., gendialup.com):

# 1. Register domain (Namecheap, GoDaddy, etc.)

# 2. Vercel Dashboard:
#    Settings → Domains
#    Add Domain: gendialup.com
#    Follow DNS setup instructions

# 3. Update environment variables:
#    NEXT_PUBLIC_APP_URL=https://gendialup.com

# 4. Add API subdomain:
#    api.gendialup.com → Points to backend (if using separate server)

# 5. Generate SSL certificate (automatic with Vercel)
```

---

## 🔒 Phase 5: Security & Testing

### 5.1 Security Checklist

- [ ] All sensitive keys in `.env.local` (never in code)
- [ ] Enable RLS on all Supabase tables
- [ ] Test auth flow (signup, login, logout)
- [ ] Verify phone verification OTP works
- [ ] Test photo upload & verification
- [ ] Verify OAuth flows (Google, Instagram, Apple)
- [ ] Enable CORS on API routes
- [ ] Set up rate limiting (Supabase edge functions)
- [ ] Enable 2FA for Supabase project
- [ ] Review Supabase security advisors

### 5.2 Testing

```bash
# Run tests (if using Jest/Vitest)
npm test

# Test auth flows:
# - Sign up with email
# - Sign up with phone
# - Sign up with Google
# - Complete profile
# - Receive match notifications

# Test matching:
# - Create 2+ test profiles
# - Verify match generation
# - Test messaging between matches
# - Test meetup planning

# Mobile testing:
# - Test on both iOS and Android
# - Test with poor network conditions
# - Test push notifications
# - Test camera/photo picker
# - Test location permissions
```

### 5.3 Performance Testing

```bash
# Lighthouse audit (Vercel Analytics)
vercel analytics

# Web Vitals monitoring in Vercel Dashboard

# Mobile app profiling:
# - Profile with React DevTools
# - Check memory leaks
# - Monitor battery usage
```

---

## 📊 Phase 6: Launch Preparation

### 6.1 Pre-Launch Checklist

- [ ] **Product**
  - [ ] All 10+ screens fully functional
  - [ ] Matching algorithm tested
  - [ ] Real-time chat working
  - [ ] Photo upload & verification done
  - [ ] OAuth integrations working
  - [ ] Push notifications functional

- [ ] **Compliance**
  - [ ] Privacy Policy published
  - [ ] Terms of Service published
  - [ ] GDPR compliance verified
  - [ ] Age verification (28-43) enforced
  - [ ] Background check integration (optional for MVP)
  - [ ] Photo verification working

- [ ] **Marketing**
  - [ ] Landing page created
  - [ ] Social media accounts set up
  - [ ] Press kit prepared
  - [ ] Email waitlist built

- [ ] **Infrastructure**
  - [ ] Database backups configured
  - [ ] Error logging (Sentry, LogRocket)
  - [ ] Analytics tracking (Mixpanel, Amplitude)
  - [ ] Monitoring alerts set up
  - [ ] CDN configured (Vercel + Supabase auto)

- [ ] **Documentation**
  - [ ] User guide created
  - [ ] FAQ published
  - [ ] Support email set up
  - [ ] Bug bounty program (optional)

### 6.2 Soft Launch (Beta)

```bash
# 1. Deploy to staging
vercel --target production
# (don't set as default yet)

# 2. Invite 50-100 beta testers
# Get feedback on:
# - Onboarding friction
# - Match quality
# - App performance
# - Safety concerns

# 3. Monitor metrics
# - Signup completion rate (target: >40%)
# - Profile completion rate (target: >60%)
# - Match acceptance rate (target: >30%)
# - Meetup scheduling rate (target: >20%)

# 4. Bug fixes based on beta feedback
# (typical: 2-3 week beta period)
```

### 6.3 Full Launch

```bash
# 1. Set Vercel deployment as production
vercel promote <deployment-id>

# 2. Submit apps to App Stores
# - iOS App Store (2-3 days review)
# - Google Play Store (automated, ~4 hours)

# 3. Launch marketing campaign
# - Social media posts
# - Email to waitlist
# - Press releases
# - Influencer outreach

# 4. Monitor performance
# - Crash rate (should be <0.1%)
# - Daily active users
# - Retention (day 1, 7, 30)
# - Bug reports

# 5. Daily monitoring for first week
# - Be ready for hotfixes
# - Monitor server load
# - Respond to user feedback
```

---

## 📈 Post-Launch

### Monthly Metrics to Track

```
User Acquisition
├─ Signups/day
├─ Signup source (organic, paid, referral)
└─ Signup-to-profile-complete rate

Engagement
├─ Daily active users (DAU)
├─ Weekly active users (WAU)
├─ Match acceptance rate
├─ Meetup scheduling rate
└─ Return rate (day 7, 30)

Quality
├─ App crash rate
├─ API error rate
├─ Match quality score (internal rating)
└─ User satisfaction (NPS)

Safety
├─ Reports filed/day
├─ Blocks/day
├─ Background checks approved/denied
└─ Content moderation cases
```

### Growth Initiatives

1. **Referral Program**: 5% discount for both parties
2. **Content Marketing**: Blog on friendship, local events
3. **Partnerships**: Local coffee shops, co-working spaces
4. **Paid Ads**: Instagram, TikTok, Reddit (young professionals)
5. **Product Features**: Events, group meetups, interests discovery

---

## 🛠 Troubleshooting

### Common Issues

#### Auth not working
```bash
# Check Supabase auth settings:
# 1. Go to Authentication → Providers
# 2. Verify OAuth app IDs match .env
# 3. Check redirect URIs are exact match
# 4. Test with incognito browser (fresh session)
```

#### Matches not generating
```bash
# Check Cloud Function logs:
supabase functions logs generateMatches

# Verify profiles are complete:
SELECT COUNT(*) FROM profiles WHERE profile_complete = true;

# Check status:
SELECT status, COUNT(*) FROM matches GROUP BY status;
```

#### Photo verification failing
```bash
# Test with face detection library:
npm install face-api.js

# In development, add bypass:
# const isFaceDetected = process.env.NODE_ENV === 'development' ? true : await detectFace();
```

#### Push notifications not arriving
```bash
# Verify device token saved:
SELECT device_tokens FROM profiles WHERE id = 'user-id';

# Test notification:
eas device:create  # Register test device
eas push --to='<device-token>'
```

#### Geo-queries not working
```bash
# Verify geo index created:
SELECT indexname FROM pg_indexes WHERE tablename = 'profiles';

# If missing, create:
CREATE INDEX idx_profiles_location ON profiles USING GIST(location_geo);

# Test distance query:
SELECT *, ST_Distance(location_geo, ST_GeogFromText('POINT(lat lng)')) / 1609.34 as dist_miles
FROM profiles
WHERE ST_DWithin(location_geo, ST_GeogFromText('POINT(lat lng)'), 5 * 1609.34)
ORDER BY dist_miles;
```

---

## 💰 Cost Estimates (Monthly, at scale)

| Service | Free Tier | ~10K Users | ~100K Users |
|---------|-----------|-----------|------------|
| Supabase | $0 | $10-25 | $100-200 |
| Vercel | $0 | $0 | $20-50 |
| Google Maps | $0-50 | $50-200 | $200-1000 |
| SendGrid | $0 (12K/mo) | $10-20 | $50-100 |
| Stripe | $0 (no fees) | $30-50 | $100-200 |
| Analytics (Mixpanel) | $0 | $0 | $50-200 |
| Monitoring (Sentry) | $0 | $0 | $50-100 |
| **Total** | **~$0** | **~$100-300** | **~$600-1800** |

---

## 📞 Support Contacts

- **Supabase Support**: support@supabase.io
- **Vercel Support**: support@vercel.com
- **Expo Support**: support@expo.io
- **Community**: Gen Dial Up Discord (set up after launch)

---

## 🎯 Success Metrics (6 Months Post-Launch)

| Metric | Target | Status |
|--------|--------|--------|
| Monthly Active Users | 5,000 | |
| Matches Generated | 100K+ | |
| Meetups Scheduled | 10K+ | |
| Positive Reviews | >4.5★ | |
| Retention (Day 30) | >30% | |
| NPS Score | >40 | |
| Safety Incidents | <1% of users | |

---

## 📚 Further Reading

- [Supabase Best Practices](https://supabase.com/docs/guides/platform/best-practices)
- [Next.js Deployment](https://nextjs.org/docs/deployment)
- [Expo Deployment](https://docs.expo.dev/eas/)
- [Security Checklist](https://cheatsheetseries.owasp.org)

---

**Questions?** Create an issue on GitHub or reach out to the team.

Good luck building Gen Dial Up! 🚀
