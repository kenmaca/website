import type { ReactNode } from 'react';
import { StyleSheet, View, type StyleProp, type ViewProps, type ViewStyle } from 'react-native';

import { layout } from '../theme/tokens';

export interface ContainerProps extends ViewProps {
  children: ReactNode;
  /** `readable` constrains to a comfortable line length for prose / chat. */
  width?: 'default' | 'readable' | 'full';
  style?: StyleProp<ViewStyle>;
}

/** Horizontally centred, max-width content column with a side gutter. */
export function Container({ children, width = 'default', style, ...rest }: ContainerProps) {
  return (
    <View
      {...rest}
      style={[
        styles.container,
        width === 'default' && { maxWidth: layout.maxWidth },
        width === 'readable' && { maxWidth: layout.readableWidth + layout.gutter * 2 },
        style,
      ]}
    >
      {children}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    width: '100%',
    alignSelf: 'center',
    paddingHorizontal: layout.gutter,
  },
});
