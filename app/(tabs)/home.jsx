/**
 * Home Screen
 * Main feed screen with posts, likes, comments
 * Phase 3: Core Social Features
 */

import { useRouter } from 'expo-router';
import * as Sharing from 'expo-sharing';
import { Alert, FlatList, Pressable, RefreshControl, StyleSheet, Text, View } from 'react-native';
import Icon from '../../assets/icons';
import Loading from '../../components/Loading';
import PostCard from '../../components/PostCard';
import ScreenWrapper from '../../components/ScreenWrapper';
import { theme } from '../../constants/theme';
import { useAuth } from '../../contexts/AuthContext';
import { HP, WP } from '../../helpers/common';
import { usePosts } from '../../hooks/usePosts';

const Home = () => {
  const router = useRouter();
  const { user } = useAuth();
  const { posts, loading, refreshing, hasMore, loadMore, refresh, toggleLike, sharePost, updatePost, deletePost } = usePosts();

  const handleLike = async (post) => {
    const result = await toggleLike(post);
    if (!result.success) {
      Alert.alert('Error', 'Failed to like post. Please try again.');
    }
  };

  const handleComment = (post) => {
    router.push(`/post/${post.id}`);
  };

  const handleShare = async (post) => {
    try {
      // Check if sharing is available
      const isAvailable = await Sharing.isAvailableAsync();

      if (!isAvailable) {
        Alert.alert('Sharing Not Available', 'Sharing is not available on this device');
        return;
      }

      // Prepare share content
      const shareContent = post.content || 'Check out this post on Captea!';
      const userName = post.user_name || 'Someone';
      const shareText = `${userName} posted:\n\n${shareContent}\n\nView on Captea`;

      // Create a simple share message (for demo purposes)
      // In production, you'd share a deep link or actual file
      Alert.alert(
        'Share Post',
        shareText,
        [
          {
            text: 'Cancel',
            style: 'cancel',
          },
          {
            text: 'Share',
            onPress: async () => {
              // Increment share count
              const result = await sharePost(post.id);

              if (result.success) {
                Alert.alert('Success', 'Post shared successfully!');
              } else {
                Alert.alert('Info', 'Share count updated');
              }
            },
          },
        ]
      );
    } catch (error) {
      console.error('Share error:', error);
      Alert.alert('Error', 'Failed to share post. Please try again.');
    }
  };

  const handleEdit = (post) => {
    Alert.prompt(
      'Edit Post',
      'Update your post content',
      [
        { text: 'Cancel', style: 'cancel' },
        {
          text: 'Save',
          onPress: async (newContent) => {
            if (!newContent || !newContent.trim()) {
              Alert.alert('Error', 'Post content cannot be empty');
              return;
            }

            const result = await updatePost(post.id, newContent.trim());
            if (result.success) {
              Alert.alert('Success', 'Post updated successfully!');
            } else {
              Alert.alert('Error', result.error || 'Failed to update post');
            }
          },
        },
      ],
      'plain-text',
      post.content
    );
  };

  const handleDelete = async (postId) => {
    const result = await deletePost(postId);
    if (result.success) {
      Alert.alert('Success', 'Post deleted successfully');
    } else {
      Alert.alert('Error', result.error || 'Failed to delete post');
    }
  };

  const handleCreatePost = () => {
    router.push('/create');
  };

  const renderHeader = () => (
    <View style={styles.headerContainer}>
      <View style={styles.header}>
        <View style={styles.logoContainer}>
          <Text style={styles.logo}>Captea</Text>
          <View style={styles.logoBadge}>
            <Icon name="Heart" size={12} color={theme.colors.onPrimary} fill={theme.colors.primary} strokeWidth={0} />
          </View>
        </View>
        <View style={styles.headerActions}>
          <Pressable
            style={styles.headerButton}
            onPress={() => {/* Search functionality */}}
          >
            <Icon name="Search" size={22} color={theme.colors.textSecondary} strokeWidth={2} />
          </Pressable>
          <Pressable
            style={styles.headerButton}
            onPress={() => router.push('/notifications')}
          >
            <Icon name="Bell" size={22} color={theme.colors.textSecondary} strokeWidth={2} />
          </Pressable>
        </View>
      </View>
    </View>
  );

  const renderPost = ({ item }) => (
    <PostCard
      post={item}
      onLike={handleLike}
      onComment={handleComment}
      onShare={handleShare}
      onEdit={handleEdit}
      onDelete={handleDelete}
      currentUserId={user?.id}
    />
  );

  const renderEmpty = () => {
    if (loading) return null;

    return (
      <View style={styles.emptyContainer}>
        <Icon name="Image" size={64} color={theme.colors.textLight} />
        <Text style={styles.emptyTitle}>No posts yet</Text>
        <Text style={styles.emptyText}>
          Be the first to share something!
        </Text>
        <Pressable style={styles.emptyButton} onPress={handleCreatePost}>
          <Text style={styles.emptyButtonText}>Create Post</Text>
        </Pressable>
      </View>
    );
  };

  const renderFooter = () => {
    if (!loading || posts.length === 0) return null;

    return (
      <View style={styles.footerLoader}>
        <Loading size="small" />
      </View>
    );
  };

  if (loading && posts.length === 0) {
    return (
      <ScreenWrapper bg={theme.colors.background}>
        <Loading />
      </ScreenWrapper>
    );
  }

  return (
    <ScreenWrapper bg={theme.colors.backgroundSecondary}>
      <View style={styles.container}>
        {renderHeader()}

        <FlatList
          data={posts}
          renderItem={renderPost}
          keyExtractor={(item) => item.id}
          contentContainerStyle={styles.listContent}
          ListEmptyComponent={renderEmpty}
          ListFooterComponent={renderFooter}
          refreshControl={
            <RefreshControl
              refreshing={refreshing}
              onRefresh={refresh}
              tintColor={theme.colors.primary}
            />
          }
          onEndReached={loadMore}
          onEndReachedThreshold={0.5}
          showsVerticalScrollIndicator={false}
        />

        {/* Floating Create Button */}
        <Pressable style={styles.fab} onPress={handleCreatePost}>
          <Icon name="Plus" size={28} color={theme.colors.textWhite} strokeWidth={2.5} />
        </Pressable>
      </View>
    </ScreenWrapper>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: theme.colors.backgroundSecondary,
  },
  headerContainer: {
    backgroundColor: theme.colors.surface,
    ...theme.shadows.level1,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: WP(5),
    paddingVertical: HP(1.8),
  },
  logoContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: WP(2),
  },
  logo: {
    fontSize: HP(3.2),
    fontWeight: theme.fonts.extrabold,
    color: theme.colors.primary,
    letterSpacing: -0.5,
  },
  logoBadge: {
    width: HP(2.2),
    height: HP(2.2),
    borderRadius: theme.radius.full,
    backgroundColor: theme.colors.primaryContainer,
    justifyContent: 'center',
    alignItems: 'center',
  },
  headerActions: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: WP(2),
  },
  headerButton: {
    width: HP(4.5),
    height: HP(4.5),
    borderRadius: theme.radius.medium,
    backgroundColor: theme.colors.surfaceVariant,
    justifyContent: 'center',
    alignItems: 'center',
  },
  listContent: {
    paddingTop: HP(1.5),
    paddingBottom: HP(12),
    gap: HP(1.5),
  },
  emptyContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: HP(12),
    paddingHorizontal: WP(10),
  },
  emptyTitle: {
    fontSize: HP(2.4),
    fontWeight: theme.fonts.bold,
    color: theme.colors.text,
    marginTop: HP(2),
    textAlign: 'center',
  },
  emptyText: {
    ...theme.typography.bodyMedium,
    color: theme.colors.textSecondary,
    textAlign: 'center',
    marginTop: HP(1),
  },
  emptyButton: {
    marginTop: HP(3),
    paddingHorizontal: WP(10),
    paddingVertical: HP(1.8),
    backgroundColor: theme.colors.primary,
    borderRadius: theme.radius.full,
    ...theme.shadows.level2,
  },
  emptyButtonText: {
    ...theme.typography.labelLarge,
    color: theme.colors.onPrimary,
  },
  footerLoader: {
    paddingVertical: HP(3),
    alignItems: 'center',
  },
  fab: {
    position: 'absolute',
    bottom: HP(10),
    right: WP(5),
    width: HP(7),
    height: HP(7),
    borderRadius: theme.radius.full,
    backgroundColor: theme.colors.primary,
    justifyContent: 'center',
    alignItems: 'center',
    ...theme.shadows.level4,
  },
});

export default Home;
