import { StyleSheet, View } from 'react-native';
import { Reveal, Text, space, useTheme } from '@kenma/ui';

export interface SectionHeaderProps {
  index: string;
  eyebrow: string;
  title: string;
  description?: string;
  align?: 'left' | 'center';
}

export function SectionHeader({ index, eyebrow, title, description, align = 'left' }: SectionHeaderProps) {
  const { colors } = useTheme();
  const centered = align === 'center';
  return (
    <Reveal style={[styles.header, centered && styles.centered]}>
      <View style={styles.eyebrowRow}>
        <Text variant="eyebrow" tone="accent">
          {index}
        </Text>
        <View style={[styles.rule, { backgroundColor: colors.accentStrong }]} />
        <Text variant="eyebrow" tone="muted">
          {eyebrow}
        </Text>
      </View>
      <Text variant="title" level={2} align={centered ? 'center' : 'left'}>
        {title}
      </Text>
      {description ? (
        <Text variant="lead" tone="muted" align={centered ? 'center' : 'left'} style={styles.description}>
          {description}
        </Text>
      ) : null}
    </Reveal>
  );
}

const styles = StyleSheet.create({
  header: {
    gap: space[4],
    marginBottom: space[10],
  },
  centered: {
    alignItems: 'center',
  },
  eyebrowRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: space[3],
  },
  rule: {
    width: 28,
    height: 2,
    borderRadius: 1,
  },
  description: {
    maxWidth: 620,
  },
});
