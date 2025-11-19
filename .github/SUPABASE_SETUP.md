# Supabase Database Setup - Quick Guide

**Execute these steps in order to set up your database**

---

## Step 1: Open Supabase SQL Editor

1. Go to <https://supabase.com/dashboard>
2. Select your project: `pmgqsmjjkjdebxfpfcyj`
3. Click **SQL Editor** in the left sidebar
4. Click **New Query**

---

## Step 2: Execute Schema (Copy & Run Each Section)

### 🔹 Section 1: Profiles Table

```sql
-- Create profiles table
create table if not exists profiles (
  id uuid references auth.users on delete cascade primary key,
  email text unique not null,
  name text,
  bio text,
  avatar_url text,
  created_at timestamp with time zone default now(),
  updated_at timestamp with time zone default now()
);

-- Enable RLS
alter table profiles enable row level security;

-- Policies
create policy "Public profiles are viewable by everyone"
  on profiles for select
  using (true);

create policy "Users can insert their own profile"
  on profiles for insert
  with check (auth.uid() = id);

create policy "Users can update their own profile"
  on profiles for update
  using (auth.uid() = id);

-- Auto-create profile on signup
create or replace function public.handle_new_user()
returns trigger as $$
begin
  insert into public.profiles (id, email, name)
  values (
    new.id,
    new.email,
    new.raw_user_meta_data->>'name'
  );
  return new;
end;
$$ language plpgsql security definer;

create trigger on_auth_user_created
  after insert on auth.users
  for each row execute procedure public.handle_new_user();
```

**✅ Click "Run" - Should see "Success. No rows returned"**

---

### 🔹 Section 2: Posts Table

```sql
-- Create posts table
create table if not exists posts (
  id uuid default gen_random_uuid() primary key,
  user_id uuid references profiles(id) on delete cascade not null,
  content text not null,
  image_url text,
  video_url text,
  likes_count integer default 0,
  comments_count integer default 0,
  shares_count integer default 0,
  created_at timestamp with time zone default now(),
  updated_at timestamp with time zone default now()
);

-- Enable RLS
alter table posts enable row level security;

-- Policies
create policy "Posts are viewable by everyone"
  on posts for select
  using (true);

create policy "Authenticated users can create posts"
  on posts for insert
  with check (auth.uid() = user_id);

create policy "Users can update their own posts"
  on posts for update
  using (auth.uid() = user_id);

create policy "Users can delete their own posts"
  on posts for delete
  using (auth.uid() = user_id);

-- Indexes
create index if not exists posts_user_id_idx on posts(user_id);
create index if not exists posts_created_at_idx on posts(created_at desc);
```

**✅ Click "Run" - Should see "Success. No rows returned"**

---

### 🔹 Section 3: Likes Table

```sql
-- Create likes table
create table if not exists likes (
  id uuid default gen_random_uuid() primary key,
  user_id uuid references profiles(id) on delete cascade not null,
  post_id uuid references posts(id) on delete cascade not null,
  created_at timestamp with time zone default now(),
  unique(user_id, post_id)
);

-- Enable RLS
alter table likes enable row level security;

-- Policies
create policy "Likes are viewable by everyone"
  on likes for select
  using (true);

create policy "Authenticated users can like posts"
  on likes for insert
  with check (auth.uid() = user_id);

create policy "Users can unlike posts"
  on likes for delete
  using (auth.uid() = user_id);

-- Indexes
create index if not exists likes_user_id_idx on likes(user_id);
create index if not exists likes_post_id_idx on likes(post_id);

-- Update likes count trigger
create or replace function update_post_likes_count()
returns trigger as $$
begin
  if (TG_OP = 'INSERT') then
    update posts set likes_count = likes_count + 1 where id = NEW.post_id;
  elsif (TG_OP = 'DELETE') then
    update posts set likes_count = likes_count - 1 where id = OLD.post_id;
  end if;
  return null;
end;
$$ language plpgsql;

drop trigger if exists likes_count_trigger on likes;
create trigger likes_count_trigger
  after insert or delete on likes
  for each row execute function update_post_likes_count();
```

**✅ Click "Run" - Should see "Success. No rows returned"**

---

### 🔹 Section 4: Comments Table

```sql
-- Create comments table
create table if not exists comments (
  id uuid default gen_random_uuid() primary key,
  user_id uuid references profiles(id) on delete cascade not null,
  post_id uuid references posts(id) on delete cascade not null,
  content text not null,
  created_at timestamp with time zone default now(),
  updated_at timestamp with time zone default now()
);

-- Enable RLS
alter table comments enable row level security;

-- Policies
create policy "Comments are viewable by everyone"
  on comments for select
  using (true);

create policy "Authenticated users can create comments"
  on comments for insert
  with check (auth.uid() = user_id);

create policy "Users can update their own comments"
  on comments for update
  using (auth.uid() = user_id);

create policy "Users can delete their own comments"
  on comments for delete
  using (auth.uid() = user_id);

create policy "Post owners can delete comments on their posts"
  on comments for delete
  using (
    exists (
      select 1 from posts
      where posts.id = comments.post_id
      and posts.user_id = auth.uid()
    )
  );

-- Indexes
create index if not exists comments_post_id_idx on comments(post_id);
create index if not exists comments_user_id_idx on comments(user_id);
create index if not exists comments_created_at_idx on comments(created_at desc);

-- Update comments count trigger
create or replace function update_post_comments_count()
returns trigger as $$
begin
  if (TG_OP = 'INSERT') then
    update posts set comments_count = comments_count + 1 where id = NEW.post_id;
  elsif (TG_OP = 'DELETE') then
    update posts set comments_count = comments_count - 1 where id = OLD.post_id;
  end if;
  return null;
end;
$$ language plpgsql;

drop trigger if exists comments_count_trigger on comments;
create trigger comments_count_trigger
  after insert or delete on comments
  for each row execute function update_post_comments_count();
```

