# AI Tools Hub v2.0 - Ralph Development Instructions

## Executive Summary

Transform practicallibrary.com from a free educational hub into a sustainable business with the clarity and impact of our current approach, combined with the monetization and structure of masteringai.io.

**Core Philosophy (Unchanged):** Clear, basic, step-by-step content. No fluff. High impact per page.

**New Addition:** Sustainable revenue through tiered offerings, payment integration, and lead capture.

---

## Competitive Analysis: What We're Taking from MasteringAI.io

### ADOPT (High Impact)
| Feature | Why It Works | Our Implementation |
|---------|--------------|-------------------|
| **Tiered Learning Paths** | Multiple entry points for different learners | Guides (free), Mini-Courses ($47-97), Workshops ($295-495) |
| **Skills Library** | Practical, downloadable value | Curate our Claude Skills with one-click install |
| **Course Sales Pages** | Professional conversion-optimized pages | Build 2-3 flagship course pages |
| **Contact/Consultation** | Lead capture for high-ticket | Simple contact form + Calendly embed |
| **Difficulty Badges** | Sets expectations, builds progression | Add to all tool pages |
| **Read Time Estimates** | Respects user's time | Add to all content |

### ADAPT (Modify for Our Brand)
| Feature | Their Approach | Our Simpler Version |
|---------|----------------|---------------------|
| Countdown timers | Aggressive urgency | Soft "Early bird ends [date]" |
| Multiple CTAs | Many buttons per page | Max 2 clear CTAs per section |
| Long-form sales copy | Detailed course pages | Concise bullet points |
| Community emphasis | 12-month access | Optional Slack/Discord link |

### AVOID (Doesn't Fit Our Brand)
- Aggressive urgency tactics ("13 spots left!")
- Heavy testimonial sections
- Newsletter popups
- Excessive pricing tiers

---

## New Site Architecture

```
Homepage (simplified)
├── Hero: "Master AI tools. Step by step."
├── 3 Learning Paths (visual cards)
│   ├── Free Guides → /guides
│   ├── Mini-Courses → /courses (paid)
│   └── Live Workshops → /workshops (high-ticket)
├── Featured Tools (3 cards, not overwhelming)
└── Simple footer CTA

/guides (FREE content hub)
├── Beginner guides
├── Claude Code mastery path
├── Use case tutorials
└── Each guide: Read time, difficulty, clear steps

/tools/[slug] (SIMPLIFIED - less content per page)
├── What it is (2 sentences max)
├── Who it's for (bullet list)
├── 5-step quickstart
├── Video demo (optional)
├── CTA: "Want the full guide?" → /guides/[slug]

/courses (PAID - new)
├── Course cards with pricing
├── Individual course pages with:
│   ├── What you'll learn (5 bullets)
│   ├── Who it's for
│   ├── Curriculum outline
│   ├── Pricing + Buy button (Stripe)
│   └── FAQ (3-5 questions)

/workshops (HIGH-TICKET - enhanced)
├── Workshop packages
├── Booking calendar (Calendly)
└── "Book a call" for custom

/skills (RESOURCE HUB - new)
├── Curated Claude Code skills
├── One-click install instructions
├── Organized by category

/contact (NEW)
├── Simple contact form
├── Response time expectation
├── Alternative: Book a call

/pricing (NEW - simple)
├── 3 tiers comparison table
├── Free / Courses / Workshops
```

---

## Content Simplification Strategy

