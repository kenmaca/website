import { useEffect, useState } from 'react';
import { Animated, Easing, StyleSheet, View, type StyleProp, type ViewStyle } from 'react-native';

import { useReducedMotion } from '../hooks/useReducedMotion';
import { useTheme } from '../theme/ThemeProvider';
import { radii } from '../theme/tokens';
import { isWeb } from '../utils/web';
import { BubbleTail } from './BubbleTail';
import type { BubbleDirection } from './types';

const DOT_COUNT = 3;
const CYCLE_MS = 1200;

export interface TypingIndicatorProps {
  direction?: BubbleDirection;
  style?: StyleProp<ViewStyle>;
}

/** The familiar "…" bubble with three softly bouncing dots. */
export function TypingIndicator({ direction = 'incoming', style }: TypingIndicatorProps) {
  const { colors } = useTheme();
  const reducedMotion = useReducedMotion();
  const [phase] = useState(() => new Animated.Value(0));
  const incoming = direction === 'incoming';
  const background = incoming ? colors.bubbleIncoming : colors.bubbleOutgoing;

  useEffect(() => {
    if (reducedMotion) return;
    const loop = Animated.loop(
      Animated.timing(phase, {
        toValue: 1,
        duration: CYCLE_MS,
        easing: Easing.linear,
        useNativeDriver: !isWeb,
      }),
    );
    loop.start();
    return () => loop.stop();
  }, [phase, reducedMotion]);

  return (
    <View
      role="status"
      aria-label="Typing"
      style={[styles.row, incoming ? styles.incoming : styles.outgoing, style]}
    >
      <BubbleTail direction={direction} color={background} />
      <View style={[styles.bubble, { backgroundColor: background }]}>
        {Array.from({ length: DOT_COUNT }, (_, index) => {
          // Each dot peaks a third of a cycle after the previous one.
          const start = index * 0.18;
          const inputRange = [0, start, start + 0.18, start + 0.36, 1];
          return (
            <Animated.View
              key={index}
              style={[
                styles.dot,
                { backgroundColor: incoming ? colors.typingDot : colors.bubbleOutgoingText },
                !reducedMotion && {
                  opacity: phase.interpolate({ inputRange, outputRange: [0.4, 0.4, 1, 0.4, 0.4] }),
                  transform: [{ translateY: phase.interpolate({ inputRange, outputRange: [0, 0, -3, 0, 0] }) }],
                },
              ]}
            />
          );
        })}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  row: {
    position: 'relative',
  },
  incoming: {
    alignSelf: 'flex-start',
  },
  outgoing: {
    alignSelf: 'flex-end',
  },
  bubble: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 5,
    height: 38,
    paddingHorizontal: 15,
    borderRadius: radii.lg,
  },
  dot: {
    width: 8,
    height: 8,
    borderRadius: 4,
  },
});
