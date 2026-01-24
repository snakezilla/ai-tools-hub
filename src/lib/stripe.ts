import Stripe from 'stripe'

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY || '', {
  apiVersion: '2024-12-15.acacia',
})

export const getStripeInstance = () => stripe

export const stripeProductIds = {
  claudeCodeCourse: process.env.STRIPE_PRICE_CLAUDE_CODE_COURSE,
  workflowCourse: process.env.STRIPE_PRICE_WORKFLOW_COURSE,
  skillsCourse: process.env.STRIPE_PRICE_SKILLS_COURSE,
}

export const courseData = {
  'claude-code-essentials': {
    priceId: process.env.STRIPE_PRICE_CLAUDE_CODE_COURSE,
    name: 'Claude Code Essentials',
    price: 67,
  },
  'ai-workflow-builder': {
    priceId: process.env.STRIPE_PRICE_WORKFLOW_COURSE,
    name: 'AI Workflow Builder',
    price: 97,
  },
  'claude-skills-mastery': {
    priceId: process.env.STRIPE_PRICE_SKILLS_COURSE,
    name: 'Claude Skills Mastery',
    price: 47,
  },
}

export async function createCheckoutSession(
  priceId: string,
  successUrl: string,
  cancelUrl: string
) {
  const session = await stripe.checkout.sessions.create({
    line_items: [
      {
        price: priceId,
        quantity: 1,
      },
    ],
    mode: 'payment',
    success_url: successUrl,
    cancel_url: cancelUrl,
  })

  return session
}

export function constructWebhookEvent(body: string, signature: string) {
  const webhookSecret = process.env.STRIPE_WEBHOOK_SECRET || ''
  return stripe.webhooks.constructEvent(body, signature, webhookSecret)
}
