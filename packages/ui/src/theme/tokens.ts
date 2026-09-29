import { Easing, Platform } from 'react-native';

/** 4pt spacing scale. */
export const space = {
  0: 0,
  1: 4,
  2: 8,
  3: 12,
  4: 16,
  5: 20,
  6: 24,
  8: 32,
  10: 40,
  12: 48,
  16: 64,
  20: 80,
  24: 96,
  32: 128,
} as const;

export const radii = {
  sm: 8,
  md: 12,
  lg: 20,
  xl: 28,
  pill: 999,
} as const;

/**
 * Font stacks. On web these reference the Google Fonts loaded by the host app
 * (Inter, Inter Tight, Instrument Serif) with sensible system fallbacks; on
 * native they fall back to the platform system fonts.
 */
export const fonts = Platform.select({
  web: {
    display: '"Inter Tight", "Inter", ui-sans-serif, system-ui, -apple-system, "Segoe UI", sans-serif',
    body: '"Inter", ui-sans-serif, system-ui, -apple-system, "Segoe UI", Roboto, sans-serif',
    serif: '"Instrument Serif", ui-serif, Georgia, "Times New Roman", serif',
    chat: '-apple-system, BlinkMacSystemFont, "SF Pro Text", "Inter", system-ui, "Segoe UI", sans-serif',
    mono: 'ui-monospace, "SF Mono", SFMono-Regular, Menlo, Consolas, monospace',
  },
  default: {
    display: undefined,
    body: undefined,
    serif: Platform.OS === 'ios' ? 'Georgia' : 'serif',
    chat: undefined,
    mono: Platform.OS === 'ios' ? 'Menlo' : 'monospace',
  },
});

export const motion = {
  duration: {
    fast: 160,
    base: 280,
    slow: 600,
    slower: 900,
  },
  /** CSS-compatible cubic-bezier curves, reused for Animated + CSS transitions. */
  curve: {
    outExpo: [0.16, 1, 0.3, 1] as const,
    inOut: [0.65, 0, 0.35, 1] as const,
    spring: [0.34, 1.56, 0.64, 1] as const,
  },
} as const;

export type CurveName = keyof typeof motion.curve;

export const easing = (name: CurveName) => {
  const [x1, y1, x2, y2] = motion.curve[name];
  return Easing.bezier(x1, y1, x2, y2);
};

export const cssEasing = (name: CurveName) => `cubic-bezier(${motion.curve[name].join(', ')})`;

/** Layout breakpoints (min-width, in dp/px). */
export const breakpoints = {
  sm: 640,
  md: 768,
  lg: 1024,
  xl: 1280,
} as const;

export const layout = {
  maxWidth: 1120,
  readableWidth: 680,
  gutter: 20,
} as const;
