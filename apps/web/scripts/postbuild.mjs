// Finalises `expo export` output for GitHub Pages.
import { copyFile, rm } from 'node:fs/promises';
import { join } from 'node:path';

const dist = join(import.meta.dirname, '..', 'dist');

// GitHub Pages serves `404.html` for unknown paths.
await copyFile(join(dist, '+not-found.html'), join(dist, '404.html'));

// Expo Router's `_sitemap` screen is a development aid; don't publish it.
await rm(join(dist, '_sitemap.html'), { force: true });

console.log('postbuild: wrote 404.html, removed _sitemap.html');
