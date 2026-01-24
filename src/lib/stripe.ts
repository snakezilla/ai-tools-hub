import Stripe from 'stripe'

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

// Course data for Stripe integration
export const courseData = {
  'claude-code-essentials': {
    name: 'Claude Code Essentials',
    price: 67,
    stripePrice: process.env.NEXT_PUBLIC_STRIPE_PRICE_CLAUDE_CODE || 'price_placeholder_1',
    description: 'Master Claude Code from installation to shipping your first feature.',
  },
  'ai-workflow-builder': {
    name: 'AI Workflow Builder',
    price: 97,
    stripePrice: process.env.NEXT_PUBLIC_STRIPE_PRICE_WORKFLOW || 'price_placeholder_2',
    description: 'Build 5 complete automation workflows using Claude + other tools.',
  },
  'claude-skills-mastery': {
    name: 'Claude Skills Mastery',
    price: 47,
    stripePrice: process.env.NEXT_PUBLIC_STRIPE_PRICE_SKILLS || 'price_placeholder_3',
    description: 'Unlock superpowers: install, customize, and build your own skills.',
  },
} as const

// Create a Stripe checkout session
export async function createCheckoutSession(
  priceId: string,
  successUrl: string,
  cancelUrl: string
): Promise<Stripe.Checkout.Session> {
  const stripe = getStripe()

  const session = await stripe.checkout.sessions.create({
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
  })

  return session
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
