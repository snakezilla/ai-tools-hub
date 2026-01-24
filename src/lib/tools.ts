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
  quickstart: QuickstartStep[]
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
      {
        text: "Open your web browser",
        substeps: [
          "Mac: Press Cmd+Space, type 'Safari' or 'Chrome', press Enter",
          "Windows: Click the browser icon on your taskbar, or press Windows key, type browser name",
        ],
      },
      {
        text: "Go to claude.ai",
        link: "https://claude.ai",
        substeps: [
          "Click the address bar at the top of your browser",
          "Type 'claude.ai' and press Enter",
        ],
      },
      {
        text: "Create your account",
        substeps: [
          "Click the 'Sign Up' button (top right)",
          "Choose: 'Continue with Google' (fastest) or enter your email",
          "If using email: Check inbox for verification code and enter it",
        ],
      },
      {
        text: "Start chatting",
        substeps: [
          "You'll see a text box at the bottom that says 'Message Claude'",
          "Click it and type your question or request",
          "Press Enter or click the arrow button to send",
        ],
      },
      {
        text: "Try this starter prompt:",
        substeps: [
          "\"Help me draft a professional email to reschedule a client meeting for next Tuesday\"",
        ],
      },
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
      {
        text: "Check prerequisites",
        substeps: [
          "You need a Claude Pro ($20/mo) or Max ($100/mo) subscription, OR API billing enabled",
          "Your computer needs at least 4GB RAM",
          "Works on Mac, Windows, and Linux",
        ],
      },
      {
        text: "Install Claude Code (Mac/Linux)",
        substeps: [
          "Open Terminal: Mac: Press Cmd+Space, type 'Terminal', press Enter",
          "Copy and paste this command, then press Enter:",
          "curl -fsSL https://claude.ai/install.sh | sh",
          "Wait for installation to complete (about 30 seconds)",
        ],
      },
      {
        text: "Install Claude Code (Windows)",
        substeps: [
          "Open PowerShell: Press Windows key, type 'PowerShell', press Enter",
          "Run: winget install Anthropic.ClaudeCode",
          "Or download installer from claude.ai/code",
        ],
      },
      {
        text: "Verify installation",
        substeps: [
          "In Terminal/PowerShell, type: claude doctor",
          "This checks that everything is set up correctly",
        ],
      },
      {
        text: "Log in and start using",
        substeps: [
          "Type: claude",
          "Then type: /login",
          "Follow the browser prompts to sign in with your Claude account",
          "Once logged in, you're ready to code!",
        ],
      },
      {
        text: "Try your first command",
        substeps: [
          "Navigate to a project: cd ~/your-project",
          "Start Claude Code: claude",
          "Ask in plain English: \"Explain what this codebase does\"",
        ],
      },
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
      {
        text: "Prerequisites",
        substeps: [
          "Claude Code must be installed first (see Claude Code setup)",
          "Basic familiarity with Terminal/Command Prompt",
        ],
      },
      {
        text: "Option A — Let Claude Code install for you (easiest)",
        isOption: true,
        substeps: [
          "Open Terminal and start Claude Code: claude",
          "Just ask: \"Install the marketing skills from github.com/coreyhaines31/marketingskills\"",
          "Claude Code will clone the repo and install automatically",
          "Done! Skills are ready to use — skip to Using Skills",
        ],
      },
      {
        text: "Option B — Manual installation",
        isOption: true,
        substeps: [
          "Open Terminal",
          "Clone the skills repo: git clone https://github.com/travisvn/awesome-claude-skills",
          "Create skills folder if it doesn't exist: mkdir -p ~/.claude/skills",
          "Copy the skill folders you want: cp -r awesome-claude-skills/skills/* ~/.claude/skills/",
        ],
      },
      {
        text: "Using skills",
        substeps: [
          "Skills activate automatically when Claude detects a relevant task",
          "Or invoke directly by typing /skill-name (e.g., /page-cro, /seo-audit)",
          "After invoking, just describe what you need in plain English",
          "Example: Type /page-cro then say 'Analyze my homepage at example.com'",
        ],
      },
      {
        text: "Verify installation",
        substeps: [
          "In Claude Code, type: /help",
          "You should see your installed skills listed under 'Available Skills'",
        ],
      },
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
      {
        text: "Check your Mac version",
        substeps: [
          "Click the Apple menu () → About This Mac",
          "You need macOS 13 (Ventura) or later",
          "If you're on an older version, update first: System Settings → General → Software Update",
        ],
      },
      {
        text: "Download Claude Desktop",
        link: "https://claude.ai/download",
        substeps: [
          "Go to claude.ai/download",
          "Click 'Download for Mac'",
          "Open the downloaded .dmg file",
          "Drag Claude to your Applications folder",
        ],
      },
      {
        text: "Sign in with Pro or Max subscription",
        substeps: [
          "Open Claude from Applications",
          "Sign in with your Claude account",
          "Cowork requires Pro ($20/mo) or Max ($100-200/mo)",
          "If on Free tier, upgrade at claude.ai/settings/billing",
        ],
      },
      {
        text: "Start Cowork mode",
        substeps: [
          "In Claude Desktop, look for the 'Cowork' button or tab",
          "Click to enter Cowork mode",
          "You'll see a different interface designed for file tasks",
        ],
      },
      {
        text: "Grant folder access",
        substeps: [
          "Cowork will ask permission to access folders",
          "Start with ONE folder (like Downloads) — don't give access to everything",
          "Click 'Allow' when macOS asks for permission",
          "You can add more folders later as needed",
        ],
      },
      {
        text: "Try your first task",
        substeps: [
          "Type a clear task description. Example:",
          "   'Organize my Downloads folder: create subfolders for PDFs, Images, Documents, and Other. Move files into the right folders based on their type.'",
          "Press Enter and watch Cowork plan and execute",
          "It will show you what it's doing and ask permission before deleting anything",
        ],
      },
      {
        text: "Let it work (you can do other things)",
        substeps: [
          "Unlike regular Claude chat, Cowork runs autonomously",
          "You can minimize the window and work on other tasks",
          "Cowork will notify you when done or if it needs input",
          "Review the results and provide feedback",
        ],
      },
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
      {
        text: "Open your web browser",
        substeps: [
          "Mac: Press Cmd+Space, type 'Safari' or 'Chrome', press Enter",
          "Windows: Click the browser icon or press Windows key, type browser name",
        ],
      },
      {
        text: "Go to chatgpt.com",
        link: "https://chatgpt.com",
        substeps: [
          "Click the address bar at the top",
          "Type 'chatgpt.com' and press Enter",
        ],
      },
      {
        text: "Create your account",
        substeps: [
          "Click 'Sign up' (top right)",
          "Choose: Continue with Google/Apple/Microsoft (fastest) or use email",
          "If using email: Enter your email, create a password, verify via inbox",
        ],
      },
      {
        text: "Important: Adjust your privacy settings",
        substeps: [
          "Click your profile icon (bottom left)",
          "Go to Settings > Data Controls",
          "Toggle OFF 'Improve the model for everyone' if you don't want your chats used for training",
          "This setting is ON by default for Free/Plus users",
        ],
      },
      {
        text: "Start chatting",
        substeps: [
          "Type in the 'Message ChatGPT' box at the bottom",
          "Press Enter or click the send arrow",
          "Try: \"Explain the key points I should make in my quarterly review\"",
        ],
      },
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
      {
        text: "Open your web browser",
        substeps: [
          "Mac: Press Cmd+Space, type browser name, press Enter",
          "Windows: Click browser icon on taskbar or search",
        ],
      },
      {
        text: "Go to manus.ai",
        link: "https://manus.ai",
        substeps: [
          "Click the address bar",
          "Type 'manus.ai' and press Enter",
        ],
      },
      {
        text: "Create your account",
        substeps: [
          "Click 'Sign Up'",
          "Enter your email and create a password",
          "Verify your email if prompted",
        ],
      },
      {
        text: "Create your first task",
        substeps: [
          "Click the 'New Task' button",
          "Describe what you want in plain English in the text box",
          "Be specific about format, length, and requirements",
        ],
      },
      {
        text: "Try this starter task:",
        substeps: [
          "\"Create a 10-slide pitch deck for a SaaS startup that helps small businesses manage inventory\"",
          "Manus works autonomously—check back in a few minutes for results",
        ],
      },
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
      {
        text: "Go to zapier.com",
        link: "https://zapier.com",
        substeps: [
          "Open your browser and navigate to zapier.com",
        ],
      },
      {
        text: "Create your account",
        substeps: [
          "Click 'Sign up' (top right)",
          "Choose Google sign-in (fastest) or enter email/password",
          "Free tier gives you 100 tasks/month — enough to start",
        ],
      },
      {
        text: "Create your first 'Zap' (automation)",
        substeps: [
          "Click the orange 'Create' button in the top left",
          "Select 'Zaps' from the dropdown",
        ],
      },
      {
        text: "Set up your Trigger (what starts the automation)",
        substeps: [
          "Search for an app (e.g., 'Google Sheets', 'Gmail', 'Typeform')",
          "Select a trigger event (e.g., 'New Row in Spreadsheet')",
          "Connect your account when prompted (one-time setup)",
          "Test the trigger to make sure it works",
        ],
      },
      {
        text: "Set up your Action (what happens next)",
        substeps: [
          "Click the '+' to add an action step",
          "Search for the destination app (e.g., 'Slack', 'HubSpot')",
          "Select an action (e.g., 'Send Channel Message')",
          "Map the data from your trigger to the action fields",
          "Test the action",
        ],
      },
      {
        text: "Turn on your Zap",
        substeps: [
          "Click 'Publish' in the top right",
          "Your automation is now live!",
        ],
      },
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
      {
        text: "Go to perplexity.ai",
        link: "https://perplexity.ai",
        substeps: [
          "Open your browser",
          "Type 'perplexity.ai' in the address bar and press Enter",
        ],
      },
      {
        text: "Start searching immediately (no account needed!)",
        substeps: [
          "You'll see a search box in the center of the page",
          "Type your question in plain English",
          "Press Enter",
        ],
      },
      {
        text: "Read the AI-generated answer with sources",
        substeps: [
          "Perplexity will show a summarized answer at the top",
          "Below the answer, you'll see numbered citations [1], [2], etc.",
          "Click any citation to open the original source",
        ],
      },
      {
        text: "Try this starter search:",
        substeps: [
          "\"What are the latest AI developments this week?\"",
          "Notice how each fact links back to a real source",
        ],
      },
      {
        text: "Optional: Create an account for extra features",
        substeps: [
          "Click 'Sign up' for search history and collections",
          "Pro plan ($20/mo) gives unlimited Pro searches with GPT-4 and Claude",
        ],
      },
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
      {
        text: "Prerequisites",
        substeps: [
          "Claude Code must be installed (see Claude Code setup first)",
          "Basic familiarity with Terminal",
        ],
      },
      {
        text: "Option A: Auto-install via Claude Code (easiest)",
        substeps: [
          "Open Terminal and type: claude",
          "Ask Claude: \"Install the marketing skills from github.com/coreyhaines31/marketingskills\"",
          "Claude Code handles the rest automatically",
        ],
      },
      {
        text: "Option B: Manual installation",
        substeps: [
          "Open Terminal",
          "Clone the repo: git clone https://github.com/coreyhaines31/marketingskills",
          "Create skills folder: mkdir -p ~/.claude/skills",
          "Copy skills: cp -r marketingskills/skills/* ~/.claude/skills/",
        ],
      },
      {
        text: "Available marketing skills",
        substeps: [
          "/page-cro — Landing page conversion optimization",
          "/seo-audit — Technical SEO analysis",
          "/copywriting — High-converting copy frameworks",
          "/email-sequence — Email campaign creation",
          "/programmatic-seo — Scalable SEO content",
          "And 18 more specialized marketing skills",
        ],
      },
      {
        text: "Using a skill",
        substeps: [
          "In Claude Code, type /page-cro (or any skill name)",
          "Describe what you need: \"Analyze my homepage at example.com\"",
          "Get detailed, actionable recommendations",
        ],
      },
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
      {
        text: "IMPORTANT: Check all prerequisites first",
        substeps: [
          "Claude Code MUST be installed and working (test by running 'claude' in Terminal)",
          "You must be logged into Claude Code (run 'claude' then '/login' if needed)",
          "Node.js version 18 or higher required (check with: node --version)",
          "tmux must be installed (Mac: brew install tmux | Linux: apt install tmux)",
          "Git must be installed (check with: git --version)",
        ],
      },
      {
        text: "Clone the Ralph Loop repository",
        link: "https://github.com/frankbria/ralph-claude-code",
        substeps: [
          "Open Terminal (Mac: Cmd+Space → type 'Terminal' → Enter)",
          "Navigate to where you want Ralph installed: cd ~/Documents",
          "Clone the repo: git clone https://github.com/frankbria/ralph-claude-code.git",
          "Enter the folder: cd ralph-claude-code",
        ],
      },
      {
        text: "Install Ralph Loop dependencies",
        substeps: [
          "While inside the ralph-claude-code folder, run: npm install",
          "Wait for all packages to download (may take 1-2 minutes)",
          "You should see 'added X packages' when complete",
        ],
      },
      {
        text: "Make the Ralph script executable",
        substeps: [
          "Run: chmod +x ralph.sh",
          "This allows you to run the Ralph Loop script",
        ],
      },
      {
        text: "Create your project requirements file",
        substeps: [
          "Navigate to YOUR project folder (not Ralph's folder): cd ~/your-actual-project",
          "Create a requirements.md file in your project root",
          "Write what you want built in plain English — be specific!",
          "Example content for requirements.md:",
          "  # Project: User Authentication System",
          "  ## Features to Build:",
          "  1. Email/password registration with validation",
          "  2. Login with session management",
          "  3. Password reset via email link",
          "  4. 'Remember me' checkbox functionality",
          "  ## Acceptance Criteria:",
          "  - All forms must have client-side validation",
          "  - Passwords must be hashed with bcrypt",
          "  - Sessions expire after 24 hours",
        ],
      },
      {
        text: "Start the Ralph Loop",
        substeps: [
          "Make sure you're in YOUR project folder (not Ralph's folder)",
          "Run the Ralph script: ~/Documents/ralph-claude-code/ralph.sh",
          "Or if you added it to PATH: ralph start",
          "A tmux window will open showing Claude Code working autonomously",
          "Ralph reads your requirements.md and starts building!",
        ],
      },
      {
        text: "Monitor progress (optional)",
        substeps: [
          "The tmux dashboard shows real-time progress",
          "You can safely close the terminal — Ralph continues in background",
          "To reattach to the session later: tmux attach -t ralph",
          "To check status: tmux ls (shows if ralph session is running)",
          "To stop Ralph: press Ctrl+C in the tmux window, or: tmux kill-session -t ralph",
        ],
      },
      {
        text: "Check results",
        substeps: [
          "Come back in a few hours (or overnight)",
          "Review the code changes Ralph made",
          "Test the implemented features",
          "Use git diff to see all changes",
          "Commit the good changes: git add . && git commit -m 'Features built by Ralph'",
        ],
      },
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
      {
        text: "Prerequisites",
        substeps: [
          "Node.js 18+ installed (check with: node --version)",
          "Basic React knowledge helpful but not required",
          "Mac, Windows, or Linux computer",
        ],
      },
      {
        text: "Create a new Remotion project",
        substeps: [
          "Open Terminal (Mac: Cmd+Space → 'Terminal'. Windows: search 'PowerShell')",
          "Run: npx create-video@latest",
          "When prompted, enter a project name (e.g., 'my-video')",
          "Choose the blank template for simplicity",
        ],
      },
      {
        text: "Navigate into your project",
        substeps: [
          "cd my-video (replace with your project name)",
        ],
      },
      {
        text: "Start the preview server",
        substeps: [
          "Run: npm start",
          "Your browser will automatically open to localhost:3000",
          "You'll see a live preview of your video",
        ],
      },
      {
        text: "Edit your video",
        substeps: [
          "Open src/Composition.tsx in your code editor",
          "This is a React component — edit it like any React code",
          "Changes appear instantly in the browser preview",
        ],
      },
      {
        text: "Render your final video",
        substeps: [
          "In Terminal, press Ctrl+C to stop the preview server",
          "Run: npx remotion render src/index.tsx MyComp out/video.mp4",
          "Your video will be saved to the out/ folder",
        ],
      },
      {
        text: "Pro tip: Use Claude Code to generate videos",
        substeps: [
          "In Claude Code, ask: 'Create a Remotion video showing a product walkthrough'",
          "Claude will write the React code for you",
        ],
      },
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
