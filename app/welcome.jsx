/**
 * Welcome Screen - Enhanced Edition
 * Stunning onboarding with gradients, animations, and micro-interactions
 * Features: Floating animations, gradient backgrounds, parallax effects
 */

import { LinearGradient } from 'expo-linear-gradient';
import { useRouter } from 'expo-router';
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
import Button from '../components/Button';
import ScreenWrapper from '../components/ScreenWrapper';
import { theme } from '../constants/theme';
import { HP, WP } from '../helpers/common';

const Welcome = () => {
  const router = useRouter();

  // Animation values
  const logoScale = useSharedValue(0);
  const logoRotation = useSharedValue(0);
  const titleOpacity = useSharedValue(0);
  const titleTranslateY = useSharedValue(30);
  const featuresOpacity = useSharedValue(0);
  const featuresTranslateY = useSharedValue(20);
  const ctaOpacity = useSharedValue(0);
  const ctaTranslateY = useSharedValue(30);
  const floatAnimation = useSharedValue(0);

  useEffect(() => {
    // Sequence entrance animations
    logoScale.value = withSpring(1, { damping: 15, stiffness: 100 });
    logoRotation.value = withSequence(
      withSpring(-10, { damping: 10 }),
      withSpring(0, { damping: 15 })
    );

    titleOpacity.value = withTiming(1, { duration: 600, easing: Easing.out(Easing.cubic) });
    titleTranslateY.value = withSpring(0, { damping: 20, stiffness: 90 });

    setTimeout(() => {
      featuresOpacity.value = withTiming(1, { duration: 500 });
      featuresTranslateY.value = withSpring(0, { damping: 18 });
    }, 300);

    setTimeout(() => {
      ctaOpacity.value = withTiming(1, { duration: 500 });
      ctaTranslateY.value = withSpring(0, { damping: 18 });
    }, 600);

    // Continuous floating animation
    floatAnimation.value = withRepeat(
      withSequence(
        withTiming(10, { duration: 2000, easing: Easing.inOut(Easing.sine) }),
        withTiming(0, { duration: 2000, easing: Easing.inOut(Easing.sine) })
      ),
      -1,
      false
    );
  }, []);

  const logoAnimatedStyle = useAnimatedStyle(() => ({
    transform: [
      { scale: logoScale.value },
      { rotate: `${logoRotation.value}deg` },
      { translateY: floatAnimation.value },
    ],
  }));

  const titleAnimatedStyle = useAnimatedStyle(() => ({
    opacity: titleOpacity.value,
    transform: [{ translateY: titleTranslateY.value }],
  }));

  const featuresAnimatedStyle = useAnimatedStyle(() => ({
    opacity: featuresOpacity.value,
    transform: [{ translateY: featuresTranslateY.value }],
  }));

  const ctaAnimatedStyle = useAnimatedStyle(() => ({
    opacity: ctaOpacity.value,
    transform: [{ translateY: ctaTranslateY.value }],
  }));

  return (
    <ScreenWrapper bg={theme.colors.background}>
      <LinearGradient
        colors={['#FFFFFF', '#FFEBF0', '#FFF5F7']}
        style={styles.gradientBackground}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 1 }}
      >
        <View style={styles.container}>
          {/* Hero Section */}
          <View style={styles.heroSection}>
            {/* Animated Logo */}
            <Animated.View style={[styles.logoPlaceholder, logoAnimatedStyle]}>
              <LinearGradient
                colors={theme.gradients.warm}
                style={styles.logoGradient}
                start={{ x: 0, y: 0 }}
                end={{ x: 1, y: 1 }}
              >
                <Text style={styles.logoEmoji}>📱</Text>
              </LinearGradient>
            </Animated.View>

            {/* Branding */}
            <Animated.View style={[styles.brandingContainer, titleAnimatedStyle]}>
              <Text style={styles.title}>Captea</Text>
              <Text style={styles.tagline}>Connect. Share. Inspire.</Text>
              <View style={styles.taglineDivider} />
            </Animated.View>
          </View>

          {/* Feature Highlights */}
          <Animated.View style={[styles.featuresContainer, featuresAnimatedStyle]}>
            <FeatureItem emoji="💬" text="Share your moments" delay={0} />
            <FeatureItem emoji="❤️" text="Connect with friends" delay={100} />
            <FeatureItem emoji="🎨" text="Express yourself" delay={200} />
          </Animated.View>

          {/* CTA Section */}
          <Animated.View style={[styles.ctaContainer, ctaAnimatedStyle]}>
            <Button
              title="Get Started"
              onPress={() => router.push('/login')}
              buttonStyle={styles.primaryButton}
            />

            <View style={styles.signupPrompt}>
              <Text style={styles.signupText}>Don't have an account? </Text>
              <Pressable onPress={() => router.push('/signup')}>
                <Text style={styles.signupLink}>Sign Up</Text>
              </Pressable>
            </View>
          </Animated.View>
        </View>
      </LinearGradient>
    </ScreenWrapper>
  );
};

