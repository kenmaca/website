import { SIGNATURE_ASPECT, SIGNATURE_VIEWBOX, signaturePaths } from './signaturePaths';

/**
 * Web: plain SVG whose strokes are drawn in sequence by CSS keyframes (see
 * `styles/global.ts`). Because it's pure CSS, the animation starts as soon as
 * the static HTML paints — no need to wait for hydration.
 */
export function Signature({ width = 240, color = '#FFFFFF' }: { width?: number; color?: string }) {
  return (
    <svg
      data-km-signature=""
      viewBox={SIGNATURE_VIEWBOX}
      width={width}
      height={width / SIGNATURE_ASPECT}
      role="img"
      aria-label="Kenneth Ma's signature"
      style={{ color, overflow: 'visible', display: 'block', opacity: 0.9 }}
    >
      {signaturePaths.map(({ id, d }) => (
        <path key={id} data-stroke={id} d={d} />
      ))}
    </svg>
  );
}
