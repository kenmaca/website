// Theme
export { palettes, cssVarColors, cssVarName, type ColorScheme, type ColorToken, type Colors } from './theme/palette';
export { space, radii, fonts, motion, easing, cssEasing, breakpoints, layout, type CurveName } from './theme/tokens';
export { themeCss, themeInitScript, responsiveCss, noscriptCss, THEME_STORAGE_KEY, THEME_ATTRIBUTE } from './theme/css';
export { ThemeProvider, useTheme, type Theme, type ThemePreference, type ThemeProviderProps } from './theme/ThemeProvider';
export { ThemeToggle, type ThemeToggleProps } from './theme/ThemeToggle';

// Primitives
export { Text, type TextProps, type TextVariant, type TextTone } from './primitives/Text';
export { Anchor, type AnchorProps } from './primitives/Anchor';
export { Button, IconButton, type ButtonProps, type ButtonVariant, type ButtonSize, type IconButtonProps } from './primitives/Button';
export { Icon, icons, type IconName, type IconProps } from './primitives/Icon';
export { Glyph } from './primitives/Glyph';
export type { GlyphPath, GlyphProps } from './primitives/Glyph.types';
export { Card, type CardProps } from './primitives/Card';
export { Chip, type ChipProps } from './primitives/Chip';
export { Container, type ContainerProps } from './primitives/Container';

// Motion
export { Reveal, REVEAL_DATA_ATTRIBUTE, type RevealProps, type RevealFrom } from './motion/Reveal';

// Chat
export { ChatBubble, type ChatBubbleProps } from './chat/ChatBubble';
export { ImageGroup } from './chat/ImageGroup';
export { ChatThread, groupMessages, type ChatThreadProps, type ChatGroupData } from './chat/ChatThread';
export { useConversationPlayer, type PlayerState, type PlayerPhase } from './chat/useConversationPlayer';
export { TypewriterText } from './chat/TypewriterText';
export { TypingIndicator, type TypingIndicatorProps } from './chat/TypingIndicator';
export { SenderLabel } from './chat/SenderLabel';
export { parseInlineLinks, type InlineToken } from './chat/parseInlineLinks';
export type { BubbleDirection, ChatImage, ChatMessage } from './chat/types';

// Hooks & utilities
export { useInView } from './hooks/useInView';
export type { InViewOptions } from './hooks/useInView.types';
export { useReducedMotion } from './hooks/useReducedMotion';
export { useReachedCount } from './hooks/useReachedCount';
export type { ReachedCountOptions, ReachedCounts } from './hooks/useReachedCount.types';
export { useInteractionState, type InteractionState } from './hooks/useInteractionState';
export { linkProps, isExternalHref, type LinkTargetOptions } from './utils/links';
export { webStyle, fluid, transition, isWeb, type WebOnlyStyle } from './utils/web';
export { responsive, type Breakpoint, type ResponsiveOptions } from './utils/responsive';
export { useHydrated } from './hooks/useHydrated';
export { NotificationBanner, MessagesAppIcon, type NotificationBannerProps } from './chat/NotificationBanner';
