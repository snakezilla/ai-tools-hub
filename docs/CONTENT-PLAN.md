# Content Creation Plan - Inspired by MasteringAI.io

## Content Philosophy

**Their Approach (What Works):**
- Conversational, slightly irreverent tone ("Hell yes", relatable frustration)
- Personal anecdotes build relatability, not just authority
- Real-world examples with specific outcomes (not vague promises)
- Clear problem → solution → proof structure
- FAQ sections that address actual beginner fears
- Comparative tables (Tool A vs Tool B)
- Social proof from recognizable sources (Google engineer, Wharton professor)

**Our Adaptation:**
- Keep it even simpler - shorter paragraphs, more bullet points
- Focus on "I did this, here's exactly how" over theory
- Every guide ends with "Your turn: Try this now"
- No fluff intros - get to the value in first 2 sentences

---

## Guide Content to Create

### Tier 1: Getting Started (Beginner)

#### 1. "What is Claude Code and Why Should You Care?"
**Read time:** 5 min | **Difficulty:** Beginner

**Structure:**
```
1. The One-Sentence Explanation
   "Claude Code is an AI that does things on your computer, not just talks about them."

2. ChatGPT vs Claude Code (Simple Table)
   | ChatGPT | Claude Code |
   |---------|-------------|
   | Writes text | Runs commands |
   | You copy/paste | It does the work |
   | Browser-based | Lives in your terminal |

3. What Can It Actually Do? (5 real examples)
   - Organize 500 files in your Downloads folder
   - Build a website from a description
   - Analyze your calendar and create charts
   - Fix bugs in code you don't understand
   - Turn meeting notes into action items

4. Do I Need to Know How to Code?
   No. You describe what you want in plain English.

5. What Does It Cost?
   - Free: Not available standalone
   - With Claude Pro ($20/mo): Included
   - With Claude Max ($100/mo): More usage

6. Your Turn: Try This Now
   [Link to quickstart]
```

---

#### 2. "Set Up Claude Code in 15 Minutes (Mac)"
**Read time:** 12 min | **Difficulty:** Beginner

**Structure:**
```
1. What You Need Before Starting
   - A Mac (macOS 13+)
   - Claude Pro subscription ($20/mo)
   - 15 minutes of uninterrupted time

2. Step 1: Open Terminal
   - Press Cmd + Space
   - Type "Terminal"
   - Press Enter
   [Screenshot placeholder]

3. Step 2: Install Claude Code
   - Copy this command: curl -fsSL https://claude.ai/install.sh | sh
   - Paste into Terminal (Cmd + V)
   - Press Enter
   - Wait 30 seconds
   [Screenshot placeholder]

4. Step 3: Verify Installation
   - Type: claude doctor
   - Press Enter
   - You should see: "All checks passed"
   [Screenshot placeholder]

5. Step 4: Log In
   - Type: claude
   - Press Enter
   - Type: /login
   - Browser will open - sign in with your Claude account
   [Screenshot placeholder]

6. Step 5: Try Your First Command
   - Navigate to any folder: cd ~/Documents
   - Type: claude
   - Ask: "What files are in this folder?"

7. Troubleshooting
   - "Command not found" → Restart Terminal
   - "Not logged in" → Run /login again
   - Still stuck? → [Link to contact]

8. Your Turn
   Ask Claude Code: "Create a simple text file called hello.txt with a greeting"
```

---

#### 3. "Set Up Claude Code in 15 Minutes (Windows)"
**Read time:** 12 min | **Difficulty:** Beginner

Same structure as Mac guide, Windows-specific commands.

---

### Tier 2: Level Up (Intermediate)

#### 4. "Plan Mode: The Habit That Saves Hours"
**Read time:** 8 min | **Difficulty:** Intermediate

**Structure:**
```
1. The Problem
   You ask Claude Code to "add a login system" and it:
   - Guesses wrong about your tech stack
   - Builds something you don't need
   - Wastes 20 minutes of your API credits

2. The Solution: Plan Mode
   Before building, make Claude Code PLAN first.

3. How to Use Plan Mode
   - Start any task by saying: "Plan this before you build it"
   - Or type: /plan
   - Review the plan before approving

4. Example: Without Plan Mode (Bad)
   You: "Add user authentication"
   Claude: *immediately starts building with JWT*
   You: "Wait, I wanted OAuth..."

5. Example: With Plan Mode (Good)
   You: "Plan how to add user authentication"
   Claude: "Here are 3 approaches:
   1. OAuth (Google/GitHub login)
   2. Email/password with JWT
   3. Magic links
   Which do you prefer?"
   You: "Option 1"
   Claude: *builds exactly what you want*

6. When to Use Plan Mode
   - Any task taking more than 5 minutes
   - Anything involving multiple files
   - When you're not sure what you want

7. Your Turn
   Next time you ask Claude Code for something, add "plan this first" and see the difference.
```

