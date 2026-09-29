import { useEffect, useRef, useState } from 'react';

import type { ReachedCounts } from '../hooks/useReachedCount.types';
import type { ChatMessage } from './types';

export type PlayerPhase = 'typing' | 'writing';

export interface PlayerState {
  /** Number of messages fully shown. */
  shown: number;
  /** The message currently being "typed" (incoming) or written out (outgoing). */
  active: { index: number; phase: PlayerPhase; duration: number } | null;
}

const clamp = (value: number, min: number, max: number) => Math.min(max, Math.max(min, value));
const lengthOf = (message: ChatMessage) =>
  message.images?.length ? 60 : message.image ? 40 : (message.text ?? '').length || 24;

/** How long the "…" bubble shows before an incoming message lands. */
function typingDuration(message: ChatMessage, previous?: ChatMessage) {
  const length = lengthOf(message);
  const opensGroup = previous?.direction !== message.direction;
  return opensGroup ? clamp(600 + length * 10, 800, 1500) : clamp(350 + length * 9, 500, 1300);
}

/** How long an outgoing message takes to type out. */
const writingDuration = (message: ChatMessage) => clamp(lengthOf(message) * 28, 500, 1800);

/** Pause before a message starts — longer when the other person "replies". */
function gapBefore(message: ChatMessage, previous?: ChatMessage) {
  if (!previous) return 150;
  return previous.direction !== message.direction ? 450 : 220;
}

/** When more than this many messages are queued up, play faster to catch up. */
const CATCH_UP_THRESHOLD = 3;
const CATCH_UP_SPEED = 0.35;

/** Pacing once the next message is about to scroll out of view: land almost at once. */
const HURRY_GAP_MS = 40;
const HURRY_WRITING_MS = 220;

/**
 * Plays a conversation one message at a time. Each message waits until it has
 * been reached (scrolled to), then:
 * - incoming: shows a typing indicator, then the bubble;
 * - outgoing: shows the bubble and types its text out.
 *
 * If the reader gets ahead, playback speeds up; once pending messages near
 * the top of the viewport, typing is skipped so nothing is missed. `hold`
 * pauses playback before it starts (e.g. until content above has appeared).
 */
export function useConversationPlayer(
  messages: readonly ChatMessage[],
  { reached, urgent }: ReachedCounts,
  { enabled, typing, hold = false }: { enabled: boolean; typing: boolean; hold?: boolean },
): PlayerState {
  const [shown, setShown] = useState(0);
  const [active, setActive] = useState<PlayerState['active']>(null);
  const reachedRef = useRef(reached);
  const canAdvance = shown < reached;
  // Changing mid-message restarts the current step at the faster pace.
  const hurry = shown < urgent;

  useEffect(() => {
    reachedRef.current = reached;
  }, [reached]);

  useEffect(() => {
    if (!enabled || hold || !canAdvance || shown >= messages.length) return;
    const message = messages[shown];
    if (!message) return;
    const previous = messages[shown - 1];
    const incoming = message.direction === 'incoming';
    const phase: PlayerPhase = incoming ? 'typing' : 'writing';
    const index = shown;

    let gap: number;
    let duration: number;
    if (hurry) {
      gap = HURRY_GAP_MS;
      duration = incoming ? 0 : HURRY_WRITING_MS;
    } else {
      const speed = reachedRef.current - shown > CATCH_UP_THRESHOLD ? CATCH_UP_SPEED : 1;
      gap = gapBefore(message, previous) * speed;
      duration = (incoming ? (typing ? typingDuration(message, previous) : 0) : writingDuration(message)) * speed;
    }

    let finish: ReturnType<typeof setTimeout> | undefined;
    const start = setTimeout(() => {
      const complete = () => {
        setActive(null);
        setShown(index + 1);
      };
      if (duration <= 0) {
        complete();
        return;
      }
      setActive({ index, phase, duration });
      finish = setTimeout(complete, duration);
    }, gap);

    return () => {
      clearTimeout(start);
      clearTimeout(finish);
    };
  }, [enabled, hold, canAdvance, hurry, shown, messages, typing]);

  return enabled ? { shown, active } : { shown: messages.length, active: null };
}
