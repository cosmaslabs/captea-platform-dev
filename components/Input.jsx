/**
 * Input Component
 * Reusable text input with icon support, secure text entry, and useRef integration
 * Optimized for performance using refs instead of controlled state
 *
 * @param {string} icon - Icon name to display (for future icon system integration)
 * @param {string} placeholder - Input placeholder text
 * @param {object} inputRef - React ref for accessing input value without re-renders
 * @param {function} onChangeText - Callback when text changes
 * @param {boolean} secureTextEntry - Hides text for passwords (default: false)
 * @param {object} containerStyle - Custom styles for container
 * @param {...object} props - Additional TextInput props
 */

import { StyleSheet, TextInput, View } from 'react-native';
import Icon from '../assets/icons';
import { theme } from '../constants/theme';
import { HP, WP } from '../helpers/common';

const Input = ({
  icon,
  placeholder,
  inputRef,
  onChangeText,
  secureTextEntry = false,
  containerStyle,
  ...props
}) => {
  return (
    <View style={[styles.container, containerStyle]}>
      {icon && (
        <Icon
          name={icon}
          size={26}
          strokeWidth={1.6}
          color={theme.colors.textLight}
        />
      )}
      <TextInput
        ref={inputRef}
        placeholder={placeholder}
        placeholderTextColor={theme.colors.textLight}
        secureTextEntry={secureTextEntry}
        onChangeText={onChangeText}
        style={[styles.input, icon && styles.inputWithIcon]}
        {...props}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    height: HP(7.2),
    borderWidth: 1,
    borderColor: theme.colors.border,
    borderRadius: theme.radius.doublexl,
    paddingHorizontal: WP(4),
    backgroundColor: theme.colors.background,
  },
  input: {
    flex: 1,
    fontSize: HP(2),
    color: theme.colors.text,
    fontWeight: theme.fonts.medium,
  },
  inputWithIcon: {
    marginLeft: WP(2),
  },
});

export default Input;
