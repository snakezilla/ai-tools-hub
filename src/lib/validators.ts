import { z } from 'zod'

/**
 * Contact form validation schema
 * Used by both client-side and server-side validation
 */
export const contactSchema = z.object({
  name: z
    .string()
    .min(1, 'Name is required')
    .max(100, 'Name must be less than 100 characters')
    .trim(),
  email: z
    .string()
    .email('Please enter a valid email address')
    .max(255, 'Email must be less than 255 characters'),
  type: z.enum(['question', 'feedback', 'workshop', 'partnership'], {
    errorMap: () => ({ message: 'Please select a valid category' }),
  }),
  message: z
    .string()
    .min(10, 'Message must be at least 10 characters')
    .max(5000, 'Message must be less than 5000 characters')
    .trim(),
})

export type ContactFormData = z.infer<typeof contactSchema>

/**
 * Email validation with additional checks
 */
export const emailSchema = z
  .string()
  .email('Invalid email address')
  .refine(
    (email) => {
      // Check for common typos (optional enhancement)
      const commonTypos: Record<string, string> = {
        'gmial.com': 'gmail.com',
        'gmai.com': 'gmail.com',
        'yahooo.com': 'yahoo.com',
        'hotmial.com': 'hotmail.com',
      }
      const domain = email.split('@')[1]
      return !commonTypos[domain]
    },
    {
      message: 'Did you mean a different email domain? Please check for typos.',
    }
  )

/**
 * Message validation with length info
 */
export const messageSchema = z
  .string()
  .min(10, 'Message must be at least 10 characters')
  .max(5000, 'Message must be less than 5000 characters')
  .refine(
    (msg) => msg.trim().length > 0,
    'Message cannot be just whitespace'
  )
