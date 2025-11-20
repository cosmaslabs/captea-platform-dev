/**
 * Supabase Client Configuration
 * Initializes Supabase client with platform-specific storage
 * Web: Uses default localStorage
 * Native: Uses AsyncStorage (handled by Supabase automatically)
 */

import { createClient } from '@supabase/supabase-js';
import 'react-native-url-polyfill/auto';

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
 * - Auto token refresh for seamless authentication
 * - Persistent sessions (uses localStorage on web, AsyncStorage on native automatically)
 * - Session detection disabled for URL (SPA mode)
 */
export const supabase = createClient(supabaseUrl || 'https://placeholder.supabase.co', supabaseAnonKey || 'placeholder', {
  auth: {
    // Storage handled automatically by Supabase based on platform
    autoRefreshToken: true,
    persistSession: true,
    detectSessionInUrl: false,
  },
});
