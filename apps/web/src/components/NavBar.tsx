import { Image, Pressable, StyleSheet, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import {
  Button,
  Text,
  ThemeToggle,
  layout,
  linkProps,
  radii,
  responsive,
  space,
  transition,
  useInteractionState,
  useTheme,
  webStyle,
} from '@kenma/ui';

import { profile } from '@/content/profile';
import { useScrolledPast } from '@/hooks/useScrolledPast';

const NAV_LINKS = [
  { label: 'Story', href: '#story' },
  { label: 'Experience', href: '#experience' },
  { label: 'Contact', href: '#contact' },
] as const;

const ON_DARK = '#F5F5F4';

/**
 * Floating nav: transparent over the hero, frosted glass once scrolled.
 *
 * The fixed wrapper is offset from the top edge (rather than padded) because
 * Safari 26 tints its status bar from any full-width fixed element touching the
 * top of the viewport; a transparent one there reads as plain white.
 */
export function NavBar() {
  const { colors } = useTheme();
  const insets = useSafeAreaInsets();
  const solid = useScrolledPast(0.8);
  const foreground = solid ? colors.text : ON_DARK;

  return (
    <View role="banner" style={[styles.wrap, { top: insets.top + space[3] }, fixedWeb]} pointerEvents="box-none">
      <View
        role="navigation"
        aria-label="Primary"
        style={[
          styles.bar,
          solid
            ? { backgroundColor: colors.navGlass, borderColor: colors.border, boxShadow: '0 10px 30px -18px rgba(0,0,0,0.35)' }
            : styles.barTransparent,
          glassWeb,
          transition(['background-color', 'border-color', 'box-shadow'], 350),
        ]}
      >
        <Brand color={foreground} />
        <View style={styles.actions}>
          <View style={styles.links} {...responsive({ hideBelow: 'md' })}>
            {NAV_LINKS.map((link) => (
              <NavLink key={link.href} {...link} color={foreground} />
            ))}
          </View>
          <ThemeToggle variant={solid ? 'ghost' : 'glass'} size={38} />
          <View {...responsive({ hideBelow: 'sm' })}>
            <Button label="Say hi" href={profile.links.email} variant={solid ? 'primary' : 'light'} icon="mail" />
          </View>
        </View>
      </View>
    </View>
  );
}

function Brand({ color }: { color: string }) {
  const { state, handlers } = useInteractionState();
  return (
    <Pressable {...handlers} {...linkProps('#top')} accessibilityLabel={`${profile.name} — back to top`} style={styles.brand}>
      <View
        style={[
          styles.avatarRing,
          { borderColor: color, transform: [{ scale: state.hovered ? 1.08 : 1 }, { rotate: state.hovered ? '-6deg' : '0deg' }] },
          transition(['transform', 'border-color'], 300),
        ]}
      >
        <Image source={require('@/assets/images/avatar.jpg')} alt="" style={styles.avatar} />
      </View>
      <Text variant="label" style={[{ color }, transition(['color'])]} {...responsive({ hideBelow: 'sm' })}>
        {profile.name}
      </Text>
    </Pressable>
  );
}

function NavLink({ label, href, color }: { label: string; href: string; color: string }) {
  const { colors } = useTheme();
  const { state, handlers } = useInteractionState();
  return (
    <Pressable {...handlers} {...linkProps(href)} style={styles.link}>
      <Text variant="label" style={[{ color, opacity: state.hovered ? 1 : 0.72 }, transition(['opacity', 'color'])]}>
        {label}
      </Text>
      <View
        style={[
          styles.linkUnderline,
          { backgroundColor: colors.accentStrong, transform: [{ scaleX: state.hovered ? 1 : 0 }] },
          transition(['transform'], 260),
        ]}
      />
    </Pressable>
  );
}

const fixedWeb = webStyle({ position: 'fixed' });
const glassWeb = webStyle({ backdropFilter: 'saturate(180%) blur(18px)', WebkitBackdropFilter: 'saturate(180%) blur(18px)' });

const styles = StyleSheet.create({
  wrap: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    zIndex: 50,
    paddingHorizontal: space[3],
  },
  bar: {
    width: '100%',
    maxWidth: layout.maxWidth,
    alignSelf: 'center',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingLeft: space[3],
    paddingRight: space[2],
    paddingVertical: space[2],
    borderRadius: radii.pill,
    borderWidth: 1,
  },
  barTransparent: {
    backgroundColor: 'transparent',
    borderColor: 'transparent',
  },
  brand: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: space[3],
  },
  avatarRing: {
    width: 38,
    height: 38,
    borderRadius: 19,
    borderWidth: 1.5,
    padding: 1.5,
  },
  avatar: {
    width: '100%',
    height: '100%',
    borderRadius: 999,
  },
  actions: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: space[2],
  },
  links: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: space[1],
    marginRight: space[2],
  },
  link: {
    paddingHorizontal: space[3],
    paddingVertical: space[2],
    alignItems: 'center',
  },
  linkUnderline: {
    position: 'absolute',
    bottom: 2,
    left: space[3],
    right: space[3],
    height: 2,
    borderRadius: 1,
  },
});
