import { NextRequest, NextResponse } from 'next/server'
import { constructWebhookEvent } from '@/lib/stripe'
import { Resend } from 'resend'

export async function POST(request: NextRequest): Promise<NextResponse> {
  try {
    const resend = new Resend(process.env.RESEND_API_KEY || '')
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
        const session = event.data.object as any

        if (session.customer_email) {
          await resend.emails.send({
            from: process.env.FROM_EMAIL || 'noreply@practicallibrary.com',
            to: session.customer_email,
            subject: 'Order Confirmation - AI Tools Hub',
            html: `
              <h2>Thank you for your purchase!</h2>
              <p>Your order has been confirmed.</p>
              <p><strong>Order ID:</strong> ${session.id}</p>
              <p><strong>Amount:</strong> $${(session.amount_total / 100).toFixed(2)}</p>
              <p>You'll receive course access details shortly.</p>
            `,
          })
        }

        console.log('Payment confirmed:', {
          sessionId: session.id,
          email: session.customer_email,
          amount: session.amount_total,
        })

        return NextResponse.json({ received: true }, { status: 200 })
      }

      case 'charge.refunded': {
        const charge = event.data.object as any

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
        const paymentIntent = event.data.object as any

        console.log('Payment failed:', {
          paymentIntentId: paymentIntent.id,
          lastPaymentError: paymentIntent.last_payment_error,
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
