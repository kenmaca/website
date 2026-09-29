import type { RefObject } from 'react';
import type { View } from 'react-native';

export interface InViewOptions {
  /** Fraction of the element that must be visible (0–1). */
  threshold?: number;
  /** CSS-style margin around the viewport, e.g. `"0px 0px -10% 0px"`. */
  rootMargin?: string;
  /** Stop observing after the first time the element becomes visible. */
  once?: boolean;
}

export type UseInView = (ref: RefObject<View | null>, options?: InViewOptions) => boolean;
