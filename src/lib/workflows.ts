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
