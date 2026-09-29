import { Glyph } from './Glyph';
import type { GlyphPath } from './Glyph.types';

/** Outline icons (24×24, 2px stroke) in the style of Lucide. */
export const icons = {
  sun: [
    { d: 'M16 12a4 4 0 1 1-8 0 4 4 0 0 1 8 0Z' },
    { d: 'M12 2v2M12 20v2M4.93 4.93l1.41 1.41M17.66 17.66l1.41 1.41M2 12h2M20 12h2M6.34 17.66l-1.41 1.41M19.07 4.93l-1.41 1.41' },
  ],
  moon: [{ d: 'M12 3a6 6 0 0 0 9 9 9 9 0 1 1-9-9Z' }],
  arrowRight: [{ d: 'M5 12h14M12 5l7 7-7 7' }],
  arrowUpRight: [{ d: 'M7 17 17 7M7 7h10v10' }],
  chevronDown: [{ d: 'm6 9 6 6 6-6' }],
  mail: [
    { d: 'M4 4h16a2 2 0 0 1 2 2v12a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2Z' },
    { d: 'm22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7' },
  ],
  file: [
    { d: 'M15 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7Z' },
    { d: 'M14 2v4a2 2 0 0 0 2 2h4M16 13H8M16 17H8M10 9H8' },
  ],
  linkedin: [
    { d: 'M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6Z' },
    { d: 'M2 9h4v12H2z' },
    { d: 'M6 4a2 2 0 1 1-4 0 2 2 0 0 1 4 0Z' },
  ],
  github: [
    {
      d: 'M15 22v-4a4.8 4.8 0 0 0-1-3.5c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36-.5-8 0C6 2 5 2 5 2c-.3 1.15-.3 2.35 0 3.5A5.4 5.4 0 0 0 4 9c0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65-.17.6-.22 1.23-.15 1.85v4',
    },
    { d: 'M9 18c-4.51 2-5-2-7-2' },
  ],
  mapPin: [
    { d: 'M20 10c0 5-5.54 10.19-7.4 11.8a1 1 0 0 1-1.2 0C9.54 20.19 4 15 4 10a8 8 0 0 1 16 0Z' },
    { d: 'M15 10a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z' },
  ],
  graduationCap: [
    { d: 'M21.42 10.92a1 1 0 0 0-.02-1.84l-8.57-3.9a2 2 0 0 0-1.66 0l-8.57 3.9a1 1 0 0 0 0 1.83l8.57 3.9a2 2 0 0 0 1.66 0Z' },
    { d: 'M22 10v6M6 12.5V16a6 3 0 0 0 12 0v-3.5' },
  ],
} satisfies Record<string, readonly GlyphPath[]>;

export type IconName = keyof typeof icons;

export interface IconProps {
  name: IconName;
  color: string;
  size?: number;
  strokeWidth?: number;
  label?: string;
}

export function Icon({ name, color, size = 20, strokeWidth = 2, label }: IconProps) {
  return <Glyph paths={icons[name]} color={color} size={size} strokeWidth={strokeWidth} label={label} />;
}
