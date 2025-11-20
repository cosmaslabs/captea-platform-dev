# Captea Platform - Database Schema

**Complete SQL schema for Supabase backend**
**Execute these commands in Supabase SQL Editor**

---

## 1. Profiles Table

```sql
-- Create profiles table
create table profiles (
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

-- Create profile on signup (trigger)
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

-- Enable real-time
alter publication supabase_realtime add table profiles;
```

---

## 2. Posts Table

```sql
-- Create posts table
create table posts (
  id uuid default uuid_generate_v4() primary key,
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
create index posts_user_id_idx on posts(user_id);
create index posts_created_at_idx on posts(created_at desc);

-- Enable real-time
alter publication supabase_realtime add table posts;
```

---

## 3. Likes Table

```sql
-- Create likes table
create table likes (
  id uuid default uuid_generate_v4() primary key,
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
create index likes_user_id_idx on likes(user_id);
create index likes_post_id_idx on likes(post_id);

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

create trigger likes_count_trigger
  after insert or delete on likes
  for each row execute function update_post_likes_count();

-- Enable real-time
alter publication supabase_realtime add table likes;
```

---

## 4. Comments Table

```sql
-- Create comments table
create table comments (
  id uuid default uuid_generate_v4() primary key,
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
create index comments_post_id_idx on comments(post_id);
create index comments_user_id_idx on comments(user_id);
create index comments_created_at_idx on comments(created_at desc);

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

create trigger comments_count_trigger
  after insert or delete on comments
  for each row execute function update_post_comments_count();

-- Enable real-time
alter publication supabase_realtime add table comments;
```

---

## 5. Storage Buckets

```sql
-- Create storage buckets for images and videos
insert into storage.buckets (id, name)
values
  ('avatars', 'avatars'),
  ('posts', 'posts')
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

---

## 6. Helper Functions

```sql
-- Function to get posts with user info (for feed)
create or replace function get_posts_with_details(
  page_size int default 10,
  page_offset int default 0
)
returns table (
  id uuid,
  content text,
  image_url text,
  video_url text,
  likes_count int,
  comments_count int,
  shares_count int,
  created_at timestamptz,
  user_id uuid,
  user_name text,
  user_avatar text,
  user_liked boolean
) as $$
begin
  return query
  select
    p.id,
    p.content,
    p.image_url,
    p.video_url,
    p.likes_count,
    p.comments_count,
    p.shares_count,
    p.created_at,
    pr.id as user_id,
    pr.name as user_name,
    pr.avatar_url as user_avatar,
    exists(
      select 1 from likes l
      where l.post_id = p.id
      and l.user_id = auth.uid()
    ) as user_liked
  from posts p
  join profiles pr on p.user_id = pr.id
  order by p.created_at desc
  limit page_size
  offset page_offset;
end;
$$ language plpgsql security definer;
```

---

## 7. Messages & Conversations Tables

```sql
-- Create messages table
create table messages (
  id uuid default gen_random_uuid() primary key,
  sender_id uuid references auth.users on delete cascade not null,
  receiver_id uuid references auth.users on delete cascade not null,
  content text not null,
  read boolean default false,
  created_at timestamp with time zone default now(),
  updated_at timestamp with time zone default now()
);

-- Create indexes for better query performance
create index messages_sender_id_idx on messages (sender_id);
create index messages_receiver_id_idx on messages (receiver_id);
create index messages_created_at_idx on messages (created_at desc);
create index messages_conversation_idx on messages (sender_id, receiver_id, created_at desc);

-- Enable RLS
alter table messages enable row level security;

-- Policies - users can only see messages they sent or received
create policy "Users can view their own messages"
  on messages for select
  using (auth.uid() = sender_id or auth.uid() = receiver_id);

create policy "Users can insert their own messages"
  on messages for insert
  with check (auth.uid() = sender_id);

create policy "Users can update their received messages"
  on messages for update
  using (auth.uid() = receiver_id);

-- Enable real-time
alter publication supabase_realtime add table messages;

-- Create conversations view for chat list
create or replace view conversations as
select distinct on (conversation_id)
  conversation_id,
  user_id,
  participant_id,
  last_message,
  last_message_time,
  unread_count
from (
  select
    case
      when m.sender_id < m.receiver_id
      then m.sender_id || '-' || m.receiver_id
      else m.receiver_id || '-' || m.sender_id
    end as conversation_id,
    case
      when m.sender_id = auth.uid() then m.sender_id
      else m.receiver_id
    end as user_id,
    case
      when m.sender_id = auth.uid() then m.receiver_id
      else m.sender_id
    end as participant_id,
    m.content as last_message,
    m.created_at as last_message_time,
    (
      select count(*)
      from messages m2
      where m2.receiver_id = auth.uid()
      and m2.sender_id = (
        case
          when m.sender_id = auth.uid() then m.receiver_id
          else m.sender_id
        end
      )
      and m2.read = false
    ) as unread_count
  from messages m
  where m.sender_id = auth.uid() or m.receiver_id = auth.uid()
  order by m.created_at desc
) as conversation_data
order by conversation_id, last_message_time desc;
```

---

## Setup Instructions

1. **Open Supabase Dashboard** → SQL Editor
2. **Execute each section** in order (Profiles → Posts → Likes → Comments → Messages → Storage → Functions)
3. **Verify tables** in Table Editor
4. **Enable Real-time** in Database → Replication (if not auto-enabled)
5. **Test RLS policies** by creating test data

---

## Quick Verification Queries

```sql
-- Check all tables
select table_name from information_schema.tables
where table_schema = 'public'
order by table_name;

-- Check RLS is enabled
select tablename, rowsecurity
from pg_tables
where schemaname = 'public';

-- Check real-time publications
select * from pg_publication_tables
where pubname = 'supabase_realtime';
```

---

**Status**: Ready for Phase 3 implementation
**Last Updated**: November 20, 2025
