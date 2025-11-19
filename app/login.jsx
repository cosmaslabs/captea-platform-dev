/**
 * Login Screen
 * User authentication - email and password login
 * Uses useRef for form inputs (performance optimization)
 */

import { useRouter } from 'expo-router';
import { useRef, useState } from 'react';
import { Alert, Pressable, StyleSheet, Text, View } from 'react-native';
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

  // Using useRef for performance (as per copilot-instructions.md)
  const emailRef = useRef('');
  const passwordRef = useRef('');

  const handleLogin = async () => {
    const email = emailRef.current.trim();
    const password = passwordRef.current;

    // Validation
    if (!email || !password) {
      Alert.alert('Login Failed', 'Please fill all fields');
      return;
    }

    if (!email.includes('@')) {
      Alert.alert('Invalid Email', 'Please enter a valid email address');
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

  return (
    <ScreenWrapper bg={theme.colors.background}>
      <View style={styles.container}>
        {/* Header */}
        <View style={styles.header}>
          <BackButton />
        </View>

        {/* Content */}
        <View style={styles.content}>
          {/* Title Section */}
          <View style={styles.titleSection}>
            <Text style={styles.welcomeText}>Hey,</Text>
            <Text style={styles.title}>Welcome Back!</Text>
            <Text style={styles.subtitle}>
              Please login to continue
            </Text>
          </View>

          {/* Form Section */}
          <View style={styles.form}>
            <Input
              icon="Mail"
              placeholder="Email address"
              onChangeText={(value) => (emailRef.current = value)}
              keyboardType="email-address"
              autoCapitalize="none"
              autoComplete="email"
            />

            <Input
              icon="Lock"
              placeholder="Password"
              secureTextEntry
              onChangeText={(value) => (passwordRef.current = value)}
              autoComplete="password"
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
            />
          </View>

          {/* Footer */}
          <View style={styles.footer}>
            <Text style={styles.footerText}>Don't have an account? </Text>
            <Pressable onPress={() => router.push('/signup')}>
              <Text style={styles.footerLink}>Sign Up</Text>
            </Pressable>
          </View>
        </View>
      </View>
    </ScreenWrapper>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: WP(5),
  },
  header: {
    paddingTop: HP(2),
    marginBottom: HP(3),
  },
  content: {
    flex: 1,
    gap: HP(4),
  },
  titleSection: {
    gap: HP(0.5),
  },
  welcomeText: {
    fontSize: HP(3.5),
    fontWeight: theme.fonts.medium,
    color: theme.colors.text,
  },
  title: {
    fontSize: HP(4),
    fontWeight: theme.fonts.extrabold,
    color: theme.colors.text,
  },
  subtitle: {
    fontSize: HP(2),
    fontWeight: theme.fonts.medium,
    color: theme.colors.textLight,
    marginTop: HP(1),
  },
  form: {
    gap: HP(2),
  },
  forgotPassword: {
    alignSelf: 'flex-end',
  },
  forgotPasswordText: {
    fontSize: HP(1.8),
    fontWeight: theme.fonts.semibold,
    color: theme.colors.primary,
  },
  footer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: HP(3),
  },
  footerText: {
    fontSize: HP(1.8),
    fontWeight: theme.fonts.medium,
    color: theme.colors.textLight,
  },
  footerLink: {
    fontSize: HP(1.8),
    fontWeight: theme.fonts.bold,
    color: theme.colors.primary,
  },
});

export default Login;
