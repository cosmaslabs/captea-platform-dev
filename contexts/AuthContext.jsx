/**
 * AuthContext - Global Authentication State Management
 * Provides user session state and authentication methods throughout the app
 * Listens for real-time auth state changes from Supabase
 */

import { createContext, useContext, useEffect, useState } from 'react';
import { supabase } from '../helpers/supabase';

// Create context with default values
const AuthContext = createContext({
  user: null,
  session: null,
  loading: true,
  signOut: async () => {},
});

/**
 * AuthProvider Component
 * Wraps the app to provide authentication state globally
 *
 * Features:
 * - Checks for existing session on mount
 * - Listens for auth state changes (login, logout, token refresh)
 * - Provides signOut method
 * - Loading state during session check
 */
export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [session, setSession] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Check for existing session on mount
    const checkSession = async () => {
      try {
        const { data: { session: existingSession }, error } = await supabase.auth.getSession();

        if (error) {
          console.error('Session check error:', error.message);
        }

        if (existingSession) {
          setSession(existingSession);
          setUser(existingSession.user);
        }
      } catch (error) {
        console.error('Session check failed:', error);
      } finally {
        setLoading(false);
      }
    };

    checkSession();

    // Listen for auth state changes (login, logout, token refresh)
    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      async (event, currentSession) => {
        console.log('Auth state changed:', event);

        setSession(currentSession);
        setUser(currentSession?.user ?? null);
        setLoading(false);
      }
    );

    // Cleanup subscription on unmount
    return () => {
      subscription.unsubscribe();
    };
  }, []);

  /**
   * Sign out the current user
   * Clears session and redirects to welcome screen
   */
  const signOut = async () => {
    try {
      const { error } = await supabase.auth.signOut();
      if (error) {
        console.error('Sign out error:', error.message);
        throw error;
      }
    } catch (error) {
      console.error('Sign out failed:', error);
      throw error;
    }
  };

  const value = {
    user,
    session,
    loading,
    signOut,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

/**
 * useAuth Hook
 * Custom hook to access authentication context
 * Must be used within AuthProvider
 *
 * @returns {object} Authentication state and methods
 * @throws {Error} If used outside AuthProvider
 */
export const useAuth = () => {
  const context = useContext(AuthContext);

  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }

  return context;
};
