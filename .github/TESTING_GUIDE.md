# Phase 3 Testing Checklist

**Complete testing guide for core social features**

---

## Pre-Testing Setup

### ✅ 1. Database Schema Executed

- [ ] Ran Section 1: Profiles Table
- [ ] Ran Section 2: Posts Table
- [ ] Ran Section 3: Likes Table
- [ ] Ran Section 4: Comments Table
- [ ] Ran Section 5: Real-Time Enabled
- [ ] Ran Section 6: Storage Buckets
- [ ] Ran Verification Query (4 tables, RLS enabled)

### ✅ 2. Test Data Created

- [ ] Inserted test post via SQL
- [ ] Verified post appears in Supabase Table Editor

### ✅ 3. App Restarted

```bash
npx expo start --clear
```

---

## Testing Scenarios

### 🧪 Test 1: Home Feed Display

**Steps:**

1. Open app and login
2. Home screen loads

**Expected Results:**

- ✅ Feed shows post list (not "Phase 2 Complete" screen)
- ✅ Header shows "Captea" title and profile icon
- ✅ Test post appears in feed
- ✅ PostCard shows user name, avatar placeholder, content
- ✅ Like count shows "0"
- ✅ Comment count shows "0"
- ✅ FAB button visible at bottom right

**If Empty Feed:**

- Check console for errors
- Verify posts table has data in Supabase
- Check network tab for API calls

---

### 🧪 Test 2: Pull to Refresh

**Steps:**

1. On home feed, pull down from top
2. Release

**Expected Results:**

- ✅ Refresh spinner appears
- ✅ Feed reloads
- ✅ Spinner disappears
- ✅ Posts remain visible

---

### 🧪 Test 3: Like Functionality

**Steps:**

1. Tap heart icon on a post
2. Wait 1 second
3. Check Supabase → likes table

**Expected Results:**

- ✅ Heart turns red immediately (optimistic update)
- ✅ Like count increases from 0 to 1
- ✅ Like record appears in Supabase likes table
- ✅ Post likes_count updates to 1

**Unlike:**

1. Tap heart again

**Expected Results:**

- ✅ Heart turns gray
- ✅ Like count decreases to 0
- ✅ Like record deleted from Supabase

---

### 🧪 Test 4: Navigation - Profile

**Steps:**

1. Tap user icon in header
2. Profile screen opens

**Expected Results:**

- ✅ Shows user avatar (placeholder with initial)
- ✅ Shows user name from metadata
- ✅ Shows user email
- ✅ Shows stats: 0 Posts, 0 Followers, 0 Following
- ✅ Back button works
- ✅ Logout button visible

---

### 🧪 Test 5: Navigation - Create Post

**Steps:**

1. Tap FAB button (plus icon)
2. Create screen opens

**Expected Results:**

- ✅ Shows "Create Post" title
- ✅ Shows placeholder message
- ✅ Back button works
- ✅ Returns to feed

---

### 🧪 Test 6: Navigation - Post Detail

**Steps:**

1. Tap on a post card
2. Should navigate to post detail

**Expected Results:**

- ✅ Error: Route not found (expected - not implemented yet)
- ✅ Console shows: "No route named post/[id]"

**This is OK** - Post detail will be implemented next

---

### 🧪 Test 7: Pagination

**Steps:**

1. Ensure you have 10+ posts in database
2. Scroll to bottom of feed
3. Keep scrolling

**Expected Results:**

- ✅ More posts load automatically
- ✅ Loading spinner appears at bottom
- ✅ New posts appear below

**If less than 10 posts:**

- Add more test posts via SQL
- Or verify pagination logic after 10+ posts exist

---

### 🧪 Test 8: Real-Time Updates

**Setup:**

1. Have app open on home feed
2. Open Supabase Table Editor → posts

**Steps:**

1. In Supabase, insert new post manually:

   ```sql
   insert into posts (user_id, content)
   values (auth.uid(), 'Real-time test post! 🚀');
   ```

**Expected Results:**

