/**
 * PostCard Component
 * Reusable card to display posts in feed
 * Shows user info, content, images, likes, comments, and share options
 *
 * @param {object} post - Post object with user details
 * @param {function} onLike - Callback when like button pressed
 * @param {function} onComment - Callback when comment button pressed
 * @param {function} onShare - Callback when share button pressed
 * @param {function} onEdit - Callback when edit button pressed
 * @param {function} onDelete - Callback when delete button pressed
 * @param {function} onPress - Callback when card pressed (navigate to detail)
 * @param {boolean} showActions - Show action buttons (default: true)
 * @param {string} currentUserId - Current user ID to check ownership
 */

import * as Haptics from 'expo-haptics';
import { useRouter } from 'expo-router';
import { useEffect, useState } from 'react';
import { Alert, Image, Modal, Pressable, StyleSheet, Text, View } from 'react-native';
import Animated, {
    useAnimatedStyle,
    useSharedValue,
    withSequence,
    withSpring
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
}) => {
  const router = useRouter();
  const [menuVisible, setMenuVisible] = useState(false);
  const [isLiked, setIsLiked] = useState(post.user_liked);

  const isOwner = currentUserId && post.user_id === currentUserId;

  // Animation values
  const scale = useSharedValue(1);
  const likeScale = useSharedValue(1);

  useEffect(() => {
    setIsLiked(post.user_liked);
  }, [post.user_liked]);

  const handlePress = () => {
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
    if (onPress) {
      onPress(post);
    } else {
      router.push(`/post/${post.id}`);
    }
  };

  const handleLike = async () => {
    await Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium);

    // Animate heart
    likeScale.value = withSequence(
      withSpring(1.3, { damping: 10, stiffness: 200 }),
      withSpring(1, { damping: 10, stiffness: 200 })
    );

    setIsLiked(!isLiked);
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
    if (onShare) onShare(post);
  };

  const handleEdit = () => {
    setMenuVisible(false);
    if (onEdit) onEdit(post);
  };

  const handleDelete = () => {
    setMenuVisible(false);
    Alert.alert(
      'Delete Post',
      'Are you sure you want to delete this post? This action cannot be undone.',
      [
        { text: 'Cancel', style: 'cancel' },
        {
          text: 'Delete',
          style: 'destructive',
          onPress: () => {
            if (onDelete) onDelete(post.id);
          },
        },
      ]
    );
  };

  const toggleMenu = () => {
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
    setMenuVisible(!menuVisible);
  };

  // Animated styles
  const likeAnimatedStyle = useAnimatedStyle(() => ({
    transform: [{ scale: likeScale.value }],
  }));

  // Format timestamp
  const getTimeAgo = (timestamp) => {
    const now = new Date();
    const postDate = new Date(timestamp);
    const seconds = Math.floor((now - postDate) / 1000);

    if (seconds < 60) return `${seconds}s ago`;
    if (seconds < 3600) return `${Math.floor(seconds / 60)}m ago`;
    if (seconds < 86400) return `${Math.floor(seconds / 3600)}h ago`;
    if (seconds < 604800) return `${Math.floor(seconds / 86400)}d ago`;
    return postDate.toLocaleDateString();
  };

  return (
    <Pressable
      style={({ pressed }) => [styles.card, pressed && styles.cardPressed]}
      onPress={handlePress}
    >
      {/* Header - User Info */}
      <View style={styles.header}>
        {/* Avatar */}
        <View style={styles.avatarContainer}>
          {post.user_avatar ? (
            <Image
              source={{ uri: post.user_avatar }}
              style={styles.avatar}
            />
          ) : (
            <View style={styles.avatarPlaceholder}>
              <Text style={styles.avatarText}>
                {post.user_name?.charAt(0).toUpperCase() || 'U'}
              </Text>
            </View>
          )}
        </View>

        {/* User Info */}
        <View style={styles.userInfo}>
          <Text style={styles.userName}>{post.user_name || 'Unknown User'}</Text>
          <Text style={styles.timestamp}>{getTimeAgo(post.created_at)}</Text>
        </View>

        {/* Options Menu */}
        {isOwner && (
          <Pressable style={styles.optionsButton} onPress={toggleMenu}>
            <Icon
              name="ThreeDotsHorizontal"
              size={20}
              color={theme.colors.textLight}
            />
          </Pressable>
        )}
      </View>

      {/* Options Menu Modal */}
      {isOwner && (
        <Modal
          visible={menuVisible}
          transparent={true}
          animationType="fade"
          onRequestClose={() => setMenuVisible(false)}
        >
          <Pressable
            style={styles.modalOverlay}
            onPress={() => setMenuVisible(false)}
          >
            <View style={styles.menuContainer}>
              <Pressable style={styles.menuItem} onPress={handleEdit}>
                <Icon name="Edit" size={22} color={theme.colors.text} strokeWidth={1.6} />
                <Text style={styles.menuText}>Edit Post</Text>
              </Pressable>
              <View style={styles.menuDivider} />
              <Pressable style={styles.menuItem} onPress={handleDelete}>
                <Icon name="Delete" size={22} color={theme.colors.error} strokeWidth={1.6} />
                <Text style={[styles.menuText, styles.menuTextDanger]}>Delete Post</Text>
              </Pressable>
            </View>
          </Pressable>
        </Modal>
      )}

      {/* Content */}
      <View style={styles.content}>
        <Text style={styles.contentText} numberOfLines={10}>
          {post.content}
        </Text>
      </View>

      {/* Media - Image */}
      {post.image_url && !post.video_url && (
        <View style={styles.mediaContainer}>
          <Image
            source={{ uri: post.image_url }}
            style={styles.image}
            resizeMode="cover"
          />
        </View>
      )}

      {/* Media - Video */}
      {post.video_url && (
        <View style={styles.mediaContainer}>
          <VideoPlayer videoUri={post.video_url} />
        </View>
      )}

      {/* Actions */}
      {showActions && (
        <View style={styles.actions}>
          {/* Like with Animation */}
          <Pressable
            style={styles.actionButton}
            onPress={handleLike}
          >
            <Animated.View style={likeAnimatedStyle}>
              <Icon
                name="Heart"
                size={22}
                color={isLiked ? theme.colors.likeActive : theme.colors.textSecondary}
                strokeWidth={isLiked ? 2.5 : 1.8}
                fill={isLiked ? theme.colors.likeActive : 'transparent'}
              />
            </Animated.View>
            <Text style={[
              styles.actionText,
              isLiked && styles.actionTextActive
            ]}>
              {post.likes_count || 0}
            </Text>
          </Pressable>

          {/* Comment */}
          <Pressable
            style={styles.actionButton}
            onPress={handleComment}
          >
            <Icon
              name="Comment"
              size={22}
              color={theme.colors.textLight}
              strokeWidth={1.6}
            />
            <Text style={styles.actionText}>
              {post.comments_count || 0}
            </Text>
          </Pressable>

          {/* Share */}
          <Pressable
            style={styles.actionButton}
            onPress={handleShare}
          >
            <Icon
              name="Share"
              size={22}
              color={theme.colors.textLight}
              strokeWidth={1.6}
            />
            <Text style={styles.actionText}>
              {post.shares_count || 0}
            </Text>
          </Pressable>
        </View>
      )}
    </Pressable>
  );
};

