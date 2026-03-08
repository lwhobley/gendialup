# Gen Dial Up 🎯

**Finding meaningful, platonic friendships for adults aged 28–43**

A mobile-first social platform connecting people to curated matches, safe local "third places," and real friendships.

## 📂 Repository Structure

```
gendialup/
├── docs/
│   ├── GEN_DIAL_UP_IMPLEMENTATION_GUIDE.md    # Full backend/frontend implementation
│   └── GEN_DIAL_UP_QUICK_START.md             # Setup, deployment, launch guide
│
├── app/
│   ├── web/
│   │   └── app.jsx                            # React PWA (production-ready component)
│   │
│   └── mobile/
│       └── setup-guide.ts                     # React Native/Expo full setup
│
└── README.md                                  # This file
```

## 🚀 Quick Start

### Web (React PWA)
1. Copy `app/web/app.jsx` into your React project
2. Install dependencies: `npm install lucide-react`
3. Follow **Implementation Guide** → Frontend Implementation
4. Deploy to Vercel: `vercel deploy --prod`

### Mobile (React Native/Expo)
1. Read `app/mobile/setup-guide.ts`
2. Follow **Quick Start** → Phase 3: Mobile Setup
3. Build with EAS: `eas build --platform all`

### Full Setup
1. Start with **Quick Start** → Phase 1: Setup (Supabase + OAuth)
2. Read **Implementation Guide** for complete backend schema
3. Build web app from `app/web/app.jsx`
4. Build mobile app from `app/mobile/setup-guide.ts`

## 🎨 Design System

**Warm, trustworthy, human-centered** (not dating-app vibes)

- **Colors**: Cream (#FAF8F3), Taupe (#8B8680), Sage (#9CAF88), Coral (#D97F6F)
- **Typography**: Inter or SF Pro, high contrast
- **Mobile-first**: Thumb-friendly, bottom navigation, responsive breakpoints
- **Accessibility**: WCAG 2.1 AA compliant

## 🔑 Key Features

✅ **Curated Matching**: Max 3 matches/week (quality > quantity)  
✅ **Safety-First**: Phone verification, photo verification, optional background checks  
✅ **IRL-Focused**: Chat unlocks only after meetup scheduled  
✅ **Geo-Smart**: Location-based with privacy (no exact addresses stored)  
✅ **Social Proof**: Instagram, Facebook, LinkedIn verification  
✅ **Real-time**: Instant messages, match notifications, status updates  
✅ **Responsive**: Web PWA + native iOS/Android mobile apps  

## 📊 Matching Algorithm

**100-point scoring system:**
- Interest overlap: 40 pts
- Availability overlap: 20 pts
- Life stage compatibility: 20 pts
- Distance: 10 pts
- Verification badges: 10 pts

Weekly batch job generates top 3 candidates per user.

## 🔐 Security & Privacy

- **RLS Policies**: Row-level security on all Supabase tables
- **No Location Tracking**: Geohash + neighborhood only
- **Encrypted Messages**: At-rest encryption (Supabase default)
- **Bidirectional Blocks**: Users can block/report instantly
- **GDPR Compliant**: 1-year data retention, easy deletion

## 📱 Tech Stack

**Frontend**
- React 18 (web PWA)
- React Native + Expo (iOS/Android)
- Tailwind CSS + custom design system
- React Query + Zustand (state)
- React Hook Form + Zod (validation)

**Backend**
- Supabase (PostgreSQL + Auth + Storage)
- Next.js API Routes
- Edge Functions (real-time processing)
- Firebase Cloud Messaging (push notifications)

**DevOps**
- Vercel (web hosting)
- EAS Build (mobile builds)
- Supabase (database + storage)

## 📖 Documentation

### For Developers
1. **Quick Start** (`docs/GEN_DIAL_UP_QUICK_START.md`)
   - Phase 1: Setup (Supabase, OAuth, environment)
   - Phase 2: Frontend (Next.js web app)
   - Phase 3: Mobile (Expo)
   - Phase 4: Deployment (Vercel + EAS)
   - Phase 5: Security & Testing

2. **Implementation Guide** (`docs/GEN_DIAL_UP_IMPLEMENTATION_GUIDE.md`)
   - Architecture overview
   - Database schema (SQL migrations)
   - Matching algorithm (TypeScript)
   - API routes (Next.js examples)
   - RLS policies
   - OAuth integration

### For Product Managers
- See: "Core Philosophy" + "Screen Specifications" in prompt
- Max 3 curated matches/week
- Chat unlock only after meetup scheduled
- No swiping, algorithm-driven
- Quality over quantity

## 🎯 Milestones

- **MVP (Week 1-2)**: Web prototype + matching
- **Beta (Week 3-4)**: Mobile app + real-time chat
- **Soft Launch (Week 5-6)**: 50-100 early users, iterate
- **Full Launch (Week 7+)**: App Store submission + marketing

## 💬 Support & Feedback

- Issues: GitHub Issues
- Email: support@gendialup.com
- Discord: [Coming soon]

## 📜 License

Proprietary - All rights reserved

---

**Built with ❤️ for meaningful friendships**
