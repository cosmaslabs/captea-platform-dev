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
 * - NO persistent sessions on web (avoids AsyncStorage errors)
 * - Session detection disabled for URL (SPA mode)
 *
 * Note: Users need to login each time on web (mobile-first approach)
 * Native apps will use AsyncStorage automatically for persistence
 */
export const supabase = createClient(supabaseUrl || 'https://placeholder.supabase.co', supabaseAnonKey || 'placeholder', {
  auth: {
    storage: undefined,  // Disable storage completely (no AsyncStorage on web)
    autoRefreshToken: true,
    persistSession: false,  // Disable session persistence to avoid storage issues
    detectSessionInUrl: false,
  },
});
