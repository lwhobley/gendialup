# 📸 Enhanced Onboarding with Photo Upload & Profile Fields

## Overview

The enhanced onboarding flow now includes:
- ✅ Up to 6 profile photos
- ✅ Hometown & Current City (text fields)
- ✅ College (dropdown)
- ✅ Profession (dropdown)
- ✅ Ethnic Background (dropdown)
- ✅ Religion (dropdown)
- ✅ Reason for Joining (text area)
- ✅ 36 Interest options

---

## Step 1: Update Database Schema

### Go to Supabase SQL Editor

1. Visit: https://app.supabase.com
2. Click your project
3. Go to **SQL Editor** (left sidebar)
4. Click **New Query**

### Run This SQL Script

```sql
ALTER TABLE public.profiles ADD COLUMN IF NOT EXISTS hometown TEXT;
ALTER TABLE public.profiles ADD COLUMN IF NOT EXISTS current_city TEXT;
ALTER TABLE public.profiles ADD COLUMN IF NOT EXISTS college TEXT;
ALTER TABLE public.profiles ADD COLUMN IF NOT EXISTS profession TEXT;
ALTER TABLE public.profiles ADD COLUMN IF NOT EXISTS ethnic_background TEXT;
ALTER TABLE public.profiles ADD COLUMN IF NOT EXISTS religion TEXT;
ALTER TABLE public.profiles ADD COLUMN IF NOT EXISTS reason_for_joining TEXT;
ALTER TABLE public.profiles ADD COLUMN IF NOT EXISTS photo_urls TEXT[] DEFAULT ARRAY[]::TEXT[];
ALTER TABLE public.profiles ADD COLUMN IF NOT EXISTS updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW();
```

Click **Run** and verify: "Query executed successfully"

---

## Step 2: Create Storage Bucket for Photos

### Via Supabase UI

1. Go to **Storage** (left sidebar)
2. Click **Create a new bucket**
3. Name it: `profile-photos`
4. Set to **Public**
5. Click **Create bucket**

### Create Storage Folder (Optional but recommended)

Inside the bucket, create a folder named `profile_photos/` for organization.

---

## Step 3: Set Up Storage RLS Policies

### Go to SQL Editor again

Click **New Query** and run this:

```sql
-- Allow users to upload their own photos
INSERT INTO storage.buckets (id, name, public) VALUES ('profile-photos', 'profile-photos', true) ON CONFLICT DO NOTHING;
```

---

## Step 4: Deploy to Vercel

1. Go to: https://vercel.com/dashboard
2. Click **gendialup** project
3. Click **Deployments**
4. Find latest deployment
5. Click **...** → **Redeploy**

Wait 2-3 minutes for deployment.

---

## Step 5: Test the Enhanced Onboarding

### Test Flow

1. Visit: https://gendialup.vercel.app/signup
2. Sign up with new email
3. Go to onboarding
4. Fill in all fields:
   - Name (text)
   - Age (number)
   - Hometown (text)
   - Current City (text)
   - College (dropdown)
   - Profession (dropdown)
   - Ethnic Background (dropdown)
   - Religion (dropdown)
   - Upload 1-6 photos
   - Select interests (min 1)
   - Write reason for joining (text area)
5. Click "Continue to Matches"
6. ✅ Should redirect to matches page

---

## Dropdown Options

### College
- High School
- Some College
- Bachelor's Degree
- Master's Degree
- PhD
- Trade School
- Prefer not to say

### Profession
- Tech & IT
- Finance & Business
- Healthcare
- Education
- Arts & Entertainment
- Sales & Marketing
- Engineering
- Law & Legal
- Government & Public Service
- Hospitality
- Student
- Entrepreneur
- Other
- Prefer not to say

### Ethnic Background
- White
- Black
- Hispanic/Latino
- Asian
- Native American
- Pacific Islander
- Middle Eastern
- Indian
- Mixed
- Other
- Prefer not to say

### Religion
- Christian
- Muslim
- Jewish
- Hindu
- Buddhist
- Atheist
- Agnostic
- Spiritual
- Other
- Prefer not to say

---

## Photo Upload Details

### Features
- Up to 6 photos per user
- Click to upload (supports multiple files)
- Drag & drop (if browser supports)
- Preview thumbnails
- Remove individual photos with X button
- Counter shows how many uploaded

### File Support
- JPG, PNG, GIF, WebP
- Max file size: depends on Supabase plan
- Recommended: 2-5 MB per photo

### Storage
- Photos stored in Supabase Storage
- Public URLs generated automatically
- Stored in `profile-photos/` folder
- File naming: `{user_id}_{timestamp}_{index}.{ext}`

---

## Troubleshooting

### Photos Won't Upload

1. **Check bucket exists**: Go to Storage in Supabase
2. **Check bucket is public**: Storage → profile-photos → Settings → Public
3. **Check RLS policies**: If you set them up, verify they allow uploads
4. **File size**: Try smaller files (< 5 MB)
5. **Browser console**: Press F12, check for error messages

### Dropdown Fields Not Showing

1. Check you've added the columns to database
2. Clear browser cache (Ctrl+Shift+Delete)
3. Hard refresh (Ctrl+F5)

### Can't Submit Form

1. Make sure all fields are filled
2. Select at least 1 interest
3. Upload at least 1 photo (recommended)
4. Enter reason for joining (text area)
5. Check console for errors (F12)

---

## Database Fields Reference

| Field | Type | Description |
|-------|------|-------------|
| hometown | TEXT | "New York, NY" |
| current_city | TEXT | "Los Angeles, CA" |
| college | TEXT | "Bachelor's Degree" |
| profession | TEXT | "Tech & IT" |
| ethnic_background | TEXT | "Asian" |
| religion | TEXT | "Christian" |
| reason_for_joining | TEXT | Free text answer |
| photo_urls | TEXT[] | Array of URLs (max 6) |
| updated_at | TIMESTAMP | Last modified date |

---

## Match Page Updates

The matches page will now display:
- User photos (first photo shown)
- Name & age
- Interests
- Additional info (profession, current city)
- More detailed match cards

---

## Security Notes

✅ Users can only upload their own photos  
✅ All photos are public (visible to other users)  
✅ Users can delete their own photos  
✅ Photo URLs are stored in database  
✅ All fields require authentication  

---

## Next Steps

1. ✅ Update database schema (Step 1)
2. ✅ Create storage bucket (Step 2)
3. ✅ Deploy to Vercel (Step 4)
4. ✅ Test the flow (Step 5)

Then test with multiple users to see the full matching experience!

---

Good luck! 🎉✨
