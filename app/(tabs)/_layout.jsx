/**
 * Tab Navigation Layout
 * Instagram/WhatsApp-inspired bottom navigation
 * Material You 3 design with Substack aesthetics
 */

import { Tabs } from 'expo-router';
import { Platform, StyleSheet, View } from 'react-native';
import Icon from '../../assets/icons';
import { theme } from '../../constants/theme';
import { HP } from '../../helpers/common';

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
        tabBarIconStyle: styles.tabBarIcon,
      }}
    >
      <Tabs.Screen
        name="home"
        options={{
          title: 'Home',
          tabBarIcon: ({ color, focused }) => (
            <View style={[styles.iconContainer, focused && styles.iconContainerActive]}>
              <Icon
                name="Home"
                size={24}
                color={focused ? theme.colors.primary : color}
                strokeWidth={focused ? 2.5 : 1.8}
              />
            </View>
          ),
        }}
      />

      <Tabs.Screen
        name="messages"
        options={{
          title: 'Messages',
          tabBarIcon: ({ color, focused }) => (
            <View style={[styles.iconContainer, focused && styles.iconContainerActive]}>
              <Icon
                name="MessageCircle"
                size={24}
                color={focused ? theme.colors.primary : color}
                strokeWidth={focused ? 2.5 : 1.8}
              />
            </View>
          ),
        }}
      />

      <Tabs.Screen
        name="create"
        options={{
          title: 'Create',
          tabBarIcon: ({ color, focused }) => (
            <View style={[styles.iconContainer, styles.createButton, focused && styles.createButtonActive]}>
              <Icon
                name="Plus"
                size={24}
                color={theme.colors.onPrimary}
                strokeWidth={2.5}
              />
            </View>
          ),
        }}
      />

      <Tabs.Screen
        name="notifications"
        options={{
          title: 'Notifications',
          tabBarIcon: ({ color, focused }) => (
            <View style={[styles.iconContainer, focused && styles.iconContainerActive]}>
              <Icon
                name="Bell"
                size={24}
                color={focused ? theme.colors.primary : color}
                strokeWidth={focused ? 2.5 : 1.8}
              />
            </View>
          ),
        }}
      />

      <Tabs.Screen
        name="profile"
        options={{
          title: 'Profile',
          tabBarIcon: ({ color, focused }) => (
            <View style={[styles.iconContainer, focused && styles.iconContainerActive]}>
              <Icon
                name="User"
                size={24}
                color={focused ? theme.colors.primary : color}
                strokeWidth={focused ? 2.5 : 1.8}
              />
            </View>
          ),
        }}
      />
    </Tabs>
  );
}

const styles = StyleSheet.create({
  tabBar: {
    backgroundColor: theme.colors.surface,
    borderTopWidth: 1,
    borderTopColor: theme.colors.outlineVariant,
    height: Platform.OS === 'ios' ? HP(10) : HP(8),
    paddingBottom: Platform.OS === 'ios' ? HP(3) : HP(1),
    paddingTop: HP(1),
    ...theme.shadows.level2,
  },
  tabBarItem: {
    paddingVertical: HP(0.5),
  },
  tabBarIcon: {
    marginTop: HP(0.5),
  },
  iconContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    width: HP(5),
    height: HP(5),
    borderRadius: theme.radius.medium,
  },
  iconContainerActive: {
    backgroundColor: theme.colors.primaryContainer,
  },
  createButton: {
    backgroundColor: theme.colors.primary,
    width: HP(6),
    height: HP(6),
    borderRadius: theme.radius.full,
    ...theme.shadows.level3,
  },
  createButtonActive: {
    backgroundColor: theme.colors.primaryDark,
    transform: [{ scale: 1.05 }],
  },
});
