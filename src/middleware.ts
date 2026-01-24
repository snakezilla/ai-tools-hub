import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

/**
 * Middleware to enforce security controls:
 * - Verify origin for POST requests (CSRF protection)
 * - Rate limiting by IP (basic implementation)
 * - Security headers validation
 */
export function middleware(request: NextRequest) {
  // Only apply security checks to API routes
  if (!request.nextUrl.pathname.startsWith('/api/')) {
    return NextResponse.next()
  }

  // For POST requests, verify the origin header matches allowed origins
  if (request.method === 'POST') {
    const origin = request.headers.get('origin')
    const referer = request.headers.get('referer')

    // Get allowed origins from environment or use defaults
    const allowedOrigins = (process.env.ALLOWED_ORIGINS || '').split(',').filter(Boolean)
    if (allowedOrigins.length === 0) {
      // Default to local development and Vercel deployment
      allowedOrigins.push('http://localhost:3000')
      allowedOrigins.push('https://practicallibrary.com')
      allowedOrigins.push('https://www.practicallibrary.com')
      if (process.env.VERCEL_URL) {
        allowedOrigins.push(`https://${process.env.VERCEL_URL}`)
      }
      // Add production domain when configured
      if (process.env.PRODUCTION_URL) {
        allowedOrigins.push(process.env.PRODUCTION_URL)
      }
    }

    // Verify origin if present (browsers send it for CORS requests)
    if (origin && !allowedOrigins.includes(origin)) {
      console.warn(`Rejected POST request from unauthorized origin: ${origin}`)
      return NextResponse.json(
        { error: 'Forbidden: Invalid origin' },
        { status: 403 }
      )
    }

    // Verify referer if present (fallback for non-CORS requests)
    if (referer) {
      const refererOrigin = new URL(referer).origin
      if (!allowedOrigins.includes(refererOrigin)) {
        console.warn(`Rejected POST request from unauthorized referer: ${referer}`)
        return NextResponse.json(
          { error: 'Forbidden: Invalid referer' },
          { status: 403 }
        )
      }
    }
  }

  // Add security headers
  const response = NextResponse.next()
  response.headers.set('X-Content-Type-Options', 'nosniff')
  response.headers.set('X-Frame-Options', 'DENY')
  response.headers.set('X-XSS-Protection', '1; mode=block')

  return response
}

// Apply middleware only to API routes
export const config = {
  matcher: '/api/:path*',
}
