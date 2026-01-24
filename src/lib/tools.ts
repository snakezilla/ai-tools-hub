export interface QuickstartStep {
  text: string
  substeps?: string[]
  link?: string
  isOption?: boolean  // When true, this step is an alternative path (not sequential)
}

export interface PrivacyFlags {
  dataRetention: string
  trainingOnData: string
  enterpriseOption: string
  hipaaAvailable?: string
  optOutMethod?: string
}

export interface SkillCollection {
  name: string
  github: string
  description: string
  skillCount: string
  forWho: string
  highlights: string[]
}

export interface SystemRequirements {
  browsers?: string[]  // Supported browsers
  operatingSystems?: string[]  // macOS, Windows, Linux
  prerequisites?: string[]  // What you need first
  notSupported?: string[]  // What doesn't work
}

export interface Tool {
  slug: string
  name: string
  tagline: string
  impactLine?: string  // One-liner summarizing the impact (e.g., "Like having additional employees")
  setupTime: string
  cost: string
  privacy: "green" | "yellow" | "red"
  timeSaved: string
  demoUrl?: string
  demoVideo?: string
  whatIsIt?: string  // Clear explanation of what this tool is
  difficulty?: 'beginner' | 'intermediate' | 'advanced'  // NEW: Difficulty level
  readTime?: number  // NEW: Minutes to read
  systemRequirements?: SystemRequirements  // What systems/browsers this works on
  useCases: {
    role: string
    task: string
    outcome: string
  }[]
  quickstart: string[] | QuickstartStep[]  // Simplified 5-step strings OR complex steps with substeps
  proTips?: string[]
  skillCollections?: SkillCollection[]  // For tools that have skill repos
  privacyFlags: PrivacyFlags
  relatedTools: {
    name: string
    useCase: string
    slug: string
  }[]
  category: string
  isFoundation: boolean
  tier?: 1 | 2  // 1 = Start Here (essential), 2 = Power Tools
  fullGuideSlug?: string  // NEW: Link to detailed guide (move long content here)
}

