import type { breakpoints } from '../theme/tokens';
import { isWeb } from './web';

export type Breakpoint = keyof typeof breakpoints;

export interface ResponsiveOptions {
  /** Hide while the viewport is narrower than this breakpoint. */
  hideBelow?: Breakpoint;
  /** Hide once the viewport reaches this breakpoint. */
  hideAbove?: Breakpoint;
}

/**
 * SSR-safe responsive visibility for web. Spread the result onto any View or
 * Text; requires `responsiveCss` in the document head. No-op on native.
 */
export function responsive({ hideBelow, hideAbove }: ResponsiveOptions) {
  if (!isWeb) return {};
  return { dataSet: { kuiHideBelow: hideBelow, kuiHideAbove: hideAbove } } as object;
}
