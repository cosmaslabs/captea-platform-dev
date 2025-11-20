/**
 * Chat Screen - Enhanced Edition
 * Real-time one-on-one messaging interface
 * Features: Message bubbles, typing indicators, send animations
 */

import * as Haptics from 'expo-haptics';
import { LinearGradient } from 'expo-linear-gradient';
import { useLocalSearchParams, useRouter } from 'expo-router';
import { useEffect, useRef, useState } from 'react';
import {
    FlatList,
    Image,
    KeyboardAvoidingView,
    Platform,
    Pressable,
    StyleSheet,
    Text,
    TextInput,
    View,
} from 'react-native';
import Animated, {
    useAnimatedStyle,
    useSharedValue,
    withSequence,
    withSpring,
    withTiming,
} from 'react-native-reanimated';
import Icon from '../../assets/icons';
import BackButton from '../../components/BackButton';
import Loading from '../../components/Loading';
import ScreenWrapper from '../../components/ScreenWrapper';
import { theme } from '../../constants/theme';
import { useAuth } from '../../contexts/AuthContext';
import { HP, WP } from '../../helpers/common';
import { supabase } from '../../helpers/supabase';

const AnimatedPressable = Animated.createAnimatedComponent(Pressable);

const Chat = () => {
  const router = useRouter();
  const { id: participantId } = useLocalSearchParams();
  const { user } = useAuth();

  const [messages, setMessages] = useState([]);
  const [loading, setLoading] = useState(true);
  const [participant, setParticipant] = useState(null);
  const [messageText, setMessageText] = useState('');
  const [sending, setSending] = useState(false);

  const flatListRef = useRef(null);
  const inputRef = useRef(null);

  // Animation values
  const sendButtonScale = useSharedValue(1);

  useEffect(() => {
    if (user && participantId) {
      fetchParticipant();
      fetchMessages();
      subscribeToMessages();
    }
  }, [user, participantId]);

  const fetchParticipant = async () => {
    try {
      const { data, error } = await supabase
        .from('profiles')
        .select('*')
        .eq('id', participantId)
        .single();

      if (error) throw error;
      setParticipant(data);
    } catch (error) {
      console.error('Fetch participant error:', error);
    }
  };

  const fetchMessages = async () => {
    try {
      setLoading(true);
      const { data, error } = await supabase
        .from('messages')
        .select('*')
        .or(`and(sender_id.eq.${user.id},receiver_id.eq.${participantId}),and(sender_id.eq.${participantId},receiver_id.eq.${user.id})`)
        .order('created_at', { ascending: true });

      if (error) throw error;
      setMessages(data || []);

      // Mark messages as read
      await supabase
        .from('messages')
        .update({ read: true })
        .eq('receiver_id', user.id)
        .eq('sender_id', participantId)
        .eq('read', false);
    } catch (error) {
      console.error('Fetch messages error:', error);
    } finally {
      setLoading(false);
    }
  };

  const subscribeToMessages = () => {
    const subscription = supabase
      .channel(`chat-${user.id}-${participantId}`)
      .on(
        'postgres_changes',
        {
          event: 'INSERT',
          schema: 'public',
          table: 'messages',
        },
        (payload) => {
          const newMessage = payload.new;
          if (
            (newMessage.sender_id === user.id && newMessage.receiver_id === participantId) ||
            (newMessage.sender_id === participantId && newMessage.receiver_id === user.id)
          ) {
            setMessages(prev => [...prev, newMessage]);

            // Mark as read if from participant
            if (newMessage.sender_id === participantId) {
              supabase
                .from('messages')
                .update({ read: true })
                .eq('id', newMessage.id);

              Haptics.notificationAsync(Haptics.NotificationFeedbackType.Success);
            }
          }
        }
      )
      .subscribe();

    return () => subscription.unsubscribe();
  };

  const handleSend = async () => {
    if (!messageText.trim() || sending) return;

    const content = messageText.trim();
    setMessageText('');
    setSending(true);

    // Animate send button
    sendButtonScale.value = withSequence(
      withSpring(1.3, { damping: 10 }),
      withSpring(1, { damping: 10 })
    );

    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium);

    try {
      const { error } = await supabase.from('messages').insert({
        sender_id: user.id,
        receiver_id: participantId,
        content,
        read: false,
      });

      if (error) throw error;

      // Scroll to bottom
      setTimeout(() => {
        flatListRef.current?.scrollToEnd({ animated: true });
      }, 100);
    } catch (error) {
      console.error('Send message error:', error);
      // Restore message on error
      setMessageText(content);
    } finally {
      setSending(false);
    }
  };

  const sendButtonAnimatedStyle = useAnimatedStyle(() => ({
    transform: [{ scale: sendButtonScale.value }],
  }));

  const renderMessage = ({ item, index }) => (
    <MessageBubble
      message={item}
      isOwnMessage={item.sender_id === user.id}
      index={index}
    />
  );

  if (loading) {
    return (
      <ScreenWrapper bg={theme.colors.background}>
        <View style={styles.header}>
          <BackButton />
        </View>
        <Loading />
      </ScreenWrapper>
    );
  }

  return (
    <ScreenWrapper bg={theme.colors.backgroundSecondary}>
      <KeyboardAvoidingView
        style={styles.container}
        behavior={Platform.OS === 'ios' ? 'padding' : undefined}
        keyboardVerticalOffset={Platform.OS === 'ios' ? 0 : 0}
      >
        {/* Header */}
        <LinearGradient
          colors={[theme.colors.surface, theme.colors.background]}
          style={styles.headerGradient}
        >
          <View style={styles.header}>
            <BackButton />
            <View style={styles.participantInfo}>
              {participant?.avatar_url ? (
                <Image
                  source={{ uri: participant.avatar_url }}
                  style={styles.headerAvatar}
                />
              ) : (
                <View style={styles.headerAvatarPlaceholder}>
                  <Text style={styles.headerAvatarText}>
                    {participant?.name?.charAt(0).toUpperCase() || 'U'}
                  </Text>
                </View>
              )}
              <View style={styles.participantDetails}>
                <Text style={styles.participantName}>
                  {participant?.name || 'Unknown User'}
                </Text>
                <Text style={styles.participantStatus}>Online</Text>
              </View>
            </View>
            <Pressable style={styles.headerButton}>
              <Icon name="Phone" size={22} color={theme.colors.textSecondary} strokeWidth={2} />
            </Pressable>
          </View>
        </LinearGradient>

        {/* Messages */}
        <FlatList
          ref={flatListRef}
          data={messages}
          renderItem={renderMessage}
          keyExtractor={(item) => item.id}
          contentContainerStyle={styles.messagesContent}
          onContentSizeChange={() => flatListRef.current?.scrollToEnd({ animated: true })}
          onLayout={() => flatListRef.current?.scrollToEnd({ animated: false })}
          showsVerticalScrollIndicator={false}
        />

        {/* Input */}
        <View style={styles.inputContainer}>
          <View style={styles.inputWrapper}>
            <Pressable style={styles.attachButton}>
              <Icon name="Plus" size={22} color={theme.colors.textSecondary} strokeWidth={2} />
            </Pressable>
            <TextInput
              ref={inputRef}
              style={styles.input}
              placeholder="Type a message..."
              placeholderTextColor={theme.colors.textLight}
              value={messageText}
              onChangeText={setMessageText}
              multiline
              maxLength={1000}
              selectionColor={theme.colors.primary}
            />
            <AnimatedPressable
              style={[styles.sendButton, sendButtonAnimatedStyle]}
              onPress={handleSend}
              disabled={!messageText.trim() || sending}
            >
              <LinearGradient
                colors={messageText.trim() ? theme.gradients.primary : theme.gradients.light}
                style={styles.sendButtonGradient}
              >
                <Icon
                  name="Send"
                  size={20}
                  color={messageText.trim() ? theme.colors.onPrimary : theme.colors.textLight}
                  strokeWidth={2.5}
                />
              </LinearGradient>
            </AnimatedPressable>
          </View>
        </View>
      </KeyboardAvoidingView>
    </ScreenWrapper>
  );
};

