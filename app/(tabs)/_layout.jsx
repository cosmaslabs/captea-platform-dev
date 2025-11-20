/**
 * Tab Navigation Layout
 * Bottom tab navigator with Home, Create, Notifications, Profile
 */

import { Tabs } from 'expo-router';
import { StyleSheet } from 'react-native';
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
        tabBarInactiveTintColor: theme.colors.textLight,
        tabBarShowLabel: true,
        tabBarLabelStyle: styles.tabBarLabel,
      }}
    >
      <Tabs.Screen
        name="home"
        options={{
          title: 'Home',
          tabBarIcon: ({ color, focused }) => (
            <Icon
              name="Home"
              size={26}
              color={color}
              strokeWidth={focused ? 2.5 : 1.6}
            />
          ),
        }}
      />

      <Tabs.Screen
        name="create"
        options={{
          title: 'Create',
          tabBarIcon: ({ color, focused }) => (
            <Icon
              name="Plus"
              size={26}
              color={color}
              strokeWidth={focused ? 2.5 : 1.6}
            />
          ),
        }}
      />

      <Tabs.Screen
        name="notifications"
        options={{
          title: 'Notifications',
          tabBarIcon: ({ color, focused }) => (
            <Icon
              name="Bell"
              size={26}
              color={color}
              strokeWidth={focused ? 2.5 : 1.6}
            />
          ),
        }}
      />

      <Tabs.Screen
        name="profile"
        options={{
          title: 'Profile',
          tabBarIcon: ({ color, focused }) => (
            <Icon
              name="User"
              size={26}
              color={color}
              strokeWidth={focused ? 2.5 : 1.6}
            />
          ),
        }}
      />
    </Tabs>
  );
}

const styles = StyleSheet.create({
  tabBar: {
    backgroundColor: theme.colors.background,
    borderTopWidth: 1,
    borderTopColor: theme.colors.border,
    height: HP(8),
    paddingBottom: HP(1),
    paddingTop: HP(1),
  },
  tabBarLabel: {
    fontSize: HP(1.4),
    fontWeight: theme.fonts.medium,
  },
});
