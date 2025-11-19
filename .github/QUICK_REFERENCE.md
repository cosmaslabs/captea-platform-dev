# 🚀 Captea Platform - Quick Reference Card

**One-Page Guide to AI-Assisted Development**

---

## 🎯 Start Every Session With This

```
Load project context from .github/copilot-instructions.md.
Analyze current state and tell me what we should work on next.
```

---

## 📂 Project Structure

```
captea-platform/
├── app/                    # Expo Router screens
│   ├── _layout.jsx         # Root layout
│   ├── index.jsx           # Auth check & redirect
│   ├── welcome.jsx         # Onboarding
│   ├── login.jsx           # Login screen
│   ├── signup.jsx          # Signup screen
│   ├── (tabs)/             # Tab navigation
│   │   ├── home.jsx        # Feed
│   │   ├── create.jsx      # Create post
│   │   ├── notifications.jsx
│   │   └── profile.jsx
│   └── post/[id].jsx       # Post detail modal
├── components/             # Reusable UI
├── assets/icons/           # SVG icons
├── constants/theme.js      # Colors, fonts, spacing
├── helpers/
│   ├── common.js           # HP, WP responsive helpers
│   └── supabase.js         # Supabase client
├── contexts/
│   └── AuthContext.jsx     # Global auth state
├── hooks/                  # Custom hooks
└── services/               # API calls
```

---

## 🔧 Essential Commands

```bash
# Start development
npx expo start

# Clear cache
npx expo start --clear

# Run on iOS
npx expo start --ios

# Run on Android
npx expo start --android

# Install dependencies
npm install [package-name]

# Production build
eas build --platform ios --profile production
eas build --platform android --profile production
```

---

## 💡 Common Prompts (Copy-Paste Ready)

### 🏗️ Component Creation

```
Create components/[ComponentName].jsx with:
- [List 3-5 specific requirements]
- Follow patterns in .github/copilot-instructions.md
- Include JSDoc comments
```

### 🐛 Debugging

```
Debug this issue: [describe problem]

Check:
1. [Potential cause 1]
2. [Potential cause 2]
3. [Potential cause 3]

Provide specific fixes.
```

### 🔍 Code Review

```
Review this code for:
1. Performance issues
2. Security vulnerabilities
3. Best practice violations

Provide specific improvements.
```

### 📦 Feature Implementation

```
Implement [feature name] following these steps:
1. [Step 1]
2. [Step 2]
3. [Step 3]

Use patterns from .github/copilot-instructions.md.
```

---

## 📋 Phase Checklist

### ✅ Phase 0: Setup

- [ ] Theme system (`constants/theme.js`)
- [ ] Responsive helpers (`helpers/common.js`)
- [ ] Root layout (`app/_layout.jsx`)
- [ ] Screen wrapper (`components/ScreenWrapper.jsx`)

### ✅ Phase 1: UI Components

- [ ] Loading component
- [ ] Button component
- [ ] Input component
- [ ] Icon system
- [ ] Welcome screen
- [ ] Login screen
- [ ] Signup screen

### ✅ Phase 2: Authentication

- [ ] Supabase client setup
- [ ] Auth context
- [ ] Signup logic
- [ ] Login logic
- [ ] Session check

### ✅ Phase 3: Social Features

- [ ] Database schema
- [ ] Home feed
- [ ] Post card component
- [ ] Like functionality
- [ ] Comments
- [ ] Create post screen
- [ ] Media upload
- [ ] Real-time sync

### ✅ Phase 4: Profile & Notifications

- [ ] Profile screen
- [ ] Edit profile
- [ ] Notifications screen
- [ ] Real-time notifications
- [ ] Post management (edit/delete)
- [ ] Video player

### ✅ Phase 5: Production

- [ ] Code review
- [ ] Performance optimization
- [ ] Testing setup
- [ ] App store preparation
- [ ] Production builds

---

## 🎨 Code Patterns

### Responsive Sizing

