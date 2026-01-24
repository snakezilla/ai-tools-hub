# Go-Live Checklist - AI Tools Hub v2.0

**Status:** READY FOR DEPLOYMENT

All code is complete. Proceed with this checklist to go live.

---

## Pre-Deployment (Do These First)

### Security
- [ ] **CRITICAL:** Rotate Vercel OIDC token in Vercel dashboard
  - Visit: https://vercel.com/dashboard
  - Project: ai-tools-hub
  - Settings → Environment Variables
  - Revoke old VERCEL_OIDC_TOKEN

### Credentials Required
- [ ] Stripe Live Secret Key (sk_live_...)
- [ ] Stripe Live Publishable Key (pk_live_...)
- [ ] Stripe Webhook Secret (whsec_...)
- [ ] Stripe Price IDs:
  - [ ] Claude Code Essentials ($67)
  - [ ] AI Workflow Builder ($97)
  - [ ] Claude Skills Mastery ($47)
- [ ] Resend API Key (re_...)
- [ ] Resend FROM_EMAIL configured
- [ ] ADMIN_EMAIL for contact submissions

---

## Deployment Steps

### 1. Add Environment Variables to Vercel
- [ ] Go to Vercel Dashboard
- [ ] Select ai-tools-hub project
- [ ] Settings → Environment Variables
- [ ] Add all credentials (see above)
- [ ] Save

### 2. Verify Build
```bash
npm run build
# Should show: 39 pages, 0 errors
```

### 3. Push to Main
```bash
git push origin main
# Vercel auto-deploys on push
```

### 4. Monitor Deployment
- [ ] Check Vercel Dashboard for deployment status
- [ ] Verify no errors in build logs
- [ ] Check if deployment succeeded

---

## Post-Deployment Testing

### Payment Flow
- [ ] Visit https://ai-tools-hub.vercel.app/courses
- [ ] Click on a course (e.g., Claude Code Essentials)
- [ ] Click "Enroll Now"
- [ ] Use Stripe test card: 4242 4242 4242 4242
  - Expiry: Any future date (e.g., 12/26)
  - CVC: Any 3 digits (e.g., 123)
- [ ] Complete checkout
- [ ] Verify success page appears
- [ ] Verify confirmation email received (check Resend dashboard)

### Contact Form
- [ ] Visit https://ai-tools-hub.vercel.app/contact
- [ ] Fill out form (all fields required)
- [ ] Submit form
- [ ] Verify success message
- [ ] Check admin email for submission
- [ ] Verify auto-reply email received

### Content Pages
- [ ] Homepage loads without errors
- [ ] /guides page displays guides list
- [ ] /tools pages display correctly
- [ ] /skills page shows all skills
- [ ] /pricing page shows 3 tiers
- [ ] All links work correctly
- [ ] Mobile responsive on phone

### Security Headers
```bash
curl -I https://ai-tools-hub.vercel.app
# Verify headers:
# - X-Frame-Options: DENY
# - Content-Security-Policy: ...
# - Strict-Transport-Security: ...
```

---

## What's Deployed

### Pages (39 total)
- Homepage, About, Contact, Pricing
- 3 Course pages (with Stripe checkout)
- Guides hub + 4 guides
- Tools pages (12 tools)
- Skills page (12+ skills)
- Workflows (4 workflow pages)
- Categories (4 category pages)
- Success/Cancel pages

### Features
- ✅ Payment integration (Stripe)
- ✅ Email notifications (Resend)
- ✅ Contact form submission
- ✅ Security headers
- ✅ CSRF protection middleware
- ✅ Input validation (Zod)
- ✅ XSS prevention
- ✅ Error handling

### Infrastructure
- Next.js 15 with Turbopack
- React 19 with TypeScript
- Vercel Edge Functions (API routes)
- Vercel Middleware (CSRF protection)

---

## Monitoring

### Daily
- [ ] Check Vercel deployment status
- [ ] Monitor payment success rate
- [ ] Check Resend email delivery

### Weekly
- [ ] Review contact form submissions
- [ ] Check error logs
- [ ] Verify all pages load

### Monthly
- [ ] Review Stripe payment volume
- [ ] Check conversion metrics
- [ ] Plan content updates

---

## Rollback Plan (If Needed)

If deployment fails or issues occur:

```bash
# Revert to previous commit
git revert HEAD

# Or reset to previous good state
git reset --hard HEAD~1

# Push to trigger redeployment
git push origin main
```

---

## Support Contacts

- **Stripe Support:** https://support.stripe.com
- **Resend Support:** https://resend.com/support
- **Vercel Support:** https://vercel.com/support

---

## Success Criteria

✅ All tests pass
✅ Payment flow works
✅ Emails send correctly
✅ Contact form submits
✅ No console errors
✅ Security headers present
✅ Mobile responsive
✅ All pages load

---

## Next Steps After Launch

1. Monitor payment conversions
2. Collect early user feedback
3. Plan first content updates
4. Consider rate limiting (if needed based on traffic)
5. Set up analytics dashboard

---

**Ready to deploy!** Follow this checklist and you'll be live in 15 minutes.

Questions? Check SECURITY_FIXES_APPLIED.md for security details.
