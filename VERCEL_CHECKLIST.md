# Vercel Deployment Checklist

Use this checklist before and after deploying to Vercel.

## Pre-Deployment Checklist

### ✅ Code Quality
- [x] Project builds successfully (`npm run build` - 0 errors)
- [x] TypeScript strict mode enabled and passing
- [x] All pages render correctly (`/`, `/process`, `/heritage`, `/portfolio`, `/contact`)
- [x] No console errors in browser dev tools
- [x] Git repository initialized and code committed

### ✅ Configuration Files
- [x] `vercel.json` - Vercel-specific configuration
- [x] `.vercelignore` - Files to exclude from deployment
- [x] `astro.config.mjs` - Optimized for Vercel (code splitting, vendor chunks)
- [x] `.gitignore` - Prevents committing node_modules, dist, .env
- [x] `package.json` - All dependencies listed

### ✅ Content & Assets

**Required Before Going Live:**
- [ ] Add licensed web fonts to `/public/fonts/`
  - `SuisseIntl-Regular.woff2`
  - `SuisseIntl-Medium.woff2`
  - `EditorialNew-Thin.woff2`
  - `EditorialNew-Light.woff2`
- [ ] Add architectural photography to `/public/images/`
  - `hero-fallback.jpg`
  - `conservation.jpg`
  - `basement.jpg`
  - `sustainable.jpg`
  - `basement-engineering.jpg`
  - `frognal-restoration.jpg`
  - `garden-suburb.jpg`
  - Portfolio images in `/public/images/portfolio/`
- [ ] Optional: Add hero video `/public/videos/light-texture.mp4`

### ✅ Contact Information
- [ ] Update phone number in `Footer.astro`
- [ ] Update email address in `Footer.astro`
- [ ] Update contact details in `contact.astro`
- [ ] Update Schema.org data in `BaseLayout.astro`
  - Telephone
  - Email
  - Geographic coordinates (if you want precision)

### ✅ SEO Configuration
- [ ] Update `site` URL in `astro.config.mjs` when custom domain is ready
- [ ] Verify all page titles are unique and descriptive
- [ ] Verify all meta descriptions are compelling
- [ ] Check Open Graph images exist

## Deployment Steps

### 1. Push to Git Repository

```bash
# Check what will be committed
git status

# Add all files
git add .

# Commit with descriptive message
git commit -m "Initial deployment - Hampstead Architects platform"

# Push to your remote repository (GitHub/GitLab/Bitbucket)
git push origin main
```

### 2. Import to Vercel

