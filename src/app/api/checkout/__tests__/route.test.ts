import { POST } from '../route'
import { NextRequest } from 'next/server'

// Mock dependencies
jest.mock('@/lib/stripe', () => ({
  createCheckoutSession: jest.fn(),
}))

describe('/api/checkout', () => {
  const { createCheckoutSession } = require('@/lib/stripe')

  beforeEach(() => {
    jest.clearAllMocks()
    process.env.STRIPE_SECRET_KEY = 'sk_test_123'
    process.env.VERCEL_URL = undefined
  })

  it('should create a checkout session with valid priceId', async () => {
    const mockSession = {
      id: 'cs_test_123',
      url: 'https://checkout.stripe.com/test',
    }

    createCheckoutSession.mockResolvedValueOnce(mockSession)

    const request = {
      json: async () => ({ priceId: 'price_test_123' }),
    } as unknown as NextRequest

    const response = await POST(request)
    const data = await response.json()

    expect(response.status).toBe(200)
    expect(data.url).toBe('https://checkout.stripe.com/test')
  })

  it('should return 400 for missing priceId', async () => {
    const request = {
      json: async () => ({ courseSlug: 'test' }),
    } as unknown as NextRequest

    const response = await POST(request)
    const data = await response.json()

    expect(response.status).toBe(400)
    expect(data.error).toBe('Invalid request data')
  })

  it('should return 500 if Stripe is not configured', async () => {
    process.env.STRIPE_SECRET_KEY = ''

    const request = {
      json: async () => ({ priceId: 'price_test_123' }),
    } as unknown as NextRequest

    const response = await POST(request)
    const data = await response.json()

    expect(response.status).toBe(500)
  })

  it('should handle Stripe errors gracefully', async () => {
    createCheckoutSession.mockRejectedValueOnce(new Error('Stripe error'))

    const request = {
      json: async () => ({ priceId: 'price_test_123' }),
    } as unknown as NextRequest

    const response = await POST(request)
    const data = await response.json()

    expect(response.status).toBe(500)
    expect(data.error).toBe('Failed to create checkout session')
  })
})
