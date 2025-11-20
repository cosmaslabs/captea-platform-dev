/**
 * Login Screen - Enhanced Edition
 * Beautiful authentication with animations and enhanced UX
 * Features: Animated entrance, focus states, better validation
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

const Login = () => {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [emailError, setEmailError] = useState('');
  const [passwordError, setPasswordError] = useState('');

  // Using useRef for performance
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

  const handleLogin = async () => {
    const email = emailRef.current.trim();
    const password = passwordRef.current;

    // Reset errors
    setEmailError('');
    setPasswordError('');

    // Validation
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
      // Supabase authentication
      const { data, error } = await supabase.auth.signInWithPassword({
        email,
        password,
      });

      if (error) {
        let errorMessage = error.message;

        // Provide helpful error messages
        if (error.message.includes('Invalid login credentials')) {
          errorMessage = 'Invalid email or password. Please check your credentials and try again.';
        } else if (error.message.includes('Email not confirmed')) {
          errorMessage = 'Please verify your email address before logging in.';
        } else if (error.message.includes('User not found')) {
          errorMessage = 'No account found with this email. Please sign up first.';
        }

        Alert.alert('Login Failed', errorMessage);
        return;
      }

      // Success - AuthContext will handle navigation via index.jsx
      console.log('Login successful:', data.user.email);
    } catch (error) {
      console.error('Login error:', error);
      Alert.alert('Login Failed', error.message || 'An unexpected error occurred. Please try again.');
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
        colors={['#FFFFFF', '#FFF5F7', '#FFEBF0']}
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
              <Text style={styles.welcomeText}>Hey,</Text>
              <Text style={styles.title}>Welcome Back!</Text>
              <Text style={styles.subtitle}>
                Please login to continue
              </Text>
              <View style={styles.titleDivider} />
            </Animated.View>

            {/* Form Section with Animation */}
            <Animated.View style={[styles.form, formAnimatedStyle]}>
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
                placeholder="Password"
                secureTextEntry
                onChangeText={(value) => {
                  passwordRef.current = value;
                  setPasswordError('');
                }}
                autoComplete="password"
                error={!!passwordError}
                errorMessage={passwordError}
              />

              {/* Forgot Password */}
              <Pressable style={styles.forgotPassword}>
                <Text style={styles.forgotPasswordText}>Forgot Password?</Text>
              </Pressable>

              {/* Login Button */}
              <Button
                title="Login"
                onPress={handleLogin}
                loading={loading}
                buttonStyle={styles.loginButton}
              />
            </Animated.View>

            {/* Footer */}
            <View style={styles.footer}>
              <Text style={styles.footerText}>Don't have an account? </Text>
              <Pressable onPress={() => router.push('/signup')}>
                <Text style={styles.footerLink}>Sign Up</Text>
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
    marginBottom: HP(5),
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
  forgotPassword: {
    alignSelf: 'flex-end',
    marginTop: HP(-1.5),
  },
  forgotPasswordText: {
    fontSize: HP(1.8),
    fontWeight: theme.fonts.bold,
    color: theme.colors.primary,
  },
  loginButton: {
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

export default Login;
