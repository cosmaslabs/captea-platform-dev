/**
 * Home Screen
 * Main feed screen with posts, likes, comments
 * Phase 3: Core Social Features
 */

import { useRouter } from 'expo-router';
import { Alert, FlatList, Pressable, RefreshControl, StyleSheet, Text, View } from 'react-native';
import Icon from '../assets/icons';
import Loading from '../components/Loading';
import PostCard from '../components/PostCard';
import ScreenWrapper from '../components/ScreenWrapper';
import { theme } from '../constants/theme';
import { useAuth } from '../contexts/AuthContext';
import { HP, WP } from '../helpers/common';
import { usePosts } from '../hooks/usePosts';

const Home = () => {
  const router = useRouter();
  const { user } = useAuth();
  const { posts, loading, refreshing, hasMore, loadMore, refresh, toggleLike } = usePosts();

  const handleLike = async (post) => {
    const result = await toggleLike(post);
    if (!result.success) {
      Alert.alert('Error', 'Failed to like post. Please try again.');
    }
  };

  const handleComment = (post) => {
    router.push(`/post/${post.id}`);
  };

  const handleShare = (post) => {
    Alert.alert('Share', 'Share functionality coming soon!');
  };

  const handleCreatePost = () => {
    router.push('/create');
  };

  const renderHeader = () => (
    <View style={styles.header}>
      <Text style={styles.title}>Captea</Text>
      <Pressable
        style={styles.profileButton}
        onPress={() => router.push('/profile')}
      >
        <Icon name="User" size={24} color={theme.colors.text} />
      </Pressable>
    </View>
  );

  const renderPost = ({ item }) => (
    <PostCard
      post={item}
      onLike={handleLike}
      onComment={handleComment}
      onShare={handleShare}
    />
  );

  const renderEmpty = () => {
    if (loading) return null;

    return (
      <View style={styles.emptyContainer}>
        <Icon name="Image" size={64} color={theme.colors.textLight} />
        <Text style={styles.emptyTitle}>No posts yet</Text>
        <Text style={styles.emptyText}>
          Be the first to share something!
        </Text>
        <Pressable style={styles.emptyButton} onPress={handleCreatePost}>
          <Text style={styles.emptyButtonText}>Create Post</Text>
        </Pressable>
      </View>
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

  if (loading && posts.length === 0) {
    return (
      <ScreenWrapper bg={theme.colors.background}>
        <Loading />
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
              onRefresh={refresh}
              tintColor={theme.colors.primary}
            />
          }
          onEndReached={loadMore}
          onEndReachedThreshold={0.5}
          showsVerticalScrollIndicator={false}
        />

        {/* Floating Create Button */}
        <Pressable style={styles.fab} onPress={handleCreatePost}>
          <Icon name="Plus" size={28} color={theme.colors.textWhite} strokeWidth={2.5} />
        </Pressable>
      </View>
    </ScreenWrapper>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: WP(5),
    paddingVertical: HP(2),
    backgroundColor: theme.colors.background,
    borderBottomWidth: 1,
    borderBottomColor: theme.colors.border,
  },
  title: {
    fontSize: HP(3),
    fontWeight: theme.fonts.extrabold,
    color: theme.colors.primary,
  },
  profileButton: {
    padding: WP(2),
  },
  listContent: {
    paddingHorizontal: WP(5),
    paddingTop: HP(2),
    paddingBottom: HP(10),
  },
  emptyContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: HP(10),
  },
  emptyTitle: {
    fontSize: HP(2.5),
    fontWeight: theme.fonts.bold,
    color: theme.colors.text,
    marginTop: HP(2),
  },
  emptyText: {
    fontSize: HP(1.8),
    fontWeight: theme.fonts.medium,
    color: theme.colors.textLight,
    textAlign: 'center',
    marginTop: HP(1),
    paddingHorizontal: WP(10),
  },
  emptyButton: {
    marginTop: HP(3),
    paddingHorizontal: WP(8),
    paddingVertical: HP(1.5),
    backgroundColor: theme.colors.primary,
    borderRadius: theme.radius.doublexl,
  },
  emptyButtonText: {
    fontSize: HP(1.8),
    fontWeight: theme.fonts.bold,
    color: theme.colors.textWhite,
  },
  footerLoader: {
    paddingVertical: HP(2),
    alignItems: 'center',
  },
  fab: {
    position: 'absolute',
    bottom: HP(3),
    right: WP(5),
    width: HP(7),
    height: HP(7),
    borderRadius: HP(3.5),
    backgroundColor: theme.colors.primary,
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: theme.colors.text,
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 8,
  },
});

export default Home;
