import type { ReactNode } from 'react';
import type { ImageSourcePropType } from 'react-native';

/** `incoming` bubbles sit on the left (the host), `outgoing` on the right (the visitor). */
export type BubbleDirection = 'incoming' | 'outgoing';

export interface ChatImage {
  source: ImageSourcePropType;
  /** Alt text — required for accessibility. */
  alt: string;
  /** width / height. Defaults to 4:3. */
  aspectRatio?: number;
  /** Makes the image a link (used by photo groups, where each tile links separately). */
  href?: string;
}

export interface ChatMessage {
  id?: string;
  direction: BubbleDirection;
  /** Plain text. Supports inline markdown-style links: `[label](https://…)`. */
  text?: string;
  /** Arbitrary content, used instead of `text`. */
  content?: ReactNode;
  image?: ChatImage;
  /** Several photos sent together, shown as one iMessage-style grid. */
  images?: ChatImage[];
  /** Makes the whole bubble a link. */
  href?: string;
}
