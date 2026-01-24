# Production Deployment - Execution Commands

**Status:** Ready for immediate execution
**Time to Deploy:** ~1 hour (mostly automated + waiting)
**Deployment Date:** January 24, 2026

---

## Quick Start - 3 Steps to Live

### Step 1: Configure Environment Variables in Vercel (15 min)

```bash
# Open Vercel Dashboard
open https://vercel.com/dashboard

# Navigate to: ai-tools-hub project → Settings → Environment Variables

# Add these Production environment variables:
# (Copy the exact values you have)

STRIPE_SECRET_KEY=sk_live_xxxxx
STRIPE_PUBLISHABLE_KEY=pk_live_xxxxx
STRIPE_WEBHOOK_SECRET=whsec_xxxxx
STRIPE_PRICE_CLAUDE_CODE_COURSE=price_xxxxx
STRIPE_PRICE_WORKFLOW_COURSE=price_xxxxx
STRIPE_PRICE_SKILLS_COURSE=price_xxxxx
RESEND_API_KEY=re_xxxxx
FROM_EMAIL=hello@practicallibrary.com
ADMIN_EMAIL=ahsan@example.com
```

### Step 2: Configure Stripe Webhook (10 min)

```bash
# Go to Stripe Dashboard
open https://dashboard.stripe.com/webhooks

# Add endpoint:
# URL: https://your-domain.com/api/webhook
# Events:
#   - checkout.session.completed
#   - charge.refunded
#   - payment_intent.payment_failed

# Copy signing secret → add to Vercel as STRIPE_WEBHOOK_SECRET
```

### Step 3: Deploy (5 min automatic)

```bash
# Vercel auto-deploys from main when you added environment variables
# Monitor deployment at:
open https://vercel.com/dashboard/ai-tools-hub?tab=deployments

# Once "Ready", your site is LIVE
# Visit: https://your-domain.com
```

---

## Detailed Deployment Checklist

### Prerequisites (Do Before Deployment)

```bash
# 1. Verify code is clean
git status
# Should show: "nothing to commit, working tree clean"

# 2. Verify latest commit is pushed
git log -1 --oneline
# Should show recent docs commits

# 3. Run final build test locally
npm run build
# Should complete with 0 errors
```

### Environment Variables Setup

