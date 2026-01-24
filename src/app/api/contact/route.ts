import { NextRequest, NextResponse } from 'next/server'
import { Resend } from 'resend'
import { z } from 'zod'

interface ContactResponse {
  success?: boolean
  error?: string
}

// Validate Resend API key is configured
const resendApiKey = process.env.RESEND_API_KEY
if (!resendApiKey) {
  console.error('CRITICAL: RESEND_API_KEY is not configured. Contact form emails will fail.')
}

// Zod schema for contact form validation
const contactSchema = z.object({
  name: z.string().min(1).max(100).trim(),
  email: z.string().email().max(255),
  type: z.enum(['question', 'feedback', 'workshop', 'partnership']),
  message: z.string().min(10).max(5000).trim(),
})

export async function POST(request: NextRequest): Promise<NextResponse<ContactResponse>> {
  try {
    const body = await request.json()

    // Validate all fields using Zod schema
    const validated = contactSchema.parse(body)

    // Early return if Resend is not configured
    if (!resendApiKey) {
      console.error('Cannot send emails: RESEND_API_KEY not configured')
      return NextResponse.json(
        { error: 'Email service unavailable. Please try again later.' },
        { status: 503 }
      )
    }

    const resend = new Resend(resendApiKey)

    // Send admin notification
    if (process.env.ADMIN_EMAIL) {
      await resend.emails.send({
        from: process.env.FROM_EMAIL || 'noreply@practicallibrary.com',
        to: process.env.ADMIN_EMAIL,
        subject: `New Contact Form: ${validated.type}`,
        html: `
          <h2>New Contact Form Submission</h2>
          <p><strong>Name:</strong> ${escapeHtml(validated.name)}</p>
          <p><strong>Email:</strong> ${escapeHtml(validated.email)}</p>
          <p><strong>Type:</strong> ${escapeHtml(validated.type)}</p>
          <p><strong>Message:</strong></p>
          <p>${escapeHtml(validated.message).replace(/\n/g, '<br>')}</p>
        `,
      })
    }

    // Send auto-reply to user
    await resend.emails.send({
      from: process.env.FROM_EMAIL || 'noreply@practicallibrary.com',
      to: validated.email,
      subject: 'We received your message - AI Tools Hub',
      html: `
        <h2>Thank you for reaching out!</h2>
        <p>Hi ${escapeHtml(validated.name)},</p>
        <p>We received your message and will get back to you within 24 hours.</p>
        <p>If you have any questions in the meantime, feel free to reply to this email.</p>
        <p>Best regards,<br>The AI Tools Hub Team</p>
      `,
    })

    // Log only safe, non-PII data
    console.log('Contact form submission:', {
      emailDomain: validated.email.split('@')[1],
      type: validated.type,
      timestamp: new Date().toISOString(),
    })

    return NextResponse.json(
      { success: true },
      { status: 200 }
    )
  } catch (error) {
    if (error instanceof z.ZodError) {
      return NextResponse.json(
        { error: 'Invalid request data' },
        { status: 400 }
      )
    }

    console.error('Contact form error:', error)
    return NextResponse.json(
      { error: 'Failed to process contact request' },
      { status: 500 }
    )
  }
}

/**
 * Escape HTML entities to prevent XSS attacks in email templates
 */
function escapeHtml(text: string): string {
  const map: { [key: string]: string } = {
    '&': '&amp;',
    '<': '&lt;',
    '>': '&gt;',
    '"': '&quot;',
    "'": '&#39;',
  }
  return text.replace(/[&<>"']/g, (char) => map[char])
}
