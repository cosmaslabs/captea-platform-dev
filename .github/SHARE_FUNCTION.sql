-- SQL Function to increment share count
-- Run this in Supabase SQL Editor to enable proper share tracking
 -- Function to increment share count

create or replace function increment_share_count(post_id uuid) returns void language plpgsql security definer as $$
begin
  update posts
  set shares_count = shares_count + 1
  where id = post_id;
end;
$$;

-- Alternative: If the above doesn't work, use this simpler approach
-- The app will handle it with a direct UPDATE query
