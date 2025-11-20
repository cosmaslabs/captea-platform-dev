/**
 * EmptyState Component - Enhanced Edition
 * Beautiful empty state with animations and custom illustrations
 * Features: Lottie-style animations, gradient backgrounds, CTAs
 *
 * @param {string} icon - Icon name to display
 * @param {string} title - Primary heading text
 * @param {string} message - Descriptive message text
 * @param {string} actionTitle - CTA button text
 * @param {function} onAction - Callback when CTA pressed
 * @param {string} variant - Visual variant ('default', 'search', 'error', 'success')
 */

import { LinearGradient } from 'expo-linear-gradient';
import { useEffect } from 'react';
import { Pressable, StyleSheet, Text, View } from 'react-native';
import Animated, {
    Easing,
    useAnimatedStyle,
    useSharedValue,
    withRepeat,
    withSequence,
    withSpring,
    withTiming,
} from 'react-native-reanimated';
import Icon from '../assets/icons';
import { theme } from '../constants/theme';
import { HP, WP } from '../helpers/common';

const EmptyState = ({
  icon = 'FileQuestion',
  title = 'Nothing to see here',
  message = 'There are no items to display at the moment.',
  actionTitle = null,
  onAction = null,
  variant = 'default',
}) => {
  // Animation values
  const iconScale = useSharedValue(0);
  const iconRotation = useSharedValue(0);
  const floatAnimation = useSharedValue(0);
  const contentOpacity = useSharedValue(0);
  const contentTranslateY = useSharedValue(20);

  useEffect(() => {
    // Icon entrance
    iconScale.value = withSpring(1, { damping: 12, stiffness: 100 });
    iconRotation.value = withSequence(
      withSpring(-5, { damping: 10 }),
      withSpring(0, { damping: 15 })
    );

    // Content entrance
    setTimeout(() => {
      contentOpacity.value = withTiming(1, { duration: 500 });
      contentTranslateY.value = withSpring(0, { damping: 18 });
    }, 200);

    // Continuous float animation
    floatAnimation.value = withRepeat(
      withSequence(
        withTiming(10, { duration: 2500, easing: Easing.inOut(Easing.sine) }),
        withTiming(0, { duration: 2500, easing: Easing.inOut(Easing.sine) })
      ),
      -1,
      false
    );
  }, []);

  const iconAnimatedStyle = useAnimatedStyle(() => ({
    transform: [
      { scale: iconScale.value },
      { rotate: `${iconRotation.value}deg` },
      { translateY: floatAnimation.value },
    ],
  }));

  const contentAnimatedStyle = useAnimatedStyle(() => ({
    opacity: contentOpacity.value,
    transform: [{ translateY: contentTranslateY.value }],
  }));

  // Get variant-specific colors
  const getVariantColors = () => {
    switch (variant) {
      case 'search':
        return {
          gradient: theme.gradients.cool,
          iconColor: theme.colors.info,
          containerBg: theme.colors.infoContainer,
        };
      case 'error':
        return {
          gradient: theme.gradients.error,
          iconColor: theme.colors.error,
          containerBg: theme.colors.errorContainer,
        };
      case 'success':
        return {
          gradient: theme.gradients.success,
          iconColor: theme.colors.success,
          containerBg: theme.colors.successContainer,
        };
      default:
        return {
          gradient: theme.gradients.primary,
          iconColor: theme.colors.primary,
          containerBg: theme.colors.primaryContainer,
        };
    }
  };

  const variantColors = getVariantColors();

  return (
    <View style={styles.container}>
      {/* Icon Container with Gradient */}
      <Animated.View style={[styles.iconContainer, iconAnimatedStyle]}>
        <LinearGradient
          colors={variantColors.gradient}
          style={styles.iconGradient}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 1 }}
        >
          <Icon
            name={icon}
            size={HP(8)}
            color={theme.colors.surface}
            strokeWidth={1.5}
          />
        </LinearGradient>
      </Animated.View>

      {/* Content */}
      <Animated.View style={[styles.content, contentAnimatedStyle]}>
        <Text style={styles.title}>{title}</Text>
        <Text style={styles.message}>{message}</Text>

        {/* Optional Action Button */}
        {actionTitle && onAction && (
          <Pressable
            style={({ pressed }) => [
              styles.actionButton,
              { backgroundColor: variantColors.containerBg },
              pressed && styles.actionButtonPressed,
            ]}
            onPress={onAction}
          >
            <Text style={[styles.actionText, { color: variantColors.iconColor }]}>
              {actionTitle}
            </Text>
          </Pressable>
        )}
      </Animated.View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: WP(8),
    paddingVertical: HP(10),
  },
  iconContainer: {
    width: HP(18),
    height: HP(18),
    borderRadius: HP(9),
    marginBottom: HP(3),
    ...theme.shadows.level4,
  },
  iconGradient: {
    width: '100%',
    height: '100%',
    borderRadius: HP(9),
    justifyContent: 'center',
    alignItems: 'center',
  },
  content: {
    alignItems: 'center',
  },
  title: {
    fontSize: HP(2.8),
    fontWeight: theme.fonts.bold,
    color: theme.colors.text,
    textAlign: 'center',
    marginBottom: HP(1),
  },
  message: {
    fontSize: HP(1.9),
    fontWeight: theme.fonts.medium,
    color: theme.colors.textSecondary,
    textAlign: 'center',
    lineHeight: HP(2.8),
    marginBottom: HP(3),
  },
  actionButton: {
    paddingVertical: HP(1.8),
    paddingHorizontal: WP(8),
    borderRadius: theme.radius.xl,
    marginTop: HP(1),
    ...theme.shadows.level2,
  },
  actionButtonPressed: {
    opacity: 0.7,
    transform: [{ scale: 0.97 }],
  },
  actionText: {
    fontSize: HP(1.9),
    fontWeight: theme.fonts.bold,
    textAlign: 'center',
  },
});

export default EmptyState;
