/**
 * Home Screen - World-Class Redesign
 * Premium feed inspired by Instagram, Twitter/X, and TikTok
 * Features: Sticky header, infinite scroll, smooth animations, optimized UX
 */

import { BlurView } from 'expo-blur';
import * as Haptics from 'expo-haptics';
import { LinearGradient } from 'expo-linear-gradient';
import { useRouter } from 'expo-router';
import * as Sharing from 'expo-sharing';
import { useEffect, useRef, useState } from 'react';
import { Alert, FlatList, Pressable, RefreshControl, StatusBar, StyleSheet, Text, View } from 'react-native';
import Animated, {
  Extrapolate,
  interpolate,
  useAnimatedScrollHandler,
  useAnimatedStyle,
  useSharedValue,
  withSpring,
  withTiming,
} from 'react-native-reanimated';
import Icon from '../../assets/icons';
import EmptyState from '../../components/EmptyState';
import Loading from '../../components/Loading';
import PostCard from '../../components/PostCardNew';
import ScreenWrapper from '../../components/ScreenWrapper';
import SkeletonLoader from '../../components/SkeletonLoader';
import { theme } from '../../constants/theme';
import { useAuth } from '../../contexts/AuthContext';
import { HP, WP } from '../../helpers/common';
import { usePosts } from '../../hooks/usePosts';

const AnimatedPressable = Animated.createAnimatedComponent(Pressable);
const AnimatedFlatList = Animated.createAnimatedComponent(FlatList);

