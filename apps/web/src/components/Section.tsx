import type { ReactNode } from 'react';
import { StyleSheet, View, type StyleProp, type ViewStyle } from 'react-native';
import { fluid, space } from '@kenma/ui';

/** Vertical rhythm wrapper with an optional anchor id. */
export function Section({ id, children, style }: { id?: string; children: ReactNode; style?: StyleProp<ViewStyle> }) {
  return (
    <View nativeID={id} style={[styles.section, style]}>
      {children}
    </View>
  );
}

const styles = StyleSheet.create({
  section: {
    paddingVertical: fluid(64, 10, 128, space[16]),
  },
});
