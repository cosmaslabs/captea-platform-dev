/**
 * PostCard Component - World-Class Redesign
 * Premium card design inspired by Instagram, Twitter/X, and TikTok
 * Features: Smooth animations, optimized interactions, modern UI
 */

import * as Haptics from 'expo-haptics';
import { LinearGradient } from 'expo-linear-gradient';
import { useRouter } from 'expo-router';
import { useEffect, useState } from 'react';
import { Alert, Image, Pressable, StyleSheet, Text, View } from 'react-native';
import Animated, {
    useAnimatedStyle,
    useSharedValue,
    withSequence,
    withSpring,
    withTiming,
} from 'react-native-reanimated';
import Icon from '../assets/icons';
import { theme } from '../constants/theme';
import { HP, WP } from '../helpers/common';
import VideoPlayer from './VideoPlayer';

const AnimatedPressable = Animated.createAnimatedComponent(Pressable);

const PostCard = ({
  post,
  onLike,
  onComment,
  onShare,
  onEdit,
  onDelete,
  onPress,
  showActions = true,
  currentUserId,
  index = 0,
}) => {
  const router = useRouter();
  const [isLiked, setIsLiked] = useState(post.user_liked);
  const [likesCount, setLikesCount] = useState(post.likes_count || 0);
  const [commentsCount, setCommentsCount] = useState(post.comments_count || 0);

  const isOwner = currentUserId && post.user_id === currentUserId;

  // Animation values
  const cardScale = useSharedValue(1);
  const cardOpacity = useSharedValue(0);
  const likeScale = useSharedValue(1);
  const heartFill = useSharedValue(0);

  useEffect(() => {
    // Entrance animation with stagger
    setTimeout(() => {
      cardOpacity.value = withTiming(1, { duration: 400 });
      cardScale.value = withSpring(1, { damping: 18, stiffness: 100 });
    }, index * 50);
  }, []);

  useEffect(() => {
    setIsLiked(post.user_liked);
    setLikesCount(post.likes_count || 0);
    setCommentsCount(post.comments_count || 0);
  }, [post]);

  const handlePress = () => {
    cardScale.value = withSequence(
      withSpring(0.98, { damping: 10 }),
      withSpring(1, { damping: 10 })
    );
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);

    if (onPress) {
      onPress(post);
    } else {
      router.push(`/post/${post.id}`);
    }
  };

  const handleLike = async () => {
    await Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium);

    // Optimistic update
    const newLikedState = !isLiked;
    setIsLiked(newLikedState);
    setLikesCount(prev => newLikedState ? prev + 1 : Math.max(0, prev - 1));

    // Animate heart
    likeScale.value = withSequence(
      withSpring(1.5, { damping: 10, stiffness: 200 }),
      withSpring(1, { damping: 10, stiffness: 200 })
    );

    heartFill.value = newLikedState ? withTiming(1, { duration: 200 }) : withTiming(0, { duration: 200 });

    if (onLike) onLike(post);
  };

  const handleComment = () => {
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
    if (onComment) {
      onComment(post);
    } else {
      router.push(`/post/${post.id}`);
    }
  };

  const handleShare = () => {
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
    if (onShare) onShare(post);
  };

  const handleMoreOptions = () => {
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);

    const options = isOwner
      ? ['Edit', 'Delete', 'Cancel']
      : ['Report', 'Cancel'];

    Alert.alert(
      'Post Options',
      '',
      [
        ...(isOwner ? [
          { text: 'Edit', onPress: () => onEdit && onEdit(post) },
          { text: 'Delete', onPress: () => onDelete && onDelete(post.id), style: 'destructive' },
        ] : [
          { text: 'Report', onPress: () => Alert.alert('Report', 'Post reported') },
        ]),
        { text: 'Cancel', style: 'cancel' },
      ]
    );
  };

  const getTimeAgo = () => {
    const now = new Date();
    const postDate = new Date(post.created_at);
    const seconds = Math.floor((now - postDate) / 1000);

    if (seconds < 60) return 'Just now';
    if (seconds < 3600) return `${Math.floor(seconds / 60)}m`;
    if (seconds < 86400) return `${Math.floor(seconds / 3600)}h`;
    if (seconds < 604800) return `${Math.floor(seconds / 86400)}d`;
    return `${Math.floor(seconds / 604800)}w`;
  };

  const cardAnimatedStyle = useAnimatedStyle(() => ({
    opacity: cardOpacity.value,
    transform: [{ scale: cardScale.value }],
  }));

  const likeAnimatedStyle = useAnimatedStyle(() => ({
    transform: [{ scale: likeScale.value }],
  }));

  const userName = post.profiles?.name || post.user_name || 'Anonymous';
  const userAvatar = post.profiles?.avatar_url || post.avatar_url;

  return (
    <Animated.View style={[styles.container, cardAnimatedStyle]}>
      <Pressable onPress={handlePress} style={styles.card}>
        {/* Header */}
        <View style={styles.header}>
          <View style={styles.userInfo}>
            {/* Avatar */}
            <View style={styles.avatarContainer}>
              {userAvatar ? (
                <Image source={{ uri: userAvatar }} style={styles.avatar} />
              ) : (
                <LinearGradient
                  colors={theme.gradients.primary}
                  style={styles.avatarPlaceholder}
                >
                  <Text style={styles.avatarText}>
                    {userName.charAt(0).toUpperCase()}
                  </Text>
                </LinearGradient>
              )}
            </View>

            {/* User Details */}
            <View style={styles.userDetails}>
              <Text style={styles.userName} numberOfLines={1}>
                {userName}
              </Text>
              <Text style={styles.timeAgo}>{getTimeAgo()}</Text>
            </View>
          </View>

          {/* More Options */}
          <Pressable style={styles.moreButton} onPress={handleMoreOptions}>
            <Icon name="MoreHorizontal" size={20} color={theme.colors.textSecondary} strokeWidth={2} />
          </Pressable>
        </View>

        {/* Content */}
        {post.content && (
          <Text style={styles.content} numberOfLines={6}>
            {post.content}
          </Text>
        )}

        {/* Media */}
        {post.image_url && (
          <View style={styles.mediaContainer}>
            <Image
              source={{ uri: post.image_url }}
              style={styles.media}
              resizeMode="cover"
            />
          </View>
        )}

        {post.video_url && (
          <View style={styles.mediaContainer}>
            <VideoPlayer videoUrl={post.video_url} style={styles.media} />
          </View>
        )}

        {/* Actions Bar */}
        {showActions && (
          <View style={styles.actionsBar}>
            {/* Left Actions */}
            <View style={styles.leftActions}>
              {/* Like Button */}
              <AnimatedPressable style={[styles.actionButton, likeAnimatedStyle]} onPress={handleLike}>
                <Icon
                  name="Heart"
                  size={22}
                  color={isLiked ? theme.colors.error : theme.colors.textSecondary}
                  fill={isLiked ? theme.colors.error : 'transparent'}
                  strokeWidth={isLiked ? 0 : 2}
                />
                {likesCount > 0 && (
                  <Text style={[styles.actionCount, isLiked && styles.likedText]}>
                    {likesCount}
                  </Text>
                )}
              </AnimatedPressable>

              {/* Comment Button */}
              <Pressable style={styles.actionButton} onPress={handleComment}>
                <Icon name="MessageCircle" size={22} color={theme.colors.textSecondary} strokeWidth={2} />
                {commentsCount > 0 && (
                  <Text style={styles.actionCount}>{commentsCount}</Text>
                )}
              </Pressable>

              {/* Share Button */}
              <Pressable style={styles.actionButton} onPress={handleShare}>
                <Icon name="Send" size={20} color={theme.colors.textSecondary} strokeWidth={2} />
              </Pressable>
            </View>

            {/* Right Action - Bookmark (placeholder) */}
            <Pressable style={styles.actionButton}>
              <Icon name="Bookmark" size={20} color={theme.colors.textSecondary} strokeWidth={2} />
            </Pressable>
          </View>
        )}
      </Pressable>
    </Animated.View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginBottom: HP(0.5),
  },
  card: {
    backgroundColor: theme.colors.surface,
    paddingVertical: HP(2),
  },

  // Header Styles
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: WP(4),
    marginBottom: HP(1.5),
  },
  userInfo: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  avatarContainer: {
    marginRight: WP(3),
  },
  avatar: {
    width: HP(4.5),
    height: HP(4.5),
    borderRadius: HP(2.25),
    borderWidth: 2,
    borderColor: theme.colors.outlineVariant,
  },
  avatarPlaceholder: {
    width: HP(4.5),
    height: HP(4.5),
    borderRadius: HP(2.25),
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 2,
    borderColor: theme.colors.primary,
  },
  avatarText: {
    fontSize: HP(2),
    fontWeight: theme.fonts.bold,
    color: theme.colors.onPrimary,
  },
  userDetails: {
    flex: 1,
  },
  userName: {
    fontSize: HP(1.85),
    fontWeight: theme.fonts.bold,
    color: theme.colors.text,
    marginBottom: HP(0.2),
  },
  timeAgo: {
    fontSize: HP(1.5),
    fontWeight: theme.fonts.medium,
    color: theme.colors.textSecondary,
  },
  moreButton: {
    width: HP(4),
    height: HP(4),
    borderRadius: theme.radius.full,
    justifyContent: 'center',
    alignItems: 'center',
  },

  // Content Styles
  content: {
    fontSize: HP(1.9),
    fontWeight: theme.fonts.medium,
    color: theme.colors.text,
    lineHeight: HP(2.6),
    paddingHorizontal: WP(4),
    marginBottom: HP(1.5),
  },

  // Media Styles
  mediaContainer: {
    width: '100%',
    aspectRatio: 1,
    backgroundColor: theme.colors.backgroundSecondary,
    marginBottom: HP(1.5),
  },
  media: {
    width: '100%',
    height: '100%',
  },

  // Actions Bar
  actionsBar: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: WP(4),
    paddingTop: HP(0.5),
  },
  leftActions: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: WP(4),
  },
  actionButton: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: WP(1.5),
    paddingVertical: HP(0.5),
  },
  actionCount: {
    fontSize: HP(1.7),
    fontWeight: theme.fonts.semibold,
    color: theme.colors.textSecondary,
  },
  likedText: {
    color: theme.colors.error,
  },
});

export default PostCard;
