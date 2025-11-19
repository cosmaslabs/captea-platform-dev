/**
 * RichTextInput Component
 * Multi-line text input with character counter
 * Used for creating posts and comments
 *
 * @param {string} value - Current text value
 * @param {function} onChangeText - Callback when text changes
 * @param {string} placeholder - Placeholder text
 * @param {number} maxLength - Maximum character count (default: 1000)
 * @param {number} minHeight - Minimum height in HP units (default: 20)
 * @param {boolean} showCounter - Show character counter (default: true)
 */

import { StyleSheet, Text, TextInput, View } from 'react-native';
import { theme } from '../constants/theme';
import { HP, WP } from '../helpers/common';

const RichTextInput = ({
  value,
  onChangeText,
  placeholder = "What's on your mind?",
  maxLength = 1000,
  minHeight = 20,
  showCounter = true,
  inputRef,
  ...props
}) => {
  const characterCount = value?.length || 0;
  const isNearLimit = characterCount > maxLength * 0.9;

  return (
    <View style={styles.container}>
      <TextInput
        ref={inputRef}
        style={[styles.input, { minHeight: HP(minHeight) }]}
        placeholder={placeholder}
        placeholderTextColor={theme.colors.textLight}
        value={value}
        onChangeText={onChangeText}
        multiline
        textAlignVertical="top"
        maxLength={maxLength}
        {...props}
      />

      {showCounter && (
        <View style={styles.footer}>
          <Text
            style={[
              styles.counter,
              isNearLimit && styles.counterWarning,
            ]}
          >
            {characterCount} / {maxLength}
          </Text>
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: '100%',
  },
  input: {
    backgroundColor: theme.colors.backgroundSecondary,
    borderRadius: theme.radius.lg,
    padding: WP(4),
    fontSize: HP(1.9),
    fontWeight: theme.fonts.medium,
    color: theme.colors.text,
    borderWidth: 1,
    borderColor: theme.colors.border,
  },
  footer: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    marginTop: HP(0.5),
    paddingHorizontal: WP(2),
  },
  counter: {
    fontSize: HP(1.5),
    fontWeight: theme.fonts.medium,
    color: theme.colors.textLight,
  },
  counterWarning: {
    color: theme.colors.warning,
  },
});

export default RichTextInput;
