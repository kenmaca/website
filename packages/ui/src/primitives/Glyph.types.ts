export interface GlyphPath {
  d: string;
  /** Filled shape instead of a stroked outline. */
  fill?: boolean;
}

export interface GlyphProps {
  paths: readonly GlyphPath[];
  color: string;
  size?: number;
  width?: number;
  height?: number;
  viewBox?: string;
  strokeWidth?: number;
  /** Accessible name. Decorative glyphs (the default) are hidden from assistive tech. */
  label?: string;
}