**✅ Click "Run" - Should see "Success. No rows returned"**

---

### 🔹 Section 5: Enable Real-Time

```sql
-- Enable real-time for all tables
alter publication supabase_realtime add table profiles;
alter publication supabase_realtime add table posts;
alter publication supabase_realtime add table likes;
alter publication supabase_realtime add table comments;
```

**✅ Click "Run" - Should see "Success. No rows returned"**

---

### 🔹 Section 6: Storage Buckets

```sql
-- Create storage buckets
insert into storage.buckets (id, name, public)
values
  ('avatars', 'avatars', true),
  ('posts', 'posts', true)
on conflict (id) do nothing;

-- Storage policies for avatars
create policy "Avatar images are publicly accessible"
  on storage.objects for select
  using (bucket_id = 'avatars');

create policy "Authenticated users can upload avatars"
  on storage.objects for insert
  with check (
    bucket_id = 'avatars'
    and auth.uid()::text = (storage.foldername(name))[1]
  );

create policy "Users can update their own avatars"
  on storage.objects for update
  using (
    bucket_id = 'avatars'
    and auth.uid()::text = (storage.foldername(name))[1]
  );

create policy "Users can delete their own avatars"
  on storage.objects for delete
  using (
    bucket_id = 'avatars'
    and auth.uid()::text = (storage.foldername(name))[1]
  );

-- Storage policies for posts
create policy "Post images are publicly accessible"
  on storage.objects for select
  using (bucket_id = 'posts');

create policy "Authenticated users can upload post media"
  on storage.objects for insert
  with check (
    bucket_id = 'posts'
    and auth.uid()::text = (storage.foldername(name))[1]
  );

create policy "Users can delete their own post media"
  on storage.objects for delete
  using (
    bucket_id = 'posts'
    and auth.uid()::text = (storage.foldername(name))[1]
  );
```

**✅ Click "Run" - Should see "Success. No rows returned"**

---

## Step 3: Verify Setup

Run this verification query:

```sql
-- Check all tables exist
select table_name
from information_schema.tables
where table_schema = 'public'
and table_name in ('profiles', 'posts', 'likes', 'comments')
order by table_name;

-- Check RLS is enabled
select tablename, rowsecurity
from pg_tables
where schemaname = 'public'
and tablename in ('profiles', 'posts', 'likes', 'comments');

-- Check real-time is enabled
select schemaname, tablename
from pg_publication_tables
where pubname = 'supabase_realtime';
```

**Expected Results:**

- 4 tables: comments, likes, posts, profiles
- All tables have RLS enabled (rowsecurity = true)
- All 4 tables in real-time publication

---

## Step 4: Insert Test Data

```sql
-- Insert test post (replace with your actual user ID)
insert into posts (user_id, content)
values (auth.uid(), 'Hello Captea! 🎉 This is my first post on the platform. Excited to connect with everyone!');

-- Check it worked
select
  p.*,
  pr.name as user_name,
  pr.avatar_url
from posts p
join profiles pr on p.user_id = pr.id
order by p.created_at desc
limit 5;
```

---

## Step 5: Test in App

1. **Restart your Expo app**:

   ```bash
   # Kill the current server (Ctrl+C)
   npx expo start --clear
   ```

2. **Login to your account**

3. **Expected behavior**:
   - ✅ Home screen shows post feed (not placeholder)
   - ✅ Test post appears if you created one
   - ✅ Can pull down to refresh
   - ✅ Can tap heart to like
   - ✅ Can tap profile icon to view profile

---

## Troubleshooting

**Error: "relation does not exist"**

- Table wasn't created. Re-run that section's SQL

**Error: "permission denied"**

- RLS policy issue. Check policies are created

**Error: "new row violates foreign key"**

- Profile doesn't exist. Check trigger created your profile

**Posts not showing in app**

- Check Supabase Table Editor → posts table
- Verify data exists
- Check console for errors

**Real-time not working**

- Check Database → Replication settings
- Verify tables are in publication

---

## Quick Reference Commands

```bash
# Restart Expo with cache clear
npx expo start --clear

# View app logs
# Press 'j' in Expo terminal to open debugger

# Check Supabase connection
# Should see "Auth state changed" in console when logging in
```

---

**Setup Status**: Ready to execute ✅
**Next**: Run SQL sections 1-6, verify, then test in app!
