/**
 * Profile Screen (Placeholder)
 * Will display user profile, posts, and edit functionality
 */

import { useRouter } from 'expo-router';
import { useState } from 'react';
import { Alert, ScrollView, StyleSheet, Text, View } from 'react-native';
import BackButton from '../../components/BackButton';
import Button from '../../components/Button';
import ScreenWrapper from '../../components/ScreenWrapper';
import { theme } from '../../constants/theme';
import { useAuth } from '../../contexts/AuthContext';
import { HP, WP } from '../../helpers/common';

const Profile = () => {
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
      <View style={styles.container}>
        <View style={styles.header}>
          <BackButton />
        </View>

        <ScrollView contentContainerStyle={styles.scrollContent}>
          <View style={styles.content}>
            {/* Avatar Placeholder */}
            <View style={styles.avatarContainer}>
              <View style={styles.avatar}>
                <Text style={styles.avatarText}>
                  {user?.user_metadata?.name?.charAt(0).toUpperCase() || 'U'}
                </Text>
              </View>
            </View>

            {/* User Info */}
            <View style={styles.userInfo}>
              <Text style={styles.name}>
                {user?.user_metadata?.name || 'User Name'}
              </Text>
              <Text style={styles.email}>{user?.email}</Text>
            </View>

            {/* Stats */}
            <View style={styles.statsContainer}>
              <View style={styles.statItem}>
                <Text style={styles.statValue}>0</Text>
                <Text style={styles.statLabel}>Posts</Text>
              </View>
              <View style={styles.statDivider} />
              <View style={styles.statItem}>
                <Text style={styles.statValue}>0</Text>
                <Text style={styles.statLabel}>Followers</Text>
              </View>
              <View style={styles.statDivider} />
              <View style={styles.statItem}>
                <Text style={styles.statValue}>0</Text>
                <Text style={styles.statLabel}>Following</Text>
              </View>
            </View>

            {/* Coming Soon */}
            <View style={styles.comingSoon}>
              <Text style={styles.comingSoonTitle}>Coming Soon</Text>
              <Text style={styles.comingSoonText}>
                📸 Upload Avatar{'\n'}
                ✏️ Edit Profile{'\n'}
                📄 View Posts{'\n'}
                👥 Followers/Following{'\n'}
                ⚙️ Settings
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
      </View>
    </ScreenWrapper>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: WP(5),
  },
  header: {
    paddingTop: HP(2),
    marginBottom: HP(2),
  },
  scrollContent: {
    flexGrow: 1,
  },
  content: {
    flex: 1,
    gap: HP(2.5),
    paddingBottom: HP(3),
  },
  avatarContainer: {
    alignItems: 'center',
    marginVertical: HP(2),
  },
  avatar: {
    width: HP(12),
    height: HP(12),
    borderRadius: HP(6),
    backgroundColor: theme.colors.primary,
    justifyContent: 'center',
    alignItems: 'center',
    boxShadow: `0 4px 8px ${theme.colors.text}33`,
    elevation: 6,
  },
  avatarText: {
    fontSize: HP(5),
    fontWeight: theme.fonts.bold,
    color: theme.colors.textWhite,
  },
  userInfo: {
    alignItems: 'center',
  },
  name: {
    fontSize: HP(2.5),
    fontWeight: theme.fonts.bold,
    color: theme.colors.text,
  },
  email: {
    fontSize: HP(1.8),
    fontWeight: theme.fonts.medium,
    color: theme.colors.textLight,
    marginTop: HP(0.5),
  },
  statsContainer: {
    flexDirection: 'row',
    backgroundColor: theme.colors.backgroundSecondary,
    padding: WP(5),
    borderRadius: theme.radius.lg,
    justifyContent: 'space-around',
    marginVertical: HP(2),
  },
  statItem: {
    alignItems: 'center',
  },
  statValue: {
    fontSize: HP(2.8),
    fontWeight: theme.fonts.extrabold,
    color: theme.colors.primary,
  },
  statLabel: {
    fontSize: HP(1.6),
    fontWeight: theme.fonts.medium,
    color: theme.colors.textLight,
    marginTop: HP(0.5),
  },
  statDivider: {
    width: 1,
    backgroundColor: theme.colors.border,
  },
  comingSoon: {
    backgroundColor: theme.colors.backgroundSecondary,
    padding: WP(6),
    borderRadius: theme.radius.lg,
    alignItems: 'center',
  },
  comingSoonTitle: {
    fontSize: HP(2.2),
    fontWeight: theme.fonts.bold,
    color: theme.colors.text,
    marginBottom: HP(1.5),
  },
  comingSoonText: {
    fontSize: HP(1.9),
    fontWeight: theme.fonts.medium,
    color: theme.colors.textLight,
    textAlign: 'center',
    lineHeight: HP(3),
  },
});

export default Profile;
