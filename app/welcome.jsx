/**
 * Welcome Screen
 * First screen users see - onboarding entry point
 * Displays app branding and navigation to login
 */

import { useRouter } from 'expo-router';
import { Pressable, StyleSheet, Text, View } from 'react-native';
import Button from '../components/Button';
import ScreenWrapper from '../components/ScreenWrapper';
import { theme } from '../constants/theme';
import { HP, WP } from '../helpers/common';

const Welcome = () => {
  const router = useRouter();

  return (
    <ScreenWrapper bg={theme.colors.background}>
      <View style={styles.container}>
        {/* Hero Section */}
        <View style={styles.heroSection}>
          {/* App Logo/Illustration Placeholder */}
          <View style={styles.logoPlaceholder}>
            <Text style={styles.logoEmoji}>📱</Text>
          </View>

          {/* Branding */}
          <View style={styles.brandingContainer}>
            <Text style={styles.title}>Captea</Text>
            <Text style={styles.tagline}>Connect. Share. Inspire.</Text>
          </View>
        </View>

        {/* Feature Highlights */}
        <View style={styles.featuresContainer}>
          <FeatureItem emoji="💬" text="Share your moments" />
          <FeatureItem emoji="❤️" text="Connect with friends" />
          <FeatureItem emoji="🎨" text="Express yourself" />
        </View>

        {/* CTA Section */}
        <View style={styles.ctaContainer}>
          <Button
            title="Get Started"
            onPress={() => router.push('/login')}
          />

          <View style={styles.signupPrompt}>
            <Text style={styles.signupText}>Don't have an account? </Text>
            <Pressable onPress={() => router.push('/signup')}>
              <Text style={styles.signupLink}>Sign Up</Text>
            </Pressable>
          </View>
        </View>
      </View>
    </ScreenWrapper>
  );
};

// Feature Item Component
const FeatureItem = ({ emoji, text }) => (
  <View style={styles.featureItem}>
    <Text style={styles.featureEmoji}>{emoji}</Text>
    <Text style={styles.featureText}>{text}</Text>
  </View>
);

const styles = StyleSheet.create({
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
    marginTop: HP(-5),
  },
  logoPlaceholder: {
    width: HP(20),
    height: HP(20),
    borderRadius: HP(10),
    backgroundColor: theme.colors.primary,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: HP(3),
    shadowColor: theme.colors.text,
    shadowOffset: {
      width: 0,
      height: 8,
    },
    shadowOpacity: 0.15,
    shadowRadius: 16,
    elevation: 8,
  },
  logoEmoji: {
    fontSize: HP(8),
  },
  brandingContainer: {
    alignItems: 'center',
  },
  title: {
    fontSize: HP(5),
    fontWeight: theme.fonts.extrabold,
    color: theme.colors.text,
    marginBottom: HP(1),
  },
  tagline: {
    fontSize: HP(2),
    fontWeight: theme.fonts.medium,
    color: theme.colors.textLight,
  },
  featuresContainer: {
    gap: HP(2),
    marginBottom: HP(3),
  },
  featureItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: HP(1),
  },
  featureEmoji: {
    fontSize: HP(3),
    marginRight: WP(4),
  },
  featureText: {
    fontSize: HP(2),
    fontWeight: theme.fonts.medium,
    color: theme.colors.text,
  },
  ctaContainer: {
    gap: HP(2),
  },
  signupPrompt: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  signupText: {
    fontSize: HP(1.8),
    fontWeight: theme.fonts.medium,
    color: theme.colors.textLight,
  },
  signupLink: {
    fontSize: HP(1.8),
    fontWeight: theme.fonts.bold,
    color: theme.colors.primary,
  },
});

export default Welcome;
