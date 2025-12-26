-- Policy: Anyone can view runs (public feed)
create policy "Anyone can view runs"
  on public.runs for select
  using (true);

