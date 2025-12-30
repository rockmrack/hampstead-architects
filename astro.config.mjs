import { defineConfig } from 'astro/config';
import tailwind from '@astrojs/tailwind';
import preact from '@astrojs/preact';
import sitemap from '@astrojs/sitemap';

// https://astro.build/config
export default defineConfig({
  integrations: [tailwind(), preact(), sitemap()],
  site: 'https://hampsteadarchitects.vercel.app', // Update with your custom domain once configured
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
