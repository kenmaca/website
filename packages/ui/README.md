# @kenma/ui

Cross-platform (React Native + react-native-web) components used by ken.ma.

```tsx
import { ChatThread, ThemeProvider, type ChatMessage } from '@kenma/ui';

const messages: ChatMessage[] = [
  { direction: 'incoming', text: "Heya! How's it going?" },
  { direction: 'outgoing', text: 'Hi! Tell me about [your work](https://ken.ma)' },
];

<ThemeProvider>
  <ChatThread messages={messages} participants={{ incoming: 'Kenneth', outgoing: 'You' }} />
</ThemeProvider>;
```

## What's inside

| Area | Exports |
| --- | --- |
| Chat | `ChatThread` (scroll-driven conversation playback), `ChatBubble`, `ImageGroup`, `TypingIndicator`, `TypewriterText`, `NotificationBanner`, `SenderLabel`, `useConversationPlayer`, `parseInlineLinks` |
| Theme | `ThemeProvider`, `useTheme`, `ThemeToggle`, `palettes`, tokens (`space`, `radii`, `fonts`, `motion`, `breakpoints`) |
| Primitives | `Text`, `Anchor`, `Button`, `IconButton`, `Icon`, `Glyph`, `Card`, `Chip`, `Container` |
| Motion | `Reveal` (mount or scroll-into-view; respects reduced motion) |
| Hooks | `useInView`, `useReachedCount`, `useReducedMotion`, `useHydrated`, `useInteractionState` |
| Web helpers | `themeCss`, `themeInitScript`, `responsiveCss`, `noscriptCss`, `responsive()`, `webStyle()`, `fluid()`, `transition()`, `linkProps()` |

## Web setup

For statically rendered web apps, add the theme and helper styles to the document head (e.g. in Expo Router's `app/+html.tsx`):

```tsx
<script dangerouslySetInnerHTML={{ __html: themeInitScript }} />
<style dangerouslySetInnerHTML={{ __html: themeCss + responsiveCss }} />
<noscript><style dangerouslySetInnerHTML={{ __html: noscriptCss }} /></noscript>
```

On web, `useTheme().colors` returns `var(--kui-*)` references, so colours switch with the scheme without re-rendering. On native it returns concrete values.

## Platform notes

- `react-native-svg` is an optional peer dependency. Icons and bubble tails render with plain DOM SVG on web and only need it on native.
- Scroll-triggered reveals use `IntersectionObserver` on web. On native, content reveals on mount.
