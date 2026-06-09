import Svg, { Path, Circle, Line, Polyline, Polygon, Rect } from 'react-native-svg';

const stroke = (color, width) => ({ stroke: color, strokeWidth: width, fill: 'none' });

export function ChevronDown({ size = 12, color = '#fff' }) {
  return (
    <Svg width={size} height={size} viewBox="0 0 24 24" {...stroke(color, 2.5)}>
      <Path d="M6 9l6 6 6-6" strokeLinecap="round" strokeLinejoin="round" />
    </Svg>
  );
}

export function PersonOutline({ size = 26, color = '#333' }) {
  return (
    <Svg width={size} height={size} viewBox="0 0 24 24" {...stroke(color, 1.8)}>
      <Circle cx="12" cy="8" r="4" />
      <Path d="M20 20c0-4-3.6-7-8-7s-8 3-8 7" />
    </Svg>
  );
}

export function ChatOutline({ size = 26, color = '#333' }) {
  return (
    <Svg width={size} height={size} viewBox="0 0 24 24" {...stroke(color, 1.8)}>
      <Path d="M21 15a2 2 0 01-2 2H7l-4 4V5a2 2 0 012-2h14a2 2 0 012 2z" />
    </Svg>
  );
}

export function ChatFilled({ size = 24 }) {
  return (
    <Svg width={size} height={size} viewBox="0 0 24 24" fill="#111" stroke="#111" strokeWidth={1.8}>
      <Path d="M21 15a2 2 0 01-2 2H7l-4 4V5a2 2 0 012-2h14a2 2 0 012 2z" />
    </Svg>
  );
}

export function PlusIcon({ size = 16, color = '#fff' }) {
  return (
    <Svg width={size} height={size} viewBox="0 0 24 24" {...stroke(color, 2.5)}>
      <Line x1="12" y1="5" x2="12" y2="19" strokeLinecap="round" />
      <Line x1="5" y1="12" x2="19" y2="12" strokeLinecap="round" />
    </Svg>
  );
}

export function SearchIcon({ size = 16, color = '#999' }) {
  return (
    <Svg width={size} height={size} viewBox="0 0 24 24" {...stroke(color, 2.2)}>
      <Circle cx="11" cy="11" r="8" />
      <Line x1="21" y1="21" x2="16.65" y2="16.65" strokeLinecap="round" />
    </Svg>
  );
}

export function GridDotsIcon({ size = 20, color = '#bbb' }) {
  return (
    <Svg width={size} height={size} viewBox="0 0 24 24" {...stroke(color, 1.8)}>
      <Rect x="3" y="3" width="18" height="18" rx="2" />
      <Path d="M9 9h.01M15 9h.01M9 15h.01M15 15h.01" strokeLinecap="round" />
    </Svg>
  );
}

export function PlayTriangle({ size = 24, color = '#aaa' }) {
  return (
    <Svg width={size} height={size} viewBox="0 0 24 24" {...stroke(color, 1.8)}>
      <Polygon points="5 3 19 12 5 21 5 3" />
    </Svg>
  );
}

export function HomeIcon({ size = 24, color = '#aaa' }) {
  return (
    <Svg width={size} height={size} viewBox="0 0 24 24" {...stroke(color, 1.8)}>
      <Path d="M3 9l9-7 9 7v11a2 2 0 01-2 2H5a2 2 0 01-2-2z" />
      <Polyline points="9 22 9 12 15 12 15 22" />
    </Svg>
  );
}

export function NewsIcon({ size = 24, color = '#aaa' }) {
  return (
    <Svg width={size} height={size} viewBox="0 0 24 24" {...stroke(color, 1.8)}>
      <Path d="M4 22h16a2 2 0 002-2V4a2 2 0 00-2-2H8a2 2 0 00-2 2v16a4 4 0 01-4-4V6" />
      <Line x1="10" y1="7" x2="17" y2="7" />
      <Line x1="10" y1="11" x2="17" y2="11" />
    </Svg>
  );
}

export function MiniIcon({ size = 24, color = '#aaa' }) {
  return (
    <Svg width={size} height={size} viewBox="0 0 24 24" {...stroke(color, 1.8)}>
      <Rect x="3" y="3" width="18" height="18" rx="3" />
      <Path d="M9 12h6M12 9v6" strokeLinecap="round" />
    </Svg>
  );
}

