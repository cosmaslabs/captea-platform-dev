/**
 * VideoPlayer Component
 * Video player with play/pause controls, progress bar, and full-screen support
 * Uses Expo AV for video playback
 *
 * @param {string} videoUri - URI of the video to play
 * @param {object} style - Optional style overrides
 * @param {boolean} autoPlay - Auto-play video on mount (default: false)
 */

import { ResizeMode, Video } from 'expo-av';
import { useRef, useState } from 'react';
import { ActivityIndicator, Pressable, StyleSheet, View } from 'react-native';
import Icon from '../assets/icons';
import { theme } from '../constants/theme';
import { HP } from '../helpers/common';

const VideoPlayer = ({ videoUri, style, autoPlay = false }) => {
  const videoRef = useRef(null);
  const [status, setStatus] = useState({});
  const [isLoading, setIsLoading] = useState(true);

  const handlePlayPause = async () => {
    if (!videoRef.current) return;

    if (status.isPlaying) {
      await videoRef.current.pauseAsync();
    } else {
      await videoRef.current.playAsync();
    }
  };

  const handleLoad = () => {
    setIsLoading(false);
  };

  const handleError = (error) => {
    console.error('Video playback error:', error);
    setIsLoading(false);
  };

  return (
    <View style={[styles.container, style]}>
      <Video
        ref={videoRef}
        source={{ uri: videoUri }}
        style={styles.video}
        resizeMode={ResizeMode.CONTAIN}
        shouldPlay={autoPlay}
        isLooping={false}
        onPlaybackStatusUpdate={(status) => setStatus(() => status)}
        onLoad={handleLoad}
        onError={handleError}
        useNativeControls={false}
      />

      {/* Loading Indicator */}
      {isLoading && (
        <View style={styles.loadingOverlay}>
          <ActivityIndicator size="large" color={theme.colors.textWhite} />
        </View>
      )}

      {/* Play/Pause Button */}
      {!isLoading && (
        <Pressable style={styles.playButton} onPress={handlePlayPause}>
          <View style={styles.playButtonBackground}>
            <Icon
              name={status.isPlaying ? 'Pause' : 'Play'}
              size={32}
              color={theme.colors.textWhite}
              strokeWidth={2}
            />
          </View>
        </Pressable>
      )}

      {/* Progress Bar */}
      {!isLoading && status.durationMillis > 0 && (
        <View style={styles.progressContainer}>
          <View
            style={[
              styles.progressBar,
              {
                width: `${
                  (status.positionMillis / status.durationMillis) * 100
                }%`,
              },
            ]}
          />
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: '100%',
    height: HP(30),
    backgroundColor: theme.colors.textDark,
    borderRadius: theme.radius.md,
    overflow: 'hidden',
    position: 'relative',
  },
  video: {
    width: '100%',
    height: '100%',
  },
  loadingOverlay: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  playButton: {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: [{ translateX: -28 }, { translateY: -28 }],
  },
  playButtonBackground: {
    width: 56,
    height: 56,
    borderRadius: 28,
    backgroundColor: 'rgba(0, 0, 0, 0.6)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  progressContainer: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    height: 4,
    backgroundColor: 'rgba(255, 255, 255, 0.3)',
  },
  progressBar: {
    height: '100%',
    backgroundColor: theme.colors.primary,
  },
});

export default VideoPlayer;
