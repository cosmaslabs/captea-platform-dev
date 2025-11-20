/**
 * Create Post Screen
 * Full implementation with text input, image/video upload, and submit
 */

import { useRouter } from 'expo-router';
import { useRef, useState } from 'react';
import { Alert, Image, Pressable, ScrollView, StyleSheet, Text, View } from 'react-native';
import Icon from '../../assets/icons';
import BackButton from '../../components/BackButton';
import Button from '../../components/Button';
import Loading from '../../components/Loading';
import RichTextInput from '../../components/RichTextInput';
import ScreenWrapper from '../../components/ScreenWrapper';
import { theme } from '../../constants/theme';
import { HP, WP } from '../../helpers/common';
import { pickImage, uploadFile } from '../../helpers/media';
import { usePosts } from '../../hooks/usePosts';

const Create = () => {
  const router = useRouter();
  const { createPost } = usePosts();

  const [content, setContent] = useState('');
  const [imageUri, setImageUri] = useState(null);
  const [uploading, setUploading] = useState(false);
  const [submitting, setSubmitting] = useState(false);

  const inputRef = useRef(null);

  const handlePickImage = async () => {
    const result = await pickImage();

    if (result.canceled) return;

    if (!result.success) {
      Alert.alert('Error', result.error || 'Failed to pick image');
      return;
    }

    setImageUri(result.uri);
  };

  const handleRemoveImage = () => {
    setImageUri(null);
  };

  const handleSubmit = async () => {
    if (!content.trim() && !imageUri) {
      Alert.alert('Empty Post', 'Please add some content or an image');
      return;
    }

    setSubmitting(true);

    try {
      let imageUrl = null;

      // Upload image if present
      if (imageUri) {
        setUploading(true);
        const uploadResult = await uploadFile(imageUri, 'posts');
        setUploading(false);

        if (!uploadResult.success) {
          Alert.alert('Upload Failed', uploadResult.error || 'Failed to upload image');
          setSubmitting(false);
          return;
        }

        imageUrl = uploadResult.url;
      }

      // Create post
      const result = await createPost(content.trim(), imageUrl);

      if (result.success) {
        Alert.alert('Success', 'Post created successfully!', [
          {
            text: 'OK',
            onPress: () => router.back(),
          },
        ]);
      } else {
        Alert.alert('Error', result.error || 'Failed to create post');
      }
    } catch (error) {
      console.error('Create post error:', error);
      Alert.alert('Error', 'An unexpected error occurred');
    } finally {
      setSubmitting(false);
      setUploading(false);
    }
  };

  return (
    <ScreenWrapper bg={theme.colors.background}>
      <View style={styles.container}>
        {/* Header */}
        <View style={styles.header}>
          <BackButton />
          <Text style={styles.headerTitle}>Create Post</Text>
          <View style={{ width: 40 }} />
        </View>

        {/* Content */}
        <ScrollView
          style={styles.scrollView}
          contentContainerStyle={styles.scrollContent}
          showsVerticalScrollIndicator={false}
        >
          {/* Text Input */}
          <RichTextInput
            inputRef={inputRef}
            value={content}
            onChangeText={setContent}
            placeholder="What's on your mind?"
            maxLength={1000}
            minHeight={20}
            showCounter={true}
          />

          {/* Image Preview */}
          {imageUri && (
            <View style={styles.mediaContainer}>
              <Image source={{ uri: imageUri }} style={styles.image} resizeMode="cover" />
              <Pressable style={styles.removeButton} onPress={handleRemoveImage}>
                <Icon name="Delete" size={20} color={theme.colors.textWhite} strokeWidth={2} />
              </Pressable>
            </View>
          )}

          {/* Media Buttons */}
          <View style={styles.mediaButtons}>
            <Pressable
              style={[styles.mediaButton, imageUri && styles.mediaButtonDisabled]}
              onPress={handlePickImage}
              disabled={imageUri !== null}
            >
              <Icon
                name="Image"
                size={24}
                color={imageUri ? theme.colors.textLight : theme.colors.primary}
                strokeWidth={1.6}
              />
              <Text
                style={[
                  styles.mediaButtonText,
                  imageUri && styles.mediaButtonTextDisabled,
                ]}
              >
                Add Photo
              </Text>
            </Pressable>

            {/* Video button placeholder */}
            <Pressable
              style={[styles.mediaButton, styles.mediaButtonDisabled]}
              disabled
            >
              <Icon
                name="Video"
                size={24}
                color={theme.colors.textLight}
                strokeWidth={1.6}
              />
              <Text style={styles.mediaButtonTextDisabled}>Add Video (Coming Soon)</Text>
            </Pressable>
          </View>

          {/* Upload Status */}
          {uploading && (
            <View style={styles.uploadStatus}>
              <Loading size="small" />
              <Text style={styles.uploadText}>Uploading image...</Text>
            </View>
          )}

          {/* Guidelines */}
          <View style={styles.guidelines}>
            <Text style={styles.guidelinesTitle}>Posting Guidelines:</Text>
            <Text style={styles.guidelinesText}>
              • Be respectful and kind{'\n'}
              • No spam or misleading content{'\n'}
              • Share authentic experiences{'\n'}
              • Maximum 1000 characters
            </Text>
          </View>
        </ScrollView>

        {/* Submit Button */}
        <View style={styles.footer}>
          <Button
            title={uploading ? 'Uploading...' : 'Post'}
            onPress={handleSubmit}
            loading={submitting}
            disabled={uploading || (!content.trim() && !imageUri)}
            hasShadow={false}
          />
        </View>
      </View>
    </ScreenWrapper>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: WP(5),
    paddingVertical: HP(2),
    borderBottomWidth: 1,
    borderBottomColor: theme.colors.border,
  },
  headerTitle: {
    fontSize: HP(2.2),
    fontWeight: theme.fonts.bold,
    color: theme.colors.text,
  },
  scrollView: {
    flex: 1,
  },
  scrollContent: {
    padding: WP(5),
    paddingBottom: HP(2),
  },
  mediaContainer: {
    marginTop: HP(2),
    borderRadius: theme.radius.lg,
    overflow: 'hidden',
    position: 'relative',
  },
  image: {
    width: '100%',
    height: HP(30),
    backgroundColor: theme.colors.backgroundSecondary,
  },
  removeButton: {
    position: 'absolute',
    top: HP(1),
    right: WP(3),
    width: HP(4),
    height: HP(4),
    borderRadius: HP(2),
    backgroundColor: theme.colors.error,
    justifyContent: 'center',
    alignItems: 'center',
  },
  mediaButtons: {
    flexDirection: 'row',
    gap: WP(3),
    marginTop: HP(2),
  },
  mediaButton: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: WP(2),
    paddingVertical: HP(1.5),
    backgroundColor: theme.colors.backgroundSecondary,
    borderRadius: theme.radius.lg,
    borderWidth: 1,
    borderColor: theme.colors.border,
  },
  mediaButtonDisabled: {
    opacity: 0.5,
  },
  mediaButtonText: {
    fontSize: HP(1.8),
    fontWeight: theme.fonts.semibold,
    color: theme.colors.text,
  },
  mediaButtonTextDisabled: {
    color: theme.colors.textLight,
  },
  uploadStatus: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: WP(3),
    marginTop: HP(2),
    paddingVertical: HP(1.5),
    backgroundColor: theme.colors.primary + '10',
    borderRadius: theme.radius.lg,
  },
  uploadText: {
    fontSize: HP(1.8),
    fontWeight: theme.fonts.semibold,
    color: theme.colors.primary,
  },
  guidelines: {
    marginTop: HP(3),
    padding: WP(4),
    backgroundColor: theme.colors.backgroundSecondary,
    borderRadius: theme.radius.lg,
    borderLeftWidth: 4,
    borderLeftColor: theme.colors.primary,
  },
  guidelinesTitle: {
    fontSize: HP(1.9),
    fontWeight: theme.fonts.bold,
    color: theme.colors.text,
    marginBottom: HP(0.5),
  },
  guidelinesText: {
    fontSize: HP(1.7),
    fontWeight: theme.fonts.medium,
    color: theme.colors.textLight,
    lineHeight: HP(2.5),
  },
  footer: {
    padding: WP(5),
    borderTopWidth: 1,
    borderTopColor: theme.colors.border,
    backgroundColor: theme.colors.background,
  },
});

export default Create;
