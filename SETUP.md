# Gen Dial Up - Complete Setup Guide

## Prerequisites
- Node.js 18+
- npm 9+
- Supabase account
- Git

## Quick Start

### 1. Install Dependencies
```bash
npm install
```

### 2. Setup Environment
```bash
cp .env.example .env.local
# Edit with your Supabase & OAuth credentials
```

### 3. Setup Database
```bash
supabase login
supabase link --project-ref <your-ref>
supabase db push
```

### 4. Run Dev Server
```bash
npm run dev
```

Open http://localhost:3000

## Project Structure
```
app/
├── api/hello/               # API routes
├── components/              # React components
├── hooks/useAuth.ts        # Auth hook
├── lib/                    # Utilities
├── store/auth.ts           # Zustand store
├── styles/globals.css      # Global styles
├── types/index.ts          # TypeScript types
├── layout.tsx              # Root layout
└── page.tsx                # Home page

docs/                       # Full documentation
supabase/migrations/        # Database migrations
public/                     # Static files
```

## Available Scripts
- `npm run dev` - Dev server
- `npm run build` - Production build
- `npm start` - Start production
- `npm run lint` - Lint code
- `npm run format` - Format code
- `npm run type-check` - Type check
- `npm run db:push` - Push migrations

## Environment Variables
See `.env.example` for all required variables.

## Deployment
Deploy to Vercel:
```bash
vercel deploy --prod
```

## Documentation
- `docs/GEN_DIAL_UP_IMPLEMENTATION_GUIDE.md` - Full backend architecture
- `docs/GEN_DIAL_UP_QUICK_START.md` - Complete setup & launch guide
- `SETUP.md` - This file

## Next Steps
1. Complete environment variables
2. Push database migrations
3. Start dev server
4. Build out components
5. Deploy to Vercel

For detailed information, see the documentation files.
