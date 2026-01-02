import { View, Text, StyleSheet, Pressable, Linking, Image, ImageSourcePropType } from 'react-native';
import { colors, spacing } from '@/constants/theme';

interface ChatBubbleProps {
  type: 'from' | 'to';
  isEnd?: boolean;
  children: React.ReactNode;
}

interface ChatLabelProps {
  name: string;
  type: 'me' | 'you';
}

interface ChatLinkProps {
  href: string;
  children: string;
}

interface ChatImageBubbleProps {
  type: 'from' | 'to';
  image: ImageSourcePropType;
  href?: string;
}

export function ChatBubble({ type, isEnd = false, children }: ChatBubbleProps) {
  const isFrom = type === 'from';

  return (
    <View style={[
      styles.bubble,
      isFrom ? styles.fromBubble : styles.toBubble,
      isEnd && (isFrom ? styles.fromEnd : styles.toEnd),
    ]}>
      {isEnd && <View style={[styles.tail, isFrom ? styles.fromTail : styles.toTail]} />}
      <View style={styles.content}>{children}</View>
    </View>
  );
}

export function ChatLabel({ name, type }: ChatLabelProps) {
  return (
    <View style={[styles.label, type === 'me' ? styles.labelLeft : styles.labelRight]}>
      <Text style={styles.labelText}>{name}</Text>
    </View>
  );
}

export function ChatText({ children }: { children: string }) {
  return <Text style={styles.bubbleText}>{children}</Text>;
}

export function ChatLink({ href, children }: ChatLinkProps) {
  const handlePress = () => {
    Linking.openURL(href);
  };

  return (
    <Text style={styles.link} onPress={handlePress}>
      {children}
    </Text>
  );
}

export function ChatImageBubble({ type, image, href }: ChatImageBubbleProps) {
  const isFrom = type === 'from';

  const content = (
    <View style={[styles.imageBubble, isFrom ? styles.fromBubble : styles.toBubble]}>
      <Image source={image} style={styles.bubbleImage} resizeMode="cover" />
    </View>
  );

  if (href) {
    return (
      <Pressable onPress={() => Linking.openURL(href)}>
        {content}
      </Pressable>
    );
  }

  return content;
}

const styles = StyleSheet.create({
  bubble: {
    maxWidth: 300,
    borderRadius: 20,
    marginBottom: 2,
    paddingHorizontal: 16,
    paddingVertical: 10,
    position: 'relative',
  },
  fromBubble: {
    backgroundColor: colors.bubbleGray,
    alignSelf: 'flex-start',
    marginLeft: spacing.md,
  },
  toBubble: {
    backgroundColor: colors.bubbleBlue,
    alignSelf: 'flex-end',
    marginRight: spacing.md,
  },
  fromEnd: {
    marginBottom: 12,
  },
  toEnd: {
    marginBottom: 12,
  },
  tail: {
    position: 'absolute',
    bottom: -2,
    width: 20,
    height: 20,
  },
  fromTail: {
    left: -6,
    backgroundColor: colors.bubbleGray,
    borderBottomRightRadius: 16,
    transform: [{ rotate: '20deg' }],
  },
  toTail: {
    right: -6,
    backgroundColor: colors.bubbleBlue,
    borderBottomLeftRadius: 16,
    transform: [{ rotate: '-20deg' }],
  },
  content: {},
  bubbleText: {
    fontSize: 16,
    lineHeight: 22,
    color: colors.dark,
  },
  label: {
    paddingHorizontal: 20,
    marginTop: 6,
    marginBottom: 4,
  },
  labelLeft: {
    alignSelf: 'flex-start',
  },
  labelRight: {
    alignSelf: 'flex-end',
  },
  labelText: {
    fontSize: 14,
    color: colors.textGray,
  },
  link: {
    color: colors.bubbleBlue,
    textDecorationLine: 'underline',
  },
  imageBubble: {
    borderRadius: 20,
    overflow: 'hidden',
    marginBottom: 2,
    marginLeft: spacing.md,
  },
  bubbleImage: {
    width: 200,
    height: 150,
  },
});
