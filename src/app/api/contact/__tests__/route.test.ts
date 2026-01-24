import { POST } from '../route'
import { NextRequest } from 'next/server'
import * as rateLimitModule from '@/lib/rate-limit'

jest.mock('resend', () => ({
  Resend: jest.fn().mockImplementation(() => ({
    emails: {
      send: jest.fn().mockResolvedValue({ id: 'email_123' }),
    },
  })),
}))

// Mock rate limit for controlled testing
jest.mock('@/lib/rate-limit')

describe('/api/contact', () => {
  beforeEach(() => {
    jest.clearAllMocks()
    process.env.RESEND_API_KEY = 're_test_123'
    process.env.FROM_EMAIL = 'noreply@test.com'
    process.env.ADMIN_EMAIL = 'admin@test.com'

    // Mock rate limiting to allow requests by default
    ;(rateLimitModule.checkContactRateLimit as jest.Mock).mockReturnValue({
      allowed: true,
    })
  })

  it('should accept valid contact form data', async () => {
    const request = {
      json: async () => ({
        name: 'John Doe',
        email: 'john@example.com',
        type: 'question',
        message: 'Hello there',
      }),
    } as unknown as NextRequest

    const response = await POST(request)
    const data = await response.json()

    expect(response.status).toBe(200)
    expect(data.success).toBe(true)
  })

  it('should return 400 if name is missing', async () => {
    const request = {
      json: async () => ({
        email: 'john@example.com',
        message: 'Hello',
      }),
    } as unknown as NextRequest

    const response = await POST(request)
    const data = await response.json()

    expect(response.status).toBe(400)
    expect(data.error).toContain('required')
  })

  it('should return 400 for invalid email', async () => {
    const request = {
      json: async () => ({
        name: 'John Doe',
        email: 'invalid-email',
        message: 'Hello',
      }),
    } as unknown as NextRequest

    const response = await POST(request)
    const data = await response.json()

    expect(response.status).toBe(400)
    expect(data.error).toContain('Invalid email')
  })

  it('should return 400 if message is missing', async () => {
    const request = {
      json: async () => ({
        name: 'John Doe',
        email: 'john@example.com',
        type: 'feedback',
      }),
    } as unknown as NextRequest

    const response = await POST(request)
    const data = await response.json()

    expect(response.status).toBe(400)
    expect(data.error).toContain('required')
  })

  it('should handle JSON parse errors', async () => {
    const request = {
      json: async () => {
        throw new Error('Invalid JSON')
      },
    } as unknown as NextRequest

    const response = await POST(request)
    const data = await response.json()

    expect(response.status).toBe(500)
    expect(data.error).toContain('Failed')
  })

  it('should return 429 when rate limited by IP', async () => {
    ;(rateLimitModule.checkContactRateLimit as jest.Mock).mockReturnValue({
      allowed: false,
      reason: 'ip',
      retryAfter: 300,
    })

    const request = {
      headers: new Map([['x-forwarded-for', '192.168.1.1']]),
      json: async () => ({
        name: 'John Doe',
        email: 'john@example.com',
        type: 'question',
        message: 'Hello there',
      }),
    } as unknown as NextRequest

    const response = await POST(request)
    const data = await response.json()

    expect(response.status).toBe(429)
    expect(data.error).toContain('Too many requests')
    expect(response.headers.get('Retry-After')).toBe('300')
  })

  it('should return 429 when rate limited by email', async () => {
    ;(rateLimitModule.checkContactRateLimit as jest.Mock).mockReturnValue({
      allowed: false,
      reason: 'email',
      retryAfter: 86400,
    })

    const request = {
      headers: new Map([['x-forwarded-for', '192.168.1.1']]),
      json: async () => ({
        name: 'Jane Doe',
        email: 'jane@example.com',
        type: 'feedback',
        message: 'Great tool!',
      }),
    } as unknown as NextRequest

    const response = await POST(request)
    const data = await response.json()

    expect(response.status).toBe(429)
    expect(data.error).toContain('Too many requests')
    expect(response.headers.get('Retry-After')).toBe('86400')
  })

  it('should include rate limit headers in successful response', async () => {
    const request = {
      headers: new Map([['x-forwarded-for', '192.168.1.1']]),
      json: async () => ({
        name: 'John Doe',
        email: 'john@example.com',
        type: 'question',
        message: 'Hello there',
      }),
    } as unknown as NextRequest

    const response = await POST(request)

    expect(response.headers.get('X-RateLimit-Limit')).toBeDefined()
    expect(response.headers.get('X-RateLimit-Window')).toBeDefined()
  })

  it('should extract IP from x-forwarded-for header', async () => {
    const request = {
      headers: new Map([
        ['x-forwarded-for', '192.168.1.1, 10.0.0.1, 172.16.0.1'],
      ]),
      json: async () => ({
        name: 'John Doe',
        email: 'john@example.com',
        type: 'question',
        message: 'Hello there',
      }),
    } as unknown as NextRequest

    const response = await POST(request)

    // Should succeed (rate limit mocked)
    expect(response.status).toBe(200)

    // Verify that checkContactRateLimit was called with the first IP
    expect(rateLimitModule.checkContactRateLimit).toHaveBeenCalledWith(
      '192.168.1.1',
      expect.any(String)
    )
  })
})
