import { StyleSheet } from 'react-native';

import { Text } from '../primitives/Text';
import type { BubbleDirection } from './types';

/** Small name label shown above a group of bubbles. */
export function SenderLabel({ name, direction }: { name: string; direction: BubbleDirection }) {
  return (
    <Text
      variant="caption"
      tone="subtle"
      weight="500"
      style={[styles.label, direction === 'incoming' ? styles.incoming : styles.outgoing]}
    >
      {name}
    </Text>
  );
}

const styles = StyleSheet.create({
  label: {
    paddingHorizontal: 14,
    marginBottom: 4,
  },
  incoming: {
    alignSelf: 'flex-start',
  },
  outgoing: {
    alignSelf: 'flex-end',
  },
});
