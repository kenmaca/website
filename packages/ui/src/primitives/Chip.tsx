import { StyleSheet, View, type StyleProp, type ViewStyle } from 'react-native';

import { useTheme } from '../theme/ThemeProvider';
import { radii, space } from '../theme/tokens';
import { Text } from './Text';

export interface ChipProps {
  label: string;
  tone?: 'neutral' | 'accent';
  style?: StyleProp<ViewStyle>;
}

/** Small rounded tag, e.g. for skills or metadata. */
export function Chip({ label, tone = 'neutral', style }: ChipProps) {
  const { colors } = useTheme();
  const accent = tone === 'accent';
  return (
    <View
      style={[
        styles.chip,
        {
          backgroundColor: accent ? colors.accentSoft : colors.surface,
          borderColor: accent ? 'transparent' : colors.border,
        },
        style,
      ]}
    >
      <Text variant="caption" weight="600" style={{ color: accent ? colors.accent : colors.textMuted }}>
        {label}
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  chip: {
    paddingHorizontal: space[3],
    paddingVertical: 6,
    borderRadius: radii.pill,
    borderWidth: 1,
  },
});
