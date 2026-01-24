import { NextRequest, NextResponse } from 'next/server'
import { Resend } from 'resend'
import { z } from 'zod'
import { contactSchema } from '@/lib/validators'
import { checkContactRateLimit, RATE_LIMITS } from '@/lib/rate-limit'

interface ContactResponse {
  success?: boolean
  error?: string
}

// Validate Resend API key is configured
const resendApiKey = process.env.RESEND_API_KEY
if (!resendApiKey) {
  console.error('CRITICAL: RESEND_API_KEY is not configured. Contact form emails will fail.')
}

export async function POST(request: NextRequest): Promise<NextResponse<ContactResponse>> {
  try {
    // Extract client IP for rate limiting
    const ip =
      request.headers.get('x-forwarded-for')?.split(',')[0].trim() ||
      request.headers.get('x-real-ip') ||
      'unknown'

    const body = await request.json()

    // Validate all fields using Zod schema
    const validated = contactSchema.parse(body)

    // Check rate limits (by IP and email)
    const rateLimitResult = checkContactRateLimit(ip, validated.email)
    if (!rateLimitResult.allowed) {
      const retryAfter = rateLimitResult.retryAfter || 60
      return NextResponse.json(
        {
          error: `Too many requests. Please try again in ${retryAfter} seconds.`,
        },
        {
          status: 429,
          headers: {
            'Retry-After': String(retryAfter),
            'X-RateLimit-Limit': String(RATE_LIMITS.contact.perIP.maxRequests),
            'X-RateLimit-Window': `${RATE_LIMITS.contact.perIP.windowMs / 1000}s`,
          },
        }
      )
    }

    // Early return if Resend is not configured
    if (!resendApiKey) {
      console.error('Cannot send emails: RESEND_API_KEY not configured')
      return NextResponse.json(
        { error: 'Email service unavailable. Please try again later.' },
        { status: 503 }
      )
    }

    const resend = new Resend(resendApiKey)

    // Use Resend's test address if no verified domain is configured
    const fromEmail = process.env.FROM_EMAIL || 'Practical Library <onboarding@resend.dev>'
    const adminEmail = process.env.ADMIN_EMAIL || 'eslamiahsan@gmail.com'

    // Send admin notification
    await resend.emails.send({
      from: fromEmail,
      to: adminEmail,
      replyTo: validated.email,
      subject: 'PracticalLibrary Reach Out',
      html: `
        <h2>New Contact Form Submission</h2>
        <p><strong>Name:</strong> ${escapeHtml(validated.name)}</p>
        <p><strong>Email:</strong> ${escapeHtml(validated.email)}</p>
        <p><strong>Type:</strong> ${escapeHtml(validated.type)}</p>
        <p><strong>Message:</strong></p>
        <p>${escapeHtml(validated.message).replace(/\n/g, '<br>')}</p>
      `,
    })

    // Send auto-reply to user
    await resend.emails.send({
      from: fromEmail,
      to: validated.email,
      subject: 'We received your message - Practical Library',
      html: `
        <h2>Thank you for reaching out!</h2>
        <p>Hi ${escapeHtml(validated.name)},</p>
        <p>We received your message and will get back to you within 2-4 hours.</p>
        <p>If you have any questions in the meantime, feel free to reply to this email.</p>
        <p>Best regards,<br>The Practical Library Team</p>
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
      {
        status: 200,
        headers: {
          'X-RateLimit-Limit': String(RATE_LIMITS.contact.perIP.maxRequests),
          'X-RateLimit-Window': `${RATE_LIMITS.contact.perIP.windowMs / 1000}s`,
        },
      }
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
