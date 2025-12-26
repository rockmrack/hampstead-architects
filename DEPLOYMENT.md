# Vercel Deployment Guide

## Prerequisites

1. [Vercel Account](https://vercel.com/signup) (free tier works great)
2. Git repository (GitHub, GitLab, or Bitbucket)
3. This project pushed to your git repository

## Quick Deploy to Vercel

### Option 1: Deploy via Vercel Dashboard (Recommended)

1. **Push to Git**
   ```bash
   git add .
   git commit -m "Initial commit - Hampstead Architects platform"
   git push origin main
   ```

2. **Import to Vercel**
   - Go to [vercel.com/new](https://vercel.com/new)
   - Click "Import Git Repository"
   - Select your repository
   - Vercel will auto-detect Astro framework ✅

3. **Configure Project**
   - **Framework Preset**: Astro (auto-detected)
   - **Build Command**: `npm run build` (auto-detected)
   - **Output Directory**: `dist` (auto-detected)
   - **Install Command**: `npm install` (auto-detected)

4. **Deploy**
   - Click "Deploy"
   - Wait 1-2 minutes
   - Your site will be live at `https://hampstead-architects.vercel.app`

### Option 2: Deploy via Vercel CLI

```bash
# Install Vercel CLI globally
npm install -g vercel

# Login to Vercel
vercel login

# Deploy (from project root)
vercel

# Follow prompts:
# - Set up and deploy? Yes
# - Which scope? Select your account
# - Link to existing project? No
# - Project name? hampstead-architects
# - Directory? ./ (press enter)
# - Override settings? No

# For production deployment
vercel --prod
```

## Custom Domain Setup

### 1. Add Custom Domain in Vercel

1. Go to your project in Vercel dashboard
2. Navigate to **Settings** → **Domains**
3. Add `hampsteadarchitects.co.uk`
4. Add `www.hampsteadarchitects.co.uk`

### 2. Configure DNS

Add these records to your domain registrar:

**For root domain (hampsteadarchitects.co.uk):**
```
Type: A
Name: @
Value: 76.76.21.21
```

**For www subdomain:**
```
Type: CNAME
Name: www
Value: cname.vercel-dns.com
```

**Recommended: Add these DNS records for better performance:**
```
Type: A
Name: @
Value: 76.76.21.21

Type: AAAA
Name: @
Value: 2606:4700:10::ac43:1515

Type: CNAME
Name: www
Value: cname.vercel-dns.com
```

### 3. Update Astro Config

Once your custom domain is configured, update [astro.config.mjs](astro.config.mjs):

```js
site: 'https://hampsteadarchitects.co.uk',
```

Commit and push this change - Vercel will auto-deploy.

## Environment Variables (Optional)

If you need to add environment variables (API keys, etc.):

1. Go to **Settings** → **Environment Variables**
2. Add variables:
   - `PUBLIC_SITE_URL` = `https://hampsteadarchitects.co.uk`
   - `CONTACT_FORM_ENDPOINT` = (if using a form service)
   - `GA_MEASUREMENT_ID` = (if using Google Analytics)

## Vercel Configuration Explained

### vercel.json

Our configuration includes:

- **Regions**: `lhr1` (London) for optimal UK performance
- **Cache Headers**:
  - Static assets (fonts, images): 1 year cache
  - HTML pages: No cache (always fresh)
  - JavaScript bundles: 1 year cache with immutable flag

### Automatic Features

Vercel automatically provides:

- ✅ **Global CDN** - Lightning-fast worldwide
- ✅ **SSL Certificate** - Free HTTPS with auto-renewal
- ✅ **Preview Deployments** - Every git push gets a unique URL
- ✅ **Edge Network** - Served from 70+ locations globally
- ✅ **Automatic Gzip/Brotli** - Compressed responses
- ✅ **Image Optimization** - (if you use next/image)

## Deployment Workflow

### Automatic Deployments

Every push to `main` branch triggers a production deployment:

```bash
git add .
git commit -m "Update homepage copy"
git push origin main
# Vercel automatically deploys in ~60 seconds
```

### Preview Deployments

Every pull request gets a unique preview URL:

```bash
git checkout -b feature/new-project
# Make changes
git add .
git commit -m "Add new portfolio project"
git push origin feature/new-project
# Create PR on GitHub
# Vercel comments with preview URL
```

## Performance Optimization

### Build Analytics

Enable Vercel Analytics (free):

1. Go to **Analytics** tab in your project
2. Click "Enable Analytics"
3. Add this to your BaseLayout.astro `<head>`:

```astro
{import.meta.env.PROD && (
  <script defer src="/_vercel/insights/script.js"></script>
)}
```

### Speed Insights

Enable Vercel Speed Insights (free):

```bash
npm install @vercel/speed-insights
```

Add to [BaseLayout.astro](src/layouts/BaseLayout.astro):

```astro
---
import { SpeedInsights } from '@vercel/speed-insights/astro';
---

<html>
  <body>
    <!-- Your content -->
    <SpeedInsights />
  </body>
</html>
```

## Troubleshooting

### Build Fails

**Check build logs:**
- Go to **Deployments** tab
- Click failed deployment
- View build logs

**Common issues:**
- Missing dependencies: Ensure `package.json` is committed
- TypeScript errors: Run `npm run build` locally first
- Environment variables: Check they're set in Vercel dashboard

### 404 Errors

Vercel should automatically handle Astro routing. If you get 404s:

1. Ensure `output: 'static'` in astro.config.mjs
2. Check that `dist` folder is being generated
3. Verify Vercel is reading from `dist` directory

### Fonts Not Loading

If custom fonts fail to load:

1. Ensure font files are in `/public/fonts/`
2. Check CORS headers (already configured in vercel.json)
3. Verify font paths in global.css are correct

### Images Not Appearing

1. Ensure images are in `/public/images/`
2. Check file names match exactly (case-sensitive)
3. Verify image paths in .astro files

## Monitoring

### View Deployment Status

```bash
# Via CLI
vercel ls

# View logs
vercel logs [deployment-url]
```

### Analytics Dashboard

- Visit your project dashboard
- Check **Analytics** tab for:
  - Page views
  - Top pages
  - Visitor locations
  - Device types

## Rollback

If a deployment has issues:

1. Go to **Deployments** tab
2. Find previous working deployment
3. Click "..." menu → "Promote to Production"

Or via CLI:
```bash
vercel rollback
```

## Budget & Limits

### Free Tier Limits (Hobby)
- ✅ 100 GB bandwidth/month
- ✅ Unlimited static deployments
- ✅ Unlimited preview deployments
- ✅ 6,000 build minutes/month
- ✅ 100 GB-hours serverless execution

This is more than enough for this static Astro site.

### Upgrade Considerations

Only upgrade to Pro ($20/month) if you need:
- Custom deployment protection
- Advanced analytics
- Priority support
- Team collaboration features

## Post-Deployment Checklist

After first deployment:

- [ ] Test all pages work (`/`, `/process`, `/heritage`, `/portfolio`, `/contact`)
- [ ] Verify custom cursor works
- [ ] Test smooth scrolling
- [ ] Check mobile responsiveness
- [ ] Test contact form (wizard steps)
- [ ] Verify all animations load
- [ ] Test navigation menu
- [ ] Check SEO meta tags (view source)
- [ ] Verify Schema.org markup (Google Rich Results Test)
- [ ] Test on multiple browsers
- [ ] Check Google PageSpeed Insights score
- [ ] Submit sitemap to Google Search Console
- [ ] Set up monitoring/analytics

## Continuous Deployment

Your workflow is now:

1. Make changes locally
2. Test with `npm run dev`
3. Build locally with `npm run build` to check for errors
4. Commit and push to git
5. Vercel auto-deploys
6. Preview at your Vercel URL
7. Promote to production domain

## Support

- [Vercel Docs](https://vercel.com/docs)
- [Astro + Vercel Guide](https://docs.astro.build/en/guides/deploy/vercel/)
- [Vercel Community](https://github.com/vercel/vercel/discussions)

---

**Your site will be live at:**
- Development: `https://hampstead-architects-[hash].vercel.app`
- Production: `https://hampsteadarchitects.vercel.app`
- Custom Domain: `https://hampsteadarchitects.co.uk` (once configured)

Built with Astro. Deployed with Vercel. Powered by Hampstead Renovations Group.
