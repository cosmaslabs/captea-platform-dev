/**
 * PostCard Component
 * Reusable card to display posts in feed
 * Shows user info, content, images, likes, comments, and share options
 *
 * @param {object} post - Post object with user details
 * @param {function} onLike - Callback when like button pressed
 * @param {function} onComment - Callback when comment button pressed
 * @param {function} onShare - Callback when share button pressed
 * @param {function} onPress - Callback when card pressed (navigate to detail)
 * @param {boolean} showActions - Show action buttons (default: true)
 */

import { useRouter } from 'expo-router';
import { Image, Pressable, StyleSheet, Text, View } from 'react-native';
import Icon from '../assets/icons';
import { theme } from '../constants/theme';
import { HP, WP } from '../helpers/common';

const PostCard = ({
  post,
  onLike,
  onComment,
  onShare,
  onPress,
  showActions = true,
}) => {
  const router = useRouter();

  const handlePress = () => {
    if (onPress) {
      onPress(post);
    } else {
      router.push(`/post/${post.id}`);
    }
  };

  const handleLike = () => {
    if (onLike) onLike(post);
  };

  const handleComment = () => {
    if (onComment) {
      onComment(post);
    } else {
      router.push(`/post/${post.id}`);
    }
  };

  const handleShare = () => {
    if (onShare) onShare(post);
  };

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
        <Pressable style={styles.optionsButton}>
          <Icon
            name="ThreeDotsHorizontal"
            size={20}
            color={theme.colors.textLight}
          />
        </Pressable>
      </View>

      {/* Content */}
      <View style={styles.content}>
        <Text style={styles.contentText} numberOfLines={10}>
          {post.content}
        </Text>
      </View>

      {/* Media - Image */}
      {post.image_url && (
        <View style={styles.mediaContainer}>
          <Image
            source={{ uri: post.image_url }}
            style={styles.image}
            resizeMode="cover"
          />
        </View>
      )}

      {/* Media - Video Placeholder */}
      {post.video_url && (
        <View style={styles.mediaContainer}>
          <View style={styles.videoPlaceholder}>
            <Icon
              name="Video"
              size={48}
              color={theme.colors.textWhite}
              strokeWidth={1.5}
            />
            <Text style={styles.videoText}>Video</Text>
          </View>
        </View>
      )}

      {/* Actions */}
      {showActions && (
        <View style={styles.actions}>
          {/* Like */}
          <Pressable
            style={styles.actionButton}
            onPress={handleLike}
          >
            <Icon
              name="Heart"
              size={22}
              color={post.user_liked ? theme.colors.like : theme.colors.textLight}
              strokeWidth={post.user_liked ? 2.5 : 1.6}
            />
            <Text style={[
              styles.actionText,
              post.user_liked && styles.actionTextActive
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
    backgroundColor: theme.colors.background,
    borderRadius: theme.radius.lg,
    padding: WP(4),
    marginBottom: HP(1.5),
    borderWidth: 1,
    borderColor: theme.colors.border,
  },
  cardPressed: {
    opacity: 0.95,
    backgroundColor: theme.colors.backgroundSecondary,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: HP(1.5),
  },
  avatarContainer: {
    marginRight: WP(3),
  },
  avatar: {
    width: HP(5),
    height: HP(5),
    borderRadius: HP(2.5),
  },
  avatarPlaceholder: {
    width: HP(5),
    height: HP(5),
    borderRadius: HP(2.5),
    backgroundColor: theme.colors.primary,
    justifyContent: 'center',
    alignItems: 'center',
  },
  avatarText: {
    fontSize: HP(2.2),
    fontWeight: theme.fonts.bold,
    color: theme.colors.textWhite,
  },
  userInfo: {
    flex: 1,
  },
  userName: {
    fontSize: HP(1.9),
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
});

export default PostCard;
