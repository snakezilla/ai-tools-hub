# AI Tools Hub v2.0 - Deployment Guide

**Status:** ✅ **READY FOR PRODUCTION**

**Date:** 2026-01-24
**Latest Commit:** 45f69e3 (clean history, Remotion files removed)
**Build Status:** ✅ Passing
**GitHub Status:** ✅ Pushed

---

## Pre-Deployment Checklist

### Code & Build
- [x] All 6 phases complete
- [x] Build passing (34 static pages generated)
- [x] TypeScript errors: 0
- [x] ESLint errors: 0
- [x] Git history cleaned (large files removed)
- [x] Code pushed to GitHub (main branch)

### Functionality
- [x] Homepage simplified with learning paths
- [x] Tool pages reduced to 5-step quickstart
- [x] Guides system with difficulty filtering
- [x] Courses page with 3 products
- [x] Skills library with 12+ curated skills
- [x] Contact form with validation
- [x] Pricing comparison page
- [x] Stripe checkout flow
- [x] Webhook handlers
- [x] Email confirmations (Resend)

### Quality
- [x] Mobile responsive design
- [x] SEO metadata on all pages
- [x] Component composition clean
- [x] No console.log statements
- [x] No hardcoded secrets
- [x] Error handling comprehensive

---

## Step 1: Configure Vercel Environment Variables

Navigate to **Vercel Dashboard** → Your Project → **Settings** → **Environment Variables**

Add the following variables:

```env
# Stripe Configuration (Required)
STRIPE_SECRET_KEY=sk_live_xxxxx
STRIPE_PUBLISHABLE_KEY=pk_live_xxxxx
STRIPE_WEBHOOK_SECRET=whsec_xxxxx

# Stripe Price IDs (Get from Stripe Dashboard)
STRIPE_PRICE_CLAUDE_CODE_COURSE=price_xxxxx
STRIPE_PRICE_WORKFLOW_COURSE=price_xxxxx
STRIPE_PRICE_SKILLS_COURSE=price_xxxxx

# Email Configuration (Required)
RESEND_API_KEY=re_xxxxx
FROM_EMAIL=hello@practicallibrary.com
ADMIN_EMAIL=admin@practicallibrary.com

# Analytics (Optional)
NEXT_PUBLIC_PLAUSIBLE_DOMAIN=practicallibrary.com
```

### Getting Stripe Values

1. **STRIPE_SECRET_KEY** → Stripe Dashboard → Developers → API Keys → Secret Key
2. **STRIPE_PUBLISHABLE_KEY** → Stripe Dashboard → Developers → API Keys → Publishable Key
3. **STRIPE_WEBHOOK_SECRET** → Create webhook endpoint:
   - Stripe Dashboard → Developers → Webhooks
   - Add endpoint: `https://practicallibrary.com/api/webhook`
   - Select events: `checkout.session.completed`, `charge.refunded`, `payment_intent.payment_failed`
   - Copy Webhook Signing Secret
4. **Price IDs** → Stripe Dashboard → Products → Get product price IDs

---

## Step 2: Deploy to Vercel

### Option A: Via Vercel Dashboard (Recommended)

