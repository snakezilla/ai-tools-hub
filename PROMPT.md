# AI Tools Education Hub - Ralph Development Instructions

## Project Vision

Build a clean, Figma-level website that teaches non-technical users (marketers, accountants, home users, small teams) how to use high-impact AI tools that didn't exist a year ago. Free educational content that delivers massive value, with paid in-person workshops as the business model.

**Core Philosophy:** Algorithmic, zero-fluff content. Every tool gets a "5-Minute Mastery" card. No essays, no hype—just actionable steps.

---

## Architecture

### Site Structure

```
Homepage
├── Hero: "AI tools that save 10+ hours/week. Learn them in 5 minutes."
├── ROI Calculator CTA (primary conversion)
├── Foundation Tools Grid (7+ generalist tools with auto-play demos)
│
├── /tools/[tool-name] (individual tool pages)
│   ├── 5-Minute Mastery Card
│   ├── Auto-playing demo loop (5-8 sec)
│   ├── Related niche tools (branches)
│   └── "Calculate your savings" CTA
│
├── /workflows (AI power combos)
│   ├── Design-to-Code (Google AI Studio → Claude Code)
│   ├── Marketing Autopilot (Claude Code + Marketing Skills)
│   └── Full Skill Stack (Claude Code + 50+ skills)
│
├── /category/[role] (browse by role)
│   ├── Marketing
│   ├── Accounting & Finance
│   ├── Operations
│   └── Home & Personal
│
├── /workshops (paid offering)
│   ├── ROI calculator results → booking flow
│   └── Team workshop packages
│
└── /about (credibility, story)
```

### Foundation Tools (Generalist Hub)

These are the "Big 7+" that every user should know:

1. **Claude** - Reasoning, writing, analysis (Anthropic)
2. **Claude Code** - Terminal-based coding assistant (Anthropic)
3. **Claude Skills** - 50+ specialized extensions for Claude Code
4. **ChatGPT** - All-rounder, voice mode, GPT-5 (OpenAI)
5. **Manus AI** - Autonomous agent, end-to-end task execution (Meta)
6. **Microsoft Copilot** - Office automation, Excel/PowerPoint (Microsoft)
7. **Zapier** - No-code automation across 8,000+ apps
8. **Perplexity** - AI-powered research and search

Each foundation tool links to niche branches:
- Claude Code → Cursor, Windsurf, Cline
- Claude Skills → Marketing Skills, Frontend Design, MCP Builder
- Zapier → Make, n8n, Power Automate
- Manus → Devin, AutoGPT, CrewAI

### Workflows (Power Combos)

Workflows combine multiple tools for exponential results:

1. **Design-to-Code** - Google AI Studio (frontend from screenshots) → Claude Code (backend)
   - Resources: aistudio.google.com, Claude Code docs

2. **Marketing Autopilot** - Claude Code + 23 Marketing Skills (CRO, SEO, copywriting)
   - Resources: github.com/coreyhaines31/marketingskills

3. **Full Skill Stack** - Claude Code + 50+ specialized skills from awesome-claude-skills
   - Resources: github.com/travisvn/awesome-claude-skills, github.com/obra/superpowers

### Claude Skills Ecosystem

Claude Skills are specialized folders that teach Claude to perform tasks repeatably:

**Official Skills:**
- Document handling: docx, pdf, pptx, xlsx
- Design & creative: algorithmic-art, canvas-design, slack-gif-creator
- Development: frontend-design, mcp-builder, webapp-testing
- Communication: brand-guidelines, internal-comms

**Community Collections:**
- Awesome Claude Skills (github.com/travisvn/awesome-claude-skills)
- Marketing Skills - 23 skills for CRO, SEO, copywriting (github.com/coreyhaines31/marketingskills)
- Superpowers - 20+ battle-tested skills (github.com/obra/superpowers)

**Installation:**
1. Clone or download skill folder
2. Copy to ~/.claude/skills/
3. Skills auto-activate when contextually relevant
4. Or invoke directly: /skill-name

---

## Content Format: "5-Minute Mastery" Card

Every tool page follows this EXACT template:

```
┌─────────────────────────────────────────────────────┐
│ [TOOL NAME]                                         │
│ One-line description of what it does                │
├─────────────────────────────────────────────────────┤
│ ⏱️ Setup: X minutes  │  💰 Cost: Free/$X/mo        │
│ 🔒 Privacy: [FLAG]   │  ⚡ Time saved: X hrs/week  │
├─────────────────────────────────────────────────────┤
│ [AUTO-PLAY DEMO LOOP - 5-8 seconds]                 │
│ Shows: prompt → processing → output                 │
├─────────────────────────────────────────────────────┤
│ 3 USE CASES                                         │
│ 1. [Role]: [Specific task] → [Outcome]              │
│ 2. [Role]: [Specific task] → [Outcome]              │
│ 3. [Role]: [Specific task] → [Outcome]              │
├─────────────────────────────────────────────────────┤
│ QUICKSTART (numbered steps)                         │
│ 1. Go to [URL]                                      │
│ 2. [Action]                                         │
│ 3. [Action]                                         │
│ 4. Try this prompt: "[example]"                     │
├─────────────────────────────────────────────────────┤
│ 🚨 PRIVACY FLAGS                                    │
│ • Data retention: [Yes/No/Configurable]             │
│ • Training on your data: [Yes/No/Opt-out]           │
│ • Enterprise option: [Yes/No]                       │
├─────────────────────────────────────────────────────┤
│ RELATED TOOLS (niche branches)                      │
│ → [Tool 1] - for [specific use case]                │
│ → [Tool 2] - for [specific use case]                │
└─────────────────────────────────────────────────────┘
```

