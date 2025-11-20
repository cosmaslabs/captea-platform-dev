/**
 * Theme configuration for Captea Platform
 * Material You 3 inspired with Substack aesthetic
 * Instagram/WhatsApp-style dashboard design
 */

export const theme = {
  colors: {
    // Primary brand colors - Substack orange with Material You 3
    primary: '#FF6719',
    primaryLight: '#FF8547',
    primaryDark: '#E65100',
    primaryContainer: '#FFDBCC',
    onPrimary: '#FFFFFF',
    onPrimaryContainer: '#2E1500',

    // Secondary colors - Warm accent
    secondary: '#7D5260',
    secondaryLight: '#A67C89',
    secondaryDark: '#5D3A47',
    secondaryContainer: '#FFD9E3',
    onSecondary: '#FFFFFF',

    // Tertiary colors - Cool complement
    tertiary: '#006874',
    tertiaryLight: '#4F9AA3',
    tertiaryDark: '#004D57',
    tertiaryContainer: '#97F0FF',

    // Background colors - Clean and minimal
    background: '#FFFBFF',
    backgroundSecondary: '#F5F5F5',
    backgroundTertiary: '#FAFAFA',
    surface: '#FFFBFF',
    surfaceVariant: '#F2DFD1',
    surfaceDim: '#E0D9D0',
    surfaceBright: '#FFFFFF',

    // Text colors
    text: '#1C1B1E',
    textSecondary: '#49454E',
    textLight: '#79747E',
    textDark: '#000000',
    textWhite: '#FFFFFF',
    textDisabled: '#C4C6C6',
    onSurface: '#1C1B1E',
    onSurfaceVariant: '#524943',

    // Border & divider colors
    border: '#E7E0EB',
    borderLight: '#F4EFF4',
    borderDark: '#CAC4CF',
    outline: '#847875',
    outlineVariant: '#D7C2B9',

    // Status colors - Material You 3 semantic
    success: '#006E26',
    successContainer: '#95F7B4',
    error: '#BA1A1A',
    errorContainer: '#FFDAD6',
    warning: '#815600',
    warningContainer: '#FFDDB3',
    info: '#006495',
    infoContainer: '#C9E6FF',

    // Social interaction colors
    like: '#C00F17',
    likeActive: '#FF5449',
    comment: '#6B5D00',
    commentActive: '#FFC107',
    share: '#00668A',
    shareActive: '#00B4D8',

    // WhatsApp-inspired colors
    whatsappGreen: '#25D366',
    whatsappTeal: '#128C7E',
    whatsappLight: '#DCF8C6',

    // Instagram-inspired gradient
    instagramPink: '#E1306C',
    instagramPurple: '#833AB4',
    instagramOrange: '#FD1D1D',
    instagramYellow: '#FCAF45',

    // Overlay & scrim colors
    scrim: '#000000',
    overlay: 'rgba(0, 0, 0, 0.5)',
    overlayLight: 'rgba(0, 0, 0, 0.2)',
    overlayDark: 'rgba(0, 0, 0, 0.7)',

    // Elevation tints
    elevation1: 'rgba(103, 80, 164, 0.05)',
    elevation2: 'rgba(103, 80, 164, 0.08)',
    elevation3: 'rgba(103, 80, 164, 0.11)',
  },

  fonts: {
    // Font weights
    regular: '400',
    medium: '500',
    semibold: '600',
    bold: '700',
    extrabold: '800',
  },

  // Border radius - Material You 3 shape system
  radius: {
    none: 0,
    xs: 4,
    sm: 8,
    md: 12,
    lg: 16,
    xl: 20,
    xxl: 28,
    xxxl: 32,
    full: 9999,
    // Material You 3 shape tokens
    extraSmall: 4,
    small: 8,
    medium: 12,
    large: 16,
    extraLarge: 28,
  },

  // Spacing system - 4px base unit
  spacing: {
    xxs: 2,
    xs: 4,
    sm: 8,
    md: 12,
    lg: 16,
    xl: 20,
    xxl: 24,
    xxxl: 32,
    xxxxl: 40,
  },

  // Shadow styles - Material You 3 elevation
  shadows: {
    none: {
      shadowColor: 'transparent',
      shadowOffset: { width: 0, height: 0 },
      shadowOpacity: 0,
      shadowRadius: 0,
      elevation: 0,
    },
    level1: {
      shadowColor: '#000',
      shadowOffset: { width: 0, height: 1 },
      shadowOpacity: 0.05,
      shadowRadius: 3,
      elevation: 1,
    },
    level2: {
      shadowColor: '#000',
      shadowOffset: { width: 0, height: 2 },
      shadowOpacity: 0.08,
      shadowRadius: 6,
      elevation: 3,
    },
    level3: {
      shadowColor: '#000',
      shadowOffset: { width: 0, height: 4 },
      shadowOpacity: 0.11,
      shadowRadius: 8,
      elevation: 6,
    },
    level4: {
      shadowColor: '#000',
      shadowOffset: { width: 0, height: 6 },
      shadowOpacity: 0.12,
      shadowRadius: 12,
      elevation: 8,
    },
    level5: {
      shadowColor: '#000',
      shadowOffset: { width: 0, height: 8 },
      shadowOpacity: 0.14,
      shadowRadius: 16,
      elevation: 12,
    },
  },

  // Typography scale
  typography: {
    displayLarge: { fontSize: 57, lineHeight: 64, fontWeight: '400' },
    displayMedium: { fontSize: 45, lineHeight: 52, fontWeight: '400' },
    displaySmall: { fontSize: 36, lineHeight: 44, fontWeight: '400' },
    headlineLarge: { fontSize: 32, lineHeight: 40, fontWeight: '400' },
    headlineMedium: { fontSize: 28, lineHeight: 36, fontWeight: '400' },
    headlineSmall: { fontSize: 24, lineHeight: 32, fontWeight: '400' },
    titleLarge: { fontSize: 22, lineHeight: 28, fontWeight: '500' },
    titleMedium: { fontSize: 16, lineHeight: 24, fontWeight: '600' },
    titleSmall: { fontSize: 14, lineHeight: 20, fontWeight: '600' },
    bodyLarge: { fontSize: 16, lineHeight: 24, fontWeight: '400' },
    bodyMedium: { fontSize: 14, lineHeight: 20, fontWeight: '400' },
    bodySmall: { fontSize: 12, lineHeight: 16, fontWeight: '400' },
    labelLarge: { fontSize: 14, lineHeight: 20, fontWeight: '600' },
    labelMedium: { fontSize: 12, lineHeight: 16, fontWeight: '600' },
    labelSmall: { fontSize: 11, lineHeight: 16, fontWeight: '600' },
  },
};
