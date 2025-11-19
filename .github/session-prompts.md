# Captea Platform - Session Prompts for AI Agents

**Quick-Start Prompts for GitHub Copilot Chat**

---

## Table of Contents

1. [Getting Started Prompts](#getting-started-prompts)
2. [Phase 0: Setup Prompts](#phase-0-setup-prompts)
3. [Phase 1: UI Components Prompts](#phase-1-ui-components-prompts)
4. [Phase 2: Authentication Prompts](#phase-2-authentication-prompts)
5. [Phase 3: Social Features Prompts](#phase-3-social-features-prompts)
6. [Phase 4: Profile & Notifications Prompts](#phase-4-profile--notifications-prompts)
7. [Phase 5: Production Prompts](#phase-5-production-prompts)
8. [Debugging Prompts](#debugging-prompts)
9. [Code Review Prompts](#code-review-prompts)

---

## Getting Started Prompts

### Initialize New Session

```
Load the Captea Platform project context from .github/copilot-instructions.md.
This is a React Native social media app using Expo Router (SDK 51) and Supabase.
Review the current project structure and identify which phase we're in based on
existing files. Then provide:
1. Current project status summary
2. Next recommended tasks
3. Any immediate issues or missing dependencies
```

### Quick Status Check

```
Analyze the current state of the Captea Platform project:
1. Which phase are we in? (0-5)
2. What components have been completed?
3. What screens exist and what's missing?
4. Are there any Supabase integration issues?
5. What should we work on next?
```

### Project Overview Request

```
Give me a comprehensive overview of the Captea Platform architecture including:
- Current directory structure
- Implemented components and their purposes
- Authentication flow status
- Database schema (if exists)
- Real-time features status
- Outstanding tasks for current phase
```

---

## Phase 0: Setup Prompts

### Complete Initial Setup

```
Help me complete Phase 0 setup for Captea Platform:
1. Create constants/theme.js with colors, fonts, and radius
2. Create helpers/common.js with HP and WP responsive functions
3. Create app/_layout.jsx with Stack layout (headerShown: false)
4. Create components/ScreenWrapper.jsx with safe area handling
5. Verify all dependencies are installed

Follow the exact specifications in .github/copilot-instructions.md Phase 0 section.
```

### Create Theme System

```
Create a comprehensive theme.js file in constants/ with:
- Primary brand colors (use modern social media palette)
- Text colors (primary, light, disabled)
- Background colors (white, light gray, dark)
- Border and shadow styles
- Font weights (medium, semibold, bold, extrabold)
- Radius values (xs, sm, md, lg, xl, doublexl)

Make it production-ready and extensible.
```

### Setup Responsive Helpers

```
Create helpers/common.js with HP (Height Percentage) and WP (Width Percentage)
functions using React Native's Dimensions API. These functions should:
- Accept percentage values (0-100)
- Return calculated pixel values based on device dimensions
- Be optimized for performance (no unnecessary re-calculations)

Add JSDoc comments explaining usage.
```

---

## Phase 1: UI Components Prompts

### Create Custom Button Component

```
Create components/Button.jsx following these requirements:
- Accept props: title, onPress, loading, hasShadow, buttonStyle, textStyle
- Show ActivityIndicator when loading=true
- Apply conditional shadow styling when hasShadow=true
- Use theme colors and responsive HP/WP values
- Be fully reusable across the app
- Include proper TypeScript-style JSDoc comments

Reference the exact pattern in .github/copilot-instructions.md Component Architecture section.
```

### Create Custom Input Component

```
Create components/Input.jsx with these features:
- Icon support (left-side icon using centralized Icon component)
- Placeholder text
- Accept inputRef for performance optimization (useRef pattern)
- Support secureTextEntry for passwords
- Responsive height (HP 7.2)
- Rounded borders (theme.radius.doublexl)
- 12px gap between icon and input
- Accept all standard TextInput props via ...props spread

Make it production-ready with proper styling.
```

### Create Icon System

```
Create assets/icons/index.jsx as a centralized Icon component that:
1. Imports all SVG icon files (ArrowLeft, Mail, Lock, User, Heart, Comment, Share, etc.)
2. Maps icon names to components
3. Accepts props: name, size, strokeWidth (default 1.6), color
4. Returns the appropriate icon component
5. Provides TypeScript-style type checking for icon names

List all icons we'll need for a social media app (auth, posts, interactions, navigation).
```

### Create Welcome Screen

```
Create app/welcome.jsx following this design:
- ScreenWrapper with background color
- Welcome image (HP 30, WP 100)
- App title "Captea Platform" or "Link Up"
- Tagline/punchline (create engaging copy)
- Custom Button "Get Started" → navigates to /signup
- Footer text "Already have an account?" with "Login" link → navigates to /login

Use Expo Router for navigation. Follow exact styling from instructions.
```

### Create Login Screen

```
Create app/login.jsx with:
- BackButton component (top-left)
- "Welcome back" heading text
- Email Input (with Mail icon)
- Password Input (with Lock icon, secureTextEntry)
- Login Button (custom Button component)
- Footer with "Don't have an account?" and "Sign up" link

Use useRef for emailRef and passwordRef (performance optimization).
Add basic validation for empty fields.
```

### Create Signup Screen

```
Create app/signup.jsx by extending login structure:
- BackButton
- "Create Account" heading
- Name Input (User icon)
- Email Input (Mail icon)
- Password Input (Lock icon, secureTextEntry)
- Sign Up Button
- Footer with "Already have an account?" and "Login" link

Use useRef for nameRef, emailRef, passwordRef.
Validate all fields are filled before submission.
```

---

## Phase 2: Authentication Prompts

### Setup Supabase Client

```
Create helpers/supabase.js with complete Supabase configuration:
1. Import necessary dependencies (@supabase/supabase-js, AsyncStorage)
2. Get credentials from environment variables
3. Initialize Supabase client with AsyncStorage for session persistence
4. Configure auth options (autoRefreshToken, persistSession, detectSessionInUrl)
5. Export configured client

Follow security best practices - never hardcode credentials.
```

### Create Auth Context

```
Create contexts/AuthContext.jsx with:
- User state management (useState for user, loading)
- getSession on mount to check existing session
- onAuthStateChange listener for real-time auth updates
- signOut function
- Export AuthProvider component and useAuth hook
- Proper cleanup (unsubscribe from listeners)

Wrap this in app/_layout.jsx to make auth available app-wide.
```

### Implement Signup Logic

```
Implement handleSignUp function in signup.jsx:
1. Get values from nameRef, emailRef, passwordRef
2. Validate all fields are filled
3. Set loading state
4. Call supabase.auth.signUp with email, password, and metadata (name)
5. On success, create user profile in 'profiles' table
6. Navigate to /home using Expo Router
7. On error, show Alert with error message
8. Always set loading to false in finally block

Use proper error handling and user feedback.
```

### Implement Login Logic

```
Implement handleLogin function in login.jsx:
1. Get values from emailRef and passwordRef
2. Validate both fields are filled
3. Set loading state
4. Call supabase.auth.signInWithPassword
5. On success, navigate to /home
6. On error, show Alert with error message
7. Set loading to false in finally block

Follow the exact pattern from .github/copilot-instructions.md Authentication section.
```

### Session Management

```
Update app/index.jsx to handle initial routing:
1. Use useAuth hook to get user and loading state
2. Show Loading component while checking session
3. If user exists, redirect to /home (router.replace)
4. If no user, redirect to /welcome
5. Only redirect after loading is complete

This prevents flash of wrong screen during session check.
```

---

## Phase 3: Social Features Prompts

### Create Database Schema

```
Generate Supabase SQL schema for Captea Platform with these tables:
1. profiles (id, name, email, avatar_url, bio, created_at)
2. posts (id, user_id, content, image_url, video_url, created_at)
3. likes (id, user_id, post_id, created_at)
4. comments (id, user_id, post_id, content, created_at)
5. notifications (id, user_id, type, post_id, comment_id, sender_id, created_at, read)

Include foreign key constraints, indexes for performance, and Row Level Security policies.
Provide complete SQL statements ready to run in Supabase SQL editor.
```

### Create Posts Hook

```
Create hooks/usePosts.js with:
- useState for posts, loading, page, hasMore
- fetchPosts function with pagination (10 posts per page)
- Real-time subscription to posts table (INSERT, UPDATE, DELETE)
- Proper cleanup (unsubscribe on unmount)
- Return posts, loading, hasMore, refetch function

Follow the exact pagination pattern from .github/copilot-instructions.md Performance section.
```

### Create Home Feed Screen

```
Create app/(tabs)/home.jsx as the main feed:
- Use usePosts hook for data
- FlatList with PostCard components
- onEndReached for pagination
- Pull-to-refresh functionality
- Loading indicator at bottom when fetching more
- Empty state when no posts
- Header with "Captea" title and create post button

Optimize for performance (keyExtractor, proper item keys).
```

### Create PostCard Component

```
Create components/PostCard.jsx to display a single post:
- User avatar and name (link to profile)
- Post timestamp (format relative: "2h ago")
- Post content (rich text display)
- Image/video if present (proper aspect ratio)
- Like button with count (heart icon, red when liked)
- Comment button with count
- Share button
- Three dots menu (for post owner: edit/delete)

Use proper hit slop for touch targets on mobile.
Make it performant (memo, avoid unnecessary re-renders).
```

### Implement Like Feature

```
Implement post liking functionality:
1. Create handleLike function that:
   - Checks if user already liked (query likes table)
   - If liked, delete like (unlike)
   - If not liked, insert like
   - Update local state optimistically
2. Show loading state during operation
3. Handle errors gracefully
4. Update like count in real-time
5. Animate heart icon when liking

Use Supabase RPC function for atomic increment/decrement if needed.
```

### Create Post Detail Modal

```
Create app/post/[id].jsx as a modal for post details:
- Show full post (use PostCard component)
- Display all comments with CommentItem components
- Input field for new comment (bottom of modal)
- Submit button for comment
- Real-time comment updates
- Scroll to highlighted comment if navigating from notification
- Close button or swipe down to dismiss

Use Expo Router's modal presentation style.
```

### Implement Comments

```
Implement commenting functionality:
1. Create CommentItem component (avatar, name, content, timestamp, delete button)
2. Create handleComment function:
   - Get comment text from commentRef
   - Validate not empty
   - Insert into comments table with user_id and post_id
   - Create notification for post owner
   - Clear input field
   - Show success feedback
3. Subscribe to real-time comment updates for current post
4. Allow deletion (owner or post owner only)

Optimize for performance - don't fetch all comments upfront, paginate if needed.
```

### Create Rich Text Editor

```
Create app/(tabs)/create.jsx with rich text editor:
- Use @10play/tentap-editor or similar library
- Support: Bold, Italic, Underline
- Support: Headings (H1, H2, H3, H4)
- Support: Text alignment (left, center, right)
- Toolbar with formatting buttons
- Image picker button (Expo ImagePicker)
- Video picker button with trimming
- Character count display
- Post button (disabled if empty)
- Preview mode toggle

Save draft to AsyncStorage to prevent data loss.
```

### Implement Media Upload

```
Implement image and video upload:
1. Use Expo ImagePicker for selection
2. Compress images before upload (reduce size)
3. For videos:
   - Show trimming interface
   - Limit duration (e.g., 60 seconds)
   - Show video player preview
4. Upload to Supabase Storage:
   - Generate unique filename
   - Upload to 'posts' bucket
   - Get public URL
5. Store URL in post record
6. Show upload progress
7. Handle upload errors

Follow Supabase Storage best practices for security.
```

---

## Phase 4: Profile & Notifications Prompts

### Create Profile Screen

```
Create app/(tabs)/profile.jsx:
- Header with user avatar, name, bio
- Edit profile button (top-right)
- Stats row (posts count, followers, following)
- Tab navigator (Posts, Liked, Saved)
- Posts tab: FlatList of user's posts (pagination)
- Empty state when no posts
- Pull to refresh
- Each post shows edit/delete for owner

Use separate hook useUserPosts for fetching user-specific posts.
```

### Implement Edit Profile

```
Create app/edit-profile.jsx:
- Current avatar with change button
- Image picker for new avatar
- Input field for bio (multiline, max 150 chars)
- Save button
- Loading state during save
- Upload avatar to Supabase Storage
- Update profiles table
- Navigate back on success
- Show error if upload fails

Validate bio length and handle edge cases (empty avatar, etc).
```

### Create Notifications Screen

```
Create app/(tabs)/notifications.jsx:
- FlatList of notification items
- Group by date (Today, Yesterday, This Week)
- Each notification shows:
  - Sender avatar and name
  - Action ("liked your post", "commented on your post")
  - Timestamp
  - Unread indicator (dot or badge)
- Tap to navigate to relevant post/comment
- Mark as read on tap
- Pull to refresh
- Real-time updates via useNotifications hook

Badge count on tab icon for unread notifications.
```

### Implement Real-Time Notifications

```
Create hooks/useNotifications.js:
1. Fetch existing notifications for current user
2. Subscribe to real-time inserts in notifications table (filter by user_id)
3. Prepend new notifications to list
4. Mark notification as read function
5. Count unread notifications
6. Return notifications, unreadCount, markAsRead function

Trigger notifications on:
- Someone likes your post
- Someone comments on your post
- Someone replies to your comment
```

### Implement Post Management

```
Add post edit and delete functionality:
1. Show edit/delete buttons only to post owner
2. Edit:
   - Navigate to create screen with post data
   - Pre-populate rich text editor
   - Update post on save (not insert)
3. Delete:
   - Show confirmation alert
   - Delete post from database
   - Delete associated likes, comments, notifications
   - Remove media from storage
   - Remove from local state immediately
4. Real-time sync: deletion reflects on all devices

Use Supabase RPC for cascading deletes if needed.
```

### Video Player Integration

```
Integrate video playback for video posts:
1. Use expo-av or react-native-video
2. Features:
   - Play/pause button
   - Seek bar with current time and duration
   - Volume control
   - Fullscreen toggle
   - Auto-pause when scrolling out of view
3. Optimize:
   - Load video on demand (not all at once)
   - Show thumbnail before play
   - Cache videos for offline
4. Handle errors (video not found, playback error)

Provide smooth UX - no jank during scroll.
```

---

## Phase 5: Production Prompts

### Code Review Request

```
Perform comprehensive code review of Captea Platform:
1. Identify performance issues:
   - Unnecessary re-renders
   - Missing memoization
   - Improper use of useState vs useRef
2. Security issues:
   - Exposed secrets or keys
   - Missing input validation
   - Insecure data handling
3. Code quality:
   - Inconsistent naming
   - Missing error handling
   - Console.logs in production code
4. Accessibility issues

Provide specific file paths and line numbers with recommendations.
```

### Performance Optimization

```
Optimize Captea Platform for production performance:
1. Implement React.memo for PostCard, CommentItem
2. Use useMemo for expensive calculations
3. Use useCallback for event handlers passed to children
4. Implement virtualization for long lists
5. Lazy load images with blur placeholder
6. Optimize bundle size:
   - Remove unused imports
   - Use tree-shaking
   - Compress assets
7. Profile with React DevTools

Provide before/after metrics if possible.
```

### Setup Testing

```
Set up testing infrastructure for Captea Platform:
1. Install Jest and React Native Testing Library
2. Configure jest.config.js
3. Create test files for:
   - Button component
   - Input component
   - Login flow
   - Post creation flow
4. Mock Supabase client
5. Add test scripts to package.json
6. Aim for 80% coverage on critical paths

Provide example tests for each component/flow.
```

### Prepare for App Store

```
Prepare Captea Platform for app store submission:
1. Update app.json with:
   - Proper app name, slug, version
   - Icons (1024x1024 for iOS, various for Android)
   - Splash screen
   - Bundle identifier
   - Permissions (camera, photo library, notifications)
2. Generate privacy policy URL
3. Create app screenshots (5.5", 6.5" for iOS)
4. Write app description and keywords
5. Set up EAS configuration (eas.json)
6. Create production environment variables

Provide complete checklist with Apple and Google requirements.
```

### Build Production App

```
Guide me through building production-ready apps:
1. iOS:
   - Configure eas.json for iOS production
   - Run: eas build --platform ios --profile production
   - Download .ipa file
   - Submit to App Store Connect
2. Android:
   - Configure eas.json for Android production
   - Run: eas build --platform android --profile production
   - Download .aab file
   - Submit to Google Play Console

Explain signing certificates, provisioning profiles, and store listings.
```

---

## Debugging Prompts

### Debug Expo Router Navigation

```
My Expo Router navigation is not working. Debug this issue:
- Navigation doesn't respond to button press
- Getting "Invariant Violation" or "Can't find screen" errors
- Back navigation not working
- Modal not dismissing

Check:
1. Import statement (should be from 'expo-router' not 'react-router')
2. Proper use of router.push() vs router.replace()
3. File structure matches routes
4. _layout.jsx configuration

Provide specific fixes.
```

### Debug Supabase Auth

```
Supabase authentication is not working properly:
- Session not persisting after app restart
- Login succeeds but user is null
- Getting "Invalid token" errors
- Auth state change listener not firing

Check:
1. AsyncStorage properly installed and configured
2. Supabase client storage configuration
3. Environment variables loaded correctly
4. Auth context setup in _layout.jsx
5. RLS policies on database tables

Provide diagnostic steps and fixes.
```

### Debug Real-Time Subscriptions

```
Real-time features are not working:
- New posts not appearing automatically
- Notifications not arriving
- Comments not updating live

Diagnose:
1. Real-time enabled in Supabase dashboard
2. Subscription code correct (channel name, filters)
3. Cleanup (unsubscribe) implemented
4. Network connectivity
5. Console for subscription errors

Provide debugging code and fixes.
```

### Debug Performance Issues

```
App is experiencing performance problems:
- Slow scrolling (FPS drops)
- Laggy interactions
- High memory usage
- App crashes on older devices

Analyze:
1. Excessive re-renders (add React DevTools Profiler)
2. Large images not optimized
3. Missing pagination
4. Improper use of useState in forms
5. No memoization of expensive components

Provide performance profiling and optimization steps.
```

---

## Code Review Prompts

### Component Review

```
Review this component for best practices:
[Paste component code]

Check for:
1. Proper prop types and defaults
2. Performance (memoization, callbacks)
3. Accessibility (labels, hit slop)
4. Responsive design (HP/WP usage)
5. Error handling
6. Code style consistency
7. Reusability

Provide specific improvements with code examples.
```

### Security Review

```
Review Captea Platform for security vulnerabilities:
1. Check for exposed API keys or secrets
2. Verify input validation on all forms
3. Check SQL injection risks (should be none with Supabase)
4. Verify RLS policies are properly configured
5. Check for XSS vulnerabilities in user content
6. Verify proper authentication checks on all protected routes
7. Check file upload security (size limits, type validation)

Provide security audit report with severity levels.
```

### Accessibility Review

```
Review Captea Platform for accessibility:
1. Screen reader support (accessibilityLabel, accessibilityHint)
2. Proper contrast ratios for text
3. Touch target sizes (minimum 44x44 points)
4. Keyboard navigation support
5. Focus management
6. Alternative text for images
7. Captions for videos

Provide WCAG 2.1 compliance report and fixes.
```

---

## Quick Tips

### Active Context Loading

When starting a new session, always begin with:

```
Load project context from .github/copilot-instructions.md and
.github/session-prompts.md. Then analyze current project state and
tell me what phase we're in and what to work on next.
```

### Iterative Development

For complex features, break into steps:

```
I want to implement [feature]. Break this into 5 smaller tasks,
then guide me through implementing task 1 first. After I confirm it
works, we'll move to task 2.
```

### Code Generation Pattern

For new components:

```
Create [ComponentName] following these requirements:
[List 3-5 specific requirements]

Use the code style and patterns from .github/copilot-instructions.md.
Include proper JSDoc comments and error handling.
```

---

## Best Practices for Using These Prompts

1. **Be Specific**: Include file paths, component names, exact requirements
2. **Reference Context**: Point to instructions file when asking for implementation
3. **Request Validation**: Ask agent to verify code against best practices
4. **Iterate**: Start with skeleton, then enhance with more prompts
5. **Test After Each Step**: Run code after each major change
6. **Save Progress**: Commit working code before moving to next feature

---

**Last Updated**: November 19, 2025
**Maintained By**: Cosmaslabs Inc - Senior Development Team
**Version**: 1.0.0
**Status**: ACTIVE
