/**
 * Loading Component
 * Displays a centered loading indicator with theme-aware styling
 * Used across the app for loading states
 *
 * @param {string} size - Size of the indicator ('small' | 'large')
 * @param {string} color - Color of the indicator (defaults to primary theme color)
 */

import { ActivityIndicator, StyleSheet, View } from 'react-native';
import { theme } from '../constants/theme';

const Loading = ({ size = 'large', color = theme.colors.primary }) => {
  return (
    <View style={styles.container}>
      <ActivityIndicator size={size} color={color} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default Loading;
