import { defineConfig } from 'astro/config';
import tailwind from '@astrojs/tailwind';

export default defineConfig({
  site: 'https://datanalytico.com',
  integrations: [tailwind()],
  build: {
    format: 'directory'
  }
});