---

#### 5. "Claude Code Skills: Install and Use in 10 Minutes"
**Read time:** 10 min | **Difficulty:** Intermediate

**Structure:**
```
1. What's a Skill?
   A small instruction file that makes Claude Code expert at one thing.
   Like hiring a specialist instead of a generalist.

2. Example: /page-cro Skill
   Without skill: "Review my landing page" → Generic feedback
   With skill: "Review my landing page" → Specific CRO framework, conversion metrics, actionable changes

3. How to Install Skills (The Easy Way)
   - Start Claude Code: claude
   - Say: "Install the marketing skills from github.com/coreyhaines31/marketingskills"
   - Done. Claude handles everything.

4. How to Use a Skill
   - Type the skill name: /page-cro
   - Describe your task: "Analyze example.com"
   - Get expert-level output

5. Top 10 Skills to Install First
   | Skill | What It Does |
   |-------|--------------|
   | /page-cro | Landing page optimization |
   | /seo-audit | Technical SEO analysis |
   | /copywriting | High-converting copy |
   | /code-review | Find bugs and issues |
   | /frontend-design | UI/UX guidance |
   | ... |

6. Where to Find More Skills
   - github.com/travisvn/awesome-claude-skills (50+)
   - github.com/coreyhaines31/marketingskills (23)

7. Your Turn
   Install one skill and try it on a real project.
```

---

#### 6. "Stop Getting Bad AI Results: Context Management"
**Read time:** 10 min | **Difficulty:** Intermediate

**Structure:**
```
1. Why Your AI Results Suck
   Claude Code doesn't know:
   - Your project structure
   - Your coding style
   - Your business context
   - What you've tried before

2. The Fix: Give Better Context

3. Method 1: CLAUDE.md File
   Create a file called CLAUDE.md in your project root.
   Claude Code reads this automatically.

   Example CLAUDE.md:
   ```
   # Project: E-commerce Site
   - Framework: Next.js 14
   - Database: PostgreSQL
   - Style: Tailwind CSS
   - Never use: jQuery, Bootstrap
   - Always: TypeScript strict mode
   ```

4. Method 2: Start With Context
   Bad: "Add a button"
   Good: "In our Next.js e-commerce site, add an 'Add to Cart' button to the product page that updates the cart count in the header"

5. Method 3: Reference Files
   "Look at src/components/Button.tsx and create a similar button for the checkout page"

6. Before/After Examples
   [Show real examples of vague vs. specific prompts]

7. Your Turn
   Create a CLAUDE.md file for your current project.
```

---

### Tier 3: Use Cases (Practical)

#### 7. "Organize Your Downloads Folder in 5 Minutes"
**Read time:** 5 min | **Difficulty:** Beginner

```
1. The Problem
   Your Downloads folder has 847 files. It's chaos.

2. The Solution
   Let Claude Code sort it for you.

3. Step by Step
   - Open Terminal
   - Type: claude
   - Say: "Go to my Downloads folder and organize all files into subfolders by type: PDFs, Images, Documents, Spreadsheets, Other"
   - Watch it work

4. What You'll Get
   Downloads/
   ├── PDFs/
   ├── Images/
   ├── Documents/
   ├── Spreadsheets/
   └── Other/

5. Pro Tip
   Add: "and create a summary.txt listing what went where"

6. Your Turn
   Try it now. Takes 2 minutes.
```

---

#### 8. "Turn Meeting Notes into Action Items"
**Read time:** 5 min | **Difficulty:** Beginner

---

#### 9. "Create a Simple Website from a Description"
**Read time:** 10 min | **Difficulty:** Beginner

---

#### 10. "Analyze a Spreadsheet and Create Charts"
**Read time:** 8 min | **Difficulty:** Intermediate

---

### Tier 4: Comparisons

#### 11. "Claude Code vs Cursor vs Windsurf: Which One?"
**Read time:** 8 min | **Difficulty:** Beginner

