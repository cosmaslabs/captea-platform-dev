/**
 * Media Upload Helpers
 * Functions for picking and uploading images/videos to Supabase storage
 */

import * as ImagePicker from 'expo-image-picker';
import { supabase } from './supabase';

/**
 * Request media library permissions
 */
export const requestMediaPermissions = async () => {
  const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();

  if (status !== 'granted') {
    return {
      success: false,
      error: 'Permission to access media library is required!',
    };
  }

  return { success: true };
};

/**
 * Pick an image from the device
 */
export const pickImage = async () => {
  try {
    const permissionResult = await requestMediaPermissions();
    if (!permissionResult.success) {
      return permissionResult;
    }

    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 0.7,
    });

    if (result.canceled) {
      return { success: false, canceled: true };
    }

    return {
      success: true,
      uri: result.assets[0].uri,
      type: result.assets[0].type,
      fileName: result.assets[0].fileName || `image_${Date.now()}.jpg`,
    };
  } catch (error) {
    console.error('Error picking image:', error);
    return {
      success: false,
      error: error.message || 'Failed to pick image',
    };
  }
};

/**
 * Pick a video from the device
 */
export const pickVideo = async () => {
  try {
    const permissionResult = await requestMediaPermissions();
    if (!permissionResult.success) {
      return permissionResult;
    }

    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Videos,
      allowsEditing: true,
      quality: 0.7,
    });

    if (result.canceled) {
      return { success: false, canceled: true };
    }

    return {
      success: true,
      uri: result.assets[0].uri,
      type: result.assets[0].type,
      fileName: result.assets[0].fileName || `video_${Date.now()}.mp4`,
    };
  } catch (error) {
    console.error('Error picking video:', error);
    return {
      success: false,
      error: error.message || 'Failed to pick video',
    };
  }
};

/**
 * Upload file to Supabase storage
 */
export const uploadFile = async (uri, bucket = 'posts', folder = '') => {
  try {
    const { data: { user } } = await supabase.auth.getUser();

    if (!user) {
      return {
        success: false,
        error: 'User not authenticated',
      };
    }

    // Create file path
    const fileExt = uri.split('.').pop();
    const fileName = `${Date.now()}.${fileExt}`;
    const filePath = folder ? `${folder}/${fileName}` : `${user.id}/${fileName}`;

    // Convert URI to blob
    const response = await fetch(uri);
    const blob = await response.blob();

    // Upload to Supabase
    const { data, error } = await supabase.storage
      .from(bucket)
      .upload(filePath, blob, {
        contentType: blob.type,
        upsert: false,
      });

    if (error) {
      console.error('Upload error:', error);
      return {
        success: false,
        error: error.message || 'Failed to upload file',
      };
    }

    // Get public URL
    const { data: { publicUrl } } = supabase.storage
      .from(bucket)
      .getPublicUrl(data.path);

    return {
      success: true,
      path: data.path,
      url: publicUrl,
    };
  } catch (error) {
    console.error('Upload error:', error);
    return {
      success: false,
      error: error.message || 'Failed to upload file',
    };
  }
};

/**
 * Delete file from Supabase storage
 */
export const deleteFile = async (path, bucket = 'posts') => {
  try {
    const { error } = await supabase.storage
      .from(bucket)
      .remove([path]);

    if (error) {
      console.error('Delete error:', error);
      return {
        success: false,
        error: error.message || 'Failed to delete file',
      };
    }

    return { success: true };
  } catch (error) {
    console.error('Delete error:', error);
    return {
      success: false,
      error: error.message || 'Failed to delete file',
    };
  }
};

/**
 * Get download URL for a file
 */
export const getFileUrl = (path, bucket = 'posts') => {
  const { data } = supabase.storage
    .from(bucket)
    .getPublicUrl(path);

  return data.publicUrl;
};
