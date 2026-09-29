import { forwardRef } from 'react';
import { Text as RNText, type TextStyle } from 'react-native';

import { useTheme } from '../theme/ThemeProvider';
import { linkProps, type LinkTargetOptions } from '../utils/links';
import { webStyle } from '../utils/web';
import { Text, type TextProps } from './Text';

export interface AnchorProps extends Omit<TextProps, 'onPress'>, LinkTargetOptions {
  href: string;
  /** Link colour; defaults to the theme link colour. */
  color?: string;
  underline?: boolean;
}

/** Inline text link. Renders a real `<a>` on web. */
export const Anchor = forwardRef<RNText, AnchorProps>(function Anchor(
  { href, newTab, download, color, underline = true, variant = 'inherit', style, ...rest },
  ref,
) {
  const { colors } = useTheme();
  const linkStyle: TextStyle = {
    color: color ?? colors.link,
    textDecorationLine: underline ? 'underline' : 'none',
  };

  return (
    <Text
      ref={ref}
      variant={variant}
      {...rest}
      {...linkProps(href, { newTab, download })}
      style={[linkStyle, underlineWebStyle, style]}
    />
  );
});

const underlineWebStyle = webStyle<TextStyle>({
  // Thin, offset underlines read as more refined than the browser default.
  textDecorationThickness: '0.08em',
  textUnderlineOffset: '0.18em',
});
