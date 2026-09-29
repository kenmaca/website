import type { ReactNode } from 'react';
import { Image, Pressable, StyleSheet, View, type StyleProp, type TextStyle, type ViewStyle } from 'react-native';

import { useInteractionState } from '../hooks/useInteractionState';
import { Anchor } from '../primitives/Anchor';
import { Text } from '../primitives/Text';
import { useTheme } from '../theme/ThemeProvider';
import { fonts, radii } from '../theme/tokens';
import { linkProps } from '../utils/links';
import { transition, webStyle } from '../utils/web';
import { BubbleTail } from './BubbleTail';
import { ImageGroup } from './ImageGroup';
import { parseInlineLinks } from './parseInlineLinks';
import { TypewriterText } from './TypewriterText';
import type { BubbleDirection, ChatImage } from './types';

export interface ChatBubbleProps {
  direction: BubbleDirection;
  /** Plain text; supports inline `[label](url)` links. */
  text?: string;
  /** Custom content rendered instead of `text`. */
  children?: ReactNode;
  image?: ChatImage;
  /** Several photos shown together as a grid (takes precedence over `image`). */
  images?: readonly ChatImage[];
  /** Makes the whole bubble a link. */
  href?: string;
  /** Show the iMessage-style tail (typically on the last bubble in a group). */
  tail?: boolean;
  /** Type the text out over this many ms (plain text without links only). */
  typewriterDuration?: number;
  style?: StyleProp<ViewStyle>;
}

const BUBBLE_RADIUS = radii.lg;
const IMAGE_WIDTH = 280;

/** A single chat message bubble. */
export function ChatBubble({
  direction,
  text,
  children,
  image,
  images,
  href,
  tail = false,
  typewriterDuration,
  style,
}: ChatBubbleProps) {
  const { colors } = useTheme();
  const { state, handlers } = useInteractionState();
  const incoming = direction === 'incoming';
  const background = incoming ? colors.bubbleIncoming : colors.bubbleOutgoing;
  const foreground = incoming ? colors.bubbleIncomingText : colors.bubbleOutgoingText;
  const linkColor = incoming ? colors.bubbleIncomingLink : colors.bubbleOutgoingLink;
  const showTail = tail && !image && !images?.length;

  if (images?.length) {
    return (
      <View style={[styles.row, styles.groupRow, incoming ? styles.rowIncoming : styles.rowOutgoing, style]}>
        <ImageGroup images={images} />
      </View>
    );
  }

  const body = image ? (
    <Image
      source={image.source}
      accessibilityLabel={image.alt}
      alt={image.alt}
      resizeMode="cover"
      style={[styles.image, { aspectRatio: image.aspectRatio ?? 4 / 3 }]}
    />
  ) : (
    <Text style={[styles.text, chatTextWeb, { color: foreground }]}>
      {text != null && typewriterDuration != null && !hasLinks(text) ? (
        <TypewriterText text={text} duration={typewriterDuration} />
      ) : text != null ? (
        <InlineText text={text} linkColor={linkColor} />
      ) : (
        children
      )}
    </Text>
  );

  const bubbleStyle: StyleProp<ViewStyle> = [
    styles.bubble,
    image ? styles.imageBubble : styles.textBubble,
    { backgroundColor: background },
  ];

  return (
    <View style={[styles.row, incoming ? styles.rowIncoming : styles.rowOutgoing, style]}>
      {/* Rendered first so the bubble paints over the part of the tail it overlaps. */}
      {showTail ? <BubbleTail direction={direction} color={background} /> : null}
      {href ? (
        <Pressable
          {...handlers}
          {...linkProps(href)}
          accessibilityLabel={image?.alt ?? text}
          style={[
            bubbleStyle,
            { transform: [{ scale: state.pressed ? 0.98 : state.hovered ? 1.02 : 1 }] },
            state.hovered && styles.hoverShadow,
            transition(['transform', 'box-shadow'], 260),
          ]}
        >
          {body}
        </Pressable>
      ) : (
        <View style={bubbleStyle}>{body}</View>
      )}
    </View>
  );
}

const hasLinks = (text: string) => parseInlineLinks(text).some((token) => token.type === 'link');

function InlineText({ text, linkColor }: { text: string; linkColor: string }) {
  return (
    <>
      {parseInlineLinks(text).map((token, index) =>
        token.type === 'text' ? (
          token.value
        ) : (
          <Anchor key={index} href={token.href} color={linkColor} style={styles.link}>
            {token.label}
          </Anchor>
        ),
      )}
    </>
  );
}

const chatTextWeb = webStyle<TextStyle>({ textWrap: 'pretty' });

const styles = StyleSheet.create({
  row: {
    maxWidth: '85%',
    position: 'relative',
  },
  rowIncoming: {
    alignSelf: 'flex-start',
  },
  rowOutgoing: {
    alignSelf: 'flex-end',
  },
  groupRow: {
    maxWidth: '90%',
  },
  bubble: {
    borderRadius: BUBBLE_RADIUS,
  },
  textBubble: {
    paddingHorizontal: 14,
    paddingVertical: 8,
  },
  imageBubble: {
    width: IMAGE_WIDTH,
    maxWidth: '100%',
    overflow: 'hidden',
  },
  text: {
    fontFamily: fonts.chat,
    fontSize: 17,
    lineHeight: 23,
    letterSpacing: -0.2,
  },
  link: {
    fontWeight: '600',
  },
  image: {
    width: '100%',
    // Override the intrinsic asset height react-native-web applies, so
    // `aspectRatio` determines the height.
    height: 'auto',
  },
  hoverShadow: {
    boxShadow: '0 12px 28px -14px rgba(0, 0, 0, 0.5)',
  },
});
