/**
 * Home Screen
 * Main authenticated screen - displays user info and logout
 * Will be expanded with social features in Phase 3
 */

import { useRouter } from 'expo-router';
import { useState } from 'react';
import { Alert, ScrollView, StyleSheet, Text, View } from 'react-native';
import Button from '../components/Button';
import ScreenWrapper from '../components/ScreenWrapper';
import { theme } from '../constants/theme';
import { useAuth } from '../contexts/AuthContext';
import { HP, WP } from '../helpers/common';

const Home = () => {
  const router = useRouter();
  const { user, signOut } = useAuth();
  const [loading, setLoading] = useState(false);

  const handleLogout = async () => {
    Alert.alert(
      'Logout',
      'Are you sure you want to logout?',
      [
        {
          text: 'Cancel',
          style: 'cancel',
        },
        {
          text: 'Logout',
          style: 'destructive',
          onPress: async () => {
            setLoading(true);
            try {
              await signOut();
              // AuthContext will handle navigation via index.jsx
            } catch (error) {
              console.error('Logout error:', error);
              Alert.alert('Error', 'Failed to logout. Please try again.');
            } finally {
              setLoading(false);
            }
          },
        },
      ]
    );
  };

  return (
    <ScreenWrapper bg={theme.colors.background}>
      <ScrollView contentContainerStyle={styles.scrollContent}>
        <View style={styles.container}>
          {/* Welcome Header */}
          <View style={styles.header}>
            <Text style={styles.title}>🎉 Welcome to Captea!</Text>
            <Text style={styles.subtitle}>
              {user?.user_metadata?.name || user?.email || 'User'}
            </Text>
          </View>

          {/* User Info Card */}
          <View style={styles.userCard}>
            <Text style={styles.cardTitle}>Account Information</Text>
            <View style={styles.infoRow}>
              <Text style={styles.infoLabel}>Email:</Text>
              <Text style={styles.infoValue}>{user?.email}</Text>
            </View>
            <View style={styles.infoRow}>
              <Text style={styles.infoLabel}>Name:</Text>
              <Text style={styles.infoValue}>
                {user?.user_metadata?.name || 'Not set'}
              </Text>
            </View>
            <View style={styles.infoRow}>
              <Text style={styles.infoLabel}>User ID:</Text>
              <Text style={styles.infoValue} numberOfLines={1}>
                {user?.id}
              </Text>
            </View>
          </View>

          {/* Phase Status */}
          <View style={styles.statusContainer}>
            <Text style={styles.cardTitle}>✅ Phase 2 Complete</Text>
            <Text style={styles.statusText}>• Supabase Integration</Text>
            <Text style={styles.statusText}>• Authentication Context</Text>
            <Text style={styles.statusText}>• Session Management</Text>
            <Text style={styles.statusText}>• Protected Routes</Text>
            <Text style={styles.statusText}>• Login/Signup Flows</Text>
            <Text style={styles.statusText}>• Persistent Sessions</Text>
          </View>

          {/* Next Phase */}
          <View style={styles.nextPhase}>
            <Text style={styles.nextPhaseTitle}>Next: Phase 3</Text>
            <Text style={styles.nextPhaseText}>
              • Post Feed{'\n'}
              • Create Posts{'\n'}
              • Like & Comment{'\n'}
              • Real-Time Updates
            </Text>
          </View>

          {/* Logout Button */}
          <Button
            title="Logout"
            onPress={handleLogout}
            loading={loading}
            hasShadow={false}
            buttonStyle={{ backgroundColor: theme.colors.error }}
          />
        </View>
      </ScrollView>
    </ScreenWrapper>
  );
};

const styles = StyleSheet.create({
  scrollContent: {
    flexGrow: 1,
  },
  container: {
    flex: 1,
    paddingHorizontal: WP(5),
    paddingTop: HP(3),
    paddingBottom: HP(3),
    gap: HP(2.5),
  },
  header: {
    alignItems: 'center',
    marginBottom: HP(1),
  },
  title: {
    fontSize: HP(3.5),
    fontWeight: theme.fonts.extrabold,
    color: theme.colors.primary,
    textAlign: 'center',
  },
  subtitle: {
    fontSize: HP(2),
    fontWeight: theme.fonts.semibold,
    color: theme.colors.success,
    textAlign: 'center',
    marginTop: HP(0.5),
  },
  userCard: {
    backgroundColor: theme.colors.backgroundSecondary,
    padding: WP(5),
    borderRadius: theme.radius.lg,
    gap: HP(1.5),
  },
  cardTitle: {
    fontSize: HP(2),
    fontWeight: theme.fonts.bold,
    color: theme.colors.text,
    marginBottom: HP(0.5),
  },
  infoRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  infoLabel: {
    fontSize: HP(1.8),
    fontWeight: theme.fonts.semibold,
    color: theme.colors.textLight,
  },
  infoValue: {
    fontSize: HP(1.8),
    fontWeight: theme.fonts.medium,
    color: theme.colors.text,
    flex: 1,
    textAlign: 'right',
    marginLeft: WP(2),
  },
  statusContainer: {
    backgroundColor: theme.colors.success + '10',
    padding: WP(5),
    borderRadius: theme.radius.lg,
    borderWidth: 1,
    borderColor: theme.colors.success,
    gap: HP(0.8),
  },
  statusText: {
    fontSize: HP(1.8),
    fontWeight: theme.fonts.medium,
    color: theme.colors.text,
  },
  nextPhase: {
    backgroundColor: theme.colors.primary + '10',
    padding: WP(5),
    borderRadius: theme.radius.lg,
    borderWidth: 1,
    borderColor: theme.colors.primary,
  },
  nextPhaseTitle: {
    fontSize: HP(2.2),
    fontWeight: theme.fonts.bold,
    color: theme.colors.primary,
    marginBottom: HP(1),
  },
  nextPhaseText: {
    fontSize: HP(1.8),
    fontWeight: theme.fonts.medium,
    color: theme.colors.text,
    lineHeight: HP(2.5),
  },
});

export default Home;
