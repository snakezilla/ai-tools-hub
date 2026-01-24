import { POST } from '../route'
import { NextRequest } from 'next/server'

jest.mock('resend', () => ({
  Resend: jest.fn().mockImplementation(() => ({
    emails: {
      send: jest.fn().mockResolvedValue({ id: 'email_123' }),
    },
  })),
}))

describe('/api/contact', () => {
  beforeEach(() => {
    jest.clearAllMocks()
    process.env.RESEND_API_KEY = 're_test_123'
    process.env.FROM_EMAIL = 'noreply@test.com'
    process.env.ADMIN_EMAIL = 'admin@test.com'
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
})
