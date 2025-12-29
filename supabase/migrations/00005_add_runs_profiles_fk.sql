-- Add foreign key from runs.user_id to profiles.id to enable PostgREST joins
-- This is valid because profiles.id and runs.user_id both reference auth.users.id
alter table public.runs
  add constraint runs_user_id_profiles_fkey
  foreign key (user_id)
  references public.profiles(id)
  on delete cascade;

