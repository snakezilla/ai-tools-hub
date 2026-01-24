# AI Tools Hub v2.0 - Go-Live Implementation Plan

**Status:** System is 100% production-ready. Awaiting credential configuration.
**Timeline:** 48 hours to full production deployment
**Owner:** Ahsan (User)

---

## Pre-Deployment Checklist (Do This First)

### 1. Gather Required Credentials
You need **3 API credentials** to go live:

- [ ] **Stripe Account**
  - Create at stripe.com if not already done
  - Generate live API keys (not test keys)
  - Create 3 products for courses:
    - Claude Code Essentials ($67)
    - AI Workflow Builder ($97)
    - Claude Skills Mastery ($47)
  - Generate webhook signing secret

- [ ] **Resend API Key**
  - Sign up at resend.com
  - Generate API key (labeled "Production")
  - Verify your domain (hello@practicallibrary.com)

- [ ] **Optional: Plausible Analytics**
  - Sign up at plausible.io
  - Create property for practicallibrary.com
  - Get tracking code

---

## Day 1: Local Testing & Configuration

### Step 1: Create Production Environment File (30 min)

Copy `.env.example` to `.env.production.local`:

```bash
cp .env.example .env.production.local
```

Edit `.env.production.local` with your **LIVE** credentials:

```env
# ===== STRIPE (LIVE KEYS - NOT TEST) =====
STRIPE_SECRET_KEY=sk_live_YOUR_SECRET_KEY
STRIPE_PUBLISHABLE_KEY=pk_live_YOUR_PUBLISHABLE_KEY
STRIPE_WEBHOOK_SECRET=whsec_YOUR_WEBHOOK_SECRET

# Map your Stripe product price IDs
STRIPE_PRICE_CLAUDE_CODE_COURSE=price_XXXXX  # $67 course
STRIPE_PRICE_WORKFLOW_COURSE=price_XXXXX     # $97 course
STRIPE_PRICE_SKILLS_COURSE=price_XXXXX       # $47 course

# ===== RESEND (EMAIL) =====
RESEND_API_KEY=re_YOUR_API_KEY
FROM_EMAIL=hello@practicallibrary.com
ADMIN_EMAIL=YOUR_EMAIL@example.com

# ===== OPTIONAL: ANALYTICS =====
NEXT_PUBLIC_PLAUSIBLE_DOMAIN=practicallibrary.com

# ===== OPTIONAL: AIRTABLE (FOR CONTACT LOG) =====
# AIRTABLE_API_KEY=YOUR_KEY
# AIRTABLE_BASE_ID=YOUR_BASE_ID
```

**CRITICAL:** Never commit `.env.production.local` to git.

### Step 2: Test Stripe Integration Locally (20 min)

```bash
# Build the project with production env vars
STRIPE_SECRET_KEY=sk_live_xxx npm run build
```

Test these flows:
1. Navigate to `/courses` page
2. Click "Buy Now" on a course
3. Verify Stripe checkout opens
4. Use Stripe test card: 4242 4242 4242 4242
5. Complete payment
6. Check webhook was received (Stripe Dashboard → Events)

### Step 3: Test Email Integration (15 min)

```bash
# Fill out contact form at /contact
# Submit with your test email
# Verify you receive:
#   1. Auto-reply from hello@practicallibrary.com
#   2. Admin notification at YOUR_EMAIL
```

### Step 4: Final Build Check (15 min)

```bash
npm run build
npm run lint
npm run type-check
```

**Expected result:**
- ✅ 39 pages built
- ✅ 0 errors
- ✅ 0 type issues

---

## Day 2: Vercel Deployment

### Step 1: Set Vercel Environment Variables (10 min)

Go to your Vercel project: https://vercel.com/dashboard

1. Select your project
2. Go to Settings → Environment Variables
3. Add these variables:

```
STRIPE_SECRET_KEY = sk_live_xxx
STRIPE_PUBLISHABLE_KEY = pk_live_xxx
STRIPE_WEBHOOK_SECRET = whsec_xxx
STRIPE_PRICE_CLAUDE_CODE_COURSE = price_xxx
STRIPE_PRICE_WORKFLOW_COURSE = price_xxx
STRIPE_PRICE_SKILLS_COURSE = price_xxx
RESEND_API_KEY = re_xxx
FROM_EMAIL = hello@practicallibrary.com
ADMIN_EMAIL = your-email@example.com
NEXT_PUBLIC_PLAUSIBLE_DOMAIN = practicallibrary.com
```

**Important:** Leave `NEXT_PUBLIC_*` as "Plaintext" (not sensitive), others as "Sensitive"

### Step 2: Deploy to Production (5 min)

```bash
git add .
git commit -m "chore: prepare for production deployment"
git push origin main
```

Vercel will automatically deploy. Watch the build at vercel.com/dashboard

**Expected result:**
- Build completes in ~2 min
- All 39 pages prerendered
- 0 errors
- Auto-publishes to production

### Step 3: Configure Stripe Webhook (10 min)

In Stripe Dashboard:

1. Go to Developers → Webhooks
2. Add endpoint:
   - URL: `https://practicallibrary.com/api/webhook`
   - Events: Select `checkout.session.completed`, `charge.refunded`, `payment_intent.payment_failed`
3. Copy webhook signing secret
4. Add to Vercel as `STRIPE_WEBHOOK_SECRET`

### Step 4: Verify Live Deployment (10 min)