// Enhanced Feature Item with entrance animation
const FeatureItem = ({ emoji, text, delay }) => {
  const scale = useSharedValue(0);
  const opacity = useSharedValue(0);

  useEffect(() => {
    setTimeout(() => {
      scale.value = withSpring(1, { damping: 12, stiffness: 100 });
      opacity.value = withTiming(1, { duration: 400 });
    }, delay);
  }, [delay]);

  const animatedStyle = useAnimatedStyle(() => ({
    transform: [{ scale: scale.value }],
    opacity: opacity.value,
  }));

  return (
    <Animated.View style={[styles.featureItem, animatedStyle]}>
      <View style={styles.featureIconContainer}>
        <Text style={styles.featureEmoji}>{emoji}</Text>
      </View>
      <Text style={styles.featureText}>{text}</Text>
    </Animated.View>
  );
};

const styles = StyleSheet.create({
  gradientBackground: {
    flex: 1,
  },
  container: {
    flex: 1,
    justifyContent: 'space-between',
    paddingHorizontal: WP(5),
    paddingBottom: HP(5),
  },
  heroSection: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: HP(-3),
  },
  logoPlaceholder: {
    width: HP(22),
    height: HP(22),
    borderRadius: HP(11),
    marginBottom: HP(4),
    ...theme.shadows.level5,
  },
  logoGradient: {
    width: '100%',
    height: '100%',
    borderRadius: HP(11),
    justifyContent: 'center',
    alignItems: 'center',
  },
  logoEmoji: {
    fontSize: HP(10),
  },
  brandingContainer: {
    alignItems: 'center',
  },
  title: {
    fontSize: HP(6),
    fontWeight: theme.fonts.extrabold,
    color: theme.colors.primary,
    marginBottom: HP(1.5),
    letterSpacing: -0.5,
  },
  tagline: {
    fontSize: HP(2.2),
    fontWeight: theme.fonts.semibold,
    color: theme.colors.textSecondary,
    marginBottom: HP(1),
  },
  taglineDivider: {
    width: WP(15),
    height: 4,
    backgroundColor: theme.colors.primary,
    borderRadius: theme.radius.full,
    marginTop: HP(1.5),
  },
  featuresContainer: {
    gap: HP(2.5),
    marginBottom: HP(4),
  },
  featureItem: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: theme.colors.surface,
    paddingVertical: HP(2),
    paddingHorizontal: WP(5),
    borderRadius: theme.radius.xl,
    ...theme.shadows.level2,
  },
  featureIconContainer: {
    width: HP(5.5),
    height: HP(5.5),
    borderRadius: HP(2.75),
    backgroundColor: theme.colors.primaryContainer,
    justifyContent: 'center',
    alignItems: 'center',
  },
  featureEmoji: {
    fontSize: HP(3),
  },
  featureText: {
    fontSize: HP(1.9),
    fontWeight: theme.fonts.semibold,
    color: theme.colors.text,
    flex: 1,
  },
  ctaContainer: {
    gap: HP(2.5),
  },
  primaryButton: {
    ...theme.shadows.level3,
  },
  signupPrompt: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  signupText: {
    fontSize: HP(1.9),
    fontWeight: theme.fonts.medium,
    color: theme.colors.textSecondary,
  },
  signupLink: {
    fontSize: HP(1.9),
    fontWeight: theme.fonts.bold,
    color: theme.colors.primary,
    textDecorationLine: 'underline',
  },
});

export default Welcome;
