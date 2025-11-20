/**
 * Supabase Client Configuration
 * Initializes Supabase client with platform-specific storage
 * Web: Uses localStorage (browser's native storage)
 * Native: Uses AsyncStorage (React Native's async storage)
 */

import AsyncStorage from '@react-native-async-storage/async-storage';
import { createClient } from '@supabase/supabase-js';
import { Platform } from 'react-native';
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
 * - Web: Uses localStorage (synchronous browser storage)
 * - Native: Uses AsyncStorage (React Native async storage)
 */
const supabaseStorage = Platform.OS === 'web'
  ? {
      getItem: (key) => {
        if (typeof localStorage === 'undefined') return null;
        return localStorage.getItem(key);
      },
      setItem: (key, value) => {
        if (typeof localStorage === 'undefined') return;
        localStorage.setItem(key, value);
      },
      removeItem: (key) => {
        if (typeof localStorage === 'undefined') return;
        localStorage.removeItem(key);
      },
    }
  : AsyncStorage; // Native uses AsyncStorage directly

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
