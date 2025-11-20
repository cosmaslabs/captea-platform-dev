/**
 * usePosts Hook
 * Custom hook for managing posts data
 * Provides pagination, real-time updates, and CRUD operations
 */

import { useEffect, useState } from 'react';
import { supabase } from '../helpers/supabase';

const PAGE_SIZE = 10;

export const usePosts = () => {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const [hasMore, setHasMore] = useState(true);
  const [page, setPage] = useState(0);

  /**
   * Fetch posts with user details and like status
   */
  const fetchPosts = async (pageNum = 0, isRefreshing = false) => {
    try {
      if (isRefreshing) {
        setRefreshing(true);
      } else {
        setLoading(true);
      }

      const { data, error } = await supabase
        .from('posts')
        .select(`
          *,
          user:profiles!posts_user_id_fkey(id, name, avatar_url),
          likes(user_id)
        `)
        .order('created_at', { ascending: false })
        .range(pageNum * PAGE_SIZE, (pageNum + 1) * PAGE_SIZE - 1);

      if (error) throw error;

      // Transform data to include user_liked flag
      const transformedPosts = data.map(post => ({
        ...post,
        user_id: post.user.id,
        user_name: post.user.name,
        user_avatar: post.user.avatar_url,
        user_liked: post.likes.some(
          like => like.user_id === (supabase.auth.getUser().then(u => u.data.user?.id))
        ),
      }));

      if (isRefreshing || pageNum === 0) {
        setPosts(transformedPosts);
        setPage(0);
      } else {
        setPosts(prev => [...prev, ...transformedPosts]);
      }

      setHasMore(data.length === PAGE_SIZE);
    } catch (error) {
      console.error('Error fetching posts:', error);
    } finally {
      setLoading(false);
      setRefreshing(false);
    }
  };

  /**
   * Load more posts (pagination)
   */
  const loadMore = () => {
    if (!loading && hasMore) {
      const nextPage = page + 1;
      setPage(nextPage);
      fetchPosts(nextPage);
    }
  };

  /**
   * Refresh posts (pull-to-refresh)
   */
  const refresh = () => {
    fetchPosts(0, true);
  };

  /**
   * Create a new post
   */
  const createPost = async (content, imageUrl = null, videoUrl = null) => {
    try {
      const { data: { user } } = await supabase.auth.getUser();

      if (!user) throw new Error('User not authenticated');

      const { data, error } = await supabase
        .from('posts')
        .insert({
          user_id: user.id,
          content,
          image_url: imageUrl,
          video_url: videoUrl,
        })
        .select(`
          *,
          user:profiles!posts_user_id_fkey(id, name, avatar_url)
        `)
        .single();

      if (error) throw error;

      // Add new post to the top of the feed
      const newPost = {
        ...data,
        user_id: data.user.id,
        user_name: data.user.name,
        user_avatar: data.user.avatar_url,
        user_liked: false,
        likes: [],
      };

      setPosts(prev => [newPost, ...prev]);
      return { success: true, post: newPost };
    } catch (error) {
      console.error('Error creating post:', error);
      return { success: false, error: error.message };
    }
  };

  /**
   * Update a post
   */
  const updatePost = async (postId, content) => {
    try {
      const { data, error } = await supabase
        .from('posts')
        .update({
          content,
          updated_at: new Date().toISOString(),
        })
        .eq('id', postId)
        .select(`
          *,
          user:profiles!posts_user_id_fkey(id, name, avatar_url)
        `)
        .single();

      if (error) throw error;

      // Update local state
      setPosts(prev =>
        prev.map(p =>
          p.id === postId
            ? {
                ...p,
                content,
                updated_at: data.updated_at,
              }
            : p
        )
      );

      return { success: true, post: data };
    } catch (error) {
      console.error('Error updating post:', error);
      return { success: false, error: error.message };
    }
  };

  /**
   * Delete a post
   */
  const deletePost = async (postId) => {
    try {
      const { error } = await supabase
        .from('posts')
        .delete()
        .eq('id', postId);

      if (error) throw error;

      // Remove from local state
      setPosts(prev => prev.filter(post => post.id !== postId));
      return { success: true };
    } catch (error) {
      console.error('Error deleting post:', error);
      return { success: false, error: error.message };
    }
  };

  /**
   * Toggle like on a post
   */
  const toggleLike = async (post) => {
    try {
      const { data: { user } } = await supabase.auth.getUser();

      if (!user) throw new Error('User not authenticated');

      // Optimistic update
      setPosts(prev =>
        prev.map(p =>
          p.id === post.id
            ? {
                ...p,
                user_liked: !p.user_liked,
                likes_count: p.user_liked
                  ? (p.likes_count || 0) - 1
                  : (p.likes_count || 0) + 1,
              }
            : p
        )
      );

      if (post.user_liked) {
        // Unlike
        const { error } = await supabase
          .from('likes')
          .delete()
          .eq('post_id', post.id)
          .eq('user_id', user.id);

        if (error) throw error;
      } else {
        // Like
        const { error } = await supabase
          .from('likes')
          .insert({
            post_id: post.id,
            user_id: user.id,
          });

        if (error) throw error;
      }

      return { success: true };
    } catch (error) {
      console.error('Error toggling like:', error);

      // Revert optimistic update on error
      setPosts(prev =>
        prev.map(p =>
          p.id === post.id
            ? {
                ...p,
                user_liked: post.user_liked,
                likes_count: post.likes_count,
              }
            : p
        )
      );

      return { success: false, error: error.message };
    }
  };

  /**
   * Share a post and increment share count
   */
  const sharePost = async (postId) => {
    try {
      // Optimistically update local state first
      setPosts(prev =>
        prev.map(p =>
          p.id === postId
            ? { ...p, shares_count: (p.shares_count || 0) + 1 }
            : p
        )
      );

      // Try using RPC function first
      const { error: rpcError } = await supabase.rpc('increment_share_count', {
        post_id: postId,
      });

      // If RPC fails, fetch current count and update
      if (rpcError) {
        const { data: post } = await supabase
          .from('posts')
          .select('shares_count')
          .eq('id', postId)
          .single();

        const currentCount = post?.shares_count || 0;

        const { error: updateError } = await supabase
          .from('posts')
          .update({ shares_count: currentCount + 1 })
          .eq('id', postId);

        if (updateError) throw updateError;
      }

      return { success: true };
    } catch (error) {
      console.error('Error sharing post:', error);

      // Revert optimistic update on error
      setPosts(prev =>
        prev.map(p =>
          p.id === postId
            ? { ...p, shares_count: Math.max((p.shares_count || 0) - 1, 0) }
            : p
        )
      );

      return { success: false, error: error.message };
    }
  };

  /**
   * Setup real-time subscriptions
   */
  useEffect(() => {
    // Initial fetch
    fetchPosts();

    // Subscribe to new posts
    const postsChannel = supabase
      .channel('posts-channel')
      .on(
        'postgres_changes',
        {
          event: 'INSERT',
          schema: 'public',
          table: 'posts',
        },
        async (payload) => {
          // Fetch complete post data with user info
          const { data } = await supabase
            .from('posts')
            .select(`
              *,
              user:profiles!posts_user_id_fkey(id, name, avatar_url)
            `)
            .eq('id', payload.new.id)
            .single();

          if (data) {
            const newPost = {
              ...data,
              user_id: data.user.id,
              user_name: data.user.name,
              user_avatar: data.user.avatar_url,
              user_liked: false,
              likes: [],
            };

            // Add to feed if not already present
            setPosts(prev => {
              if (prev.some(p => p.id === newPost.id)) return prev;
              return [newPost, ...prev];
            });
          }
        }
      )
      .on(
        'postgres_changes',
        {
          event: 'UPDATE',
          schema: 'public',
          table: 'posts',
        },
        (payload) => {
          setPosts(prev =>
            prev.map(p =>
              p.id === payload.new.id
                ? {
                    ...p,
                    content: payload.new.content,
                    updated_at: payload.new.updated_at,
                  }
                : p
            )
          );
        }
      )
      .on(
        'postgres_changes',
        {
          event: 'DELETE',
          schema: 'public',
          table: 'posts',
        },
        (payload) => {
          setPosts(prev => prev.filter(p => p.id !== payload.old.id));
        }
      )
      .subscribe();

    // Subscribe to likes updates
    const likesChannel = supabase
      .channel('likes-channel')
      .on(
        'postgres_changes',
        {
          event: '*',
          schema: 'public',
          table: 'likes',
        },
        (payload) => {
          if (payload.eventType === 'INSERT') {
            setPosts(prev =>
              prev.map(p =>
                p.id === payload.new.post_id
                  ? { ...p, likes_count: (p.likes_count || 0) + 1 }
                  : p
              )
            );
          } else if (payload.eventType === 'DELETE') {
            setPosts(prev =>
              prev.map(p =>
                p.id === payload.old.post_id
                  ? { ...p, likes_count: Math.max((p.likes_count || 0) - 1, 0) }
                  : p
              )
            );
          }
        }
      )
      .subscribe();

    // Cleanup
    return () => {
      postsChannel.unsubscribe();
      likesChannel.unsubscribe();
    };
  }, []);

  return {
    posts,
    loading,
    refreshing,
    hasMore,
    loadMore,
    refresh,
    createPost,
    updatePost,
    deletePost,
    toggleLike,
    sharePost,
  };
};