### Current Problem
Tool pages have too much content:
- Long quickstart guides (15+ steps)
- Privacy flags (most users don't care)
- Multiple related tools
- Skill collections (overwhelming)

### New Approach: "Less is More"

**Tool Page Template (Simplified):**
```
┌─────────────────────────────────────────────────────┐
│ [TOOL NAME]                         [Difficulty]    │
│ One sentence: What it does                          │
│ Read time: X min                                    │
├─────────────────────────────────────────────────────┤
│ [Demo Video - 5-8 sec loop]                         │
├─────────────────────────────────────────────────────┤
│ PERFECT FOR:                                        │
│ • [Role 1]  • [Role 2]  • [Role 3]                  │
├─────────────────────────────────────────────────────┤
│ GET STARTED IN 5 STEPS:                             │
│ 1. [Simple action]                                  │
│ 2. [Simple action]                                  │
│ 3. [Simple action]                                  │
│ 4. [Simple action]                                  │
│ 5. [Simple action]                                  │
├─────────────────────────────────────────────────────┤
│ [CTA: "Master this tool" → Full guide link]         │
└─────────────────────────────────────────────────────┘
```

**Move detailed content to:**
- Full guides (/guides/[tool]-complete-guide)
- Courses (paid deep-dives)

---

## Payment Integration

### Stripe Setup
1. Install @stripe/stripe-js and stripe packages
2. Create API routes for checkout sessions
3. Implement webhook handler for payment confirmation
4. Product/Price IDs stored in env vars

### Pricing Structure
| Tier | Price | What's Included |
|------|-------|-----------------|
| **Free** | $0 | All guides, tool pages, skills library |
| **Mini-Course** | $47-97 | 2-hour self-paced course, lifetime access |
| **Workshop** | $295-495 | Live session, Q&A, 30-day support |
| **Team Training** | Custom | On-site/virtual, custom curriculum |

### Course Products (Initial)
1. **Claude Code Essentials** - $67
   - Target: Non-developers wanting to use Claude Code
   - 2 hours of video + cheat sheets

2. **AI Workflow Builder** - $97
   - Target: Marketers, ops people
   - Build 5 complete automations

3. **Claude Skills Mastery** - $47
   - Target: Claude Code users
   - Install, create, and customize skills

---

## Contact Page Implementation

### Form Fields
- Name (required)
- Email (required)
- Type: Question / Feedback / Workshop Inquiry / Partnership
- Message (required)

### Backend
- Resend for email delivery
- Save to simple JSON log or Airtable
- Auto-response with expected reply time

### Alternative Contact
- Calendly embed for "Book a 15-min call"
- Link to Twitter/X for quick questions

---

## Design Refinements

### Typography Updates
```css
/* Clearer hierarchy */
--font-size-hero: 56px → 48px (less overwhelming)
--font-size-section: 32px → 28px
--line-height-body: 1.6 → 1.7 (more readable)
```

### Color Refinements
```css
/* Slightly warmer, more approachable */
--background: #FAFAFA → #FEFEFE
--accent: #2563EB → #3B82F6 (brighter blue)
--muted: #737373 → #6B7280 (warmer gray)
```

### New Components Needed
1. **DifficultyBadge** - Beginner/Intermediate/Advanced
2. **ReadTimeBadge** - "5 min read"
3. **PricingCard** - For course pages
4. **ContactForm** - With validation
5. **CoursePage** - Template for paid offerings
6. **CheckoutButton** - Stripe integration

---

## Implementation Phases

### Phase 1: Foundation Cleanup (Day 1)
- [ ] Simplify tool pages (reduce content by 50%)
- [ ] Add difficulty and read time badges
- [ ] Refactor tools.ts to separate basic vs. detailed content
- [ ] Create simplified ToolCard component variant

### Phase 2: New Pages (Day 2)
- [ ] Create /contact page with form
- [ ] Create /pricing page
- [ ] Create /courses landing page
- [ ] Create first course page template

### Phase 3: Payment Integration (Day 3)
- [ ] Set up Stripe account and products
- [ ] Implement checkout API route
- [ ] Implement webhook handler
- [ ] Add CheckoutButton component
- [ ] Test purchase flow

### Phase 4: Guides Migration (Day 4)
- [ ] Create /guides landing page
- [ ] Move detailed tool content to guide pages
- [ ] Add guide template with proper SEO
- [ ] Cross-link tools ↔ guides

### Phase 5: Skills Library (Day 5)
- [ ] Create /skills page
- [ ] Curate top 20 skills with descriptions
- [ ] One-click install instructions
- [ ] Category filtering

### Phase 6: Polish (Day 6)
- [ ] Mobile optimization
- [ ] Performance audit
- [ ] SEO metadata
- [ ] Analytics setup (Plausible)

### Phase 7: Content Creation (Ongoing)
- [ ] Create MDX-based guides system
- [ ] Write 4 launch guides (see docs/CONTENT-PLAN.md)
- [ ] Add guide landing page with filters
- [ ] Cross-link guides ↔ tools ↔ courses

**Content Priority (Week 1 Launch):**
1. "What is Claude Code and Why Should You Care?" (5 min, beginner)
2. "Set Up Claude Code in 15 Minutes (Mac)" (12 min, beginner)
3. "Set Up Claude Code in 15 Minutes (Windows)" (12 min, beginner)
4. "Plan Mode: The Habit That Saves Hours" (8 min, intermediate)

**Content Style (from docs/CONTENT-PLAN.md):**
- Start with outcome, not setup
- Short paragraphs (2-3 sentences)
- Every guide ends with "Your Turn: Try this now"
- No fluff intros - value in first 2 sentences
- Real examples with specific outcomes

---

## File Structure Changes

```
src/
├── app/
│   ├── page.tsx (simplified homepage)
│   ├── tools/[slug]/page.tsx (simplified)
│   ├── guides/
│   │   ├── page.tsx (guides hub)
│   │   └── [slug]/page.tsx (individual guides)
│   ├── courses/
│   │   ├── page.tsx (courses hub)
│   │   └── [slug]/page.tsx (course sales page)
│   ├── skills/
│   │   └── page.tsx (skills library)
│   ├── contact/
│   │   └── page.tsx (contact form)
│   ├── pricing/
│   │   └── page.tsx (pricing comparison)
│   └── api/
│       ├── checkout/route.ts (Stripe checkout)
│       ├── webhook/route.ts (Stripe webhooks)
│       └── contact/route.ts (Form submission)
├── components/
│   ├── DifficultyBadge.tsx (new)
│   ├── ReadTimeBadge.tsx (new)
│   ├── PricingCard.tsx (new)
│   ├── ContactForm.tsx (new)
│   ├── CheckoutButton.tsx (new)
│   └── ... (existing)
├── lib/
│   ├── tools.ts (simplified tool data)
│   ├── guides.ts (detailed content moved here)
│   ├── courses.ts (course definitions)
│   ├── skills.ts (skills catalog)
│   └── stripe.ts (Stripe helpers)
└── types/
    └── index.ts (shared types)
```

---

## Content Migration Plan

### tools.ts Simplification

**BEFORE (current):**
```typescript
{
  slug: "claude-code",
  quickstart: [
    { text: "Check prerequisites", substeps: [...5 items] },
    { text: "Install Claude Code (Mac/Linux)", substeps: [...4 items] },
    // ... 6 more steps with substeps
  ],
  privacyFlags: { ... },
  skillCollections: [ ... ],
  // Total: ~200 lines per tool
}
```

**AFTER (simplified):**
```typescript
{
  slug: "claude-code",
  name: "Claude Code",
  tagline: "AI coding assistant in your terminal",
  difficulty: "beginner",
  readTime: "5 min",
  perfectFor: ["Developers", "Founders", "Anyone who types"],
  quickstart: [
    "Install: npm install -g @anthropic/claude-code",
    "Login: claude /login",
    "Navigate to project: cd your-project",
    "Start coding: claude",
    "Try: 'Explain this codebase'"
  ],
  demoVideo: "/demos/claude-code-demo.mp4",
  fullGuideSlug: "claude-code-complete-guide", // Links to detailed guide
  // Total: ~30 lines per tool
}
```

### Detailed Content → Guides

Move to `/src/lib/guides.ts`:
- Full quickstart with substeps
- Privacy flags
- Pro tips
- Skill collections
- System requirements

---

## Component Specifications

### DifficultyBadge
```tsx
type Difficulty = "beginner" | "intermediate" | "advanced"

// Colors:
// beginner: green (#10B981)
// intermediate: yellow (#F59E0B)
// advanced: red (#EF4444)
```

### PricingCard
```tsx
interface PricingCardProps {
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
// Validation: react-hook-form + zod
// Submit: POST to /api/contact
// Success: Thank you message with expected response time
```

### CheckoutButton
```tsx
interface CheckoutButtonProps {
  priceId: string
  productName: string
  className?: string
}

// On click: Create checkout session, redirect to Stripe
```

---

## API Routes

### POST /api/checkout
```typescript
// Creates Stripe checkout session
// Request: { priceId: string }
// Response: { url: string } // Stripe checkout URL
```

### POST /api/webhook
```typescript
// Handles Stripe webhooks
// checkout.session.completed → Send confirmation email
// Uses Resend for email delivery
```

### POST /api/contact
```typescript
// Handles contact form submissions
// Request: { name, email, type, message }
// Actions:
//   1. Send email notification via Resend
//   2. Send auto-reply to user
//   3. Log to Airtable (optional)
```

---

## Environment Variables Needed

```env
# Stripe
STRIPE_SECRET_KEY=sk_live_xxx
STRIPE_PUBLISHABLE_KEY=pk_live_xxx
STRIPE_WEBHOOK_SECRET=whsec_xxx
STRIPE_PRICE_CLAUDE_CODE_COURSE=price_xxx
STRIPE_PRICE_WORKFLOW_COURSE=price_xxx
STRIPE_PRICE_SKILLS_COURSE=price_xxx

# Resend (email)
RESEND_API_KEY=re_xxx
FROM_EMAIL=hello@practicallibrary.com
ADMIN_EMAIL=ahsan@xxx.com

# Optional: Airtable for contact log
AIRTABLE_API_KEY=xxx
AIRTABLE_BASE_ID=xxx
```

---

## Testing Checklist

### Payment Flow
- [ ] Checkout creates valid Stripe session
- [ ] Redirect to Stripe works
- [ ] Webhook receives payment confirmation
- [ ] Confirmation email sends
- [ ] Error handling for failed payments

### Contact Form
- [ ] Validation works for all fields
- [ ] Submission sends to API
- [ ] Email notification sent
- [ ] Auto-reply sent to user
- [ ] Error states handled

### Content Quality
- [ ] All tool pages load correctly
- [ ] Guide links work
- [ ] Course pages display properly
- [ ] Mobile responsive
- [ ] Demo videos play

---

## Success Metrics

### Launch Targets (30 days)
- 5 simplified tool pages live
- 3 guides live
- 1 course page live with checkout
- Contact form working
- Skills library with 20+ skills

### Conversion Goals
- 5% guide reader → course purchaser
- 2% visitor → contact form submission
- 1% visitor → workshop inquiry

---

## Ralph Execution Instructions

### Priority Order
1. **Simplify before adding** - Clean up existing tool pages first
2. **Payment is critical path** - Get Stripe working early
3. **Test incrementally** - Don't build all 6 phases then test

### Agent Deployment
Use these agents as needed:
- **frontend-design**: New component designs
- **code-reviewer**: After each major feature
- **tdd-guide**: For API routes (payments, contact)
- **security-reviewer**: Before deploying payment handling
- **build-error-resolver**: If TypeScript/build issues arise

### Skills to Invoke
- `/commit` after each phase completion
- `/code-review` on payment handling code
- `/security-review` before deploying

### Commit Strategy
```
Phase 1: "refactor: simplify tool pages and add badges"
Phase 2: "feat: add contact, pricing, and course pages"
Phase 3: "feat: integrate Stripe payment flow"
Phase 4: "feat: create guides system and migrate content"
Phase 5: "feat: add skills library page"
Phase 6: "chore: polish, mobile, performance"
```

---

## Status Reporting

At the end of each response, include:

```
---RALPH_STATUS---
PHASE: 1/6
STATUS: IN_PROGRESS | COMPLETE | BLOCKED
TASKS_COMPLETED_THIS_LOOP: <number>
FILES_MODIFIED: <number>
TESTS_STATUS: PASSING | FAILING | NOT_RUN
WORK_TYPE: IMPLEMENTATION | TESTING | DOCUMENTATION | REFACTORING
NEXT_PRIORITY: <specific task>
BLOCKERS: <none or description>
EXIT_SIGNAL: false | true
RECOMMENDATION: <one line summary>
---END_STATUS---
```

---

## Quick Reference: Key Decisions

| Decision | Choice | Rationale |
|----------|--------|-----------|
| Payment provider | Stripe | Industry standard, good DX |
| Email provider | Resend | Simple API, good deliverability |
| Form validation | react-hook-form + zod | Type-safe, performant |
| Hosting | Vercel | Already deployed there |
| Analytics | Plausible | Privacy-friendly |
| Contact booking | Calendly embed | No custom scheduling needed |

---

## Final Notes for Ralph

**Remember the core principle:** Users should be able to understand and use any tool within 5 minutes of landing on its page. Everything else is bonus content that lives in guides or courses.

**When in doubt:** Remove content, don't add it. Simplicity wins.

**Before marking complete:** Every page should pass the "grandmother test" - could your non-technical grandmother follow the steps?
