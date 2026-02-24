// @ts-check
import { defineConfig } from 'astro/config';

// https://astro.build/config
export default defineConfig({
  site: 'https://mods.sh',
  server: {
    host: '0.0.0.0',
  },
  build: {
    assets: '_assets',
  },
});
