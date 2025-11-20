/**
 * Notifications Screen
 * Displays user notifications (likes, comments, follows)
 * Real-time updates via Supabase subscriptions
 */

import { useRouter } from 'expo-router';
import { FlatList, Image, Pressable, StyleSheet, Text, View } from 'react-native';
import Icon from '../../assets/icons';
import Loading from '../../components/Loading';
import ScreenWrapper from '../../components/ScreenWrapper';
import { theme } from '../../constants/theme';
import { HP, WP } from '../../helpers/common';
import { useNotifications } from '../../hooks/useNotifications';

const Notifications = () => {
  const router = useRouter();
  const {
    notifications,
    loading,
    unreadCount,
    markAsRead,
    markAllAsRead,
    getTimeAgo,
  } = useNotifications();

  const getNotificationMessage = (notif) => {
    switch (notif.type) {
      case 'like':
        return 'liked your post';
      case 'comment':
        return 'commented on your post';
      case 'follow':
        return 'started following you';
      default:
        return '';
    }
  };

  const handleNotificationPress = (notif) => {
    // Mark as read
    if (!notif.read) {
      markAsRead(notif.id);
    }

    // Navigate to post if applicable
    if (notif.post_id) {
      router.push(`/post/${notif.post_id}`);
    }
  };

  const getAvatar = (notif) => {
    if (notif.sender?.avatar_url) {
      return notif.sender.avatar_url;
    }
    return null;
  };

  const getUserName = (notif) => {
    return notif.sender?.name || 'Someone';
  };

  const getNotificationIcon = (type) => {
    switch (type) {
      case 'like':
        return 'Heart';
      case 'comment':
        return 'Comment';
      case 'follow':
        return 'User';
      default:
        return 'Bell';
    }
  };

  const renderNotification = ({ item }) => {
    const avatar = getAvatar(item);
    const userName = getUserName(item);
    const message = getNotificationMessage(item);
    const timeAgo = getTimeAgo(item.created_at);

    return (
      <Pressable
        style={[styles.notificationItem, !item.read && styles.unread]}
        onPress={() => handleNotificationPress(item)}
      >
        {/* Avatar or Icon */}
        <View style={styles.avatarContainer}>
          {avatar ? (
            <Image source={{ uri: avatar }} style={styles.avatar} />
          ) : (
            <View style={styles.iconContainer}>
              <Icon
                name={getNotificationIcon(item.type)}
                size={24}
                color={theme.colors.primary}
              />
            </View>
          )}
        </View>

        {/* Content */}
        <View style={styles.content}>
          <Text style={styles.message}>
            <Text style={styles.user}>{userName}</Text>
            {' '}
            {message}
          </Text>
          <Text style={styles.time}>{timeAgo}</Text>
        </View>

        {/* Unread Indicator */}
        {!item.read && <View style={styles.unreadDot} />}
      </Pressable>
    );
  };

  const renderEmpty = () => (
    <View style={styles.emptyContainer}>
      <Icon name="Bell" size={64} color={theme.colors.textLight} />
      <Text style={styles.emptyText}>No notifications yet</Text>
      <Text style={styles.emptySubtext}>
        We'll notify you when someone likes or comments on your posts
      </Text>
    </View>
  );

  if (loading) {
    return (
      <ScreenWrapper bg={theme.colors.background}>
        <Loading />
      </ScreenWrapper>
    );
  }

  return (
    <ScreenWrapper bg={theme.colors.background}>
      <View style={styles.container}>
        {/* Header */}
        <View style={styles.header}>
          <View style={styles.headerLeft}>
            <Text style={styles.title}>Notifications</Text>
            {unreadCount > 0 && (
              <View style={styles.badge}>
                <Text style={styles.badgeText}>{unreadCount}</Text>
              </View>
            )}
          </View>
          {unreadCount > 0 && (
            <Pressable onPress={markAllAsRead}>
              <Text style={styles.markAllRead}>Mark all read</Text>
            </Pressable>
          )}
        </View>

        {/* Notifications List */}
        <FlatList
          data={notifications}
          keyExtractor={(item) => item.id}
          renderItem={renderNotification}
          ListEmptyComponent={renderEmpty}
          contentContainerStyle={
            notifications.length === 0 && styles.emptyList
          }
          showsVerticalScrollIndicator={false}
        />
      </View>
    </ScreenWrapper>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: WP(4),
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: HP(2),
    paddingHorizontal: WP(1),
  },
  headerLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: WP(2),
  },
  title: {
    fontSize: HP(3),
    fontWeight: theme.fonts.bold,
    color: theme.colors.text,
  },
  badge: {
    backgroundColor: theme.colors.primary,
    borderRadius: HP(1.5),
    minWidth: HP(2.5),
    height: HP(2.5),
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: WP(1.5),
  },
  badgeText: {
    fontSize: HP(1.3),
    fontWeight: theme.fonts.bold,
    color: theme.colors.textWhite,
  },
  markAllRead: {
    fontSize: HP(1.6),
    fontWeight: theme.fonts.semibold,
    color: theme.colors.primary,
  },
  notificationItem: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: WP(4),
    backgroundColor: theme.colors.background,
    borderBottomWidth: 1,
    borderBottomColor: theme.colors.border,
    gap: WP(3),
  },
  unread: {
    backgroundColor: theme.colors.primaryLight || '#E6F7FF',
  },
  avatarContainer: {
    width: HP(5.5),
    height: HP(5.5),
  },
  avatar: {
    width: HP(5.5),
    height: HP(5.5),
    borderRadius: HP(2.75),
  },
  iconContainer: {
    width: HP(5.5),
    height: HP(5.5),
    borderRadius: HP(2.75),
    backgroundColor: theme.colors.primaryLight || '#E6F7FF',
    justifyContent: 'center',
    alignItems: 'center',
  },
  content: {
    flex: 1,
    gap: HP(0.5),
  },
  message: {
    fontSize: HP(1.8),
    color: theme.colors.text,
  },
  user: {
    fontWeight: theme.fonts.bold,
  },
  time: {
    fontSize: HP(1.4),
    color: theme.colors.textLight,
  },
  unreadDot: {
    width: HP(1),
    height: HP(1),
    borderRadius: HP(0.5),
    backgroundColor: theme.colors.primary,
  },
  emptyContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    gap: HP(2),
    paddingHorizontal: WP(10),
  },
  emptyList: {
    flexGrow: 1,
  },
  emptyText: {
    fontSize: HP(2.2),
    fontWeight: theme.fonts.bold,
    color: theme.colors.text,
  },
  emptySubtext: {
    fontSize: HP(1.6),
    color: theme.colors.textLight,
    textAlign: 'center',
  },
});

export default Notifications;