---

## Demo Loop Specifications (Built with Remotion)

Each tool needs a 5-8 second auto-playing, silent, looping video. **Use Remotion** to generate these programmatically with React—no screen recording needed.

### Why Remotion
- Videos are code (React components) → easy to update when tools change
- Consistent style across all demos
- Tiny file sizes (~500KB-1MB per video)
- Claude Code can generate the animations from natural language prompts

### Output Format
- MP4 (H.264, compressed)
- 1920x1080 or 1280x720
- 30fps, 150-240 frames (5-8 seconds)
- Auto-play, muted, loop on site

### Standard Demo Structure (3-Act)

```
Act 1 (0-2 sec): THE PROMPT
- Show a clean UI mockup of the tool
- Typewriter animation types the user's prompt
- Blinking cursor for realism

Act 2 (2-4 sec): THE MAGIC
- "Thinking" indicator (pulsing dots, spinner, or progress bar)
- Optional: show brief "working" state

Act 3 (4-7 sec): THE OUTPUT
- Reveal the result with a smooth transition
- Highlight key features with annotations
- Show time saved: "10 min vs 4 hours"
- Hold for 1 sec, then loop
```

### Remotion Project Structure

```
/remotion
├── src/
│   ├── compositions/
│   │   ├── ClaudeDemo.tsx
│   │   ├── ManusDemo.tsx
│   │   ├── ZapierDemo.tsx
│   │   └── ...
│   ├── components/
│   │   ├── MockTerminal.tsx      # Terminal UI for CLI tools
│   │   ├── MockBrowser.tsx       # Browser chrome for web tools
│   │   ├── Typewriter.tsx        # Typing animation
│   │   ├── ThinkingIndicator.tsx # Loading states
│   │   └── FeatureCallout.tsx    # Annotation bubbles
│   ├── styles/
│   │   └── theme.ts              # Consistent colors/fonts
│   └── Root.tsx
├── public/
│   └── outputs/                  # Rendered MP4s go here
└── remotion.config.ts
```

### Example: Manus Demo Composition

```tsx
// src/compositions/ManusDemo.tsx
export const ManusDemo: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  // Act 1: Typewriter prompt (0-60 frames)
  // Act 2: Thinking animation (60-120 frames)
  // Act 3: Reveal PowerPoint output (120-210 frames)

  return (
    <AbsoluteFill style={{ backgroundColor: '#f8fafc' }}>
      <MockBrowser url="manus.ai">
        {frame < 60 && (
          <Typewriter
            text="Create a competitive analysis presentation for Acme Corp"
            startFrame={10}
            charsPerSecond={20}
          />
        )}
        {frame >= 60 && frame < 120 && (
          <ThinkingIndicator label="Manus is working..." />
        )}
        {frame >= 120 && (
          <Sequence from={120}>
            <PowerPointMockup />
            <FeatureCallout
              text="Fully editable • Your brand colors • 10 min vs 4 hrs"
              position="bottom"
            />
          </Sequence>
        )}
      </MockBrowser>
    </AbsoluteFill>
  );
};
```

### Rendering Demos

```bash
# Render single demo
npx remotion render ManusDemo out/manus-demo.mp4

# Render all demos
npx remotion render --all
```

### For Each Tool, Create:
1. A composition file in `/remotion/src/compositions/[ToolName]Demo.tsx`
2. Appropriate mock UI (terminal for CLI tools, browser for web tools)
3. Realistic prompt text showing a valuable use case
4. Output that demonstrates the "wow factor"

---

## Hormozi Value Equation (Applied Implicitly)

**Formula:** (Dream Outcome × Likelihood of Success) ÷ (Time × Effort) = Value

