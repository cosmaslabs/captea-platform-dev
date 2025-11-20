/**
 * Notifications Screen
 * Displays user notifications (likes, comments, follows)
 * Real-time updates via Supabase subscriptions
 */

import { FlatList, Pressable, StyleSheet, Text, View } from 'react-native';
import Icon from '../../assets/icons';
import ScreenWrapper from '../../components/ScreenWrapper';
import { theme } from '../../constants/theme';
import { HP, WP } from '../../helpers/common';

const Notifications = () => {
  // Placeholder data - will be replaced with real notifications
  const notifications = [
    {
      id: '1',
      type: 'like',
      user: 'John Doe',
      message: 'liked your post',
      time: '2 hours ago',
      read: false,
    },
    {
      id: '2',
      type: 'comment',
      user: 'Jane Smith',
      message: 'commented on your post',
      time: '5 hours ago',
      read: false,
    },
    {
      id: '3',
      type: 'follow',
      user: 'Mike Johnson',
      message: 'started following you',
      time: '1 day ago',
      read: true,
    },
  ];

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

  const renderNotification = ({ item }) => (
    <Pressable
      style={[styles.notificationItem, !item.read && styles.unread]}
      onPress={() => {
        // Navigate to relevant post/profile
        console.log('Navigate to notification:', item.id);
      }}
    >
      <View style={styles.iconContainer}>
        <Icon
          name={getNotificationIcon(item.type)}
          size={24}
          color={theme.colors.primary}
        />
      </View>

      <View style={styles.content}>
        <Text style={styles.message}>
          <Text style={styles.user}>{item.user}</Text>
          {' '}
          {item.message}
        </Text>
        <Text style={styles.time}>{item.time}</Text>
      </View>

      {!item.read && <View style={styles.unreadDot} />}
    </Pressable>
  );

  const renderEmpty = () => (
    <View style={styles.emptyContainer}>
      <Icon name="Bell" size={64} color={theme.colors.textLight} />
      <Text style={styles.emptyText}>No notifications yet</Text>
      <Text style={styles.emptySubtext}>
        We'll notify you when someone likes or comments on your posts
      </Text>
    </View>
  );

  return (
    <ScreenWrapper bg={theme.colors.background}>
      <View style={styles.container}>
        {/* Header */}
        <View style={styles.header}>
          <Text style={styles.title}>Notifications</Text>
          {notifications.length > 0 && (
            <Pressable onPress={() => console.log('Mark all as read')}>
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
  title: {
    fontSize: HP(3),
    fontWeight: theme.fonts.bold,
    color: theme.colors.text,
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
  iconContainer: {
    width: HP(5),
    height: HP(5),
    borderRadius: HP(2.5),
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
