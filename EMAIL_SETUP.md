# Email Auto-Responder Setup Guide

This document explains how to configure the white glove email auto-responder system for the Project Inquiry Wizard.

## Overview

When a client completes the 5-step inquiry wizard, the system:
1. Sends a personalized "Case Opened" email to the client
2. Sends a detailed notification to your team
3. Redirects the client to a personalized success page

## Setup Instructions

### 1. Create a Resend Account

1. Go to [resend.com](https://resend.com)
2. Sign up for a free account (100 emails/day on free tier)
3. Verify your email address

### 2. Add Your Domain

1. In Resend dashboard, go to **Domains**
2. Click **Add Domain**
3. Enter your domain: `hampsteadarchitects.com`
4. Add the DNS records to your domain provider:
   - **SPF Record** (TXT)
   - **DKIM Record** (TXT)
   - **Custom Return-Path** (CNAME)
5. Wait for verification (can take up to 48 hours)

**Note:** Until domain is verified, you can use `onboarding@resend.dev` for testing, but emails will only send to your verified email address.

### 3. Get Your API Key

1. In Resend dashboard, go to **API Keys**
2. Click **Create API Key**
3. Name it: `Hampstead Architects Production`
4. Copy the API key (starts with `re_...`)

### 4. Configure Vercel Environment Variables

1. Go to your Vercel project dashboard
2. Navigate to **Settings** → **Environment Variables**
3. Add a new variable:
   - **Key:** `RESEND_API_KEY`
   - **Value:** Your Resend API key (e.g., `re_abc123...`)
   - **Environment:** Production, Preview, Development (select all)
4. Click **Save**

### 5. Deploy Your Changes

Once the environment variable is set, deploy your site:

```bash
git push origin main
```

Vercel will automatically redeploy with the new configuration.

### 6. Test the Email Flow

#### Option A: Test in Production
1. Go to your live site: `https://hampsteadarchitects.vercel.app/contact`
2. Complete the wizard with real information
3. Check your email inbox (both client and team emails)

#### Option B: Test Locally
1. Create a `.env` file in the project root:
   ```bash
   RESEND_API_KEY=re_your_api_key_here
   ```
2. Run the development server:
   ```bash
   npm run dev
   ```
3. Navigate to `http://localhost:4321/contact`
4. Complete the wizard
5. Check your emails

## Email Templates

### Client Email ("White Glove Acknowledgment")

**Subject:** `Receipt of Brief: [Project Type] at [Postcode]`

**From:** `The Studio at Palace Court <studio@hampsteadarchitects.com>`

**Reply-To:** `private-clients@hampsteadarchitects.com`

This email:
- Uses the client's name and project details
- References their specific postcode
- Mentions conservation area status if applicable
- Outlines the next 3 steps in the process
- Positions the response as "case file opened" not "support ticket"

### Team Email (Internal Notification)

**Subject:** `🏗️ New Inquiry: [Project Type] at [Postcode]`

**To:** `private-clients@hampsteadarchitects.com`

This email includes:
- Complete client contact information
- All project details from the wizard
- Property information and constraints
- Highlighted action items for conservation areas/leaseholds
- Next steps checklist

## Customizing Email Templates

Email templates are defined in:
```
src/pages/api/submit-inquiry.ts
```

To customize:
1. Edit the HTML in the `html` property of `resend.emails.send()`
2. Also update the `text` property (plain text version)
3. Test thoroughly before deploying

## Email Addresses Configuration

Update these email addresses in the API endpoint:

**From Address (Client Email):**
```typescript
from: 'The Studio at Palace Court <studio@hampsteadarchitects.com>'
```

**Reply-To Address:**
```typescript
replyTo: 'private-clients@hampsteadarchitects.com'
```

**Team Notification Address:**
```typescript
to: ['private-clients@hampsteadarchitects.com']
```

**Note:** All sender addresses must be on your verified domain.

## Troubleshooting

### Emails Not Sending

1. **Check API Key:**
   - Verify the `RESEND_API_KEY` environment variable is set in Vercel
   - Ensure the key hasn't been revoked in Resend dashboard

2. **Check Domain Verification:**
   - Go to Resend → Domains
   - Ensure your domain shows "Verified" status
   - Check DNS records are properly configured

3. **Check Resend Logs:**
   - Go to Resend dashboard → Emails
   - View delivery status and error messages
   - Look for bounces or failures

4. **Test with Curl:**
   ```bash
   curl -X POST https://hampsteadarchitects.vercel.app/api/submit-inquiry \
     -H "Content-Type: application/json" \
     -d '{
       "projectType": "renovation",
       "planningStatus": "concept",
       "budget": "500-1000",
       "postcode": "NW3 6DN",
       "conservationArea": "Yes",
       "freeholdStatus": "freehold",
       "name": "Test Client",
       "email": "your-email@example.com",
       "phone": "020 7123 4567",
       "consultationMethod": "At Palace Court"
     }'
   ```

### Emails Going to Spam

1. Add DMARC record to your DNS:
   ```
   _dmarc.hampsteadarchitects.com TXT "v=DMARC1; p=none; rua=mailto:dmarc@hampsteadarchitects.com"
   ```

2. Warm up your domain (gradually increase sending volume)

3. Encourage recipients to add you to contacts

### Rate Limits

**Free Tier:** 100 emails/day, 3,000/month

**Pro Tier:** $20/month for 50,000 emails

If you exceed limits, upgrade your Resend plan.

## Security Best Practices

1. **Never commit `.env` file** - It's in `.gitignore`
2. **Rotate API keys** if exposed
3. **Use environment-specific keys** for development vs production
4. **Monitor Resend dashboard** for suspicious activity
5. **Validate all input** before sending (already implemented)

## Monitoring

### Check Email Delivery

1. Go to Resend dashboard
2. Click **Emails**
3. View real-time delivery status
4. Check open rates and click rates

### Set Up Webhooks (Optional)

1. Go to Resend → Webhooks
2. Add webhook endpoint (e.g., `/api/webhook/email-events`)
3. Track: delivered, opened, clicked, bounced, complained

## Cost Estimates

### Resend Pricing

- **Free:** 100 emails/day (3,000/month) - Good for starting out
- **Pro:** $20/month for 50,000 emails - Good for 1-2 inquiries per day
- **Business:** Custom pricing for higher volumes

### Expected Volume

Assuming **2-3 inquiries per day:**
- Client emails: 2-3/day × 30 days = 60-90/month
- Team emails: 2-3/day × 30 days = 60-90/month
- **Total:** 120-180 emails/month

**Recommendation:** Start with free tier, upgrade to Pro ($20/month) if needed.

## Support

### Resend Support
- Documentation: [resend.com/docs](https://resend.com/docs)
- Email: support@resend.com

### This Project
- Check API logs in Vercel dashboard
- Review `src/pages/api/submit-inquiry.ts` for email logic
- Test locally with `.env` file before deploying
