/**
 * Create Post Screen (Placeholder)
 * Will be implemented with rich text editor and media upload
 */

import { useRouter } from 'expo-router';
import { StyleSheet, Text, View } from 'react-native';
import BackButton from '../components/BackButton';
import Button from '../components/Button';
import ScreenWrapper from '../components/ScreenWrapper';
import { theme } from '../constants/theme';
import { HP, WP } from '../helpers/common';

const Create = () => {
  const router = useRouter();

  return (
    <ScreenWrapper bg={theme.colors.background}>
      <View style={styles.container}>
        <View style={styles.header}>
          <BackButton />
        </View>

        <View style={styles.content}>
          <Text style={styles.title}>Create Post</Text>
          <Text style={styles.subtitle}>
            Rich text editor, image picker, and video upload coming soon!
          </Text>

          <View style={styles.placeholder}>
            <Text style={styles.placeholderText}>
              📝 Text Editor{'\n'}
              📷 Image Upload{'\n'}
              🎥 Video Upload{'\n'}
              📍 Location Tagging
            </Text>
          </View>

          <Button
            title="Back to Feed"
            onPress={() => router.back()}
            hasShadow={false}
            buttonStyle={{ backgroundColor: theme.colors.textDark }}
          />
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
  title: {
    fontSize: HP(3.5),
    fontWeight: theme.fonts.extrabold,
    color: theme.colors.text,
  },
  subtitle: {
    fontSize: HP(1.9),
    fontWeight: theme.fonts.medium,
    color: theme.colors.textLight,
  },
  placeholder: {
    backgroundColor: theme.colors.backgroundSecondary,
    padding: WP(8),
    borderRadius: theme.radius.lg,
    alignItems: 'center',
    marginVertical: HP(3),
  },
  placeholderText: {
    fontSize: HP(2),
    fontWeight: theme.fonts.semibold,
    color: theme.colors.text,
    textAlign: 'center',
    lineHeight: HP(3.5),
  },
});

export default Create;
