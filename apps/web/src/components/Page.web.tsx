import type { ReactNode } from 'react';
import { StyleSheet, View } from 'react-native';

/**
 * Web: let the document scroll natively (better for SEO, anchor links,
 * scroll restoration and mobile browser chrome) instead of a ScrollView.
 */
export function Page({ children }: { children: ReactNode }) {
  return (
    <View role="main" style={styles.page}>
      {children}
    </View>
  );
}

const styles = StyleSheet.create({
  page: {
    flexGrow: 1,
  },
});
