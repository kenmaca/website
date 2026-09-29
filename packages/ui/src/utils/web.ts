import { Platform, type TextStyle, type ViewStyle } from 'react-native';

export const isWeb = Platform.OS === 'web';

/**
 * CSS-only style properties that react-native-web forwards to the DOM but
 * React Native's types don't know about (transitions, backdrop filters,
 * `clamp()` sizes, etc.).
 */
export interface WebOnlyStyle {
  transitionProperty?: string;
  transitionDuration?: string;
  transitionTimingFunction?: string;
  transitionDelay?: string;
  backdropFilter?: string;
  WebkitBackdropFilter?: string;
  backgroundImage?: string;
  backgroundSize?: string;
  backgroundPosition?: string;
  backgroundClip?: string;
  WebkitBackgroundClip?: string;
  WebkitTextFillColor?: string;
  cursor?: string;
  userSelect?: string;
  willChange?: string;
  scrollMarginTop?: number | string;
  textWrap?: 'balance' | 'pretty' | 'wrap';
  outlineStyle?: string;
  outlineWidth?: number;
  outlineColor?: string;
  outlineOffset?: number;
  fontSize?: string | number;
  lineHeight?: string | number;
  letterSpacing?: string | number;
  minHeight?: string | number;
  position?: 'sticky' | 'fixed' | 'absolute' | 'relative';
  inset?: number | string;
  top?: number | string;
  textDecorationThickness?: string;
  textUnderlineOffset?: string;
  /** `clip` behaves like `hidden` but can't be scrolled programmatically (e.g. by focus). */
  overflow?: 'clip';
  maskImage?: string;
  WebkitMaskImage?: string;
}

/**
 * Returns the given web-only style on web and nothing elsewhere. The result is
 * typed as a regular RN style so it can be composed into `style` arrays.
 */
export function webStyle<T extends ViewStyle | TextStyle = ViewStyle>(style: WebOnlyStyle): T | undefined {
  return isWeb ? (style as unknown as T) : undefined;
}

/**
 * Fluid size that scales with the viewport on web (`clamp()`), falling back to
 * `fallback` (default: `max`) on native.
 */
export function fluid(min: number, preferredVw: number, max: number, fallback = max): number {
  if (!isWeb) return fallback;
  return `clamp(${min}px, ${preferredVw}vw, ${max}px)` as unknown as number;
}

/**
 * CSS transition helper for hover/focus affordances on web. The empty return
 * type composes into View, Text and Image styles alike.
 */
export function transition(
  properties: string[],
  duration = 200,
  easing = 'cubic-bezier(0.16, 1, 0.3, 1)',
): Record<never, never> | undefined {
  return webStyle({
    transitionProperty: properties.join(', '),
    transitionDuration: `${duration}ms`,
    transitionTimingFunction: easing,
  });
}
