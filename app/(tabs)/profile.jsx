/**
 * Profile Screen
 * Display and edit user profile with avatar upload
 */

import { useRouter } from 'expo-router';
import { useEffect, useRef, useState } from 'react';
import { Alert, Image, Modal, Pressable, ScrollView, StyleSheet, Text, TextInput, View } from 'react-native';
import Icon from '../../assets/icons';
import Button from '../../components/Button';
import Loading from '../../components/Loading';
import ScreenWrapper from '../../components/ScreenWrapper';
import { theme } from '../../constants/theme';
import { useAuth } from '../../contexts/AuthContext';
import { HP, WP } from '../../helpers/common';
import { pickImage, uploadFile } from '../../helpers/media';
import { supabase } from '../../helpers/supabase';

const Profile = () => {
  const router = useRouter();
  const { user, signOut } = useAuth();

  const [loading, setLoading] = useState(true);
  const [profile, setProfile] = useState(null);
  const [editModalVisible, setEditModalVisible] = useState(false);
  const [uploading, setUploading] = useState(false);
  const [saving, setSaving] = useState(false);

  // Edit form refs
  const nameRef = useRef(profile?.name || '');
  const bioRef = useRef(profile?.bio || '');
  const [avatarUri, setAvatarUri] = useState(null);

  useEffect(() => {
    if (user) {
      fetchProfile();
    }
  }, [user]);

  const fetchProfile = async () => {
    try {
      setLoading(true);
      const { data, error } = await supabase
        .from('profiles')
        .select('*')
        .eq('id', user.id)
        .single();

      if (error) throw error;
      setProfile(data);
      nameRef.current = data?.name || '';
      bioRef.current = data?.bio || '';
    } catch (error) {
      console.error('Fetch profile error:', error);
    } finally {
      setLoading(false);
    }
  };

  const handlePickImage = async () => {
    const result = await pickImage();
    if (result) {
      setAvatarUri(result.uri);
    }
  };

  const handleSaveProfile = async () => {
    const name = nameRef.current.trim();

    if (!name) {
      Alert.alert('Error', 'Name is required');
      return;
    }

    setSaving(true);

    try {
      let avatar_url = profile?.avatar_url;

      // Upload new avatar if selected
      if (avatarUri) {
        setUploading(true);
        const uploadResult = await uploadFile('avatars', avatarUri, user.id);
        if (uploadResult.success) {
          avatar_url = uploadResult.url;
        } else {
          throw new Error('Failed to upload avatar');
        }
        setUploading(false);
      }

      // Update profile
      const { error } = await supabase
        .from('profiles')
        .update({
          name,
          bio: bioRef.current.trim() || null,
          avatar_url,
          updated_at: new Date().toISOString(),
        })
        .eq('id', user.id);

      if (error) throw error;

      // Refresh profile
      await fetchProfile();
      setEditModalVisible(false);
      setAvatarUri(null);
      Alert.alert('Success', 'Profile updated successfully!');
    } catch (error) {
      console.error('Save profile error:', error);
      Alert.alert('Error', error.message || 'Failed to update profile');
    } finally {
      setSaving(false);
      setUploading(false);
    }
  };

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
            try {
              await signOut();
            } catch (error) {
              console.error('Logout error:', error);
              Alert.alert('Error', 'Failed to logout. Please try again.');
            }
          },
        },
      ]
    );
  };

  if (loading) {
    return (
      <ScreenWrapper bg={theme.colors.background}>
        <Loading />
      </ScreenWrapper>
    );
  }

  return (
    <ScreenWrapper bg={theme.colors.background}>
      <View style={styles.container}>
        {/* Header */}
        <View style={styles.header}>
          <Text style={styles.title}>Profile</Text>
          <Pressable onPress={() => setEditModalVisible(true)}>
            <Icon name="Edit" size={24} color={theme.colors.text} />
          </Pressable>
        </View>

        <ScrollView contentContainerStyle={styles.scrollContent} showsVerticalScrollIndicator={false}>
          <View style={styles.content}>
            {/* Avatar */}
            <View style={styles.avatarContainer}>
              {profile?.avatar_url ? (
                <Image source={{ uri: profile.avatar_url }} style={styles.avatar} />
              ) : (
                <View style={styles.avatar}>
                  <Text style={styles.avatarText}>
                    {profile?.name?.charAt(0).toUpperCase() || 'U'}
                  </Text>
                </View>
              )}
            </View>

            {/* User Info */}
            <View style={styles.userInfo}>
              <Text style={styles.name}>{profile?.name || 'User Name'}</Text>
              <Text style={styles.email}>{user?.email}</Text>
              {profile?.bio && (
                <Text style={styles.bio}>{profile.bio}</Text>
              )}
            </View>

            {/* Stats - Placeholder */}
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

            {/* Placeholder for posts grid */}
            <View style={styles.postsSection}>
              <Text style={styles.sectionTitle}>My Posts</Text>
              <View style={styles.emptyPosts}>
                <Icon name="Image" size={48} color={theme.colors.textLight} />
                <Text style={styles.emptyText}>No posts yet</Text>
                <Text style={styles.emptySubtext}>
                  Your posts will appear here
                </Text>
              </View>
            </View>

            {/* Logout Button */}
            <Button
              title="Logout"
              onPress={handleLogout}
              hasShadow={false}
              buttonStyle={styles.logoutButton}
            />
          </View>
        </ScrollView>

        {/* Edit Profile Modal */}
        <Modal
          visible={editModalVisible}
          animationType="slide"
          transparent={true}
          onRequestClose={() => setEditModalVisible(false)}
        >
          <View style={styles.modalContainer}>
            <View style={styles.modalContent}>
              {/* Modal Header */}
              <View style={styles.modalHeader}>
                <Pressable onPress={() => setEditModalVisible(false)}>
                  <Icon name="X" size={24} color={theme.colors.text} />
                </Pressable>
                <Text style={styles.modalTitle}>Edit Profile</Text>
                <View style={{ width: 24 }} />
              </View>

              <ScrollView showsVerticalScrollIndicator={false}>
                {/* Avatar Selection */}
                <View style={styles.avatarSection}>
                  <Pressable onPress={handlePickImage} style={styles.avatarEditContainer}>
                    {avatarUri || profile?.avatar_url ? (
                      <Image
                        source={{ uri: avatarUri || profile.avatar_url }}
                        style={styles.avatarEdit}
                      />
                    ) : (
                      <View style={styles.avatarEdit}>
                        <Text style={styles.avatarText}>
                          {profile?.name?.charAt(0).toUpperCase() || 'U'}
                        </Text>
                      </View>
                    )}
                    <View style={styles.avatarEditIcon}>
                      <Icon name="Camera" size={20} color={theme.colors.textWhite} />
                    </View>
                  </Pressable>
                  <Text style={styles.avatarHint}>Tap to change photo</Text>
                </View>

                {/* Name Input */}
                <View style={styles.inputGroup}>
                  <Text style={styles.label}>Name</Text>
                  <TextInput
                    style={styles.input}
                    defaultValue={profile?.name || ''}
                    onChangeText={(value) => (nameRef.current = value)}
                    placeholder="Enter your name"
                    placeholderTextColor={theme.colors.textLight}
                  />
                </View>

                {/* Bio Input */}
                <View style={styles.inputGroup}>
                  <Text style={styles.label}>Bio</Text>
                  <TextInput
                    style={[styles.input, styles.bioInput]}
                    defaultValue={profile?.bio || ''}
                    onChangeText={(value) => (bioRef.current = value)}
                    placeholder="Tell us about yourself"
                    placeholderTextColor={theme.colors.textLight}
                    multiline
                    numberOfLines={4}
                    textAlignVertical="top"
                  />
                </View>

                {/* Save Button */}
                <Button
                  title={uploading ? 'Uploading...' : 'Save Changes'}
                  onPress={handleSaveProfile}
                  loading={saving || uploading}
                  buttonStyle={styles.saveButton}
                />
              </ScrollView>
            </View>
          </View>
        </Modal>
      </View>
    </ScreenWrapper>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: WP(5),
    paddingVertical: HP(2),
  },
  title: {
    fontSize: HP(3),
    fontWeight: theme.fonts.bold,
    color: theme.colors.text,
  },
  scrollContent: {
    flexGrow: 1,
    paddingBottom: HP(3),
  },
  content: {
    paddingHorizontal: WP(5),
    gap: HP(2.5),
  },
  avatarContainer: {
    alignItems: 'center',
    marginTop: HP(2),
  },
  avatar: {
    width: HP(14),
    height: HP(14),
    borderRadius: HP(7),
    backgroundColor: theme.colors.primary,
    justifyContent: 'center',
    alignItems: 'center',
    boxShadow: `0 4px 8px ${theme.colors.text}33`,
    elevation: 6,
  },
  avatarText: {
    fontSize: HP(5.5),
    fontWeight: theme.fonts.bold,
    color: theme.colors.textWhite,
  },
  userInfo: {
    alignItems: 'center',
    gap: HP(0.5),
  },
  name: {
    fontSize: HP(2.6),
    fontWeight: theme.fonts.bold,
    color: theme.colors.text,
  },
  email: {
    fontSize: HP(1.6),
    color: theme.colors.textLight,
  },
  bio: {
    fontSize: HP(1.8),
    color: theme.colors.text,
    textAlign: 'center',
    marginTop: HP(1),
    paddingHorizontal: WP(8),
  },
  statsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    backgroundColor: theme.colors.background,
    borderRadius: theme.radius.xl,
    padding: WP(4),
    borderWidth: 1,
    borderColor: theme.colors.border,
    marginTop: HP(1),
  },
  statItem: {
    alignItems: 'center',
    flex: 1,
  },
  statValue: {
    fontSize: HP(2.4),
    fontWeight: theme.fonts.bold,
    color: theme.colors.text,
  },
  statLabel: {
    fontSize: HP(1.4),
    color: theme.colors.textLight,
    marginTop: HP(0.3),
  },
  statDivider: {
    width: 1,
    backgroundColor: theme.colors.border,
  },
  postsSection: {
    marginTop: HP(2),
  },
  sectionTitle: {
    fontSize: HP(2),
    fontWeight: theme.fonts.bold,
    color: theme.colors.text,
    marginBottom: HP(1.5),
  },
  emptyPosts: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: HP(6),
    gap: HP(1),
  },
  emptyText: {
    fontSize: HP(1.8),
    fontWeight: theme.fonts.semibold,
    color: theme.colors.text,
  },
  emptySubtext: {
    fontSize: HP(1.4),
    color: theme.colors.textLight,
  },
  logoutButton: {
    backgroundColor: theme.colors.error || '#EF4444',
    marginTop: HP(2),
  },
  // Modal Styles
  modalContainer: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'flex-end',
  },
  modalContent: {
    backgroundColor: theme.colors.background,
    borderTopLeftRadius: theme.radius.doublexl,
    borderTopRightRadius: theme.radius.doublexl,
    paddingBottom: HP(4),
    maxHeight: HP(85),
  },
  modalHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: WP(5),
    borderBottomWidth: 1,
    borderBottomColor: theme.colors.border,
  },
  modalTitle: {
    fontSize: HP(2.2),
    fontWeight: theme.fonts.bold,
    color: theme.colors.text,
  },
  avatarSection: {
    alignItems: 'center',
    paddingVertical: HP(3),
  },
  avatarEditContainer: {
    position: 'relative',
  },
  avatarEdit: {
    width: HP(12),
    height: HP(12),
    borderRadius: HP(6),
    backgroundColor: theme.colors.primary,
    justifyContent: 'center',
    alignItems: 'center',
  },
  avatarEditIcon: {
    position: 'absolute',
    bottom: 0,
    right: 0,
    width: HP(4),
    height: HP(4),
    borderRadius: HP(2),
    backgroundColor: theme.colors.primary,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 3,
    borderColor: theme.colors.background,
  },
  avatarHint: {
    fontSize: HP(1.4),
    color: theme.colors.textLight,
    marginTop: HP(1),
  },
  inputGroup: {
    paddingHorizontal: WP(5),
    marginBottom: HP(2),
  },
  label: {
    fontSize: HP(1.6),
    fontWeight: theme.fonts.semibold,
    color: theme.colors.text,
    marginBottom: HP(0.8),
  },
  input: {
    borderWidth: 1,
    borderColor: theme.colors.border,
    borderRadius: theme.radius.xl,
    padding: WP(4),
    fontSize: HP(1.8),
    color: theme.colors.text,
    backgroundColor: theme.colors.background,
  },
  bioInput: {
    height: HP(12),
    paddingTop: HP(1.5),
  },
  saveButton: {
    marginHorizontal: WP(5),
    marginTop: HP(2),
  },
});

export default Profile;
