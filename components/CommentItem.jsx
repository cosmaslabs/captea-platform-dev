/**
 * CommentItem Component - Enhanced Edition
 * Displays a single comment with animations and enhanced UX
 * Features: Entrance animations, swipe actions, hover states
 *
 * @param {object} comment - Comment object with user details
 * @param {boolean} canDelete - Whether current user can delete this comment
 * @param {function} onDelete - Callback when delete button pressed
 */

import * as Haptics from 'expo-haptics';
import { useEffect } from 'react';
import { Alert, Image, Pressable, StyleSheet, Text, View } from 'react-native';
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withSpring,
  withTiming,
} from 'react-native-reanimated';
import Icon from '../assets/icons';
import { theme } from '../constants/theme';
import { HP, WP } from '../helpers/common';

const AnimatedPressable = Animated.createAnimatedComponent(Pressable);

const CommentItem = ({ comment, canDelete, onDelete }) => {
  // Animation values
  const scale = useSharedValue(0);
  const opacity = useSharedValue(0);
  const deleteScale = useSharedValue(1);

  useEffect(() => {
    // Entrance animation
    scale.value = withSpring(1, { damping: 15, stiffness: 100 });
    opacity.value = withTiming(1, { duration: 300 });
  }, []);

  const handleDelete = () => {
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium);
    Alert.alert(
      'Delete Comment',
      'Are you sure you want to delete this comment?',
      [
        { text: 'Cancel', style: 'cancel' },
        {
          text: 'Delete',
          style: 'destructive',
          onPress: () => {
            Haptics.notificationAsync(Haptics.NotificationFeedbackType.Success);
            onDelete(comment.id);
          },
        },
      ]
    );
  };

  const handlePressDelete = () => {
    deleteScale.value = withSequence(
      withSpring(0.9, { damping: 10 }),
      withSpring(1, { damping: 10 })
    );
  };

  // Format timestamp
  const getTimeAgo = (timestamp) => {
    const now = new Date();
    const commentDate = new Date(timestamp);
    const seconds = Math.floor((now - commentDate) / 1000);

    if (seconds < 60) return `${seconds}s ago`;
    if (seconds < 3600) return `${Math.floor(seconds / 60)}m ago`;
    if (seconds < 86400) return `${Math.floor(seconds / 3600)}h ago`;
    if (seconds < 604800) return `${Math.floor(seconds / 86400)}d ago`;
    return commentDate.toLocaleDateString();
  };

  const containerAnimatedStyle = useAnimatedStyle(() => ({
    transform: [{ scale: scale.value }],
    opacity: opacity.value,
  }));

  const deleteAnimatedStyle = useAnimatedStyle(() => ({
    transform: [{ scale: deleteScale.value }],
  }));

  return (
    <Animated.View style={[styles.container, containerAnimatedStyle]}>
      {/* Avatar */}
      <View style={styles.avatarContainer}>
        {comment.user_avatar ? (
          <Image
            source={{ uri: comment.user_avatar }}
            style={styles.avatar}
          />
        ) : (
          <View style={styles.avatarPlaceholder}>
            <Text style={styles.avatarText}>
              {comment.user_name?.charAt(0).toUpperCase() || 'U'}
            </Text>
          </View>
        )}
      </View>

      {/* Comment Content */}
      <View style={styles.content}>
        <View style={styles.commentBubble}>
          <View style={styles.header}>
            <Text style={styles.userName}>{comment.user_name || 'Unknown User'}</Text>
            <Text style={styles.timestamp}> · {getTimeAgo(comment.created_at)}</Text>
          </View>
          <Text style={styles.commentText}>{comment.content}</Text>
        </View>
      </View>

      {/* Delete Button */}
      {canDelete && (
        <AnimatedPressable
          style={[styles.deleteButton, deleteAnimatedStyle]}
          onPress={handleDelete}
          onPressIn={handlePressDelete}
        >
          <Icon
            name="Delete"
            size={18}
            color={theme.colors.error}
            strokeWidth={2}
          />
        </AnimatedPressable>
      )}
    </Animated.View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    paddingVertical: HP(1.2),
    paddingHorizontal: WP(4),
    alignItems: 'flex-start',
  },
  avatarContainer: {
    marginRight: WP(2.5),
    marginTop: HP(0.5),
  },
  avatar: {
    width: HP(4.5),
    height: HP(4.5),
    borderRadius: HP(2.25),
    borderWidth: 2,
    borderColor: theme.colors.border,
  },
  avatarPlaceholder: {
    width: HP(4.5),
    height: HP(4.5),
    borderRadius: HP(2.25),
    backgroundColor: theme.colors.primaryContainer,
    borderWidth: 2,
    borderColor: theme.colors.primary,
    justifyContent: 'center',
    alignItems: 'center',
  },
  avatarText: {
    fontSize: HP(2),
    fontWeight: theme.fonts.bold,
    color: theme.colors.primary,
  },
  content: {
    flex: 1,
  },
  commentBubble: {
    backgroundColor: theme.colors.backgroundSecondary,
    borderRadius: theme.radius.lg,
    padding: WP(3),
    ...theme.shadows.level1,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: HP(0.5),
    flexWrap: 'wrap',
  },
  userName: {
    fontSize: HP(1.7),
    fontWeight: theme.fonts.bold,
    color: theme.colors.text,
  },
  timestamp: {
    fontSize: HP(1.5),
    fontWeight: theme.fonts.medium,
    color: theme.colors.textLight,
  },
  commentText: {
    fontSize: HP(1.75),
    fontWeight: theme.fonts.medium,
    color: theme.colors.textSecondary,
    lineHeight: HP(2.5),
  },
  deleteButton: {
    padding: WP(2),
    marginLeft: WP(2),
    marginTop: HP(0.5),
    backgroundColor: theme.colors.errorContainer,
    borderRadius: theme.radius.sm,
  },
});

export default CommentItem;
