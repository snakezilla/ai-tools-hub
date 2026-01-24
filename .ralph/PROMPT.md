# AI Tools Hub v2.0 - Development Instructions

## Project Overview

Transform practicallibrary.com into a sustainable business with clear, step-by-step AI tool guides, payment integration, and a content system inspired by masteringai.io.

**Stack:** Next.js 15, React 19, TypeScript, Tailwind CSS, Stripe, Resend

**Domain:** https://practicallibrary.com (deployed on Vercel)

---

## Current State

The site has:
- 12+ tool pages with detailed quickstart guides
- Demo videos (Remotion-generated)
- ROI calculator
- Basic navigation (Tools, Workflows, Workshops, About)

Problems to fix:
- Tool pages are too long (~200 lines each)
- No payment integration
- No contact page
- No guides/content system
- No pricing page

---

## Goals (In Priority Order)

### Phase 1: Simplify Tool Pages
1. Create simplified tool data structure (30 lines per tool, not 200)
2. Add DifficultyBadge component (beginner/intermediate/advanced)
3. Add ReadTimeBadge component
4. Reduce quickstart to 5 simple string steps
5. Move detailed content to a guides system later

### Phase 2: Add Core Pages
1. Create `/contact` page with form (name, email, type, message)
2. Create `/pricing` page with 3 tiers (Free, Courses, Workshops)
3. Create `/courses` landing page
4. Create course sales page template at `/courses/[slug]`

### Phase 3: Payment Integration
1. Install stripe and @stripe/stripe-js
2. Create `/api/checkout` route for Stripe sessions
3. Create `/api/webhook` route for payment confirmation
4. Create CheckoutButton component
5. Create success/cancel pages

### Phase 4: Guides System
1. Create `/guides` landing page
2. Create guide template at `/guides/[slug]`
3. Create guides.ts with guide data
4. Write 4 launch guides (see specs/requirements.md)

### Phase 5: Skills Library
1. Create `/skills` page
2. Create skills.ts with curated skill data
3. Category filtering

### Phase 6: Polish
1. Mobile optimization
2. Performance audit
3. SEO metadata updates

---

## Key Files to Modify

```
src/
├── app/
│   ├── page.tsx                    # Simplify homepage
│   ├── tools/[slug]/page.tsx       # Use simplified cards
│   ├── contact/page.tsx            # NEW
│   ├── pricing/page.tsx            # NEW
│   ├── courses/
│   │   ├── page.tsx                # NEW
│   │   └── [slug]/page.tsx         # NEW
│   ├── guides/
│   │   ├── page.tsx                # NEW
│   │   └── [slug]/page.tsx         # NEW
│   ├── skills/page.tsx             # NEW
│   └── api/
│       ├── checkout/route.ts       # NEW - Stripe
│       ├── webhook/route.ts        # NEW - Stripe
│       └── contact/route.ts        # NEW
├── components/
│   ├── DifficultyBadge.tsx         # NEW
│   ├── ReadTimeBadge.tsx           # NEW
│   ├── PricingCard.tsx             # NEW
│   ├── ContactForm.tsx             # NEW
│   ├── CheckoutButton.tsx          # NEW
│   └── ToolCardSimple.tsx          # NEW (simplified version)
├── lib/
│   ├── tools.ts                    # SIMPLIFY
│   ├── guides.ts                   # NEW
│   ├── courses.ts                  # NEW
│   ├── skills.ts                   # NEW
│   └── stripe.ts                   # NEW
```

---

## Simplified Tool Format

**BEFORE (current - too long):**
```typescript
{
  slug: "claude-code",
  quickstart: [
    { text: "Check prerequisites", substeps: [...5 items] },
    { text: "Install (Mac)", substeps: [...4 items] },
    // 15+ total steps
  ],
  privacyFlags: { ... },
  skillCollections: [ ... ],
}
```

**AFTER (target - concise):**
```typescript
{
  slug: "claude-code",
  name: "Claude Code",
  tagline: "AI coding assistant in your terminal",
  difficulty: "beginner",
  readTime: "5 min",
  perfectFor: ["Developers", "Founders", "Tech Leads"],
  quickstart: [
    "Install: curl -fsSL https://claude.ai/install.sh | sh",
    "Open Terminal and type: claude",
    "Log in: /login",
    "Navigate to project: cd your-project",
    "Ask: 'Explain this codebase'"
  ],
  demoVideo: "/demos/claude-code-demo.mp4",
  fullGuideSlug: "claude-code-complete-guide",
  category: "Development",
  tier: 1
}
```

---

## Component Specifications

### DifficultyBadge
```tsx
const colors = {
  beginner: "bg-green-100 text-green-800",
  intermediate: "bg-yellow-100 text-yellow-800",
  advanced: "bg-red-100 text-red-800"
}
```

### PricingCard
Props: title, price (number | "Free" | "Custom"), description, features[], cta, ctaHref, highlighted?

### ContactForm
Fields: name (required), email (required), type (select: question/feedback/workshop/partnership), message (required)
Validation: zod schema
Submit: POST to /api/contact

---

## Testing Requirements

After each phase:
1. Run `npm run build` - must pass
2. Run `npm run dev` - test in browser
3. Test on mobile viewport

---

## Commit Strategy

Use conventional commits:
- Phase 1: `refactor: simplify tool pages and add badges`
- Phase 2: `feat: add contact, pricing, and course pages`
- Phase 3: `feat: integrate Stripe payment flow`
- Phase 4: `feat: create guides system`
- Phase 5: `feat: add skills library`
- Phase 6: `chore: polish and mobile optimization`

---

## Status Reporting

End each response with:

```
---RALPH_STATUS---
PHASE: X/6
STATUS: IN_PROGRESS | COMPLETE | BLOCKED
TASKS_COMPLETED: X
FILES_MODIFIED: X
BUILD_STATUS: PASSING | FAILING | NOT_RUN
NEXT_TASK: <specific task>
EXIT_SIGNAL: false | true
---END_STATUS---
```

---

## Important Constraints

1. **Don't break existing functionality** - The site is live
2. **Incremental changes** - Small commits, test often
3. **TypeScript strict** - No `any` types
4. **Tailwind only** - No custom CSS files
5. **Keep it simple** - Minimum code to achieve the goal