export function BackChevron({ size = 11, height = 20, color = '#333' }) {
  return (
    <Svg width={size} height={height} viewBox="0 0 11 20" fill="none">
      <Path d="M10 1.5L2 10L10 18.5" stroke={color} strokeWidth={2.2} strokeLinecap="round" strokeLinejoin="round" />
    </Svg>
  );
}

export function PhoneIcon({ size = 22, color = '#333' }) {
  return (
    <Svg width={size} height={size} viewBox="0 0 24 24" {...stroke(color, 1.8)}>
      <Path d="M22 16.92v3a2 2 0 01-2.18 2 19.79 19.79 0 01-8.63-3.07A19.5 19.5 0 013.07 9.81 19.79 19.79 0 012 1.18 2 2 0 014 0h3a2 2 0 012 1.72c.127.96.361 1.903.7 2.81a2 2 0 01-.45 2.11L8.09 7.91a16 16 0 006 6l1.27-1.27a2 2 0 012.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0122 16.92z" />
    </Svg>
  );
}

export function MenuDotsIcon({ size = 20, color = '#333' }) {
  return (
    <Svg width={size} height={size} viewBox="0 0 24 24" fill={color}>
      <Circle cx="12" cy="5" r="1.8" />
      <Circle cx="12" cy="12" r="1.8" />
      <Circle cx="12" cy="19" r="1.8" />
    </Svg>
  );
}

export function PlusCircleSmall({ size = 27, color = '#888' }) {
  return (
    <Svg width={size} height={size} viewBox="0 0 24 24" {...stroke(color, 1.7)}>
      <Line x1="12" y1="5" x2="12" y2="19" strokeLinecap="round" />
      <Line x1="5" y1="12" x2="19" y2="12" strokeLinecap="round" />
    </Svg>
  );
}

export function CameraIcon({ size = 27, color = '#888' }) {
  return (
    <Svg width={size} height={size} viewBox="0 0 24 24" {...stroke(color, 1.7)}>
      <Path d="M23 19a2 2 0 01-2 2H3a2 2 0 01-2-2V8a2 2 0 012-2h4l2-3h6l2 3h4a2 2 0 012 2z" />
      <Circle cx="12" cy="13" r="4" />
    </Svg>
  );
}

export function GalleryIcon({ size = 27, color = '#888' }) {
  return (
    <Svg width={size} height={size} viewBox="0 0 24 24" {...stroke(color, 1.7)}>
      <Rect x="3" y="3" width="18" height="18" rx="2" />
      <Circle cx="8.5" cy="8.5" r="1.5" />
      <Polyline points="21,15 16,10 5,21" />
    </Svg>
  );
}

export function MicIcon({ size = 27, color = '#888' }) {
  return (
    <Svg width={size} height={size} viewBox="0 0 24 24" {...stroke(color, 1.7)}>
      <Path d="M12 1a3 3 0 00-3 3v8a3 3 0 006 0V4a3 3 0 00-3-3z" />
      <Path d="M19 10v2a7 7 0 01-14 0v-2" />
      <Line x1="12" y1="19" x2="12" y2="23" />
      <Line x1="8" y1="23" x2="16" y2="23" />
    </Svg>
  );
}

export function CheckmarkIcon({ size = 10, color = 'white' }) {
  return (
    <Svg width={size} height={size} viewBox="0 0 24 24" fill="none">
      <Path d="M20 6L9 17l-5-5" stroke={color} strokeWidth={2.5} strokeLinecap="round" strokeLinejoin="round" />
    </Svg>
  );
}

export function PlayIconSmall({ size = 15 }) {
  return (
    <Svg width={size} height={size} viewBox="0 0 24 24" fill="white">
      <Path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 14.5v-9l6 4.5-6 4.5z" />
    </Svg>
  );
}

export function SmileIcon({ size = 20, color = '#5f6368' }) {
  return (
    <Svg width={size} height={size} viewBox="0 0 24 24" fill="none"
      stroke={color} strokeWidth={2} strokeLinecap="round" strokeLinejoin="round">
      <Circle cx="12" cy="12" r="10" />
      <Path d="M8 14s1.5 2 4 2 4-2 4-2" />
      <Line x1="9" y1="9" x2="9.01" y2="9" />
      <Line x1="15" y1="9" x2="15.01" y2="9" />
    </Svg>
  );
}
