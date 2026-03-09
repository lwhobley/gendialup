# 🔧 Vercel Environment Variables Setup

## The Problem
Your `.env.local` file works locally, but Vercel doesn't have access to it during deployment.

## The Solution
Add environment variables to your Vercel project dashboard.

---

## Step-by-Step Setup

### 1. Go to Vercel Dashboard
- Visit: https://vercel.com/dashboard
- Select your "gendialup" project

### 2. Go to Settings
- Click **Settings** tab
- Click **Environment Variables** in the left sidebar

### 3. Add Supabase URL
- **Name**: `NEXT_PUBLIC_SUPABASE_URL`
- **Value**: `https://whzifpjvzyegapqxvoxj.supabase.co`
- Click **Save**

### 4. Add Supabase API Key
- **Name**: `NEXT_PUBLIC_SUPABASE_ANON_KEY`
- **Value**: Copy the full key below:
```
eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6IndoemlmcGp2enlIZ2FwcXh2b3hqIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzI5NTg5OTEsImV4cCI6MjA4ODUzNDk5MX0._ai9G0STa54H_UaZuzVXsjS_A-uoOGRDa6KcnEIXydE
```
- Click **Save**

### 5. Add App URL
- **Name**: `NEXT_PUBLIC_APP_URL`
- **Value**: `https://gendialup.vercel.app`
- Click **Save**

### 6. Add API URL
- **Name**: `NEXT_PUBLIC_API_URL`
- **Value**: `https://gendialup.vercel.app/api`
- Click **Save**

---

## After Adding Variables

1. **Redeploy** your project:
   - Go to **Deployments** tab
   - Find the latest deployment
   - Click **...** → **Redeploy**
   - Or run: `vercel deploy --prod`

2. **Wait for build** (usually 2-3 minutes)

3. **Test your app**:
   - Visit your Vercel URL
   - Try signing up with test email
   - Should work without API key errors

---

## If Still Getting API Key Error

### Check 1: Verify Variables in Vercel
- Settings → Environment Variables
- Make sure all 4 variables are there
- Click on each to verify the full value (it will show dots like `eyJh...dE`)

### Check 2: Clear Vercel Cache
- Deployments tab
- Find your latest build
- Click **...** → **Clear Cache & Redeploy**

### Check 3: Check Supabase Project Status
- Go to: https://app.supabase.com
- Login with your account
- Select project "gendialup"
- Check if project is active (not paused)
- Check API Keys section for the anon key

### Check 4: Verify Database Connection
- In Supabase, go to **Settings** → **API**
- Copy the anon key from there
- Update it in Vercel (Settings → Environment Variables)

---

## Environment Variables Summary

| Variable | Value | Type |
|----------|-------|------|
| `NEXT_PUBLIC_SUPABASE_URL` | `https://whzifpjvzyegapqxvoxj.supabase.co` | Public |
| `NEXT_PUBLIC_SUPABASE_ANON_KEY` | `eyJh...dE` (long JWT) | Public |
| `NEXT_PUBLIC_APP_URL` | `https://gendialup.vercel.app` | Public |
| `NEXT_PUBLIC_API_URL` | `https://gendialup.vercel.app/api` | Public |

---

## Local Development
Your `.env.local` file has these same variables and works locally at `http://localhost:3000`

## Production (Vercel)
Your Vercel environment variables will be used when deployed at `https://gendialup.vercel.app`

---

## Quick Checklist

✅ Variables added to Vercel dashboard  
✅ All 4 variables present  
✅ Full key values copied correctly  
✅ Project redeployed  
✅ Cache cleared  
✅ Wait 2-3 minutes for build  
✅ Test signup flow  

**Status**: Once redeployed, API key errors should be fixed! 🚀

