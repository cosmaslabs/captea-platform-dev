/**
 * Button Component
 * Animated button with haptic feedback and micro-interactions
 * Material You 3 design with advanced UX features
 *
 * @param {string} title - Button text label
 * @param {function} onPress - Callback function when button is pressed
 * @param {boolean} loading - Shows loading indicator when true, disables button
 * @param {boolean} hasShadow - Applies shadow/elevation when true (default: true)
 * @param {boolean} hapticFeedback - Enable haptic feedback on press (default: true)
 * @param {object} buttonStyle - Custom styles for button container
 * @param {object} textStyle - Custom styles for button text
 */

import * as Haptics from 'expo-haptics';
import { useEffect } from 'react';
import { ActivityIndicator, Pressable, StyleSheet, Text } from 'react-native';
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withSpring,
  withTiming,
} from 'react-native-reanimated';
import { theme } from '../constants/theme';
import { HP, WP } from '../helpers/common';

const AnimatedPressable = Animated.createAnimatedComponent(Pressable);

const Button = ({
  title,
  onPress,
  loading = false,
  hasShadow = true,
  hapticFeedback = true,
  buttonStyle,
  textStyle,
}) => {
  const scale = useSharedValue(1);
  const opacity = useSharedValue(1);

  // Determine shadow styles based on hasShadow prop
  const shadowStyle = hasShadow ? styles.shadow : {};

  // Handle press with loading state check and haptics
  const handlePress = async () => {
    if (!loading && onPress) {
      if (hapticFeedback) {
        await Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
      }
      onPress();
    }
  };

  const handlePressIn = () => {
    scale.value = withSpring(0.96, { damping: 15, stiffness: 150 });
    opacity.value = withTiming(0.8, { duration: 100 });
  };

  const handlePressOut = () => {
    scale.value = withSpring(1, { damping: 15, stiffness: 150 });
    opacity.value = withTiming(1, { duration: 150 });
  };

  useEffect(() => {
    if (loading) {
      opacity.value = withTiming(0.6, { duration: 200 });
    } else {
      opacity.value = withTiming(1, { duration: 200 });
    }
  }, [loading]);

  const animatedStyle = useAnimatedStyle(() => ({
    transform: [{ scale: scale.value }],
    opacity: opacity.value,
  }));

  return (
    <AnimatedPressable
      onPress={handlePress}
      onPressIn={handlePressIn}
      onPressOut={handlePressOut}
      disabled={loading}
      style={[
        styles.button,
        shadowStyle,
        buttonStyle,
        animatedStyle,
      ]}
    >
      {loading ? (
        <ActivityIndicator size="small" color={theme.colors.onPrimary} />
      ) : (
        <Text style={[styles.text, textStyle]}>{title}</Text>
      )}
    </AnimatedPressable>
  );
};

const styles = StyleSheet.create({
  button: {
    height: HP(6.5),
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: theme.radius.full,
    backgroundColor: theme.colors.primary,
    paddingHorizontal: WP(8),
  },
  text: {
    ...theme.typography.labelLarge,
    color: theme.colors.onPrimary,
  },
  shadow: {
    ...theme.shadows.level3,
  },
});

export default Button;
