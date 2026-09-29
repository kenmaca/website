import type { ReactNode } from 'react';
import { Pressable, StyleSheet, View, type PressableProps, type StyleProp, type ViewStyle } from 'react-native';

import { useInteractionState } from '../hooks/useInteractionState';
import { useTheme } from '../theme/ThemeProvider';
import type { Colors } from '../theme/palette';
import { radii, space } from '../theme/tokens';
import { linkProps, type LinkTargetOptions } from '../utils/links';
import { transition, webStyle } from '../utils/web';
import { Icon, type IconName } from './Icon';
import { Text } from './Text';

export type ButtonVariant = 'primary' | 'secondary' | 'ghost' | 'accent' | 'light' | 'glass';
export type ButtonSize = 'md' | 'lg';

export interface ButtonProps extends Omit<PressableProps, 'children' | 'style'>, LinkTargetOptions {
  label: string;
  variant?: ButtonVariant;
  size?: ButtonSize;
  /** Renders as a link (`<a href>` on web). */
  href?: string;
  icon?: IconName;
  trailingIcon?: IconName;
  style?: StyleProp<ViewStyle>;
  children?: ReactNode;
}

interface VariantColors {
  background: string;
  hoverBackground: string;
  foreground: string;
  border: string;
}

const ON_DARK = '#F5F5F4';

function variantColors(variant: ButtonVariant, colors: Colors): VariantColors {
  switch (variant) {
    case 'primary':
      return { background: colors.surfaceInverse, hoverBackground: colors.surfaceInverse, foreground: colors.textInverse, border: 'transparent' };
    case 'accent':
      return { background: colors.accentStrong, hoverBackground: colors.accentStrong, foreground: '#111113', border: 'transparent' };
    case 'secondary':
      return { background: colors.surface, hoverBackground: colors.surfaceMuted, foreground: colors.text, border: colors.borderStrong };
    case 'ghost':
      return { background: 'transparent', hoverBackground: colors.surfaceMuted, foreground: colors.text, border: 'transparent' };
    case 'light':
      return { background: ON_DARK, hoverBackground: '#FFFFFF', foreground: '#111113', border: 'transparent' };
    case 'glass':
      return {
        background: 'rgba(255, 255, 255, 0.08)',
        hoverBackground: 'rgba(255, 255, 255, 0.16)',
        foreground: ON_DARK,
        border: 'rgba(255, 255, 255, 0.2)',
      };
  }
}

/** Pill button with hover lift, press feedback and optional icons. */
export function Button({
  label,
  variant = 'primary',
  size = 'md',
  href,
  newTab,
  download,
  icon,
  trailingIcon,
  style,
  onPress,
  disabled,
  ...rest
}: ButtonProps) {
  const { colors } = useTheme();
  const { state, handlers } = useInteractionState();
  const palette = variantColors(variant, colors);
  const lifted = state.hovered && !state.pressed && !disabled;
  const iconSize = size === 'lg' ? 20 : 18;

  return (
    <Pressable
      role={href ? undefined : 'button'}
      accessibilityLabel={label}
      disabled={disabled}
      onPress={onPress}
      {...rest}
      {...handlers}
      {...(href ? linkProps(href, { newTab, download }) : null)}
      style={[
        styles.base,
        size === 'lg' ? styles.lg : styles.md,
        {
          backgroundColor: lifted ? palette.hoverBackground : palette.background,
          borderColor: palette.border,
          opacity: disabled ? 0.5 : 1,
          transform: [{ translateY: lifted ? -2 : 0 }, { scale: state.pressed ? 0.97 : 1 }],
        },
        lifted && variant !== 'ghost' && styles.shadow,
        state.focused && { outlineColor: colors.focusRing },
        state.focused && focusRing,
        buttonTransition,
        style,
      ]}
    >
      {icon ? <Icon name={icon} color={palette.foreground} size={iconSize} /> : null}
      <Text variant="label" style={[{ color: palette.foreground }, size === 'lg' && styles.lgLabel]}>
        {label}
      </Text>
      {trailingIcon ? (
        <View style={[{ transform: [{ translateX: lifted ? 3 : 0 }] }, buttonTransition]}>
          <Icon name={trailingIcon} color={palette.foreground} size={iconSize} />
        </View>
      ) : null}
    </Pressable>
  );
}

export interface IconButtonProps extends Omit<PressableProps, 'children' | 'style'>, LinkTargetOptions {
  icon: IconName;
  /** Accessible name — required because there is no visible label. */
  label: string;
  href?: string;
  variant?: Extract<ButtonVariant, 'secondary' | 'ghost' | 'glass'>;
  size?: number;
  style?: StyleProp<ViewStyle>;
}

/** Circular icon-only button. */
export function IconButton({ icon, label, href, newTab, variant = 'ghost', size = 40, style, ...rest }: IconButtonProps) {
  const { colors } = useTheme();
  const { state, handlers } = useInteractionState();
  const palette = variantColors(variant, colors);

  return (
    <Pressable
      role={href ? undefined : 'button'}
      accessibilityLabel={label}
      {...rest}
      {...handlers}
      {...(href ? linkProps(href, { newTab }) : null)}
      style={[
        styles.iconButton,
        {
          width: size,
          height: size,
          backgroundColor: state.hovered ? palette.hoverBackground : palette.background,
          borderColor: palette.border,
          transform: [{ scale: state.pressed ? 0.92 : state.hovered ? 1.06 : 1 }],
        },
        state.focused && { outlineColor: colors.focusRing },
        state.focused && focusRing,
        buttonTransition,
        style,
      ]}
    >
      <Icon name={icon} color={palette.foreground} size={Math.round(size * 0.46)} />
    </Pressable>
  );
}

const focusRing = webStyle({ outlineStyle: 'solid', outlineWidth: 3, outlineOffset: 2 });

const buttonTransition = transition(['transform', 'background-color', 'box-shadow', 'opacity'], 220);

const styles = StyleSheet.create({
  base: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    alignSelf: 'flex-start',
    gap: space[2],
    borderRadius: radii.pill,
    borderWidth: 1,
  },
  md: {
    minHeight: 42,
    paddingHorizontal: space[4] + 2,
    paddingVertical: space[2],
  },
  lg: {
    minHeight: 52,
    paddingHorizontal: space[6],
    paddingVertical: space[3],
  },
  lgLabel: {
    fontSize: 16,
  },
  shadow: {
    boxShadow: '0 10px 30px -12px rgba(0, 0, 0, 0.45)',
  },
  iconButton: {
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: radii.pill,
    borderWidth: 1,
  },
});
