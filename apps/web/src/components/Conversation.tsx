import { StyleSheet, type StyleProp, type ViewStyle } from 'react-native';
import { ChatThread, Container, space, type ChatMessage } from '@kenma/ui';

import { participants } from '@/content/conversations';

export interface ConversationProps {
  messages: ChatMessage[];
  onComplete?: () => void;
  /** Wait before playing, e.g. until the content above has appeared. */
  hold?: boolean;
  nativeID?: string;
  style?: StyleProp<ViewStyle>;
}

/** A readable-width chat thread between Kenneth and "You". */
export function Conversation({ messages, onComplete, hold, nativeID, style }: ConversationProps) {
  return (
    <Container nativeID={nativeID} width="readable" style={[styles.container, style]}>
      <ChatThread messages={messages} participants={participants} onComplete={onComplete} hold={hold} />
    </Container>
  );
}

const styles = StyleSheet.create({
  container: {
    marginBottom: space[16],
  },
});
