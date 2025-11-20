/**
 * Supabase Client Configuration
 * Initializes Supabase client with web-compatible storage for session persistence
 * Enables auto-refresh and persistent sessions
 */

import { createClient } from '@supabase/supabase-js';
import 'react-native-url-polyfill/auto';
import { storage } from './webStorage';

const supabaseUrl = process.env.EXPO_PUBLIC_SUPABASE_URL;
const supabaseAnonKey = process.env.EXPO_PUBLIC_SUPABASE_ANON_KEY;

// Validate environment variables
if (!supabaseUrl || !supabaseAnonKey) {
  console.error('Missing Supabase environment variables');
  // Provide fallback for development
  if (typeof window !== 'undefined') {
    console.warn('Using fallback Supabase configuration');
  }
}

/**
 * Supabase client instance
 * Configured with:
 * - Web-compatible storage (AsyncStorage on native, localStorage on web)
 * - Auto token refresh for seamless authentication
 * - Persistent sessions
 */
export const supabase = createClient(supabaseUrl || 'https://placeholder.supabase.co', supabaseAnonKey || 'placeholder', {
  auth: {
    storage: storage,
    autoRefreshToken: true,
    persistSession: true,
    detectSessionInUrl: false,
  },
});
