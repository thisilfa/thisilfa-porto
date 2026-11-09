// @ts-check
import { defineConfig, fontProviders } from 'astro/config';
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
  // Self-hosted fonts (fontsource, downloaded at build time and cached):
  // Space Grotesk for display, Inter for body, JetBrains Mono for accents.
  fonts: [
    {
      provider: fontProviders.fontsource(),
      name: 'Space Grotesk Variable',
      cssVariable: '--font-display',
      weights: ['300 700'],
    },
    {
      provider: fontProviders.fontsource(),
      name: 'Inter Variable',
      cssVariable: '--font-body',
      weights: ['100 900'],
    },
    {
      provider: fontProviders.fontsource(),
      name: 'JetBrains Mono Variable',
      cssVariable: '--font-mono',
      weights: ['100 800'],
    },
  ],
});
