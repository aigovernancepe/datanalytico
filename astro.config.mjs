import { defineConfig } from 'astro/config';
import tailwind from '@astrojs/tailwind';

export default defineConfig({
  site: 'https://datanalytico.com',
  integrations: [tailwind()],
  build: {
    format: 'directory'
  },
  redirects: {
    '/dienstleistungen': '/services',
    '/kontakt': '/contact',
    '/ueber-uns': '/about',
    '/seo-wissen': '/blog',
    '/seo-checker': '/local-seo',
    '/local-seo-agentur': '/local-seo',
    '/seo-beratung-basel': '/areas/basel/local-seo',
    '/wordpress-basel': '/areas/basel/website-design',
    '/impressum-datenschutz': '/contact',
    '/feed': '/blog',
    '/comments/feed': '/blog'
  }
});
