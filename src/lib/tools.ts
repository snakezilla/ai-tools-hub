export interface Tool {
  slug: string
  name: string
  tagline: string
  setupTime: string
  cost: string
  privacy: "green" | "yellow" | "red"
  timeSaved: string
  demoUrl?: string
  useCases: {
    role: string
    task: string
    outcome: string
  }[]
  quickstart: string[]
  privacyFlags: {
    dataRetention: string
    trainingOnData: string
    enterpriseOption: string
  }
  relatedTools: {
    name: string
    useCase: string
    slug: string
  }[]
  category: string
  isFoundation: boolean
}

export const tools: Tool[] = [
  {
    slug: "claude",
    name: "Claude",
    tagline: "Advanced reasoning, writing, and analysis AI assistant",
    setupTime: "2 min",
    cost: "Free / $20/mo Pro",
    privacy: "green",
    timeSaved: "5-10 hrs/week",
    useCases: [
      {
        role: "Marketer",
        task: "Draft a product launch email sequence",
        outcome: "Complete 5-email sequence in 10 minutes",
      },
      {
        role: "Accountant",
        task: "Analyze financial statements for anomalies",
        outcome: "Spot discrepancies 10x faster",
      },
      {
        role: "Small Team",
        task: "Write meeting summaries and action items",
        outcome: "Save 30 min per meeting",
      },
    ],
    quickstart: [
      "Go to claude.ai",
      "Sign up with email or Google",
      "Start a new conversation",
      'Try this prompt: "Help me draft a professional email to reschedule a client meeting"',
    ],
    privacyFlags: {
      dataRetention: "30 days (configurable)",
      trainingOnData: "No (opt-out by default)",
      enterpriseOption: "Yes (Team/Enterprise plans)",
    },
    relatedTools: [
      {
        name: "Claude Code",
        useCase: "Terminal-based coding assistant",
        slug: "claude-code",
      },
      {
        name: "ChatGPT",
        useCase: "Alternative all-rounder with voice mode",
        slug: "chatgpt",
      },
    ],
    category: "General AI",
    isFoundation: true,
  },
  {
    slug: "claude-code",
    name: "Claude Code",
    tagline: "Terminal-based AI coding assistant from Anthropic",
    setupTime: "5 min",
    cost: "Usage-based (via API)",
    privacy: "green",
    timeSaved: "10-20 hrs/week",
    useCases: [
      {
        role: "Developer",
        task: "Build a complete feature from a description",
        outcome: "Ship features in hours, not days",
      },
      {
        role: "Startup Founder",
        task: "Scaffold an entire MVP",
        outcome: "Launch prototype in one weekend",
      },
      {
        role: "Ops Engineer",
        task: "Write deployment scripts and configs",
        outcome: "Automate infrastructure setup",
      },
    ],
    quickstart: [
      "Install: npm install -g @anthropic-ai/claude-code",
      "Set API key: export ANTHROPIC_API_KEY=your-key",
      "Navigate to your project directory",
      'Run: claude "Add user authentication to this app"',
    ],
    privacyFlags: {
      dataRetention: "No retention (API)",
      trainingOnData: "No",
      enterpriseOption: "Yes",
    },
    relatedTools: [
      {
        name: "Cursor",
        useCase: "IDE with built-in AI",
        slug: "cursor",
      },
      {
        name: "Windsurf",
        useCase: "AI-first code editor",
        slug: "windsurf",
      },
      {
        name: "Cline",
        useCase: "VS Code extension for AI coding",
        slug: "cline",
      },
    ],
    category: "Development",
    isFoundation: true,
  },
  {
    slug: "manus-ai",
    name: "Manus AI",
    tagline: "Autonomous AI agent that completes tasks end-to-end",
    setupTime: "3 min",
    cost: "Free tier / $30/mo",
    privacy: "yellow",
    timeSaved: "5-15 hrs/week",
    useCases: [
      {
        role: "Marketer",
        task: "Create a competitive analysis presentation",
        outcome: "Complete deck in 10 min vs 4 hours",
      },
      {
        role: "Researcher",
        task: "Compile market research report",
        outcome: "Get sourced report with citations",
      },
      {
        role: "Business Owner",
        task: "Generate social media content calendar",
        outcome: "30-day calendar with captions",
      },
    ],
    quickstart: [
      "Go to manus.ai",
      "Sign up for free account",
      "Click 'New Task'",
      'Describe what you need: "Create a 10-slide pitch deck for my SaaS startup"',
    ],
    privacyFlags: {
      dataRetention: "Yes (task history)",
      trainingOnData: "May be used (check ToS)",
      enterpriseOption: "Coming soon",
    },
    relatedTools: [
      {
        name: "Devin",
        useCase: "Autonomous software engineer",
        slug: "devin",
      },
      {
        name: "AutoGPT",
        useCase: "Open-source autonomous agent",
        slug: "autogpt",
      },
    ],
    category: "Autonomous Agents",
    isFoundation: true,
  },
  {
    slug: "chatgpt",
    name: "ChatGPT",
    tagline: "All-purpose AI assistant with voice and vision",
    setupTime: "2 min",
    cost: "Free / $20/mo Plus",
    privacy: "yellow",
    timeSaved: "5-10 hrs/week",
    useCases: [
      {
        role: "Anyone",
        task: "Get answers to complex questions instantly",
        outcome: "Skip hours of research",
      },
      {
        role: "Content Creator",
        task: "Generate video scripts and content ideas",
        outcome: "10x content output",
      },
      {
        role: "Professional",
        task: "Prepare for meetings and presentations",
        outcome: "Sound more informed, faster",
      },
    ],
    quickstart: [
      "Go to chat.openai.com",
      "Sign up with email, Google, or Apple",
      "Start chatting",
      'Try: "Explain the key points I should make in my quarterly review"',
    ],
    privacyFlags: {
      dataRetention: "30 days",
      trainingOnData: "Yes (can opt out)",
      enterpriseOption: "Yes (Team/Enterprise)",
    },
    relatedTools: [
      {
        name: "Claude",
        useCase: "Better for nuanced reasoning",
        slug: "claude",
      },
      {
        name: "Perplexity",
        useCase: "Better for research with sources",
        slug: "perplexity",
      },
    ],
    category: "General AI",
    isFoundation: true,
  },
  {
    slug: "microsoft-copilot",
    name: "Microsoft Copilot",
    tagline: "AI assistant integrated with Office 365 apps",
    setupTime: "5 min",
    cost: "$30/user/mo",
    privacy: "green",
    timeSaved: "5-10 hrs/week",
    useCases: [
      {
        role: "Office Worker",
        task: "Generate PowerPoint from a document",
        outcome: "Create presentations in minutes",
      },
      {
        role: "Analyst",
        task: "Analyze Excel data with natural language",
        outcome: "Skip complex formulas",
      },
      {
        role: "Manager",
        task: "Draft emails and documents in Word",
        outcome: "Write professional content faster",
      },
    ],
    quickstart: [
      "Ensure you have Microsoft 365 subscription",
      "Enable Copilot in admin center",
      "Open any Office app (Word, Excel, PowerPoint)",
      'Click the Copilot icon and try: "Create a project status report"',
    ],
    privacyFlags: {
      dataRetention: "Enterprise-grade",
      trainingOnData: "No (Microsoft commitment)",
      enterpriseOption: "Yes (built-in)",
    },
    relatedTools: [
      {
        name: "Google Workspace AI",
        useCase: "Alternative for Google ecosystem",
        slug: "google-workspace-ai",
      },
    ],
    category: "Office Productivity",
    isFoundation: true,
  },
  {
    slug: "zapier",
    name: "Zapier",
    tagline: "No-code automation connecting 8,000+ apps",
    setupTime: "10 min",
    cost: "Free / $29.99+/mo",
    privacy: "green",
    timeSaved: "5-20 hrs/week",
    useCases: [
      {
        role: "Sales Team",
        task: "Auto-add leads from forms to CRM",
        outcome: "Never miss a lead again",
      },
      {
        role: "Content Team",
        task: "Auto-post to social when blog publishes",
        outcome: "10x distribution with zero effort",
      },
      {
        role: "Operations",
        task: "Sync data between multiple tools",
        outcome: "Eliminate manual data entry",
      },
    ],
    quickstart: [
      "Go to zapier.com and sign up",
      "Click 'Create Zap'",
      "Choose a trigger app (e.g., 'New row in Google Sheets')",
      "Choose an action app (e.g., 'Send Slack message')",
    ],
    privacyFlags: {
      dataRetention: "Enterprise-configurable",
      trainingOnData: "No",
      enterpriseOption: "Yes (Enterprise plan)",
    },
    relatedTools: [
      {
        name: "Make",
        useCase: "More complex automation flows",
        slug: "make",
      },
      {
        name: "n8n",
        useCase: "Self-hosted automation",
        slug: "n8n",
      },
    ],
    category: "Automation",
    isFoundation: true,
  },
  {
    slug: "perplexity",
    name: "Perplexity",
    tagline: "AI-powered research and search with citations",
    setupTime: "1 min",
    cost: "Free / $20/mo Pro",
    privacy: "green",
    timeSaved: "3-8 hrs/week",
    useCases: [
      {
        role: "Researcher",
        task: "Get sourced answers on any topic",
        outcome: "Research in minutes, not hours",
      },
      {
        role: "Professional",
        task: "Stay updated on industry news",
        outcome: "Curated briefings daily",
      },
      {
        role: "Student",
        task: "Find and cite academic sources",
        outcome: "Better papers, faster",
      },
    ],
    quickstart: [
      "Go to perplexity.ai",
      "Start typing your question",
      "Review answer with inline citations",
      'Try: "What are the latest AI developments this week?"',
    ],
    privacyFlags: {
      dataRetention: "Minimal",
      trainingOnData: "No",
      enterpriseOption: "Yes (Enterprise plan)",
    },
    relatedTools: [
      {
        name: "Claude",
        useCase: "Deeper analysis and reasoning",
        slug: "claude",
      },
      {
        name: "ChatGPT",
        useCase: "General-purpose assistance",
        slug: "chatgpt",
      },
    ],
    category: "Research",
    isFoundation: true,
  },
]

