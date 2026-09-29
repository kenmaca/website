import { palettes, cssVarName, type ColorScheme, type ColorToken } from './palette';
import { breakpoints } from './tokens';

export const THEME_STORAGE_KEY = 'kui-theme';
export const THEME_ATTRIBUTE = 'data-theme';

const declarations = (scheme: ColorScheme) =>
  (Object.keys(palettes[scheme]) as ColorToken[])
    .map((token) => `${cssVarName(token)}:${palettes[scheme][token]};`)
    .join('');

/**
 * Stylesheet defining every colour token as a CSS custom property.
 *
 * - Light values are the default.
 * - `prefers-color-scheme: dark` switches to dark unless the user explicitly
 *   chose light (`<html data-theme="light">`).
 * - `<html data-theme="dark">` forces dark regardless of the OS preference.
 *
 * Inject it into the document `<head>` (e.g. from Expo Router's `+html.tsx`).
 */
export const themeCss = [
  `:root{color-scheme:light;${declarations('light')}}`,
  `@media (prefers-color-scheme: dark){:root:not([${THEME_ATTRIBUTE}="light"]){color-scheme:dark;${declarations('dark')}}}`,
  `:root[${THEME_ATTRIBUTE}="dark"]{color-scheme:dark;${declarations('dark')}}`,
].join('\n');

/**
 * Tiny blocking script that applies a persisted theme preference before first
 * paint, avoiding a flash of the wrong theme. Inline it in `<head>`.
 */
export const themeInitScript = `(function(){try{var t=localStorage.getItem(${JSON.stringify(
  THEME_STORAGE_KEY,
)});if(t==="light"||t==="dark"){document.documentElement.setAttribute(${JSON.stringify(
  THEME_ATTRIBUTE,
)},t)}}catch(e){}})();`;

/**
 * Media-query helpers for statically rendered pages, where the viewport width
 * isn't known at render time (so `useWindowDimensions` would cause hydration
 * mismatches). Pair with `responsive()` from `utils/responsive`.
 */
export const responsiveCss = (Object.entries(breakpoints) as [keyof typeof breakpoints, number][])
  .map(
    ([name, px]) =>
      `@media (max-width:${px - 0.02}px){[data-kui-hide-below~="${name}"]{display:none!important}}` +
      `@media (min-width:${px}px){[data-kui-hide-above~="${name}"]{display:none!important}}`,
  )
  .join('\n');

/** Shows `[data-kui-reveal]` content when JavaScript is unavailable. Wrap in `<noscript><style>`. */
export const noscriptCss = '[data-kui-reveal]{opacity:1!important;transform:none!important}';
