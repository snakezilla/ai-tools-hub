import { sendEmailWithRetry, DEFAULT_RETRY_CONFIG } from '../email-retry'
import { Resend } from 'resend'

jest.mock('resend')

describe('email-retry utility', () => {
  let mockResend: jest.Mocked<Resend>
  let consoleLogSpy: jest.SpyInstance
  let consoleWarnSpy: jest.SpyInstance
  let consoleErrorSpy: jest.SpyInstance

  beforeEach(() => {
    jest.clearAllMocks()

    mockResend = {
      emails: {
        send: jest.fn().mockResolvedValue({ id: 'email_123' }),
      },
    } as unknown as jest.Mocked<Resend>

    consoleLogSpy = jest.spyOn(console, 'log').mockImplementation()
    consoleWarnSpy = jest.spyOn(console, 'warn').mockImplementation()
    consoleErrorSpy = jest.spyOn(console, 'error').mockImplementation()
  })

  afterEach(() => {
    consoleLogSpy.mockRestore()
    consoleWarnSpy.mockRestore()
    consoleErrorSpy.mockRestore()
  })

  describe('sendEmailWithRetry', () => {
    const emailParams = {
      from: 'noreply@test.com',
      to: 'user@example.com',
      subject: 'Test Email',
      html: '<h1>Test</h1>',
    }

    it('should send email successfully on first attempt', async () => {
      mockResend.emails.send.mockResolvedValueOnce({ id: 'email_success' })

      await sendEmailWithRetry(mockResend, emailParams)

      expect(mockResend.emails.send).toHaveBeenCalledTimes(1)
      expect(mockResend.emails.send).toHaveBeenCalledWith(emailParams)
    })

    it('should not log anything when email succeeds on first try', async () => {
      mockResend.emails.send.mockResolvedValueOnce({ id: 'email_success' })

      await sendEmailWithRetry(mockResend, emailParams)

      expect(consoleLogSpy).not.toHaveBeenCalled()
      expect(consoleWarnSpy).not.toHaveBeenCalled()
    })

    it('should retry with exponential backoff on failure', async () => {
      // Fail 2 times, then succeed
      mockResend.emails.send
        .mockRejectedValueOnce(new Error('Temporary failure'))
        .mockRejectedValueOnce(new Error('Temporary failure'))
        .mockResolvedValueOnce({ id: 'email_success' })

      const sleepSpy = jest.spyOn(global, 'setTimeout')

      await sendEmailWithRetry(mockResend, emailParams)

      expect(mockResend.emails.send).toHaveBeenCalledTimes(3)
      expect(sleepSpy).toHaveBeenCalled()

      sleepSpy.mockRestore()
    })

    it('should log success message when email sent after retries', async () => {
      mockResend.emails.send
        .mockRejectedValueOnce(new Error('Temporary failure'))
        .mockResolvedValueOnce({ id: 'email_success' })

      // Mock delays to speed up test
      const sleepMock = jest.spyOn(global, 'setTimeout').mockImplementation((fn) => {
        ;(fn as Function)()
        return 0 as any
      })

      await sendEmailWithRetry(mockResend, emailParams)

      expect(consoleLogSpy).toHaveBeenCalled()
      const logCall = consoleLogSpy.mock.calls[0][0]
      expect(logCall).toContain('sent successfully after 1 retries')

      sleepMock.mockRestore()
    })

    it('should throw error after max retries exhausted', async () => {
      const testError = new Error('Permanent failure')
      mockResend.emails.send.mockRejectedValue(testError)

      const sleepMock = jest.spyOn(global, 'setTimeout').mockImplementation((fn) => {
        ;(fn as Function)()
        return 0 as any
      })

      await expect(sendEmailWithRetry(mockResend, emailParams)).rejects.toThrow(
        'Permanent failure'
      )

      // Should have tried 4 times (initial + 3 retries)
      expect(mockResend.emails.send).toHaveBeenCalledTimes(4)

      sleepMock.mockRestore()
    })

    it('should log error after all retries exhausted', async () => {
      const testError = new Error('Permanent failure')
      mockResend.emails.send.mockRejectedValue(testError)

      const sleepMock = jest.spyOn(global, 'setTimeout').mockImplementation((fn) => {
        ;(fn as Function)()
        return 0 as any
      })

      try {
        await sendEmailWithRetry(mockResend, emailParams)
      } catch {
        // Expected to throw
      }

      expect(consoleErrorSpy).toHaveBeenCalled()
      const errorCall = consoleErrorSpy.mock.calls[0]
      expect(errorCall[0]).toContain('Email send failed after all retries')
      expect(errorCall[1]).toBeInstanceOf(Error)

      sleepMock.mockRestore()
    })

    it('should use exponential backoff formula correctly', async () => {
      mockResend.emails.send.mockRejectedValue(new Error('Failure'))

      const delays: number[] = []
      jest.spyOn(global, 'setTimeout').mockImplementation((fn, delay) => {
        delays.push(delay as number)
        ;(fn as Function)()
        return 0 as any
      })

      const config = {
        maxRetries: 3,
        initialDelayMs: 100,
        maxDelayMs: 1000,
      }

      try {
        await sendEmailWithRetry(mockResend, emailParams, config)
      } catch {
        // Expected to throw
      }

      // Delays should be: 100ms, 200ms, 400ms (capped at maxDelayMs)
      expect(delays).toEqual([100, 200, 400])
    })

    it('should cap delay at maxDelayMs', async () => {
      mockResend.emails.send.mockRejectedValue(new Error('Failure'))

      const delays: number[] = []
      jest.spyOn(global, 'setTimeout').mockImplementation((fn, delay) => {
        delays.push(delay as number)
        ;(fn as Function)()
        return 0 as any
      })

      const config = {
        maxRetries: 5,
        initialDelayMs: 100,
        maxDelayMs: 300,
      }

      try {
        await sendEmailWithRetry(mockResend, emailParams, config)
      } catch {
        // Expected to throw
      }

      // Delays should be capped at 300ms
      // Expected: 100, 200, 300 (300 is cap), 300, 300
      expect(delays[2]).toBeLessThanOrEqual(300)
      expect(delays[3]).toBeLessThanOrEqual(300)
      expect(delays[4]).toBeLessThanOrEqual(300)
    })

    it('should use custom retry config', async () => {
      mockResend.emails.send.mockResolvedValueOnce({ id: 'email_success' })

      const customConfig = {
        maxRetries: 5,
        initialDelayMs: 500,
        maxDelayMs: 5000,
      }

      await sendEmailWithRetry(mockResend, emailParams, customConfig)

      expect(mockResend.emails.send).toHaveBeenCalled()
    })

    it('should use default retry config when not provided', async () => {
      mockResend.emails.send.mockResolvedValueOnce({ id: 'email_success' })

      await sendEmailWithRetry(mockResend, emailParams)

      // Should not throw - means defaults worked
      expect(mockResend.emails.send).toHaveBeenCalled()
    })
  })

  describe('DEFAULT_RETRY_CONFIG', () => {
    it('should have sensible defaults', () => {
      expect(DEFAULT_RETRY_CONFIG.maxRetries).toBe(3)
      expect(DEFAULT_RETRY_CONFIG.initialDelayMs).toBe(1000)
      expect(DEFAULT_RETRY_CONFIG.maxDelayMs).toBe(10000)
    })
  })
})
