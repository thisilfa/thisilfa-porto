// @ts-check
import { defineConfig } from 'astro/config';
import react from '@astrojs/react';
import sitemap from '@astrojs/sitemap';

// Project site on GitHub Pages: every built URL carries /thisilfa-porto.
// English lives at / (unprefixed default locale), Indonesian at /id/.
export default defineConfig({
  site: 'https://thisilfa.github.io',
  base: '/thisilfa-porto',
  output: 'static',
  integrations: [
    react(),
    sitemap({
      i18n: {
        defaultLocale: 'en',
        locales: { en: 'en-US', id: 'id-ID' },
      },
    }),
  ],
  i18n: {
    locales: ['en', 'id'],
    defaultLocale: 'en',
    routing: { prefixDefaultLocale: false },
  },
});
