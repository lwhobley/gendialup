-- ============================================================================
-- ADD NEW PROFILE FIELDS AND STORAGE FOR PHOTOS
-- ============================================================================

-- 1. ALTER PROFILES TABLE TO ADD NEW COLUMNS
ALTER TABLE public.profiles ADD COLUMN IF NOT EXISTS hometown TEXT;
ALTER TABLE public.profiles ADD COLUMN IF NOT EXISTS current_city TEXT;
ALTER TABLE public.profiles ADD COLUMN IF NOT EXISTS college TEXT;
ALTER TABLE public.profiles ADD COLUMN IF NOT EXISTS profession TEXT;
ALTER TABLE public.profiles ADD COLUMN IF NOT EXISTS ethnic_background TEXT;
ALTER TABLE public.profiles ADD COLUMN IF NOT EXISTS religion TEXT;
ALTER TABLE public.profiles ADD COLUMN IF NOT EXISTS reason_for_joining TEXT;
ALTER TABLE public.profiles ADD COLUMN IF NOT EXISTS photo_urls TEXT[] DEFAULT ARRAY[]::TEXT[];
ALTER TABLE public.profiles ADD COLUMN IF NOT EXISTS updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW();

-- 2. CREATE STORAGE BUCKET FOR PROFILE PHOTOS (if not exists)
-- Run this in Supabase SQL Editor:
-- INSERT INTO storage.buckets (id, name, public) VALUES ('profile-photos', 'profile-photos', true) ON CONFLICT DO NOTHING;

-- 3. UPDATE RLS POLICIES FOR NEW FIELDS

-- Drop old policies if they exist
DROP POLICY IF EXISTS "Users can update their own profile" ON public.profiles;

-- Create new update policy that allows all new fields
CREATE POLICY "Users can update their own profile"
  ON public.profiles
  FOR UPDATE
  USING (
    auth.uid() = id
  )
  WITH CHECK (
    auth.uid() = id
  );

-- ============================================================================
-- NOTES:
-- ============================================================================
-- New columns added to profiles table:
-- - hometown: TEXT (e.g., "New York, NY")
-- - current_city: TEXT (e.g., "Los Angeles, CA")
-- - college: TEXT (e.g., "Bachelor's Degree")
-- - profession: TEXT (e.g., "Tech & IT")
-- - ethnic_background: TEXT (e.g., "Asian")
-- - religion: TEXT (e.g., "Christian")
-- - reason_for_joining: TEXT (free text)
-- - photo_urls: TEXT[] (array of photo URLs, max 6)
-- - updated_at: TIMESTAMP (tracks last update)

-- To create the storage bucket, run in Supabase SQL Editor or use the UI:
-- 1. Go to Storage
-- 2. Create new bucket named "profile-photos"
-- 3. Set to public
-- 4. Add RLS policies (see next section)

-- ============================================================================
-- STORAGE BUCKET RLS POLICIES
-- ============================================================================
-- After creating the bucket, add these RLS policies:

-- 1. Allow users to upload their own photos
-- CREATE POLICY "Users can upload their own photos"
--   ON storage.objects
--   FOR INSERT
--   WITH CHECK (
--     bucket_id = 'profile-photos' AND
--     auth.uid()::TEXT = (storage.foldername(name))[1]
--   );

-- 2. Allow users to view all profile photos (public)
-- CREATE POLICY "Anyone can view profile photos"
--   ON storage.objects
--   FOR SELECT
--   USING (bucket_id = 'profile-photos');

-- 3. Allow users to delete their own photos
-- CREATE POLICY "Users can delete their own photos"
--   ON storage.objects
--   FOR DELETE
--   USING (
--     bucket_id = 'profile-photos' AND
--     auth.uid()::TEXT = (storage.foldername(name))[1]
--   );