```javascript
import { HP, WP } from '../helpers/common';

height: HP(7.2),  // 7.2% of screen height
width: WP(90),    // 90% of screen width
fontSize: HP(2),  // 2% of screen height
```

### Form with useRef (Performance)

```javascript
const emailRef = useRef('');
const passwordRef = useRef('');

<Input
  placeholder="Email"
  onChangeText={(value) => (emailRef.current = value)}
/>
```

### Supabase Query

```javascript
const { data, error } = await supabase
  .from('posts')
  .select('*, profiles(*)')
  .order('created_at', { ascending: false });
```

### Real-Time Subscription

```javascript
const subscription = supabase
  .channel('posts')
  .on('postgres_changes',
    { event: 'INSERT', schema: 'public', table: 'posts' },
    (payload) => {
      setPosts((current) => [payload.new, ...current]);
    }
  )
  .subscribe();

return () => subscription.unsubscribe();
```

### Navigation

```javascript
import { useRouter } from 'expo-router';

const router = useRouter();
router.push('/home');       // Navigate forward
router.back();              // Go back
router.replace('/welcome'); // Replace current screen
```

---

## 🔐 Security Checklist

- [ ] No hardcoded API keys (use `.env`)
- [ ] AsyncStorage configured for Supabase auth
- [ ] Input validation on all forms
- [ ] RLS policies on database tables
- [ ] Secure media upload (size limits, type validation)
- [ ] HTTPS only for API calls
- [ ] Sensitive data encrypted

---

## ⚡ Performance Tips

✅ **DO**:

- Use `useRef` for form inputs
- Implement pagination (10-20 items per page)
- Memoize expensive components (`React.memo`)
- Use `useCallback` for event handlers
- Lazy load images
- Compress media before upload

❌ **DON'T**:

- Use `useState` for every input field
- Load all data at once
- Skip memoization on large lists
- Fetch data on every render
- Store large objects in state

---

## 🚨 Common Issues & Fixes

### Navigation Not Working

```javascript
// ❌ Wrong
import { useRouter } from 'react-router';

// ✅ Correct
import { useRouter } from 'expo-router';
```

### Auth Session Not Persisting

```javascript
// Must install and configure AsyncStorage
import AsyncStorage from '@react-native-async-storage/async-storage';

export const supabase = createClient(url, key, {
  auth: {
    storage: AsyncStorage, // This is critical!
    autoRefreshToken: true,
    persistSession: true,
  },
});
```

### Real-Time Not Working

```javascript
// 1. Enable in Supabase dashboard: Database → Replication
// 2. Use unique channel name
// 3. Always unsubscribe on unmount

const subscription = supabase
  .channel('unique-channel-name') // Important!
  .on('postgres_changes', { ... })
  .subscribe();

return () => subscription.unsubscribe(); // Critical!
```

---

## 📚 Documentation Links

- **Instructions**: `.github/copilot-instructions.md` (comprehensive guide)
- **Prompts**: `.github/session-prompts.md` (50+ ready-to-use prompts)
- **Setup Guide**: `.github/README.md` (how to use this agent setup)
- **React Native**: <https://reactnative.dev>
- **Expo**: <https://docs.expo.dev>
- **Supabase**: <https://supabase.com/docs>

---

## 🎓 Pro Tips

1. **Always load context** at session start
2. **Use specific prompts** from `session-prompts.md`
3. **Test after each feature** before moving on
4. **Commit working code** frequently
5. **Ask for code reviews** before merging
6. **Reference instructions** for complex patterns
7. **Debug systematically** using debugging prompts

---

## 🤝 Need Help?

### Quick Help

```
I'm stuck on [specific issue].
Check .github/copilot-instructions.md for relevant patterns and
provide step-by-step guidance with code examples.
```

### Deep Dive

```
Explain [concept/pattern] in detail with:
1. When to use it
2. How to implement it
3. Common pitfalls
4. Example code

Reference .github/copilot-instructions.md for context.
```

---

**Print this card or save for quick reference during development!**

---

**Version**: 1.0.0
**Last Updated**: November 19, 2025
**Maintained By**: Cosmaslabs Inc
