import Svg, { Path } from 'react-native-svg';

import { SIGNATURE_ASPECT, SIGNATURE_VIEWBOX, signaturePaths } from './signaturePaths';

/** Native: static signature rendered with react-native-svg. */
export function Signature({ width = 240, color = '#FFFFFF' }: { width?: number; color?: string }) {
  return (
    <Svg viewBox={SIGNATURE_VIEWBOX} width={width} height={width / SIGNATURE_ASPECT} accessibilityLabel="Kenneth Ma's signature">
      {signaturePaths.map(({ id, d }) => (
        <Path
          key={id}
          d={d}
          fill="none"
          stroke={color}
          strokeWidth={id === 'letters' || id === 'm' ? 4 : 3}
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      ))}
    </Svg>
  );
}
