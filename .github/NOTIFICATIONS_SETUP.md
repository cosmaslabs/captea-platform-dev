# Notifications System - Database Schema & Triggers

## Step 1: Create Notifications Table

```sql
-- Create notifications table
create table if not exists notifications (
  id uuid default gen_random_uuid() primary key,
  user_id uuid references profiles(id) on delete cascade not null,
  sender_id uuid references profiles(id) on delete cascade,
  post_id uuid references posts(id) on delete cascade,
  comment_id uuid references comments(id) on delete cascade,
  type text not null check (type in ('like', 'comment', 'follow')),
  content text,
  read boolean default false,
  created_at timestamp with time zone default now()
);

-- Enable RLS
alter table notifications enable row level security;

-- Policies
create policy "Users can view their own notifications"
  on notifications for select
  using (auth.uid() = user_id);

create policy "Users can update their own notifications"
  on notifications for update
  using (auth.uid() = user_id);

create policy "Users can delete their own notifications"
  on notifications for delete
  using (auth.uid() = user_id);

-- Indexes
create index if not exists notifications_user_id_idx on notifications(user_id);
create index if not exists notifications_created_at_idx on notifications(created_at desc);
create index if not exists notifications_read_idx on notifications(read);
```

## Step 2: Create Notification Triggers

```sql
-- Function to create notification for likes
create or replace function create_like_notification()
returns trigger as $$
declare
  post_owner_id uuid;
begin
  -- Get the post owner
  select user_id into post_owner_id
  from posts
  where id = NEW.post_id;

  -- Don't notify if user likes their own post
  if NEW.user_id != post_owner_id then
    insert into notifications (user_id, sender_id, post_id, type)
    values (post_owner_id, NEW.user_id, NEW.post_id, 'like');
  end if;

  return NEW;
end;
$$ language plpgsql security definer;

-- Trigger for likes
drop trigger if exists like_notification_trigger on likes;
create trigger like_notification_trigger
  after insert on likes
  for each row execute function create_like_notification();
```

```sql
-- Function to create notification for comments
create or replace function create_comment_notification()
returns trigger as $$
declare
  post_owner_id uuid;
begin
  -- Get the post owner
  select user_id into post_owner_id
  from posts
  where id = NEW.post_id;

  -- Don't notify if user comments on their own post
  if NEW.user_id != post_owner_id then
    insert into notifications (user_id, sender_id, post_id, comment_id, type, content)
    values (post_owner_id, NEW.user_id, NEW.post_id, NEW.id, 'comment', NEW.content);
  end if;

  return NEW;
end;
$$ language plpgsql security definer;

-- Trigger for comments
drop trigger if exists comment_notification_trigger on comments;
create trigger comment_notification_trigger
  after insert on comments
  for each row execute function create_comment_notification();
```

## Step 3: Enable Real-Time for Notifications

```sql
-- Add notifications to real-time publication
alter publication supabase_realtime add table notifications;
```

## Step 4: Test Notifications

```sql
-- Check notifications for a user (replace with your user ID)
select
  n.*,
  p.name as sender_name,
  p.avatar_url as sender_avatar,
  posts.content as post_content
from notifications n
left join profiles p on n.sender_id = p.id
left join posts on n.post_id = posts.id
where n.user_id = 'YOUR-USER-ID-HERE'
order by n.created_at desc
limit 20;
```

## Step 5: Mark Notifications as Read

```sql
-- Mark single notification as read
update notifications
set read = true
where id = 'NOTIFICATION-ID';

-- Mark all notifications as read for a user
update notifications
set read = true
where user_id = auth.uid()
and read = false;
```

---

**Setup Instructions:**

1. Run Step 1 SQL in Supabase SQL Editor to create the table
2. Run Step 2 SQL to create notification triggers
3. Run Step 3 SQL to enable real-time
4. Test by liking/commenting on posts
5. Check Step 4 query to verify notifications are created

**Next:**

- Implement `useNotifications` hook in app
- Update notifications screen to display real data
- Add mark as read functionality
