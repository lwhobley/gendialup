-- ============================================================================
-- FIX RLS POLICIES FOR PROFILES TABLE
-- ============================================================================
-- This script fixes the "violates row-level security policy" error
-- by creating proper RLS policies for the profiles table

-- ============================================================================
-- 1. ENABLE RLS ON PROFILES TABLE
-- ============================================================================
ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;

-- ============================================================================
-- 2. DROP EXISTING POLICIES (if any)
-- ============================================================================
DROP POLICY IF EXISTS "Users can view their own profile" ON public.profiles;
DROP POLICY IF EXISTS "Users can insert their own profile" ON public.profiles;
DROP POLICY IF EXISTS "Users can update their own profile" ON public.profiles;
DROP POLICY IF EXISTS "Users can delete their own profile" ON public.profiles;
DROP POLICY IF EXISTS "Users can view all profiles for matching" ON public.profiles;

-- ============================================================================
-- 3. CREATE NEW RLS POLICIES
-- ============================================================================

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

-- ============================================================================
-- VERIFY POLICIES ARE CREATED
-- ============================================================================
-- Run this to check if policies exist:
-- SELECT * FROM pg_policies WHERE tablename = 'profiles';

-- ============================================================================
-- NOTES:
-- ============================================================================
-- - RLS is now ENABLED on profiles table
-- - Users can SELECT (view) their own profile or all profiles (for matching)
-- - Users can INSERT their own profile during onboarding
-- - Users can UPDATE their own profile
-- - Users can DELETE their own profile
-- - The `id` field matches the user's `auth.uid()`
-- - All policies require user to be authenticated
