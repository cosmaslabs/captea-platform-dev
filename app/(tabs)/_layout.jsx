/**
 * Tab Navigation Layout - World-Class Redesign
 * Premium bottom navigation inspired by Instagram, TikTok, and Threads
 * Features: Glassmorphism, smooth animations, haptic feedback
 */

import { BlurView } from 'expo-blur';
import * as Haptics from 'expo-haptics';
import { LinearGradient } from 'expo-linear-gradient';
import { Tabs } from 'expo-router';
import { Platform, StyleSheet, View } from 'react-native';
import Animated, {
    useAnimatedStyle,
    useSharedValue,
    withSpring,
} from 'react-native-reanimated';
import Icon from '../../assets/icons';
import { theme } from '../../constants/theme';
import { HP } from '../../helpers/common';

// Animated Tab Icon Component
const AnimatedTabIcon = ({ name, size, color, focused, fill }) => {
  const scale = useSharedValue(focused ? 1 : 0.9);

  const animatedStyle = useAnimatedStyle(() => ({
    transform: [{ scale: withSpring(scale.value, { damping: 15 }) }],
  }));

  return (
    <Animated.View style={[styles.iconWrapper, animatedStyle]}>
      <Icon
        name={name}
        size={size}
        color={color}
        strokeWidth={focused ? 2.5 : 2}
        fill={fill}
      />
    </Animated.View>
  );
};

export default function TabLayout() {
  return (
    <Tabs
      screenOptions={{
        headerShown: false,
        tabBarStyle: styles.tabBar,
        tabBarActiveTintColor: theme.colors.primary,
        tabBarInactiveTintColor: theme.colors.textSecondary,
        tabBarShowLabel: false,
        tabBarHideOnKeyboard: true,
        tabBarItemStyle: styles.tabBarItem,
        tabBarBackground: () => (
          <BlurView
            intensity={95}
            tint="light"
            style={StyleSheet.absoluteFill}
          />
        ),
      }}
    >
      <Tabs.Screen
        name="home"
        options={{
          title: 'Home',
          tabBarIcon: ({ color, focused }) => (
            <View style={[styles.iconContainer, focused && styles.iconContainerActive]}>
              <AnimatedTabIcon
                name="Home"
                size={26}
                color={focused ? theme.colors.primary : color}
                focused={focused}
                fill={focused ? theme.colors.primary : 'transparent'}
              />
            </View>
          ),
        }}
        listeners={{
          tabPress: () => Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light),
        }}
      />

      <Tabs.Screen
        name="messages"
        options={{
          title: 'Messages',
          tabBarIcon: ({ color, focused }) => (
            <View style={[styles.iconContainer, focused && styles.iconContainerActive]}>
              <AnimatedTabIcon
                name="MessageCircle"
                size={26}
                color={focused ? theme.colors.primary : color}
                focused={focused}
              />
            </View>
          ),
        }}
        listeners={{
          tabPress: () => Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light),
        }}
      />

      <Tabs.Screen
        name="create"
        options={{
          title: 'Create',
          tabBarIcon: ({ color, focused }) => (
            <LinearGradient
              colors={theme.gradients.primary}
              style={[styles.createButton, focused && styles.createButtonActive]}
              start={{ x: 0, y: 0 }}
              end={{ x: 1, y: 1 }}
            >
              <Icon
                name="Plus"
                size={28}
                color={theme.colors.onPrimary}
                strokeWidth={3}
              />
            </LinearGradient>
          ),
        }}
        listeners={{
          tabPress: () => Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium),
        }}
      />

      <Tabs.Screen
        name="notifications"
        options={{
          title: 'Notifications',
          tabBarIcon: ({ color, focused }) => (
            <View style={[styles.iconContainer, focused && styles.iconContainerActive]}>
              <AnimatedTabIcon
                name="Bell"
                size={26}
                color={focused ? theme.colors.primary : color}
                focused={focused}
              />
            </View>
          ),
        }}
        listeners={{
          tabPress: () => Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light),
        }}
      />

      <Tabs.Screen
        name="profile"
        options={{
          title: 'Profile',
          tabBarIcon: ({ color, focused }) => (
            <View style={[styles.iconContainer, focused && styles.iconContainerActive]}>
              <AnimatedTabIcon
                name="User"
                size={26}
                color={focused ? theme.colors.primary : color}
                focused={focused}
              />
            </View>
          ),
        }}
        listeners={{
          tabPress: () => Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light),
        }}
      />
    </Tabs>
  );
}

const styles = StyleSheet.create({
  // Tab Bar Container (Glassmorphism)
  tabBar: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: 'transparent',
    borderTopWidth: 0,
    height: Platform.OS === 'ios' ? HP(10) : HP(8),
    paddingBottom: Platform.OS === 'ios' ? HP(2.5) : HP(1),
    paddingTop: HP(1),
    elevation: 0,
  },

  // Tab Bar Item
  tabBarItem: {
    paddingVertical: HP(0.5),
  },

  // Icon Wrapper (for animation)
  iconWrapper: {
    alignItems: 'center',
    justifyContent: 'center',
  },

  // Icon Container
  iconContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    width: HP(5.5),
    height: HP(5.5),
    borderRadius: theme.radius.full,
  },
  iconContainerActive: {
    backgroundColor: theme.colors.primaryContainer,
  },

  // Create Button (Center)
  createButton: {
    width: HP(6.5),
    height: HP(6.5),
    borderRadius: theme.radius.full,
    justifyContent: 'center',
    alignItems: 'center',
    ...theme.shadows.level4,
  },
  createButtonActive: {
    transform: [{ scale: 1.08 }],
    ...theme.shadows.level5,
  },
});
