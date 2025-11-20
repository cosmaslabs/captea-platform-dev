/**
 * SkeletonLoader Component
 * Animated skeleton loading placeholders for better perceived performance
 * Material You 3 design with shimmer animation
 */

import { useEffect } from 'react';
import { StyleSheet, View } from 'react-native';
import Animated, {
    interpolate,
    useAnimatedStyle,
    useSharedValue,
    withRepeat,
    withTiming,
} from 'react-native-reanimated';
import { theme } from '../constants/theme';
import { HP, WP } from '../helpers/common';

const SkeletonLoader = ({ variant = 'post', count = 3 }) => {
  const shimmer = useSharedValue(0);

  useEffect(() => {
    shimmer.value = withRepeat(
      withTiming(1, { duration: 1500 }),
      -1,
      false
    );
  }, []);

  const shimmerStyle = useAnimatedStyle(() => {
    const translateX = interpolate(
      shimmer.value,
      [0, 1],
      [-WP(100), WP(100)]
    );

    return {
      transform: [{ translateX }],
    };
  });

  const renderPostSkeleton = () => (
    <View style={styles.postCard}>
      {/* Header */}
      <View style={styles.postHeader}>
        <View style={styles.avatar} />
        <View style={styles.userInfo}>
          <View style={[styles.skeleton, styles.userName]} />
          <View style={[styles.skeleton, styles.timestamp]} />
        </View>
      </View>

      {/* Content */}
      <View style={styles.postContent}>
        <View style={[styles.skeleton, styles.textLine, styles.textFull]} />
        <View style={[styles.skeleton, styles.textLine, styles.textMedium]} />
        <View style={[styles.skeleton, styles.textLine, styles.textShort]} />
      </View>

      {/* Media */}
      <View style={[styles.skeleton, styles.mediaPlaceholder]} />

      {/* Actions */}
      <View style={styles.actions}>
        <View style={[styles.skeleton, styles.actionButton]} />
        <View style={[styles.skeleton, styles.actionButton]} />
        <View style={[styles.skeleton, styles.actionButton]} />
      </View>

      {/* Shimmer overlay */}
      <Animated.View style={[styles.shimmer, shimmerStyle]} />
    </View>
  );

  const renderProfileSkeleton = () => (
    <View style={styles.profileCard}>
      <View style={styles.profileHeader}>
        <View style={[styles.skeleton, styles.profileAvatar]} />
        <View style={styles.profileInfo}>
          <View style={[styles.skeleton, styles.profileName]} />
          <View style={[styles.skeleton, styles.profileBio]} />
        </View>
      </View>
      <Animated.View style={[styles.shimmer, shimmerStyle]} />
    </View>
  );

  const renderCommentSkeleton = () => (
    <View style={styles.commentCard}>
      <View style={styles.avatar} />
      <View style={styles.commentContent}>
        <View style={[styles.skeleton, styles.commentName]} />
        <View style={[styles.skeleton, styles.commentText]} />
      </View>
      <Animated.View style={[styles.shimmer, shimmerStyle]} />
    </View>
  );

  const renderSkeleton = () => {
    switch (variant) {
      case 'post':
        return renderPostSkeleton();
      case 'profile':
        return renderProfileSkeleton();
      case 'comment':
        return renderCommentSkeleton();
      default:
        return renderPostSkeleton();
    }
  };

  return (
    <View style={styles.container}>
      {Array.from({ length: count }).map((_, index) => (
        <View key={index}>{renderSkeleton()}</View>
      ))}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  postCard: {
    backgroundColor: theme.colors.surface,
    borderRadius: theme.radius.large,
    paddingVertical: HP(2),
    marginBottom: HP(1.5),
    marginHorizontal: WP(4),
    overflow: 'hidden',
    ...theme.shadows.level1,
  },
  postHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: WP(4),
    marginBottom: HP(1.2),
  },
  avatar: {
    width: HP(5),
    height: HP(5),
    borderRadius: theme.radius.full,
    backgroundColor: theme.colors.surfaceVariant,
    marginRight: WP(3),
  },
  userInfo: {
    flex: 1,
    gap: HP(0.5),
  },
  skeleton: {
    backgroundColor: theme.colors.surfaceVariant,
    borderRadius: theme.radius.small,
  },
  userName: {
    width: WP(30),
    height: HP(2),
  },
  timestamp: {
    width: WP(15),
    height: HP(1.5),
  },
  postContent: {
    paddingHorizontal: WP(4),
    gap: HP(0.8),
    marginBottom: HP(1.5),
  },
  textLine: {
    height: HP(1.8),
  },
  textFull: {
    width: '100%',
  },
  textMedium: {
    width: '80%',
  },
  textShort: {
    width: '60%',
  },
  mediaPlaceholder: {
    width: '100%',
    height: HP(30),
    marginBottom: HP(1.5),
  },
  actions: {
    flexDirection: 'row',
    paddingHorizontal: WP(4),
    gap: WP(6),
  },
  actionButton: {
    width: WP(12),
    height: HP(3),
  },
  shimmer: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: 'rgba(255, 255, 255, 0.3)',
  },
  profileCard: {
    backgroundColor: theme.colors.surface,
    borderRadius: theme.radius.large,
    padding: WP(4),
    marginBottom: HP(2),
    overflow: 'hidden',
    ...theme.shadows.level1,
  },
  profileHeader: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  profileAvatar: {
    width: HP(10),
    height: HP(10),
    borderRadius: theme.radius.full,
    marginRight: WP(4),
  },
  profileInfo: {
    flex: 1,
    gap: HP(1),
  },
  profileName: {
    width: WP(40),
    height: HP(2.5),
  },
  profileBio: {
    width: WP(60),
    height: HP(1.8),
  },
  commentCard: {
    flexDirection: 'row',
    padding: WP(4),
    marginBottom: HP(1),
    overflow: 'hidden',
  },
  commentContent: {
    flex: 1,
    gap: HP(0.5),
  },
  commentName: {
    width: WP(25),
    height: HP(1.8),
  },
  commentText: {
    width: WP(60),
    height: HP(1.5),
  },
});

export default SkeletonLoader;
