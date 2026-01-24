# Implementation Checklist - AI Tools Hub v2.0

## Phase 1: Foundation Cleanup ✅ CURRENT PHASE

### Task 1.1: Create New Type Definitions
- [ ] Create simplified Tool type in `src/types/index.ts`
- [ ] Create Guide type for detailed content
- [ ] Create Course type for paid offerings
- [ ] Create Skill type for skills library

### Task 1.2: Simplify tools.ts
- [ ] Back up current tools.ts as tools-legacy.ts
- [ ] Create new simplified tools array
- [ ] Keep only: slug, name, tagline, difficulty, readTime, perfectFor, quickstart (5 strings), demoVideo, fullGuideSlug
- [ ] Remove: detailed substeps, privacyFlags, skillCollections, systemRequirements

### Task 1.3: Create Badge Components
- [ ] Create `src/components/DifficultyBadge.tsx`
- [ ] Create `src/components/ReadTimeBadge.tsx`
- [ ] Add to Tailwind config if needed

### Task 1.4: Create Simplified ToolCard
- [ ] Create `src/components/ToolCardSimple.tsx`
- [ ] Much cleaner layout
- [ ] 5-step quickstart (just strings)
- [ ] CTA to full guide

### Task 1.5: Update Tool Pages
- [ ] Modify `src/app/tools/[slug]/page.tsx` to use simplified cards
- [ ] Add "Read the full guide" CTA

---

## Phase 2: New Pages

### Task 2.1: Contact Page
- [ ] Create `src/app/contact/page.tsx`
- [ ] Create `src/components/ContactForm.tsx`
- [ ] Form fields: name, email, type (dropdown), message
- [ ] Validation with zod
- [ ] Success/error states

### Task 2.2: Pricing Page
- [ ] Create `src/app/pricing/page.tsx`
- [ ] Create `src/components/PricingCard.tsx`
- [ ] Three tiers: Free / Courses / Workshops
- [ ] Feature comparison table

### Task 2.3: Courses Landing
- [ ] Create `src/app/courses/page.tsx`
- [ ] Create `src/lib/courses.ts` with course data
- [ ] Course cards with pricing

### Task 2.4: Course Sales Page Template
- [ ] Create `src/app/courses/[slug]/page.tsx`
- [ ] What you'll learn section
- [ ] Curriculum outline
- [ ] FAQ accordion
- [ ] Buy button (placeholder until Stripe)

---

## Phase 3: Payment Integration

### Task 3.1: Stripe Setup
- [ ] Install packages: `npm install stripe @stripe/stripe-js`
- [ ] Create `src/lib/stripe.ts` helper
- [ ] Add env vars to `.env.local`

### Task 3.2: Checkout API Route
- [ ] Create `src/app/api/checkout/route.ts`
- [ ] POST handler creates checkout session
- [ ] Returns checkout URL

### Task 3.3: Webhook Handler
- [ ] Create `src/app/api/webhook/route.ts`
- [ ] Verify Stripe signature
- [ ] Handle checkout.session.completed
- [ ] Send confirmation email via Resend

### Task 3.4: CheckoutButton Component
- [ ] Create `src/components/CheckoutButton.tsx`
- [ ] Loading state during redirect
- [ ] Error handling

### Task 3.5: Success/Cancel Pages
- [ ] Create `src/app/checkout/success/page.tsx`
- [ ] Create `src/app/checkout/cancel/page.tsx`

---

## Phase 4: Guides Migration

### Task 4.1: Guides Landing Page
- [ ] Create `src/app/guides/page.tsx`
- [ ] Create `src/lib/guides.ts` with guide data
- [ ] Filter by category/difficulty
- [ ] Search functionality (optional)

### Task 4.2: Guide Template
- [ ] Create `src/app/guides/[slug]/page.tsx`
- [ ] Move detailed content from tools-legacy.ts
- [ ] Table of contents
- [ ] Proper SEO metadata

### Task 4.3: Create Initial Guides
- [ ] Claude Code Complete Guide
- [ ] Claude Skills Setup Guide
- [ ] Manus AI Guide
- [ ] Link from tool pages

---

## Phase 5: Skills Library

### Task 5.1: Skills Data
- [ ] Create `src/lib/skills.ts`
- [ ] Curate top 20 skills
- [ ] Categories: Development, Marketing, Productivity, Design

### Task 5.2: Skills Page
- [ ] Create `src/app/skills/page.tsx`
- [ ] Category filter tabs
- [ ] Skill cards with install instructions
- [ ] GitHub links

---

## Phase 6: Polish

### Task 6.1: Mobile Optimization
- [ ] Test all pages on mobile
- [ ] Fix any layout issues
- [ ] Ensure touch targets are adequate

### Task 6.2: Performance
- [ ] Run Lighthouse audit
- [ ] Optimize images
- [ ] Check Core Web Vitals

