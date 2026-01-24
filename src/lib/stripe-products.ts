// Stripe product and price configuration
// This file maps courses and workshops to their Stripe price IDs

export const STRIPE_PRODUCTS = {
  courses: {
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
  },
  workshops: {
    'half-day': {
      name: 'Half-Day Workshop',
      price: 295,
      stripePrice: process.env.NEXT_PUBLIC_STRIPE_PRICE_WORKSHOP_HALF || 'price_placeholder_4',
      description: 'Half-day hands-on workshop with Q&A and troubleshooting.',
    },
    'full-day': {
      name: 'Full-Day Workshop',
      price: 495,
      stripePrice: process.env.NEXT_PUBLIC_STRIPE_PRICE_WORKSHOP_FULL || 'price_placeholder_5',
      description: 'Full-day intensive workshop with custom curriculum and support.',
    },
  },
}

export function getCoursePrice(courseSlug: string): number | null {
  const course = STRIPE_PRODUCTS.courses[courseSlug as keyof typeof STRIPE_PRODUCTS.courses]
  return course ? course.price : null
}

export function getWorkshopPrice(workshopType: string): number | null {
  const workshop = STRIPE_PRODUCTS.workshops[workshopType as keyof typeof STRIPE_PRODUCTS.workshops]
  return workshop ? workshop.price : null
}

export function getStripePriceId(category: 'courses' | 'workshops', slug: string): string {
  if (category === 'courses') {
    return STRIPE_PRODUCTS.courses[slug as keyof typeof STRIPE_PRODUCTS.courses]?.stripePrice || ''
  } else {
    return STRIPE_PRODUCTS.workshops[slug as keyof typeof STRIPE_PRODUCTS.workshops]?.stripePrice || ''
  }
}
