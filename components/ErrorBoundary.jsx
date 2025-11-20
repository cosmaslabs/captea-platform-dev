/**
 * Error Boundary Component
 * Catches JavaScript errors anywhere in the child component tree
 * Displays a fallback UI instead of crashing the entire app
 */

import React from 'react';
import { Pressable, StyleSheet, Text, View } from 'react-native';
import { theme } from '../constants/theme';
import { HP, WP } from '../helpers/common';

class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false, error: null, errorInfo: null };
  }

  static getDerivedStateFromError(error) {
    return { hasError: true };
  }

  componentDidCatch(error, errorInfo) {
    // Log detailed error for debugging
    console.error('=== Error Boundary Caught Error ===');
    console.error('Error:', error);
    console.error('Error Info:', errorInfo);
    console.error('Stack:', error.stack);
    console.error('===================================');

    this.setState({
      error: error,
      errorInfo: errorInfo,
    });
  }

  handleReset = () => {
    this.setState({ hasError: false, error: null, errorInfo: null });
    // Reload the page on web
    if (typeof window !== 'undefined') {
      window.location.reload();
    }
  };

  render() {
    if (this.state.hasError) {
      const errorMessage = this.state.error ? this.state.error.toString() : 'Unknown error';
      const errorStack = this.state.error?.stack || '';

      return (
        <View style={styles.container}>
          <View style={styles.content}>
            <Text style={styles.emoji}>😕</Text>
            <Text style={styles.title}>Oops! Something went wrong</Text>
            <Text style={styles.message}>
              The app encountered an error. Don't worry, your data is safe.
            </Text>

            {this.state.error && (
              <View style={styles.errorDetails}>
                <Text style={styles.errorText}>
                  {errorMessage}
                </Text>
                {__DEV__ && errorStack && (
                  <Text style={[styles.errorText, { fontSize: HP(1.4), marginTop: 10 }]}>
                    {errorStack.split('\n').slice(0, 5).join('\n')}
                  </Text>
                )}
              </View>
            )}

            <Pressable style={styles.button} onPress={this.handleReset}>
              <Text style={styles.buttonText}>Try Again</Text>
            </Pressable>
          </View>
        </View>
      );
    }

    return this.props.children;
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: theme.colors.background,
    justifyContent: 'center',
    alignItems: 'center',
    padding: WP(5),
  },
  content: {
    alignItems: 'center',
    maxWidth: 400,
  },
  emoji: {
    fontSize: HP(8),
    marginBottom: HP(2),
  },
  title: {
    fontSize: HP(3),
    fontWeight: theme.fonts.bold,
    color: theme.colors.text,
    marginBottom: HP(1.5),
    textAlign: 'center',
  },
  message: {
    fontSize: HP(2),
    color: theme.colors.textLight,
    textAlign: 'center',
    marginBottom: HP(3),
    lineHeight: HP(2.8),
  },
  errorDetails: {
    backgroundColor: '#f5f5f5',
    padding: WP(4),
    borderRadius: theme.radius.md,
    marginBottom: HP(3),
    width: '100%',
  },
  errorText: {
    fontSize: HP(1.6),
    color: '#e74c3c',
    fontFamily: 'monospace',
  },
  button: {
    backgroundColor: theme.colors.primary,
    paddingHorizontal: WP(8),
    paddingVertical: HP(1.8),
    borderRadius: theme.radius.xl,
    shadowColor: theme.colors.primary,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 4,
  },
  buttonText: {
    color: 'white',
    fontSize: HP(2),
    fontWeight: theme.fonts.semibold,
  },
});

export default ErrorBoundary;
