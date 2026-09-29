import type { ReactNode } from 'react';
import { Pressable, StyleSheet, View, type StyleProp, type ViewStyle } from 'react-native';

import { useInteractionState } from '../hooks/useInteractionState';
import { Glyph } from '../primitives/Glyph';
import { Text } from '../primitives/Text';
import { fonts, space } from '../theme/tokens';
import { linkProps } from '../utils/links';
import { transition, webStyle } from '../utils/web';

export interface NotificationBannerProps {
  /** Sender / notification title. */
  title: string;
  /** Message preview. */
  body: string;
  /** Timestamp label, iOS-style (e.g. "now", "2m ago"). */
  time?: string;
  /** App icon; defaults to a Messages-style green speech bubble. */
  icon?: ReactNode;
  /** Show a second notification peeking out behind, like a grouped stack. */
  stacked?: boolean;
  /** `dark` for dark backgrounds (default), `light` for light ones. */
  tone?: 'dark' | 'light';
  href?: string;
  onPress?: () => void;
  accessibilityLabel?: string;
  style?: StyleProp<ViewStyle>;
}

const TONES = {
  dark: {
    card: 'rgba(44, 44, 48, 0.62)',
    back: 'rgba(44, 44, 48, 0.42)',
    border: 'rgba(255, 255, 255, 0.1)',
    title: '#FFFFFF',
    body: 'rgba(255, 255, 255, 0.86)',
    time: 'rgba(255, 255, 255, 0.55)',
  },
  light: {
    card: 'rgba(250, 250, 250, 0.78)',
    back: 'rgba(250, 250, 250, 0.5)',
    border: 'rgba(0, 0, 0, 0.06)',
    title: '#111113',
    body: 'rgba(17, 17, 19, 0.82)',
    time: 'rgba(17, 17, 19, 0.5)',
  },
} as const;

const BUBBLE_GLYPH = [
  {
    d: 'M12 3.5C6.75 3.5 2.5 6.96 2.5 11.23c0 2.33 1.26 4.42 3.25 5.84-.17 1.33-.84 2.57-1.9 3.43 1.86-.03 3.6-.72 4.9-1.86 1.03.27 2.12.41 3.25.41 5.25 0 9.5-3.46 9.5-7.73S17.25 3.5 12 3.5Z',
    fill: true,
  },
];

/** The default app icon: a green, Messages-style speech bubble. */
export function MessagesAppIcon({ size = 38 }: { size?: number }) {
  return (
    <View style={[styles.appIcon, { width: size, height: size, borderRadius: size * 0.2255 }, appIconWeb]}>
      <Glyph paths={BUBBLE_GLYPH} color="#FFFFFF" size={size * 0.66} />
    </View>
  );
}

/** An iOS-style notification banner — frosted glass, app icon, title, preview and time. */
export function NotificationBanner({
  title,
  body,
  time = 'now',
  icon,
  stacked = false,
  tone = 'dark',
  href,
  onPress,
  accessibilityLabel,
  style,
}: NotificationBannerProps) {
  const palette = TONES[tone];
  const { state, handlers } = useInteractionState();

  return (
    <View style={[styles.wrap, stacked && styles.wrapStacked, style]}>
      {stacked ? (
        <View
          aria-hidden
          style={[styles.card, styles.back, { backgroundColor: palette.back, borderColor: palette.border }, glassWeb]}
        />
      ) : null}
      <Pressable
        {...handlers}
        {...(href ? linkProps(href) : null)}
        onPress={onPress}
        accessibilityLabel={accessibilityLabel ?? `${title}: ${body}`}
        style={[
          styles.card,
          { backgroundColor: palette.card, borderColor: palette.border },
          glassWeb,
          {
            transform: [
              { translateY: state.hovered && !state.pressed ? -3 : 0 },
              { scale: state.pressed ? 0.97 : 1 },
            ],
          },
          state.hovered && styles.hoverShadow,
          transition(['transform', 'box-shadow'], 260),
        ]}
      >
        {icon ?? <MessagesAppIcon />}
        <View style={styles.content}>
          <View style={styles.header}>
            <Text numberOfLines={1} style={[styles.title, { color: palette.title }]}>
              {title}
            </Text>
            <Text style={[styles.time, { color: palette.time }]}>{time}</Text>
          </View>
          <Text numberOfLines={2} style={[styles.body, { color: palette.body }]}>
            {body}
          </Text>
        </View>
      </Pressable>
    </View>
  );
}

const glassWeb = webStyle({
  backdropFilter: 'saturate(180%) blur(24px)',
  WebkitBackdropFilter: 'saturate(180%) blur(24px)',
});

const appIconWeb = webStyle({ backgroundImage: 'linear-gradient(180deg, #67F56F 0%, #0DBC2B 100%)' });

const RADIUS = 22;
const STACK_OFFSET = 9;

const styles = StyleSheet.create({
  wrap: {
    width: '100%',
    maxWidth: 380,
    position: 'relative',
  },
  wrapStacked: {
    paddingBottom: STACK_OFFSET,
  },
  card: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: space[3],
    paddingHorizontal: 14,
    paddingVertical: 12,
    borderRadius: RADIUS,
    borderWidth: 1,
    boxShadow: '0 12px 32px -12px rgba(0, 0, 0, 0.55)',
  },
  back: {
    position: 'absolute',
    left: 12,
    right: 12,
    bottom: 0,
    height: 40,
    boxShadow: 'none',
  },
  hoverShadow: {
    boxShadow: '0 18px 40px -12px rgba(0, 0, 0, 0.65)',
  },
  appIcon: {
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#34C759',
  },
  content: {
    flex: 1,
    minWidth: 0,
    gap: 1,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'baseline',
    justifyContent: 'space-between',
    gap: space[2],
  },
  title: {
    flexShrink: 1,
    fontFamily: fonts.chat,
    fontSize: 15,
    lineHeight: 20,
    fontWeight: '600',
    letterSpacing: -0.2,
  },
  time: {
    fontFamily: fonts.chat,
    fontSize: 13,
    lineHeight: 18,
  },
  body: {
    fontFamily: fonts.chat,
    fontSize: 15,
    lineHeight: 20,
    letterSpacing: -0.2,
  },
});
