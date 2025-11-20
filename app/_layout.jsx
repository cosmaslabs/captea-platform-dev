/**
 * Root Layout Component
 * Main navigation wrapper using Expo Router Stack
 * Wrapped with AuthProvider for global authentication state
 * Includes ErrorBoundary for graceful error handling
 */

import { Stack } from 'expo-router';
import ErrorBoundary from '../components/ErrorBoundary';
import { AuthProvider } from '../contexts/AuthContext';

export default function RootLayout() {
  return (
    <ErrorBoundary>
      <AuthProvider>
        <Stack
          screenOptions={{
            headerShown: false,
          }}
        />
      </AuthProvider>
    </ErrorBoundary>
  );
}
