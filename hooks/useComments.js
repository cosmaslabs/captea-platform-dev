/**
 * useComments Hook
 * Custom hook for managing comments on a post
 * Provides real-time updates and CRUD operations
 */

import { useEffect, useState } from 'react';
import { supabase } from '../helpers/supabase';

export const useComments = (postId) => {
  const [comments, setComments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);

  /**
   * Fetch comments for a post
   */
  const fetchComments = async () => {
    try {
      setLoading(true);

      const { data, error } = await supabase
        .from('comments')
        .select(`
          *,
          user:profiles!comments_user_id_fkey(id, name, avatar_url)
        `)
        .eq('post_id', postId)
        .order('created_at', { ascending: true });

      if (error) throw error;

      // Transform data
      const transformedComments = data.map(comment => ({
        ...comment,
        user_id: comment.user.id,
        user_name: comment.user.name,
        user_avatar: comment.user.avatar_url,
      }));

      setComments(transformedComments);
    } catch (error) {
      console.error('Error fetching comments:', error);
    } finally {
      setLoading(false);
    }
  };

  /**
   * Create a new comment
   */
  const createComment = async (content) => {
    if (!content.trim()) {
      return { success: false, error: 'Comment cannot be empty' };
    }

    try {
      setSubmitting(true);

      const { data: { user } } = await supabase.auth.getUser();

      if (!user) throw new Error('User not authenticated');

      const { data, error } = await supabase
        .from('comments')
        .insert({
          user_id: user.id,
          post_id: postId,
          content: content.trim(),
        })
        .select(`
          *,
          user:profiles!comments_user_id_fkey(id, name, avatar_url)
        `)
        .single();

      if (error) throw error;

      // Add new comment to local state
      const newComment = {
        ...data,
        user_id: data.user.id,
        user_name: data.user.name,
        user_avatar: data.user.avatar_url,
      };

      setComments(prev => [...prev, newComment]);
      return { success: true, comment: newComment };
    } catch (error) {
      console.error('Error creating comment:', error);
      return { success: false, error: error.message };
    } finally {
      setSubmitting(false);
    }
  };

  /**
   * Delete a comment
   */
  const deleteComment = async (commentId) => {
    try {
      const { error } = await supabase
        .from('comments')
        .delete()
        .eq('id', commentId);

      if (error) throw error;

      // Remove from local state
      setComments(prev => prev.filter(c => c.id !== commentId));
      return { success: true };
    } catch (error) {
      console.error('Error deleting comment:', error);
      return { success: false, error: error.message };
    }
  };

  /**
   * Setup real-time subscriptions
   */
  useEffect(() => {
    if (!postId) return;

    // Initial fetch
    fetchComments();

    // Subscribe to new comments
    const channel = supabase
      .channel(`comments-${postId}`)
      .on(
        'postgres_changes',
        {
          event: 'INSERT',
          schema: 'public',
          table: 'comments',
          filter: `post_id=eq.${postId}`,
        },
        async (payload) => {
          // Fetch complete comment data with user info
          const { data } = await supabase
            .from('comments')
            .select(`
              *,
              user:profiles!comments_user_id_fkey(id, name, avatar_url)
            `)
            .eq('id', payload.new.id)
            .single();

          if (data) {
            const newComment = {
              ...data,
              user_id: data.user.id,
              user_name: data.user.name,
              user_avatar: data.user.avatar_url,
            };

            // Add if not already present
            setComments(prev => {
              if (prev.some(c => c.id === newComment.id)) return prev;
              return [...prev, newComment];
            });
          }
        }
      )
      .on(
        'postgres_changes',
        {
          event: 'DELETE',
          schema: 'public',
          table: 'comments',
          filter: `post_id=eq.${postId}`,
        },
        (payload) => {
          setComments(prev => prev.filter(c => c.id !== payload.old.id));
        }
      )
      .subscribe();

    // Cleanup
    return () => {
      channel.unsubscribe();
    };
  }, [postId]);

  return {
    comments,
    loading,
    submitting,
    createComment,
    deleteComment,
    refetch: fetchComments,
  };
};
