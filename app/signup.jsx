/**
 * Signup Screen - Enhanced Edition
 * Beautiful registration with animations and enhanced UX
 * Features: Animated entrance, inline validation, haptic feedback
 */

import { LinearGradient } from 'expo-linear-gradient';
import { useRouter } from 'expo-router';
import { useEffect, useRef, useState } from 'react';
import { Alert, Pressable, StyleSheet, Text, View } from 'react-native';
import Animated, {
    useAnimatedStyle,
    useSharedValue,
    withSpring,
    withTiming,
} from 'react-native-reanimated';
import BackButton from '../components/BackButton';
import Button from '../components/Button';
import Input from '../components/Input';
import ScreenWrapper from '../components/ScreenWrapper';
import { theme } from '../constants/theme';
import { HP, WP } from '../helpers/common';
import { supabase } from '../helpers/supabase';

const Signup = () => {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [nameError, setNameError] = useState('');
  const [emailError, setEmailError] = useState('');
  const [passwordError, setPasswordError] = useState('');

  // Using useRef for performance
  const nameRef = useRef('');
  const emailRef = useRef('');
  const passwordRef = useRef('');

  // Animation values
  const headerOpacity = useSharedValue(0);
  const headerTranslateY = useSharedValue(-20);
  const formOpacity = useSharedValue(0);
  const formTranslateY = useSharedValue(30);

  useEffect(() => {
    // Entrance animations
    headerOpacity.value = withTiming(1, { duration: 600 });
    headerTranslateY.value = withSpring(0, { damping: 18 });

    setTimeout(() => {
      formOpacity.value = withTiming(1, { duration: 500 });
      formTranslateY.value = withSpring(0, { damping: 18 });
    }, 200);
  }, []);

  const handleSignup = async () => {
    const name = nameRef.current.trim();
    const email = emailRef.current.trim();
    const password = passwordRef.current;

    // Reset errors
    setNameError('');
    setEmailError('');
    setPasswordError('');

    // Validation
    if (!name) {
      setNameError('Name is required');
      return;
    }

    if (name.length < 2) {
      setNameError('Name must be at least 2 characters');
      return;
    }

    if (!email) {
      setEmailError('Email is required');
      return;
    }

    if (!email.includes('@')) {
      setEmailError('Please enter a valid email address');
      return;
    }

    if (!password) {
      setPasswordError('Password is required');
      return;
    }

    if (password.length < 6) {
      setPasswordError('Password must be at least 6 characters');
      return;
    }

    setLoading(true);

    try {
      // Create user with Supabase
      const { data, error } = await supabase.auth.signUp({
        email,
        password,
        options: {
          data: {
            name, // Store name in user metadata
          },
        },
      });

      if (error) {
        let errorMessage = error.message;

        // Provide helpful error messages
        if (error.message.includes('User already registered')) {
          errorMessage = 'An account with this email already exists. Please log in instead.';
        } else if (error.message.includes('Password should be')) {
          errorMessage = 'Password must be at least 6 characters long.';
        } else if (error.message.includes('Invalid email')) {
          errorMessage = 'Please enter a valid email address.';
        }

        Alert.alert('Signup Failed', errorMessage);
        return;
      }

      // Success - redirect to home
      console.log('Signup successful:', data.user?.email);
      // AuthContext will handle navigation via index.jsx automatically
    } catch (error) {
      console.error('Signup error:', error);
      Alert.alert('Signup Failed', error.message || 'An unexpected error occurred. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const headerAnimatedStyle = useAnimatedStyle(() => ({
    opacity: headerOpacity.value,
    transform: [{ translateY: headerTranslateY.value }],
  }));

  const formAnimatedStyle = useAnimatedStyle(() => ({
    opacity: formOpacity.value,
    transform: [{ translateY: formTranslateY.value }],
  }));

  return (
    <ScreenWrapper bg={theme.colors.background}>
      <LinearGradient
        colors={['#FFFFFF', '#F0F9FF', '#E0F2FE']}
        style={styles.gradientBackground}
        start={{ x: 0, y: 0 }}
        end={{ x: 0, y: 1 }}
      >
        <View style={styles.container}>
          {/* Header */}
          <View style={styles.header}>
            <BackButton />
          </View>

          {/* Content */}
          <View style={styles.content}>
            {/* Title Section with Animation */}
            <Animated.View style={[styles.titleSection, headerAnimatedStyle]}>
              <Text style={styles.welcomeText}>Let's</Text>
              <Text style={styles.title}>Get Started</Text>
              <Text style={styles.subtitle}>
                Create an account to continue
              </Text>
              <View style={styles.titleDivider} />
            </Animated.View>

            {/* Form Section with Animation */}
            <Animated.View style={[styles.form, formAnimatedStyle]}>
              <Input
                icon="User"
                placeholder="Full name"
                onChangeText={(value) => {
                  nameRef.current = value;
                  setNameError('');
                }}
                autoCapitalize="words"
                autoComplete="name"
                error={!!nameError}
                errorMessage={nameError}
              />

              <Input
                icon="Mail"
                placeholder="Email address"
                onChangeText={(value) => {
                  emailRef.current = value;
                  setEmailError('');
                }}
                keyboardType="email-address"
                autoCapitalize="none"
                autoComplete="email"
                error={!!emailError}
                errorMessage={emailError}
              />

              <Input
                icon="Lock"
                placeholder="Password (min 6 characters)"
                secureTextEntry
                onChangeText={(value) => {
                  passwordRef.current = value;
                  setPasswordError('');
                }}
                autoComplete="password-new"
                error={!!passwordError}
                errorMessage={passwordError}
              />

              {/* Terms & Conditions */}
              <View style={styles.termsContainer}>
                <Text style={styles.termsText}>
                  By signing up, you agree to our{' '}
                  <Text style={styles.termsLink}>Terms of Service</Text>
                  {' '}and{' '}
                  <Text style={styles.termsLink}>Privacy Policy</Text>
                </Text>
              </View>

              {/* Signup Button */}
              <Button
                title="Sign Up"
                onPress={handleSignup}
                loading={loading}
                buttonStyle={styles.signupButton}
              />
            </Animated.View>

            {/* Footer */}
            <View style={styles.footer}>
              <Text style={styles.footerText}>Already have an account? </Text>
              <Pressable onPress={() => router.push('/login')}>
                <Text style={styles.footerLink}>Login</Text>
              </Pressable>
            </View>
          </View>
        </View>
      </LinearGradient>
    </ScreenWrapper>
  );
};

