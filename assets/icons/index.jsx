/**
 * Icon Component
 * Centralized SVG icon system for the entire app
 * Supports customizable size, color, and stroke width
 *
 * @param {string} name - Icon name (Home, Mail, Lock, Heart, Comment, Share, User, ArrowLeft, Plus, Image, Video, Send, ThreeDotsHorizontal, ThreeDotsCircle, Search, Edit, Delete, Camera, Call, Location)
 * @param {number} size - Icon size in pixels (default: 24)
 * @param {string} color - Icon color (default: theme.colors.text)
 * @param {number} strokeWidth - Stroke width (default: 1.6)
 */

import { View } from 'react-native';
import Svg, { Circle, Line, Path, Polygon, Polyline, Rect } from 'react-native-svg';
import { theme } from '../../constants/theme';

const Icon = ({
  name,
  size = 24,
  color = theme.colors.text,
  strokeWidth = 1.6,
}) => {
  const getIconPath = () => {
    switch (name) {
      // Navigation Icons
      case 'Home':
        return (
          <Svg width={size} height={size} viewBox="0 0 24 24" fill="none">
            <Path
              d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"
              stroke={color}
              strokeWidth={strokeWidth}
              strokeLinecap="round"
              strokeLinejoin="round"
            />
            <Polyline
              points="9 22 9 12 15 12 15 22"
              stroke={color}
              strokeWidth={strokeWidth}
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </Svg>
        );

      case 'ArrowLeft':
        return (
          <Svg width={size} height={size} viewBox="0 0 24 24" fill="none">
            <Line
              x1="19"
              y1="12"
              x2="5"
              y2="12"
              stroke={color}
              strokeWidth={strokeWidth}
              strokeLinecap="round"
              strokeLinejoin="round"
            />
            <Polyline
              points="12 19 5 12 12 5"
              stroke={color}
              strokeWidth={strokeWidth}
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </Svg>
        );

      // Authentication Icons
      case 'Mail':
        return (
          <Svg width={size} height={size} viewBox="0 0 24 24" fill="none">
            <Path
              d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"
              stroke={color}
              strokeWidth={strokeWidth}
              strokeLinecap="round"
              strokeLinejoin="round"
            />
            <Polyline
              points="22,6 12,13 2,6"
              stroke={color}
              strokeWidth={strokeWidth}
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </Svg>
        );

      case 'Lock':
        return (
          <Svg width={size} height={size} viewBox="0 0 24 24" fill="none">
            <Rect
              x="3"
              y="11"
              width="18"
              height="11"
              rx="2"
              ry="2"
              stroke={color}
              strokeWidth={strokeWidth}
              strokeLinecap="round"
              strokeLinejoin="round"
            />
            <Path
              d="M7 11V7a5 5 0 0 1 10 0v4"
              stroke={color}
              strokeWidth={strokeWidth}
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </Svg>
        );

      case 'User':
        return (
          <Svg width={size} height={size} viewBox="0 0 24 24" fill="none">
            <Path
              d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"
              stroke={color}
              strokeWidth={strokeWidth}
              strokeLinecap="round"
              strokeLinejoin="round"
            />
            <Circle
              cx="12"
              cy="7"
              r="4"
              stroke={color}
              strokeWidth={strokeWidth}
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </Svg>
        );

      case 'Bell':
        return (
          <Svg width={size} height={size} viewBox="0 0 24 24" fill="none">
            <Path
              d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9"
              stroke={color}
              strokeWidth={strokeWidth}
              strokeLinecap="round"
              strokeLinejoin="round"
            />
            <Path
              d="M13.73 21a2 2 0 0 1-3.46 0"
              stroke={color}
              strokeWidth={strokeWidth}
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </Svg>
        );

      // Social Interaction Icons
      case 'Heart':
        return (
          <Svg width={size} height={size} viewBox="0 0 24 24" fill="none">
            <Path
              d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"
              stroke={color}
              strokeWidth={strokeWidth}
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </Svg>
        );

      case 'Comment':
        return (
          <Svg width={size} height={size} viewBox="0 0 24 24" fill="none">
            <Path
              d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z"
              stroke={color}
              strokeWidth={strokeWidth}
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </Svg>
        );

      case 'Share':
        return (
          <Svg width={size} height={size} viewBox="0 0 24 24" fill="none">
            <Circle
              cx="18"
              cy="5"
              r="3"
              stroke={color}
              strokeWidth={strokeWidth}
              strokeLinecap="round"
              strokeLinejoin="round"
            />
            <Circle
              cx="6"
              cy="12"
              r="3"
              stroke={color}
              strokeWidth={strokeWidth}
              strokeLinecap="round"
              strokeLinejoin="round"
            />
            <Circle
              cx="18"
              cy="19"
              r="3"
              stroke={color}
              strokeWidth={strokeWidth}
              strokeLinecap="round"
              strokeLinejoin="round"
            />
            <Line
              x1="8.59"
              y1="13.51"
              x2="15.42"
              y2="17.49"
              stroke={color}
              strokeWidth={strokeWidth}
              strokeLinecap="round"
              strokeLinejoin="round"
            />
            <Line
              x1="15.41"
              y1="6.51"
              x2="8.59"
              y2="10.49"
              stroke={color}
              strokeWidth={strokeWidth}
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </Svg>
        );

      case 'Send':
        return (
          <Svg width={size} height={size} viewBox="0 0 24 24" fill="none">
            <Line
              x1="22"
              y1="2"
              x2="11"
              y2="13"
              stroke={color}
              strokeWidth={strokeWidth}
              strokeLinecap="round"
              strokeLinejoin="round"
            />
            <Polygon
              points="22 2 15 22 11 13 2 9 22 2"
              stroke={color}
              strokeWidth={strokeWidth}
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </Svg>
        );

      // Content Creation Icons
      case 'Plus':
        return (
          <Svg width={size} height={size} viewBox="0 0 24 24" fill="none">
            <Line
              x1="12"
              y1="5"
              x2="12"
              y2="19"
              stroke={color}
              strokeWidth={strokeWidth}
              strokeLinecap="round"
              strokeLinejoin="round"
            />
            <Line
              x1="5"
              y1="12"
              x2="19"
              y2="12"
              stroke={color}
              strokeWidth={strokeWidth}
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </Svg>
        );

      case 'Image':
        return (
          <Svg width={size} height={size} viewBox="0 0 24 24" fill="none">
            <Rect
              x="3"
              y="3"
              width="18"
              height="18"
              rx="2"
              ry="2"
              stroke={color}
              strokeWidth={strokeWidth}
              strokeLinecap="round"
              strokeLinejoin="round"
            />
            <Circle
              cx="8.5"
              cy="8.5"
              r="1.5"
              stroke={color}
              strokeWidth={strokeWidth}
              strokeLinecap="round"
              strokeLinejoin="round"
            />
            <Polyline
              points="21 15 16 10 5 21"
              stroke={color}
              strokeWidth={strokeWidth}
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </Svg>
        );

      case 'Video':
        return (
          <Svg width={size} height={size} viewBox="0 0 24 24" fill="none">
            <Polygon
              points="23 7 16 12 23 17 23 7"
              stroke={color}
              strokeWidth={strokeWidth}
              strokeLinecap="round"
              strokeLinejoin="round"
            />
            <Rect
              x="1"
              y="5"
              width="15"
              height="14"
              rx="2"
              ry="2"
              stroke={color}
              strokeWidth={strokeWidth}
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </Svg>
        );

      case 'Play':
        return (
          <Svg width={size} height={size} viewBox="0 0 24 24" fill="none">
            <Polygon
              points="5 3 19 12 5 21 5 3"
              stroke={color}
              strokeWidth={strokeWidth}
              strokeLinecap="round"
              strokeLinejoin="round"
              fill={color}
            />
          </Svg>
        );

      case 'Pause':
        return (
          <Svg width={size} height={size} viewBox="0 0 24 24" fill="none">
            <Rect
              x="6"
              y="4"
              width="4"
              height="16"
              stroke={color}
              strokeWidth={strokeWidth}
              fill={color}
            />
            <Rect
              x="14"
              y="4"
              width="4"
              height="16"
              stroke={color}
              strokeWidth={strokeWidth}
              fill={color}
            />
          </Svg>
        );

      case 'Camera':
        return (
          <Svg width={size} height={size} viewBox="0 0 24 24" fill="none">
            <Path
              d="M23 19a2 2 0 0 1-2 2H3a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h4l2-3h6l2 3h4a2 2 0 0 1 2 2z"
              stroke={color}
              strokeWidth={strokeWidth}
              strokeLinecap="round"
              strokeLinejoin="round"
            />
            <Circle
              cx="12"
              cy="13"
              r="4"
              stroke={color}
              strokeWidth={strokeWidth}
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </Svg>
        );

      // Utility Icons
      case 'Search':
        return (
          <Svg width={size} height={size} viewBox="0 0 24 24" fill="none">
            <Circle
              cx="11"
              cy="11"
              r="8"
              stroke={color}
              strokeWidth={strokeWidth}
              strokeLinecap="round"
              strokeLinejoin="round"
            />
            <Line
              x1="21"
              y1="21"
              x2="16.65"
              y2="16.65"
              stroke={color}
              strokeWidth={strokeWidth}
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </Svg>
        );

      case 'Edit':
        return (
          <Svg width={size} height={size} viewBox="0 0 24 24" fill="none">
            <Path
              d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"
              stroke={color}
              strokeWidth={strokeWidth}
              strokeLinecap="round"
              strokeLinejoin="round"
            />
            <Path
              d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"
              stroke={color}
              strokeWidth={strokeWidth}
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </Svg>
        );

      case 'Delete':
        return (
          <Svg width={size} height={size} viewBox="0 0 24 24" fill="none">
            <Polyline
              points="3 6 5 6 21 6"
              stroke={color}
              strokeWidth={strokeWidth}
              strokeLinecap="round"
              strokeLinejoin="round"
            />
            <Path
              d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"
              stroke={color}
              strokeWidth={strokeWidth}
              strokeLinecap="round"
              strokeLinejoin="round"
            />
            <Line
              x1="10"
              y1="11"
              x2="10"
              y2="17"
              stroke={color}
              strokeWidth={strokeWidth}
              strokeLinecap="round"
              strokeLinejoin="round"
            />
            <Line
              x1="14"
              y1="11"
              x2="14"
              y2="17"
              stroke={color}
              strokeWidth={strokeWidth}
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </Svg>
        );

      case 'ThreeDotsHorizontal':
        return (
          <Svg width={size} height={size} viewBox="0 0 24 24" fill="none">
            <Circle cx="12" cy="12" r="1" fill={color} />
            <Circle cx="19" cy="12" r="1" fill={color} />
            <Circle cx="5" cy="12" r="1" fill={color} />
          </Svg>
        );

      case 'ThreeDotsCircle':
        return (
          <Svg width={size} height={size} viewBox="0 0 24 24" fill="none">
            <Circle
              cx="12"
              cy="12"
              r="10"
              stroke={color}
              strokeWidth={strokeWidth}
              strokeLinecap="round"
              strokeLinejoin="round"
            />
            <Circle cx="12" cy="12" r="1" fill={color} />
            <Circle cx="12" cy="8" r="1" fill={color} />
            <Circle cx="12" cy="16" r="1" fill={color} />
          </Svg>
        );

      case 'Call':
        return (
          <Svg width={size} height={size} viewBox="0 0 24 24" fill="none">
            <Path
              d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"
              stroke={color}
              strokeWidth={strokeWidth}
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </Svg>
        );

      case 'Location':
        return (
          <Svg width={size} height={size} viewBox="0 0 24 24" fill="none">
            <Path
              d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"
              stroke={color}
              strokeWidth={strokeWidth}
              strokeLinecap="round"
              strokeLinejoin="round"
            />
            <Circle
              cx="12"
              cy="10"
              r="3"
              stroke={color}
              strokeWidth={strokeWidth}
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </Svg>
        );

      // Default fallback
      default:
        return (
          <Svg width={size} height={size} viewBox="0 0 24 24" fill="none">
            <Circle
              cx="12"
              cy="12"
              r="10"
              stroke={color}
              strokeWidth={strokeWidth}
              strokeLinecap="round"
              strokeLinejoin="round"
            />
            <Line
              x1="12"
              y1="8"
              x2="12"
              y2="12"
              stroke={color}
              strokeWidth={strokeWidth}
              strokeLinecap="round"
              strokeLinejoin="round"
            />
            <Line
              x1="12"
              y1="16"
              x2="12.01"
              y2="16"
              stroke={color}
              strokeWidth={strokeWidth}
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </Svg>
        );
    }
  };

  return <View style={{ width: size, height: size }}>{getIconPath()}</View>;
};

export default Icon;
