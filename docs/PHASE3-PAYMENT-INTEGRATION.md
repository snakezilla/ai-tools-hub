# Phase 3: Payment Integration - Implementation Guide

## Overview
Phase 3 implements Stripe payment integration for course purchases and email notifications via Resend.

## What Was Implemented

### 1. Stripe Utilities (`src/lib/stripe.ts`)
- **createCheckoutSession**: Creates Stripe checkout sessions with success/cancel URLs
- **constructWebhookEvent**: Verifies and constructs Stripe webhook events
- **courseData**: Course pricing and ID mapping
- **getStripeInstance**: Returns Stripe client instance

### 2. API Routes

#### POST `/api/checkout`
- **Purpose**: Creates a Stripe checkout session
- **Request**: `{ priceId: string, courseSlug?: string }`
- **Response**: `{ url: string }` (Stripe checkout URL)
- **Features**:
  - Input validation with Zod
  - Configurable success/cancel URLs
  - Comprehensive error handling
  - Stripe configuration validation

**Example Usage**:
```typescript
const response = await fetch('/api/checkout', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify({ priceId: 'price_xxxxx' })
})
const { url } = await response.json()
window.location.href = url
```

#### POST `/api/webhook`
- **Purpose**: Handles Stripe webhook events
- **Signature Verification**: Validates all incoming webhooks
- **Events Handled**:
  - `checkout.session.completed`: Sends confirmation email
  - `charge.refunded`: Logs refund
  - `payment_intent.payment_failed`: Logs failed payment
- **Features**:
  - Automatic email notifications via Resend
  - Comprehensive error logging
  - Invalid signature rejection (403)

#### POST `/api/contact`
- **Purpose**: Handles contact form submissions
- **Request**: `{ name, email, type, message }`
- **Response**: `{ success: boolean }`
- **Features**:
  - Email validation with regex
  - Auto-reply to user
  - Admin notification
  - Multiple contact type handling

### 3. CheckoutButton Component
- **Location**: `src/components/CheckoutButton.tsx`
- **Props**:
  - `priceId`: Stripe price ID
  - `label`: Button text (default: "Buy Now")
  - `className`: Additional CSS classes
  - `disabled`: Disable button state
- **Behavior**:
  - Shows loading state during checkout
  - Displays error messages
  - Redirects to Stripe checkout on success

### 4. Dependencies Added
- `stripe`: ^14.0.0 - Stripe SDK
- `@stripe/stripe-js`: ^4.0.0 - Stripe.js for frontend
- `resend`: ^3.0.0 - Email service
- `zod`: ^3.22.4 - Input validation
- `react-hook-form`: ^7.50.0 - Form handling
- Testing: jest, @testing-library/react

## Configuration

### Environment Variables Required

Create `.env.local` with:

```env
# Stripe - Get from Stripe Dashboard
STRIPE_SECRET_KEY=sk_live_xxxxx
STRIPE_PUBLISHABLE_KEY=pk_live_xxxxx
STRIPE_WEBHOOK_SECRET=whsec_xxxxx

# Course Price IDs - Create in Stripe Dashboard
STRIPE_PRICE_CLAUDE_CODE_COURSE=price_xxxxx
STRIPE_PRICE_WORKFLOW_COURSE=price_xxxxx
STRIPE_PRICE_SKILLS_COURSE=price_xxxxx

# Resend - Get from Resend Dashboard
RESEND_API_KEY=re_xxxxx

# Your brand email
FROM_EMAIL=hello@practicallibrary.com
ADMIN_EMAIL=your-email@example.com
```

### Stripe Setup Steps

1. Create Stripe account at https://stripe.com
2. Create products for each course:
   - Claude Code Essentials ($67)
   - AI Workflow Builder ($97)
   - Claude Skills Mastery ($47)
3. Copy price IDs to `.env.local`
4. Set webhook endpoint:
   - URL: `https://yourdomain.com/api/webhook`
   - Events: `checkout.session.completed`, `charge.refunded`, `payment_intent.payment_failed`
   - Copy webhook signing secret to `STRIPE_WEBHOOK_SECRET`

### Resend Setup Steps

1. Create Resend account at https://resend.com
2. Verify your domain or use `onboarding_test_<random>@resend.dev`
3. Copy API key to `RESEND_API_KEY`

## Testing

