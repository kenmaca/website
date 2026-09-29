import type { ReactNode } from 'react';
import { StyleSheet, View, type StyleProp, type ViewProps, type ViewStyle } from 'react-native';

import { useTheme } from '../theme/ThemeProvider';
import { radii, space } from '../theme/tokens';
import { webStyle } from '../utils/web';

export interface CardProps extends ViewProps {
  children: ReactNode;
  padded?: boolean;
  style?: StyleProp<ViewStyle>;
}

/** Elevated surface with a hairline border. */
export function Card({ children, padded = true, style, ...rest }: CardProps) {
  const { colors } = useTheme();
  return (
    <View
      {...rest}
      style={[
        styles.card,
        { backgroundColor: colors.surface, borderColor: colors.border },
        padded && styles.padded,
        clipWeb,
        style,
      ]}
    >
      {children}
    </View>
  );
}

const clipWeb = webStyle({ overflow: 'clip' });

const styles = StyleSheet.create({
  card: {
    borderRadius: radii.xl,
    borderWidth: 1,
    overflow: 'hidden',
    boxShadow: '0 1px 2px rgba(0, 0, 0, 0.04), 0 18px 40px -24px rgba(0, 0, 0, 0.25)',
  },
  padded: {
    padding: space[6],
  },
});
