import type { ReactNode } from 'react';
import { ScrollView, StyleSheet } from 'react-native';
import { useTheme } from '@kenma/ui';

/** Native: pages scroll inside a ScrollView. (Web uses document scrolling — see Page.web.tsx.) */
export function Page({ children }: { children: ReactNode }) {
  const { colors } = useTheme();
  return (
    <ScrollView style={{ backgroundColor: colors.background }} contentContainerStyle={styles.content}>
      {children}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  content: {
    flexGrow: 1,
  },
});