const styles = StyleSheet.create({
  gradientBackground: {
    flex: 1,
  },
  container: {
    flex: 1,
    paddingHorizontal: WP(5),
  },
  header: {
    paddingTop: HP(2),
    marginBottom: HP(2),
  },
  content: {
    flex: 1,
    gap: HP(4),
  },
  titleSection: {
    marginBottom: HP(4),
  },
  welcomeText: {
    fontSize: HP(3.2),
    fontWeight: theme.fonts.semibold,
    color: theme.colors.textLight,
  },
  title: {
    fontSize: HP(5),
    fontWeight: theme.fonts.extrabold,
    color: theme.colors.text,
    marginBottom: HP(1),
    letterSpacing: -0.5,
  },
  subtitle: {
    fontSize: HP(2),
    fontWeight: theme.fonts.medium,
    color: theme.colors.textSecondary,
    marginBottom: HP(1),
  },
  titleDivider: {
    width: WP(12),
    height: 4,
    backgroundColor: theme.colors.primary,
    borderRadius: theme.radius.full,
    marginTop: HP(1),
  },
  form: {
    gap: HP(2.5),
  },
  termsContainer: {
    paddingHorizontal: WP(2),
    marginTop: HP(1),
  },
  termsText: {
    fontSize: HP(1.6),
    fontWeight: theme.fonts.medium,
    color: theme.colors.textSecondary,
    textAlign: 'center',
    lineHeight: HP(2.2),
  },
  termsLink: {
    fontWeight: theme.fonts.bold,
    color: theme.colors.primary,
  },
  signupButton: {
    marginTop: HP(1),
    ...theme.shadows.level3,
  },
  footer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: HP(3),
  },
  footerText: {
    fontSize: HP(1.9),
    fontWeight: theme.fonts.medium,
    color: theme.colors.textSecondary,
  },
  footerLink: {
    fontSize: HP(1.9),
    fontWeight: theme.fonts.bold,
    color: theme.colors.primary,
    textDecorationLine: 'underline',
  },
});

export default Signup;
