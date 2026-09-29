import { StyleSheet, View } from 'react-native';
import { Anchor, Container, IconButton, Text, ThemeToggle, space, useTheme } from '@kenma/ui';

import { profile } from '@/content/profile';

export function Footer() {
  const { colors } = useTheme();
  const year = new Date().getFullYear();
  return (
    <View role="contentinfo" style={[styles.footer, { borderTopColor: colors.border }]}>
      <Container style={styles.row}>
        <View style={styles.meta}>
          <Text variant="label">
            © {year} {profile.name}
          </Text>
          <Text variant="caption" tone="subtle">
            Built with <Anchor href="https://expo.dev" color={colors.textMuted}>Expo</Anchor> &{' '}
            <Anchor href="https://necolas.github.io/react-native-web/" color={colors.textMuted}>
              React Native Web
            </Anchor>
            . Hosted on GitHub Pages.
          </Text>
        </View>
        <View style={styles.actions}>
          <IconButton icon="mail" label="Email" href={profile.links.email} />
          <IconButton icon="linkedin" label="LinkedIn" href={profile.links.linkedin} />
          <IconButton icon="github" label="GitHub" href={profile.links.github} />
          <IconButton icon="file" label="Resume (PDF)" href={profile.links.resume} newTab />
          <View style={[styles.separator, { backgroundColor: colors.border }]} />
          <ThemeToggle />
        </View>
      </Container>
    </View>
  );
}

const styles = StyleSheet.create({
  footer: {
    borderTopWidth: 1,
    paddingVertical: space[10],
    marginTop: space[16],
  },
  row: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    alignItems: 'center',
    justifyContent: 'space-between',
    gap: space[6],
  },
  meta: {
    flexShrink: 1,
    gap: space[1],
  },
  actions: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: space[1],
  },
  separator: {
    width: 1,
    height: 24,
    marginHorizontal: space[2],
  },
});
