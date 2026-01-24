import { NextRequest, NextResponse } from 'next/server'

interface ContactRequest {
  name: string
  email: string
  type: 'question' | 'feedback' | 'workshop' | 'partnership'
  message: string
}

interface ContactResponse {
  success?: boolean
  error?: string
}

// Mock implementation - will be replaced with actual Resend email service
export async function POST(request: NextRequest): Promise<NextResponse<ContactResponse>> {
  try {
    const body: ContactRequest = await request.json()

    // Validate required fields
    if (!body.name || !body.email || !body.message) {
      return NextResponse.json(
        { error: 'Name, email, and message are required' },
        { status: 400 }
      )
    }

    // Validate email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    if (!emailRegex.test(body.email)) {
      return NextResponse.json(
        { error: 'Invalid email address' },
        { status: 400 }
      )
    }

    // TODO: Implement actual Resend email integration
    // Steps:
    // 1. Send email notification to admin
    // 2. Send auto-reply to user
    // 3. Log to Airtable (optional)

    console.log('Contact form submission:', {
      name: body.name,
      email: body.email,
      type: body.type,
      message: body.message,
      timestamp: new Date().toISOString(),
    })

    return NextResponse.json(
      { success: true },
      { status: 200 }
    )
  } catch (error) {
    console.error('Contact form error:', error)
    return NextResponse.json(
      { error: 'Failed to process contact request' },
      { status: 500 }
    )
  }
}
