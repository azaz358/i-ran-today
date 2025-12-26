-- Insert test user into auth.users
INSERT INTO auth.users (
  id,
  instance_id,
  email,
  encrypted_password,
  email_confirmed_at,
  created_at,
  updated_at,
  raw_app_meta_data,
  raw_user_meta_data,
  aud,
  role,
  confirmation_token,
  recovery_token,
  email_change_token_new,
  email_change
) VALUES (
  gen_random_uuid(),
  '00000000-0000-0000-0000-000000000000',
  'test@example.com',
  crypt('testtest123', gen_salt('bf')),
  now(),
  now(),
  now(),
  '{"provider":"email","providers":["email"]}',
  '{}',
  'authenticated',
  'authenticated',
  '',
  '',
  '',
  ''
);

INSERT INTO public.runs (
    id,
    user_id,
    title,
    ran_at,
    map_url,
    notes,
    created_at
) VALUES (
    gen_random_uuid(),
    (SELECT id FROM auth.users WHERE email = 'test@example.com'),
    'test run',
    now() - interval '1 day',
    null,
    'this is a test run.',
    now()
)