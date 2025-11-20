/**
 * Home Screen
 * Main feed screen with posts, likes, comments
 * Phase 3: Core Social Features
 */

import * as Haptics from 'expo-haptics';
import { LinearGradient } from 'expo-linear-gradient';
import { useRouter } from 'expo-router';
import * as Sharing from 'expo-sharing';
import { useEffect } from 'react';
import { Alert, FlatList, Pressable, RefreshControl, StyleSheet, Text, View } from 'react-native';
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withSpring,
} from 'react-native-reanimated';
import Icon from '../../assets/icons';
import EmptyState from '../../components/EmptyState';
import Loading from '../../components/Loading';
import PostCard from '../../components/PostCard';
import ScreenWrapper from '../../components/ScreenWrapper';
import SkeletonLoader from '../../components/SkeletonLoader';
import { theme } from '../../constants/theme';
import { useAuth } from '../../contexts/AuthContext';
import { HP, WP } from '../../helpers/common';
import { usePosts } from '../../hooks/usePosts';

const AnimatedPressable = Animated.createAnimatedComponent(Pressable);

const Home = () => {
  const router = useRouter();
  const { user } = useAuth();
  const { posts, loading, refreshing, hasMore, loadMore, refresh, toggleLike, sharePost, updatePost, deletePost } = usePosts();

  // FAB animation
  const fabScale = useSharedValue(1);

  useEffect(() => {
    // Entrance animation for FAB
    fabScale.value = withSpring(1, { damping: 12, stiffness: 100 });
  }, []);

  const handleLike = async (post) => {
    await Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
    const result = await toggleLike(post);
    if (!result.success) {
      Alert.alert('Error', 'Failed to like post. Please try again.');
    }
  };

  const handleComment = (post) => {
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
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
    if (loading) {
      return <SkeletonLoader variant="post" count={3} />;
    }

    return (
      <EmptyState
        icon="Image"
        title="No posts yet"
        message="Be the first to share something amazing with the community!"
        actionTitle="Create Post"
        onAction={handleCreatePost}
        variant="default"
      />
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

  const handleRefresh = async () => {
    await Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium);
    refresh();
  };

  const handleFabPress = async () => {
    await Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium);
    fabScale.value = withSpring(0.9, { damping: 10 });
    setTimeout(() => {
      fabScale.value = withSpring(1, { damping: 10 });
    }, 100);
    handleCreatePost();
  };

  const fabAnimatedStyle = useAnimatedStyle(() => ({
    transform: [{ scale: fabScale.value }],
  }));

  if (loading && posts.length === 0) {
    return (
      <ScreenWrapper bg={theme.colors.backgroundSecondary}>
        {renderHeader()}
        <SkeletonLoader variant="post" count={3} />
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
              onRefresh={handleRefresh}
              tintColor={theme.colors.primary}
              colors={[theme.colors.primary]}
              progressBackgroundColor={theme.colors.surface}
            />
          }
          onEndReached={loadMore}
          onEndReachedThreshold={0.5}
          showsVerticalScrollIndicator={false}
        />

        {/* Enhanced Floating Action Button */}
        <AnimatedPressable style={[styles.fab, fabAnimatedStyle]} onPress={handleFabPress}>
          <LinearGradient
            colors={theme.gradients.primary}
            style={styles.fabGradient}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 1 }}
          >
            <Icon name="Plus" size={28} color={theme.colors.onPrimary} strokeWidth={3} />
          </LinearGradient>
        </AnimatedPressable>
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
    paddingTop: HP(0.5),
    paddingBottom: HP(12),
  },
  footerLoader: {
    paddingVertical: HP(3),
    alignItems: 'center',
  },
  fab: {
    position: 'absolute',
    bottom: HP(10),
    right: WP(5),
    width: HP(7.5),
    height: HP(7.5),
    borderRadius: theme.radius.full,
    ...theme.shadows.level5,
  },
  fabGradient: {
    width: '100%',
    height: '100%',
    borderRadius: theme.radius.full,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default Home;
