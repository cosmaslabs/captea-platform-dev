/**
 * Enhanced Icon System - Facebook/WhatsApp Inspired
 * Premium icon package with filled and outlined variants
 * Supports dynamic sizing, colors, and state-based rendering
 *
 * Features:
 * - Filled variants for active states (Facebook/WhatsApp style)
 * - Outlined variants for inactive states
 * - Customizable size, color, strokeWidth
 * - Optimized for bottom navigation
 * - Material Design 3 + Apple HCI principles
 *
 * @param {string} name - Icon name (Home, Messages, Plus, Bell, User, etc.)
 * @param {number} size - Icon size in pixels (default: 24)
 * @param {string} color - Icon color (default: theme.colors.text)
 * @param {number} strokeWidth - Stroke width (default: 2)
 * @param {boolean} filled - Use filled variant (default: false)
 * @param {string} fill - Fill color for filled icons
 */

import { View } from 'react-native';
import Svg, { Circle, Line, Path, Polygon, Polyline, Rect } from 'react-native-svg';
import { theme } from '../../constants/theme';

const Icon = ({
  name,
  size = 24,
  color = theme.colors.text,
  strokeWidth = 2,
  filled = false,
  fill = 'none',
}) => {
  const getIconPath = () => {
    switch (name) {
      // ==================== NAVIGATION ICONS ====================

      case 'Home':
        if (filled) {
          return (
            <Svg width={size} height={size} viewBox="0 0 24 24" fill="none">
              <Path
                d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"
                fill={color}
                stroke={color}
                strokeWidth={0.5}
                strokeLinecap="round"
                strokeLinejoin="round"
              />
              <Path
                d="M9 22V12h6v10"
                fill={fill === 'none' ? theme.colors.background : fill}
              />
            </Svg>
          );
        }
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

      case 'MessageCircle':
      case 'Messages':
        if (filled) {
          return (
            <Svg width={size} height={size} viewBox="0 0 24 24" fill="none">
              <Path
                d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z"
                fill={color}
                stroke={color}
                strokeWidth={0.5}
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </Svg>
          );
        }
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

      case 'Plus':
      case 'PlusCircle':
        if (filled) {
          return (
            <Svg width={size} height={size} viewBox="0 0 24 24" fill="none">
              <Circle cx="12" cy="12" r="10" fill={color} />
              <Line
                x1="12"
                y1="8"
                x2="12"
                y2="16"
                stroke={fill === 'none' ? theme.colors.onPrimary : fill}
                strokeWidth={strokeWidth}
                strokeLinecap="round"
                strokeLinejoin="round"
              />
              <Line
                x1="8"
                y1="12"
                x2="16"
                y2="12"
                stroke={fill === 'none' ? theme.colors.onPrimary : fill}
                strokeWidth={strokeWidth}
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </Svg>
          );
        }
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

      case 'Bell':
      case 'Notifications':
        if (filled) {
          return (
            <Svg width={size} height={size} viewBox="0 0 24 24" fill="none">
              <Path
                d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9"
                fill={color}
                stroke={color}
                strokeWidth={0.5}
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
        }
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

      case 'User':
      case 'Profile':
        if (filled) {
          return (
            <Svg width={size} height={size} viewBox="0 0 24 24" fill="none">
              <Path
                d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"
                fill={color}
                stroke={color}
                strokeWidth={0.5}
                strokeLinecap="round"
                strokeLinejoin="round"
              />
              <Circle cx="12" cy="7" r="4" fill={color} />
            </Svg>
          );
        }
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

      // ==================== ACTION ICONS ====================

      case 'Heart':
      case 'Like':
        if (filled) {
          return (
            <Svg width={size} height={size} viewBox="0 0 24 24" fill="none">
              <Path
                d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"
                fill={color}
                stroke={color}
                strokeWidth={0.5}
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </Svg>
          );
        }
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

      case 'Bookmark':
        if (filled) {
          return (
            <Svg width={size} height={size} viewBox="0 0 24 24" fill="none">
              <Path
                d="M19 21l-7-5-7 5V5a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2z"
                fill={color}
                stroke={color}
                strokeWidth={0.5}
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </Svg>
          );
        }
        return (
          <Svg width={size} height={size} viewBox="0 0 24 24" fill="none">
            <Path
              d="M19 21l-7-5-7 5V5a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2z"
              stroke={color}
              strokeWidth={strokeWidth}
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </Svg>
        );

      case 'Send':
      case 'Share':
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
              fill={filled ? color : 'none'}
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </Svg>
        );

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

      case 'MoreHorizontal':
      case 'ThreeDots':
        return (
          <Svg width={size} height={size} viewBox="0 0 24 24" fill="none">
            <Circle cx="12" cy="12" r="1.5" fill={color} />
            <Circle cx="19" cy="12" r="1.5" fill={color} />
            <Circle cx="5" cy="12" r="1.5" fill={color} />
          </Svg>
        );

      case 'MoreVertical':
        return (
          <Svg width={size} height={size} viewBox="0 0 24 24" fill="none">
            <Circle cx="12" cy="12" r="1.5" fill={color} />
            <Circle cx="12" cy="5" r="1.5" fill={color} />
            <Circle cx="12" cy="19" r="1.5" fill={color} />
          </Svg>
        );

      case 'ChevronUp':
        return (
          <Svg width={size} height={size} viewBox="0 0 24 24" fill="none">
            <Polyline
              points="18 15 12 9 6 15"
              stroke={color}
              strokeWidth={strokeWidth}
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </Svg>
        );

      case 'ChevronDown':
        return (
          <Svg width={size} height={size} viewBox="0 0 24 24" fill="none">
            <Polyline
              points="6 9 12 15 18 9"
              stroke={color}
              strokeWidth={strokeWidth}
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </Svg>
        );

      case 'ChevronLeft':
      case 'ArrowLeft':
        return (
          <Svg width={size} height={size} viewBox="0 0 24 24" fill="none">
            <Polyline
              points="15 18 9 12 15 6"
              stroke={color}
              strokeWidth={strokeWidth}
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </Svg>
        );

      case 'ChevronRight':
        return (
          <Svg width={size} height={size} viewBox="0 0 24 24" fill="none">
            <Polyline
              points="9 18 15 12 9 6"
              stroke={color}
              strokeWidth={strokeWidth}
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </Svg>
        );

      case 'X':
      case 'Close':
        return (
          <Svg width={size} height={size} viewBox="0 0 24 24" fill="none">
            <Line
              x1="18"
              y1="6"
              x2="6"
              y2="18"
              stroke={color}
              strokeWidth={strokeWidth}
              strokeLinecap="round"
              strokeLinejoin="round"
            />
            <Line
              x1="6"
              y1="6"
              x2="18"
              y2="18"
              stroke={color}
              strokeWidth={strokeWidth}
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </Svg>
        );

      // ==================== MEDIA ICONS ====================

      case 'Image':
      case 'Photo':
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
            <Circle cx="8.5" cy="8.5" r="1.5" fill={color} />
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
      case 'PlayCircle':
        if (filled) {
          return (
            <Svg width={size} height={size} viewBox="0 0 24 24" fill="none">
              <Circle cx="12" cy="12" r="10" fill={color} />
              <Polygon
                points="10 8 16 12 10 16 10 8"
                fill={fill === 'none' ? theme.colors.onPrimary : fill}
              />
            </Svg>
          );
        }
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
            <Polygon
              points="10 8 16 12 10 16 10 8"
              stroke={color}
              strokeWidth={strokeWidth}
              fill="none"
              strokeLinecap="round"
              strokeLinejoin="round"
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

      // ==================== AUTH ICONS ====================

      case 'Mail':
      case 'Email':
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

      case 'Eye':
        return (
          <Svg width={size} height={size} viewBox="0 0 24 24" fill="none">
            <Path
              d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"
              stroke={color}
              strokeWidth={strokeWidth}
              strokeLinecap="round"
              strokeLinejoin="round"
            />
            <Circle cx="12" cy="12" r="3" stroke={color} strokeWidth={strokeWidth} />
          </Svg>
        );

      case 'EyeOff':
        return (
          <Svg width={size} height={size} viewBox="0 0 24 24" fill="none">
            <Path
              d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19m-6.72-1.07a3 3 0 1 1-4.24-4.24"
              stroke={color}
              strokeWidth={strokeWidth}
              strokeLinecap="round"
              strokeLinejoin="round"
            />
            <Line
              x1="1"
              y1="1"
              x2="23"
              y2="23"
              stroke={color}
              strokeWidth={strokeWidth}
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </Svg>
        );

      // ==================== UTILITY ICONS ====================

      case 'Settings':
      case 'Gear':
        return (
          <Svg width={size} height={size} viewBox="0 0 24 24" fill="none">
            <Circle cx="12" cy="12" r="3" stroke={color} strokeWidth={strokeWidth} />
            <Path
              d="M12 1v6m0 6v6m5.2-17.2l-4.3 4.3M7.8 16.8l-4.3 4.3m0-16.2l4.3 4.3m4.3 4.3l4.3 4.3M1 12h6m6 0h6"
              stroke={color}
              strokeWidth={strokeWidth}
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </Svg>
        );

      case 'Edit':
      case 'Pencil':
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

      case 'Trash':
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
          </Svg>
        );

      case 'Check':
        return (
          <Svg width={size} height={size} viewBox="0 0 24 24" fill="none">
            <Polyline
              points="20 6 9 17 4 12"
              stroke={color}
              strokeWidth={strokeWidth}
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </Svg>
        );

      case 'CheckCircle':
        if (filled) {
          return (
            <Svg width={size} height={size} viewBox="0 0 24 24" fill="none">
              <Path
                d="M22 11.08V12a10 10 0 1 1-5.93-9.14"
                stroke={color}
                strokeWidth={strokeWidth}
                strokeLinecap="round"
                strokeLinejoin="round"
              />
              <Polyline
                points="22 4 12 14.01 9 11.01"
                stroke={color}
                strokeWidth={strokeWidth}
                strokeLinecap="round"
                strokeLinejoin="round"
              />
              <Circle cx="12" cy="12" r="10" fill={color} opacity="0.2" />
            </Svg>
          );
        }
        return (
          <Svg width={size} height={size} viewBox="0 0 24 24" fill="none">
            <Path
              d="M22 11.08V12a10 10 0 1 1-5.93-9.14"
              stroke={color}
              strokeWidth={strokeWidth}
              strokeLinecap="round"
              strokeLinejoin="round"
            />
            <Polyline
              points="22 4 12 14.01 9 11.01"
              stroke={color}
              strokeWidth={strokeWidth}
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </Svg>
        );

      case 'AlertCircle':
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
