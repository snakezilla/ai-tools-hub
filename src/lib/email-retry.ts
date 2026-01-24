import { Resend } from 'resend'

/**
 * Configuration for email retry logic
 */
export interface RetryConfig {
  maxRetries: number // Total number of retries (not including initial attempt)
  initialDelayMs: number // Initial delay in milliseconds
  maxDelayMs: number // Maximum delay in milliseconds (cap for backoff)
}

/**
 * Default retry configuration
 * 3 retries with 1s initial delay, capped at 10s
 * Total attempts: up to 4 (1 initial + 3 retries)
 */
export const DEFAULT_RETRY_CONFIG: RetryConfig = {
  maxRetries: 3,
  initialDelayMs: 1000,
  maxDelayMs: 10000,
}

/**
 * Send email with exponential backoff retry logic
 *
 * Uses exponential backoff strategy to retry failed email sends:
 * - Delay = initialDelayMs * 2^attemptNumber (capped at maxDelayMs)
 * - Example with defaults: 1s, 2s, 4s delays between retries
 *
 * @param resend - Initialized Resend client
 * @param params - Email parameters (from, to, subject, html)
 * @param config - Retry configuration (uses defaults if not provided)
 * @throws Error if all retry attempts fail
 */
export async function sendEmailWithRetry(
  resend: Resend,
  params: {
    from: string
    to: string
    subject: string
    html: string
  },
  config: RetryConfig = DEFAULT_RETRY_CONFIG
): Promise<void> {
  let lastError: Error | null = null

  // Total attempts = 1 initial + config.maxRetries
  for (let attempt = 0; attempt <= config.maxRetries; attempt++) {
    try {
      await resend.emails.send(params)

      // Success!
      if (attempt > 0) {
        console.log(
          `Email sent successfully after ${attempt} retries`,
          {
            to: params.to,
            timestamp: new Date().toISOString(),
          }
        )
      }

      return
    } catch (error) {
      lastError = error instanceof Error ? error : new Error(String(error))

      // If this is not the last attempt, wait before retrying
      if (attempt < config.maxRetries) {
        // Calculate exponential backoff delay
        const delayMs = Math.min(
          config.initialDelayMs * Math.pow(2, attempt),
          config.maxDelayMs
        )

        console.warn(
          `Email send failed (attempt ${attempt + 1}/${config.maxRetries + 1}), retrying in ${delayMs}ms`,
          {
            error: lastError.message,
            to: params.to,
          }
        )

        // Wait before retrying
        await new Promise((resolve) => setTimeout(resolve, delayMs))
      }
    }
  }

  // All retries exhausted
  console.error(
    'Email send failed after all retries:',
    lastError,
    {
      to: params.to,
      attempts: config.maxRetries + 1,
    }
  )

  throw lastError || new Error('Email send failed')
}