**In Vercel Dashboard (https://vercel.com/dashboard):**

1. Click "ai-tools-hub" project
2. Click "Settings" → "Environment Variables"
3. Click "Add Environment Variable"
4. For each variable below:
   - Enter Name (e.g., `STRIPE_SECRET_KEY`)
   - Enter Value (your actual credential)
   - Select "Production" environment
   - Click "Save"

**Required Variables:**

```
Name: STRIPE_SECRET_KEY
Value: sk_live_xxxxx

Name: STRIPE_PUBLISHABLE_KEY
Value: pk_live_xxxxx

Name: STRIPE_WEBHOOK_SECRET
Value: whsec_xxxxx

Name: STRIPE_PRICE_CLAUDE_CODE_COURSE
Value: price_xxxxx

Name: STRIPE_PRICE_WORKFLOW_COURSE
Value: price_xxxxx

Name: STRIPE_PRICE_SKILLS_COURSE
Value: price_xxxxx

Name: RESEND_API_KEY
Value: re_xxxxx

Name: FROM_EMAIL
Value: hello@practicallibrary.com

Name: ADMIN_EMAIL
Value: ahsan@example.com
```

### Stripe Webhook Configuration

**In Stripe Dashboard (https://dashboard.stripe.com/webhooks):**

1. Click "Add endpoint"
2. In "Endpoint URL" field, enter:
   ```
   https://your-domain.com/api/webhook
   ```
   (Replace `your-domain.com` with actual domain)

3. Under "Events to send", select:
   - ✓ `checkout.session.completed`
   - ✓ `charge.refunded`
   - ✓ `payment_intent.payment_failed`

4. Click "Add endpoint"

5. Click the endpoint to open details page

6. Copy the "Signing secret" (starts with `whsec_`)

7. Add to Vercel as environment variable:
   ```
   Name: STRIPE_WEBHOOK_SECRET
   Value: whsec_xxxxx (paste from Stripe)
   ```

### Automatic Deployment Trigger

Once you add environment variables to Vercel:

1. Vercel automatically detects changes
2. Triggers a new deployment
3. Watch at: https://vercel.com/dashboard/ai-tools-hub?tab=deployments

**Status progression:**
- 🟡 Queued
- 🟡 Building
- 🟢 Ready (Live!)

**Expected build time:** 2-3 minutes

### Post-Deployment Verification

After deployment shows "Ready":

```bash
# 1. Test site loads
open https://your-domain.com
# Should see homepage with all navigation links

# 2. Test routes
open https://your-domain.com/guides     # Should load guides
open https://your-domain.com/courses    # Should load courses
open https://your-domain.com/skills     # Should load skills
open https://your-domain.com/contact    # Should load contact form

# 3. Test payment flow
open https://your-domain.com/courses
# Click "Enroll Now" button
# Should redirect to Stripe Checkout
# Use test card: 4242 4242 4242 4242
# Expiry: 12/25
# CVC: 123

# 4. Check webhook received
open https://dashboard.stripe.com/webhooks
# Click your endpoint
# Should see "checkout.session.completed" in Deliveries
# Status should show "Success"

# 5. Test contact form
open https://your-domain.com/contact
# Submit test form
# Check email (ADMIN_EMAIL) for notification
# Check your inbox for auto-reply
```

---

## Troubleshooting During Deployment

### Build Fails

1. **Check Vercel logs:**
   ```
   https://vercel.com/dashboard/ai-tools-hub?tab=deployments
   → Click latest deployment
   → Scroll to see error logs
   ```

2. **Common causes:**
   - Missing environment variable (check all are added)
   - Variable value is incorrect/incomplete
   - Domain name mismatch in webhook URL

3. **Fix:**
   - Correct the environment variable
   - Vercel auto-redeploys with corrected values
   - Wait for deployment to complete

### Stripe Webhook Not Working

1. **Verify endpoint is active:**
   ```
   https://dashboard.stripe.com/webhooks
   → Click endpoint
   → Should show green checkmark
   ```

2. **Check Deliveries:**
   ```
   https://dashboard.stripe.com/webhooks
   → Click endpoint
   → Scroll to "Deliveries"
   → Should show recent events
   ```

3. **If not receiving events:**
   - Verify webhook URL is exactly correct (including https://)
   - Verify signing secret matches STRIPE_WEBHOOK_SECRET
   - Verify domain is live (test at https://your-domain.com)
   - Disable and re-enable endpoint in Stripe

### Payment Checkout Redirects to Wrong Page

1. **Cause:** Success/cancel URL mismatch
2. **Fix:**
   - Check `/src/app/api/checkout/route.ts` lines 25-30
   - Verify domain matches your actual domain
   - Redeploy (Vercel auto-deploys on file changes)

### Emails Not Sending

1. **Check Resend status:**
   ```
   https://resend.com → Activity
   ```

2. **Verify:**
   - `FROM_EMAIL` is verified in Resend
   - `RESEND_API_KEY` is correct
   - Domain is verified in Resend (if custom domain)

3. **Test locally first:**
   ```bash
   # Set env vars locally
   export RESEND_API_KEY=re_xxxxx

   # Run dev server
   npm run dev

   # Test contact form at http://localhost:3000/contact
   # Check terminal for errors
   ```

---

## Post-Launch Monitoring (First Week)

### Daily Checklist

```bash
# 1. Check Vercel Dashboard for errors
open https://vercel.com/dashboard/ai-tools-hub

# 2. Check Stripe for failed payments
open https://dashboard.stripe.com/payments

# 3. Check Resend for email issues
open https://resend.com/activity

# 4. Check site is responding
curl https://your-domain.com -I
# Should return: 200 OK

# 5. Monitor logs
open https://vercel.com/dashboard/ai-tools-hub?tab=logs
```

### Weekly Review

- Payment volume
- Contact form submissions
- Email delivery rate
- Error rate
- Performance metrics

---

## Rollback Procedure (If Needed)

### Quick Rollback

1. **Go to Vercel Deployments:**
   ```
   https://vercel.com/dashboard/ai-tools-hub?tab=deployments
   ```

2. **Find previous successful deployment**
   - Click "..." menu
   - Click "Promote to Production"

3. **Verify rollback:**
   - Wait for deployment to complete
   - Check site loads correctly

### Complete Rollback via Git

```bash
# If issues are code-related:

# 1. Identify last good commit
git log --oneline | head -10

# 2. Create revert commit
git revert <commit-hash>

# 3. Push to main
git push origin main

# 4. Vercel auto-deploys
# Monitor at: https://vercel.com/dashboard/ai-tools-hub?tab=deployments
```

---

## Success Indicators

### Deployment is Successful When:

- ✅ Site loads at https://your-domain.com
- ✅ All navigation links work
- ✅ Stripe checkout redirects to Stripe (test mode)
- ✅ Test payment triggers webhook
- ✅ Contact form email sends
- ✅ Analytics tracking shows pageviews
- ✅ No errors in Vercel logs
- ✅ No errors in Stripe webhooks

### You're Making Money When:

- 💰 Course purchase with real card completes
- 📧 Confirmation email received
- 💳 Stripe shows successful charge
- 📬 Contact form captures qualified leads
- 📊 Analytics shows conversion metrics

---

## Commands Reference

### Check Deployment Status
```bash
open https://vercel.com/dashboard/ai-tools-hub?tab=deployments
```

### View Live Site
```bash
open https://your-domain.com
```

### Test Locally Before Deployment
```bash
npm run dev
# Visit http://localhost:3000
```

### Check Stripe Webhook Status
```bash
open https://dashboard.stripe.com/webhooks
```

### Monitor Errors
```bash
open https://vercel.com/dashboard/ai-tools-hub?tab=logs
```

### Monitor Email Delivery
```bash
open https://resend.com/activity
```

---

## Timeline

| Task | Duration | Status |
|------|----------|--------|
| Add environment variables | 15 min | Manual |
| Configure Stripe webhook | 10 min | Manual |
| Vercel auto-deploys | 2-3 min | Automatic |
| Post-launch testing | 10 min | Manual |
| **TOTAL TO LIVE** | **~40 min** | Ready Now |

---

## Final Deployment Command

When you're ready, execute in order:

```bash
# 1. Add all environment variables in Vercel Dashboard
# 2. Configure Stripe webhook with your domain
# 3. Wait for Vercel to auto-deploy (status: Ready)
# 4. Test payment flow with test card
# 5. Verify webhook receives events
# 6. Test contact form emails
# 7. Monitor for 1 hour for any issues

# That's it. You're live.
```

---

## Support Resources

- **Deployment Guide:** `PRODUCTION_DEPLOYMENT_GUIDE.md`
- **Launch Summary:** `LAUNCH_SUMMARY.md`
- **Spec Compliance:** `docs/SPEC_COMPLIANCE.md`
- **Pre-Launch Checklist:** `PRE-LAUNCH-CHECKLIST.md`

---

**Ready? Follow the "Quick Start - 3 Steps" section above.**