- ✅ New post appears at top of feed automatically
- ✅ No need to refresh
- ✅ Smooth animation

**Delete Test:**

1. In Supabase, delete a post
2. Check app

**Expected Results:**

- ✅ Post disappears from feed automatically

---

### 🧪 Test 9: Multiple Users (Optional)

**Setup:**

1. Create second account (different email)
2. Login on another device/browser

**Steps:**

1. User A likes a post
2. Check User B's screen

**Expected Results:**

- ✅ Like count updates in real-time for User B
- ✅ Both users see same data

---

### 🧪 Test 10: Error Handling

**Test Offline:**

1. Turn off WiFi
2. Try to like a post

**Expected Results:**

- ✅ Optimistic update happens (heart turns red)
- ✅ After timeout, shows error alert
- ✅ Reverts to unliked state

**Test Invalid Data:**

1. Try to refresh when offline

**Expected Results:**

- ✅ Shows error in console
- ✅ App doesn't crash
- ✅ Previous data remains visible

---

## Console Output to Look For

**Successful Login:**

```
Auth state changed: SIGNED_IN
Login successful: user@example.com
```

**Successful Post Fetch:**

```
[No errors - silent success]
```

**Successful Like:**

```
[No errors - silent success]
```

**Real-Time Connection:**

```
Realtime connection established
```

**Errors to Watch For:**

```
❌ Error fetching posts: [error message]
❌ Error toggling like: [error message]
❌ Session check error: [error message]
```

---

## Performance Checks

### ✅ Smoothness

- [ ] Scrolling is smooth (60fps)
- [ ] No jank when loading images
- [ ] Like button responds instantly

### ✅ Memory

- [ ] App doesn't slow down after scrolling
- [ ] Images don't cause memory warnings

### ✅ Network

- [ ] Initial load < 2 seconds
- [ ] Subsequent loads < 500ms
- [ ] Real-time updates < 1 second

---

## Known Issues / Not Yet Implemented

✅ **Working:**

- Home feed
- PostCard display
- Like/unlike
- Pagination
- Pull to refresh
- Real-time updates
- Navigation to profile/create

⏳ **Placeholders (Expected):**

- Share button (shows alert)
- Options menu (no action)
- Create post screen (placeholder)
- Post detail modal (route not found)
- Comments (not implemented)
- Video playback (shows placeholder)

---

## Troubleshooting

### Posts Not Showing

**Check 1: Supabase Connection**

```javascript
// Add to app/home.jsx temporarily
useEffect(() => {
  console.log('Posts:', posts.length);
  console.log('Loading:', loading);
}, [posts, loading]);
```

**Check 2: Database Query**

```sql
-- In Supabase SQL Editor
select * from posts order by created_at desc limit 5;
```

**Check 3: Profile Exists**

```sql
-- Check your profile was created
select * from profiles where id = auth.uid();
```

### Like Not Working

**Check 1: Likes Table**

```sql
-- Check likes table exists
select * from likes limit 5;
```

**Check 2: RLS Policy**

```sql
-- Check policies
select * from pg_policies where tablename = 'likes';
```

### Real-Time Not Working

**Check 1: Replication**

```sql
-- Check real-time enabled
select * from pg_publication_tables where pubname = 'supabase_realtime';
```

**Check 2: Subscription**

- Look for "Realtime connection" in console
- Check Supabase Dashboard → Database → Replication

---

## Success Criteria

All tests passing means:
✅ Database schema correctly set up
✅ App successfully connects to Supabase
✅ Posts display in feed
✅ Like functionality works
✅ Real-time updates working
✅ Navigation works
✅ No critical errors

**Phase 3 Foundation: COMPLETE** 🎉

---

## Next Steps After Testing

1. **Implement Post Detail Modal** (`app/post/[id].jsx`)
2. **Add Comment System**
3. **Implement Rich Text Editor** for create post
4. **Add Image Upload** functionality
5. **Implement Profile Editing**

---

**Testing Status:** Ready to begin ✅
**Last Updated:** November 20, 2025
