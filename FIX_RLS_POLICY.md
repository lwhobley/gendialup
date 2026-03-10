# 🔐 Fix Row Level Security (RLS) Policy Error

## The Problem

When submitting profile on onboarding, you get:
```
new row violates row-level security policy for table "profiles"
```

This means the RLS policy isn't configured correctly.

---

## The Solution

Go to Supabase and run the SQL script to fix RLS policies.

### Step 1: Open Supabase Dashboard

Visit: https://app.supabase.com

1. Click on your project
2. Go to **SQL Editor** (left sidebar)

### Step 2: Create New Query

1. Click "New Query"
2. Copy & paste the SQL script below:

```sql
-- ============================================================================
-- FIX RLS POLICIES FOR PROFILES TABLE
-- ============================================================================

-- 1. ENABLE RLS ON PROFILES TABLE
ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;

-- 2. DROP EXISTING POLICIES (if any)
DROP POLICY IF EXISTS "Users can view their own profile" ON public.profiles;
DROP POLICY IF EXISTS "Users can insert their own profile" ON public.profiles;
DROP POLICY IF EXISTS "Users can update their own profile" ON public.profiles;
DROP POLICY IF EXISTS "Users can delete their own profile" ON public.profiles;
DROP POLICY IF EXISTS "Users can view all profiles for matching" ON public.profiles;

-- 3. CREATE NEW RLS POLICIES

-- ALLOW USERS TO VIEW THEIR OWN PROFILE
CREATE POLICY "Users can view their own profile"
  ON public.profiles
  FOR SELECT
  USING (
    auth.uid() = id
  );

-- ALLOW USERS TO VIEW ALL PROFILES (for matching algorithm)
CREATE POLICY "Users can view all profiles for matching"
  ON public.profiles
  FOR SELECT
  USING (
    auth.role() = 'authenticated'
  );

-- ALLOW USERS TO INSERT THEIR OWN PROFILE
CREATE POLICY "Users can insert their own profile"
  ON public.profiles
  FOR INSERT
  WITH CHECK (
    auth.uid() = id
  );

-- ALLOW USERS TO UPDATE THEIR OWN PROFILE
CREATE POLICY "Users can update their own profile"
  ON public.profiles
  FOR UPDATE
  USING (
    auth.uid() = id
  )
  WITH CHECK (
    auth.uid() = id
  );

-- ALLOW USERS TO DELETE THEIR OWN PROFILE
CREATE POLICY "Users can delete their own profile"
  ON public.profiles
  FOR DELETE
  USING (
    auth.uid() = id
  );
```

### Step 3: Run the Query

Click **"Run"** button (or Cmd+Enter)

You should see:
```
Query executed successfully
```

### Step 4: Verify Policies

Run this query to check:

```sql
SELECT * FROM pg_policies WHERE tablename = 'profiles';
```

You should see 5 policies listed:
- Users can view their own profile
- Users can view all profiles for matching
- Users can insert their own profile
- Users can update their own profile
- Users can delete their own profile

---

## What These Policies Do

| Policy | Action | Who | Condition |
|--------|--------|-----|-----------|
| View own | SELECT | Any user | `auth.uid() = id` |
| View all | SELECT | Authenticated | All profiles visible |
| Insert | INSERT | Any user | `auth.uid() = id` |
| Update | UPDATE | Any user | `auth.uid() = id` |
| Delete | DELETE | Any user | `auth.uid() = id` |

---

## Test It

After running the script:

1. Go back to your app
2. Visit: https://gendialup.vercel.app/signup
3. Sign up with new email
4. Fill onboarding form
5. Select interests
6. Click "Continue to Matches"
7. ✅ Should work now! No RLS error!

---

## If Still Getting Error

1. **Check user ID format**: Make sure profile `id` matches `auth.uid()` format
2. **Verify RLS is enabled**: Run `ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;`
3. **Check policies exist**: Run the verification query above
4. **Clear browser cache**: Ctrl+Shift+Delete
5. **Check console errors**: Press F12, look for error messages

---

## Why This Happened

- When you created the profiles table, RLS wasn't properly configured
- Supabase requires explicit policies to allow INSERT/UPDATE/DELETE
- Without policies, all operations are blocked by default
- This is a security feature to prevent unauthorized access

---

## Security Notes

✅ Users can only access their own profile
✅ Users can view all profiles (needed for matching)
✅ No one can modify another user's profile
✅ All operations require authentication
✅ The `id` field matches `auth.uid()` for security

Good luck! 🚀