const styles = StyleSheet.create({
  card: {
    backgroundColor: theme.colors.surface,
    borderRadius: theme.radius.large,
    paddingVertical: HP(2),
    marginBottom: HP(1.5),
    marginHorizontal: WP(4),
    ...theme.shadows.level1,
  },
  cardPressed: {
    opacity: 0.96,
    backgroundColor: theme.colors.surfaceVariant,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: WP(4),
    marginBottom: HP(1.2),
  },
  avatarContainer: {
    marginRight: WP(3),
  },
  avatar: {
    width: HP(5),
    height: HP(5),
    borderRadius: theme.radius.full,
    borderWidth: 2,
    borderColor: theme.colors.primaryContainer,
  },
  avatarPlaceholder: {
    width: HP(5),
    height: HP(5),
    borderRadius: theme.radius.full,
    backgroundColor: theme.colors.primaryContainer,
    justifyContent: 'center',
    alignItems: 'center',
  },
  avatarText: {
    ...theme.typography.titleMedium,
    color: theme.colors.primary,
  },
  userInfo: {
    flex: 1,
  },
  userName: {
    ...theme.typography.titleMedium,
    fontWeight: theme.fonts.semibold,
    color: theme.colors.text,
  },
  timestamp: {
    fontSize: HP(1.5),
    fontWeight: theme.fonts.medium,
    color: theme.colors.textLight,
    marginTop: HP(0.2),
  },
  optionsButton: {
    padding: WP(2),
  },
  content: {
    marginBottom: HP(1.5),
  },
  contentText: {
    fontSize: HP(1.9),
    fontWeight: theme.fonts.medium,
    color: theme.colors.text,
    lineHeight: HP(2.8),
  },
  mediaContainer: {
    marginTop: HP(1),
    marginBottom: HP(1.5),
    borderRadius: theme.radius.md,
    overflow: 'hidden',
  },
  image: {
    width: '100%',
    height: HP(30),
    backgroundColor: theme.colors.backgroundSecondary,
  },
  videoPlaceholder: {
    width: '100%',
    height: HP(30),
    backgroundColor: theme.colors.textDark,
    justifyContent: 'center',
    alignItems: 'center',
  },
  videoText: {
    fontSize: HP(1.8),
    fontWeight: theme.fonts.semibold,
    color: theme.colors.textWhite,
    marginTop: HP(1),
  },
  actions: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingTop: HP(1),
    borderTopWidth: 1,
    borderTopColor: theme.colors.border,
    gap: WP(6),
  },
  actionButton: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: WP(1.5),
  },
  actionText: {
    fontSize: HP(1.7),
    fontWeight: theme.fonts.semibold,
    color: theme.colors.textLight,
  },
  actionTextActive: {
    color: theme.colors.like,
  },
  // Menu Modal Styles
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  menuContainer: {
    backgroundColor: theme.colors.background,
    borderRadius: theme.radius.xl,
    minWidth: WP(50),
    paddingVertical: HP(1),
    elevation: 5,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
  },
  menuItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: HP(1.5),
    paddingHorizontal: WP(4),
    gap: WP(3),
  },
  menuText: {
    fontSize: HP(1.8),
    fontWeight: theme.fonts.medium,
    color: theme.colors.text,
  },
  menuTextDanger: {
    color: theme.colors.error,
  },
  menuDivider: {
    height: 1,
    backgroundColor: theme.colors.border,
    marginHorizontal: WP(4),
  },
});

export default PostCard;
