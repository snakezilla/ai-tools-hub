export interface Workflow {
  slug: string
  name: string
  tagline: string
  tools: {
    name: string
    role: string
    url: string
  }[]
  setupTime: string
  benefit: string
  steps: string[]
  proTips?: string[]
  useCases: {
    scenario: string
    outcome: string
  }[]
  resources: {
    name: string
    url: string
    type: "github" | "website" | "docs"
  }[]
  demoUrl?: string
}

export const workflows: Workflow[] = [
  {
    slug: "design-to-code",
    name: "Design-to-Code",
    tagline: "Screenshot to full-stack app in minutes",
    tools: [
      {
        name: "Google AI Studio",
        role: "Frontend generation from screenshots",
        url: "https://aistudio.google.com/app/",
      },
      {
        name: "Claude Code",
        role: "Backend logic, APIs, database",
        url: "https://claude.ai/code",
      },
    ],
    setupTime: "10 min",
    benefit: "Build complete apps without writing boilerplate",
    steps: [
      "Open Google AI Studio (aistudio.google.com)",
      "Drag in a screenshot or mockup of your desired UI",
      "Prompt: 'Generate React/HTML code for this design'",
      "Copy the frontend code to your project",
      "Open Claude Code in your terminal",
      "Prompt: 'Add backend API and database for this frontend'",
      "Claude Code wires up the full stack automatically",
    ],
    proTips: [
      "Use Google Antigravity (in AI Studio) to access Opus 4.5 for free—ideal for complex frontend generation.",
      "Google AI Studio + Gemini is best for visual-to-code tasks (screenshots, mockups).",
      "Claude Code + Opus is best for complex backend logic, architecture decisions, and debugging.",
      "Combine both: Gemini for frontend, Claude for backend = best of both worlds at minimal cost.",
    ],
    useCases: [
      {
        scenario: "Recreate a landing page you admire",
        outcome: "Pixel-perfect clone in 15 minutes",
      },
      {
        scenario: "Turn a Figma mockup into working code",
        outcome: "Skip weeks of frontend development",
      },
      {
        scenario: "Build an internal tool from a sketch",
        outcome: "Full CRUD app same day",
      },
    ],
    resources: [
      {
        name: "Google AI Studio",
        url: "https://aistudio.google.com/app/",
        type: "website",
      },
      {
        name: "Claude Code Docs",
        url: "https://docs.anthropic.com/claude-code",
        type: "docs",
      },
    ],
  },
  {
    slug: "free-opus-antigravity",
    name: "Free Opus 4.5 via Antigravity",
    tagline: "Access the most powerful AI model in the world—completely free",
    tools: [
      {
        name: "Google AI Studio",
        role: "Host for Antigravity agent chat",
        url: "https://aistudio.google.com/app/",
      },
      {
        name: "Claude Opus 4.5",
        role: "The most powerful AI model available today (made by Anthropic)",
        url: "https://claude.ai",
      },
    ],
    setupTime: "5 min",
    benefit: "Use Claude Opus 4.5—the most powerful AI on the planet—without paying a cent",
    steps: [
      "Open your browser and go to aistudio.google.com/app/",
      "Sign in with your Google account (free)",
      "Look for 'Antigravity' in the agent/chat options",
      "Select Antigravity—this gives you access to Claude Opus 4.5, the most powerful AI model available",
      "Start chatting! Opus is made by Anthropic (the company behind Claude) and outperforms every other AI",
      "Use for complex tasks: architecture decisions, deep analysis, nuanced writing",
    ],
    proTips: [
      "Antigravity = Free Opus 4.5. Perfect for occasional heavy-duty tasks without a subscription.",
      "When to use Antigravity: Complex reasoning, architecture decisions, difficult debugging.",
      "When to use Claude Code: Hands-on coding, file editing, terminal operations.",
      "Combine both: Plan with Antigravity (free), execute with Claude Code (fast).",
      "Antigravity has usage limits—save it for tasks that truly need Opus-level thinking.",
    ],
    useCases: [
      {
        scenario: "Need Opus-level reasoning without subscription",
        outcome: "Access the most powerful model for free",
      },
      {
        scenario: "Complex architecture decision",
        outcome: "Get Opus-quality analysis without paying",
      },
      {
        scenario: "Debugging a tricky problem",
        outcome: "Opus reasoning helps find root cause",
      },
    ],
    resources: [
      {
        name: "Google AI Studio",
        url: "https://aistudio.google.com/app/",
        type: "website",
      },
      {
        name: "Claude Model Comparison",
        url: "https://www.anthropic.com/claude",
        type: "docs",
      },
    ],
  },
  {
    slug: "marketing-autopilot",
    name: "Marketing Autopilot",
    tagline: "Claude Code + 23 marketing skills = growth machine",
    tools: [
      {
        name: "Claude Code",
        role: "Execution engine",
        url: "https://claude.ai/code",
      },
      {
        name: "Marketing Skills",
        role: "CRO, SEO, copywriting expertise",
        url: "https://github.com/coreyhaines31/marketingskills",
      },
    ],
    setupTime: "15 min",
    benefit: "Turn Claude into a marketing team",
    steps: [
      "Clone the marketing skills repo",
      "Copy skills to ~/.claude/skills/",
      "Open Claude Code in your project",
      "Use /page-cro for landing page optimization",
      "Use /seo-audit for search improvements",
      "Use /copywriting for high-converting copy",
      "Use /email-sequence for automated campaigns",
    ],
    useCases: [
      {
        scenario: "Optimize signup conversion rate",
        outcome: "Data-driven CRO recommendations",
      },
      {
        scenario: "Create email nurture sequence",
        outcome: "5-email sequence with proven frameworks",
      },
      {
        scenario: "Audit site for SEO issues",
        outcome: "Prioritized fix list with implementation",
      },
    ],
    resources: [
      {
        name: "Marketing Skills Collection",
        url: "https://github.com/coreyhaines31/marketingskills",
        type: "github",
      },
      {
        name: "Awesome Claude Skills",
        url: "https://github.com/travisvn/awesome-claude-skills",
        type: "github",
      },
    ],
  },
  {
    slug: "skill-stack",
    name: "Full Skill Stack",
    tagline: "50+ specialized skills for any task",
    tools: [
      {
        name: "Claude Code",
        role: "Base AI assistant",
        url: "https://claude.ai/code",
      },
      {
        name: "Awesome Claude Skills",
        role: "Curated skill collections",
        url: "https://github.com/travisvn/awesome-claude-skills",
      },
    ],
    setupTime: "10 min",
    benefit: "Transform Claude into domain expert instantly",
    steps: [
      "Browse awesome-claude-skills for what you need",
      "Clone or download desired skill folders",
      "Copy to ~/.claude/skills/ directory",
      "Skills auto-activate when contextually relevant",
      "Or invoke directly: /skill-name",
      "Stack multiple skills for complex workflows",
    ],
    useCases: [
      {
        scenario: "Need frontend expertise",
        outcome: "Install frontend-design skill",
      },
      {
        scenario: "Building MCP integrations",
        outcome: "Install mcp-builder skill",
      },
      {
        scenario: "Creating data visualizations",
        outcome: "Install algorithmic-art skill",
      },
    ],
    resources: [
      {
        name: "Awesome Claude Skills",
        url: "https://github.com/travisvn/awesome-claude-skills",
        type: "github",
      },
      {
        name: "Superpowers Collection",
        url: "https://github.com/obra/superpowers",
        type: "github",
      },
      {
        name: "Official Skill Docs",
        url: "https://docs.anthropic.com/claude/skills",
        type: "docs",
      },
    ],
  },
]

export function getWorkflowBySlug(slug: string): Workflow | undefined {
  return workflows.find((w) => w.slug === slug)
}

export function getAllWorkflows(): Workflow[] {
  return workflows
}