**Via Dashboard:**
1. Go to [vercel.com/new](https://vercel.com/new)
2. Click "Import Git Repository"
3. Select your repository
4. Vercel auto-detects Astro framework ✅
5. Click "Deploy"
6. Wait ~2 minutes for first deployment

**Via CLI:**
```bash
npm install -g vercel
vercel login
vercel
# Follow prompts, select your account
vercel --prod
```

### 3. Verify Deployment

Visit your deployment URL (e.g., `https://hampstead-architects-abc123.vercel.app`)

## Post-Deployment Testing

### ✅ Visual Testing
- [ ] Homepage loads correctly
- [ ] All navigation links work
- [ ] Hero section displays properly
- [ ] Images load (or show placeholder layout)
- [ ] Fonts load correctly (or fallback fonts display)
- [ ] Colors match design spec

### ✅ Functionality Testing
- [ ] Navigation hamburger menu opens/closes
- [ ] Contact form wizard progresses through all 3 steps
- [ ] Form validation works
- [ ] Smooth scrolling is active
- [ ] Scroll animations trigger correctly
- [ ] Custom cursor appears and expands on hover (desktop)
- [ ] Logo pre-loader animates

### ✅ Mobile Testing
- [ ] Test on iOS Safari
- [ ] Test on Android Chrome
- [ ] Responsive layout works correctly
- [ ] Touch interactions work
- [ ] No horizontal scroll
- [ ] Forms are usable on mobile

### ✅ Performance Testing
- [ ] Run [PageSpeed Insights](https://pagespeed.web.dev/)
  - Target: 90+ Performance score
  - Target: 100 Accessibility score
  - Target: 100 Best Practices score
  - Target: 90+ SEO score
- [ ] Check [GTmetrix](https://gtmetrix.com/)
- [ ] Verify First Contentful Paint < 1.5s
- [ ] Verify Time to Interactive < 3s

### ✅ SEO Testing
- [ ] View page source - verify meta tags present
- [ ] Test Schema.org markup with [Rich Results Test](https://search.google.com/test/rich-results)
- [ ] Verify canonical URLs are correct
- [ ] Check robots.txt is accessible (Vercel generates automatically)

### ✅ Browser Compatibility
- [ ] Chrome (latest)
- [ ] Firefox (latest)
- [ ] Safari 14+ (macOS)
- [ ] Edge (latest)
- [ ] Safari iOS 14+

## Custom Domain Setup (When Ready)

### 1. Add Domain in Vercel
1. Go to project → **Settings** → **Domains**
2. Add `hampsteadarchitects.co.uk`
3. Add `www.hampsteadarchitects.co.uk`

### 2. Configure DNS Records

At your domain registrar (e.g., Namecheap, GoDaddy):

```
Type: A
Name: @
Value: 76.76.21.21
TTL: 3600

Type: CNAME
Name: www
Value: cname.vercel-dns.com
TTL: 3600
```

Wait 24-48 hours for DNS propagation (usually faster).

### 3. Update Astro Config

In `astro.config.mjs`:
```js
site: 'https://hampsteadarchitects.co.uk',
```

Commit and push - Vercel will auto-deploy.

### 4. Force HTTPS & Redirect WWW

Vercel handles this automatically:
- HTTP → HTTPS redirect ✅
- Bare domain → www (or vice versa) ✅

## Post-Launch Checklist

### ✅ Analytics & Monitoring
- [ ] Set up Vercel Analytics (free)
- [ ] Set up Vercel Speed Insights (optional)
- [ ] Configure Google Analytics or Plausible (optional)
- [ ] Set up Google Search Console
- [ ] Submit sitemap to Google: `https://hampsteadarchitects.co.uk/sitemap-index.xml`

### ✅ Social Media
- [ ] Test Open Graph preview with [Facebook Debugger](https://developers.facebook.com/tools/debug/)
- [ ] Test Twitter Card preview with [Twitter Card Validator](https://cards-dev.twitter.com/validator)
- [ ] Share test post on social media

### ✅ Forms & Functionality
- [ ] Test contact form submission
- [ ] Set up form backend (e.g., Formspree, Web3Forms, or custom endpoint)
- [ ] Configure email notifications for form submissions
- [ ] Test form spam protection

### ✅ Legal & Compliance
- [ ] Add Privacy Policy (if collecting user data)
- [ ] Add Terms of Service (if applicable)
- [ ] Ensure GDPR compliance (if applicable)
- [ ] Add Cookie Notice (if using analytics)

### ✅ Business Listings
- [ ] Update Google My Business with website URL
- [ ] Add to local business directories
- [ ] Update social media profiles with new website

## Ongoing Maintenance

### Regular Tasks
- **Weekly:** Check Vercel deployment status
- **Monthly:** Review analytics and performance metrics
- **Quarterly:** Update dependencies (`npm outdated`)
- **As Needed:** Add new portfolio projects

### Updating Content

To add new portfolio projects:
1. Add images to `/public/images/portfolio/`
2. Edit `src/pages/portfolio.astro`
3. Add new project object to `projects` array
4. Commit and push - Vercel auto-deploys

### Updating Copy

1. Edit relevant `.astro` files
2. Test locally: `npm run dev`
3. Build test: `npm run build`
4. Commit and push
5. Vercel auto-deploys in ~60 seconds

## Rollback Procedure

If a deployment has issues:

**Via Dashboard:**
1. Go to **Deployments** tab
2. Find last working deployment
3. Click "..." → "Promote to Production"

**Via CLI:**
```bash
vercel rollback
```

## Troubleshooting

### Build Fails on Vercel

**Check build logs:**
1. Go to failing deployment
2. Click "View Build Logs"
3. Look for errors

**Common fixes:**
- Ensure dependencies are in `package.json`, not `devDependencies`
- Check Node.js version compatibility
- Verify no missing environment variables

### 404 Errors

- Verify `output: 'static'` in `astro.config.mjs`
- Check file names match exactly (case-sensitive on Vercel)
- Ensure `dist` folder is being generated locally

### Slow Performance

- Enable Vercel Analytics to identify bottlenecks
- Compress images (use ImageOptim or similar)
- Consider lazy-loading images below the fold
- Check bundle size with `npm run build` output

## Support Resources

- [Vercel Astro Documentation](https://vercel.com/docs/frameworks/astro)
- [Astro Deployment Guide](https://docs.astro.build/en/guides/deploy/vercel/)
- [Vercel Community](https://github.com/vercel/vercel/discussions)
- [DEPLOYMENT.md](DEPLOYMENT.md) - Detailed deployment guide

---

## Quick Reference: Deploy Commands

```bash
# Local development
npm run dev

# Build for production
npm run build

# Preview production build
npm preview

# Deploy to Vercel (via CLI)
vercel

# Deploy to production
vercel --prod

# View deployments
vercel ls

# View logs
vercel logs [deployment-url]

# Rollback
vercel rollback
```

**Deployment URL Pattern:**
- Preview: `https://hampstead-architects-[branch]-[hash].vercel.app`
- Production: `https://hampsteadarchitects.vercel.app`
- Custom: `https://hampsteadarchitects.co.uk` (when configured)

---

**Status:** Ready for Vercel deployment ✅

Built with Astro. Optimized for Vercel. Designed for luxury.
