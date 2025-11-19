/**
 * Post Detail Modal
 * Shows full post with comments section
 * Allows users to view and add comments in real-time
 */

import { useLocalSearchParams, useRouter } from 'expo-router';
import { useRef, useState } from 'react';
import {
    Alert,
    KeyboardAvoidingView,
    Platform,
    Pressable,
    ScrollView,
    StyleSheet,
    Text,
    TextInput,
    View,
} from 'react-native';
import Icon from '../../assets/icons';
import CommentItem from '../../components/CommentItem';
import Loading from '../../components/Loading';
import PostCard from '../../components/PostCard';
import ScreenWrapper from '../../components/ScreenWrapper';
import { theme } from '../../constants/theme';
import { useAuth } from '../../contexts/AuthContext';
import { HP, WP } from '../../helpers/common';
import { useComments } from '../../hooks/useComments';
import { usePosts } from '../../hooks/usePosts';

const PostDetail = () => {
  const { id } = useLocalSearchParams();
  const router = useRouter();
  const { user } = useAuth();
  const { posts, toggleLike } = usePosts();
  const { comments, loading, submitting, createComment, deleteComment } = useComments(id);

  const [commentText, setCommentText] = useState('');
  const inputRef = useRef(null);

  // Find the post from the posts list
  const post = posts.find(p => p.id === id);

  const handleLike = async () => {
    if (post) {
      const result = await toggleLike(post);
      if (!result.success) {
        Alert.alert('Error', 'Failed to like post. Please try again.');
      }
    }
  };

  const handleShare = () => {
    Alert.alert('Share', 'Share functionality coming soon!');
  };

  const handleAddComment = async () => {
    if (!commentText.trim()) return;

    const result = await createComment(commentText);

    if (result.success) {
      setCommentText('');
      inputRef.current?.blur();
    } else {
      Alert.alert('Error', result.error || 'Failed to add comment. Please try again.');
    }
  };

  const handleDeleteComment = async (commentId) => {
    const result = await deleteComment(commentId);

    if (!result.success) {
      Alert.alert('Error', result.error || 'Failed to delete comment. Please try again.');
    }
  };

  const canDeleteComment = (comment) => {
    // User can delete their own comments or comments on their posts
    return comment.user_id === user?.id || post?.user_id === user?.id;
  };

  if (!post) {
    return (
      <ScreenWrapper bg={theme.colors.background}>
        <View style={styles.errorContainer}>
          <Icon name="Image" size={64} color={theme.colors.textLight} />
          <Text style={styles.errorText}>Post not found</Text>
          <Pressable style={styles.backButton} onPress={() => router.back()}>
            <Text style={styles.backButtonText}>Go Back</Text>
          </Pressable>
        </View>
      </ScreenWrapper>
    );
  }

  return (
    <ScreenWrapper bg={theme.colors.background}>
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        style={styles.container}
        keyboardVerticalOffset={Platform.OS === 'ios' ? 0 : 0}
      >
        {/* Header */}
        <View style={styles.header}>
          <Pressable style={styles.closeButton} onPress={() => router.back()}>
            <Icon name="ArrowLeft" size={24} color={theme.colors.text} strokeWidth={2} />
          </Pressable>
          <Text style={styles.headerTitle}>Post</Text>
          <View style={{ width: 40 }} />
        </View>

        {/* Post and Comments */}
        <ScrollView
          style={styles.scrollView}
          contentContainerStyle={styles.scrollContent}
          showsVerticalScrollIndicator={false}
        >
          {/* Post */}
          <PostCard
            post={post}
            onLike={handleLike}
            onShare={handleShare}
            showActions={true}
          />

          {/* Comments Section */}
          <View style={styles.commentsSection}>
            <Text style={styles.commentsTitle}>
              Comments ({comments.length})
            </Text>

            {loading ? (
              <View style={styles.loadingContainer}>
                <Loading size="small" />
              </View>
            ) : comments.length === 0 ? (
              <View style={styles.emptyComments}>
                <Icon name="Comment" size={48} color={theme.colors.textLight} />
                <Text style={styles.emptyText}>No comments yet</Text>
                <Text style={styles.emptySubtext}>Be the first to comment!</Text>
              </View>
            ) : (
              <View style={styles.commentsList}>
                {comments.map((comment) => (
                  <CommentItem
                    key={comment.id}
                    comment={comment}
                    canDelete={canDeleteComment(comment)}
                    onDelete={handleDeleteComment}
                  />
                ))}
              </View>
            )}
          </View>
        </ScrollView>

        {/* Comment Input */}
        <View style={styles.inputContainer}>
          <TextInput
            ref={inputRef}
            style={styles.input}
            placeholder="Add a comment..."
            placeholderTextColor={theme.colors.textLight}
            value={commentText}
            onChangeText={setCommentText}
            multiline
            maxLength={500}
          />
          <Pressable
            style={[
              styles.sendButton,
              (!commentText.trim() || submitting) && styles.sendButtonDisabled,
            ]}
            onPress={handleAddComment}
            disabled={!commentText.trim() || submitting}
          >
            {submitting ? (
              <Loading size="small" />
            ) : (
              <Icon
                name="Send"
                size={22}
                color={
                  commentText.trim()
                    ? theme.colors.primary
                    : theme.colors.textLight
                }
                strokeWidth={2}
              />
            )}
          </Pressable>
        </View>
      </KeyboardAvoidingView>
    </ScreenWrapper>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: WP(5),
    paddingVertical: HP(2),
    borderBottomWidth: 1,
    borderBottomColor: theme.colors.border,
    backgroundColor: theme.colors.background,
  },
  closeButton: {
    padding: WP(2),
  },
  headerTitle: {
    fontSize: HP(2.2),
    fontWeight: theme.fonts.bold,
    color: theme.colors.text,
  },
  scrollView: {
    flex: 1,
  },
  scrollContent: {
    paddingBottom: HP(2),
  },
  commentsSection: {
    marginTop: HP(1),
    backgroundColor: theme.colors.background,
  },
  commentsTitle: {
    fontSize: HP(2),
    fontWeight: theme.fonts.bold,
    color: theme.colors.text,
    paddingHorizontal: WP(5),
    paddingVertical: HP(2),
    borderBottomWidth: 1,
    borderBottomColor: theme.colors.border,
  },
  loadingContainer: {
    paddingVertical: HP(4),
    alignItems: 'center',
  },
  emptyComments: {
    alignItems: 'center',
    paddingVertical: HP(6),
  },
  emptyText: {
    fontSize: HP(2),
    fontWeight: theme.fonts.semibold,
    color: theme.colors.text,
    marginTop: HP(2),
  },
  emptySubtext: {
    fontSize: HP(1.7),
    fontWeight: theme.fonts.medium,
    color: theme.colors.textLight,
    marginTop: HP(0.5),
  },
  commentsList: {
    paddingVertical: HP(1),
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: WP(5),
    paddingVertical: HP(1.5),
    backgroundColor: theme.colors.background,
    borderTopWidth: 1,
    borderTopColor: theme.colors.border,
    gap: WP(3),
  },
  input: {
    flex: 1,
    backgroundColor: theme.colors.backgroundSecondary,
    borderRadius: theme.radius.doublexl,
    paddingHorizontal: WP(4),
    paddingVertical: HP(1.2),
    fontSize: HP(1.8),
    fontWeight: theme.fonts.medium,
    color: theme.colors.text,
    maxHeight: HP(12),
  },
  sendButton: {
    padding: WP(2),
  },
  sendButtonDisabled: {
    opacity: 0.5,
  },
  errorContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: WP(10),
  },
  errorText: {
    fontSize: HP(2.2),
    fontWeight: theme.fonts.bold,
    color: theme.colors.text,
    marginTop: HP(2),
  },
  backButton: {
    marginTop: HP(3),
    paddingHorizontal: WP(8),
    paddingVertical: HP(1.5),
    backgroundColor: theme.colors.primary,
    borderRadius: theme.radius.doublexl,
  },
  backButtonText: {
    fontSize: HP(1.8),
    fontWeight: theme.fonts.bold,
    color: theme.colors.textWhite,
  },
});

export default PostDetail;
