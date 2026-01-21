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
  proTips?: string[]
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
      "Open your web browser and go to claude.ai",
      "Click 'Sign Up' and create account with email or Google",
      "Once logged in, you'll see the chat interface",
      "Type your first message and press Enter to chat",
      'Try this: "Help me draft a professional email to reschedule a client meeting"',
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
    cost: "Free with Claude subscription / API usage",
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
      "Have a Claude Pro subscription? You already have access! Go to: anthropic.com/claude/code",
      "Click 'Connect Claude Code' to link to your terminal (one-click setup)",
      "Or install manually: Open Terminal (Mac: Cmd+Space, type 'Terminal')",
      "Run: npm install -g @anthropic-ai/claude-code",
      "Navigate to any project folder: cd ~/your-project",
      "Start Claude Code: claude",
      'Ask anything: "Add user authentication to this app"',
    ],
    proTips: [
      "Dangerous Mode: Run 'claude --dangerously-skip-permissions' to avoid repeated permission prompts. Use with caution!",
      "Safety Rule: Tell Claude Code to never delete files permanently—always move to a Desktop/Trash folder instead.",
      "Safety Rule: Instruct Claude to always check if a file exists before creating new files (prevents overwrites).",
      "After typing a command, just continue in natural language—no special syntax needed.",
      "Your Claude Pro/Team subscription works with Claude Code—no separate API key required.",
    ],
    privacyFlags: {
      dataRetention: "No retention (API)",
      trainingOnData: "No",
      enterpriseOption: "Yes",
    },
    relatedTools: [
      {
        name: "Claude Skills",
        useCase: "50+ specialized skill extensions",
        slug: "claude-skills",
      },
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
    ],
    category: "Development",
    isFoundation: true,
  },
  {
    slug: "claude-skills",
    name: "Claude Skills",
    tagline: "50+ specialized extensions that transform Claude into a domain expert",
    setupTime: "5 min",
    cost: "Free (open source)",
    privacy: "green",
    timeSaved: "5-15 hrs/week",
    useCases: [
      {
        role: "Marketer",
        task: "Install 23 marketing skills for CRO, SEO, and copywriting",
        outcome: "Claude becomes your marketing team",
      },
      {
        role: "Developer",
        task: "Add frontend-design, mcp-builder, and webapp-testing skills",
        outcome: "Specialized expertise on demand",
      },
      {
        role: "Content Creator",
        task: "Use brand-guidelines and internal-comms skills",
        outcome: "On-brand content every time",
      },
    ],
    quickstart: [
      "Open Terminal (Mac: Cmd+Space, type 'Terminal'. Windows: search 'Command Prompt')",
      "Have Claude Code installed? Just ask: 'Install the marketing skills from github.com/coreyhaines31/marketingskills'",
      "Claude Code will automatically clone and install the skill for you!",
      "Or manually: git clone https://github.com/travisvn/awesome-claude-skills",
      "Copy skill folder to: ~/.claude/skills/",
      "Skills activate automatically when relevant, or invoke with /skill-name",
    ],
    proTips: [
      "Auto-Install: Just tell Claude Code 'Install [skill-name] skill' and it handles everything.",
      "Natural Language: After invoking a skill, just describe what you want in plain English—no special syntax.",
      "Stack Skills: Install multiple skills and Claude automatically uses the right one for each task.",
      "Custom Skills: Create your own by adding a folder with instructions to ~/.claude/skills/",
    ],
    privacyFlags: {
      dataRetention: "Local only (no cloud)",
      trainingOnData: "No",
      enterpriseOption: "Yes (custom skills)",
    },
    relatedTools: [
      {
        name: "Claude Code",
        useCase: "Terminal AI that uses skills",
        slug: "claude-code",
      },
      {
        name: "Marketing Skills",
        useCase: "23 marketing-specific skills",
        slug: "marketing-skills",
      },
    ],
    category: "Development",
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
      "Open your web browser and go to chat.openai.com",
      "Click 'Sign Up' and create account with email, Google, or Apple",
      "Once logged in, you'll see the chat interface",
      "Type your message in the text box and press Enter",
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
      "Open your web browser and go to manus.ai",
      "Click 'Sign Up' and create a free account",
      "Once logged in, click 'New Task' button",
      "Describe your task in the text box in plain English",
      'Try: "Create a 10-slide pitch deck for my SaaS startup"',
      "Manus works autonomously—check back in a few minutes for results",
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
      "Open your web browser and go to zapier.com",
      "Click 'Sign Up' and create account (free tier available)",
      "Once logged in, click the orange 'Create' button, then 'Zaps'",
      "Choose a Trigger (event that starts automation): e.g., 'New row in Google Sheets'",
      "Choose an Action (what happens): e.g., 'Send Slack message'",
      "Connect your accounts when prompted and test your Zap",
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
      "Open your web browser and go to perplexity.ai",
      "No account needed! Just start typing your question",
      "Press Enter to search—answers include clickable source citations",
      "Click sources to verify information",
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
  {
    slug: "marketing-skills",
    name: "Marketing Skills",
    tagline: "23 specialized Claude skills for conversion, SEO, and growth",
    setupTime: "10 min",
    cost: "Free (open source)",
    privacy: "green",
    timeSaved: "10-20 hrs/week",
    useCases: [
      {
        role: "Growth Marketer",
        task: "Run /page-cro to optimize landing page conversion",
        outcome: "Data-driven recommendations in seconds",
      },
      {
        role: "Content Marketer",
        task: "Use /copywriting and /email-sequence skills",
        outcome: "High-converting copy with proven frameworks",
      },
      {
        role: "SEO Specialist",
        task: "Run /seo-audit and /programmatic-seo",
        outcome: "Comprehensive technical SEO analysis",
      },
    ],
    quickstart: [
      "Open Terminal (Mac: Cmd+Space, type 'Terminal'. Windows: search 'Command Prompt')",
      "Have Claude Code? Just ask: 'Install marketing skills from github.com/coreyhaines31/marketingskills'",
      "Or manually clone: git clone https://github.com/coreyhaines31/marketingskills",
      "Copy all skill folders to ~/.claude/skills/",
      "Open Claude Code in your project and use /page-cro, /seo-audit, /copywriting, etc.",
    ],
    proTips: [
      "Auto-Install: Tell Claude Code 'Install the marketing skills' and it handles the entire setup.",
      "After invoking /page-cro, just describe your page in natural language—no extra commands needed.",
      "Stack skills: Run /seo-audit then /copywriting for comprehensive optimization.",
    ],
    privacyFlags: {
      dataRetention: "Local only",
      trainingOnData: "No",
      enterpriseOption: "Yes",
    },
    relatedTools: [
      {
        name: "Claude Skills",
        useCase: "Full skill ecosystem",
        slug: "claude-skills",
      },
      {
        name: "Claude Code",
        useCase: "Terminal AI that runs skills",
        slug: "claude-code",
      },
    ],
    category: "Marketing",
    isFoundation: false,
  },
  {
    slug: "ralph",
    name: "Ralph",
    tagline: "Autonomous development loop that lets Claude Code work while you sleep",
    setupTime: "15 min",
    cost: "Free (open source)",
    privacy: "green",
    timeSaved: "20-40 hrs/week",
    useCases: [
      {
        role: "Solo Developer",
        task: "Build MVP overnight",
        outcome: "Wake up to working prototype",
      },
      {
        role: "Tech Lead",
        task: "Refactor large codebase",
        outcome: "Systematic improvements while AFK",
      },
      {
        role: "Startup Founder",
        task: "Implement feature backlog",
        outcome: "Ship features while focusing on business",
      },
    ],
    quickstart: [
      "Open Terminal (Mac: Cmd+Space, type 'Terminal'. Windows: search 'Command Prompt')",
      "Install Ralph: npm install -g ralph-claude-code",
      "Navigate to your project: cd ~/your-project",
      "Initialize Ralph: ralph-setup",
      "Create requirements.md describing what you want built",
      "Start autonomous loop: ralph start",
      "Ralph runs Claude Code iteratively with built-in safeguards",
      "Check back periodically or let it run overnight",
    ],
    proTips: [
      "Ralph has intelligent exit detection—it knows when a task is truly complete.",
      "Built-in rate limiting prevents runaway API usage (default: 100 calls/hour).",
      "5-hour API limit handling: Ralph pauses gracefully when limits are reached.",
      "Use ralph-import to convert existing PRDs or specs into Ralph format.",
      "Live monitoring via tmux dashboard shows real-time progress.",
    ],
    privacyFlags: {
      dataRetention: "Local only",
      trainingOnData: "No",
      enterpriseOption: "Yes",
    },
    relatedTools: [
      {
        name: "Claude Code",
        useCase: "AI assistant Ralph controls",
        slug: "claude-code",
      },
      {
        name: "Remotion",
        useCase: "Programmatic video generation",
        slug: "remotion",
      },
    ],
    category: "Development",
    isFoundation: false,
  },
  {
    slug: "remotion",
    name: "Remotion",
    tagline: "Create videos programmatically with React—no video editing software needed",
    setupTime: "15 min",
    cost: "Free (open source) / $15/mo for cloud",
    privacy: "green",
    timeSaved: "5-15 hrs/week",
    useCases: [
      {
        role: "Marketing Team",
        task: "Generate product demo videos from code",
        outcome: "Consistent, updatable videos at scale",
      },
      {
        role: "Developer",
        task: "Create animated explainers for documentation",
        outcome: "No After Effects skills needed",
      },
      {
        role: "Content Creator",
        task: "Batch-generate personalized video content",
        outcome: "100s of unique videos from one template",
      },
    ],
    quickstart: [
      "Open Terminal (Mac: Cmd+Space, type 'Terminal'. Windows: search 'Command Prompt')",
      "Create new Remotion project: npx create-video@latest",
      "Follow prompts to name your project",
      "Navigate into project: cd your-project-name",
      "Start the preview server: npm start",
      "Browser opens automatically—edit src/Composition.tsx to change the video",
      "Render final video: npx remotion render src/index.tsx MyComp out/video.mp4",
    ],
    proTips: [
      "Videos are React components—if you know React, you know Remotion.",
      "Use Claude Code: 'Create a Remotion video showing a product walkthrough'",
      "Animations use spring() and interpolate() functions—very beginner-friendly.",
      "Render to MP4, WebM, or GIF. Perfect for social media content.",
      "Remotion Lambda renders videos in the cloud in seconds, not minutes.",
    ],
    privacyFlags: {
      dataRetention: "Local only (self-hosted)",
      trainingOnData: "No",
      enterpriseOption: "Yes (Remotion Lambda)",
    },
    relatedTools: [
      {
        name: "Claude Code",
        useCase: "Generate Remotion code automatically",
        slug: "claude-code",
      },
      {
        name: "Ralph",
        useCase: "Autonomous video generation pipelines",
        slug: "ralph",
      },
    ],
    category: "Development",
    isFoundation: false,
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
    matchingCategories: ["General AI", "Automation", "Research", "Marketing"],
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
