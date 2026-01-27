import { defineConfig } from 'astro/config';
import tailwind from '@astrojs/tailwind';
import preact from '@astrojs/preact';
import sitemap from '@astrojs/sitemap';

// https://astro.build/config
export default defineConfig({
  base: '/design',
  integrations: [tailwind(), preact(), sitemap()],
  site: 'https://hampsteadrenovations.co.uk',
  output: 'static',
  compressHTML: true,
  build: {
    inlineStylesheets: 'auto',
    assets: '_astro',
  },
  vite: {
    build: {
      cssCodeSplit: true,
      rollupOptions: {
        output: {
          manualChunks: {
            'gsap-vendor': ['gsap'],
            'lenis-vendor': ['lenis'],
          },
        },
      },
    },
    ssr: {
      noExternal: ['gsap', 'lenis'],
    },
  },
});
