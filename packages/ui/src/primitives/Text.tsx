import { forwardRef } from 'react';
import { StyleSheet, Text as RNText, type TextProps as RNTextProps, type TextStyle } from 'react-native';

import { useTheme } from '../theme/ThemeProvider';
import type { ColorToken } from '../theme/palette';
import { fonts } from '../theme/tokens';
import { fluid, webStyle } from '../utils/web';

export type TextVariant =
  | 'display'
  | 'title'
  | 'heading'
  | 'subheading'
  | 'eyebrow'
  | 'lead'
  | 'body'
  | 'caption'
  | 'label'
  /** No typography of its own — inherits from the parent Text (for inline spans). */
  | 'inherit';
export type TextTone = 'default' | 'muted' | 'subtle' | 'accent' | 'inverse' | 'onDark';

const toneToken: Record<Exclude<TextTone, 'onDark'>, ColorToken> = {
  default: 'text',
  muted: 'textMuted',
  subtle: 'textSubtle',
  accent: 'accent',
  inverse: 'textInverse',
};

export interface TextProps extends RNTextProps {
  variant?: TextVariant;
  tone?: TextTone;
  /** Font weight override. */
  weight?: TextStyle['fontWeight'];
  align?: TextStyle['textAlign'];
  /** Semantic heading level on web (`<h1>`–`<h6>`). */
  level?: 1 | 2 | 3 | 4 | 5 | 6;
}

/**
 * Typography primitive with a small, fluid type scale and theme-aware tones.
 */
export const Text = forwardRef<RNText, TextProps>(function Text(
  { variant = 'body', tone, weight, align, level, style, ...rest },
  ref,
) {
  const { colors } = useTheme();
  const inherit = variant === 'inherit';
  const resolvedTone = tone ?? (inherit ? undefined : 'default');
  const color = resolvedTone === 'onDark' ? '#F5F5F4' : resolvedTone ? colors[toneToken[resolvedTone]] : undefined;
  const headingProps = level ? ({ role: 'heading', 'aria-level': level } as const) : undefined;

  return (
    <RNText
      ref={ref}
      {...headingProps}
      {...rest}
      style={[
        !inherit && styles.base,
        !inherit && variantStyles[variant as Exclude<TextVariant, 'inherit'>],
        variantWebStyles[variant],
        color != null && { color },
        weight != null && { fontWeight: weight },
        align != null && { textAlign: align },
        style,
      ]}
    />
  );
});

const styles = StyleSheet.create({
  base: {
    fontFamily: fonts.body,
  },
});

const variantStyles = StyleSheet.create<Record<Exclude<TextVariant, 'inherit'>, TextStyle>>({
  display: {
    fontFamily: fonts.display,
    fontSize: 48,
    lineHeight: 50,
    fontWeight: '600',
    letterSpacing: -1.2,
  },
  title: {
    fontFamily: fonts.display,
    fontSize: 40,
    lineHeight: 44,
    fontWeight: '700',
    letterSpacing: -1,
  },
  heading: {
    fontFamily: fonts.display,
    fontSize: 24,
    lineHeight: 30,
    fontWeight: '700',
    letterSpacing: -0.4,
  },
  subheading: {
    fontSize: 17,
    lineHeight: 24,
    fontWeight: '600',
    letterSpacing: -0.2,
  },
  eyebrow: {
    fontSize: 13,
    lineHeight: 16,
    fontWeight: '700',
    letterSpacing: 1.6,
    textTransform: 'uppercase',
  },
  lead: {
    fontSize: 20,
    lineHeight: 30,
    fontWeight: '400',
  },
  body: {
    fontSize: 16,
    lineHeight: 25,
  },
  caption: {
    fontSize: 13,
    lineHeight: 18,
  },
  label: {
    fontSize: 14,
    lineHeight: 18,
    fontWeight: '600',
  },
});

// Fluid sizes on web; the native sizes above act as fallbacks.
const variantWebStyles: Partial<Record<TextVariant, TextStyle | undefined>> = {
  display: webStyle<TextStyle>({
    // Grows with the viewport up to tablet size (~52px), then holds.
    fontSize: fluid(40, 6.6, 52),
    lineHeight: '1.05',
    letterSpacing: '-0.025em',
    textWrap: 'balance',
  }),
  title: webStyle<TextStyle>({
    fontSize: fluid(30, 4.6, 52),
    lineHeight: '1.05',
    letterSpacing: '-0.025em',
    textWrap: 'balance',
  }),
  heading: webStyle<TextStyle>({ textWrap: 'balance' }),
  lead: webStyle<TextStyle>({ fontSize: fluid(17, 1.9, 21), lineHeight: '1.55', textWrap: 'pretty' }),
  body: webStyle<TextStyle>({ textWrap: 'pretty' }),
};