```
1. One-Sentence Summary
   - Claude Code: Best for terminal power users
   - Cursor: Best for visual coders who want an IDE
   - Windsurf: Best for beginners who want AI-first

2. Comparison Table
   | Feature | Claude Code | Cursor | Windsurf |
   |---------|-------------|--------|----------|
   | Interface | Terminal | VS Code fork | Custom IDE |
   | Learning curve | Medium | Low | Low |
   | Price | Included w/ Claude Pro | $20/mo | $15/mo |
   | Best for | Power users | Developers | Beginners |

3. My Recommendation
   - New to coding? Start with Windsurf
   - Already use VS Code? Try Cursor
   - Want maximum control? Claude Code

4. You Can Use Multiple
   I use Claude Code for automation, Cursor for coding.
```

---

#### 12. "Agents vs Skills vs Hooks vs MCP: What's the Difference?"
**Read time:** 12 min | **Difficulty:** Intermediate

```
1. The Confusion
   Everyone throws around "agents" and "skills" like they're the same. They're not.

2. Simple Definitions
   | Term | What It Is | Analogy |
   |------|------------|---------|
   | Skill | Instruction file | A recipe card |
   | Agent | AI that can act | A sous chef |
   | Hook | Auto-trigger | A kitchen timer |
   | MCP | Connection to tools | Kitchen equipment |

3. Skills: Teaching Claude Expertise
   [Explanation with example]

4. Agents: Delegation That Works
   [Explanation with example]

5. Hooks: Automation Triggers
   [Explanation with example]

6. MCP: Connecting to External Tools
   [Explanation with example]

7. When to Use What
   - Want better output? → Skill
   - Want hands-off work? → Agent
   - Want automatic actions? → Hook
   - Want to connect to APIs? → MCP

8. Start Simple
   Most people only need skills. Add the rest when you hit limits.
```

---

## Content Production Workflow

### For Each Guide:

1. **Draft Structure** (15 min)
   - Problem statement
   - Solution overview
   - Step-by-step (numbered)
   - Examples (before/after or comparison)
   - "Your Turn" action item

2. **Write Content** (30-60 min)
   - Short paragraphs (2-3 sentences max)
   - Code blocks with comments
   - Tables for comparisons
   - Screenshots placeholders marked

3. **Create in MDX** (15 min)
   - Save to `/src/content/guides/[slug].mdx`
   - Add frontmatter: title, description, readTime, difficulty, publishedAt

4. **Add to guides.ts** (5 min)
   - Update the guide index

### Frontmatter Template:
```mdx
---
title: "Guide Title"
description: "One-sentence description for SEO"
readTime: "10 min"
difficulty: "beginner" | "intermediate" | "advanced"
publishedAt: "2026-01-23"
author: "Practical Library"
category: "getting-started" | "level-up" | "use-cases" | "comparisons"
---
```

---

## Content Priority Queue

### Week 1 (Launch Content)
1. What is Claude Code and Why Should You Care?
2. Set Up Claude Code in 15 Minutes (Mac)
3. Set Up Claude Code in 15 Minutes (Windows)
4. Plan Mode: The Habit That Saves Hours

### Week 2
5. Claude Code Skills: Install and Use in 10 Minutes
6. Stop Getting Bad AI Results: Context Management
7. Organize Your Downloads Folder in 5 Minutes

### Week 3
8. Turn Meeting Notes into Action Items
9. Create a Simple Website from a Description
10. Claude Code vs Cursor vs Windsurf

### Week 4
11. Analyze a Spreadsheet and Create Charts
12. Agents vs Skills vs Hooks vs MCP

---

## Writing Style Guide

### Do:
- Start with the outcome, not the setup
- Use "you" and "your"
- Include specific numbers ("5 minutes", "3 steps")
- Show real examples with real output
- End every guide with an action item

### Don't:
- Long introductions explaining why the topic matters
- Jargon without immediate explanation
- Screenshots without context
- Vague outcomes ("improve your workflow")
- Passive voice

### Voice Examples:
```
❌ "In this guide, we will explore the various ways in which Claude Code can be utilized to enhance productivity."

✅ "Claude Code can organize 500 files in 2 minutes. Here's how."
```

```
❌ "The installation process has been designed to be straightforward."

✅ "Installation takes 30 seconds. Copy, paste, done."
```

---

## Measurement

### Per Guide:
- Read time accuracy (test with real users)
- Completion rate (do people finish?)
- Action taken (did they try the "Your Turn"?)

### Success Metrics:
- Guide → Tool page click rate
- Guide → Course conversion rate
- Time on page > 2 minutes
