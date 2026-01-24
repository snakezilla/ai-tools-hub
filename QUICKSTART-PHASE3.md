# Phase 3 Quick Start - Stripe Payment Integration

## 🚀 What's New

Complete payment infrastructure for course sales:
- Stripe checkout sessions
- Email notifications (Resend)
- Contact form handling
- Comprehensive API + tests

## 📋 Setup (5 minutes)

### 1. Get Stripe Credentials
1. Go to https://stripe.com/dashboard
2. Copy your **Secret Key** (starts with `sk_live_` or `sk_test_`)
3. Create products for each course
4. Copy the **Price IDs** generated
5. Create a webhook endpoint pointing to `/api/webhook`
6. Copy the **Webhook Secret**

### 2. Get Resend Credentials
1. Go to https://resend.com/keys
2. Copy your **API Key**
3. Verify your domain or use their test domain

### 3. Update `.env.local`

```bash
# Copy from .env.example
cp .env.example .env.local

# Edit .env.local and add your actual values
# Stripe
STRIPE_SECRET_KEY=sk_live_xxxxx
STRIPE_PUBLISHABLE_KEY=pk_live_xxxxx
STRIPE_WEBHOOK_SECRET=whsec_xxxxx
STRIPE_PRICE_CLAUDE_CODE_COURSE=price_xxxxx
STRIPE_PRICE_WORKFLOW_COURSE=price_xxxxx
STRIPE_PRICE_SKILLS_COURSE=price_xxxxx

# Resend
RESEND_API_KEY=re_xxxxx
FROM_EMAIL=hello@example.com
ADMIN_EMAIL=you@example.com
```

### 4. Install Dependencies
```bash
npm install --legacy-peer-deps
```

## 🧪 Testing Locally

### Run Unit Tests
```bash
npm test
npm test:watch
npm test -- --coverage
```

### Manual Checkout Flow Test
1. Start dev server: `npm run dev`
2. Go to `/courses/[course-slug]` (e.g., `/courses/claude-code-essentials`)
3. Click "Get Course" button
4. Use Stripe test card: `4242 4242 4242 4242`
5. Complete payment
6. Verify success page displays

### Webhook Testing with Stripe CLI
```bash
# Install Stripe CLI: https://stripe.com/docs/stripe-cli

# Listen for webhook events
stripe listen --forward-to localhost:3000/api/webhook

# Copy the webhook signing secret and add to .env.local
# Make a test payment or use:
stripe trigger checkout.session.completed
```

### Contact Form Test
1. Go to `/contact`
2. Fill out form
3. Submit
4. Check:
   - Success message displays
   - Admin email receives notification
   - Your email gets auto-reply

## 📚 API Reference

### POST /api/checkout
Create a Stripe checkout session.

**Request:**
```javascript
const response = await fetch('/api/checkout', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify({ priceId: 'price_xxxxx' })
})
const { url } = await response.json()
window.location.href = url
```

**Response:**
```json
{
  "url": "https://checkout.stripe.com/pay/cs_..."
}
```

### POST /api/webhook
Handles Stripe webhooks (configured in Stripe dashboard).

**Events:**
- `checkout.session.completed` → Send confirmation email
- `charge.refunded` → Log refund
- `payment_intent.payment_failed` → Log failure

### POST /api/contact
Handle contact form submissions.

**Request:**
```javascript
{
  "name": "John Doe",
  "email": "john@example.com",
  "type": "question",
  "message": "Hello there"
}
```

**Response:**
```json
{
  "success": true
}
```

## 🎯 Usage in Components

### Use CheckoutButton in Course Page

```tsx
import { CheckoutButton } from '@/components/CheckoutButton'

export default function CoursePage() {
  return (
    <CheckoutButton
      priceId="price_xxxxx"
      label="Get Claude Code Essentials"
      className="w-full"
    />
  )
}
```

## 🔍 Troubleshooting

### "STRIPE_SECRET_KEY not configured"
- Check `.env.local` has `STRIPE_SECRET_KEY` set
- Restart dev server: `npm run dev`
- Verify no typos in env var name

### Webhooks not firing
```bash
# Test with Stripe CLI
stripe trigger checkout.session.completed

# Check webhook logs in Stripe dashboard
# Settings → Developers → Webhooks → Click endpoint → View events
```

### Emails not sending
- Verify `RESEND_API_KEY` in `.env.local`
- Check `FROM_EMAIL` is verified in Resend dashboard
- Look for emails in spam folder
- Check Resend activity log

### TypeScript errors
```bash
npx tsc --noEmit  # Check for type errors
npm run build     # Full build check
```

## 📊 What to Monitor

### Stripe Dashboard
- Payments section: view all transactions
- Webhooks section: ensure events are processing
- API Keys section: rotate keys periodically

### Resend Dashboard
- Activity log: verify emails were sent
- Domains: ensure FROM_EMAIL is verified
- Analytics: track delivery rates

### Logs
```bash
# Dev server logs show:
# - Webhook events processed
# - Contact form submissions
# - Email sending status
# - Errors and exceptions
```

## 🚢 Deployment

### Before Going Live

1. **Stripe Setup**
   - Switch to Live mode (not test mode)
   - Update `STRIPE_SECRET_KEY` to live key
   - Update all `STRIPE_PRICE_*` IDs to live prices
   - Set webhook endpoint to production URL

2. **Resend Setup**
   - Verify your domain (SPF/DKIM records)
   - Update `FROM_EMAIL` to verified domain
   - Update `ADMIN_EMAIL` to production inbox

3. **Environment Variables**
   ```bash
   # In Vercel dashboard or .env.production
   STRIPE_SECRET_KEY=sk_live_xxxxx
   STRIPE_WEBHOOK_SECRET=whsec_xxxxx
   RESEND_API_KEY=re_xxxxx
   ```

4. **Test Workflow**
   - Complete a real transaction
   - Verify confirmation email
   - Check admin notification
   - Test webhook delivery

## 📖 Full Documentation

- `docs/PHASE3-PAYMENT-INTEGRATION.md` - Complete implementation guide
- `PHASE3-SUMMARY.md` - Architecture and file structure
- `.env.example` - All environment variables

## 🔐 Security Checklist

- ✅ Never commit `.env.local` (it's in `.gitignore`)
- ✅ Stripe webhooks are signature-verified
- ✅ Input validation on all endpoints
- ✅ Error messages don't leak sensitive data
- ✅ Use environment variables for all secrets
- ✅ API keys are never logged

## 📞 Support

For issues:
1. Check logs: `npm run dev` output
2. Review error messages carefully
3. Check Stripe/Resend dashboards for activity
4. Run tests: `npm test`
5. Compare with `docs/PHASE3-PAYMENT-INTEGRATION.md`

## ✅ Next Steps

After Phase 3 is working:
1. **Phase 4**: Create guides system and migrate content
2. **Phase 5**: Add skills library page
3. **Phase 6**: Polish, mobile, performance

---

**Phase Status**: ✅ Complete and Ready to Deploy
