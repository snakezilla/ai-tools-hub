# Technical Requirements

## Project Info

- **Framework:** Next.js 15.5.9 (App Router)
- **React:** 19.0.0
- **TypeScript:** 5.7.3
- **Styling:** Tailwind CSS 3.4.17
- **Deployment:** Vercel
- **Domain:** practicallibrary.com

---

## New Dependencies to Install

```bash
# Payment
npm install stripe @stripe/stripe-js

# Email (for contact form)
npm install resend

# Form validation
npm install zod react-hook-form @hookform/resolvers
```

---

## Type Definitions

### SimpleTool (new simplified format)
```typescript
// src/types/index.ts
export type Difficulty = "beginner" | "intermediate" | "advanced"

export interface SimpleTool {
  slug: string
  name: string
  tagline: string
  difficulty: Difficulty
  readTime: string
  perfectFor: string[]
  quickstart: string[] // exactly 5 steps
  demoVideo?: string
  fullGuideSlug?: string
  category: string
  tier: 1 | 2
}
```

### Guide
```typescript
export interface Guide {
  slug: string
  title: string
  description: string
  readTime: string
  difficulty: Difficulty
  category: "getting-started" | "level-up" | "use-cases" | "comparisons"
  publishedAt: string
  content: string // MDX content or HTML
}
```

### Course
```typescript
export interface Course {
  slug: string
  title: string
  description: string
  price: number
  originalPrice?: number
  features: string[]
  curriculum: { title: string; items: string[] }[]
  faq: { question: string; answer: string }[]
  stripePriceId: string
}
```

### Skill
```typescript
export interface Skill {
  slug: string
  name: string
  description: string
  category: "development" | "marketing" | "productivity" | "design"
  installCommand: string
  githubUrl: string
}
```

---

## API Routes

### POST /api/contact
```typescript
// Request
{ name: string, email: string, type: string, message: string }

// Response
{ success: boolean, message: string }

// Actions:
// 1. Validate with zod
// 2. Send email via Resend
// 3. Return success
```

### POST /api/checkout
```typescript
// Request
{ priceId: string }

// Response
{ url: string } // Stripe checkout URL

// Actions:
// 1. Create Stripe checkout session
// 2. Return checkout URL
```

### POST /api/webhook
```typescript
// Stripe webhook handler
// Verify signature
// Handle checkout.session.completed
// Send confirmation email
```

---

## Environment Variables

```env
# .env.local.example

# Stripe
STRIPE_SECRET_KEY=sk_test_xxx
NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=pk_test_xxx
STRIPE_WEBHOOK_SECRET=whsec_xxx

# Resend
RESEND_API_KEY=re_xxx

# URLs
NEXT_PUBLIC_URL=http://localhost:3000
```

---

## Component Specifications

### DifficultyBadge
```tsx
interface Props { level: Difficulty }

// Colors:
// beginner: bg-success/10 text-success (green)
// intermediate: bg-warning/10 text-warning (yellow)
// advanced: bg-error/10 text-error (red)
```

### ReadTimeBadge
```tsx
interface Props { time: string }

// Display: "5 min read" with clock icon
```

### PricingCard
```tsx
interface Props {
  title: string
  price: number | "Free" | "Custom"
  description: string
  features: string[]
  cta: string
  ctaHref: string
  highlighted?: boolean
}
```

### ContactForm
```tsx
// Fields: name, email, type (select), message
// Validation: zod
// Submit: POST /api/contact
// States: idle, loading, success, error
```

### CheckoutButton
```tsx
interface Props {
  priceId: string
  className?: string
}

// On click: POST /api/checkout, redirect to Stripe
// States: idle, loading
```

---

## Pricing Structure

| Tier | Price | Stripe Price ID |
|------|-------|-----------------|
| Free | $0 | N/A |
| Claude Code Essentials | $67 | price_claude_code_essentials |
| AI Workflow Builder | $97 | price_workflow_builder |
| Claude Skills Mastery | $47 | price_skills_mastery |
| Workshop (Team) | $495 | price_workshop_team |

---

## Guide Content (Week 1 Launch)

### Guide 1: "What is Claude Code and Why Should You Care?"
- Read time: 5 min
- Difficulty: beginner
- Sections:
  1. One-sentence explanation
  2. ChatGPT vs Claude Code table
  3. 5 real examples
  4. Do I need to code? (No)
  5. Cost breakdown
  6. Your Turn action

### Guide 2: "Set Up Claude Code in 15 Minutes (Mac)"
- Read time: 12 min
- Difficulty: beginner
- Sections:
  1. Prerequisites
  2. Step 1: Open Terminal
  3. Step 2: Install
  4. Step 3: Verify
  5. Step 4: Log in
  6. Step 5: First command
  7. Troubleshooting
  8. Your Turn action

### Guide 3: "Set Up Claude Code in 15 Minutes (Windows)"
- Same structure as Mac, Windows-specific

### Guide 4: "Plan Mode: The Habit That Saves Hours"
- Read time: 8 min
- Difficulty: intermediate
- Sections:
  1. The problem (wasted effort)
  2. The solution (plan first)
  3. How to use
  4. Bad example
  5. Good example
  6. When to use
  7. Your Turn action

---

## Skills Library (Top 20)

### Development
1. /frontend-design - UI/UX guidance
2. /code-review - Find bugs
3. /mcp-builder - Create MCP servers
4. /webapp-testing - Test apps

### Marketing
5. /page-cro - Conversion optimization
6. /seo-audit - Technical SEO
7. /copywriting - High-converting copy
8. /email-sequence - Email campaigns

### Productivity
9. /meeting-notes - Summarize meetings
10. /project-planning - Break down tasks

### Design
11. /canvas-design - Visual design
12. /brand-guidelines - Brand consistency

(Add 8 more to reach 20)

---

## Existing Tailwind Theme (use these)

```typescript
colors: {
  background: "#FAFAFA",
  foreground: "#0A0A0A",
  muted: "#737373",
  border: "#E5E5E5",
  accent: "#2563EB",
  card: "#FFFFFF",
  success: "#10B981",
  warning: "#F59E0B",
  error: "#EF4444",
}
```

Use existing utility classes: `text-heading-sm`, `text-body`, `rounded-card`, `shadow-card`, etc.