const Home = () => {
  const router = useRouter();
  const { user } = useAuth();
  const { posts, loading, refreshing, hasMore, loadMore, refresh, toggleLike, sharePost, updatePost, deletePost } = usePosts();

  const flatListRef = useRef(null);
  const [showScrollTop, setShowScrollTop] = useState(false);

  // Animation values
  const scrollY = useSharedValue(0);
  const headerOpacity = useSharedValue(1);
  const fabScale = useSharedValue(1);
  const scrollTopOpacity = useSharedValue(0);

  useEffect(() => {
    // Entrance animation
    fabScale.value = withSpring(1, { damping: 12, stiffness: 100 });
  }, []);

  // Scroll handler for parallax and animations
  const scrollHandler = useAnimatedScrollHandler({
    onScroll: (event) => {
      scrollY.value = event.contentOffset.y;

      // Show/hide scroll to top button
      if (event.contentOffset.y > 500) {
        scrollTopOpacity.value = withTiming(1, { duration: 200 });
      } else {
        scrollTopOpacity.value = withTiming(0, { duration: 200 });
      }

      // Header opacity effect
      headerOpacity.value = interpolate(
        event.contentOffset.y,
        [0, 100],
        [1, 0.95],
        Extrapolate.CLAMP
      );
    },
  });

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

  const handleScrollToTop = () => {
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
    flatListRef.current?.scrollToOffset({ offset: 0, animated: true });
  };

  // Header animated style
  const headerAnimatedStyle = useAnimatedStyle(() => ({
    opacity: headerOpacity.value,
  }));

  // Scroll to top button style
  const scrollTopStyle = useAnimatedStyle(() => ({
    opacity: scrollTopOpacity.value,
    transform: [
      {
        scale: interpolate(
          scrollTopOpacity.value,
          [0, 1],
          [0.8, 1],
          Extrapolate.CLAMP
        ),
      },
    ],
  }));

  // FAB animated style
  const fabAnimatedStyle = useAnimatedStyle(() => ({
    transform: [{ scale: fabScale.value }],
  }));

  const renderHeader = () => (
    <Animated.View style={[styles.stickyHeaderContainer, headerAnimatedStyle]}>
      <BlurView intensity={95} tint="light" style={styles.headerBlur}>
        <View style={styles.header}>
          {/* Logo Section */}
          <Pressable style={styles.logoContainer} onPress={handleScrollToTop}>
            <LinearGradient
              colors={theme.gradients.primary}
              start={{ x: 0, y: 0 }}
              end={{ x: 1, y: 1 }}
              style={styles.logoGradient}
            >
              <Text style={styles.logo}>C</Text>
            </LinearGradient>
            <Text style={styles.logoText}>Captea</Text>
          </Pressable>

          {/* Action Buttons */}
          <View style={styles.headerActions}>
            <Pressable
              style={styles.headerButton}
              onPress={() => {
                Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
                router.push('/search');
              }}
            >
              <Icon name="Search" size={22} color={theme.colors.text} strokeWidth={2} />
            </Pressable>

            <Pressable
              style={styles.headerButton}
              onPress={() => {
                Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
                router.push('/notifications');
              }}
            >
              <Icon name="Heart" size={22} color={theme.colors.text} strokeWidth={2} />
            </Pressable>

            <Pressable
              style={[styles.headerButton, styles.messagesButton]}
              onPress={() => {
                Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
                router.push('/messages');
              }}
            >
              <Icon name="MessageCircle" size={22} color={theme.colors.text} strokeWidth={2} />
            </Pressable>
          </View>
        </View>
      </BlurView>
    </Animated.View>
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
      <StatusBar barStyle="dark-content" backgroundColor={theme.colors.surface} />
      <View style={styles.container}>
        {renderHeader()}

        <AnimatedFlatList
          ref={flatListRef}
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
          onEndReachedThreshold={0.3}
          showsVerticalScrollIndicator={false}
          onScroll={scrollHandler}
          scrollEventThrottle={16}
          removeClippedSubviews={true}
          maxToRenderPerBatch={5}
          windowSize={10}
          initialNumToRender={5}
          updateCellsBatchingPeriod={50}
        />

        {/* Scroll to Top Button */}
        <AnimatedPressable
          style={[styles.scrollTopButton, scrollTopStyle]}
          onPress={handleScrollToTop}
          pointerEvents={scrollTopOpacity.value > 0 ? 'auto' : 'none'}
        >
          <BlurView intensity={90} tint="light" style={styles.scrollTopBlur}>
            <Icon name="ChevronUp" size={24} color={theme.colors.primary} strokeWidth={2.5} />
          </BlurView>
        </AnimatedPressable>

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

  // Sticky Header Styles (Instagram-inspired)
  stickyHeaderContainer: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    zIndex: 1000,
  },
  headerBlur: {
    overflow: 'hidden',
    borderBottomWidth: 0.5,
    borderBottomColor: theme.colors.outlineVariant,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: WP(4),
    paddingVertical: HP(1.5),
    backgroundColor: 'transparent',
  },
  logoContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: WP(2.5),
  },
  logoGradient: {
    width: HP(4),
    height: HP(4),
    borderRadius: theme.radius.medium,
    justifyContent: 'center',
    alignItems: 'center',
    ...theme.shadows.level2,
  },
  logo: {
    fontSize: HP(2.2),
    fontWeight: theme.fonts.extrabold,
    color: theme.colors.onPrimary,
    letterSpacing: -0.5,
  },
  logoText: {
    fontSize: HP(2.5),
    fontWeight: theme.fonts.extrabold,
    color: theme.colors.text,
    letterSpacing: -0.5,
  },
  headerActions: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: WP(2.5),
  },
  headerButton: {
    width: HP(4.2),
    height: HP(4.2),
    borderRadius: theme.radius.full,
    backgroundColor: theme.colors.backgroundSecondary,
    justifyContent: 'center',
    alignItems: 'center',
    ...theme.shadows.level1,
  },
  messagesButton: {
    backgroundColor: theme.colors.primaryContainer,
  },

  // List Styles
  listContent: {
    paddingTop: HP(8), // Space for sticky header
    paddingBottom: HP(15),
    paddingHorizontal: 0,
  },

  // Footer Loader
  footerLoader: {
    paddingVertical: HP(2.5),
    alignItems: 'center',
  },

  // Scroll to Top Button (Twitter-inspired)
  scrollTopButton: {
    position: 'absolute',
    top: HP(10),
    right: WP(5),
    width: HP(5),
    height: HP(5),
    borderRadius: theme.radius.full,
    overflow: 'hidden',
    ...theme.shadows.level3,
  },
  scrollTopBlur: {
    width: '100%',
    height: '100%',
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: theme.colors.outlineVariant,
    borderRadius: theme.radius.full,
  },

  // FAB (TikTok-inspired)
  fab: {
    position: 'absolute',
    bottom: HP(12),
    right: WP(5),
    width: HP(7),
    height: HP(7),
    borderRadius: theme.radius.full,
    ...theme.shadows.level4,
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
