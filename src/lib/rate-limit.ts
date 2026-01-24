/**
 * Simple in-memory rate limiting for API endpoints
 * Uses sliding window algorithm with per-identifier tracking
 *
 * Notes:
 * - Resets on server restart/redeploy (acceptable for launch)
 * - Can be upgraded to Upstash Redis post-launch if needed
 * - Includes automatic memory cleanup to prevent unbounded growth
 */

export interface RateLimitConfig {
  windowMs: number // Time window in milliseconds
  maxRequests: number // Max requests allowed per window
}

interface RateLimitEntry {
  timestamps: number[]
  email?: string
}

export interface RateLimitResult {
  allowed: boolean
  retryAfter?: number // Seconds until next request allowed
  reason?: 'ip' | 'email'
}

// In-memory stores for tracking rate limits
const ipLimits = new Map<string, RateLimitEntry>()
const emailLimits = new Map<string, RateLimitEntry>()

/**
 * Rate limit configuration for contact form
 * - Per IP: 5 requests per hour (prevents bot spam)
 * - Per email: 3 requests per day (prevents duplicate submissions)
 */
export const RATE_LIMITS = {
  contact: {
    perIP: { windowMs: 60 * 60 * 1000, maxRequests: 5 }, // 5/hour
    perEmail: { windowMs: 24 * 60 * 60 * 1000, maxRequests: 3 }, // 3/day
  },
} as const

/**
 * Check if a request is allowed under rate limiting
 * Uses sliding window algorithm
 *
 * @param identifier - Unique identifier (IP, email, etc.)
 * @param config - Rate limit configuration
 * @param store - Map to store request timestamps
 * @returns Object with allowed status and optional retryAfter
 */
export function checkRateLimit(
  identifier: string,
  config: RateLimitConfig,
  store: Map<string, RateLimitEntry>
): RateLimitResult {
  const now = Date.now()
  const entry = store.get(identifier) || { timestamps: [] }

  // Remove expired timestamps (outside the window)
  const validTimestamps = entry.timestamps.filter(
    (ts) => now - ts < config.windowMs
  )

  // Check if at limit
  if (validTimestamps.length >= config.maxRequests) {
    const oldestTimestamp = validTimestamps[0]
    const retryAfterMs = oldestTimestamp + config.windowMs - now
    const retryAfterSeconds = Math.ceil(retryAfterMs / 1000)

    return { allowed: false, retryAfter: retryAfterSeconds }
  }

  // Add current request timestamp
  validTimestamps.push(now)
  store.set(identifier, { timestamps: validTimestamps })

  return { allowed: true }
}

/**
 * Check contact form rate limits (IP + email)
 * Checks IP limit first (faster to reject bots), then email limit
 *
 * @param ip - Client IP address
 * @param email - Submitted email address
 * @returns Rate limit result with reason if rejected
 */
export function checkContactRateLimit(
  ip: string,
  email: string
): RateLimitResult {
  // Check IP limit first (faster rejection for bots)
  const ipCheck = checkRateLimit(ip, RATE_LIMITS.contact.perIP, ipLimits)
  if (!ipCheck.allowed) {
    return { ...ipCheck, reason: 'ip' }
  }

  // Check email limit (prevent legitimate duplicate submissions)
  const emailCheck = checkRateLimit(
    email,
    RATE_LIMITS.contact.perEmail,
    emailLimits
  )
  if (!emailCheck.allowed) {
    return { ...emailCheck, reason: 'email' }
  }

  return { allowed: true }
}

/**
 * Cleanup old entries to prevent unbounded memory growth
 * Runs automatically every hour
 * Removes entries with no valid timestamps within their window
 */
function cleanupOldEntries(): void {
  const now = Date.now()

  // Cleanup IP limits
  for (const [key, entry] of ipLimits.entries()) {
    const validTimestamps = entry.timestamps.filter(
      (ts) => now - ts < RATE_LIMITS.contact.perIP.windowMs
    )
    if (validTimestamps.length === 0) {
      ipLimits.delete(key)
    } else {
      entry.timestamps = validTimestamps
    }
  }

  // Cleanup email limits
  for (const [key, entry] of emailLimits.entries()) {
    const validTimestamps = entry.timestamps.filter(
      (ts) => now - ts < RATE_LIMITS.contact.perEmail.windowMs
    )
    if (validTimestamps.length === 0) {
      emailLimits.delete(key)
    } else {
      entry.timestamps = validTimestamps
    }
  }
}

// Schedule cleanup to run every hour
const cleanupInterval = setInterval(cleanupOldEntries, 60 * 60 * 1000)

// Allow cleanup to be canceled (for tests)
cleanupInterval.unref?.()