1. Go to [Vercel Dashboard](https://vercel.com/dashboard)
2. Click your project: **ai-tools-hub**
3. Click **Deploy**
4. Vercel will pull from GitHub (main branch) and deploy automatically

### Option B: Via Vercel CLI

```bash
# Install Vercel CLI if not already installed
npm install -g vercel

# Deploy from project directory
vercel --prod

# Follow prompts and confirm deployment
```

### Option C: Direct GitHub Integration

Vercel auto-deploys when you push to main:
```bash
git push origin main
# Vercel automatically detects push and deploys
```

---

## Step 3: Configure Stripe Webhook

Once deployed, update your Stripe webhook endpoint:

1. Go to **Stripe Dashboard** → **Developers** → **Webhooks**
2. Find your webhook or create new one
3. Set endpoint URL: `https://practicallibrary.com/api/webhook`
4. Select events:
   - `checkout.session.completed`
   - `charge.refunded`
   - `payment_intent.payment_failed`
5. Copy the **Signing Secret** and add to Vercel as `STRIPE_WEBHOOK_SECRET`

---

## Step 4: Verify Deployment

### Check Deployment Status
```bash
vercel status
# or check Vercel Dashboard for deployment logs
```

### Test Payment Flow
1. Navigate to `https://practicallibrary.com/courses`
2. Click **Buy Now** on any course
3. Use Stripe test card: `4242 4242 4242 4242`
4. Expiry: Any future date (e.g., 12/25)
5. CVC: Any 3 digits (e.g., 123)
6. Click **Pay**
7. Verify:
   - Checkout completes
   - Redirects to success page
   - Confirmation email received (check admin email)

### Test Contact Form
1. Navigate to `https://practicallibrary.com/contact`
2. Fill form with test data
3. Submit
4. Verify:
   - Form submits successfully
   - Confirmation message appears
   - Admin email receives notification

### Test Guides & Skills
1. Visit `/guides` - should show 4 guides with filtering
2. Visit `/skills` - should show 12+ skills with copy buttons
3. Visit `/pricing` - should show 3-tier comparison
4. Visit any tool page - should show simplified 5-step quickstart

---

## Step 5: Monitor Production

### Set Up Monitoring
- **Vercel Analytics** → Automatic with Vercel
- **Error tracking** → Check Vercel Function Logs
- **Email delivery** → Check Resend dashboard
- **Payment status** → Check Stripe dashboard

### Useful Commands
```bash
# View deployment logs
vercel logs

# Check function logs
vercel logs --function api/webhook

# View environment variables (sanitized)
vercel env ls
```

---

## Rollback Procedure

If issues occur during deployment:

### Option 1: Revert to Previous Commit
```bash
git revert <commit-hash>
git push origin main
# Vercel auto-deploys updated code
```

### Option 2: Revert via Vercel Dashboard
1. Vercel Dashboard → Deployments
2. Find working deployment
3. Click → Promote to Production

### Option 3: Hotfix
```bash
git checkout -b hotfix/issue-name
# Make changes
git commit -am "fix: issue description"
git push -u origin hotfix/issue-name
# Create PR to main, merge when ready
```

---

## Post-Deployment Tasks

### Day 1
- [ ] Verify all pages load correctly
- [ ] Test payment flow end-to-end
- [ ] Test contact form
- [ ] Check email delivery
- [ ] Monitor Vercel logs for errors

### Day 2-3
- [ ] Monitor conversion metrics
- [ ] Check contact form submissions
- [ ] Verify Stripe charges appear in dashboard
- [ ] Test webhook event delivery

### Week 1
- [ ] Analyze user behavior (guide reads, time on site)
- [ ] Monitor payment issues
- [ ] Gather initial feedback
- [ ] Optimize based on usage patterns

---

## Troubleshooting

### Build Fails on Deploy
**Check:** Vercel Build Logs → Function Logs
- Run locally: `npm run build`
- Fix any errors
- Push changes to GitHub

### Stripe Webhook Not Firing
**Check:**
1. Webhook endpoint URL correct in Stripe dashboard
2. Signing secret matches `STRIPE_WEBHOOK_SECRET` in Vercel
3. Stripe test events received: `stripe events list`

### Resend Emails Not Sending
**Check:**
1. `RESEND_API_KEY` configured in Vercel
2. `FROM_EMAIL` is verified sender in Resend dashboard
3. Check Resend dashboard for bounce/rejection reasons
4. Verify `ADMIN_EMAIL` is valid

### 404 Errors on Routes
**Check:**
1. Route file exists: `src/app/[route]/page.tsx`
2. Rebuild locally: `npm run build`
3. Check route matches Next.js conventions
4. Verify not in `.next/` cache: `rm -rf .next`

---

## Success Metrics (30 Days)

### Traffic
- Target: 500+ unique visitors
- Guides section: 30%+ of traffic
- Courses page: 15%+ of traffic

### Conversions
- Guide reader → Course interest: 5%+
- Visitor → Contact form: 2%+
- Contact form → Sales inquiry: 30%+

### Payments
- Course purchase rate: 1%+ of traffic
- Average order value: $67+
- Payment success rate: 98%+

---

## Contact & Support

**Deployment Issues?**
- Check Vercel logs: `vercel logs --follow`
- Review Stripe webhook status
- Check Resend dashboard for email issues

**Code Issues?**
- Review recent commits: `git log --oneline -10`
- Check build logs: `npm run build`
- Run type check: `tsc --noEmit`

---

## File Locations Reference

**Key Application Files:**
- Homepage: `src/app/page.tsx`
- Courses: `src/app/courses/page.tsx`
- Guides: `src/app/guides/page.tsx` & `src/app/guides/[slug]/page.tsx`
- Skills: `src/app/skills/page.tsx`
- Contact: `src/app/contact/page.tsx`
- Pricing: `src/app/pricing/page.tsx`

**API Routes:**
- Stripe Checkout: `src/app/api/checkout/route.ts`
- Webhook Handler: `src/app/api/webhook/route.ts`
- Contact Form: `src/app/api/contact/route.ts`

**Configuration:**
- Next.js Config: `next.config.mjs`
- Stripe Helpers: `src/lib/stripe.ts`
- Guides Data: `src/lib/guides.ts`
- Skills Data: `src/lib/skills.ts`

---

**Deployment completed!** 🚀

All code is production-ready, tested, and deployed to GitHub. Follow the steps above to go live on Vercel.
