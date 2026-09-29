import type { GlyphProps } from './Glyph.types';

/**
 * Renders plain DOM SVG on web so colours can be CSS custom properties
 * (`currentColor` + `color: var(--kui-*)`), which SVG presentation attributes
 * don't support directly.
 */
export function Glyph({ paths, color, size = 24, width, height, viewBox = '0 0 24 24', strokeWidth = 2, label }: GlyphProps) {
  return (
    <svg
      width={width ?? size}
      height={height ?? size}
      viewBox={viewBox}
      role={label ? 'img' : undefined}
      aria-label={label}
      aria-hidden={label ? undefined : true}
      focusable="false"
      style={{ color, display: 'block', flexShrink: 0, overflow: 'visible' }}
    >
      {paths.map(({ d, fill }, index) => (
        <path
          key={index}
          d={d}
          fill={fill ? 'currentColor' : 'none'}
          stroke={fill ? 'none' : 'currentColor'}
          strokeWidth={fill ? undefined : strokeWidth}
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      ))}
    </svg>
  );
}
