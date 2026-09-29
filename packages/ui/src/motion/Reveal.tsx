import { useEffect, useRef, useState, type ReactNode } from 'react';
import { Animated, View, type StyleProp, type ViewProps, type ViewStyle } from 'react-native';

import { useHydrated } from '../hooks/useHydrated';
import { useInView } from '../hooks/useInView';
import { useReducedMotion } from '../hooks/useReducedMotion';
import { easing, motion, type CurveName } from '../theme/tokens';
import { isWeb } from '../utils/web';

export type RevealFrom = 'up' | 'down' | 'left' | 'right' | 'scale' | 'fade';

export interface RevealProps extends ViewProps {
  children: ReactNode;
  /** Direction the content travels in from. */
  from?: RevealFrom;
  /** Travel distance in px for directional reveals. */
  distance?: number;
  delay?: number;
  duration?: number;
  curve?: CurveName;
  /** `inView` waits until scrolled into view; `mount` plays immediately. */
  trigger?: 'inView' | 'mount';
  /** Portion of the element that must be visible before revealing. */
  threshold?: number;
  /** Extra condition that must also hold, e.g. "the preceding content has finished". */
  when?: boolean;
  style?: StyleProp<ViewStyle>;
}

/** Marks elements so a `<noscript>` rule can reveal them without JavaScript. */
export const REVEAL_DATA_ATTRIBUTE = 'data-kui-reveal';

/**
 * Fades and slides its children in — on mount or when scrolled into view.
 * Honours the OS "reduce motion" preference.
 */
export function Reveal({
  children,
  from = 'up',
  distance = 24,
  delay = 0,
  duration = motion.duration.slower,
  curve = 'outExpo',
  trigger = 'inView',
  threshold,
  when = true,
  style,
  ...rest
}: RevealProps) {
  const ref = useRef<View>(null);
  const inView = useInView(ref, { threshold });
  const mounted = useHydrated();
  const reducedMotion = useReducedMotion();
  const [progress] = useState(() => new Animated.Value(0));
  const visible = (trigger === 'mount' ? mounted : inView) && when;

  useEffect(() => {
    if (!visible) return;
    if (reducedMotion) {
      progress.setValue(1);
      return;
    }
    const animation = Animated.timing(progress, {
      toValue: 1,
      duration,
      delay,
      easing: easing(curve),
      useNativeDriver: !isWeb,
    });
    animation.start();
    return () => animation.stop();
  }, [visible, reducedMotion, progress, duration, delay, curve]);

  const offset = progress.interpolate({ inputRange: [0, 1], outputRange: [distance, 0] });
  const transform = (() => {
    switch (from) {
      case 'up':
        return [{ translateY: offset }];
      case 'down':
        return [{ translateY: Animated.multiply(offset, -1) }];
      case 'left':
        return [{ translateX: Animated.multiply(offset, -1) }];
      case 'right':
        return [{ translateX: offset }];
      case 'scale':
        return [{ scale: progress.interpolate({ inputRange: [0, 1], outputRange: [0.94, 1] }) }];
      case 'fade':
        return [];
    }
  })();

  return (
    <Animated.View
      ref={ref}
      {...rest}
      {...({ dataSet: { kuiReveal: '' } } as object)}
      style={[style, { opacity: progress, transform }]}
    >
      {children}
    </Animated.View>
  );
}
