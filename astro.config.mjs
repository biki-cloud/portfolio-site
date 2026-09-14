import { defineConfig } from 'astro/config';
import tailwindcss from '@tailwindcss/vite';
import sitemap from '@astrojs/sitemap';

export default defineConfig({
  site: 'https://your-project.pages.dev',
  output: 'static',
  vite: {
    plugins: [tailwindcss()],
  },
  integrations: [sitemap()],
});
