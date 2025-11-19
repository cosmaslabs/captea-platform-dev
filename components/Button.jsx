/**
 * Button Component
 * Reusable custom button with loading state, shadow effects, and flexible styling
 *
 * @param {string} title - Button text label
 * @param {function} onPress - Callback function when button is pressed
 * @param {boolean} loading - Shows loading indicator when true, disables button
 * @param {boolean} hasShadow - Applies shadow/elevation when true (default: true)
 * @param {object} buttonStyle - Custom styles for button container
 * @param {object} textStyle - Custom styles for button text
 */

import { ActivityIndicator, Pressable, StyleSheet, Text } from 'react-native';
import { theme } from '../constants/theme';
import { HP, WP } from '../helpers/common';

const Button = ({
  title,
  onPress,
  loading = false,
  hasShadow = true,
  buttonStyle,
  textStyle,
}) => {
  // Determine shadow styles based on hasShadow prop
  const shadowStyle = hasShadow ? styles.shadow : {};

  // Handle press with loading state check
  const handlePress = () => {
    if (!loading && onPress) {
      onPress();
    }
  };

  return (
    <Pressable
      onPress={handlePress}
      disabled={loading}
      style={({ pressed }) => [
        styles.button,
        shadowStyle,
        buttonStyle,
        pressed && styles.pressed,
        loading && styles.disabled,
      ]}
    >
      {loading ? (
        <ActivityIndicator size="small" color={theme.colors.textWhite} />
      ) : (
        <Text style={[styles.text, textStyle]}>{title}</Text>
      )}
    </Pressable>
  );
};

const styles = StyleSheet.create({
  button: {
    height: HP(7.2),
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: theme.radius.doublexl,
    backgroundColor: theme.colors.primary,
    paddingHorizontal: WP(5),
  },
  text: {
    fontSize: HP(2),
    color: theme.colors.textWhite,
    fontWeight: theme.fonts.bold,
  },
  shadow: {
    shadowColor: theme.colors.text,
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.2,
    shadowRadius: 8,
    elevation: 6, // Android shadow
  },
  pressed: {
    opacity: 0.8,
    transform: [{ scale: 0.98 }],
  },
  disabled: {
    opacity: 0.6,
  },
});

export default Button;
