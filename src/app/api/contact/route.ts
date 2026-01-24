import { NextRequest, NextResponse } from 'next/server'
import { Resend } from 'resend'

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
    const resend = new Resend(process.env.RESEND_API_KEY || '')
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

    // Send admin notification
    if (process.env.ADMIN_EMAIL) {
      await resend.emails.send({
        from: process.env.FROM_EMAIL || 'noreply@practicallibrary.com',
        to: process.env.ADMIN_EMAIL,
        subject: `New Contact Form: ${body.type}`,
        html: `
          <h2>New Contact Form Submission</h2>
          <p><strong>Name:</strong> ${body.name}</p>
          <p><strong>Email:</strong> ${body.email}</p>
          <p><strong>Type:</strong> ${body.type}</p>
          <p><strong>Message:</strong></p>
          <p>${body.message.replace(/\n/g, '<br>')}</p>
        `,
      })
    }

    // Send auto-reply to user
    await resend.emails.send({
      from: process.env.FROM_EMAIL || 'noreply@practicallibrary.com',
      to: body.email,
      subject: 'We received your message - AI Tools Hub',
      html: `
        <h2>Thank you for reaching out!</h2>
        <p>Hi ${body.name},</p>
        <p>We received your message and will get back to you within 24 hours.</p>
        <p>If you have any questions in the meantime, feel free to reply to this email.</p>
        <p>Best regards,<br>The AI Tools Hub Team</p>
      `,
    })

    console.log('Contact form submission:', {
      name: body.name,
      email: body.email,
      type: body.type,
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
