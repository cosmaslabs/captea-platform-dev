/**
 * Common helper functions for responsive design
 * Provides HP (Height Percentage) and WP (Width Percentage) utilities
 */

import { Dimensions } from 'react-native';

const { width: deviceWidth, height: deviceHeight } = Dimensions.get('window');

/**
 * Height Percentage
 * Converts a percentage of device height to actual pixel value
 *
 * @param {number} percentage - Percentage of screen height (0-100)
 * @returns {number} Pixel value
 *
 * @example
 * HP(10) // Returns 10% of screen height in pixels
 * HP(50) // Returns 50% of screen height in pixels
 */
export const HP = (percentage) => {
  return (deviceHeight * percentage) / 100;
};

/**
 * Width Percentage
 * Converts a percentage of device width to actual pixel value
 *
 * @param {number} percentage - Percentage of screen width (0-100)
 * @returns {number} Pixel value
 *
 * @example
 * WP(10) // Returns 10% of screen width in pixels
 * WP(50) // Returns 50% of screen width in pixels
 */
export const WP = (percentage) => {
  return (deviceWidth * percentage) / 100;
};

/**
 * Get device dimensions
 * Utility to access current device dimensions
 *
 * @returns {object} Object containing width and height
 */
export const getDeviceDimensions = () => {
  return {
    width: deviceWidth,
    height: deviceHeight,
  };
};