### Task 6.3: SEO
- [ ] Update all metadata
- [ ] Add structured data (JSON-LD)
- [ ] Create sitemap

### Task 6.4: Analytics
- [ ] Add Plausible script
- [ ] Track key events (checkout, contact)

---

## Code Snippets for Reference

### Simplified Tool Type
```typescript
// src/types/index.ts
export type Difficulty = "beginner" | "intermediate" | "advanced"

export interface SimpleTool {
  slug: string
  name: string
  tagline: string
  difficulty: Difficulty
  readTime: string // e.g., "5 min"
  perfectFor: string[] // 3 roles
  quickstart: string[] // exactly 5 simple steps
  demoVideo?: string
  fullGuideSlug?: string
  category: string
  tier: 1 | 2
}
```

### DifficultyBadge Component
```typescript
// src/components/DifficultyBadge.tsx
import { Difficulty } from "@/types"

const colors: Record<Difficulty, string> = {
  beginner: "bg-success/10 text-success",
  intermediate: "bg-warning/10 text-warning",
  advanced: "bg-error/10 text-error"
}

export function DifficultyBadge({ level }: { level: Difficulty }) {
  return (
    <span className={`px-2 py-1 rounded-full text-xs font-medium capitalize ${colors[level]}`}>
      {level}
    </span>
  )
}
```

### Stripe Checkout Route
```typescript
// src/app/api/checkout/route.ts
import { NextResponse } from "next/server"
import Stripe from "stripe"

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
  apiVersion: "2024-12-18.acacia"
})

export async function POST(req: Request) {
  try {
    const { priceId } = await req.json()

    const session = await stripe.checkout.sessions.create({
      mode: "payment",
      payment_method_types: ["card"],
      line_items: [{ price: priceId, quantity: 1 }],
      success_url: `${process.env.NEXT_PUBLIC_URL}/checkout/success?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${process.env.NEXT_PUBLIC_URL}/checkout/cancel`,
    })

    return NextResponse.json({ url: session.url })
  } catch (error) {
    console.error("Checkout error:", error)
    return NextResponse.json({ error: "Failed to create checkout" }, { status: 500 })
  }
}
```

### Contact Form Schema
```typescript
// src/lib/schemas.ts
import { z } from "zod"

export const contactSchema = z.object({
  name: z.string().min(2, "Name is required"),
  email: z.string().email("Invalid email"),
  type: z.enum(["question", "feedback", "workshop", "partnership"]),
  message: z.string().min(10, "Message must be at least 10 characters")
})

export type ContactFormData = z.infer<typeof contactSchema>
```

### PricingCard Component
```typescript
// src/components/PricingCard.tsx
interface PricingCardProps {
  title: string
  price: number | "Free" | "Custom"
  description: string
  features: string[]
  cta: string
  ctaHref: string
  highlighted?: boolean
}

export function PricingCard({
  title, price, description, features, cta, ctaHref, highlighted
}: PricingCardProps) {
  return (
    <div className={`
      p-6 rounded-card border ${highlighted
        ? "border-accent bg-accent/5 shadow-lg"
        : "border-border bg-card"
      }
    `}>
      <h3 className="text-heading-sm">{title}</h3>
      <div className="mt-2 mb-4">
        <span className="text-heading-md">
          {typeof price === "number" ? `$${price}` : price}
        </span>
        {typeof price === "number" && (
          <span className="text-muted ml-1">one-time</span>
        )}
      </div>
      <p className="text-muted mb-6">{description}</p>
      <ul className="space-y-2 mb-6">
        {features.map((feature, i) => (
          <li key={i} className="flex items-center gap-2 text-sm">
            <CheckIcon /> {feature}
          </li>
        ))}
      </ul>
      <Link
        href={ctaHref}
        className={`block text-center py-3 rounded-button font-medium ${
          highlighted
            ? "bg-accent text-white"
            : "bg-card border border-border hover:border-accent"
        }`}
      >
        {cta}
      </Link>
    </div>
  )
}
```

---

## Dependencies to Install

```bash
# Payment
npm install stripe @stripe/stripe-js

# Email
npm install resend

# Form validation (if not already installed)
npm install react-hook-form zod @hookform/resolvers
```

---

## Git Commit Messages (Use These)

```
Phase 1: refactor: simplify tool pages and add difficulty badges
Phase 2: feat: add contact, pricing, and course pages
Phase 3: feat: integrate Stripe payment flow
Phase 4: feat: create guides system and migrate content
Phase 5: feat: add skills library page
Phase 6: chore: polish, mobile optimization, and analytics
```

---

## Current Status

**Last Updated:** Starting fresh
**Current Phase:** 1 - Foundation Cleanup
**Next Task:** Task 1.1 - Create New Type Definitions
**Blockers:** None
