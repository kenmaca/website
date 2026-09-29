import { Linking } from 'react-native';

import { isWeb } from './web';

export const isExternalHref = (href: string) => /^https?:\/\//i.test(href);

export interface LinkTargetOptions {
  /** Open in a new tab on web. Defaults to true for absolute http(s) URLs. */
  newTab?: boolean;
  /** Suggest a download (web). */
  download?: boolean | string;
}

/**
 * Props that make a Text / View / Pressable behave like a link:
 * a real `<a href>` on web (crawlable, middle-clickable, accessible) and
 * `Linking.openURL` on native.
 */
export function linkProps(href: string, { newTab = isExternalHref(href), download }: LinkTargetOptions = {}) {
  if (isWeb) {
    return {
      role: 'link' as const,
      href,
      hrefAttrs: {
        target: newTab ? '_blank' : undefined,
        rel: newTab ? 'noopener noreferrer' : undefined,
        download: download === true ? '' : download || undefined,
      },
    } as unknown as { role: 'link' };
  }
  return {
    role: 'link' as const,
    onPress: () => {
      Linking.openURL(href).catch(() => {});
    },
  };
}
