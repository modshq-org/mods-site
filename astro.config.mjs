// @ts-check
import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';

// https://astro.build/config
export default defineConfig({
  site: 'https://mods.pedroalonso.net',
  integrations: [sitemap()],
  server: {
    host: '0.0.0.0',
  },
  build: {
    assets: '_assets',
  },
});
