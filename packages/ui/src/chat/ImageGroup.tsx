import { Image, Pressable, StyleSheet, View } from 'react-native';

import { useInteractionState } from '../hooks/useInteractionState';
import { radii } from '../theme/tokens';
import { linkProps } from '../utils/links';
import { transition } from '../utils/web';
import type { ChatImage } from './types';

const GROUP_WIDTH = 300;
const GAP = 3;

/**
 * Photos sent together, laid out like iMessage: with an odd count the first
 * photo spans the full width, the rest sit side by side in pairs.
 */
export function ImageGroup({ images }: { images: readonly ChatImage[] }) {
  const rows: ChatImage[][] = [];
  const rest = [...images];
  if (rest.length % 2 === 1) rows.push(rest.splice(0, 1));
  while (rest.length) rows.push(rest.splice(0, 2));

  return (
    <View role="group" aria-label={`${images.length} photos`} style={styles.group}>
      {rows.map((row, rowIndex) => (
        <View key={rowIndex} style={styles.row}>
          {row.map((image, index) => (
            <Tile key={index} image={image} aspectRatio={row.length === 1 ? 4 / 3 : 1} />
          ))}
        </View>
      ))}
    </View>
  );
}

function Tile({ image, aspectRatio }: { image: ChatImage; aspectRatio: number }) {
  const { state, handlers } = useInteractionState();
  const picture = (
    <Image
      source={image.source}
      alt={image.alt}
      accessibilityLabel={image.alt}
      resizeMode="cover"
      style={[
        styles.image,
        { aspectRatio },
        { transform: [{ scale: state.hovered ? 1.05 : 1 }] },
        transition(['transform'], 500),
      ]}
    />
  );

  if (!image.href) return <View style={styles.tile}>{picture}</View>;
  return (
    <Pressable {...handlers} {...linkProps(image.href)} accessibilityLabel={image.alt} style={styles.tile}>
      {picture}
    </Pressable>
  );
}

const styles = StyleSheet.create({
  group: {
    width: GROUP_WIDTH,
    maxWidth: '100%',
    gap: GAP,
    borderRadius: radii.lg,
    overflow: 'hidden',
  },
  row: {
    flexDirection: 'row',
    gap: GAP,
  },
  tile: {
    flex: 1,
    overflow: 'hidden',
  },
  image: {
    width: '100%',
    // Override the intrinsic asset height react-native-web applies.
    height: 'auto',
  },
});
