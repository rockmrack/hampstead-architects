# Quick Setup Guide

## Immediate Next Steps

### 1. Add Web Fonts

The site is designed for premium typography. You need to add licensed web fonts:

**Option A: Use the Specified Fonts (Recommended)**
- Purchase and download [Suisse Intl](https://www.swisstypefaces.com/fonts/suisse/)
- Purchase and download [Editorial New](https://commercialtype.com/catalog/editorial_new)
- Place `.woff2` files in `/public/fonts/`

**Option B: Use Free Alternatives**
- Update [src/styles/global.css](src/styles/global.css) font-face declarations
- Replace with Google Fonts like Inter and Crimson Pro
- Update [tailwind.config.mjs](tailwind.config.mjs) font families

### 2. Add Images

Add high-quality architectural photography to `/public/images/`:

**Required Images:**
- `hero-fallback.jpg` (1200x1500px) - Homepage hero
- `conservation.jpg` (800x800px) - Conservation work
- `basement.jpg` (800x800px) - Basement excavation
- `sustainable.jpg` (800x800px) - Sustainable retrofit
- `basement-engineering.jpg` (1200x800px) - Technical diagram
- `frognal-restoration.jpg` (1200x900px) - Heritage case study
- `garden-suburb.jpg` (1200x900px) - Garden suburb case study

**Portfolio Images** (in `/public/images/portfolio/`):
- `frognal.jpg` (1200x900px)
- `swiss-cottage.jpg` (1200x900px)
- `belsize.jpg` (1200x900px)
- `garden-suburb.jpg` (1200x900px)
- `primrose.jpg` (1200x900px)
- `mews.jpg` (1200x900px)

**Tip:** Use [Unsplash](https://unsplash.com/s/photos/architecture) for temporary placeholder images during development.

### 3. Add Ambient Video (Optional)

For the homepage hero section:
- Create or source a looping video of light on architectural textures
- Save as `/public/videos/light-texture.mp4`
- Recommended: 10-15 seconds, 1080p, H.264 codec
- Keep file size under 5MB for performance

### 4. Update Contact Information

Replace placeholder details in:

**[src/components/Footer.astro](src/components/Footer.astro):**
```astro
<a href="tel:+442071234567">020 7123 4567</a>
<a href="mailto:hello@hampsteadarchitects.co.uk">hello@hampsteadarchitects.co.uk</a>
```

**[src/pages/contact.astro](src/pages/contact.astro):**
- Phone number
- Email address
- Opening hours

**[src/layouts/BaseLayout.astro](src/layouts/BaseLayout.astro):**
- Update Schema.org structured data with real coordinates
- Update telephone and email

### 5. Configure SEO

Edit [astro.config.mjs](astro.config.mjs):
```js
site: 'https://hampsteadarchitects.co.uk', // Your actual domain
```

### 6. Customize Brand Colors (Optional)

Edit [tailwind.config.mjs](tailwind.config.mjs) if you want to adjust the color palette:
```js
colors: {
  'off-white': '#FAFAFA',
  'warm-stone': '#E6E2DD',
  'charcoal': '#1A1A1A',
  'oxidized-copper': '#3D5A58', // Adjust this for your brand accent
}
```

## Development Workflow

### Start Development Server
```bash
npm run dev
```
Visit: http://localhost:4321

### Build for Production
```bash
npm run build
```

### Preview Production Build
```bash
npm preview
```

## Deployment

### Recommended Platforms
- **Vercel**: Zero-config Astro support
- **Netlify**: Drag-and-drop deployment
- **Cloudflare Pages**: Fast global CDN

### Deploy to Vercel
```bash
npm install -g vercel
vercel
```

### Deploy to Netlify
1. Connect your git repository
2. Build command: `npm run build`
3. Publish directory: `dist`

## Performance Optimization

### Image Optimization
Consider using Cloudinary or Astro Image for automatic optimization:
```bash
npm install @astrojs/image
```

### Font Optimization
- Only load font weights you use
- Use `font-display: swap` (already configured)
- Consider subsetting fonts for Latin characters only

## Accessibility Checklist

- ✅ All images have descriptive `alt` text
- ✅ Form inputs have associated `<label>` elements
- ✅ Interactive elements are keyboard accessible
- ✅ Color contrast meets WCAG AA standards
- ⬜ Test with screen reader (NVDA/JAWS/VoiceOver)
- ⬜ Verify tab order makes logical sense

## Browser Testing

Test on:
- Chrome/Edge (latest)
- Firefox (latest)
- Safari 14+ (macOS/iOS)
- Mobile devices (iOS Safari, Chrome Mobile)

## Analytics Integration (Optional)

Add to [src/layouts/BaseLayout.astro](src/layouts/BaseLayout.astro) in `<head>`:

**Google Analytics:**
```html
<script async src="https://www.googletagmanager.com/gtag/js?id=GA_MEASUREMENT_ID"></script>
<script is:inline>
  window.dataLayer = window.dataLayer || [];
  function gtag(){dataLayer.push(arguments);}
  gtag('js', new Date());
  gtag('config', 'GA_MEASUREMENT_ID');
</script>
```

**Plausible (Privacy-friendly alternative):**
```html
<script defer data-domain="hampsteadarchitects.co.uk" src="https://plausible.io/js/script.js"></script>
```

## Need Help?

- Astro Docs: https://docs.astro.build
- Tailwind CSS: https://tailwindcss.com/docs
- GSAP Docs: https://greensock.com/docs

---

Built with care for Hampstead Architects.
Powered by Hampstead Renovations Group.