export const tools: Tool[] = [
  {
    slug: "claude",
    name: "Claude",
    tagline: "Advanced reasoning, writing, and analysis AI assistant",
    impactLine: "Your all-purpose AI thinking partner for any task",
    setupTime: "2 min",
    cost: "Free / $20/mo Pro",
    privacy: "green",
    timeSaved: "5-10 hrs/week",
    demoVideo: "/demos/claude-demo.mp4",
    difficulty: "beginner",
    readTime: 5,
    fullGuideSlug: "claude-for-writers",
    tier: 1,
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
      "Open your web browser (Safari, Chrome, Edge, etc.)",
      "Go to claude.ai and sign up (use Google for fastest setup)",
      "Create your account with email or Google login",
      "Click the 'Message Claude' box at the bottom and start typing",
      "Try: 'Help me draft a professional email to reschedule a client meeting'",
    ],
    proTips: [
      "Context is key: Paste code, documents, or previous conversation. Claude works better with more context.",
      "Iterate: If the first answer isn't perfect, say 'better' or 'make it more concise' to refine.",
      "Use formatting: Ask Claude to output in specific formats (Markdown, JSON, tables) for easier parsing.",
      "Custom Instructions: Set up custom instructions in your account for consistent style on all conversations.",
      "Switching plans: Free users get slower access. Pro ($20/mo) gets faster responses and more usage.",
    ],
    privacyFlags: {
      dataRetention: "30 days (opt-out) / 5 years (opt-in for training)",
      trainingOnData: "Opt-in by default since Sept 2024 — you CAN opt out",
      enterpriseOption: "Yes (Team/Enterprise plans — no training by default)",
      hipaaAvailable: "Yes — via AWS Bedrock with signed BAA",
      optOutMethod: "Settings > Privacy > Toggle off 'Help improve Claude'",
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
    impactLine: "Like having a senior developer pair-programming with you 24/7",
    setupTime: "5 min",
    cost: "Free with Claude Pro/Max subscription",
    privacy: "green",
    timeSaved: "10-20 hrs/week",
    demoVideo: "/demos/claude-code-demo.mp4",
    difficulty: "intermediate",
    readTime: 8,
    fullGuideSlug: "claude-code-complete-guide",
    tier: 1,
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
      "Get Claude Pro ($20/mo) or Max ($100/mo) subscription (includes Claude Code)",
      "Mac/Linux: Run curl -fsSL https://claude.ai/install.sh | sh",
      "Windows: Run winget install Anthropic.ClaudeCode or download from claude.ai/code",
      "Run 'claude /login' in your terminal and follow the browser prompts",
      "Navigate to your project folder and run 'claude' to start working",
    ],
    proTips: [
      "Dangerous Mode: Run 'claude --dangerously-skip-permissions' to avoid repeated permission prompts. Use with caution!",
      "Safety Rule: Add to your CLAUDE.md: 'Never delete files permanently—always move to ~/ClaudeTrash instead'",
      "Safety Rule: Add to your CLAUDE.md: 'Always check if a file exists before creating new files'",
      "Claude Code auto-updates. Run 'claude doctor' anytime to check your version.",
      "Your Claude Pro/Max subscription includes Claude Code—no separate API key needed.",
    ],
    privacyFlags: {
      dataRetention: "No retention for API usage",
      trainingOnData: "No — API data is never used for training",
      enterpriseOption: "Yes — Claude for Work, AWS Bedrock, Google Vertex AI",
      hipaaAvailable: "Yes — via AWS Bedrock or Google Vertex AI with signed BAA",
      optOutMethod: "Not needed — API usage is not trained on by default",
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
    impactLine: "Like hiring a team of specialists—marketing, development, writing—on demand",
    setupTime: "5 min",
    cost: "Free (open source)",
    privacy: "green",
    timeSaved: "5-15 hrs/week",
    difficulty: "intermediate",
    readTime: 7,
    fullGuideSlug: "claude-skills-mastery",
    whatIsIt: "A Skill is a small instruction file that teaches Claude Code how to be an expert at a specific task. Think of skills like hiring a specialist: instead of explaining CRO best practices every time, a /page-cro skill already knows the frameworks, metrics, and techniques. Skills are free, open-source, and run 100% locally on your computer. Install once, use forever.",
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
    skillCollections: [
      {
        name: "Marketing Skills",
        github: "https://github.com/coreyhaines31/marketingskills",
        description: "23 battle-tested skills that turn Claude into your marketing team. Covers the full marketing stack from conversion optimization to email campaigns.",
        skillCount: "23 skills",
        forWho: "Marketers, Growth Teams, Founders",
        highlights: [
          "/page-cro — Analyzes landing pages and gives specific conversion improvements",
          "/seo-audit — Technical SEO analysis with actionable recommendations",
          "/copywriting — High-converting copy using proven frameworks (PAS, AIDA)",
          "/email-sequence — Creates complete email campaigns with subject lines",
        ],
      },
      {
        name: "Awesome Claude Skills",
        github: "https://github.com/travisvn/awesome-claude-skills",
        description: "The largest curated collection of Claude Code skills. Community-maintained with skills for development, writing, productivity, and more.",
        skillCount: "50+ skills",
        forWho: "Developers, Writers, Power Users",
        highlights: [
          "/frontend-design — UI/UX expertise for building interfaces",
          "/code-review — Systematic code review with security checks",
          "/technical-writing — Documentation and technical content",
          "/project-planning — Break down projects into actionable tasks",
        ],
      },
      {
        name: "Ralph Loop",
        github: "https://github.com/frankbria/ralph-claude-code",
        description: "Advanced autonomous agent that lets Claude Code work continuously on your projects. Write requirements, start Ralph, and come back to completed features.",
        skillCount: "Autonomous Agent",
        forWho: "Developers, Tech Leads, Startup Founders",
        highlights: [
          "Works while you sleep — give it a task, check back in hours",
          "Intelligent exit detection — knows when work is truly done",
          "Built-in rate limiting — prevents runaway API costs",
          "Handles API limits gracefully — pauses and resumes automatically",
        ],
      },
      {
        name: "Business Skills Pack",
        github: "https://github.com/anthropics/claude-code-skills",
        description: "Official Anthropic skills for business workflows. Includes document analysis, data processing, and enterprise automation patterns.",
        skillCount: "15+ skills",
        forWho: "Business Users, Analysts, Operations",
        highlights: [
          "/data-analysis — Analyze spreadsheets and generate insights",
          "/report-generator — Create professional reports from data",
          "/meeting-notes — Transform meetings into actionable summaries",
          "/process-automation — Design and document workflows",
        ],
      },
    ],
    quickstart: [
      "Install Claude Code first (see Claude Code setup above)",
      "Easy way: Run 'claude' and ask 'Install the marketing skills from github.com/coreyhaines31/marketingskills'",
      "Manual way: git clone https://github.com/travisvn/awesome-claude-skills && cp -r skills/* ~/.claude/skills/",
      "Type /skill-name to invoke any skill (e.g., /page-cro for conversion optimization)",
      "Skills auto-activate when Claude detects you need them — just describe what you need",
    ],
    proTips: [
      "Auto-Install: Just tell Claude Code 'Install [skill-name] skill' and it handles everything.",
      "Natural Language: After invoking a skill, just describe what you want in plain English—no special syntax.",
      "Stack Skills: Install multiple skill collections and Claude automatically uses the right one for each task.",
      "Custom Skills: Create your own by adding a folder with a markdown file to ~/.claude/skills/",
      "Skills augment your team: Marketers get CRO/SEO experts, developers get code reviewers, writers get editors—all working alongside you.",
    ],
    privacyFlags: {
      dataRetention: "100% local — nothing leaves your computer",
      trainingOnData: "No — skills run locally in your terminal",
      enterpriseOption: "Yes — create custom private skills for your team",
      hipaaAvailable: "N/A — no data transmitted",
      optOutMethod: "Not needed — fully local",
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
      {
        name: "Ralph Loop",
        useCase: "Autonomous development loop",
        slug: "ralph",
      },
      {
        name: "Claude Cowork",
        useCase: "Browser extension for Claude.ai",
        slug: "claude-cowork",
      },
    ],
    category: "Development",
    isFoundation: true,
  },
  {
    slug: "claude-cowork",
    name: "Claude Cowork",
    tagline: "Desktop AI agent that organizes files, processes documents, and automates tasks—no coding needed",
    impactLine: "Like having a personal assistant that can search, organize, and edit files across your entire computer",
    setupTime: "5 min",
    cost: "$20/mo Pro / $100-200/mo Max",
    privacy: "green",
    timeSaved: "5-15 hrs/week",
    whatIsIt: "Claude Cowork is an AI desktop agent built into the Claude app. Think of it as 'Claude Code for everyone else'—it can autonomously organize your Downloads folder, turn scattered notes into formatted documents, process receipts into expense reports, or batch rename hundreds of files. You give it access to a folder, describe what you want, and it works independently while you do other things. It runs in a secure sandbox so it can't accidentally break your system.",
    difficulty: "beginner",
    readTime: 6,
    fullGuideSlug: "claude-cowork-automation-guide",
    systemRequirements: {
      operatingSystems: [
        "macOS 13 (Ventura) or later (required)",
        "Windows support coming soon",
      ],
      prerequisites: [
        "Claude Desktop app installed",
        "Claude Pro ($20/mo) or Max ($100-200/mo) subscription",
        "At least 8GB RAM recommended",
      ],
      notSupported: [
        "Windows (coming soon)",
        "Linux",
        "Mobile devices (iOS/Android)",
        "Web browser (requires desktop app)",
      ],
    },
    useCases: [
      {
        role: "Anyone with a messy Downloads folder",
        task: "Organize 500+ files by type, date, and project",
        outcome: "Sorted folders in minutes instead of hours",
      },
      {
        role: "Freelancer / Small Business",
        task: "Process receipts and invoices into expense reports",
        outcome: "Month-end accounting done automatically",
      },
      {
        role: "Researcher / Student",
        task: "Turn scattered notes into formatted documents",
        outcome: "Polished drafts from rough notes",
      },
      {
        role: "Content Creator",
        task: "Batch rename and organize media files",
        outcome: "Consistent naming across thousands of files",
      },
    ],
    quickstart: [
      "Check you're on macOS 13+ (System Settings → General → Software Update if needed)",
      "Download Claude Desktop from claude.ai/download and drag to Applications folder",
      "Sign in with Claude Pro ($20/mo) or Max ($100-200/mo) account",
      "Click 'Cowork' button in the app and grant access to a single folder (e.g., Downloads)",
      "Describe your task in plain English and watch Cowork organize/process files autonomously",
    ],
    proTips: [
      "Start Small: Give Cowork access to one folder first. Add more as you build trust.",
      "Be Specific: 'Organize my Downloads' is okay. 'Organize Downloads into folders by file type, with subfolders by month' is better.",
      "Review Before Delete: Cowork always asks permission before permanently deleting files. Take time to review.",
      "Use for Batch Work: Cowork shines with repetitive tasks across many files—renaming, organizing, converting.",
      "Check Progress: Cowork shows its plan and progress. If something looks wrong, you can stop it anytime.",
      "Combine with Claude: Do research in regular Claude, then switch to Cowork for file tasks.",
    ],
    privacyFlags: {
      dataRetention: "Files stay on your computer — Cowork processes locally",
      trainingOnData: "No — your files are not used for training",
      enterpriseOption: "Enterprise plans available with additional controls",
      hipaaAvailable: "Contact Anthropic for healthcare compliance options",
      optOutMethod: "Revoke folder access anytime in System Settings → Privacy",
    },
    relatedTools: [
      {
        name: "Claude",
        useCase: "Start here — the AI assistant Cowork extends",
        slug: "claude",
      },
      {
        name: "Claude Code",
        useCase: "For developers: terminal-based AI coding",
        slug: "claude-code",
      },
      {
        name: "Manus AI",
        useCase: "Fully autonomous AI agent for complex tasks",
        slug: "manus-ai",
      },
    ],
    category: "Productivity",
    isFoundation: false,
    tier: 1,
  },
  {
    slug: "chatgpt",
    name: "ChatGPT",
    tagline: "All-purpose AI assistant with voice and vision",
    impactLine: "The AI that can see, hear, and browse the web for you",
    setupTime: "2 min",
    cost: "Free / $20/mo Plus / $200/mo Pro",
    privacy: "yellow",
    timeSaved: "5-10 hrs/week",
    tier: 2,
    difficulty: "beginner",
    readTime: 4,
    fullGuideSlug: "chatgpt-power-user-guide",
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
      "Open your web browser and go to chatgpt.com",
      "Click 'Sign up' and choose Google, Apple, or email login",
      "IMPORTANT: Go to Settings > Data Controls and toggle OFF 'Improve the model for everyone' (ON by default)",
      "Start typing in the message box at the bottom — no special formatting needed",
      "Try: 'Explain the key points I should make in my quarterly review'",
    ],
    proTips: [
      "Privacy First: Turn OFF 'Improve the model for everyone' if you don't want your conversations used for training. Check Settings > Data Controls.",
      "GPT-4o is best: Free users get GPT-4o Mini. Plus users ($20/mo) get full GPT-4o with better reasoning.",
      "File Uploads: Upload documents, images, and PDFs for analysis. ChatGPT can read and extract data from files.",
      "Web Browsing: Plus/Pro users can enable web browsing to get real-time information beyond the training cutoff.",
      "Custom GPTs: Create custom ChatGPT instances for specific tasks. Browse GPT Store or build your own.",
    ],
    privacyFlags: {
      dataRetention: "Indefinite by default — admin-configurable on Enterprise (min 90 days)",
      trainingOnData: "YES by default (Free/Plus/Pro) — can opt out in settings",
      enterpriseOption: "Yes — Enterprise/Business have NO training by default",
      hipaaAvailable: "Only with ChatGPT for Healthcare + signed BAA (not on Free/Plus)",
      optOutMethod: "Settings > Data Controls > Toggle OFF 'Improve the model for everyone'",
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
    impactLine: "Delegate entire projects—research, analysis, deliverables—and get them done",
    setupTime: "3 min",
    cost: "Free tier / $30/mo",
    privacy: "yellow",
    timeSaved: "5-15 hrs/week",
    demoVideo: "/demos/manus-demo.mp4",
    tier: 1,
    difficulty: "beginner",
    readTime: 5,
    fullGuideSlug: "manus-ai-advanced-automation",
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
      "Go to manus.ai and click 'Sign Up' (email or social login)",
      "Click 'New Task' button on your dashboard",
      "Describe what you want in plain English — be specific about format and length",
      "Example: 'Create a 10-slide pitch deck for a SaaS startup that manages inventory'",
      "Manus works autonomously — check back in a few minutes for your results",
    ],
    proTips: [
      "Be specific: The more detail in your task description, the better the result. Include examples and formatting.",
      "Check task history: All your tasks are saved. Click 'History' to see previous results and refine.",
      "Use templates: Manus has task templates for common projects (presentations, reports, analyses).",
      "Export immediately: Save completed work right away. Long-term task storage is unclear.",
      "Start with free tier: Test simple tasks first before upgrading to paid plans.",
    ],
    privacyFlags: {
      dataRetention: "Task history retained — unclear deletion policy",
      trainingOnData: "May be used — check Terms of Service",
      enterpriseOption: "Coming soon",
      hipaaAvailable: "No — not recommended for healthcare data",
      optOutMethod: "Not clearly documented — contact support",
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
    impactLine: "Connect your apps and automate workflows—without writing code",
    setupTime: "10 min",
    cost: "Free / $29.99+/mo",
    privacy: "green",
    timeSaved: "5-20 hrs/week",
    tier: 2,
    difficulty: "intermediate",
    readTime: 8,
    fullGuideSlug: "zapier-automation-101",
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
      "Go to zapier.com and sign up (Google login is fastest, free tier: 100 tasks/month)",
      "Click 'Create' button and select 'Zaps' from dropdown",
      "Choose your Trigger app (e.g., Google Sheets, Gmail, Typeform) and trigger event (e.g., 'New Row')",
      "Connect your account and test the trigger to verify it works",
      "Add Action step, select destination app (e.g., Slack, HubSpot), map fields, test, and publish",
    ],
    proTips: [
      "Test before publishing: Always test your trigger and action separately before publishing the Zap.",
      "Use Filters: Add conditions (Filters) to only run Zaps when certain criteria are met.",
      "Multi-step Zaps: Add multiple actions in sequence. Example: When new email arrives → Slack notification → Spreadsheet entry.",
      "Browse templates: Zapier has 1000s of pre-built templates. Start there instead of building from scratch.",
      "Monitor usage: Free tier gives 100 tasks/month. Track your automation usage to avoid hitting limits.",
    ],
    privacyFlags: {
      dataRetention: "Configurable on Enterprise — task logs retained on lower tiers",
      trainingOnData: "No — Zapier does not train AI on your data",
      enterpriseOption: "Yes — Enterprise plan with SSO, audit logs, and custom retention",
      hipaaAvailable: "Yes — HIPAA-compliant plans available for healthcare",
      optOutMethod: "Not needed — no AI training on user data",
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
    impactLine: "AI-powered search that gives you answers with sources, not just links",
    setupTime: "1 min",
    cost: "Free / $20/mo Pro",
    privacy: "green",
    timeSaved: "3-8 hrs/week",
    tier: 2,
    difficulty: "beginner",
    readTime: 3,
    fullGuideSlug: "perplexity-research-workflows",
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
      "Go to perplexity.ai in your browser — no account needed to start!",
      "Type your question in the search box in plain English and press Enter",
      "Read the AI-generated answer with numbered sources below — click any [1], [2], etc. to see the original",
      "Try: 'What are the latest AI developments this week?'",
      "Optional: Create account for search history, or upgrade to Pro ($20/mo) for Claude and GPT-4",
    ],
    proTips: [
      "Use filters: Filter by Academic, News, or Recent to refine source types.",
      "Follow-up questions: Ask clarifying questions naturally. Perplexity maintains context within a conversation.",
      "Collections: Save important research into Collections (free, requires account) for later access.",
      "Focus mode (Pro): Pro users can focus searches on specific types: Academic, Writing, Wolfram, YouTube.",
      "Always verify: Check original sources for critical information. AI summaries are helpful but sometimes miss nuances.",
    ],
    privacyFlags: {
      dataRetention: "Minimal — search history optional",
      trainingOnData: "No — Perplexity does not train on your searches",
      enterpriseOption: "Yes — Enterprise plan with admin controls",
      hipaaAvailable: "Not documented — not recommended for PHI",
      optOutMethod: "Not needed — no training on user data",
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
    difficulty: "intermediate",
    readTime: 6,
    fullGuideSlug: "marketing-skills-framework",
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
      "Install Claude Code first (see Claude Code setup above)",
      "Easy way: Run 'claude' in Terminal and ask 'Install marketing skills from github.com/coreyhaines31/marketingskills'",
      "Manual way: git clone https://github.com/coreyhaines31/marketingskills && cp -r skills/* ~/.claude/skills/",
      "Available skills: /page-cro (conversion), /seo-audit (SEO), /copywriting (copy), /email-sequence (campaigns), and 18+ more",
      "Use any skill: type /page-cro and ask 'Analyze my homepage at example.com' for recommendations",
    ],
    proTips: [
      "Auto-Install: Tell Claude Code 'Install the marketing skills' and it handles the entire setup.",
      "After invoking /page-cro, just describe your page in natural language—no extra commands needed.",
      "Stack skills: Run /seo-audit then /copywriting for comprehensive optimization.",
    ],
    privacyFlags: {
      dataRetention: "100% local — nothing leaves your computer",
      trainingOnData: "No — fully local execution",
      enterpriseOption: "Yes — create custom skills for your marketing team",
      hipaaAvailable: "N/A — no data transmitted",
      optOutMethod: "Not needed — fully local",
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
    name: "Ralph Loop",
    tagline: "Autonomous development loop that lets Claude Code work while you sleep",
    setupTime: "20 min",
    cost: "Free (open source)",
    privacy: "green",
    timeSaved: "20-40 hrs/week",
    difficulty: "advanced",
    readTime: 12,
    fullGuideSlug: "ralph-loop-autonomous-development",
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
      "Verify prerequisites: Claude Code installed, Node.js 18+, tmux, Git (check each with their --version commands)",
      "Clone Ralph: git clone https://github.com/frankbria/ralph-claude-code.git && cd ralph-claude-code && npm install",
      "Run: chmod +x ralph.sh to make script executable",
      "In your project: Create requirements.md describing features you want built in plain English",
      "Run Ralph: ~/path-to-ralph/ralph.sh (tmux opens, Ralph works autonomously while you sleep)",
    ],
    proTips: [
      "Ralph is ADVANCED: Make sure you're comfortable with Claude Code first before using Ralph.",
      "Write detailed requirements — the more specific, the better Ralph performs.",
      "Ralph has intelligent exit detection — it knows when a task is truly complete.",
      "Built-in rate limiting prevents runaway API usage.",
      "Ralph handles the 5-hour API limit gracefully — it pauses and resumes automatically.",
      "Use tmux attach -t ralph to reconnect to a running Ralph session.",
      "Keep requirements.md focused — one project/feature at a time works best.",
    ],
    privacyFlags: {
      dataRetention: "100% local — only your code stays on your machine",
      trainingOnData: "No — inherits Claude Code's API privacy",
      enterpriseOption: "Yes — works with any Claude Code authentication",
      hipaaAvailable: "Inherits from Claude Code — use AWS Bedrock for HIPAA",
      optOutMethod: "Not needed — API usage is not trained on",
    },
    relatedTools: [
      {
        name: "Claude Code",
        useCase: "AI assistant Ralph controls",
        slug: "claude-code",
      },
      {
        name: "Claude Skills",
        useCase: "Specialized skills for Claude",
        slug: "claude-skills",
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
    cost: "Free (open source) / $15/mo for cloud rendering",
    privacy: "green",
    timeSaved: "5-15 hrs/week",
    difficulty: "intermediate",
    readTime: 10,
    fullGuideSlug: "remotion-video-automation",
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
      "Check Node.js version: node --version (need 18+)",
      "Create project: npx create-video@latest my-video && cd my-video",
      "Start preview: npm start (browser opens to localhost:3000)",
      "Edit video: Open src/Composition.tsx and edit like regular React code — changes appear instantly",
      "Render final video: npm start stops it, then npx remotion render src/index.tsx MyComp out/video.mp4",
    ],
    proTips: [
      "Videos are React components—if you know React, you know Remotion.",
      "Use Claude Code: 'Create a Remotion video showing a product walkthrough'",
      "Animations use spring() and interpolate() functions—very beginner-friendly.",
      "Render to MP4, WebM, or GIF. Perfect for social media content.",
      "Remotion Lambda renders videos in the cloud in seconds, not minutes.",
    ],
    privacyFlags: {
      dataRetention: "100% local (self-hosted) — cloud render optional",
      trainingOnData: "No — open source, runs on your machine",
      enterpriseOption: "Yes — Remotion Lambda for cloud rendering at scale",
      hipaaAvailable: "N/A — video rendering, no PHI handling",
      optOutMethod: "Not needed — fully local unless using Lambda",
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

export function getToolsByTier(tier: 1 | 2): Tool[] {
  return tools.filter((tool) => tool.tier === tier)
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
