import { useSyncExternalStore } from 'react';

const subscribe = () => () => {};

/**
 * `false` during server rendering and hydration, `true` afterwards. Use it to
 * defer client-only output without hydration mismatches.
 */
export function useHydrated(): boolean {
  return useSyncExternalStore(
    subscribe,
    () => true,
    () => false,
  );
}
