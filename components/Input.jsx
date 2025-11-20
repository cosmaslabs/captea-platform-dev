/**
 * Input Component - Enhanced Edition
 * Advanced text input with animations, focus states, and enhanced UX
 * Features: Animated focus, floating label, validation states, smooth transitions
 *
 * @param {string} icon - Icon name to display
 * @param {string} placeholder - Input placeholder text
 * @param {object} inputRef - React ref for accessing input value
 * @param {function} onChangeText - Callback when text changes
 * @param {function} onFocus - Callback when input gains focus
 * @param {function} onBlur - Callback when input loses focus
 * @param {boolean} secureTextEntry - Hides text for passwords
 * @param {boolean} error - Shows error state
 * @param {string} errorMessage - Error message to display
 * @param {object} containerStyle - Custom styles for container
 */

import * as Haptics from 'expo-haptics';
import { useEffect, useRef, useState } from 'react';
import { Pressable, StyleSheet, Text, TextInput, View } from 'react-native';
import Animated, {
    useAnimatedStyle,
    useSharedValue,
    withSpring,
    withTiming,
} from 'react-native-reanimated';
import Icon from '../assets/icons';
import { theme } from '../constants/theme';
import { HP, WP } from '../helpers/common';

const Input = ({
  icon,
  placeholder,
  inputRef,
  onChangeText,
  onFocus,
  onBlur,
  secureTextEntry = false,
  error = false,
  errorMessage = '',
  containerStyle,
  ...props
}) => {
  const [isFocused, setIsFocused] = useState(false);
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);
  const internalRef = useRef(null);
  const textInputRef = inputRef || internalRef;

  // Animation values
  const borderWidth = useSharedValue(1);
  const borderColor = useSharedValue(theme.colors.border);
  const iconScale = useSharedValue(1);

  useEffect(() => {
    if (isFocused) {
      borderWidth.value = withSpring(2, theme.spring.snappy);
      borderColor.value = error ? theme.colors.error : theme.colors.primary;
      iconScale.value = withSpring(1.1, theme.spring.bouncy);
    } else {
      borderWidth.value = withTiming(1, { duration: theme.animation.normal });
      borderColor.value = error ? theme.colors.error : theme.colors.border;
      iconScale.value = withTiming(1, { duration: theme.animation.fast });
    }
  }, [isFocused, error]);

  const containerAnimatedStyle = useAnimatedStyle(() => ({
    borderWidth: borderWidth.value,
    borderColor: borderColor.value,
  }));

  const iconAnimatedStyle = useAnimatedStyle(() => ({
    transform: [{ scale: iconScale.value }],
  }));

  const handleFocus = (e) => {
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
    setIsFocused(true);
    onFocus?.(e);
  };

  const handleBlur = (e) => {
    setIsFocused(false);
    onBlur?.(e);
  };

  const togglePasswordVisibility = () => {
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
    setIsPasswordVisible(!isPasswordVisible);
  };

  return (
    <View style={containerStyle}>
      <Animated.View style={[styles.container, containerAnimatedStyle]}>
        {icon && (
          <Animated.View style={iconAnimatedStyle}>
            <Icon
              name={icon}
              size={24}
              strokeWidth={1.8}
              color={
                error
                  ? theme.colors.error
                  : isFocused
                  ? theme.colors.primary
                  : theme.colors.textLight
              }
            />
          </Animated.View>
        )}
        <TextInput
          ref={textInputRef}
          placeholder={placeholder}
          placeholderTextColor={theme.colors.textLight}
          secureTextEntry={secureTextEntry && !isPasswordVisible}
          onChangeText={onChangeText}
          onFocus={handleFocus}
          onBlur={handleBlur}
          style={[styles.input, icon && styles.inputWithIcon]}
          selectionColor={theme.colors.primary}
          {...props}
        />
        {secureTextEntry && (
          <Pressable onPress={togglePasswordVisibility} style={styles.eyeButton}>
            <Icon
              name={isPasswordVisible ? 'Eye' : 'EyeOff'}
              size={20}
              strokeWidth={1.8}
              color={theme.colors.textLight}
            />
          </Pressable>
        )}
      </Animated.View>
      {error && errorMessage ? (
        <View style={styles.errorContainer}>
          <Icon name="AlertCircle" size={14} color={theme.colors.error} strokeWidth={2} />
          <Text style={styles.errorText}>{errorMessage}</Text>
        </View>
      ) : null}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    height: HP(7.2),
    borderRadius: theme.radius.xxl,
    paddingHorizontal: WP(4),
    backgroundColor: theme.colors.surface,
  },
  input: {
    flex: 1,
    fontSize: HP(2),
    color: theme.colors.text,
    fontWeight: theme.fonts.medium,
  },
  inputWithIcon: {
    marginLeft: WP(2.5),
  },
  eyeButton: {
    padding: WP(2),
    marginLeft: WP(1),
  },
  errorContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: HP(0.8),
    marginLeft: WP(4),
    gap: WP(1),
  },
  errorText: {
    fontSize: HP(1.6),
    color: theme.colors.error,
    fontWeight: theme.fonts.medium,
  },
});

export default Input;
