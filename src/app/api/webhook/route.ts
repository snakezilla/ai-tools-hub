import { NextRequest, NextResponse } from 'next/server'
import { constructWebhookEvent } from '@/lib/stripe'
import { sendEmailWithRetry } from '@/lib/email-retry'
import { Resend } from 'resend'
import Stripe from 'stripe'

/**
 * In-memory store of processed webhook event IDs
 * Prevents duplicate processing if Stripe retries webhook delivery
 * Map: eventId -> timestamp when processed
 */
const processedEvents = new Map<string, number>()

/**
 * Maximum age for webhook events (5 minutes)
 * Prevents replay attacks with old webhook signatures
 */
const MAX_WEBHOOK_AGE_MS = 5 * 60 * 1000

/**
 * Event ID retention period (24 hours)
 * After this time, event IDs are forgotten and duplicates would be re-processed
 * Long enough for Stripe's retry window (3 days) but shorter to prevent memory leak
 */
const EVENT_ID_RETENTION_MS = 24 * 60 * 60 * 1000

// Validate Resend API key is configured
const resendApiKey = process.env.RESEND_API_KEY
if (!resendApiKey) {
  console.error('CRITICAL: RESEND_API_KEY is not configured. Email notifications will fail.')
}

export async function POST(request: NextRequest): Promise<NextResponse> {
  try {
    const signature = request.headers.get('stripe-signature')
    if (!signature) {
      return NextResponse.json(
        { error: 'Missing stripe-signature header' },
        { status: 400 }
      )
    }

    const body = await request.text()

    // Verify and construct the webhook event
    const event = constructWebhookEvent(body, signature)

    // Validate webhook timestamp (prevent replay attacks)
    // Stripe signature format: t=<timestamp>,v1=<signature>
    const signatureParts = signature.split(',')
    const timestampPart = signatureParts.find((part) => part.startsWith('t='))
    if (timestampPart) {
      const webhookTimestampS = parseInt(timestampPart.split('=')[1])
      const webhookTimestampMs = webhookTimestampS * 1000
      const now = Date.now()
      const age = now - webhookTimestampMs

      if (age > MAX_WEBHOOK_AGE_MS) {
        console.warn('Webhook timestamp too old', {
          eventId: event.id,
          ageSeconds: Math.floor(age / 1000),
          maxSeconds: Math.floor(MAX_WEBHOOK_AGE_MS / 1000),
        })
        return NextResponse.json(
          { error: 'Webhook timestamp too old' },
          { status: 400 }
        )
      }
    }

    // Check for duplicate/idempotent processing
    if (processedEvents.has(event.id)) {
      console.log('Duplicate webhook event ignored', {
        eventId: event.id,
        type: event.type,
      })
      // Return success to acknowledge receipt (Stripe expects 200)
      return NextResponse.json({ received: true }, { status: 200 })
    }

    // Mark event as processed
    processedEvents.set(event.id, Date.now())

    // Handle different event types
    switch (event.type) {
      case 'checkout.session.completed': {
        const session = event.data.object as Stripe.Checkout.Session

        if (session.customer_email && resendApiKey) {
          const resend = new Resend(resendApiKey)

          // Format amount safely without exposing raw data
          const amountFormatted = session.amount_total
            ? `$${(session.amount_total / 100).toFixed(2)}`
            : 'amount pending'

          try {
            // Send confirmation email with retry logic
            await sendEmailWithRetry(resend, {
              from: process.env.FROM_EMAIL || 'noreply@practicallibrary.com',
              to: session.customer_email,
              subject: 'Order Confirmation - AI Tools Hub',
              html: `
                <h2>Thank you for your purchase!</h2>
                <p>Your order has been confirmed.</p>
                <p><strong>Order ID:</strong> ${escapeHtml(session.id)}</p>
                <p><strong>Amount:</strong> ${escapeHtml(amountFormatted)}</p>
                <p>You'll receive course access details shortly.</p>
              `,
            })
          } catch (emailError) {
            // Log but don't fail webhook processing
            // Stripe will retry the webhook if we return 5xx
            console.error('Failed to send confirmation email after retries', {
              sessionId: session.id,
              to: session.customer_email,
              error: emailError instanceof Error ? emailError.message : String(emailError),
            })
          }
        }

        // Log only safe, non-PII data
        console.log('Payment confirmed:', {
          sessionId: session.id,
          emailDomain: session.customer_email?.split('@')[1],
          amount: session.amount_total,
          timestamp: new Date().toISOString(),
        })

        return NextResponse.json({ received: true }, { status: 200 })
      }

      case 'charge.refunded': {
        const charge = event.data.object as Stripe.Charge

        console.log('Charge refunded:', {
          chargeId: charge.id,
          amount: charge.amount,
          timestamp: new Date().toISOString(),
        })

        // Send refund confirmation email
        if (charge.receipt_email && resendApiKey) {
          const resend = new Resend(resendApiKey)
          const amountFormatted = `$${(charge.amount / 100).toFixed(2)}`

          try {
            await sendEmailWithRetry(resend, {
              from: process.env.FROM_EMAIL || 'noreply@practicallibrary.com',
              to: charge.receipt_email,
              subject: 'Refund Processed - AI Tools Hub',
              html: `
                <h2>Your refund has been processed</h2>
                <p>A refund of ${escapeHtml(amountFormatted)} has been issued to your original payment method.</p>
                <p><strong>Charge ID:</strong> ${escapeHtml(charge.id)}</p>
                <p>Please allow 5-10 business days for the refund to appear on your statement.</p>
              `,
            })
          } catch (emailError) {
            console.error('Failed to send refund email after retries', {
              chargeId: charge.id,
              to: charge.receipt_email,
              error: emailError instanceof Error ? emailError.message : String(emailError),
            })
          }
        }

        // TODO (post-launch with database):
        // 1. Revoke access to purchased content
        // 2. Update order status in database

        return NextResponse.json({ received: true }, { status: 200 })
      }

      case 'payment_intent.payment_failed': {
        const paymentIntent = event.data.object as Stripe.PaymentIntent

        console.log('Payment failed:', {
          paymentIntentId: paymentIntent.id,
          timestamp: new Date().toISOString(),
        })

        // Send payment failure notification email
        if (paymentIntent.receipt_email && resendApiKey) {
          const resend = new Resend(resendApiKey)

          try {
            await sendEmailWithRetry(resend, {
              from: process.env.FROM_EMAIL || 'noreply@practicallibrary.com',
              to: paymentIntent.receipt_email,
              subject: 'Payment Failed - AI Tools Hub',
              html: `
                <h2>Payment Failed</h2>
                <p>We were unable to process your payment for the AI Tools Hub course.</p>
                <p>Please check your payment method and try again. If you continue to experience issues, please contact support.</p>
                <p><strong>Payment Intent ID:</strong> ${escapeHtml(paymentIntent.id)}</p>
              `,
            })
          } catch (emailError) {
            console.error('Failed to send payment failure email after retries', {
              paymentIntentId: paymentIntent.id,
              to: paymentIntent.receipt_email,
              error: emailError instanceof Error ? emailError.message : String(emailError),
            })
          }
        }

        return NextResponse.json({ received: true }, { status: 200 })
      }

      default:
        console.log('Unhandled event type:', event.type)
        return NextResponse.json({ received: true }, { status: 200 })
    }
  } catch (error) {
    if (error instanceof Error && error.message.includes('No signatures found')) {
      return NextResponse.json(
        { error: 'Invalid webhook signature' },
        { status: 403 }
      )
    }

    console.error('Webhook error:', error)
    return NextResponse.json(
      { error: 'Webhook processing failed' },
      { status: 500 }
    )
  }
}

/**
 * Cleanup old event IDs to prevent unbounded memory growth
 * Removes entries older than EVENT_ID_RETENTION_MS
 */
function cleanupOldEventIds(): void {
  const now = Date.now()
  for (const [eventId, timestamp] of processedEvents.entries()) {
    if (now - timestamp > EVENT_ID_RETENTION_MS) {
      processedEvents.delete(eventId)
    }
  }
}

/**
 * Schedule periodic cleanup of old event IDs (every hour)
 */
const cleanupInterval = setInterval(() => {
  cleanupOldEventIds()
}, 60 * 60 * 1000)

// Allow cleanup to be canceled (for tests)
cleanupInterval.unref?.()

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
