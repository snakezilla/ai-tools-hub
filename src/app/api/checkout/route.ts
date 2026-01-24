import { NextRequest, NextResponse } from 'next/server'
import { createCheckoutSession } from '@/lib/stripe'
import { z } from 'zod'

const checkoutSchema = z.object({
  priceId: z.string().min(1, 'Price ID is required'),
  courseSlug: z.string().optional(),
})

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { priceId, courseSlug } = checkoutSchema.parse(body)

    if (!process.env.STRIPE_SECRET_KEY) {
      throw new Error('STRIPE_SECRET_KEY not configured')
    }

    const baseUrl = process.env.VERCEL_URL
      ? `https://${process.env.VERCEL_URL}`
      : 'http://localhost:3000'

    const session = await createCheckoutSession(
      priceId,
      `${baseUrl}/success?session_id={CHECKOUT_SESSION_ID}`,
      `${baseUrl}/cancel`,
      courseSlug ? { courseSlug, timestamp: new Date().toISOString() } : undefined
    )

    if (!session.url) {
      throw new Error('Failed to create checkout session')
    }

    return NextResponse.json({ url: session.url })
  } catch (error) {
    if (error instanceof z.ZodError) {
      return NextResponse.json(
        { error: 'Invalid request data', details: error.errors },
        { status: 400 }
      )
    }

    if (error instanceof Error) {
      console.error('Checkout error:', error.message, error.stack)
      // In development, show more details
      const isDev = process.env.NODE_ENV === 'development'
      return NextResponse.json(
        { error: isDev ? error.message : 'Failed to create checkout session' },
        { status: 500 }
      )
    }

    console.error('Checkout error:', error)
    return NextResponse.json(
      { error: 'An unexpected error occurred' },
      { status: 500 }
    )
  }
}
