# AI Tools Hub v2.0 - Production Deployment Guide

**Last Updated:** January 24, 2026
**Status:** Ready for immediate deployment
**Build Status:** ✅ Passing (39 pages, 0 errors)
**Test Status:** ✅ 34/37 passing (3 need production keys)

---

## Table of Contents

1. [Pre-Deployment Checklist](#pre-deployment-checklist)
2. [Environment Variable Configuration](#environment-variable-configuration)
3. [Stripe Setup](#stripe-setup)
4. [Resend Email Configuration](#resend-email-configuration)
5. [Deployment Steps](#deployment-steps)
6. [Post-Launch Verification](#post-launch-verification)
7. [Monitoring & Support](#monitoring--support)
8. [Rollback Procedures](#rollback-procedures)

---

## Pre-Deployment Checklist

### Code Quality
- [x] Build passing with 0 errors
- [x] Tests passing (34/37, 100% critical path coverage)
- [x] TypeScript strict mode enabled
- [x] All dependencies up to date
- [x] No hardcoded secrets
- [x] All critical paths tested

### Content Verification
- [x] 18 guides live with proper metadata
- [x] 31 skills verified and linked
- [x] 3 courses with pricing configured
- [x] Contact form working with rate limiting
- [x] Workshop page live and accessible
- [x] Navigation updated with all new routes

### Security Review
- [x] Stripe webhook signature verification implemented
- [x] Rate limiting on contact form (5/hour IP, 3/day email)
- [x] Email retry logic with exponential backoff
- [x] XSS prevention in email templates
- [x] CSRF protection (Next.js built-in)
- [x] PII protection in logging

### Performance
- [x] 110 kB First Load JS (optimized)
- [x] 39 pages prerendered
- [x] Code splitting configured
- [x] Vercel Analytics integrated
- [x] Image optimization enabled

### Documentation
- [x] SPEC_COMPLIANCE.md created
- [x] PRE-LAUNCH-CHECKLIST.md complete
- [x] DEPLOYMENT-STATUS.md current
- [x] API documentation up to date

---

## Environment Variable Configuration

### Step 1: Gather Required Credentials

Before deploying to Vercel, you'll need:

#### Stripe Credentials (Get from Stripe Dashboard)
```
STRIPE_SECRET_KEY=sk_live_xxxxx
STRIPE_PUBLISHABLE_KEY=pk_live_xxxxx
STRIPE_WEBHOOK_SECRET=whsec_xxxxx
```

**How to get:**
1. Go to https://dashboard.stripe.com
2. Click "Developers" → "API keys"
3. Copy Secret key (starts with `sk_live_`)
4. Copy Publishable key (starts with `pk_live_`)

#### Stripe Price IDs (From Products page)
```
STRIPE_PRICE_CLAUDE_CODE_COURSE=price_xxxxx
STRIPE_PRICE_WORKFLOW_COURSE=price_xxxxx
STRIPE_PRICE_SKILLS_COURSE=price_xxxxx
```

**How to get:**
1. Go to https://dashboard.stripe.com → Products
2. For each product, open it and find the Price ID
3. Copy all three price IDs

#### Resend Email API Key
```
RESEND_API_KEY=re_xxxxx
```

**How to get:**
1. Go to https://resend.com
2. Navigate to "API Keys"
3. Create a new API key if needed
4. Copy the key

#### Email Configuration
```
FROM_EMAIL=hello@practicallibrary.com
ADMIN_EMAIL=ahsan@example.com
```

**Note:** Update `ADMIN_EMAIL` with your actual admin email for contact form notifications

### Step 2: Add to Vercel Dashboard

1. **Go to Vercel Dashboard:**
   - Navigate to https://vercel.com/dashboard
   - Click on "ai-tools-hub" project
   - Click "Settings" → "Environment Variables"

2. **Add Each Variable:**
   - For each environment variable below, click "Add"
   - Enter variable name
   - Enter variable value
   - Select "Production" as environment
   - Click "Save"

3. **Required Variables (Production):**

```env
# Stripe (Production Keys - Live Mode)
STRIPE_SECRET_KEY=sk_live_xxxxx
STRIPE_PUBLISHABLE_KEY=pk_live_xxxxx
STRIPE_WEBHOOK_SECRET=whsec_xxxxx
STRIPE_PRICE_CLAUDE_CODE_COURSE=price_xxxxx
STRIPE_PRICE_WORKFLOW_COURSE=price_xxxxx
STRIPE_PRICE_SKILLS_COURSE=price_xxxxx

# Email
RESEND_API_KEY=re_xxxxx
FROM_EMAIL=hello@practicallibrary.com
ADMIN_EMAIL=ahsan@example.com
```

### Step 3: Verify Environment Variables

After adding all variables in Vercel:
1. Click "Deployments"
2. Select the latest deployment
3. Click the deployment log
4. Scroll to "Environment" section
5. Verify all variables are listed (values will be masked for security)

---

## Stripe Setup

### Step 1: Configure Webhook Endpoint

Stripe needs to send payment confirmation events to your webhook handler.

1. **Get Your Webhook Endpoint URL:**
   ```
   https://your-domain.com/api/webhook
   ```
   (Replace `your-domain.com` with your actual domain)

2. **Add Webhook Endpoint to Stripe:**
   - Go to https://dashboard.stripe.com/webhooks
   - Click "Add endpoint"
   - Paste your webhook URL
   - Select events to send:
     - `checkout.session.completed`
     - `charge.refunded`
     - `payment_intent.payment_failed`
   - Click "Add endpoint"

3. **Copy Webhook Signing Secret:**
   - From the webhook endpoint detail page
   - Copy the "Signing secret" (starts with `whsec_`)
   - Add to Vercel as `STRIPE_WEBHOOK_SECRET`

### Step 2: Create Products (if not already created)

If you haven't created products in Stripe yet:

1. **Go to https://dashboard.stripe.com/products**
2. **Click "Add product"** for each course:

**Product 1: Claude Code Essentials**
- Name: Claude Code Essentials
- Price: $67
- Copy Price ID (e.g., `price_1ABC...`)
- Add to env var: `STRIPE_PRICE_CLAUDE_CODE_COURSE`

**Product 2: AI Workflow Builder**
- Name: AI Workflow Builder
- Price: $97
- Copy Price ID
- Add to env var: `STRIPE_PRICE_WORKFLOW_COURSE`

**Product 3: Claude Skills Mastery**
- Name: Claude Skills Mastery
- Price: $47
- Copy Price ID
- Add to env var: `STRIPE_PRICE_SKILLS_COURSE`

### Step 3: Test Webhook in Development

Before deploying, test webhooks locally (optional but recommended):

```bash
# Install Stripe CLI
# https://stripe.com/docs/stripe-cli

# Forward webhooks to local server
stripe listen --forward-to localhost:3000/api/webhook

# Run your app
npm run dev

# In another terminal, trigger a test webhook
stripe trigger charge.refunded
```

---

## Resend Email Configuration

### Step 1: Verify Domain (if using custom domain)

1. **Go to https://resend.com/domains**
2. **Add your domain:**
   - Click "Add Domain"
   - Enter your domain (e.g., `practicallibrary.com`)
   - Follow DNS verification instructions
   - Wait for domain verification (usually 5-30 minutes)

### Step 2: Create Sending Address

1. **Go to https://resend.com/emails**
2. **Create sending address:**
   - From address: `hello@practicallibrary.com`
   - (Or use `noreply@practicallibrary.com`)

### Step 3: Test Email Delivery

1. **Go to your contact form:** https://your-domain.com/contact
2. **Submit test form:**
   - Name: Test User
   - Email: your-email@gmail.com
   - Type: Feedback
   - Message: Test message
3. **Verify:**
   - Check your email inbox
   - Should receive auto-reply from `FROM_EMAIL`
   - Check `ADMIN_EMAIL` for admin notification

---

## Deployment Steps

### Option 1: Automatic Deployment (Recommended)

Vercel auto-deploys from main branch whenever code is pushed.

1. **Ensure all changes are committed:**
   ```bash
   git status
   # Should show: "nothing to commit, working tree clean"
   ```

2. **Verify latest commit is on main:**
   ```bash
   git log -1 --oneline
   # Should show: "docs: add spec compliance documentation..."
   ```

3. **Push to origin (if not already pushed):**
   ```bash
   git push origin main
   ```

4. **Vercel will automatically:**
   - Clone your repository
   - Install dependencies
   - Run build: `npm run build`
   - Deploy to production
   - Generate preview URL

5. **Monitor deployment in Vercel Dashboard:**
   - https://vercel.com/dashboard → ai-tools-hub
   - Click "Deployments" tab
   - Watch status change to "Ready"

### Option 2: Manual Deployment via Vercel CLI

```bash
# Install Vercel CLI
npm i -g vercel

# Deploy
vercel --prod

# Vercel will prompt for:
# - Project confirmation
# - Build settings confirmation
# - Environment variables confirmation

# Once complete, you'll get deployment URL
```

### Step 3: Verify Deployment

After deployment completes:

1. **Visit your site:**
   ```
   https://practicallibrary.com
   # or your custom domain
   ```

2. **Check key pages load:**
   - Homepage: `/`
   - Guides: `/guides`
   - Courses: `/courses`
   - Skills: `/skills`
   - Contact: `/contact`
   - Pricing: `/pricing`
   - Workshops: `/workshops`

3. **Verify Stripe integration:**
   - Visit `/courses`
   - Click "Enroll Now" button
   - Should redirect to Stripe Checkout (test mode)

---

## Post-Launch Verification

### Immediate (Within 1 Hour)

- [ ] Site loads without errors
- [ ] All pages accessible
- [ ] Navigation working
- [ ] Images loading correctly
- [ ] Forms submitting

### Payment Flow Testing

1. **Test Checkout:**
   - Click "Enroll Now" on a course
   - Use Stripe test card: `4242 4242 4242 4242`
   - Expiry: Any future date (e.g., 12/25)
   - CVC: Any 3 digits (e.g., 123)
   - Click "Pay"

2. **Verify Webhook Received:**
   - Check Stripe dashboard → Events
   - Should see `checkout.session.completed` event
   - Should show "Processed" status

3. **Verify Confirmation Email:**
   - Check email inbox
   - Should receive confirmation from `FROM_EMAIL`
   - Contains purchase details

### Contact Form Testing

1. **Submit Contact Form:**
   - Go to `/contact`
   - Fill in all fields
   - Click Submit

2. **Verify Emails:**
   - Check your email (FROM_EMAIL inbox)
   - Should receive auto-reply to user
   - Check ADMIN_EMAIL inbox
   - Should receive notification with form data

### Analytics Verification

1. **Check Vercel Analytics:**
   - Go to https://vercel.com/dashboard → Deployments
   - Click Analytics tab
   - Should show live pageview data
   - Refresh page a few times to see data update

### Monitoring Checklist

- [ ] Build successful (check Vercel Deployments)
- [ ] No errors in Function logs (Vercel → Deployments → Logs)
- [ ] Stripe webhook receiving events
- [ ] Emails sending/receiving successfully
- [ ] Analytics tracking pageviews
- [ ] All pages responsive on mobile

---

## Monitoring & Support

### Daily Monitoring (First Week)

1. **Vercel Dashboard:**
   - Check for deployment errors
   - Monitor build times
   - Check for function timeouts

2. **Stripe Dashboard:**
   - Review webhook deliveries
   - Check for failed charges
   - Monitor API usage

3. **Email Status:**
   - Monitor email delivery rates
   - Check for bounces in Resend
   - Review unsubscribe requests

### Weekly Monitoring

1. **Analytics Review:**
   - Check traffic trends
   - Identify popular pages
   - Track conversion metrics

2. **Error Tracking:**
   - Review error logs in Vercel
   - Check for failed API calls
   - Monitor payment failures

3. **Performance:**
   - Check Lighthouse scores
   - Monitor Core Web Vitals
   - Review slow page loads

### Critical Alerts (Set Up in Vercel)

1. **Go to Vercel Dashboard → Project Settings → Integrations**
2. **Enable notifications for:**
   - Deployment failures
   - Function errors
   - High memory usage

---

## Rollback Procedures

### If Issues Occur After Deployment

#### Rollback to Previous Version

1. **Go to Vercel Dashboard:**
   - Click "Deployments"
   - Find the previous successful deployment
   - Click "..." menu
   - Select "Promote to Production"

2. **Verify Rollback:**
   - Wait for deployment to complete
   - Verify site works
   - Check that previous version is active

#### Rollback via Git

1. **Revert to previous commit:**
   ```bash
   git log --oneline
   # Find the previous working commit

   git revert <commit-hash>
   # Creates a new commit that undoes the bad one

   git push origin main
   # Vercel will auto-deploy the revert
   ```

#### Critical Issues Requiring Immediate Action

**If site is down or payment processing is broken:**

1. **Disable Stripe webhook temporarily:**
   - Go to Stripe Dashboard → Webhooks
   - Click the webhook
   - Click "Disable" to pause event delivery
   - Prevents duplicate charges while you fix

2. **Check error logs:**
   - Vercel Dashboard → Deployments → Logs
   - Stripe Dashboard → Logs
   - Resend Dashboard → Activity

3. **Contact Support:**
   - Vercel: support@vercel.com
   - Stripe: support@stripe.com
   - Resend: support@resend.com

---

## Monitoring Checklist Template

Use this template for daily monitoring:

```markdown
## Daily Monitoring - [DATE]

### Build Status
- [ ] Latest deployment successful
- [ ] Build time < 5 minutes
- [ ] No TypeScript errors

### Traffic & Performance
- [ ] Site loading (< 3s homepage)
- [ ] Analytics tracking data
- [ ] No 404 errors from navigation

### Payment System
- [ ] Test checkout works
- [ ] Webhook deliveries successful
- [ ] No failed charges

### Email System
- [ ] Contact form emails sending
- [ ] No email bounces
- [ ] Resend API status OK

### Errors & Logs
- [ ] No critical errors in logs
- [ ] Function timeouts < 5
- [ ] Memory usage normal

### Alerts
- [ ] No high-priority alerts
- [ ] All monitored metrics in range
- [ ] Stripe API status operational
```

---

## Post-Launch Improvements (Non-Critical)

These can be done after successful launch:

1. **Add more guides** - Currently 18, can add more
2. **Create additional courses** - Currently 3, can add more
3. **Upgrade analytics** - Switch from Vercel to Plausible for detailed insights
4. **Add testimonials** - If you want social proof
5. **Implement A/B testing** - Test different CTAs and pricing
6. **Create email newsletter** - Capture leads for future campaigns

---

## Emergency Contacts

| Service | Support | Status Page |
|---------|---------|------------|
| Vercel | support@vercel.com | https://www.vercel-status.com/ |
| Stripe | support@stripe.com | https://status.stripe.com/ |
| Resend | support@resend.com | https://status.resend.com/ |

---

## Success Metrics (Track Over Time)

### Week 1
- Site stability (uptime > 99%)
- Payment processing (0 failed transactions)
- Email delivery (> 95% success rate)
- Page load time (< 3s homepage)

### Month 1
- Unique visitors: [target number]
- Conversion rate: [target percentage]
- Course purchases: [target number]
- Contact form submissions: [target number]

### Ongoing
- Mobile vs Desktop traffic split
- Most popular guides
- Most popular courses
- Most popular skills

---

## Deployment Summary

| Component | Status | Action |
|-----------|--------|--------|
| Code | ✅ Ready | Already pushed to main |
| Build | ✅ Passing | 0 errors, 39 pages |
| Tests | ✅ Passing | 34/37 (prod keys needed) |
| Documentation | ✅ Complete | All guides in `/docs` |
| Environment | ⏳ Pending | Add variables in Vercel (30 min) |
| Stripe | ⏳ Pending | Configure webhook + products (15 min) |
| Resend | ⏳ Pending | Verify domain + create address (15 min) |
| **READY FOR DEPLOYMENT** | ✅ | **Estimated time: 1 hour** |

---

## Questions?

Refer to:
- **General setup:** `/PRE-LAUNCH-CHECKLIST.md`
- **Spec compliance:** `/docs/SPEC_COMPLIANCE.md`
- **Build status:** `/DEPLOYMENT-STATUS.md`
- **Phase completion:** `/PHASE-COMPLETION-SUMMARY.md`

**For deployment issues:**
1. Check Vercel Deployments logs
2. Review Stripe webhook deliveries
3. Check Resend email activity
4. Review error logs for specific error messages
5. Contact service support with error details

---

**Ready to deploy? Start with "Environment Variable Configuration" section above.**
