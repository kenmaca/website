import type { StyleProp, ViewStyle } from 'react-native';

import { IconButton, type IconButtonProps } from '../primitives/Button';
import { useTheme } from './ThemeProvider';

export interface ThemeToggleProps {
  variant?: IconButtonProps['variant'];
  size?: number;
  style?: StyleProp<ViewStyle>;
}

/** Light / dark switch. Remembers the choice; falls back to the OS setting. */
export function ThemeToggle({ variant = 'ghost', size, style }: ThemeToggleProps) {
  const { scheme, toggle } = useTheme();
  const next = scheme === 'dark' ? 'light' : 'dark';
  return (
    <IconButton
      icon={scheme === 'dark' ? 'sun' : 'moon'}
      label={`Switch to ${next} mode`}
      onPress={toggle}
      variant={variant}
      size={size}
      style={style}
    />
  );
}
