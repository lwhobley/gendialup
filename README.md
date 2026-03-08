# Gen Dial Up 🎯

**Meaningful platonic friendships for adults aged 28-43**

A mobile-first platform connecting people to curated matches, verified users, and real local friendships.

## 🚀 Quick Start

1. `npm install`
2. `cp .env.example .env.local` - Add your credentials
3. `npm run dev`
4. Open http://localhost:3000

## 📦 What's Included

- **Next.js 14** - React framework with App Router
- **Supabase** - PostgreSQL database + Auth
- **React Query** - Data fetching & caching
- **Zustand** - State management
- **Tailwind CSS** - Styling
- **TypeScript** - Type safety
- **PostGIS** - Geographic queries

## 📚 Documentation

- **Setup**: See `SETUP.md`
- **Implementation**: `docs/GEN_DIAL_UP_IMPLEMENTATION_GUIDE.md`
- **Deployment**: `docs/GEN_DIAL_UP_QUICK_START.md`

## 🏗️ Project Structure

```
gendialup/
├── app/              # Next.js app directory
├── docs/             # Documentation
├── public/           # Static files
├── supabase/         # Database migrations
├── package.json
└── tsconfig.json
```

## 🔑 Key Features

✅ Curated matching (max 3/week)
✅ Safety-first verification
✅ IRL-focused (chat after meetup)
✅ Geo-smart matching
✅ Real-time messaging
✅ Mobile-first responsive design

## 🛠 Tech Stack

- Frontend: Next.js, React, Tailwind
- Backend: Supabase (PostgreSQL)
- Hosting: Vercel
- Mobile: React Native/Expo

## 📖 Scripts

```bash
npm run dev           # Dev server
npm run build         # Build for production
npm start            # Start production server
npm run type-check   # Type checking
npm run format       # Format code
npm run db:push      # Push migrations
```

## 🔐 Security

- Row-level security (RLS) on all tables
- Phone/photo verification
- Background check integration
- Privacy-first location (geohash only)

## 📝 License

Proprietary - All rights reserved

---

Built with ❤️ for meaningful friendships
