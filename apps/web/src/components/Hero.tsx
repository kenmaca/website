import { useEffect } from 'react';
import { StyleSheet, View } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import {
  Button,
  Container,
  IconButton,
  NotificationBanner,
  Reveal,
  Text,
  layout,
  radii,
  responsive,
  space,
  transition,
  webStyle,
} from '@kenma/ui';

import { acvIntroConversation } from '@/content/conversations';
import { profile } from '@/content/profile';
import { useReached } from '@/hooks/useReached';
import { useScrolledPast } from '@/hooks/useScrolledPast';
import { HeroPhoto } from './HeroPhoto';
import { Signature } from './Signature';

const INK = '#0B0B0D';
const ON_DARK = '#F5F5F4';
const ON_DARK_MUTED = 'rgba(245, 245, 244, 0.72)';
const GOLD = '#F5BA1B';
/** How far the signature rises into the button row. */
const SIGNATURE_OVERLAP = 18;

/** The opening line of the story's conversation, previewed as a notification. */
const firstMessage = acvIntroConversation[0]?.text ?? '';

/** Full-viewport intro. Always dark, in both colour schemes. */
export function Hero() {
  const read = useReached('story-chat');
  // Square corners fill the screen edge to edge at the top of the page; they
  // round off once scrolling reveals the page beneath.
  const scrolled = useScrolledPast(0.02);
  // Matches the nav turning solid: from here the document background (which
  // mobile browsers tint their status bar from) follows the theme again.
  const pastHero = useScrolledPast(0.8);

  useEffect(() => {
    if (typeof document === 'undefined') return;
    document.documentElement.toggleAttribute('data-km-past-hero', pastHero);
  }, [pastHero]);

  return (
    <View
      nativeID="top"
      style={[styles.hero, heroHeightWeb, scrolled && styles.heroScrolled, transition(['border-radius'], 500)]}
      {...({ dataSet: { kmHero: '' } } as object)}
    >
      <View style={[StyleSheet.absoluteFill, styles.backdrop]} aria-hidden>
        <HeroPhoto />
        <View style={[styles.glow, styles.glowGold, glowWeb('rgba(245, 186, 27, 0.30)')]} {...({ dataSet: { kmGlow: 'a' } } as object)} />
        <View style={[styles.glow, styles.glowViolet, glowWeb('rgba(120, 72, 230, 0.34)')]} {...({ dataSet: { kmGlow: 'b' } } as object)} />
        <LinearGradient
          colors={['rgba(11, 11, 13, 0.1)', 'rgba(11, 11, 13, 0.4)', INK]}
          locations={[0, 0.6, 1]}
          style={StyleSheet.absoluteFill}
        />
      </View>

      <Container style={styles.content}>
        <Reveal trigger="mount" delay={100}>
          <Text variant="eyebrow" style={styles.eyebrow}>
            Heya! I&apos;m
          </Text>
        </Reveal>

        <Reveal trigger="mount" delay={230} distance={40}>
          <Text variant="display" tone="onDark" level={1}>
            {profile.name} <Text variant="inherit" style={styles.wave}>✌️</Text>
          </Text>
        </Reveal>

        <Reveal trigger="mount" delay={380}>
          <View style={styles.statusPill}>
            <View style={styles.statusDot} {...({ dataSet: { kmPulse: '' } } as object)} />
            <Text variant="caption" weight="600" tone="onDark">
              Now: {profile.role} @ {profile.company}
            </Text>
          </View>
        </Reveal>

        <Reveal trigger="mount" delay={520}>
          <Text variant="lead" style={styles.about}>
            {profile.about}
          </Text>
        </Reveal>

        {/* Phones: the signature signs off the intro, in the flow. */}
        <View style={styles.signaturePhone} pointerEvents="none" {...responsive({ hideAbove: 'md' })}>
          <Signature width={280} color={ON_DARK} />
        </View>

        {/* Tablets and wider: buttons under the intro. Phones skip them — the
            notification leads into the story, and contact options live in the nav
            and at the end of the page. */}
        <View {...responsive({ hideBelow: 'md' })}>
          <Reveal trigger="mount" delay={640} style={styles.ctaRow}>
            <Button label="Say hello" href={profile.links.email} variant="light" size="lg" icon="mail" />
            <Button label="Read my story" href="#story" variant="glass" size="lg" trailingIcon="chevronDown" />
            <View style={styles.socials}>
              <IconButton icon="linkedin" label="LinkedIn" href={profile.links.linkedin} variant="glass" size={52} />
              <IconButton icon="github" label="GitHub" href={profile.links.github} variant="glass" size={52} />
            </View>
          </Reveal>
        </View>

        {/* Tablets: right-aligned, just below the buttons. */}
        <View style={styles.signatureTablet} pointerEvents="none" {...responsive({ hideBelow: 'md', hideAbove: 'lg' })}>
          <Signature width={340} color={ON_DARK} />
        </View>

        {/* Wide screens: anchored to the content column, just below the buttons with a slight overlap. */}
        <View style={styles.signature} pointerEvents="none" {...responsive({ hideBelow: 'lg' })}>
          <Signature width={360} color={ON_DARK} />
        </View>
      </Container>

      {/* An unread iMessage "notification" — tapping it opens the conversation below. */}
      <View style={[styles.notification, notificationWeb]} pointerEvents="box-none">
        {/* Once the conversation it previews is on screen, it's been "read". */}
        <View
          style={[styles.notificationInner, read && styles.notificationRead, transition(['opacity', 'transform'], 450)]}
          pointerEvents={read ? 'none' : 'box-none'}
          aria-hidden={read || undefined}
        >
          <Reveal trigger="mount" delay={1900} from="up" distance={48} curve="spring" duration={800} style={styles.notificationInner}>
            <NotificationBanner
              title={profile.firstName}
              body={firstMessage}
              time="now"
              href="#story"
              stacked
              accessibilityLabel={`New message from ${profile.firstName}: ${firstMessage} — read the conversation`}
            />
          </Reveal>
        </View>
      </View>
    </View>
  );
}

