import { defineConfig } from 'astro/config';
import tailwind from '@astrojs/tailwind';

export default defineConfig({
  site: 'https://aigovernancepe.github.io',
  base: '/datanalytico',
  integrations: [tailwind()],
  build: {
    format: 'directory'
  }
});
