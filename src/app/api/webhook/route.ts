import { NextRequest, NextResponse } from 'next/server'
import { constructWebhookEvent } from '@/lib/stripe'
import { Resend } from 'resend'
import Stripe from 'stripe'

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

          await resend.emails.send({
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

        // TODO: Implement actual actions:
        // 1. Revoke access to purchased content
        // 2. Send refund confirmation email
        // 3. Update order status in database

        return NextResponse.json({ received: true }, { status: 200 })
      }

      case 'payment_intent.payment_failed': {
        const paymentIntent = event.data.object as Stripe.PaymentIntent

        console.log('Payment failed:', {
          paymentIntentId: paymentIntent.id,
          timestamp: new Date().toISOString(),
        })

        // TODO: Send payment failure notification email

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