// Toolbars-collapsed height, so nothing below peeks out behind mobile Safari's
// bottom toolbar; the notification is lifted by the toolbar's area (100lvh - 100svh)
// to stay in view above it.
const heroHeightWeb = webStyle({ minHeight: '100lvh' });
const notificationWeb = webStyle({ bottom: 'calc(24px + 100lvh - 100svh)' });
const glowWeb = (color: string) =>
  webStyle({ backgroundImage: `radial-gradient(closest-side, ${color}, transparent)` });

const styles = StyleSheet.create({
  hero: {
    minHeight: 720,
    backgroundColor: INK,
    justifyContent: 'center',
    overflow: 'hidden',
    paddingTop: 120,
    paddingBottom: 140,
  },
  heroScrolled: {
    borderBottomLeftRadius: radii.xl + 4,
    borderBottomRightRadius: radii.xl + 4,
  },
  backdrop: {
    overflow: 'hidden',
  },
  glow: {
    position: 'absolute',
    width: 720,
    height: 720,
    borderRadius: 360,
  },
  glowGold: {
    top: -240,
    right: -200,
  },
  glowViolet: {
    bottom: -320,
    left: -260,
  },
  content: {
    gap: space[5],
    position: 'relative',
  },
  statusPill: {
    flexDirection: 'row',
    alignItems: 'center',
    alignSelf: 'flex-start',
    gap: space[2],
    paddingHorizontal: space[3],
    paddingVertical: 6,
    borderRadius: radii.pill,
    backgroundColor: 'rgba(255, 255, 255, 0.08)',
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.14)',
  },
  statusDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: '#34D399',
  },
  eyebrow: {
    color: GOLD,
    marginBottom: -space[2],
  },
  wave: {
    fontWeight: '400',
  },
  about: {
    color: ON_DARK_MUTED,
    maxWidth: 620,
  },
  ctaRow: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    alignItems: 'center',
    gap: space[3],
    marginTop: space[3],
  },
  socials: {
    flexDirection: 'row',
    gap: space[3],
  },
  signature: {
    position: 'absolute',
    right: layout.gutter,
    top: '100%',
    marginTop: -SIGNATURE_OVERLAP,
  },
  signaturePhone: {
    marginTop: space[6],
  },
  signatureTablet: {
    alignSelf: 'flex-end',
    // Sits just below the buttons (12px, after the column gap) with room to breathe.
    marginTop: -space[2],
  },
  notification: {
    position: 'absolute',
    left: 0,
    right: 0,
    bottom: 24,
    alignItems: 'center',
    paddingHorizontal: space[4],
  },
  notificationInner: {
    width: '100%',
    alignItems: 'center',
  },
  notificationRead: {
    opacity: 0,
    transform: [{ translateY: 32 }, { scale: 0.96 }],
  },
});
