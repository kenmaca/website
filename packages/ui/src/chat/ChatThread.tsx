import { useEffect, useRef, useState, type ReactNode } from 'react';
import { Animated, StyleSheet, View, type StyleProp, type ViewStyle } from 'react-native';

import { useReachedCount } from '../hooks/useReachedCount';
import { useReducedMotion } from '../hooks/useReducedMotion';
import { easing } from '../theme/tokens';
import { isWeb } from '../utils/web';
import { ChatBubble } from './ChatBubble';
import { SenderLabel } from './SenderLabel';
import { TypingIndicator } from './TypingIndicator';
import type { BubbleDirection, ChatMessage } from './types';
import { useConversationPlayer } from './useConversationPlayer';

const ENTER_MS = 520;

export interface ChatGroupData {
  direction: BubbleDirection;
  /** Messages with their position in the whole thread. */
  messages: { message: ChatMessage; index: number }[];
}

/** Groups consecutive messages from the same sender, keeping thread indices. */
export function groupMessages(messages: readonly ChatMessage[]): ChatGroupData[] {
  const groups: ChatGroupData[] = [];
  messages.forEach((message, index) => {
    const current = groups.at(-1);
    if (current && current.direction === message.direction) current.messages.push({ message, index });
    else groups.push({ direction: message.direction, messages: [{ message, index }] });
  });
  return groups;
}

export interface ChatThreadProps {
  messages: readonly ChatMessage[];
  /** Display names shown above each group of bubbles. */
  participants?: Partial<Record<BubbleDirection, string>>;
  /** Show a typing indicator before each incoming message. */
  typing?: boolean;
  /**
   * Play the conversation out as the reader scrolls: incoming messages "type"
   * then land, outgoing ones type their text out, one after another.
   */
  animated?: boolean;
  /** Called once every message has been shown (immediately when not animated). */
  onComplete?: () => void;
  /** Don't start playing yet, e.g. while earlier content is still appearing. */
  hold?: boolean;
  style?: StyleProp<ViewStyle>;
}

/**
 * An iMessage-style conversation, played back message by message as it
 * scrolls into view. Space for every bubble is reserved up front so the page
 * never jumps, and everything is visible immediately with reduced motion.
 */
export function ChatThread({
  messages,
  participants,
  typing = true,
  animated = true,
  onComplete,
  hold = false,
  style,
}: ChatThreadProps) {
  const reducedMotion = useReducedMotion();
  const sequenced = animated && !reducedMotion;
  const slots = useRef<(View | null)[]>([]);
  const progress = useReachedCount(slots, messages.length, { enabled: sequenced });
  const { shown, active } = useConversationPlayer(messages, progress, { enabled: sequenced, typing, hold });
  const complete = shown >= messages.length;

  useEffect(() => {
    if (complete) onComplete?.();
  }, [complete, onComplete]);

  const isVisible = (index: number) => index < shown || (active?.index === index && active.phase === 'writing');

  return (
    <View style={[styles.thread, style]}>
      {groupMessages(messages).map((group) => {
        const first = group.messages[0]?.index ?? 0;
        const last = group.messages.at(-1)?.index;
        const label = participants?.[group.direction];
        return (
          <View key={group.messages[0]?.message.id ?? first} style={styles.group}>
            {label ? (
              <Entrance visible={isVisible(first) || active?.index === first} direction={group.direction} instant={!sequenced}>
                <SenderLabel name={label} direction={group.direction} />
              </Entrance>
            ) : null}
            <View style={styles.bubbles}>
              {group.messages.map(({ message, index }) => {
                const writing = active?.index === index && active.phase === 'writing';
                const typingNow = active?.index === index && active.phase === 'typing';
                return (
                  <View
                    key={message.id ?? index}
                    ref={(node) => {
                      slots.current[index] = node;
                    }}
                    style={styles.slot}
                  >
                    <Entrance visible={isVisible(index)} direction={message.direction} instant={!sequenced} pop>
                      <ChatBubble
                        direction={message.direction}
                        text={message.text}
                        image={message.image}
                        images={message.images}
                        href={message.href}
                        tail={index === last}
                        typewriterDuration={writing ? active?.duration : undefined}
                      >
                        {message.content}
                      </ChatBubble>
                    </Entrance>
                    {sequenced && message.direction === 'incoming' ? (
                      <Entrance visible={typingNow} direction={message.direction} pop reveal={false} style={styles.typing}>
                        <TypingIndicator direction={message.direction} />
                      </Entrance>
                    ) : null}
                  </View>
                );
              })}
            </View>
          </View>
        );
      })}
    </View>
  );
}

interface EntranceProps {
  visible: boolean;
  direction: BubbleDirection;
  children: ReactNode;
  instant?: boolean;
  /** Springy scale-up from the sender's side, like a message arriving. */
  pop?: boolean;
  /** Mark for the no-JS reveal rule. */
  reveal?: boolean;
  style?: StyleProp<ViewStyle>;
}

function Entrance({ visible, direction, children, instant = false, pop = false, reveal = true, style }: EntranceProps) {
  const [progress] = useState(() => new Animated.Value(instant ? 1 : 0));

  useEffect(() => {
    if (instant) {
      progress.setValue(1);
      return;
    }
    const animation = Animated.timing(progress, {
      toValue: visible ? 1 : 0,
      duration: visible ? ENTER_MS : 160,
      easing: easing(visible && pop ? 'spring' : 'outExpo'),
      useNativeDriver: !isWeb,
    });
    animation.start();
    return () => animation.stop();
  }, [visible, instant, pop, progress]);

  return (
    <Animated.View
      aria-hidden={reveal ? undefined : !visible}
      pointerEvents={visible || instant ? 'auto' : 'none'}
      {...(reveal ? ({ dataSet: { kuiReveal: '' } } as object) : null)}
      style={[
        style,
        {
          opacity: progress.interpolate({ inputRange: [0, 0.6, 1], outputRange: [0, 1, 1], extrapolate: 'clamp' }),
          transformOrigin: direction === 'incoming' ? 'bottom left' : 'bottom right',
          transform: [
            { translateY: progress.interpolate({ inputRange: [0, 1], outputRange: [12, 0] }) },
            ...(pop ? [{ scale: progress.interpolate({ inputRange: [0, 1], outputRange: [0.86, 1] }) }] : []),
          ],
        },
      ]}
    >
      {children}
    </Animated.View>
  );
}

const styles = StyleSheet.create({
  thread: {
    gap: 18,
  },
  group: {
    gap: 0,
  },
  bubbles: {
    gap: 3,
  },
  slot: {
    position: 'relative',
  },
  typing: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
  },
});
