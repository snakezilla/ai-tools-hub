import Stripe from 'stripe'

/**
 * Timeout configuration for Stripe API calls (milliseconds)
 */
export const STRIPE_TIMEOUTS = {
  checkoutSession: 30000, // 30 seconds
  webhook: 10000, // 10 seconds
} as const

// Initialize Stripe client
const getStripe = () => {
  const secretKey = process.env.STRIPE_SECRET_KEY
  if (!secretKey) {
    throw new Error('STRIPE_SECRET_KEY environment variable is not set')
  }
  return new Stripe(secretKey, {
    apiVersion: '2023-10-16',
  })
}

/**
 * Wrap a promise with a timeout
 * Rejects with a descriptive error if the promise takes too long
 */
export async function withTimeout<T>(
  promise: Promise<T>,
  timeoutMs: number,
  errorMessage: string
): Promise<T> {
  return Promise.race([
    promise,
    new Promise<T>((_, reject) =>
      setTimeout(() => reject(new Error(errorMessage)), timeoutMs)
    ),
  ])
}

// Course data for Stripe integration
export const courseData = {
  'claude-code-essentials': {
    name: 'Claude Code Essentials',
    price: 67,
    stripePrice: process.env.NEXT_PUBLIC_STRIPE_PRICE_CLAUDE_CODE || 'price_1St9N9BFWwFtzH8DF9bmFRBo',
    description: 'Master Claude Code from installation to shipping your first feature.',
  },
  'ai-workflow-builder': {
    name: 'AI Workflow Builder',
    price: 97,
    stripePrice: process.env.NEXT_PUBLIC_STRIPE_PRICE_WORKFLOW || 'price_1St9NSBFWwFtzH8DKGqctZZq',
    description: 'Build 5 complete automation workflows using Claude + other tools.',
  },
  'claude-skills-mastery': {
    name: 'Claude Skills Mastery',
    price: 47,
    stripePrice: process.env.NEXT_PUBLIC_STRIPE_PRICE_SKILLS || 'price_1St9NjBFWwFtzH8DjtuVVerP',
    description: 'Unlock superpowers: install, customize, and build your own skills.',
  },
} as const

/**
 * Create a Stripe checkout session with timeout protection
 * Times out after 30 seconds to prevent hanging requests
 */
export async function createCheckoutSession(
  priceId: string,
  successUrl: string,
  cancelUrl: string,
  metadata?: Record<string, string>
): Promise<Stripe.Checkout.Session> {
  const stripe = getStripe()

  return withTimeout(
    stripe.checkout.sessions.create({
      mode: 'payment',
      payment_method_types: ['card'],
      line_items: [
        {
          price: priceId,
          quantity: 1,
        },
      ],
      success_url: successUrl,
      cancel_url: cancelUrl,
      metadata: metadata || {},
    }),
    STRIPE_TIMEOUTS.checkoutSession,
    'Stripe checkout session creation timed out after 30 seconds'
  )
}

// Construct and verify a webhook event from Stripe
export function constructWebhookEvent(
  payload: string,
  signature: string
): Stripe.Event {
  const stripe = getStripe()
  const webhookSecret = process.env.STRIPE_WEBHOOK_SECRET

  if (!webhookSecret) {
    throw new Error('STRIPE_WEBHOOK_SECRET environment variable is not set')
  }

  return stripe.webhooks.constructEvent(payload, signature, webhookSecret)
}
