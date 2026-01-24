import { courseData, createCheckoutSession, constructWebhookEvent } from '../stripe'
import Stripe from 'stripe'

// Mock Stripe
jest.mock('stripe', () => {
  return jest.fn().mockImplementation(() => ({
    checkout: {
      sessions: {
        create: jest.fn(),
      },
    },
    webhooks: {
      constructEvent: jest.fn(),
    },
  }))
})

describe('Stripe utilities', () => {
  beforeEach(() => {
    jest.clearAllMocks()
  })

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
  })

  describe('createCheckoutSession', () => {
    it('should create a checkout session with correct parameters', async () => {
      const mockSession = {
        id: 'cs_test_123',
        url: 'https://checkout.stripe.com/test',
      }

      const stripe = require('stripe')()
      stripe.checkout.sessions.create.mockResolvedValueOnce(mockSession)

      const result = await createCheckoutSession(
        'price_test_123',
        'https://example.com/success',
        'https://example.com/cancel'
      )

      expect(result).toEqual(mockSession)
    })

    it('should handle errors gracefully', async () => {
      const stripe = require('stripe')()
      const error = new Error('Stripe error')
      stripe.checkout.sessions.create.mockRejectedValueOnce(error)

      await expect(
        createCheckoutSession(
          'price_test_123',
          'https://example.com/success',
          'https://example.com/cancel'
        )
      ).rejects.toThrow('Stripe error')
    })
  })

  describe('constructWebhookEvent', () => {
    it('should construct a webhook event', () => {
      const mockEvent = {
        id: 'evt_test_123',
        type: 'checkout.session.completed',
      }

      const stripe = require('stripe')()
      stripe.webhooks.constructEvent.mockReturnValueOnce(mockEvent)

      const result = constructWebhookEvent('raw_body', 'signature')

      expect(result).toEqual(mockEvent)
    })
  })
})
