import {
  checkRateLimit,
  checkContactRateLimit,
  RATE_LIMITS,
  type RateLimitConfig,
} from '../rate-limit'

describe('rate-limit utility', () => {
  beforeEach(() => {
    // Reset time mocks before each test
    jest.clearAllMocks()
  })

  describe('checkRateLimit', () => {
    it('should allow requests within the limit', () => {
      const store = new Map()
      const config: RateLimitConfig = { windowMs: 60000, maxRequests: 5 }

      // First 5 requests should be allowed
      for (let i = 0; i < 5; i++) {
        const result = checkRateLimit(`ip-1`, config, store)
        expect(result.allowed).toBe(true)
        expect(result.retryAfter).toBeUndefined()
      }
    })

    it('should reject requests exceeding the limit', () => {
      const store = new Map()
      const config: RateLimitConfig = { windowMs: 60000, maxRequests: 2 }

      // Make 3 requests
      checkRateLimit(`ip-1`, config, store)
      checkRateLimit(`ip-1`, config, store)
      const thirdRequest = checkRateLimit(`ip-1`, config, store)

      expect(thirdRequest.allowed).toBe(false)
      expect(thirdRequest.retryAfter).toBeDefined()
      expect(thirdRequest.retryAfter).toBeGreaterThan(0)
    })

    it('should return accurate retryAfter time', () => {
      const store = new Map()
      const config: RateLimitConfig = { windowMs: 10000, maxRequests: 1 }

      const now = 1000000
      jest.spyOn(Date, 'now').mockReturnValue(now)

      // First request
      checkRateLimit(`ip-1`, config, store)

      // Second request (immediately after)
      const result = checkRateLimit(`ip-1`, config, store)

      expect(result.allowed).toBe(false)
      expect(result.retryAfter).toBeCloseTo(10, 1) // ~10 seconds
    })

    it('should track requests per identifier', () => {
      const store = new Map()
      const config: RateLimitConfig = { windowMs: 60000, maxRequests: 2 }

      // Two requests from ip-1
      checkRateLimit(`ip-1`, config, store)
      checkRateLimit(`ip-1`, config, store)

      // Third request from ip-1 should be rejected
      const result1 = checkRateLimit(`ip-1`, config, store)
      expect(result1.allowed).toBe(false)

      // But first request from ip-2 should be allowed
      const result2 = checkRateLimit(`ip-2`, config, store)
      expect(result2.allowed).toBe(true)
    })

    it('should reset limits after window expires', () => {
      const store = new Map()
      const config: RateLimitConfig = { windowMs: 10000, maxRequests: 1 }

      const now = 1000000
      const dateNowSpy = jest.spyOn(Date, 'now').mockReturnValue(now)

      // First request allowed
      const result1 = checkRateLimit(`ip-1`, config, store)
      expect(result1.allowed).toBe(true)

      // Second request immediately rejected
      const result2 = checkRateLimit(`ip-1`, config, store)
      expect(result2.allowed).toBe(false)

      // Advance time past window
      dateNowSpy.mockReturnValue(now + 11000)

      // Third request should be allowed (window expired)
      const result3 = checkRateLimit(`ip-1`, config, store)
      expect(result3.allowed).toBe(true)

      dateNowSpy.mockRestore()
    })
  })

  describe('checkContactRateLimit', () => {
    it('should allow contact submissions within IP limit', () => {
      const ipLimit = RATE_LIMITS.contact.perIP.maxRequests
      const store = new Map()

      // Mock the checkRateLimit function to use our test store
      for (let i = 0; i < ipLimit; i++) {
        const result = checkContactRateLimit('192.168.1.1', `user${i}@example.com`)
        expect(result.allowed).toBe(true)
      }
    })

    it('should reject contact submissions exceeding IP limit', () => {
      // Use a fresh store by making fresh requests
      // This test uses the actual in-memory store, so we need to be careful

      // Make one submission from an IP
      const ip = '192.168.1.99'
      const config = RATE_LIMITS.contact.perIP

      // Make requests up to the limit
      for (let i = 0; i < config.maxRequests; i++) {
        checkContactRateLimit(ip, `email${i}@test.com`)
      }

      // Next request should be rejected
      const result = checkContactRateLimit(ip, `emailX@test.com`)
      expect(result.allowed).toBe(false)
      expect(result.reason).toBe('ip')
      expect(result.retryAfter).toBeDefined()
    })

    it('should reject contact submissions exceeding email limit', () => {
      // Make submissions from same email
      const email = 'email-limit-test-999@example.com'
      const config = RATE_LIMITS.contact.perEmail

      // Make requests up to the limit (with different IPs to avoid IP limit)
      for (let i = 0; i < config.maxRequests; i++) {
        checkContactRateLimit(`192.168.100.${i}`, email)
      }

      // Next request from same email should be rejected
      const result = checkContactRateLimit('192.168.100.99', email)
      expect(result.allowed).toBe(false)
      expect(result.reason).toBe('email')
    })

    it('should check IP limit before email limit', () => {
      // When IP is limited, it should return reason: 'ip' even if email is also available
      const ip = '192.168.1.77'
      const email = 'test@example.com'
      const ipConfig = RATE_LIMITS.contact.perIP

      // Saturate IP limit
      for (let i = 0; i < ipConfig.maxRequests; i++) {
        checkContactRateLimit(ip, `email${i}@example.com`)
      }

      // Next request should be rejected due to IP, not email
      const result = checkContactRateLimit(ip, email)
      expect(result.allowed).toBe(false)
      expect(result.reason).toBe('ip')
    })

    it('should include retryAfter in rate limit response', () => {
      const ip = '192.168.1.55'
      const config = RATE_LIMITS.contact.perIP

      // Saturate limit
      for (let i = 0; i < config.maxRequests; i++) {
        checkContactRateLimit(ip, `email${i}@example.com`)
      }

      // Get rejection
      const result = checkContactRateLimit(ip, 'next@example.com')

      expect(result.allowed).toBe(false)
      expect(result.retryAfter).toBeDefined()
      expect(result.retryAfter).toBeGreaterThan(0)
      expect(result.retryAfter).toBeLessThanOrEqual(config.windowMs / 1000)
    })
  })

  describe('RATE_LIMITS configuration', () => {
    it('should have sensible defaults', () => {
      expect(RATE_LIMITS.contact.perIP.maxRequests).toBe(5)
      expect(RATE_LIMITS.contact.perIP.windowMs).toBe(60 * 60 * 1000) // 1 hour

      expect(RATE_LIMITS.contact.perEmail.maxRequests).toBe(3)
      expect(RATE_LIMITS.contact.perEmail.windowMs).toBe(24 * 60 * 60 * 1000) // 24 hours
    })
  })
})
