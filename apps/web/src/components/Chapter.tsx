import { useCallback, useState, type ReactNode } from 'react';
import { StyleSheet } from 'react-native';
import { Container, space, type ChatMessage } from '@kenma/ui';

import { Conversation } from './Conversation';
import { Section } from './Section';
import { SectionHeader, type SectionHeaderProps } from './SectionHeader';

export interface ChapterProps extends Pick<SectionHeaderProps, 'index' | 'eyebrow' | 'title'> {
  id?: string;
  /** The conversation leading up to the feature. */
  messages: ChatMessage[];
  /** Feature content, revealed once `messages` has played out. */
  children: (ready: boolean) => ReactNode;
  /** An optional follow-up conversation after the feature. */
  after?: ChatMessage[];
}

/** A story section: heading, a conversation, its feature card, and optionally more chat. */
export function Chapter({ id, index, eyebrow, title, messages, children, after }: ChapterProps) {
  const [chatDone, setChatDone] = useState(false);
  const handleComplete = useCallback(() => setChatDone(true), []);

  return (
    <Section id={id}>
      <Container width="readable">
        <SectionHeader index={index} eyebrow={eyebrow} title={title} />
      </Container>
      <Conversation nativeID={id ? `${id}-chat` : undefined} messages={messages} onComplete={handleComplete} />
      {children(chatDone)}
      {after?.length ? <Conversation messages={after} hold={!chatDone} style={styles.after} /> : null}
    </Section>
  );
}

const styles = StyleSheet.create({
  after: {
    marginTop: space[16],
    marginBottom: 0,
  },
});
