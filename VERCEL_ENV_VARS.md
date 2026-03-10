# 🔑 Add Environment Variables to Vercel

## The Issue
"Invalid API Key" error means Vercel deployment doesn't have the Supabase credentials.

The `.env.local` file is gitignored (not pushed to GitHub), so Vercel doesn't know about it.

## Solution
Add environment variables directly to Vercel dashboard.

---

## Step-by-Step Instructions

### Step 1: Go to Vercel Dashboard
1. Visit: https://vercel.com/dashboard
2. Click on "gendialup" project
3. Click "Settings" tab (top right)
4. Click "Environment Variables" (left sidebar)

### Step 2: Add Supabase URL
1. Click "Add New"
2. **Name:** `NEXT_PUBLIC_SUPABASE_URL`
3. **Value:** `https://whzifpjvzyegapqxvoxj.supabase.co`
4. **Environments:** Check all (Production, Preview, Development)
5. Click "Save"

### Step 3: Add Supabase API Key
1. Click "Add New"
2. **Name:** `NEXT_PUBLIC_SUPABASE_ANON_KEY`
3. **Value:** `eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6IndoemlmcGp2enlIZ2FwcXh2b3hqIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzI5NTg5OTEsImV4cCI6MjA4ODUzNDk5MX0._ai9G0STa54H_UaZuzVXsjS_A-uoOGRDa6KcnEIXydE`
4. **Environments:** Check all (Production, Preview, Development)
5. Click "Save"

### Step 4: Add App URL
1. Click "Add New"
2. **Name:** `NEXT_PUBLIC_APP_URL`
3. **Value:** `https://gendialup.vercel.app`
4. **Environments:** Check Production only
5. Click "Save"

### Step 5: Add API URL
1. Click "Add New"
2. **Name:** `NEXT_PUBLIC_API_URL`
3. **Value:** `https://gendialup.vercel.app/api`
4. **Environments:** Check Production only
5. Click "Save"

---

## Summary Table

| Name | Value | Environments |
|------|-------|--------------|
| `NEXT_PUBLIC_SUPABASE_URL` | `https://whzifpjvzyegapqxvoxj.supabase.co` | All |
| `NEXT_PUBLIC_SUPABASE_ANON_KEY` | `eyJhbGc...` | All |
| `NEXT_PUBLIC_APP_URL` | `https://gendialup.vercel.app` | Production |
| `NEXT_PUBLIC_API_URL` | `https://gendialup.vercel.app/api` | Production |

---

## Step 6: Redeploy

After adding environment variables:

### Option A: Manual Redeploy
1. Go to Vercel Dashboard
2. Click "Deployments"
3. Find the latest deployment
4. Click "..." menu
5. Click "Redeploy"
6. Wait 2-3 minutes

### Option B: Automatic Redeploy
1. Push any change to GitHub:
```bash
git commit --allow-empty -m "Trigger redeploy with env vars"
git push origin main
```
2. Vercel auto-deploys

---

## Verification

After redeploy, visit:
```
https://gendialup.vercel.app/login
```

You should see:
✅ 90s collage background loads
✅ Form is visible
✅ NO "Invalid API Key" error
✅ Can enter email/password
✅ Can attempt login/signup

---

## If Still Getting Invalid API Key Error

### Check 1: Verify Environment Variables
1. Go to Vercel Settings → Environment Variables
2. Confirm all 4 variables are added
3. Check values are correct (no extra spaces)

### Check 2: Check Build Logs
1. Go to Vercel Deployments
2. Click latest deployment
3. Check "Build Logs"
4. Look for any errors about environment variables

### Check 3: Force Clear Cache
1. Go to latest deployment
2. Click "..." menu
3. Click "Clear Cache & Redeploy"
4. Wait 2-3 minutes

### Check 4: Browser Cache
1. Clear browser cache (Ctrl+Shift+Delete)
2. Close browser completely
3. Reopen browser
4. Visit site again

---

## Environment Variables Explained

### NEXT_PUBLIC_SUPABASE_URL
- **What:** Your Supabase project URL
- **Why:** Tells app where database is located
- **Value:** `https://whzifpjvzyegapqxvoxj.supabase.co`
- **Public:** Yes (safe to expose)

### NEXT_PUBLIC_SUPABASE_ANON_KEY
- **What:** Anonymous API key for Supabase
- **Why:** Allows unauthenticated access to database
- **Value:** Long JWT token
- **Public:** Yes (limited permissions)
- **Note:** Has RLS (Row Level Security) protection

### NEXT_PUBLIC_APP_URL
- **What:** Your deployed app URL
- **Why:** Used for redirects and email links
- **Value:** `https://gendialup.vercel.app`
- **Public:** Yes

### NEXT_PUBLIC_API_URL
- **What:** Your API endpoint base URL
- **Why:** Used for API calls from frontend
- **Value:** `https://gendialup.vercel.app/api`
- **Public:** Yes

---

## Key Points

✅ ALL these variables are PUBLIC (prefix: `NEXT_PUBLIC_`)
✅ It's safe to add them to Vercel (they're embedded in frontend)
✅ The API key has RLS protection (limited permissions)
✅ Don't add secret keys (no `NEXT_PUBLIC_` for secrets)
✅ Environment variables must match `.env.local` exactly

---

## Checklist

- [ ] Visited Vercel Settings → Environment Variables
- [ ] Added `NEXT_PUBLIC_SUPABASE_URL`
- [ ] Added `NEXT_PUBLIC_SUPABASE_ANON_KEY`
- [ ] Added `NEXT_PUBLIC_APP_URL`
- [ ] Added `NEXT_PUBLIC_API_URL`
- [ ] All variables set for correct environments
- [ ] Triggered redeploy
- [ ] Waited 2-3 minutes for build
- [ ] Visited https://gendialup.vercel.app/login
- [ ] No "Invalid API Key" error
- [ ] 90s collage background visible

---

Good luck! This should fix the "Invalid API Key" error! 🚀
