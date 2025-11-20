/**
 * Signup Screen
 * New user registration with name, email, and password
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

const Signup = () => {
  const router = useRouter();
  const [loading, setLoading] = useState(false);

  // Using useRef for performance (as per copilot-instructions.md)
  const nameRef = useRef('');
  const emailRef = useRef('');
  const passwordRef = useRef('');

  const handleSignup = async () => {
    const name = nameRef.current.trim();
    const email = emailRef.current.trim();
    const password = passwordRef.current;

    // Debug: Log values
    console.log('Signup attempt:', { name, email, password: '***' });

    // Validation
    if (!name || !email || !password) {
      Alert.alert('Signup Failed', 'Please fill all fields');
      return;
    }

    if (name.length < 2) {
      Alert.alert('Invalid Name', 'Name must be at least 2 characters');
      return;
    }

    if (!email.includes('@')) {
      Alert.alert('Invalid Email', 'Please enter a valid email address');
      return;
    }

    if (password.length < 6) {
      Alert.alert('Weak Password', 'Password must be at least 6 characters');
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
            <Text style={styles.welcomeText}>Let's</Text>
            <Text style={styles.title}>Get Started</Text>
            <Text style={styles.subtitle}>
              Create an account to continue
            </Text>
          </View>

          {/* Form Section */}
          <View style={styles.form}>
            <Input
              icon="User"
              placeholder="Full name"
              onChangeText={(value) => (nameRef.current = value)}
              autoCapitalize="words"
              autoComplete="name"
            />

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
              placeholder="Password (min 6 characters)"
              secureTextEntry
              onChangeText={(value) => (passwordRef.current = value)}
              autoComplete="password-new"
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
            />
          </View>

          {/* Footer */}
          <View style={styles.footer}>
            <Text style={styles.footerText}>Already have an account? </Text>
            <Pressable onPress={() => router.push('/login')}>
              <Text style={styles.footerLink}>Login</Text>
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
    gap: HP(3),
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
  termsContainer: {
    paddingHorizontal: WP(2),
  },
  termsText: {
    fontSize: HP(1.6),
    fontWeight: theme.fonts.medium,
    color: theme.colors.textLight,
    textAlign: 'center',
    lineHeight: HP(2.2),
  },
  termsLink: {
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

export default Signup;
