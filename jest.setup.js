// jest.setup.js
import '@testing-library/jest-dom'

// Set test environment variables from .env.test or provide sensible test defaults
process.env.STRIPE_SECRET_KEY = process.env.STRIPE_SECRET_KEY || 'sk_test_mock_key'
process.env.STRIPE_PUBLISHABLE_KEY = process.env.STRIPE_PUBLISHABLE_KEY || 'pk_test_mock_key'
process.env.STRIPE_WEBHOOK_SECRET = process.env.STRIPE_WEBHOOK_SECRET || 'whsec_test_mock_key'
process.env.STRIPE_PRICE_CLAUDE_CODE_COURSE = process.env.STRIPE_PRICE_CLAUDE_CODE_COURSE || 'price_test_mock_1'
process.env.STRIPE_PRICE_WORKFLOW_COURSE = process.env.STRIPE_PRICE_WORKFLOW_COURSE || 'price_test_mock_2'
process.env.STRIPE_PRICE_SKILLS_COURSE = process.env.STRIPE_PRICE_SKILLS_COURSE || 'price_test_mock_3'
process.env.RESEND_API_KEY = process.env.RESEND_API_KEY || 're_test_mock_key'
process.env.FROM_EMAIL = process.env.FROM_EMAIL || 'noreply@example.com'
process.env.ADMIN_EMAIL = process.env.ADMIN_EMAIL || 'admin@example.com'
