import type { RefObject } from 'react';
import type { View } from 'react-native';

export interface ReachedCountOptions {
  enabled?: boolean;
  /** Trigger line as a fraction of the viewport height, measured from the top. */
  line?: number;
  /** A higher line: elements past it are close to scrolling out of view. */
  urgentLine?: number;
}

export interface ReachedCounts {
  /** Leading elements that have scrolled past `line` (only ever increases). */
  reached: number;
  /** Leading elements that have scrolled past `urgentLine` (only ever increases). */
  urgent: number;
}

export type UseReachedCount = (
  slots: RefObject<(View | null)[]>,
  count: number,
  options?: ReachedCountOptions,
) => ReachedCounts;
