-- Fix for "Database error saving new user" during OAuth registration
-- Because 'profile_slug' has a NOT NULL constraint, the automatic user trigger fails to insert
-- the new row when someone signs in with Google, causing the entire registration to abort.

ALTER TABLE public.profiles
ALTER COLUMN profile_slug DROP NOT NULL;

-- Alternatively, if you want it to be required later, you can set a default value:
-- ALTER TABLE public.profiles ALTER COLUMN profile_slug SET DEFAULT 'user-' || gen_random_uuid();
