/**
 * Index Screen
 * Entry point - checks authentication and redirects accordingly
 * - If authenticated → home screen
 * - If not authenticated → welcome screen
 */

import { useRouter } from 'expo-router';
import { useEffect } from 'react';
import Loading from '../components/Loading';
import ScreenWrapper from '../components/ScreenWrapper';
import { theme } from '../constants/theme';
import { useAuth } from '../contexts/AuthContext';

export default function Index() {
  const router = useRouter();
  const { user, loading } = useAuth();

  useEffect(() => {
    // Wait for auth check to complete
    if (loading) return;

    // Redirect based on authentication status
    const timer = setTimeout(() => {
      if (user) {
        router.replace('/home');
      } else {
        router.replace('/welcome');
      }
    }, 100);

    return () => clearTimeout(timer);
  }, [user, loading]);

  return (
    <ScreenWrapper bg={theme.colors.background}>
      <Loading />
    </ScreenWrapper>
  );
}
