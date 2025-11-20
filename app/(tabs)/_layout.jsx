/**
 * Tab Navigation Layout - Facebook/WhatsApp Premium Design
 * World-class bottom navigation with filled icons and smooth animations
 * Features:
 * - Filled icons for active states (Facebook/WhatsApp style)
 * - Glassmorphism with border separator
 * - Smooth scale and color transitions
 * - Haptic feedback on every interaction
 * - Material Design 3 + Apple HCI principles
 */

import { BlurView } from 'expo-blur';
import * as Haptics from 'expo-haptics';
import { LinearGradient } from 'expo-linear-gradient';
import { Tabs } from 'expo-router';
import { useEffect } from 'react';
import { Platform, StyleSheet, View } from 'react-native';
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withSpring,
  withTiming,
} from 'react-native-reanimated';
import Icon from '../../assets/icons/IconEnhanced';
import { theme } from '../../constants/theme';
import { HP, WP } from '../../helpers/common';

// Enhanced Animated Tab Icon Component - Facebook/WhatsApp style
const AnimatedTabIcon = ({ name, size, color, focused, filled }) => {
  const scale = useSharedValue(focused ? 1 : 0.95);
  const opacity = useSharedValue(focused ? 1 : 0.7);

  useEffect(() => {
    if (focused) {
      scale.value = withSpring(1.05, theme.spring.snappy);
      opacity.value = withTiming(1, { duration: 200 });
    } else {
      scale.value = withSpring(0.95, theme.spring.gentle);
      opacity.value = withTiming(0.7, { duration: 200 });
    }
  }, [focused]);

  const animatedStyle = useAnimatedStyle(() => ({
    transform: [{ scale: scale.value }],
    opacity: opacity.value,
  }));

  return (
    <Animated.View style={[styles.iconWrapper, animatedStyle]}>
      <Icon
        name={name}
        size={size}
        color={color}
        strokeWidth={focused ? 2.5 : 2}
        filled={filled && focused}
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
            <View style={styles.iconContainer}>
              <AnimatedTabIcon
                name="Home"
                size={24}
                color={focused ? theme.colors.primary : theme.colors.textSecondary}
                focused={focused}
                filled={true}
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
            <View style={styles.iconContainer}>
              <AnimatedTabIcon
                name="MessageCircle"
                size={24}
                color={focused ? theme.colors.primary : theme.colors.textSecondary}
                focused={focused}
                filled={true}
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
            <View style={styles.createButtonContainer}>
              <LinearGradient
                colors={theme.gradients.primary}
                style={[styles.createButton, focused && styles.createButtonFocused]}
                start={{ x: 0, y: 0 }}
                end={{ x: 1, y: 1 }}
              >
                <Icon
                  name="Plus"
                  size={26}
                  color={theme.colors.onPrimary}
                  strokeWidth={3}
                />
              </LinearGradient>
            </View>
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
            <View style={styles.iconContainer}>
              <AnimatedTabIcon
                name="Bell"
                size={24}
                color={focused ? theme.colors.primary : theme.colors.textSecondary}
                focused={focused}
                filled={true}
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
            <View style={styles.iconContainer}>
              <AnimatedTabIcon
                name="User"
                size={24}
                color={focused ? theme.colors.primary : theme.colors.textSecondary}
                focused={focused}
                filled={true}
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
  // Tab Bar Container - Facebook/WhatsApp inspired
  tabBar: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: 'transparent',
    borderTopWidth: 0.5,
    borderTopColor: theme.colors.dividerLight,
    height: Platform.OS === 'ios' ? HP(10) : HP(8),
    paddingBottom: Platform.OS === 'ios' ? HP(2.5) : HP(1.2),
    paddingTop: HP(1.2),
    paddingHorizontal: WP(2),
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
    width: HP(5),
    height: HP(5),
    borderRadius: theme.radius.medium,
  },

  // Create Button Container
  createButtonContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: HP(0.5),
  },

  // Create Button - Prominent gradient button
  createButton: {
    width: HP(6),
    height: HP(6),
    borderRadius: theme.radius.full,
    justifyContent: 'center',
    alignItems: 'center',
    ...theme.shadows.level3,
  },
  createButtonFocused: {
    transform: [{ scale: 1.05 }],
    ...theme.shadows.level4,
  },
});
