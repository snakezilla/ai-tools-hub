/**
 * DEPRECATED: Simplified Tool Data Structure (Reference Only)
 *
 * This file was created during v2.0 specification planning as a proposal for
 * simplified tool data. The actual implementation uses an enhanced Tool interface
 * in src/lib/tools.ts that is a superset of SimpleTool, providing better UX while
 * maintaining full specification compliance.
 *
 * See docs/SPEC_COMPLIANCE.md for rationale on the design decision.
 * Reference only - do not use for new tool definitions.
 */

export type Difficulty = "beginner" | "intermediate" | "advanced"

export interface SimpleTool {
  slug: string
  name: string
  tagline: string
  difficulty: Difficulty
  readTime: string
  perfectFor: string[]
  quickstart: string[] // Exactly 5 simple steps
  demoVideo?: string
  fullGuideSlug?: string
  category: string
  tier: 1 | 2
}

export const tools: SimpleTool[] = [
  {
    slug: "claude",
    name: "Claude",
    tagline: "AI assistant for reasoning, writing, and analysis",
    difficulty: "beginner",
    readTime: "3 min",
    perfectFor: ["Writers", "Analysts", "Small Teams"],
    quickstart: [
      "Go to claude.ai",
      "Click 'Sign Up' and create an account",
      "Type your question in the chat box",
      "Press Enter to send",
      "Try: 'Help me write a professional email'"
    ],
    demoVideo: "/demos/claude-demo.mp4",
    fullGuideSlug: "claude-complete-guide",
    category: "General AI",
    tier: 1
  },
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
      "Log in: /login (follow browser prompts)",
      "Navigate to your project: cd your-project",
      "Ask: 'Explain what this codebase does'"
    ],
    demoVideo: "/demos/claude-code-demo.mp4",
    fullGuideSlug: "claude-code-complete-guide",
    category: "Development",
    tier: 1
  },
  {
    slug: "claude-skills",
    name: "Claude Skills",
    tagline: "50+ extensions that make Claude an expert",
    difficulty: "intermediate",
    readTime: "5 min",
    perfectFor: ["Claude Code Users", "Marketers", "Power Users"],
    quickstart: [
      "Start Claude Code: claude",
      "Ask: 'Install marketing skills from github.com/coreyhaines31/marketingskills'",
      "Wait for installation to complete",
      "Use a skill: type /page-cro",
      "Describe your task in plain English"
    ],
    demoVideo: undefined,
    fullGuideSlug: "claude-skills-complete-guide",
    category: "Development",
    tier: 1
  },
  {
    slug: "claude-cowork",
    name: "Claude Cowork",
    tagline: "Desktop AI agent for file tasks",
    difficulty: "beginner",
    readTime: "5 min",
    perfectFor: ["Anyone with a messy computer", "Researchers", "Content Creators"],
    quickstart: [
      "Download Claude Desktop from claude.ai/download",
      "Install and sign in with Claude Pro/Max",
      "Click 'Cowork' mode in the app",
      "Grant access to one folder (like Downloads)",
      "Ask: 'Organize this folder by file type'"
    ],
    demoVideo: undefined,
    fullGuideSlug: "claude-cowork-guide",
    category: "Productivity",
    tier: 1
  },
  {
    slug: "manus-ai",
    name: "Manus AI",
    tagline: "Autonomous AI that completes entire tasks",
    difficulty: "beginner",
    readTime: "4 min",
    perfectFor: ["Marketers", "Researchers", "Business Owners"],
    quickstart: [
      "Go to manus.ai",
      "Create an account",
      "Click 'New Task'",
      "Describe what you need in detail",
      "Check back in a few minutes for results"
    ],
    demoVideo: "/demos/manus-demo.mp4",
    fullGuideSlug: "manus-ai-guide",
    category: "Autonomous Agents",
    tier: 1
  },
  {
    slug: "chatgpt",
    name: "ChatGPT",
    tagline: "All-purpose AI with voice and vision",
    difficulty: "beginner",
    readTime: "3 min",
    perfectFor: ["Everyone", "Content Creators", "Professionals"],
    quickstart: [
      "Go to chatgpt.com",
      "Sign up with Google or email",
      "Type your question in the chat box",
      "Press Enter to send",
      "Tip: Go to Settings > Data Controls to adjust privacy"
    ],
    demoVideo: undefined,
    fullGuideSlug: "chatgpt-guide",
    category: "General AI",
    tier: 2
  },
  {
    slug: "perplexity",
    name: "Perplexity",
    tagline: "AI search that shows its sources",
    difficulty: "beginner",
    readTime: "2 min",
    perfectFor: ["Researchers", "Students", "Professionals"],
    quickstart: [
      "Go to perplexity.ai",
      "Type your question (no account needed!)",
      "Press Enter",
      "Read the summary with numbered citations",
      "Click citations to verify sources"
    ],
    demoVideo: undefined,
    fullGuideSlug: "perplexity-guide",
    category: "Research",
    tier: 2
  },
  {
    slug: "zapier",
    name: "Zapier",
    tagline: "Connect 8,000+ apps without code",
    difficulty: "intermediate",
    readTime: "10 min",
    perfectFor: ["Sales Teams", "Operations", "Content Teams"],
    quickstart: [
      "Go to zapier.com and sign up",
      "Click 'Create Zap'",
      "Choose a trigger app (e.g., Google Forms)",
      "Choose an action app (e.g., Slack)",
      "Test and turn on your automation"
    ],
    demoVideo: undefined,
    fullGuideSlug: "zapier-guide",
    category: "Automation",
    tier: 2
  }
]

// Helper functions
export function getToolBySlug(slug: string): SimpleTool | undefined {
  return tools.find((tool) => tool.slug === slug)
}

export function getToolsByTier(tier: 1 | 2): SimpleTool[] {
  return tools.filter((tool) => tool.tier === tier)
}

export function getToolsByCategory(category: string): SimpleTool[] {
  return tools.filter((tool) => tool.category === category)
}

export function getToolsByDifficulty(difficulty: Difficulty): SimpleTool[] {
  return tools.filter((tool) => tool.difficulty === difficulty)
}
