create table public.runs (
  id uuid default gen_random_uuid() primary key,
  user_id uuid references auth.users(id) on delete cascade not null,
  ran_at timestamp not null,
  notes text,
  created_at timestamp with time zone default now() not null
);

-- Enable Row Level Security
alter table public.runs enable row level security;

-- Policy: Users can insert their own runs
create policy "Users can insert their own runs"
  on public.runs for insert
  with check (auth.uid() = user_id);

-- Policy: Users can update their own runs
create policy "Users can update their own runs"
  on public.runs for update
  using (auth.uid() = user_id);

-- Policy: Users can delete their own runs
create policy "Users can delete their own runs"
  on public.runs for delete
  using (auth.uid() = user_id);

-- Create index for faster queries by user
create index runs_user_id_idx on public.runs(user_id);

-- Create index for ordering by date
create index runs_ran_at_idx on public.runs(created_at desc);