Apply this through the metrics on every card:
- **Dream Outcome:** "Time saved: X hrs/week" + specific use cases
- **Likelihood of Success:** "Setup: 5 min" (it's that easy)
- **Time Delay:** Quick start steps (you can do this NOW)
- **Effort:** Numbered steps, copy-paste prompts (minimal friction)

**DO NOT** explain the framework on the site. Let the structure do the selling.

---

## Design Specifications

### Aesthetic: "Figma-level clean"

- **Colors:** Neutral base (white/off-white), single accent color, dark text
- **Typography:** Large, readable. Inter or similar. 18px+ body text.
- **Spacing:** Generous whitespace. Cards breathe. Nothing cramped.
- **Animations:** Subtle. Only the demo loops move. No bouncing, no parallax.
- **Mobile-first:** Cards stack cleanly on mobile.

### Reference sites for aesthetic:
- linear.app (clean, professional)
- stripe.com (demo loops)
- notion.so (minimalist)
- vercel.com (developer-friendly but accessible)

### Anti-patterns to AVOID:
- Gradients everywhere
- Stock photos of people pointing at screens
- "AI" buzzword graphics (robots, neural networks)
- Testimonial carousels
- Cookie banners that cover content
- Newsletter popups

---

## ROI Calculator (Primary Conversion)

Interactive calculator that shows potential savings:

**Inputs:**
- Team size
- Primary tasks (checkboxes: content creation, data analysis, scheduling, etc.)
- Current hours spent on these tasks

**Output:**
- Estimated hours saved per week
- Estimated annual savings (hours × average hourly rate)
- "Top 3 tools for your situation"

**CTA:**
"Want help implementing these tools for your team? Book a workshop."
→ Links to workshop booking page

---

## Workshop Offering

**Format:** In-person, half-day or full-day sessions for small teams (5-20 people)

**Value proposition:**
- Hands-on setup of 3-5 tools
- Custom workflows for YOUR business
- Q&A and troubleshooting
- 90-day email support

**Pricing strategy (Hormozi-aligned):**
- Price anchored against cost of NOT having it (calculator shows this)
- Guarantee: "If you don't save 10+ hours in the first month, full refund"

---

## Research Requirements

### Ongoing tool discovery:
1. Monitor Twitter/X for viral AI tool threads
2. Track Product Hunt launches
3. Follow key accounts: @levelsio, @marc_louvion, @danielgross, @skiaborai
4. Verify claims before featuring (no vaporware)

### Validation criteria for new tools:
- [ ] Actually works (tested personally)
- [ ] Setup under 30 minutes
- [ ] Free tier or trial available
- [ ] Clear privacy policy
- [ ] Not just hype (real utility demonstrated)

### Reference materials in this folder:
- `pdfcoffee.com-alex-hormozi-100m-offers-how-to-make-offers-so-good-people-feel-stupid-saying-no-2021.pdf` - Value equation, offer structure
- `dokumen.pub_100m-leads-how-to-get-strangers-to-want-to-buy-your-stuff.epub` - Lead generation, content strategy

---

## Technical Stack (Suggested)

- **Framework:** Next.js 14+ (App Router)
- **Styling:** Tailwind CSS
- **CMS:** MDX for tool pages (easy to update)
- **Demo Videos:** Remotion (React-based video generation)
- **Hosting:** Vercel
- **Analytics:** Plausible (privacy-friendly)
- **Forms:** React Hook Form + Resend for emails

---

## Implementation Phases

### Phase 1: Foundation
- [ ] Set up Next.js project with Tailwind
- [ ] Create 5-Minute Mastery card component
- [ ] Build homepage with hero and grid
- [ ] Implement 3 foundation tool pages (Claude, Claude Code, Manus)

### Phase 2: Content & Demos
- [ ] Add remaining foundation tools
- [ ] Set up Remotion project in `/remotion` folder
- [ ] Create reusable components: MockTerminal, MockBrowser, Typewriter, ThinkingIndicator
- [ ] Build demo composition for each foundation tool
- [ ] Render all demo MP4s to `/public/demos`
- [ ] Add privacy flags research
- [ ] Implement category browsing

### Phase 3: Conversion
- [ ] Build ROI calculator
- [ ] Create workshop booking flow
- [ ] Add analytics tracking

### Phase 4: Polish
- [ ] Mobile optimization
- [ ] Performance optimization (Core Web Vitals)
- [ ] SEO metadata
- [ ] Social sharing previews

---

## Key Principles

1. **Zero fluff** - If it doesn't help someone use the tool, cut it
2. **Scannable** - Users should get value in under 60 seconds per tool
3. **Honest** - Include privacy warnings, don't oversell
4. **Generous** - Give away so much value that workshops feel like a steal
5. **Current** - Tools change fast; build for easy updates

---

## Status Reporting (Required for Ralph)

At the end of each response, include:

```
---RALPH_STATUS---
STATUS: IN_PROGRESS | COMPLETE | BLOCKED
TASKS_COMPLETED_THIS_LOOP: <number>
FILES_MODIFIED: <number>
TESTS_STATUS: PASSING | FAILING | NOT_RUN
WORK_TYPE: IMPLEMENTATION | TESTING | DOCUMENTATION | REFACTORING
EXIT_SIGNAL: false | true
RECOMMENDATION: <one line summary of what to do next>
---END_STATUS---
```
