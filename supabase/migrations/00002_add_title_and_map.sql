-- Add title field (max 50 characters)
alter table public.runs
  add column title varchar(50) not null default 'untitled';

-- Add map_url field to store reference to image in Supabase Storage
alter table public.runs
  add column map_url text;

alter table public.runs
  alter column notes set not null;

-- Create storage bucket for run map images
insert into storage.buckets (id, name, public)
values ('run-maps', 'run-maps', true);

-- Policy: Anyone can view run map images (public bucket)
create policy "Public read access for run maps"
  on storage.objects for select
  using (bucket_id = 'run-maps');

-- Policy: Authenticated users can upload run maps
create policy "Authenticated users can upload run maps"
  on storage.objects for insert
  with check (
    bucket_id = 'run-maps' 
    and auth.role() = 'authenticated'
  );

-- Policy: Users can update their own run maps (owner is auto-set on upload)
create policy "Users can update their own run maps"
  on storage.objects for update
  using (
    bucket_id = 'run-maps' 
    and auth.uid() = owner
  );

-- Policy: Users can delete their own run maps
create policy "Users can delete their own run maps"
  on storage.objects for delete
  using (
    bucket_id = 'run-maps' 
    and auth.uid() = owner
  );
