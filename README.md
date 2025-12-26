# Hampstead Architects - "The Curator" Platform

A luxury architectural concierge platform built with Astro, embodying "silent luxury" design principles.

## Overview

Hampstead Architects is the gateway to North London's finest architectural talent. We don't just design—we assemble the perfect team, matching specific projects to specialist architects, all managed under the Hampstead Renovations Group umbrella.

## Design Philosophy: "Silent Luxury"

Inspired by *The Modern House* and *Monocle Magazine*, this platform embraces:

- **Minimalist Aesthetics**: Generous whitespace, asymmetrical editorial layouts
- **Refined Typography**: Sharp serif headings (Editorial New/Canela) with clean sans-serif body (Suisse Intl/Inter)
- **Muted Color Palette**: Off-white backgrounds, warm stone accents, charcoal text, oxidized copper highlights
- **Performance as Luxury**: Lightning-fast static generation, smooth scroll, subtle micro-interactions

## Tech Stack

- **Framework**: Astro 4.x (Static Site Generation)
- **Styling**: Tailwind CSS with custom design tokens
- **Animation**: GSAP + Lenis smooth scroll
- **Typography**: Custom web fonts (Editorial New, Suisse Intl)
- **Deployment**: Ready for Netlify/Vercel

## Project Structure

```
hampstead-architects/
├── src/
│   ├── components/       # Reusable components
│   │   ├── Navigation.astro
│   │   ├── Footer.astro
│   │   ├── SmoothScroll.astro
│   │   └── ScrollAnimations.astro
│   ├── layouts/
│   │   └── BaseLayout.astro   # Main layout with SEO & Schema.org
│   ├── pages/             # Route pages
│   │   ├── index.astro        # Homepage - "The Manifesto"
│   │   ├── process.astro      # The Concierge Service
│   │   ├── heritage.astro     # Local Heritage Expertise
│   │   ├── portfolio.astro    # 6 Curated Projects
│   │   └── contact.astro      # Project Inquiry Wizard
│   └── styles/
│       └── global.css         # Design system tokens
├── public/
│   ├── fonts/             # Web fonts (add your licensed fonts here)
│   ├── images/            # Project images (add your photography)
│   └── videos/            # Ambient video content
└── astro.config.mjs
```

## Getting Started

### Prerequisites

- Node.js 18+ and npm

### Installation

```bash
npm install
```

### Development

```bash
npm run dev
```

Visit [http://localhost:4321](http://localhost:4321)

### Build for Production

```bash
npm run build
```

### Preview Production Build

```bash
npm preview
```

## Content Setup Required

### 1. Add Web Fonts

Place licensed font files in `/public/fonts/`:
- `SuisseIntl-Regular.woff2`
- `SuisseIntl-Medium.woff2`
- `EditorialNew-Thin.woff2`
- `EditorialNew-Light.woff2`

Or update [global.css](src/styles/global.css) with your preferred fonts.

### 2. Add Images

Add high-quality architectural photography to `/public/images/`:
- `hero-fallback.jpg` - Homepage hero image
- `conservation.jpg` - Conservation area work
- `basement.jpg` - Basement excavation
- `sustainable.jpg` - Sustainable retrofit
- `basement-engineering.jpg` - Technical diagram
- `/portfolio/` folder with 6 project images

### 3. Add Video (Optional)

For the homepage hero:
- `/public/videos/light-texture.mp4` - Ambient looping video

### 4. Update Contact Information

Replace placeholder contact details in:
- [Footer.astro](src/components/Footer.astro)
- [contact.astro](src/pages/contact.astro)
- [BaseLayout.astro](src/layouts/BaseLayout.astro) (Schema.org data)

## Key Features

### Silent Luxury UX
- ✅ Custom cursor with "View" expand on interactive elements
- ✅ SVG logo pre-loader with draw animation
- ✅ Lenis smooth scroll integration
- ✅ GSAP scroll-triggered parallax effects
- ✅ Asymmetrical editorial grid layouts

### SEO & Performance
- ✅ Schema.org structured data (ArchitectureFirm)
- ✅ Complete meta tags (OpenGraph, Twitter Cards)
- ✅ Semantic HTML5
- ✅ Static site generation for speed
- ✅ Optimized for Core Web Vitals

### Accessibility
- ✅ ARIA labels and roles
- ✅ High contrast focus indicators
- ✅ Keyboard navigation support
- ✅ `prefers-reduced-motion` support
- ✅ Semantic heading hierarchy

### Local SEO Strategy
- ✅ Hampstead Garden Suburb Trust mentions
- ✅ Camden Planning expertise
- ✅ English Heritage credentials
- ✅ NW3-specific case studies
- ✅ Conservation Area specialization

## Pages Overview

### Homepage (`/`)
The manifesto. Introduces the "curated architecture" USP with hero video, expertise highlights, and Hampstead Renovations badge.

### The Process (`/process`)
Three-step concierge service: The Brief, The Match, The Delivery. Explains how we connect clients with specialist architects.

### Local Heritage (`/heritage`)
SEO-focused page showcasing expertise in Conservation Areas, Grade II listed buildings, Camden Planning, and basement engineering.

### Portfolio (`/portfolio`)
Six carefully curated projects representing different architectural specialists from the network.

### Contact (`/contact`)
Multi-step project inquiry wizard asking about:
1. Basic information
2. Property heritage status
3. Project goals and budget

## Customization

### Design Tokens

Edit [tailwind.config.mjs](tailwind.config.mjs):

```js
colors: {
  'off-white': '#FAFAFA',
  'warm-stone': '#E6E2DD',
  'charcoal': '#1A1A1A',
  'oxidized-copper': '#3D5A58',
}
```

### Animation Settings

Adjust smooth scroll in [SmoothScroll.astro](src/components/SmoothScroll.astro):

```js
const lenis = new Lenis({
  duration: 1.2,  // Scroll speed
  easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
});
```

## Browser Support

- Chrome/Edge (last 2 versions)
- Firefox (last 2 versions)
- Safari 14+
- iOS Safari 14+

## License

Proprietary - Hampstead Architects © 2024

## Support

For technical questions or customization requests, contact the development team.

---

**Powered by Hampstead Renovations Group**
We design what we can build.
