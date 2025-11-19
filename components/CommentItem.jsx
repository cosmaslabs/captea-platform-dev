/**
 * CommentItem Component
 * Displays a single comment with user info and delete option
 *
 * @param {object} comment - Comment object with user details
 * @param {boolean} canDelete - Whether current user can delete this comment
 * @param {function} onDelete - Callback when delete button pressed
 */

import { Alert, Image, Pressable, StyleSheet, Text, View } from 'react-native';
import Icon from '../assets/icons';
import { theme } from '../constants/theme';
import { HP, WP } from '../helpers/common';

const CommentItem = ({ comment, canDelete, onDelete }) => {
  const handleDelete = () => {
    Alert.alert(
      'Delete Comment',
      'Are you sure you want to delete this comment?',
      [
        { text: 'Cancel', style: 'cancel' },
        {
          text: 'Delete',
          style: 'destructive',
          onPress: () => onDelete(comment.id),
        },
      ]
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

  return (
    <View style={styles.container}>
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
        <View style={styles.header}>
          <Text style={styles.userName}>{comment.user_name || 'Unknown User'}</Text>
          <Text style={styles.timestamp}>{getTimeAgo(comment.created_at)}</Text>
        </View>
        <Text style={styles.commentText}>{comment.content}</Text>
      </View>

      {/* Delete Button */}
      {canDelete && (
        <Pressable style={styles.deleteButton} onPress={handleDelete}>
          <Icon
            name="Delete"
            size={18}
            color={theme.colors.error}
            strokeWidth={1.6}
          />
        </Pressable>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    paddingVertical: HP(1.5),
    paddingHorizontal: WP(4),
  },
  avatarContainer: {
    marginRight: WP(3),
  },
  avatar: {
    width: HP(4),
    height: HP(4),
    borderRadius: HP(2),
  },
  avatarPlaceholder: {
    width: HP(4),
    height: HP(4),
    borderRadius: HP(2),
    backgroundColor: theme.colors.primary,
    justifyContent: 'center',
    alignItems: 'center',
  },
  avatarText: {
    fontSize: HP(1.8),
    fontWeight: theme.fonts.bold,
    color: theme.colors.textWhite,
  },
  content: {
    flex: 1,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: HP(0.3),
  },
  userName: {
    fontSize: HP(1.7),
    fontWeight: theme.fonts.semibold,
    color: theme.colors.text,
    marginRight: WP(2),
  },
  timestamp: {
    fontSize: HP(1.4),
    fontWeight: theme.fonts.medium,
    color: theme.colors.textLight,
  },
  commentText: {
    fontSize: HP(1.8),
    fontWeight: theme.fonts.medium,
    color: theme.colors.text,
    lineHeight: HP(2.5),
  },
  deleteButton: {
    padding: WP(2),
    justifyContent: 'center',
  },
});

export default CommentItem;
