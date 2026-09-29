import Svg, { Path } from 'react-native-svg';

import type { GlyphProps } from './Glyph.types';

/** Native SVG glyph, backed by react-native-svg. */
export function Glyph({ paths, color, size = 24, width, height, viewBox = '0 0 24 24', strokeWidth = 2, label }: GlyphProps) {
  return (
    <Svg
      width={width ?? size}
      height={height ?? size}
      viewBox={viewBox}
      accessible={!!label}
      accessibilityLabel={label}
      style={{ overflow: 'visible' }}
    >
      {paths.map(({ d, fill }, index) => (
        <Path
          key={index}
          d={d}
          fill={fill ? color : 'none'}
          stroke={fill ? 'none' : color}
          strokeWidth={fill ? undefined : strokeWidth}
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      ))}
    </Svg>
  );
}
