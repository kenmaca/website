import type { UseReachedCount } from './useReachedCount.types';

/** Native: no document viewport to track, so every element counts as reached. */
export const useReachedCount: UseReachedCount = (_slots, count) => ({ reached: count, urgent: 0 });
