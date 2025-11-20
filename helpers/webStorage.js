/**
 * Web-compatible storage adapter for Supabase Auth
 * Falls back to localStorage on web platforms
 */

import AsyncStorage from '@react-native-async-storage/async-storage';
import { Platform } from 'react-native';

/**
 * Universal storage adapter that works on both native and web
 */
const createWebStorage = () => {
  if (Platform.OS === 'web') {
    return {
      getItem: async (key) => {
        try {
          return localStorage.getItem(key);
        } catch (error) {
          console.error('LocalStorage getItem error:', error);
          return null;
        }
      },
      setItem: async (key, value) => {
        try {
          localStorage.setItem(key, value);
        } catch (error) {
          console.error('LocalStorage setItem error:', error);
        }
      },
      removeItem: async (key) => {
        try {
          localStorage.removeItem(key);
        } catch (error) {
          console.error('LocalStorage removeItem error:', error);
        }
      },
    };
  }
  return AsyncStorage;
};

export const storage = createWebStorage();
