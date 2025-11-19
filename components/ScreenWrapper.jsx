/**
 * ScreenWrapper Component
 * Wraps screens with safe area padding to handle notches and status bars
 *
 * @param {React.ReactNode} children - Child components to render
 * @param {string} bg - Background color (defaults to white)
 */

import React from 'react';
import { View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

const ScreenWrapper = ({ children, bg = 'white' }) => {
  const { top } = useSafeAreaInsets();
  const paddingTop = top > 0 ? top + 5 : 30;

  return (
    <View style={{ flex: 1, paddingTop, backgroundColor: bg }}>
      {children}
    </View>
  );
};

export default ScreenWrapper;