// Message Bubble Component
const MessageBubble = ({ message, isOwnMessage, index }) => {
  const scale = useSharedValue(0);
  const opacity = useSharedValue(0);

  useEffect(() => {
    scale.value = withSpring(1, { damping: 15, stiffness: 150 });
    opacity.value = withTiming(1, { duration: 200 });
  }, []);

  const animatedStyle = useAnimatedStyle(() => ({
    transform: [{ scale: scale.value }],
    opacity: opacity.value,
  }));

  const getTimeStamp = () => {
    const date = new Date(message.created_at);
    return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  };

  return (
    <Animated.View
      style={[
        styles.messageBubbleContainer,
        isOwnMessage ? styles.ownMessageContainer : styles.otherMessageContainer,
        animatedStyle,
      ]}
    >
      <View
        style={[
          styles.messageBubble,
          isOwnMessage ? styles.ownMessageBubble : styles.otherMessageBubble,
        ]}
      >
        <Text style={[styles.messageText, isOwnMessage && styles.ownMessageText]}>
          {message.content}
        </Text>
        <Text style={[styles.messageTime, isOwnMessage && styles.ownMessageTime]}>
          {getTimeStamp()}
        </Text>
      </View>
    </Animated.View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  headerGradient: {
    ...theme.shadows.level2,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: WP(3),
    paddingVertical: HP(1.5),
    gap: WP(2),
  },
  participantInfo: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    gap: WP(3),
  },
  headerAvatar: {
    width: HP(5),
    height: HP(5),
    borderRadius: HP(2.5),
    borderWidth: 2,
    borderColor: theme.colors.border,
  },
  headerAvatarPlaceholder: {
    width: HP(5),
    height: HP(5),
    borderRadius: HP(2.5),
    backgroundColor: theme.colors.primaryContainer,
    borderWidth: 2,
    borderColor: theme.colors.primary,
    justifyContent: 'center',
    alignItems: 'center',
  },
  headerAvatarText: {
    fontSize: HP(2),
    fontWeight: theme.fonts.bold,
    color: theme.colors.primary,
  },
  participantDetails: {
    flex: 1,
  },
  participantName: {
    fontSize: HP(2),
    fontWeight: theme.fonts.bold,
    color: theme.colors.text,
  },
  participantStatus: {
    fontSize: HP(1.5),
    fontWeight: theme.fonts.medium,
    color: theme.colors.success,
  },
  headerButton: {
    width: HP(4.5),
    height: HP(4.5),
    borderRadius: theme.radius.medium,
    backgroundColor: theme.colors.backgroundSecondary,
    justifyContent: 'center',
    alignItems: 'center',
  },
  messagesContent: {
    paddingVertical: HP(2),
    paddingHorizontal: WP(4),
  },
  messageBubbleContainer: {
    marginVertical: HP(0.5),
    maxWidth: '75%',
  },
  ownMessageContainer: {
    alignSelf: 'flex-end',
  },
  otherMessageContainer: {
    alignSelf: 'flex-start',
  },
  messageBubble: {
    paddingHorizontal: WP(4),
    paddingVertical: HP(1.2),
    borderRadius: theme.radius.lg,
    ...theme.shadows.level1,
  },
  ownMessageBubble: {
    backgroundColor: theme.colors.primary,
    borderBottomRightRadius: theme.radius.xs,
  },
  otherMessageBubble: {
    backgroundColor: theme.colors.surface,
    borderBottomLeftRadius: theme.radius.xs,
  },
  messageText: {
    fontSize: HP(1.85),
    fontWeight: theme.fonts.medium,
    color: theme.colors.text,
    lineHeight: HP(2.6),
  },
  ownMessageText: {
    color: theme.colors.onPrimary,
  },
  messageTime: {
    fontSize: HP(1.3),
    fontWeight: theme.fonts.medium,
    color: theme.colors.textLight,
    marginTop: HP(0.3),
    alignSelf: 'flex-end',
  },
  ownMessageTime: {
    color: theme.colors.onPrimary,
    opacity: 0.8,
  },
  inputContainer: {
    paddingHorizontal: WP(4),
    paddingVertical: HP(1.5),
    backgroundColor: theme.colors.surface,
    borderTopWidth: 1,
    borderTopColor: theme.colors.border,
  },
  inputWrapper: {
    flexDirection: 'row',
    alignItems: 'flex-end',
    gap: WP(2),
  },
  attachButton: {
    width: HP(5),
    height: HP(5),
    borderRadius: theme.radius.medium,
    backgroundColor: theme.colors.backgroundSecondary,
    justifyContent: 'center',
    alignItems: 'center',
  },
  input: {
    flex: 1,
    minHeight: HP(5),
    maxHeight: HP(15),
    paddingHorizontal: WP(4),
    paddingVertical: HP(1.2),
    backgroundColor: theme.colors.backgroundSecondary,
    borderRadius: theme.radius.lg,
    fontSize: HP(1.85),
    fontWeight: theme.fonts.medium,
    color: theme.colors.text,
  },
  sendButton: {
    width: HP(5),
    height: HP(5),
    borderRadius: theme.radius.medium,
    overflow: 'hidden',
  },
  sendButtonGradient: {
    width: '100%',
    height: '100%',
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default Chat;
