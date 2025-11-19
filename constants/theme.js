/**
 * Theme configuration for Captea Platform
 * Defines colors, fonts, and design tokens used throughout the app
 */

export const theme = {
  colors: {
    // Primary brand colors
    primary: '#00C2FF',
    primaryDark: '#00A3E0',

    // Background colors
    background: '#FFFFFF',
    backgroundSecondary: '#F9FAFB',
    backgroundDark: '#1F2937',

    // Text colors
    text: '#1A1A1A',
    textLight: '#6B7280',
    textDark: '#111827',
    textWhite: '#FFFFFF',
    textDisabled: '#9CA3AF',

    // UI element colors
    border: '#E5E7EB',
    borderDark: '#D1D5DB',

    // Status colors
    success: '#10B981',
    error: '#EF4444',
    warning: '#F59E0B',
    info: '#3B82F6',

    // Social interaction colors
    like: '#EF4444',
    comment: '#6B7280',
    share: '#00C2FF',

    // Overlay colors
    overlay: 'rgba(0, 0, 0, 0.5)',
    overlayLight: 'rgba(0, 0, 0, 0.3)',
  },

  fonts: {
    // Font weights
    regular: '400',
    medium: '500',
    semibold: '600',
    bold: '700',
    extrabold: '800',
  },

  // Border radius values
  radius: {
    xs: 4,
    sm: 8,
    md: 12,
    lg: 16,
    xl: 20,
    doublexl: 24,
    full: 9999, // For circular elements
  },

  // Shadow styles for elevation
  shadows: {
    small: {
      shadowColor: '#000',
      shadowOffset: { width: 0, height: 1 },
      shadowOpacity: 0.05,
      shadowRadius: 2,
      elevation: 2,
    },
    medium: {
      shadowColor: '#000',
      shadowOffset: { width: 0, height: 2 },
      shadowOpacity: 0.1,
      shadowRadius: 4,
      elevation: 4,
    },
    large: {
      shadowColor: '#000',
      shadowOffset: { width: 0, height: 4 },
      shadowOpacity: 0.15,
      shadowRadius: 8,
      elevation: 8,
    },
  },
};