export function getToolBySlug(slug: string): Tool | undefined {
  return tools.find((tool) => tool.slug === slug)
}

export function getFoundationTools(): Tool[] {
  return tools.filter((tool) => tool.isFoundation)
}

export function getToolsByCategory(category: string): Tool[] {
  return tools.filter((tool) => tool.category === category)
}

export function getAllCategories(): string[] {
  const categories = new Set(tools.map((tool) => tool.category))
  return Array.from(categories).sort()
}

// Role-based categories for browsing
export interface RoleCategory {
  slug: string
  name: string
  description: string
  matchingCategories: string[]
}

export const roleCategories: RoleCategory[] = [
  {
    slug: "marketing",
    name: "Marketing",
    description: "AI tools for content creation, campaigns, and audience engagement",
    matchingCategories: ["General AI", "Automation", "Research"],
  },
  {
    slug: "accounting-finance",
    name: "Accounting & Finance",
    description: "AI tools for analysis, reporting, and financial automation",
    matchingCategories: ["General AI", "Office Productivity", "Automation"],
  },
  {
    slug: "operations",
    name: "Operations",
    description: "AI tools for workflow automation and process optimization",
    matchingCategories: ["Automation", "Office Productivity", "General AI"],
  },
  {
    slug: "home-personal",
    name: "Home & Personal",
    description: "AI tools for everyday tasks, research, and personal productivity",
    matchingCategories: ["General AI", "Research", "Autonomous Agents"],
  },
]

export function getRoleCategory(slug: string): RoleCategory | undefined {
  return roleCategories.find((cat) => cat.slug === slug)
}

export function getToolsForRole(roleSlug: string): Tool[] {
  const role = getRoleCategory(roleSlug)
  if (!role) return []
  return tools.filter((tool) => role.matchingCategories.includes(tool.category))
}