### Unit Tests
```bash
npm test -- src/lib/__tests__/stripe.test.ts
npm test -- src/app/api/checkout/__tests__/route.test.ts
npm test -- src/app/api/webhook/__tests__/route.test.ts
npm test -- src/app/api/contact/__tests__/route.test.ts
```

### Manual Testing - Checkout Flow

1. Go to `/courses/[course-slug]`
2. Click "Get Course"
3. Verify redirect to Stripe Checkout
4. Use test card: `4242 4242 4242 4242`
5. Complete payment
6. Verify:
   - Webhook processed (`/api/webhook`)
   - Confirmation email sent
   - Success page displayed

### Manual Testing - Contact Form

1. Go to `/contact`
2. Fill form with:
   - Name: Test User
   - Email: test@example.com
   - Type: question
   - Message: Test message
3. Submit
4. Verify:
   - Success message displayed
   - Admin email received
   - Auto-reply sent to user

## Security Considerations

### ✅ Implemented
- Stripe webhook signature verification
- Input validation (Zod schema)
- Email format validation
- Error messages don't leak sensitive data
- API keys in environment variables only
- HTTPS enforcement on production

### 🔒 For Production
- Enable CSRF protection on Next.js
- Rate limit `/api/contact` and `/api/checkout`
- Monitor webhook deliveries in Stripe dashboard
- Rotate webhook secret regularly
- Use Stripe's official libraries (don't build custom crypto)

## Error Handling

### Checkout Errors
- **Missing priceId**: 400 Bad Request
- **Invalid priceId format**: 400 Bad Request
- **Stripe not configured**: 500 Server Error
- **Session creation failed**: 500 Server Error

### Webhook Errors
- **Missing signature**: 400 Bad Request
- **Invalid signature**: 403 Forbidden (webhook verification failed)
- **Processing error**: 500 Server Error

### Contact Form Errors
- **Missing required fields**: 400 Bad Request
- **Invalid email format**: 400 Bad Request
- **Email sending failed**: 500 Server Error

## Next Steps

### Phase 4: Guides System
- Create `/guides` landing page
- Migrate detailed tool content
- Add guide-to-course cross-linking

### Phase 5: Skills Library
- Create `/skills` page
- Curate 20+ Claude Code skills
- Add installation instructions

### Phase 6: Polish
- Mobile optimization
- Performance audit
- SEO metadata review
- Analytics setup

## Troubleshooting

### "Stripe not configured" error
- Check `STRIPE_SECRET_KEY` is set in `.env.local`
- Verify it starts with `sk_test_` (test) or `sk_live_` (production)

### Webhooks not triggering
- Verify webhook URL in Stripe dashboard
- Check webhook signing secret matches `STRIPE_WEBHOOK_SECRET`
- Monitor webhook logs in Stripe dashboard
- Use Stripe CLI for local testing: `stripe listen --forward-to localhost:3000/api/webhook`

### Emails not sending
- Verify `RESEND_API_KEY` is set
- Check `FROM_EMAIL` is verified in Resend
- Verify `ADMIN_EMAIL` is correct
- Check spam folder for test emails

### Type errors during build
- Run `npm run build` locally to catch issues
- Check TypeScript: `npx tsc --noEmit`
- Verify all `.env` variables are set

## Resources

- [Stripe API Documentation](https://stripe.com/docs/api)
- [Stripe Next.js Integration](https://stripe.com/docs/checkout/quickstart)
- [Resend Documentation](https://resend.com/docs)
- [Zod Validation](https://zod.dev)

## File Structure

```
src/
├── app/api/
│   ├── checkout/route.ts (+ __tests__/route.test.ts)
│   ├── webhook/route.ts (+ __tests__/route.test.ts)
│   └── contact/route.ts (+ __tests__/route.test.ts)
├── components/
│   └── CheckoutButton.tsx
└── lib/
    ├── stripe.ts (+ __tests__/stripe.test.ts)
```

## Commit Message

```
feat: integrate Stripe payment flow

- Add POST /api/checkout for creating checkout sessions
- Add POST /api/webhook for handling Stripe events
- Add POST /api/contact for contact form submissions
- Add CheckoutButton component for course purchases
- Add Stripe utilities and Resend email integration
- Add comprehensive unit tests for all API routes
- Add environment variable documentation (.env.example)
```
