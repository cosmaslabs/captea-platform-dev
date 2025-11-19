/**
 * Root Layout Component
 * Main navigation wrapper using Expo Router Stack
 * Wrapped with AuthProvider for global authentication state
 */

import { Stack } from 'expo-router';
import { AuthProvider } from '../contexts/AuthContext';

export default function RootLayout() {
  return (
    <AuthProvider>
      <Stack
        screenOptions={{
          headerShown: false,
        }}
      />
    </AuthProvider>
  );
}
