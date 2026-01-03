/** @type {import('tailwindcss').Config} */
export default {
  content: ['./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}'],
  theme: {
    extend: {
      colors: {
        'off-white': '#FAFAFA',
        'warm-stone': '#E6E2DD',
        'charcoal': '#1A1A1A',
        'oxidized-copper': '#3D5A58',
        'bronze': '#9A7B4F', // New premium accent
      },
      fontFamily: {
        'serif': ['Cormorant Garamond', 'serif'],
        'sans': ['Outfit', 'sans-serif'],
      },
      spacing: {
        'section': 'clamp(4rem, 12vw, 10rem)',
        'container': 'clamp(2rem, 5vw, 4rem)',
      },
    },
  },
  plugins: [],
}
