/**
 * Supabase Client Configuration
 * Initializes Supabase client with platform-specific storage
 * Web: Uses localStorage (browser's native storage)
 * Native: Uses AsyncStorage (React Native's async storage)
 */

import { createClient } from '@supabase/supabase-js';
import 'react-native-url-polyfill/auto';

const supabaseUrl = process.env.EXPO_PUBLIC_SUPABASE_URL;
const supabaseAnonKey = process.env.EXPO_PUBLIC_SUPABASE_ANON_KEY;

// Validate environment variables
if (!supabaseUrl || !supabaseAnonKey) {
  console.error('Missing Supabase environment variables');
  throw new Error('Supabase configuration is required');
}

/**
 * Platform-specific storage implementation
 * Detects environment and uses appropriate storage
 */
const isWeb = typeof window !== 'undefined' && typeof window.document !== 'undefined';

let supabaseStorage;

if (isWeb) {
  // Web: Use localStorage directly
  supabaseStorage = {
    getItem: (key) => {
      try {
        return localStorage.getItem(key);
      } catch (e) {
        console.warn('localStorage getItem error:', e);
        return null;
      }
    },
    setItem: (key, value) => {
      try {
        localStorage.setItem(key, value);
      } catch (e) {
        console.warn('localStorage setItem error:', e);
      }
    },
    removeItem: (key) => {
      try {
        localStorage.removeItem(key);
      } catch (e) {
        console.warn('localStorage removeItem error:', e);
      }
    },
  };
} else {
  // Native: Import AsyncStorage dynamically
  try {
    const AsyncStorage = require('@react-native-async-storage/async-storage').default;
    supabaseStorage = AsyncStorage;
  } catch (e) {
    console.error('AsyncStorage not available:', e);
    supabaseStorage = null;
  }
}

/**
 * Supabase client instance
 * Configured with:
 * - Platform-specific storage (localStorage for web, AsyncStorage for native)
 * - Auto token refresh for seamless authentication
 * - Persistent sessions across app restarts
 * - Session detection disabled for URL (SPA mode)
 */
export const supabase = createClient(supabaseUrl, supabaseAnonKey, {
  auth: {
    storage: supabaseStorage,
    autoRefreshToken: true,
    persistSession: true,
    detectSessionInUrl: false,
  },
});
