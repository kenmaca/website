/**
 * Semantic colour palettes. Every key becomes a CSS custom property on web
 * (`--kui-<kebab-key>`), so components never need to re-render when the
 * colour scheme changes and statically rendered HTML is correct before
 * hydration. On native the resolved hex values are used directly.
 */
export const palettes = {
  light: {
    background: '#F7F6F3',
    surface: '#FFFFFF',
    surfaceMuted: '#EFEEEA',
    surfaceInverse: '#0C0C0E',
    border: 'rgba(17, 17, 19, 0.09)',
    borderStrong: 'rgba(17, 17, 19, 0.16)',
    text: '#111113',
    textMuted: '#55555F',
    textSubtle: '#86868F',
    textInverse: '#F5F5F4',
    accent: '#9E6C00',
    accentStrong: '#E9AC00',
    accentSoft: 'rgba(233, 172, 0, 0.14)',
    link: '#0A64D6',
    focusRing: 'rgba(10, 132, 255, 0.55)',
    navGlass: 'rgba(247, 246, 243, 0.72)',
    bubbleIncoming: '#E9E9EB',
    bubbleIncomingText: '#111113',
    bubbleIncomingLink: '#0A64D6',
    bubbleOutgoing: '#0A84FF',
    bubbleOutgoingText: '#FFFFFF',
    bubbleOutgoingLink: '#FFFFFF',
    typingDot: '#8E8E93',
  },
  dark: {
    background: '#0B0B0D',
    surface: '#151518',
    surfaceMuted: '#1D1D21',
    surfaceInverse: '#F5F5F4',
    border: 'rgba(255, 255, 255, 0.08)',
    borderStrong: 'rgba(255, 255, 255, 0.16)',
    text: '#F4F4F5',
    textMuted: '#A5A5AE',
    textSubtle: '#72727B',
    textInverse: '#0C0C0E',
    accent: '#F5BA1B',
    accentStrong: '#F5BA1B',
    accentSoft: 'rgba(245, 186, 27, 0.14)',
    link: '#4DA3FF',
    focusRing: 'rgba(77, 163, 255, 0.6)',
    navGlass: 'rgba(11, 11, 13, 0.7)',
    bubbleIncoming: '#26262A',
    bubbleIncomingText: '#F4F4F5',
    bubbleIncomingLink: '#6CB4FF',
    bubbleOutgoing: '#0A84FF',
    bubbleOutgoingText: '#FFFFFF',
    bubbleOutgoingLink: '#FFFFFF',
    typingDot: '#8E8E93',
  },
} as const;

export type ColorScheme = keyof typeof palettes;
export type ColorToken = keyof (typeof palettes)['light'];
export type Colors = Record<ColorToken, string>;

export const CSS_VAR_PREFIX = '--kui-';

const toKebab = (key: string) => key.replace(/[A-Z]/g, (m) => `-${m.toLowerCase()}`);

export const cssVarName = (token: ColorToken) => `${CSS_VAR_PREFIX}${toKebab(token)}`;

/** Colour tokens expressed as `var(--kui-*)` references (web only). */
export const cssVarColors = Object.fromEntries(
  (Object.keys(palettes.light) as ColorToken[]).map((token) => [token, `var(${cssVarName(token)})`]),
) as Colors;
