/**
 * Theme Configuration - Captea Platform
 * Premium design system combining:
 * - Material Design 3 (Google) - Dynamic color, elevation, state layers
 * - Apple Human Interface Guidelines - Clarity, depth, consistency
 * - Facebook/WhatsApp aesthetics - Social warmth, accessibility
 */

export const theme = {
  colors: {
    // Primary brand colors - Material Design 3 dynamic color
    // Inspired by WhatsApp green with warmth
    primary: '#00A884',
    primaryLight: '#26D07C',
    primaryDark: '#008069',
    primaryContainer: '#D8F8EF',
    onPrimary: '#FFFFFF',
    onPrimaryContainer: '#002118',
    primaryFixed: '#A8F5E3',
    primaryFixedDim: '#8CD9C7',

    // Secondary colors - Facebook blue warmth
    secondary: '#0866FF',
    secondaryLight: '#4A8BFF',
    secondaryDark: '#0552CC',
    secondaryContainer: '#D6E6FF',
    onSecondary: '#FFFFFF',
    onSecondaryContainer: '#001633',
    secondaryFixed: '#D6E6FF',
    secondaryFixedDim: '#ADC7FF',

    // Tertiary colors - Warm accent (Apple's soft coral)
    tertiary: '#FF6B6B',
    tertiaryLight: '#FF8E8E',
    tertiaryDark: '#E05555',
    tertiaryContainer: '#FFE0E0',
    onTertiary: '#FFFFFF',
    onTertiaryContainer: '#410001',
    tertiaryFixed: '#FFE0E0',
    tertiaryFixedDim: '#FFB4B4',

    // Background colors - Apple HCI clean canvas
    background: '#FFFFFF',
    backgroundSecondary: '#F6F6F6',
    backgroundTertiary: '#FAFAFA',
    onBackground: '#1A1C1E',

    // Surface colors - Material 3 surface tints
    surface: '#FFFFFF',
    surfaceVariant: '#DFE2EB',
    surfaceDim: '#D9DADC',
    surfaceBright: '#F9FAFB',
    surfaceContainer: '#ECEEF1',
    surfaceContainerLow: '#F3F4F6',
    surfaceContainerLowest: '#FFFFFF',
    surfaceContainerHigh: '#E3E5E8',
    surfaceContainerHighest: '#DDE0E3',
    onSurface: '#1A1C1E',
    onSurfaceVariant: '#43474E',

    // Text colors - Apple HCI hierarchy
    text: '#1A1C1E',
    textPrimary: '#000000',
    textSecondary: '#65676B',
    textTertiary: '#8A8D91',
    textLight: '#B0B3B8',
    textDark: '#050505',
    textWhite: '#FFFFFF',
    textDisabled: '#BDC1C6',
    textPlaceholder: '#8E9196',

    // Border & divider colors - Facebook/WhatsApp inspired
    border: '#E4E6EB',
    borderLight: '#F0F2F5',
    borderDark: '#CED0D4',
    divider: '#E4E6EB',
    dividerLight: '#F0F2F5',
    outline: '#79747E',
    outlineVariant: '#C4C7C5',

    // Status colors - Material Design 3 semantic system
    success: '#00A884',
    successLight: '#26D07C',
    successDark: '#008069',
    successContainer: '#D8F8EF',
    onSuccess: '#FFFFFF',
    onSuccessContainer: '#002118',

    error: '#F02849',
    errorLight: '#FF5470',
    errorDark: '#D41534',
    errorContainer: '#FFD9DD',
    onError: '#FFFFFF',
    onErrorContainer: '#410002',

    warning: '#FFA726',
    warningLight: '#FFB951',
    warningDark: '#FB8C00',
    warningContainer: '#FFE4CC',
    onWarning: '#FFFFFF',
    onWarningContainer: '#2E1500',

    info: '#0866FF',
    infoLight: '#4A8BFF',
    infoDark: '#0552CC',
    infoContainer: '#D6E6FF',
    onInfo: '#FFFFFF',
    onInfoContainer: '#001633',

    // Social interaction colors - Facebook inspired
    like: '#F02849',
    likeActive: '#FF3D5C',
    likeContainer: '#FFE0E5',
    comment: '#65676B',
    commentActive: '#1A1C1E',
    commentContainer: '#F0F2F5',
    share: '#0866FF',
    shareActive: '#4A8BFF',
    shareContainer: '#D6E6FF',

    // WhatsApp brand colors
    whatsappGreen: '#25D366',
    whatsappDarkGreen: '#128C7E',
    whatsappTeal: '#075E54',
    whatsappLight: '#DCF8C6',
    whatsappBlue: '#34B7F1',

    // Facebook brand colors
    facebookBlue: '#0866FF',
    facebookDarkBlue: '#0552CC',
    facebookLight: '#E7F3FF',

    // Instagram gradient colors
    instagramPink: '#E1306C',
    instagramPurple: '#833AB4',
    instagramOrange: '#FD1D1D',
    instagramYellow: '#F77737',

    // Overlay & scrim colors - Apple HCI depth
    scrim: '#000000',
    scrimLight: 'rgba(0, 0, 0, 0.4)',
    scrimDark: 'rgba(0, 0, 0, 0.6)',
    overlay: 'rgba(0, 0, 0, 0.5)',
    overlayLight: 'rgba(0, 0, 0, 0.15)',
    overlayMedium: 'rgba(0, 0, 0, 0.3)',
    overlayDark: 'rgba(0, 0, 0, 0.7)',

    // State layers - Material 3 interaction states
    stateHover: 'rgba(0, 0, 0, 0.08)',
    statePressed: 'rgba(0, 0, 0, 0.12)',
    stateFocus: 'rgba(0, 0, 0, 0.12)',
    stateDrag: 'rgba(0, 0, 0, 0.16)',

    // Elevation tints - Material 3 surface tones
    elevation0: 'transparent',
    elevation1: 'rgba(0, 168, 132, 0.05)',
    elevation2: 'rgba(0, 168, 132, 0.08)',
    elevation3: 'rgba(0, 168, 132, 0.11)',
    elevation4: 'rgba(0, 168, 132, 0.12)',
    elevation5: 'rgba(0, 168, 132, 0.14)',
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

  // Gradient presets - Material 3 + Apple inspired
  gradients: {
    primary: ['#00A884', '#26D07C'],
    secondary: ['#0866FF', '#4A8BFF'],
    tertiary: ['#FF6B6B', '#FF8E8E'],
    warm: ['#FFA726', '#FCAF45'],
    cool: ['#00A884', '#34B7F1'],
    whatsapp: ['#00A884', '#25D366'],
    facebook: ['#0866FF', '#4A8BFF'],
    instagram: ['#833AB4', '#E1306C', '#FD1D1D', '#F77737'],
    sunset: ['#FF6B6B', '#FFA726', '#FCAF45'],
    ocean: ['#0866FF', '#34B7F1', '#00A884'],
    rose: ['#FF6B6B', '#E1306C', '#FFE0E5'],
    success: ['#00A884', '#26D07C'],
    error: ['#F02849', '#FF5470'],
    warning: ['#FFA726', '#FFB951'],
    info: ['#0866FF', '#4A8BFF'],
    dark: ['#1A1C1E', '#43474E'],
    light: ['#FFFFFF', '#F6F6F6'],
    neutral: ['#8A8D91', '#B0B3B8'],
  },

  // Animation timings
  animation: {
    fast: 150,
    normal: 250,
    slow: 350,
    slower: 500,
  },

  // Spring configs for reanimated
  spring: {
    gentle: { damping: 20, stiffness: 90 },
    snappy: { damping: 15, stiffness: 150 },
    bouncy: { damping: 10, stiffness: 200 },
    slow: { damping: 25, stiffness: 60 },
  },

  // Glassmorphism effect
  glass: {
    light: {
      backgroundColor: 'rgba(255, 255, 255, 0.7)',
      backdropFilter: 'blur(10px)',
      borderWidth: 1,
      borderColor: 'rgba(255, 255, 255, 0.3)',
    },
    dark: {
      backgroundColor: 'rgba(0, 0, 0, 0.3)',
      backdropFilter: 'blur(10px)',
      borderWidth: 1,
      borderColor: 'rgba(255, 255, 255, 0.1)',
    },
    primary: {
      backgroundColor: 'rgba(255, 103, 25, 0.2)',
      backdropFilter: 'blur(10px)',
      borderWidth: 1,
      borderColor: 'rgba(255, 103, 25, 0.3)',
    },
  },
};
