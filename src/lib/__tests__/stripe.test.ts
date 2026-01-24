import { courseData, STRIPE_TIMEOUTS } from '../stripe'

describe('Stripe utilities', () => {
  describe('courseData', () => {
    it('should export course definitions with correct structure', () => {
      expect(courseData['claude-code-essentials']).toBeDefined()
      expect(courseData['claude-code-essentials'].name).toBe('Claude Code Essentials')
      expect(courseData['claude-code-essentials'].price).toBe(67)
    })

    it('should have all three courses defined', () => {
      expect(courseData['claude-code-essentials']).toBeDefined()
      expect(courseData['ai-workflow-builder']).toBeDefined()
      expect(courseData['claude-skills-mastery']).toBeDefined()
    })

    it('should have correct pricing for all courses', () => {
      expect(courseData['claude-code-essentials'].price).toBe(67)
      expect(courseData['ai-workflow-builder'].price).toBe(97)
      expect(courseData['claude-skills-mastery'].price).toBe(47)
    })

    it('should have correct Stripe price IDs for all courses', () => {
      expect(courseData['claude-code-essentials'].stripePrice).toBeDefined()
      expect(courseData['ai-workflow-builder'].stripePrice).toBeDefined()
      expect(courseData['claude-skills-mastery'].stripePrice).toBeDefined()
    })
  })

  describe('STRIPE_TIMEOUTS', () => {
    it('should define timeout configurations', () => {
      expect(STRIPE_TIMEOUTS.checkoutSession).toBe(30000)
      expect(STRIPE_TIMEOUTS.webhook).toBe(10000)
    })

    it('should have reasonable timeout values', () => {
      expect(STRIPE_TIMEOUTS.checkoutSession).toBeGreaterThan(0)
      expect(STRIPE_TIMEOUTS.webhook).toBeGreaterThan(0)
      expect(STRIPE_TIMEOUTS.checkoutSession).toBeGreaterThan(STRIPE_TIMEOUTS.webhook)
    })
  })
})
