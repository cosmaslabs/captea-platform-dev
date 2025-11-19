/**
 * BackButton Component
 * Reusable back navigation button with router integration
 *
 * @param {number} size - Icon size (default: 26)
 * @param {function} onPress - Optional custom onPress handler (defaults to router.back())
 * @param {object} style - Custom container styles
 */

import { useRouter } from 'expo-router';
import { Pressable, StyleSheet } from 'react-native';
import Icon from '../assets/icons';
import { theme } from '../constants/theme';

const BackButton = ({ size = 26, onPress, style }) => {
  const router = useRouter();

  const handlePress = () => {
    if (onPress) {
      onPress();
    } else {
      router.back();
    }
  };

  return (
    <Pressable
      onPress={handlePress}
      style={({ pressed }) => [styles.button, style, pressed && styles.pressed]}
    >
      <Icon
        name="ArrowLeft"
        size={size}
        strokeWidth={2.5}
        color={theme.colors.text}
      />
    </Pressable>
  );
};

const styles = StyleSheet.create({
  button: {
    alignSelf: 'flex-start',
    padding: 5,
    borderRadius: theme.radius.sm,
    backgroundColor: 'rgba(0,0,0,0.07)',
  },
  pressed: {
    opacity: 0.6,
  },
});

export default BackButton;
