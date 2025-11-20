/**
 * Messages Screen - Enhanced Edition
 * Beautiful messaging interface with real-time updates
 * Features: Chat list, unread badges, search, animations
 */

import * as Haptics from 'expo-haptics';
import { LinearGradient } from 'expo-linear-gradient';
import { useRouter } from 'expo-router';
import { useEffect, useState } from 'react';
import {
    FlatList,
    Image,
    Pressable,
    StyleSheet,
    Text,
    TextInput,
    View,
} from 'react-native';
import Animated, {
    useAnimatedStyle,
    useSharedValue,
    withSpring,
    withTiming,
} from 'react-native-reanimated';
import Icon from '../../assets/icons';
import EmptyState from '../../components/EmptyState';
import Loading from '../../components/Loading';
import ScreenWrapper from '../../components/ScreenWrapper';
import { theme } from '../../constants/theme';
import { useAuth } from '../../contexts/AuthContext';
import { HP, WP } from '../../helpers/common';
import { supabase } from '../../helpers/supabase';

const AnimatedPressable = Animated.createAnimatedComponent(Pressable);

const Messages = () => {
  const router = useRouter();
  const { user } = useAuth();
  const [conversations, setConversations] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');

  // Animation values
  const searchOpacity = useSharedValue(0);
  const searchTranslateY = useSharedValue(-10);

  useEffect(() => {
    if (user) {
      fetchConversations();
      subscribeToMessages();
    }

    // Entrance animation
    setTimeout(() => {
      searchOpacity.value = withTiming(1, { duration: 500 });
      searchTranslateY.value = withSpring(0, { damping: 18 });
    }, 200);
  }, [user]);

  const fetchConversations = async () => {
    try {
      setLoading(true);
      // Fetch conversations with last message and user info
      const { data, error } = await supabase
        .from('conversations')
        .select(`
          *,
          messages!inner (
            content,
            created_at,
            read
          ),
          profiles!participant_id (
            id,
            name,
            avatar_url
          )
        `)
        .eq('user_id', user.id)
        .order('updated_at', { ascending: false });

      if (error) throw error;

      // Process conversations
      const processed = data?.map(conv => ({
        id: conv.id,
        participant: conv.profiles,
        lastMessage: conv.messages?.[0]?.content || 'No messages yet',
        lastMessageTime: conv.messages?.[0]?.created_at || conv.updated_at,
        unreadCount: conv.messages?.filter(m => !m.read).length || 0,
        online: false, // TODO: Implement online status
      })) || [];

      setConversations(processed);
    } catch (error) {
      console.error('Fetch conversations error:', error);
    } finally {
      setLoading(false);
    }
  };

  const subscribeToMessages = () => {
    const subscription = supabase
      .channel('messages')
      .on(
        'postgres_changes',
        {
          event: 'INSERT',
          schema: 'public',
          table: 'messages',
          filter: `receiver_id=eq.${user.id}`,
        },
        (payload) => {
          fetchConversations();
          Haptics.notificationAsync(Haptics.NotificationFeedbackType.Success);
        }
      )
      .subscribe();

    return () => subscription.unsubscribe();
  };

  const handleConversationPress = (conversation) => {
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
    router.push(`/chat/${conversation.participant.id}`);
  };

  const handleNewMessage = () => {
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
    router.push('/users'); // Navigate to user selection
  };

  const getTimeAgo = (timestamp) => {
    const now = new Date();
    const messageDate = new Date(timestamp);
    const seconds = Math.floor((now - messageDate) / 1000);

    if (seconds < 60) return 'Just now';
    if (seconds < 3600) return `${Math.floor(seconds / 60)}m ago`;
    if (seconds < 86400) return `${Math.floor(seconds / 3600)}h ago`;
    if (seconds < 604800) return `${Math.floor(seconds / 86400)}d ago`;
    return messageDate.toLocaleDateString();
  };

  const filteredConversations = conversations.filter(conv =>
    conv.participant?.name?.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const searchAnimatedStyle = useAnimatedStyle(() => ({
    opacity: searchOpacity.value,
    transform: [{ translateY: searchTranslateY.value }],
  }));

  const renderConversation = ({ item, index }) => (
    <ConversationItem
      conversation={item}
      onPress={() => handleConversationPress(item)}
      getTimeAgo={getTimeAgo}
      index={index}
    />
  );

  const renderEmpty = () => {
    if (loading) return <Loading />;

    if (searchQuery && filteredConversations.length === 0) {
      return (
        <EmptyState
          icon="Search"
          title="No conversations found"
          message="Try a different search term"
          variant="search"
        />
      );
    }

    return (
      <EmptyState
        icon="MessageCircle"
        title="No messages yet"
        message="Start a conversation with your friends!"
        actionTitle="New Message"
        onAction={handleNewMessage}
        variant="default"
      />
    );
  };

  return (
    <ScreenWrapper bg={theme.colors.background}>
      <View style={styles.container}>
        {/* Header */}
        <LinearGradient
          colors={[theme.colors.surface, theme.colors.background]}
          style={styles.headerGradient}
        >
          <View style={styles.header}>
            <Text style={styles.headerTitle}>Messages</Text>
            <Pressable style={styles.newMessageButton} onPress={handleNewMessage}>
              <Icon name="Edit" size={22} color={theme.colors.primary} strokeWidth={2} />
            </Pressable>
          </View>

          {/* Search Bar */}
          <Animated.View style={[styles.searchContainer, searchAnimatedStyle]}>
            <Icon name="Search" size={20} color={theme.colors.textLight} strokeWidth={2} />
            <TextInput
              style={styles.searchInput}
              placeholder="Search messages..."
              placeholderTextColor={theme.colors.textLight}
              value={searchQuery}
              onChangeText={setSearchQuery}
              selectionColor={theme.colors.primary}
            />
            {searchQuery !== '' && (
              <Pressable onPress={() => setSearchQuery('')}>
                <Icon name="X" size={18} color={theme.colors.textLight} strokeWidth={2} />
              </Pressable>
            )}
          </Animated.View>
        </LinearGradient>

        {/* Conversations List */}
        <FlatList
          data={filteredConversations}
          renderItem={renderConversation}
          keyExtractor={(item) => item.id}
          contentContainerStyle={styles.listContent}
          ListEmptyComponent={renderEmpty}
          showsVerticalScrollIndicator={false}
        />
      </View>
    </ScreenWrapper>
  );
};

// Conversation Item Component
const ConversationItem = ({ conversation, onPress, getTimeAgo, index }) => {
  const scale = useSharedValue(0);
  const opacity = useSharedValue(0);

  useEffect(() => {
    setTimeout(() => {
      scale.value = withSpring(1, { damping: 15, stiffness: 100 });
      opacity.value = withTiming(1, { duration: 300 });
    }, index * 50);
  }, []);

  const animatedStyle = useAnimatedStyle(() => ({
    transform: [{ scale: scale.value }],
    opacity: opacity.value,
  }));

  const handlePress = () => {
    scale.value = withSequence(
      withSpring(0.95, { damping: 10 }),
      withSpring(1, { damping: 10 })
    );
    onPress();
  };

  return (
    <AnimatedPressable
      style={[styles.conversationItem, animatedStyle]}
      onPress={handlePress}
    >
      {/* Avatar */}
      <View style={styles.avatarContainer}>
        {conversation.participant?.avatar_url ? (
          <Image
            source={{ uri: conversation.participant.avatar_url }}
            style={styles.avatar}
          />
        ) : (
          <View style={styles.avatarPlaceholder}>
            <Text style={styles.avatarText}>
              {conversation.participant?.name?.charAt(0).toUpperCase() || 'U'}
            </Text>
          </View>
        )}
        {conversation.online && <View style={styles.onlineIndicator} />}
      </View>

      {/* Content */}
      <View style={styles.conversationContent}>
        <View style={styles.conversationHeader}>
          <Text style={styles.participantName} numberOfLines={1}>
            {conversation.participant?.name || 'Unknown User'}
          </Text>
          <Text style={styles.timestamp}>
            {getTimeAgo(conversation.lastMessageTime)}
          </Text>
        </View>
        <View style={styles.messageRow}>
          <Text
            style={[
              styles.lastMessage,
              conversation.unreadCount > 0 && styles.unreadMessage,
            ]}
            numberOfLines={1}
          >
            {conversation.lastMessage}
          </Text>
          {conversation.unreadCount > 0 && (
            <View style={styles.unreadBadge}>
              <Text style={styles.unreadCount}>
                {conversation.unreadCount > 99 ? '99+' : conversation.unreadCount}
              </Text>
            </View>
          )}
        </View>
      </View>
    </AnimatedPressable>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  headerGradient: {
    paddingTop: HP(2),
    paddingBottom: HP(1.5),
    ...theme.shadows.level2,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: WP(5),
    marginBottom: HP(2),
  },
  headerTitle: {
    fontSize: HP(3.5),
    fontWeight: theme.fonts.extrabold,
    color: theme.colors.text,
  },
  newMessageButton: {
    width: HP(4.5),
    height: HP(4.5),
    borderRadius: theme.radius.medium,
    backgroundColor: theme.colors.primaryContainer,
    justifyContent: 'center',
    alignItems: 'center',
  },
  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginHorizontal: WP(5),
    paddingHorizontal: WP(4),
    height: HP(6),
    backgroundColor: theme.colors.backgroundSecondary,
    borderRadius: theme.radius.xl,
    gap: WP(2),
  },
  searchInput: {
    flex: 1,
    fontSize: HP(1.9),
    fontWeight: theme.fonts.medium,
    color: theme.colors.text,
  },
  listContent: {
    paddingTop: HP(1),
    paddingBottom: HP(10),
  },
  conversationItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: WP(5),
    paddingVertical: HP(1.5),
    backgroundColor: theme.colors.surface,
    marginHorizontal: WP(2),
    marginVertical: HP(0.5),
    borderRadius: theme.radius.lg,
    ...theme.shadows.level1,
  },
  avatarContainer: {
    position: 'relative',
    marginRight: WP(3),
  },
  avatar: {
    width: HP(6.5),
    height: HP(6.5),
    borderRadius: HP(3.25),
    borderWidth: 2,
    borderColor: theme.colors.border,
  },
  avatarPlaceholder: {
    width: HP(6.5),
    height: HP(6.5),
    borderRadius: HP(3.25),
    backgroundColor: theme.colors.primaryContainer,
    borderWidth: 2,
    borderColor: theme.colors.primary,
    justifyContent: 'center',
    alignItems: 'center',
  },
  avatarText: {
    fontSize: HP(2.5),
    fontWeight: theme.fonts.bold,
    color: theme.colors.primary,
  },
  onlineIndicator: {
    position: 'absolute',
    bottom: 2,
    right: 2,
    width: HP(1.8),
    height: HP(1.8),
    borderRadius: HP(0.9),
    backgroundColor: theme.colors.success,
    borderWidth: 2,
    borderColor: theme.colors.surface,
  },
  conversationContent: {
    flex: 1,
  },
  conversationHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: HP(0.5),
  },
  participantName: {
    flex: 1,
    fontSize: HP(1.9),
    fontWeight: theme.fonts.bold,
    color: theme.colors.text,
  },
  timestamp: {
    fontSize: HP(1.5),
    fontWeight: theme.fonts.medium,
    color: theme.colors.textLight,
    marginLeft: WP(2),
  },
  messageRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  lastMessage: {
    flex: 1,
    fontSize: HP(1.7),
    fontWeight: theme.fonts.medium,
    color: theme.colors.textSecondary,
  },
  unreadMessage: {
    fontWeight: theme.fonts.semibold,
    color: theme.colors.text,
  },
  unreadBadge: {
    minWidth: HP(2.5),
    height: HP(2.5),
    borderRadius: HP(1.25),
    backgroundColor: theme.colors.primary,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: WP(1.5),
    marginLeft: WP(2),
  },
  unreadCount: {
    fontSize: HP(1.3),
    fontWeight: theme.fonts.bold,
    color: theme.colors.onPrimary,
  },
});

export default Messages;
