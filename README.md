# ken.ma

Kenneth Ma's personal site: a statically rendered [Expo](https://expo.dev) (React Native Web) app, deployed to GitHub Pages.

## Layout

```
apps/
  web/               Expo Router app (static web export)
    src/app/         Routes, `+html.tsx` document shell
    src/components/  Page sections (Hero, NavBar, Spotlight, Experience…)
    src/content/     Copy & data — profile, experience, chat conversations
    public/          Copied verbatim into the build (CNAME, .well-known, resume…)
packages/
  ui/                @kenma/ui — reusable cross-platform component library
```

npm workspaces link `@kenma/ui` into the app; Metro picks up the monorepo automatically, and the library ships as TypeScript source (no build step).

## Develop

Requires Node 22.13+ (see `.nvmrc`).

```bash
npm install
npm run dev        # Expo dev server (web)
npm run check      # typecheck + lint, all workspaces
npm run build      # static export → apps/web/dist
npm run preview    # serve the export on http://localhost:4173
```

Most edits to the site's words happen in `apps/web/src/content/`.

## Deploy

`.github/workflows/deploy.yml` runs on every push to `master`/`main`: it typechecks, lints, exports the site and publishes `apps/web/dist` to GitHub Pages. Pull requests get the same checks and build without deploying.

The repository's **Settings → Pages → Source** must be set to **GitHub Actions**.

## Design notes

- **Theming**: colours are CSS custom properties on web (`--kui-*`), so the statically rendered HTML is already correct for light or dark before any JavaScript runs. A tiny inline script applies a saved preference before first paint. Native builds get concrete palette values.
- **Responsive without hydration mismatches**: layouts are fluid (flex-wrap, `clamp()` type). Show/hide by breakpoint uses `responsive()` and CSS media queries, not `useWindowDimensions`.
- **Motion**: scroll-triggered reveals, iMessage-style chat that "types" as it scrolls into view, a CSS-drawn signature, and hover/press micro-interactions. All of it honours `prefers-reduced-motion`, and content stays visible without JavaScript.
- **SEO & a11y**: real `<a>` links, heading levels, alt text, Open Graph/Twitter cards, JSON-LD `Person` data, sitemap and robots.txt.
