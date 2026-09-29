import { StyleSheet, View } from 'react-native';
import { Button, Card, Container, Reveal, Text, space, useTheme, webStyle } from '@kenma/ui';

import { profile } from '@/content/profile';

/** Closing call-to-action card. */
export function ContactCard({ ready = true }: { ready?: boolean }) {
  const { colors } = useTheme();
  return (
    <Container>
      <Reveal from="scale" delay={150} when={ready}>
        <Card style={styles.card} padded={false}>
          <View style={[StyleSheet.absoluteFill, glowWeb]} pointerEvents="none" />
          <View style={styles.inner}>
            <Text variant="eyebrow" tone="accent">
              Let&apos;s chat
            </Text>
            <Text variant="title" level={2} align="center" style={styles.title}>
              Got something dope in mind?
            </Text>
            <Text variant="lead" tone="muted" align="center" style={styles.copy}>
              I&apos;m always happy to talk engineering leadership, mobile, platforms — or whatever you&apos;re building.
            </Text>
            <View style={styles.actions}>
              <Button label={profile.email} href={profile.links.email} variant="primary" size="lg" icon="mail" />
              <Button label="LinkedIn" href={profile.links.linkedin} variant="secondary" size="lg" icon="linkedin" />
              <Button label="GitHub" href={profile.links.github} variant="secondary" size="lg" icon="github" />
            </View>
            <View style={[styles.divider, { backgroundColor: colors.border }]} />
            <Text variant="caption" tone="subtle" align="center">
              Based in {profile.location}
            </Text>
          </View>
        </Card>
      </Reveal>
    </Container>
  );
}

const glowWeb = webStyle({
  backgroundImage:
    'radial-gradient(60% 80% at 50% 0%, var(--kui-accent-soft), transparent 70%)',
});

const styles = StyleSheet.create({
  card: {
    position: 'relative',
  },
  inner: {
    alignItems: 'center',
    gap: space[4],
    paddingHorizontal: space[6],
    paddingVertical: space[16],
  },
  title: {
    maxWidth: 640,
  },
  copy: {
    maxWidth: 560,
  },
  actions: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'center',
    gap: space[3],
    marginTop: space[4],
  },
  divider: {
    width: 48,
    height: 1,
    marginTop: space[6],
  },
});
