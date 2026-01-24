import { POST } from '../route'
import { NextRequest } from 'next/server'

// Mock dependencies
jest.mock('@/lib/stripe', () => ({
  constructWebhookEvent: jest.fn(),
}))

jest.mock('resend', () => ({
  Resend: jest.fn().mockImplementation(() => ({
    emails: {
      send: jest.fn().mockResolvedValue({ id: 'email_123' }),
    },
  })),
}))

describe('/api/webhook', () => {
  const { constructWebhookEvent } = require('@/lib/stripe')

  beforeEach(() => {
    jest.clearAllMocks()
    process.env.STRIPE_WEBHOOK_SECRET = 'whsec_test_123'
    process.env.RESEND_API_KEY = 're_test_123'
    process.env.FROM_EMAIL = 'noreply@test.com'
  })

  it('should return 400 if signature header is missing', async () => {
    const request = {
      text: async () => '{"type":"checkout.session.completed"}',
      headers: new Map(),
    } as unknown as NextRequest

    const response = await POST(request)
    const data = await response.json()

    expect(response.status).toBe(400)
    expect(data.error).toBe('Missing signature header')
  })

  it('should process checkout.session.completed event', async () => {
    const mockEvent = {
      type: 'checkout.session.completed',
      data: {
        object: {
          id: 'cs_test_123',
          customer_email: 'test@example.com',
          amount_total: 6700,
        },
      },
    }

    constructWebhookEvent.mockReturnValueOnce(mockEvent)

    const headers = new Map()
    headers.set('stripe-signature', 'sig_test')

    const request = {
      text: async () => 'raw_body',
      headers,
    } as unknown as NextRequest

    const response = await POST(request)
    const data = await response.json()

    expect(response.status).toBe(200)
    expect(data.received).toBe(true)
  })

  it('should handle invalid signatures', async () => {
    const error = new Error('No signatures found')
    constructWebhookEvent.mockImplementationOnce(() => {
      throw error
    })

    const headers = new Map()
    headers.set('stripe-signature', 'sig_invalid')

    const request = {
      text: async () => 'raw_body',
      headers,
    } as unknown as NextRequest

    const response = await POST(request)
    const data = await response.json()

    expect(response.status).toBe(400)
    expect(data.error).toBe('Invalid signature')
  })

  it('should handle unhandled event types', async () => {
    const mockEvent = {
      type: 'payment_method.attached',
      data: { object: { id: 'pm_123' } },
    }

    constructWebhookEvent.mockReturnValueOnce(mockEvent)

    const headers = new Map()
    headers.set('stripe-signature', 'sig_test')

    const request = {
      text: async () => 'raw_body',
      headers,
    } as unknown as NextRequest

    const response = await POST(request)
    const data = await response.json()

    expect(response.status).toBe(200)
    expect(data.received).toBe(true)
  })
})
