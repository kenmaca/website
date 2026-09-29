import { useMemo, useState } from 'react';
import type { NativeSyntheticEvent, TargetedEvent } from 'react-native';

import { isWeb } from '../utils/web';

/** On web, only keyboard focus should show a focus ring (`:focus-visible`). */
function isFocusVisible(event?: NativeSyntheticEvent<TargetedEvent>): boolean {
  if (!isWeb) return true;
  const target = event?.target as unknown as Element | undefined;
  try {
    return target?.matches?.(':focus-visible') ?? true;
  } catch {
    return true;
  }
}

export interface InteractionState {
  hovered: boolean;
  pressed: boolean;
  focused: boolean;
}

/**
 * Hover / press / focus tracking for Pressable. Spread `handlers` onto the
 * Pressable and read `state` to style it.
 */
export function useInteractionState() {
  const [hovered, setHovered] = useState(false);
  const [pressed, setPressed] = useState(false);
  const [focused, setFocused] = useState(false);

  const handlers = useMemo(
    () => ({
      onHoverIn: () => setHovered(true),
      onHoverOut: () => {
        setHovered(false);
        setPressed(false);
      },
      onPressIn: () => setPressed(true),
      onPressOut: () => setPressed(false),
      onFocus: (event?: NativeSyntheticEvent<TargetedEvent>) => setFocused(isFocusVisible(event)),
      onBlur: () => setFocused(false),
    }),
    [],
  );

  const state: InteractionState = { hovered, pressed, focused };
  return { state, handlers };
}
