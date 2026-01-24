# Task Checklist - AI Tools Hub v2.0

## Phase 1: Simplify Tool Pages

### 1.1 Create New Types
- [ ] Create `src/types/index.ts` with SimpleTool type
- [ ] Add Difficulty type: "beginner" | "intermediate" | "advanced"

### 1.2 Create Badge Components
- [ ] Create `src/components/DifficultyBadge.tsx`
- [ ] Create `src/components/ReadTimeBadge.tsx`

### 1.3 Simplify tools.ts
- [ ] Backup current tools.ts as tools-legacy.ts
- [ ] Create new simplified tools array in tools.ts
- [ ] Keep only: slug, name, tagline, difficulty, readTime, perfectFor, quickstart (5 strings), demoVideo, category, tier

### 1.4 Create Simplified ToolCard
- [ ] Create `src/components/ToolCardSimple.tsx`
- [ ] Use new simplified data structure
- [ ] Show difficulty badge, read time, 5-step quickstart

### 1.5 Update Tool Pages
- [ ] Update `src/app/tools/[slug]/page.tsx` to use ToolCardSimple
- [ ] Test all tool pages load correctly

### 1.6 Verify Phase 1
- [ ] Run `npm run build` - must pass
- [ ] Test in browser with `npm run dev`

---

## Phase 2: Add Core Pages

### 2.1 Contact Page
- [ ] Create `src/app/contact/page.tsx`
- [ ] Create `src/components/ContactForm.tsx`
- [ ] Add form validation with zod
- [ ] Create `src/app/api/contact/route.ts`

### 2.2 Pricing Page
- [ ] Create `src/app/pricing/page.tsx`
- [ ] Create `src/components/PricingCard.tsx`
- [ ] Add 3 tiers: Free, Courses ($47-97), Workshops ($295-495)

### 2.3 Courses Landing
- [ ] Create `src/lib/courses.ts` with course data
- [ ] Create `src/app/courses/page.tsx`

### 2.4 Course Sales Page
- [ ] Create `src/app/courses/[slug]/page.tsx`
- [ ] Include: What you'll learn, Curriculum, FAQ, Buy button (placeholder)

### 2.5 Update Navigation
- [ ] Add Contact, Pricing, Courses links to Header

### 2.6 Verify Phase 2
- [ ] Run `npm run build`
- [ ] Test all new pages

---

## Phase 3: Payment Integration

### 3.1 Install Dependencies
- [ ] Run `npm install stripe @stripe/stripe-js`

### 3.2 Stripe Setup
- [ ] Create `src/lib/stripe.ts` helper
- [ ] Add env vars to `.env.local.example`

### 3.3 Checkout API
- [ ] Create `src/app/api/checkout/route.ts`
- [ ] POST handler creates Stripe checkout session

### 3.4 Webhook Handler
- [ ] Create `src/app/api/webhook/route.ts`
- [ ] Handle checkout.session.completed event

### 3.5 Checkout Button
- [ ] Create `src/components/CheckoutButton.tsx`
- [ ] Add to course sales pages

### 3.6 Success/Cancel Pages
- [ ] Create `src/app/checkout/success/page.tsx`
- [ ] Create `src/app/checkout/cancel/page.tsx`

### 3.7 Verify Phase 3
- [ ] Run `npm run build`
- [ ] Test checkout flow (use Stripe test mode)

---

## Phase 4: Guides System

### 4.1 Guides Data
- [ ] Create `src/lib/guides.ts`
- [ ] Define Guide type with: slug, title, description, readTime, difficulty, content

### 4.2 Guides Landing
- [ ] Create `src/app/guides/page.tsx`
- [ ] Add filter by difficulty
- [ ] List all guides

### 4.3 Guide Template
- [ ] Create `src/app/guides/[slug]/page.tsx`
- [ ] Render guide content with proper formatting

### 4.4 Create Launch Guides
- [ ] Guide 1: "What is Claude Code?"
- [ ] Guide 2: "Set Up Claude Code (Mac)"
- [ ] Guide 3: "Set Up Claude Code (Windows)"
- [ ] Guide 4: "Plan Mode Habit"

### 4.5 Cross-link
- [ ] Add "Full Guide" links from tool pages to guides
- [ ] Add "Quick Start" links from guides to tool pages

### 4.6 Verify Phase 4
- [ ] Run `npm run build`
- [ ] Test all guide pages

---

## Phase 5: Skills Library

### 5.1 Skills Data
- [ ] Create `src/lib/skills.ts`
- [ ] Define Skill type
- [ ] Add 20 curated skills

### 5.2 Skills Page
- [ ] Create `src/app/skills/page.tsx`
- [ ] Category filter (Development, Marketing, Productivity)
- [ ] Skill cards with install instructions

### 5.3 Verify Phase 5
- [ ] Run `npm run build`
- [ ] Test skills page

---

## Phase 6: Polish

### 6.1 Mobile Optimization
- [ ] Test all pages on mobile viewport
- [ ] Fix any layout issues

### 6.2 Performance
- [ ] Run Lighthouse audit
- [ ] Optimize images if needed

### 6.3 SEO
- [ ] Update metadata on all pages
- [ ] Ensure proper Open Graph tags

### 6.4 Final Verification
- [ ] Full build passes
- [ ] All pages load correctly
- [ ] Mobile responsive
- [ ] No console errors

---

## Current Status

**Phase:** 1
**Current Task:** 1.1 Create New Types
**Blockers:** None
