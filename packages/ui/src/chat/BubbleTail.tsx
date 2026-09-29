import { StyleSheet, View } from 'react-native';

import { Glyph } from '../primitives/Glyph';
import type { BubbleDirection } from './types';

export const TAIL_WIDTH = 24;
export const TAIL_HEIGHT = 24;
/** How far the tail pokes out beyond the bubble edge. */
export const TAIL_OVERHANG = 6;

// Drawn for an incoming (left) bubble and mirrored for outgoing. The bubble's
// edge sits at x = 6: the shape fills the bubble's rounded corner, sweeps out
// to a tip at the bottom-left, then curves back with a shallow notch.
const TAIL_PATH = [
  {
    d: 'M6 2V12C6 17.6 3.7 21.4 0 23.8C5.5 24.6 11 22.6 15 22.2C18 22 20.5 24 24 24V2Z',
    fill: true,
  },
];

export function BubbleTail({ direction, color }: { direction: BubbleDirection; color: string }) {
  const incoming = direction === 'incoming';
  return (
    <View
      pointerEvents="none"
      aria-hidden
      style={[styles.tail, incoming ? styles.incoming : styles.outgoing]}
    >
      <Glyph paths={TAIL_PATH} color={color} width={TAIL_WIDTH} height={TAIL_HEIGHT} viewBox={`0 0 ${TAIL_WIDTH} ${TAIL_HEIGHT}`} />
    </View>
  );
}

const styles = StyleSheet.create({
  tail: {
    position: 'absolute',
    bottom: 0,
    width: TAIL_WIDTH,
    height: TAIL_HEIGHT,
  },
  incoming: {
    left: -TAIL_OVERHANG,
  },
  outgoing: {
    right: -TAIL_OVERHANG,
    transform: [{ scaleX: -1 }],
  },
});
