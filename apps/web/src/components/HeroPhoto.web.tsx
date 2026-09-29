import { View } from 'react-native';

/**
 * Web: a CSS background so its framing can change per breakpoint (see the
 * `[data-km-hero-photo]` rules in `styles/global.ts`), keeping Ken — second
 * from the left — clear of the intro text on every screen size.
 */
export function HeroPhoto() {
  return <View {...({ dataSet: { kmHeroPhoto: '' } } as object)} />;
}
