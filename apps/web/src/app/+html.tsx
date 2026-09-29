import type { PropsWithChildren } from 'react';
import { noscriptCss, responsiveCss, themeCss, themeInitScript } from '@kenma/ui';

import { globalCss } from '@/styles/global';

/**
 * Root HTML document for static rendering (web only, runs in Node).
 * Theme tokens and the persisted-theme script live here so the very first
 * paint already uses the right colour scheme.
 */
export default function Root({ children }: PropsWithChildren) {
  return (
    <html lang="en" dir="ltr">
      <head>
        <meta charSet="utf-8" />
        <meta httpEquiv="X-UA-Compatible" content="IE=edge" />
        <meta name="viewport" content="width=device-width, initial-scale=1, viewport-fit=cover" />
        <meta name="color-scheme" content="light dark" />
        {/* No theme-color: Safari then tints its status bar and toolbars from the
            document background, which stays dark while the hero fills the screen
            (see styles/global.ts) and follows the theme toggle after that. */}
        <link rel="icon" href="/favicon.svg" type="image/svg+xml" />
        <link rel="preload" as="image" href="/images/hero.jpg" fetchPriority="high" />

        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="" />
        <link
          rel="stylesheet"
          href="https://fonts.googleapis.com/css2?family=Instrument+Serif:ital@0;1&family=Inter+Tight:wght@600..800&family=Inter:wght@400..700&display=swap"
        />

        <script dangerouslySetInnerHTML={{ __html: themeInitScript }} />
        <style id="kui-theme" dangerouslySetInnerHTML={{ __html: themeCss }} />
        <style id="kui-responsive" dangerouslySetInnerHTML={{ __html: responsiveCss }} />
        <style id="global" dangerouslySetInnerHTML={{ __html: globalCss }} />
        <noscript>
          <style dangerouslySetInnerHTML={{ __html: noscriptCss }} />
        </noscript>
      </head>
      <body>{children}</body>
    </html>
  );
}