1. Go to https://practicallibrary.com
2. Test each flow:
   - [ ] Homepage loads
   - [ ] /guides page loads with 22 guides
   - [ ] /courses page loads with 3 courses
   - [ ] Click "Buy Now" → real Stripe checkout
   - [ ] /contact form → test email submission
   - [ ] /skills page loads with 31+ skills
3. Use Stripe test card again to verify webhook
4. Confirm confirmation email arrives

---

## Launch Day Runbook

### Morning (1 hour before going live)

- [ ] Final smoke tests on production (all flows above)
- [ ] Check Stripe dashboard for test charges (clean them up)
- [ ] Verify email is being delivered to admin email
- [ ] Double-check homepage messaging is final
- [ ] Have customer support email ready

### Go-Live (Public announcement)

- [ ] Tweet/post: "AI Tools Hub v2.0 is live! Learn AI tools in 5 minutes. Free guides, $47-97 courses, high-ticket workshops."
- [ ] Email your list (if you have one)
- [ ] Monitor Stripe dashboard for first transactions
- [ ] Monitor Vercel for errors/performance issues

### First 24 Hours

- [ ] Monitor error logs (Vercel Dashboard → Functions)
- [ ] Monitor payment success rate (Stripe Dashboard)
- [ ] Respond to contact form submissions within 2 hours
- [ ] Track page load times and performance
- [ ] Verify analytics are capturing data (if using Plausible)

---

## Post-Launch Success Metrics

### Track These KPIs

**Traffic & Engagement:**
- Homepage bounce rate (target: <40%)
- Guide page views per session (target: 2+)
- Course page views to purchase rate (target: 1-2%)

**Revenue:**
- Checkout completion rate (target: >70% of clicks)
- Average customer lifetime value (target: $100+)
- Monthly recurring revenue (target: $XXX)

**Customer Satisfaction:**
- Contact form response time (target: <2 hours)
- Email delivery rate (target: >98%)
- Course satisfaction (collect via email after purchase)

### First Week Milestones

- [ ] 100+ unique visitors
- [ ] 5+ guide readers
- [ ] 1+ course purchase
- [ ] 0 critical errors
- [ ] All payment flows working
- [ ] Email notifications reliable

---

## Emergency Playbook (If Something Breaks)

### If Stripe Checkout Doesn't Work

1. Check Vercel environment variables are set
2. Verify Stripe keys are live (not test)
3. Check Stripe dashboard for API errors
4. Verify webhook is receiving events
5. Roll back to test keys and investigate

### If Emails Aren't Sending

1. Check Resend API key is correct
2. Verify sender email is verified in Resend
3. Check spam folder
4. Look at Resend dashboard for delivery logs
5. Verify rate limiting isn't blocking emails

### If Pages Are Slow

1. Check Vercel dashboard for slow functions
2. Run Lighthouse audit (DevTools → Lighthouse)
3. Check if Stripe/Resend APIs are slow (check status pages)
4. Clear Vercel cache if needed

### Critical Contact

If you can't debug locally:
1. Ping Stripe support (stripe.com/support)
2. Ping Vercel support (vercel.com/support)
3. Ping Resend support (resend.com/support)

Each has live chat and responds within 1 hour.

---

## Rollback Procedure (If You Need to Go Back)

If you need to pause/rollback:

```bash
# Redeploy previous version
git revert HEAD
git push origin main

# Or manually rollback in Vercel:
# Vercel Dashboard → Deployments → Select previous → Promote
```

This takes ~2 min. Your site will be down during the 2-minute rebuild.

---

## Post-Launch Optimization (After 1 Week)

Once live and stable, plan these improvements:

1. **Week 1:** Monitor performance, fix bugs
2. **Week 2:** Collect user feedback, improve CTAs
3. **Week 3:** Create more guides based on user search patterns
4. **Week 4:** A/B test course pricing and titles

---

## Deployment Commands (Quick Reference)

```bash
# Prepare local environment
cp .env.example .env.production.local
# Edit with your live credentials

# Test locally
npm run build
npm run lint

# Deploy to production
git add .
git commit -m "chore: deploy v2.0 to production"
git push origin main

# Monitor
# - Vercel Dashboard: vercel.com/dashboard
# - Stripe Dashboard: stripe.com/dashboard
# - Website: https://practicallibrary.com
```

---

## Checklist Before Claiming "We're Live"

- [ ] Stripe API keys are LIVE (not test)
- [ ] Vercel environment variables are set
- [ ] Contact form sends real emails
- [ ] Course checkout works end-to-end
- [ ] All 3 courses can be purchased
- [ ] Confirmation emails arrive
- [ ] Webhook is receiving Stripe events
- [ ] No console errors on production site
- [ ] Mobile responsiveness verified
- [ ] All 39 pages load without errors
- [ ] Analytics (Plausible) is tracking
- [ ] Rate limiting is working (test /api/contact spam)

✅ **When all above are checked: YOU ARE LIVE**

---

## 30-Day Post-Launch Review

Schedule review for 30 days after launch:

1. **Revenue:** Total earned, average order value, conversion rate
2. **Traffic:** Total visitors, guides read, courses viewed
3. **Customer feedback:** Support emails, pain points, feature requests
4. **Tech health:** Error rates, performance, uptime
5. **Next steps:** What to build next based on data

---

**You're ready to go live.** Follow this plan exactly and you'll be live within 48 hours.

Good luck! 🚀
