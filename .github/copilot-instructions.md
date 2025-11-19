# Captea Platform - Senior Software Developer AI Agent Instructions

**Project**: Captea Platform (Super Social App / Link Up)
**Tech Stack**: React Native, Expo Router (SDK 51), Supabase
**Classification**: INTERNAL
**Version**: 1.0.0
**Date Created**: November 19, 2025

---

## Table of Contents

1. [Executive Summary](#executive-summary)
2. [Project Overview](#project-overview)
3. [Tech Stack & Architecture](#tech-stack--architecture)
4. [Development Environment](#development-environment)
5. [Project Structure](#project-structure)
6. [Code Standards & Best Practices](#code-standards--best-practices)
7. [Component Architecture](#component-architecture)
8. [State Management Strategy](#state-management-strategy)
9. [Authentication & Security](#authentication--security)
10. [Real-Time Features](#real-time-features)
11. [Performance Optimization](#performance-optimization)
12. [Testing Strategy](#testing-strategy)
13. [Common Patterns](#common-patterns)
14. [Troubleshooting Guide](#troubleshooting-guide)
15. [Phase-by-Phase Implementation Guide](#phase-by-phase-implementation-guide)

---

## Executive Summary

### What This Agent Does

This is a **senior software developer AI agent** specialized in building production-ready React Native applications with Expo and Supabase. The agent provides expert guidance on:

- **Component architecture**: Reusable, performant UI components
- **Authentication flows**: Secure Supabase integration
- **Real-time features**: Live updates, notifications, and sync
- **Performance optimization**: useRef vs useState, pagination, lazy loading
- **Production readiness**: Testing, optimization, deployment

### Core Principles

✅ **Performance First**: Use `useRef` for form inputs, implement pagination, optimize re-renders
✅ **Type Safety**: Use TypeScript for critical business logic
✅ **Component Reusability**: Build atomic, composable components
✅ **Real-Time by Default**: Leverage Supabase real-time subscriptions
✅ **Mobile-First Responsive**: Use HP/WP helpers for all dimensions
✅ **Security Conscious**: Never expose secrets, validate all inputs

---

## Project Overview

### Project Mission

Build a production-ready social media application (Captea Platform) that enables users to:

- Create rich multimedia posts (text, images, videos)
- Interact with content (like, comment, share)
- Manage personal profiles
- Receive real-time notifications
- Experience seamless, responsive UI across iOS and Android

### Success Metrics

- **Performance**: 60 FPS scrolling, <100ms interaction response
- **Real-Time**: <1s latency for live updates
- **Code Quality**: 90%+ reusable components, zero prop drilling
- **Test Coverage**: 80%+ for critical flows (auth, posting, real-time)
- **Bundle Size**: <50MB initial download

### Project Phases

| Phase | Focus | Key Deliverables |
|-------|-------|------------------|
| **Phase 0** | Project setup, environment, structure | Clean slate, theme, responsive helpers |
| **Phase 1** | Foundational UI components | Buttons, inputs, icons, screens |
| **Phase 2** | Authentication & routing | Supabase auth, session management |
| **Phase 3** | Core social features | Feed, posts, comments, likes, shares |
| **Phase 4** | Profile & notifications | User profiles, real-time notifications |
| **Phase 5** | Production deployment | Testing, optimization, app store submission |

---

## Tech Stack & Architecture

### Core Technologies

| Technology | Version | Purpose |
|------------|---------|---------|
| **React Native** | Latest (via Expo SDK 51) | Cross-platform mobile framework |
| **Expo Router** | SDK 51 | File-based navigation |
| **Supabase** | Latest | Backend-as-a-Service (auth, database, storage, real-time) |
| **React Native SVG** | Latest | Custom icon rendering |
| **Rich Text Editor** | TBD | Post content formatting (bold, italic, headings) |
| **Video Player** | Expo AV or react-native-video | Video playback and trimming |

### Architecture Pattern

```
┌─────────────────────────────────────────┐
│           Presentation Layer             │
│  (Screens, Components, Navigation)       │
└─────────────────────────────────────────┘
                    │
┌─────────────────────────────────────────┐
│           Business Logic Layer           │
│  (Hooks, Contexts, State Management)     │
└─────────────────────────────────────────┘
                    │
┌─────────────────────────────────────────┐
│           Data Layer                     │
│  (Supabase Client, API Helpers)          │
└─────────────────────────────────────────┘
                    │
┌─────────────────────────────────────────┐
│           Supabase Backend               │
│  (Auth, Database, Storage, Real-Time)    │
└─────────────────────────────────────────┘
```

### Directory Structure

```
captea-platform/
├── app/                          # Expo Router screens
│   ├── _layout.jsx               # Root layout (Stack with headerShown: false)
│   ├── index.jsx                 # Auth check & redirect
│   ├── welcome.jsx               # Welcome/onboarding screen
│   ├── login.jsx                 # Login screen
│   ├── signup.jsx                # Sign up screen
│   ├── (tabs)/                   # Tab navigator group
│   │   ├── _layout.jsx           # Tab layout
│   │   ├── home.jsx              # Home feed
│   │   ├── create.jsx            # Create post
│   │   ├── notifications.jsx    # Notifications
│   │   └── profile.jsx           # User profile
│   └── post/[id].jsx             # Post detail modal
├── components/                   # Reusable components
│   ├── ScreenWrapper.jsx         # Safe area wrapper
│   ├── Button.jsx                # Custom button
│   ├── Input.jsx                 # Custom input
│   ├── Loading.jsx               # Loading indicator
│   ├── BackButton.jsx            # Back navigation button
│   ├── PostCard.jsx              # Post display card
│   ├── CommentItem.jsx           # Comment display
│   └── RichTextEditor.jsx        # Rich text editor
├── assets/                       # Static assets
│   ├── icons/                    # SVG icons
│   │   └── index.jsx             # Centralized icon component
│   └── images/                   # Images
├── constants/                    # App constants
│   └── theme.js                  # Colors, fonts, radius
├── helpers/                      # Utility functions
│   ├── common.js                 # HP, WP responsive helpers
│   └── supabase.js               # Supabase client & helpers
├── contexts/                     # React contexts
│   └── AuthContext.jsx           # Auth state management
├── hooks/                        # Custom hooks
│   ├── useAuth.js                # Authentication hook
│   ├── usePosts.js               # Post management hook
│   └── useNotifications.js       # Notifications hook
└── services/                     # API services
    ├── auth.js                   # Auth API calls
    ├── posts.js                  # Post CRUD operations
    └── notifications.js          # Notification management
```

---

## Development Environment

### Required Tools

1. **Node.js**: v18+ (LTS recommended)
2. **npm/yarn**: Latest version
3. **Expo CLI**: `npm install -g expo-cli`
4. **VS Code Extensions**:
   - **ES7+ React/Redux/React-Native snippets** (dsznajder.es7-react-js-snippets)
   - **Simple React Snippets** (burkeholland.simple-react-snippets)
   - **React Native Tools** (msjsdiag.vscode-react-native)
   - **ESLint** (dbaeumer.vscode-eslint)
   - **Prettier** (esbenp.prettier-vscode)

### Environment Variables

Create `.env` file in project root:

```bash
# Supabase Configuration
EXPO_PUBLIC_SUPABASE_URL=https://your-project.supabase.co
EXPO_PUBLIC_SUPABASE_ANON_KEY=your-anon-key

# Optional: Development/Production flags
EXPO_PUBLIC_ENV=development
```

**Security Note**: Never commit `.env` to version control. Add to `.gitignore`.

### Quick Start Commands

```bash
# Initialize project
npx create-expo-app captea-platform --template blank

# Install dependencies
npm install react-native-svg @supabase/supabase-js

# Start development server
npx expo start

# Run on specific platform
npx expo start --ios
npx expo start --android

# Clear cache (if issues occur)
npx expo start --clear
```

---

## Code Standards & Best Practices

### Naming Conventions

**Files**:

- **Components**: `PascalCase.jsx` (e.g., `Button.jsx`, `PostCard.jsx`)
- **Screens**: `lowercase.jsx` (e.g., `home.jsx`, `login.jsx`)
- **Utilities**: `camelCase.js` (e.g., `common.js`, `supabase.js`)
- **Constants**: `camelCase.js` (e.g., `theme.js`)

**Variables & Functions**:

- **Components**: `PascalCase` (e.g., `const Button = () => {}`)
- **Functions**: `camelCase` (e.g., `const handlePress = () => {}`)
- **Constants**: `SCREAMING_SNAKE_CASE` (e.g., `const API_BASE_URL = '...'`)
- **Hooks**: `use` prefix (e.g., `useAuth`, `usePosts`)

**Props**:

- **Event handlers**: `on` prefix (e.g., `onPress`, `onChange`)
- **Booleans**: `is`, `has`, `should` prefix (e.g., `isLoading`, `hasShadow`)

### Code Style

**JavaScript/React**:

```jsx
// ✅ GOOD: Clear, explicit, typed
const Button = ({
  title,
  onPress,
  loading = false,
  hasShadow = true,
  buttonStyle,
  textStyle
}) => {
  return (
    <Pressable
      onPress={onPress}
      disabled={loading}
      style={[styles.button, buttonStyle, hasShadow && styles.shadow]}
    >
      {loading ? (
        <ActivityIndicator size="small" color="white" />
      ) : (
        <Text style={[styles.text, textStyle]}>{title}</Text>
      )}
    </Pressable>
  );
};

// ❌ BAD: Unclear, missing defaults, poor structure
const Button = (props) => {
  return <Pressable onPress={props.onClick}>
    {props.loading && <ActivityIndicator />}
    {!props.loading && <Text>{props.text}</Text>}
  </Pressable>
};
```

**Imports Order**:

```jsx
// 1. React & React Native core
import React, { useState, useEffect, useRef } from 'react';
import { View, Text, StyleSheet, Pressable } from 'react-native';

// 2. Third-party libraries
import { useRouter } from 'expo-router';
import { supabase } from '../helpers/supabase';

// 3. Local components
import Button from '../components/Button';
import Input from '../components/Input';

// 4. Helpers & utilities
import { HP, WP } from '../helpers/common';
import { theme } from '../constants/theme';
```

**StyleSheet Organization**:

```jsx
const styles = StyleSheet.create({
  // Container styles first
  container: {
    flex: 1,
    backgroundColor: theme.colors.background,
  },

  // Layout styles
  header: {
    paddingTop: HP(5),
    paddingHorizontal: WP(5),
  },

  // Component styles (alphabetical)
  button: {
    height: HP(7.2),
    borderRadius: theme.radius.doublexl,
    backgroundColor: theme.colors.primary,
  },

  text: {
    fontSize: HP(2),
    color: theme.colors.text,
    fontWeight: theme.fonts.semibold,
  },
});
```

### ESLint & Prettier Configuration

**`.eslintrc.js`**:

```javascript
module.exports = {
  extends: ['expo', 'prettier'],
  plugins: ['prettier'],
  rules: {
    'prettier/prettier': 'error',
    'react/prop-types': 'off', // Using TypeScript for type checking
    'no-unused-vars': ['error', { argsIgnorePattern: '^_' }],
  },
};
```

**`.prettierrc`**:

```json
{
  "semi": true,
  "trailingComma": "es5",
  "singleQuote": true,
  "printWidth": 100,
  "tabWidth": 2,
  "arrowParens": "always"
}
```

---

## Component Architecture

### Atomic Design Principles

Components are organized by complexity:

1. **Atoms**: Smallest units (Button, Input, Icon, Loading)
2. **Molecules**: Combinations of atoms (PostCard, CommentItem, BackButton)
3. **Organisms**: Complex components (RichTextEditor, PostList, NotificationList)
4. **Templates**: Screen layouts (ScreenWrapper, TabLayout)
5. **Pages**: Full screens (home.jsx, profile.jsx)

### Component Template

```jsx
import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { HP, WP } from '../helpers/common';
import { theme } from '../constants/theme';

/**
 * ComponentName - Brief description of what this component does
 *
 * @param {string} prop1 - Description of prop1
 * @param {function} onAction - Callback when action occurs
 * @param {boolean} isActive - Whether component is in active state
 */
const ComponentName = ({
  prop1,
  onAction,
  isActive = false,
  style
}) => {
  // Hooks first
  const [localState, setLocalState] = useState(null);

  // Event handlers
  const handleAction = () => {
    // Logic here
    onAction?.();
  };

  // Render
  return (
    <View style={[styles.container, style]}>
      <Text style={styles.text}>{prop1}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: WP(4),
    backgroundColor: theme.colors.background,
  },
  text: {
    fontSize: HP(2),
    color: theme.colors.text,
  },
});

export default ComponentName;
```

### Key Components Reference

#### 1. ScreenWrapper

```jsx
import { useSafeAreaInsets } from 'react-native-safe-area-context';

const ScreenWrapper = ({ children, bg }) => {
  const { top } = useSafeAreaInsets();
  const paddingTop = top > 0 ? top + 5 : 30;

  return (
    <View style={{ flex: 1, paddingTop, backgroundColor: bg }}>
      {children}
    </View>
  );
};
```

#### 2. Custom Button

```jsx
const Button = ({
  title,
  onPress,
  loading = false,
  hasShadow = true,
  buttonStyle,
  textStyle
}) => {
  return (
    <Pressable
      onPress={onPress}
      disabled={loading}
      style={[
        styles.button,
        buttonStyle,
        hasShadow && styles.shadow
      ]}
    >
      {loading ? (
        <ActivityIndicator size="small" color="white" />
      ) : (
        <Text style={[styles.text, textStyle]}>{title}</Text>
      )}
    </Pressable>
  );
};
```

#### 3. Custom Input

```jsx
const Input = ({
  icon,
  placeholder,
  inputRef,
  secureTextEntry = false,
  ...props
}) => {
  return (
    <View style={styles.container}>
      {icon && <Icon name={icon} size={26} strokeWidth={1.6} />}
      <TextInput
        ref={inputRef}
        placeholder={placeholder}
        secureTextEntry={secureTextEntry}
        style={styles.input}
        {...props}
      />
    </View>
  );
};
```

---

## State Management Strategy

### When to Use useState vs useRef

**Use `useState`**:

- UI elements that need re-rendering (buttons, loading states, visible text)
- Data displayed to users (post lists, comments, profile info)
- Conditional rendering logic

**Use `useRef`**:

- Form input values (email, password, name) to avoid excessive re-renders
- References to DOM/component instances
- Storing mutable values that don't trigger re-renders

**Example: Login Form**

```jsx
const LoginScreen = () => {
  // ✅ useState for UI state
  const [loading, setLoading] = useState(false);

  // ✅ useRef for form inputs (performance optimization)
  const emailRef = useRef('');
  const passwordRef = useRef('');

  const handleLogin = async () => {
    // Validation
    if (!emailRef.current || !passwordRef.current) {
      Alert.alert('Error', 'Please fill all fields');
      return;
    }

    setLoading(true);
    const { error } = await supabase.auth.signInWithPassword({
      email: emailRef.current,
      password: passwordRef.current,
    });
    setLoading(false);

    if (error) {
      Alert.alert('Login Failed', error.message);
    } else {
      router.push('/home');
    }
  };

  return (
    <View>
      <Input
        icon="Mail"
        placeholder="Email"
        onChangeText={(value) => (emailRef.current = value)}
      />
      <Input
        icon="Lock"
        placeholder="Password"
        secureTextEntry
        onChangeText={(value) => (passwordRef.current = value)}
      />
      <Button
        title="Login"
        onPress={handleLogin}
        loading={loading}
      />
    </View>
  );
};
```

### Context API Usage

**AuthContext** (global authentication state):

```jsx
// contexts/AuthContext.jsx
import React, { createContext, useContext, useState, useEffect } from 'react';
import { supabase } from '../helpers/supabase';

const AuthContext = createContext({});

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Check active session
    supabase.auth.getSession().then(({ data: { session } }) => {
      setUser(session?.user ?? null);
      setLoading(false);
    });

    // Listen for auth changes
    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      (_event, session) => {
        setUser(session?.user ?? null);
      }
    );

    return () => subscription.unsubscribe();
  }, []);

  const value = {
    user,
    loading,
    signOut: () => supabase.auth.signOut(),
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within AuthProvider');
  }
  return context;
};
```

**Usage in `app/_layout.jsx`**:

```jsx
import { AuthProvider } from '../contexts/AuthContext';

export default function RootLayout() {
  return (
    <AuthProvider>
      <Stack screenOptions={{ headerShown: false }} />
    </AuthProvider>
  );
}
```

---

## Authentication & Security

### Supabase Setup

**`helpers/supabase.js`**:

```javascript
import 'react-native-url-polyfill/auto';
import { createClient } from '@supabase/supabase-js';
import AsyncStorage from '@react-native-async-storage/async-storage';

const supabaseUrl = process.env.EXPO_PUBLIC_SUPABASE_URL;
const supabaseAnonKey = process.env.EXPO_PUBLIC_SUPABASE_ANON_KEY;

export const supabase = createClient(supabaseUrl, supabaseAnonKey, {
  auth: {
    storage: AsyncStorage,
    autoRefreshToken: true,
    persistSession: true,
    detectSessionInUrl: false,
  },
});
```

### Authentication Flows

**Sign Up**:

```javascript
const handleSignUp = async () => {
  const name = nameRef.current;
  const email = emailRef.current;
  const password = passwordRef.current;

  if (!name || !email || !password) {
    Alert.alert('Error', 'Please fill all fields');
    return;
  }

  setLoading(true);

  const { data, error } = await supabase.auth.signUp({
    email,
    password,
    options: {
      data: {
        name, // Store name in user metadata
      },
    },
  });

  setLoading(false);

  if (error) {
    Alert.alert('Sign Up Failed', error.message);
  } else {
    // Create user profile in database
    await supabase.from('profiles').insert({
      id: data.user.id,
      name,
      email,
    });

    router.push('/home');
  }
};
```

**Login**:

```javascript
const handleLogin = async () => {
  const email = emailRef.current;
  const password = passwordRef.current;

  if (!email || !password) {
    Alert.alert('Error', 'Please fill all fields');
    return;
  }

  setLoading(true);

  const { error } = await supabase.auth.signInWithPassword({
    email,
    password,
  });

  setLoading(false);

  if (error) {
    Alert.alert('Login Failed', error.message);
  } else {
    router.push('/home');
  }
};
```

**Session Check (`app/index.jsx`)**:

```jsx
import { useEffect } from 'react';
import { useRouter } from 'expo-router';
import { useAuth } from '../contexts/AuthContext';

export default function Index() {
  const router = useRouter();
  const { user, loading } = useAuth();

  useEffect(() => {
    if (!loading) {
      if (user) {
        router.replace('/home');
      } else {
        router.replace('/welcome');
      }
    }
  }, [user, loading]);

  return <Loading />; // Show loading while checking session
}
```

### Security Best Practices

1. **Never store sensitive data in AsyncStorage without encryption**
2. **Use Supabase Row Level Security (RLS) policies**
3. **Validate all inputs on both client and server**
4. **Use environment variables for API keys**
5. **Implement rate limiting for auth endpoints**
6. **Enable email verification for production**

---

## Real-Time Features

### Supabase Real-Time Setup

**Real-Time Post Updates**:

```javascript
// hooks/usePosts.js
import { useEffect, useState } from 'react';
import { supabase } from '../helpers/supabase';

export const usePosts = () => {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchPosts();

    // Subscribe to real-time changes
    const subscription = supabase
      .channel('posts')
      .on('postgres_changes',
        { event: 'INSERT', schema: 'public', table: 'posts' },
        (payload) => {
          setPosts((current) => [payload.new, ...current]);
        }
      )
      .on('postgres_changes',
        { event: 'UPDATE', schema: 'public', table: 'posts' },
        (payload) => {
          setPosts((current) =>
            current.map((post) =>
              post.id === payload.new.id ? payload.new : post
            )
          );
        }
      )
      .on('postgres_changes',
        { event: 'DELETE', schema: 'public', table: 'posts' },
        (payload) => {
          setPosts((current) =>
            current.filter((post) => post.id !== payload.old.id)
          );
        }
      )
      .subscribe();

    return () => {
      subscription.unsubscribe();
    };
  }, []);

  const fetchPosts = async () => {
    setLoading(true);
    const { data, error } = await supabase
      .from('posts')
      .select('*, profiles(*), likes(*), comments(*)')
      .order('created_at', { ascending: false });

    if (!error) setPosts(data);
    setLoading(false);
  };

  return { posts, loading, refetch: fetchPosts };
};
```

**Real-Time Notifications**:

```javascript
// hooks/useNotifications.js
export const useNotifications = () => {
  const [notifications, setNotifications] = useState([]);
  const { user } = useAuth();

  useEffect(() => {
    if (!user) return;

    const subscription = supabase
      .channel('notifications')
      .on('postgres_changes',
        {
          event: 'INSERT',
          schema: 'public',
          table: 'notifications',
          filter: `user_id=eq.${user.id}`
        },
        (payload) => {
          setNotifications((current) => [payload.new, ...current]);
        }
      )
      .subscribe();

    return () => subscription.unsubscribe();
  }, [user]);

  return { notifications };
};
```

---

## Performance Optimization

### Pagination Implementation

```javascript
const PAGE_SIZE = 10;

const usePostsPagination = () => {
  const [posts, setPosts] = useState([]);
  const [page, setPage] = useState(0);
  const [hasMore, setHasMore] = useState(true);
  const [loading, setLoading] = useState(false);

  const fetchPosts = async () => {
    if (loading || !hasMore) return;

    setLoading(true);
    const { data, error } = await supabase
      .from('posts')
      .select('*, profiles(*)')
      .order('created_at', { ascending: false })
      .range(page * PAGE_SIZE, (page + 1) * PAGE_SIZE - 1);

    if (!error) {
      setPosts((current) => [...current, ...data]);
      setHasMore(data.length === PAGE_SIZE);
      setPage((p) => p + 1);
    }

    setLoading(false);
  };

  return { posts, fetchPosts, loading, hasMore };
};
```

**FlatList Integration**:

```jsx
<FlatList
  data={posts}
  keyExtractor={(item) => item.id}
  renderItem={({ item }) => <PostCard post={item} />}
  onEndReached={fetchPosts}
  onEndReachedThreshold={0.5}
  ListFooterComponent={
    loading && <ActivityIndicator style={{ marginVertical: 20 }} />
  }
/>
```

### Image Optimization

```javascript
// Use Expo Image for better performance
import { Image } from 'expo-image';

<Image
  source={{ uri: post.image_url }}
  style={styles.image}
  contentFit="cover"
  transition={200}
  placeholder={blurhash} // Optional blur placeholder
/>
```

### Memoization

```jsx
import { memo, useMemo, useCallback } from 'react';

// Memoize expensive components
const PostCard = memo(({ post, onLike, onComment }) => {
  // Component logic
});

// Memoize expensive calculations
const sortedPosts = useMemo(() => {
  return posts.sort((a, b) => b.likes_count - a.likes_count);
}, [posts]);

// Memoize callbacks to prevent re-renders
const handleLike = useCallback((postId) => {
  // Like logic
}, []);
```

---

## Testing Strategy

### Unit Testing (Jest + React Native Testing Library)

```javascript
// __tests__/Button.test.js
import React from 'react';
import { render, fireEvent } from '@testing-library/react-native';
import Button from '../components/Button';

describe('Button Component', () => {
  it('renders correctly with title', () => {
    const { getByText } = render(<Button title="Click Me" />);
    expect(getByText('Click Me')).toBeTruthy();
  });

  it('calls onPress when pressed', () => {
    const mockOnPress = jest.fn();
    const { getByText } = render(
      <Button title="Click Me" onPress={mockOnPress} />
    );

    fireEvent.press(getByText('Click Me'));
    expect(mockOnPress).toHaveBeenCalledTimes(1);
  });

  it('shows loading indicator when loading', () => {
    const { getByTestId, queryByText } = render(
      <Button title="Submit" loading={true} />
    );

    expect(queryByText('Submit')).toBeNull();
    expect(getByTestId('loading-indicator')).toBeTruthy();
  });
});
```

### Integration Testing

```javascript
// __tests__/LoginFlow.test.js
import { render, fireEvent, waitFor } from '@testing-library/react-native';
import LoginScreen from '../app/login';

jest.mock('../helpers/supabase', () => ({
  supabase: {
    auth: {
      signInWithPassword: jest.fn(),
    },
  },
}));

describe('Login Flow', () => {
  it('logs in user with valid credentials', async () => {
    const { getByPlaceholderText, getByText } = render(<LoginScreen />);

    fireEvent.changeText(getByPlaceholderText('Email'), 'test@example.com');
    fireEvent.changeText(getByPlaceholderText('Password'), 'password123');
    fireEvent.press(getByText('Login'));

    await waitFor(() => {
      expect(supabase.auth.signInWithPassword).toHaveBeenCalledWith({
        email: 'test@example.com',
        password: 'password123',
      });
    });
  });
});
```

---

## Common Patterns

### Error Handling

```javascript
const handleAction = async () => {
  try {
    setLoading(true);
    setError(null);

    const { data, error } = await supabase
      .from('posts')
      .insert({ content });

    if (error) throw error;

    // Success handling
    Alert.alert('Success', 'Post created!');
  } catch (error) {
    console.error('Error:', error);
    Alert.alert('Error', error.message || 'Something went wrong');
    setError(error.message);
  } finally {
    setLoading(false);
  }
};
```

### Loading States

```jsx
// Conditional rendering based on loading state
{loading ? (
  <Loading />
) : posts.length === 0 ? (
  <EmptyState message="No posts yet" />
) : (
  <FlatList data={posts} renderItem={renderPost} />
)}
```

### Modal Pattern

```jsx
const [modalVisible, setModalVisible] = useState(false);

<Modal
  visible={modalVisible}
  animationType="slide"
  transparent={true}
  onRequestClose={() => setModalVisible(false)}
>
  <View style={styles.modalContainer}>
    <View style={styles.modalContent}>
      {/* Modal content */}
      <Button
        title="Close"
        onPress={() => setModalVisible(false)}
      />
    </View>
  </View>
</Modal>
```

---

## Troubleshooting Guide

### Common Issues

**1. Expo Router navigation not working**

```javascript
// ❌ Wrong
import { useRouter } from 'react-router';

// ✅ Correct
import { useRouter } from 'expo-router';
```

**2. Supabase auth session not persisting**

```javascript
// Make sure AsyncStorage is installed and configured
npm install @react-native-async-storage/async-storage

// In supabase.js, ensure storage is set
import AsyncStorage from '@react-native-async-storage/async-storage';

export const supabase = createClient(url, key, {
  auth: {
    storage: AsyncStorage, // This is critical
    autoRefreshToken: true,
    persistSession: true,
  },
});
```

**3. Images not loading from Supabase storage**

```javascript
// Get public URL correctly
const { data } = supabase.storage
  .from('avatars')
  .getPublicUrl('user-avatar.png');

const imageUrl = data.publicUrl;
```

**4. Real-time not working**

```javascript
// Enable real-time in Supabase dashboard
// Database → Replication → Enable real-time for tables

// Subscribe to correct channel
const subscription = supabase
  .channel('custom-channel-name') // Unique channel name
  .on('postgres_changes', { ... })
  .subscribe();
```

**5. Android back button not working**

```javascript
// Use Expo Router's back navigation
import { useRouter } from 'expo-router';

const router = useRouter();
const handleBack = () => router.back();
```

---

## Phase-by-Phase Implementation Guide

### Phase 0: Project Setup

**Task Checklist**:

- [ ] Initialize Expo Router app: `npx create-expo-app captea-platform --template blank`
- [ ] Install dependencies: `npm install react-native-svg @supabase/supabase-js @react-native-async-storage/async-storage`
- [ ] Install VS Code extensions (ES7+ React snippets, Simple React Snippets)
- [ ] Delete default template files (app folder contents, assets, etc.)
- [ ] Create `constants/theme.js` with colors, fonts, radius
- [ ] Create `helpers/common.js` with HP/WP functions
- [ ] Create `app/_layout.jsx` with Stack layout (headerShown: false)
- [ ] Create `components/ScreenWrapper.jsx` with safe area handling

**Code Snippets**:

```javascript
// constants/theme.js
export const theme = {
  colors: {
    primary: '#00C2FF',
    background: '#FFFFFF',
    text: '#1A1A1A',
    textLight: '#6B7280',
    border: '#E5E7EB',
  },
  fonts: {
    medium: '500',
    semibold: '600',
    bold: '700',
    extrabold: '800',
  },
  radius: {
    xs: 4,
    sm: 8,
    md: 12,
    lg: 16,
    xl: 20,
    doublexl: 24,
  },
};
```

```javascript
// helpers/common.js
import { Dimensions } from 'react-native';

const { width: deviceWidth, height: deviceHeight } = Dimensions.get('window');

export const HP = (percentage) => {
  return (deviceHeight * percentage) / 100;
};

export const WP = (percentage) => {
  return (deviceWidth * percentage) / 100;
};
```

### Phase 1: Foundational Components

**Task Checklist**:

- [ ] Create `components/Loading.jsx` (ActivityIndicator wrapper)
- [ ] Create `components/Button.jsx` (custom button with loading, shadow)
- [ ] Create `assets/icons/index.jsx` (centralized icon component)
- [ ] Create `components/BackButton.jsx` (arrow icon + router.back())
- [ ] Create `components/Input.jsx` (icon support, inputRef)
- [ ] Create `app/welcome.jsx` (welcome image, title, get started button)
- [ ] Create `app/login.jsx` (email/password inputs, login button)
- [ ] Create `app/signup.jsx` (name/email/password inputs, signup button)

**Priority**: Build Button and Input first, then screens that use them.

### Phase 2: Authentication

**Task Checklist**:

- [ ] Install Supabase SDK: `npm install @supabase/supabase-js`
- [ ] Create Supabase project and get credentials
- [ ] Create `.env` file with `EXPO_PUBLIC_SUPABASE_URL` and `EXPO_PUBLIC_SUPABASE_ANON_KEY`
- [ ] Create `helpers/supabase.js` with client initialization
- [ ] Create `contexts/AuthContext.jsx` with user state management
- [ ] Implement `handleSignUp` in `signup.jsx`
- [ ] Implement `handleLogin` in `login.jsx`
- [ ] Update `app/index.jsx` to check session and redirect
- [ ] Test signup → login → session persistence flow

### Phase 3: Core Social Features

**Task Checklist**:

- [ ] Create database schema (posts, likes, comments tables)
- [ ] Create `app/(tabs)/home.jsx` with post feed
- [ ] Create `hooks/usePosts.js` with pagination
- [ ] Create `components/PostCard.jsx` (display post, like/comment/share buttons)
- [ ] Implement like functionality
- [ ] Create `app/post/[id].jsx` modal for post details + comments
- [ ] Implement comment creation and display
- [ ] Create `app/(tabs)/create.jsx` with Rich Text Editor
- [ ] Implement image upload (Expo ImagePicker + Supabase Storage)
- [ ] Implement video upload and trimming
- [ ] Set up real-time subscriptions for posts

### Phase 4: Profile & Notifications

**Task Checklist**:

- [ ] Create `app/(tabs)/profile.jsx` displaying user posts
- [ ] Implement pagination for user posts
- [ ] Add video player component (Expo AV)
- [ ] Create edit profile screen
- [ ] Implement profile image upload
- [ ] Create `app/(tabs)/notifications.jsx`
- [ ] Set up real-time notifications
- [ ] Implement notification navigation to post/comment
- [ ] Add edit/delete buttons for post owners
- [ ] Implement post deletion (real-time removal)
- [ ] Implement comment deletion (owner + post owner)

### Phase 5: Production Deployment

**Task Checklist**:

- [ ] Code review (optimize useRef usage, remove console.logs)
- [ ] Test all flows on iOS simulator
- [ ] Test all flows on Android emulator
- [ ] Set up Expo Application Services (EAS)
- [ ] Configure `eas.json` for production builds
- [ ] Generate iOS production build: `eas build --platform ios`
- [ ] Generate Android production build: `eas build --platform android`
- [ ] Submit to Apple App Store
- [ ] Submit to Google Play Store

---

## Quick Commands Reference

```bash
# Development
npx expo start
npx expo start --clear
npx expo start --ios
npx expo start --android

# Testing
npm test
npm test -- --coverage

# Production builds
eas build --platform ios --profile production
eas build --platform android --profile production

# Submit to stores
eas submit --platform ios
eas submit --platform android
```

---

**Last Updated**: November 19, 2025
**Maintained By**: Cosmaslabs Inc - Senior Development Team
**Agent Version**: 1.0.0
**Status**: ACTIVE
