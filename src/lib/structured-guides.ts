import { StructuredGuide } from '@/components/GuideContent'

export const structuredGuides: StructuredGuide[] = [
  {
    slug: 'what-is-claude-code',
    title: 'What is Claude Code?',
    subtitle: 'What it does. Who it\'s for. Is it worth it.',
    description: 'Claude Code is an AI that writes code for you. Here\'s the honest breakdown.',
    readTime: 2,
    difficulty: 'beginner',
    whyThisMatters: 'Claude Code turns 3-hour coding tasks into 15-minute conversations. Developers save 10+ hours every week.',
    whatYoullGet: [
      'Know exactly what Claude Code does',
      'Decide if it\'s worth $20/month for you',
    ],
    timeToValue: '2 min read',
    sections: [
      {
        title: 'What It Does',
        bullets: [
          'You describe what you want in plain English',
          'Claude reads your codebase and writes the code',
          'You review and apply with one click',
        ],
        proTip: 'It\'s a conversation, not a command. More context = better results.',
      },
      {
        title: 'Real Example',
        bullets: [
          'You say: "Add user login with email and password"',
          'Claude writes: Database schema, API routes, login form, validation, error handling',
          'Time: 15 minutes vs 3+ hours manually',
        ],
      },
      {
        title: 'Who Should Use It',
        bullets: [
          'Developers who want to ship 5x faster',
          'Solo founders who need to move like a 5-person team',
          'Anyone who Googles "how to implement X" daily',
        ],
      },
      {
        title: 'Honest Limitations',
        bullets: [
          'Complex architecture still needs human judgment',
          'Security-critical code needs careful review',
          'You\'ll iterate 2-3 times on complex requests',
        ],
        warning: 'It\'s a productivity multiplier, not a replacement for understanding your code.',
      },
      {
        title: 'Cost',
        bullets: [
          '$20/month for Claude Pro',
          'If it saves you 2 hours/month, it pays for itself',
          'Most developers save 10-40 hours/month',
        ],
      },
    ],
    toolSlugs: ['claude-code'],
    tags: ['overview', 'beginner'],
    nextGuide: { slug: 'setup-claude-code-mac', title: 'Set Up Claude Code (Mac)' },
  },
  {
    slug: 'setup-claude-code-mac',
    title: 'Set Up Claude Code (Mac)',
    subtitle: 'Zero to working in 10 minutes',
    description: 'Install Claude Code on your Mac. Follow these exact steps.',
    readTime: 4,
    difficulty: 'beginner',
    whyThisMatters: 'In 10 minutes you\'ll have an AI coding assistant ready to use.',
    whatYoullGet: [
      'Claude Code installed and working',
      'Your account connected',
    ],
    timeToValue: '10 min setup',
    sections: [
      {
        title: 'What You Need',
        bullets: [
          'Mac (any recent version)',
          'Credit card for $20/month Claude Pro',
        ],
      },
      {
        title: 'Step 1: Get Claude Pro',
        steps: [
          { action: 'Go to claude.ai' },
          { action: 'Create account (or sign in)' },
          { action: 'Click profile → Settings → Billing' },
          { action: 'Choose Pro ($20/mo)', detail: 'Enter payment info' },
        ],
      },
      {
        title: 'Step 2: Install',
        steps: [
          { action: 'Open Terminal', detail: 'Cmd+Space → type "Terminal" → Enter' },
          { action: 'Paste this command:', detail: 'curl -fsSL https://claude.ai/install.sh | sh' },
          { action: 'Press Enter and wait', detail: 'Takes 1-2 minutes' },
          { action: 'Look for "✓ Installed successfully"' },
        ],
        warning: 'If error: close Terminal, reopen, try again.',
      },
      {
        title: 'Step 3: Login',
        steps: [
          { action: 'Type: claude /login' },
          { action: 'Browser opens → sign in with your Claude account' },
          { action: 'Click Authorize' },
          { action: 'Done when you see "✓ Logged in"' },
        ],
      },
      {
        title: 'Step 4: Test It',
        steps: [
          { action: 'Type: claude' },
          { action: 'Type: Hello! Can you help me?' },
          { action: 'If Claude responds, you\'re ready' },
          { action: 'Type: exit to quit' },
        ],
      },
      {
        title: 'Start Using It',
        steps: [
          { action: 'Go to any project folder', detail: 'cd ~/your-project' },
          { action: 'Start Claude: claude' },
          { action: 'Tell it what to build', detail: 'e.g., "Add a contact form"' },
        ],
      },
    ],
    toolSlugs: ['claude-code'],
    tags: ['setup', 'mac'],
    nextGuide: { slug: 'plan-mode-saves-hours', title: 'Plan Mode: The Habit That Saves Hours' },
  },
  {
    slug: 'setup-claude-code-windows',
    title: 'Set Up Claude Code (Windows)',
    subtitle: 'Zero to working in 10 minutes',
    description: 'Install Claude Code on Windows. Follow these exact steps.',
    readTime: 4,
    difficulty: 'beginner',
    whyThisMatters: 'In 10 minutes you\'ll have an AI coding assistant ready to use.',
    whatYoullGet: [
      'Claude Code installed and working on Windows',
      'Your account connected',
    ],
    timeToValue: '10 min setup',
    sections: [
      {
        title: 'What You Need',
        bullets: [
          'Windows 10 or later',
          'Credit card for $20/month Claude Pro',
        ],
      },
      {
        title: 'Step 1: Get Claude Pro',
        steps: [
          { action: 'Go to claude.ai' },
          { action: 'Create account (or sign in)' },
          { action: 'Settings → Billing → Choose Pro ($20/mo)' },
        ],
      },
      {
        title: 'Step 2: Install',
        steps: [
          { action: 'Right-click Start button' },
          { action: 'Click "Windows PowerShell (Admin)"' },
          { action: 'Click Yes when asked' },
          { action: 'Paste: winget install Anthropic.ClaudeCode' },
          { action: 'Press Enter and wait' },
        ],
        proTip: 'If winget fails: download from claude.ai/code instead.',
      },
      {
        title: 'Step 3: Verify',
        steps: [
          { action: 'Open new PowerShell window' },
          { action: 'Type: claude --version' },
          { action: 'Should show version number' },
        ],
      },
      {
        title: 'Step 4: Login',
        steps: [
          { action: 'Type: claude /login' },
          { action: 'Sign in when browser opens' },
          { action: 'Done when "✓ Logged in" appears' },
        ],
      },
      {
        title: 'Step 5: Test',
        steps: [
          { action: 'Type: claude' },
          { action: 'Type: Hello!' },
          { action: 'If Claude responds, you\'re ready' },
        ],
      },
    ],
    toolSlugs: ['claude-code'],
    tags: ['setup', 'windows'],
    nextGuide: { slug: 'plan-mode-saves-hours', title: 'Plan Mode: Save Hours' },
  },
  {
    slug: 'plan-mode-saves-hours',
    title: 'Plan Mode: Save Hours',
    subtitle: '5 minutes of planning saves 1+ hours of debugging',
    description: 'The #1 productivity trick for Claude Code. Plan before you code.',
    readTime: 3,
    difficulty: 'intermediate',
    whyThisMatters: '5 minutes of planning with Claude prevents hours of debugging. This is the difference between good and great developers.',
    whatYoullGet: [
      'Know when to use Plan Mode',
      'Have a template you can use for every feature',
    ],
    timeToValue: 'Save 1+ hours on your next feature',
    sections: [
      {
        title: 'The Problem',
        bullets: [
          'You ask Claude to code something',
          'It writes code → something breaks',
          'You debug → more breaks',
          'Repeat for an hour',
        ],
      },
      {
        title: 'The Solution: Plan First',
        steps: [
          { action: 'Start with "Plan Mode:" before your request', detail: 'e.g., "Plan Mode: Add user authentication"' },
          { action: 'Claude creates a detailed plan (not code)' },
          { action: 'You review and ask questions' },
          { action: 'Say "Looks good, build it"' },
          { action: 'Claude codes against the agreed plan' },
        ],
        proTip: 'Catching issues in the plan is 10x faster than catching them in code.',
      },
      {
        title: 'Example',
        bullets: [
          'You: "Plan Mode: Add email notifications when users get new messages"',
          'Claude plans: Database schema, notification service, email templates, queue system, API endpoints',
          'You: "What about user preferences for opt-out?"',
          'Claude adds preferences to plan',
          'You approve. Claude codes it. Works first try.',
        ],
      },
      {
        title: 'When to Use Plan Mode',
        bullets: [
          'Features taking more than 1 hour',
          'Anything touching multiple files',
          'Security-sensitive code (auth, payments)',
          'When you\'re not sure how to structure something',
        ],
      },
      {
        title: 'When to Skip It',
        bullets: [
          'Bug fixes',
          'Tiny changes (rename variable, update text)',
          'You already know exactly what you want',
        ],
      },
    ],
    toolSlugs: ['claude-code'],
    tags: ['workflow', 'productivity'],
  },
  {
    slug: 'claude-for-writers',
    title: 'Claude for Writing',
    subtitle: 'Write better emails and docs in half the time',
    description: 'Use Claude to write clearer emails, reports, and content.',
    readTime: 3,
    difficulty: 'beginner',
    whyThisMatters: 'You spend 1-2 hours daily writing. Claude cuts that in half while improving quality.',
    whatYoullGet: [
      'Simple framework for writing with Claude',
      'Ready-to-use prompts for common tasks',
    ],
    timeToValue: 'Use it on your next email',
    sections: [
      {
        title: 'The BLUF Framework',
        description: 'BLUF = Bottom Line Up Front. Tell Claude what you need, then context.',
        steps: [
          { action: 'State your goal', detail: '"I need to write a follow-up email to a client"' },
          { action: 'Give context', detail: '"They liked our proposal. Budget is $50K."' },
          { action: 'Set tone', detail: '"Professional but friendly"' },
          { action: 'Specify length', detail: '"Under 100 words"' },
        ],
      },
      {
        title: 'Email Template',
        bullets: [
          '"Write a [type] email about [topic]. Tone: [X]. Key points: [list]. Length: [X words]."',
          'Example: "Write a follow-up email about our proposal. Tone: warm but professional. Key points: check if they have questions, offer a call. Under 100 words."',
        ],
      },
      {
        title: 'Report Template',
        bullets: [
          '"Write an executive summary about [topic]. Include: [sections]. For: [audience]. Length: [X words]."',
        ],
      },
      {
        title: 'Quick Prompts',
        bullets: [
          'Summarize: "Summarize these notes into 5 bullet points with action items"',
          'Simplify: "Explain this in plain English for non-technical readers"',
          'Shorten: "Cut this to half the length without losing key info"',
        ],
      },
    ],
    toolSlugs: ['claude'],
    tags: ['writing', 'productivity'],
  },
  {
    slug: 'perplexity-research-workflows',
    title: 'Perplexity: Research Faster',
    subtitle: 'Get answers, not blue links',
    description: 'Research anything in seconds. Direct answers with sources.',
    readTime: 2,
    difficulty: 'beginner',
    whyThisMatters: 'Google gives you 10 links to read. Perplexity gives you the answer with citations.',
    whatYoullGet: [
      'Know when to use Perplexity vs Google',
      'Get better answers with better questions',
    ],
    timeToValue: 'Try it now',
    sections: [
      {
        title: 'How It\'s Different',
        bullets: [
          'Ask a question → get a direct answer',
          'Every claim has a citation you can click',
          'Ask follow-up questions naturally',
        ],
      },
      {
        title: 'How to Use It',
        steps: [
          { action: 'Go to perplexity.ai' },
          { action: 'Type your question naturally', detail: 'Like you\'re asking a person' },
          { action: 'Read the answer' },
          { action: 'Click citations to verify sources' },
        ],
      },
      {
        title: 'Better Questions = Better Answers',
        bullets: [
          'BAD: "What\'s the best CRM?"',
          'GOOD: "What are top CRMs for a 10-person sales team under $500/month?"',
          'The difference: specificity.',
        ],
      },
      {
        title: 'When to Use Google Instead',
        bullets: [
          'Finding a specific website',
          'Looking for images/videos',
          'Local searches',
        ],
      },
    ],
    toolSlugs: ['perplexity'],
    tags: ['research', 'productivity'],
  },
  {
    slug: 'zapier-automation-101',
    title: 'Zapier: First Automation',
    subtitle: 'Connect apps without code',
    description: 'Build your first automation in 10 minutes. No coding.',
    readTime: 5,
    difficulty: 'beginner',
    whyThisMatters: 'Every time you manually copy data between apps, you\'re wasting time. Zapier does it automatically.',
    whatYoullGet: [
      'Your first working automation',
      'Ideas for more automations',
    ],
    timeToValue: '10 min to first automation',
    sections: [
      {
        title: 'What Zapier Does',
        bullets: [
          'When something happens in App A (trigger)...',
          '...Zapier does something in App B (action)',
          'Example: New email attachment → save to Google Drive',
        ],
      },
      {
        title: 'Build Your First Zap',
        description: 'Auto-save email attachments to Google Drive:',
        steps: [
          { action: 'Go to zapier.com, create free account' },
          { action: 'Click "Create a Zap"' },
          { action: 'Trigger: Choose Gmail → "New Attachment"' },
          { action: 'Connect your Gmail' },
          { action: 'Action: Choose Google Drive → "Upload File"' },
          { action: 'Connect your Drive, pick folder' },
          { action: 'Test and turn on' },
        ],
      },
      {
        title: 'Popular Automations',
        bullets: [
          'Slack messages → Notion notes',
          'Form submissions → spreadsheet rows',
          'New calendar event → Slack notification',
        ],
      },
      {
        title: 'Free vs Paid',
        bullets: [
          'Free: 5 Zaps, 100 tasks/month',
          'Paid ($20/mo): 20 Zaps, 750 tasks, multi-step',
        ],
      },
    ],
    toolSlugs: ['zapier'],
    tags: ['automation', 'no-code'],
  },
  {
    slug: 'claude-code-complete-guide',
    title: 'Claude Code: Complete Guide',
    subtitle: 'Everything you need to know',
    description: 'Master Claude Code. Installation, workflows, advanced tips.',
    readTime: 5,
    difficulty: 'intermediate',
    whyThisMatters: 'Claude Code can 5x your coding speed—if you know how to use it properly.',
    whatYoullGet: [
      'Complete setup reference',
      'Real-world workflows',
      'Troubleshooting guide',
    ],
    timeToValue: 'Bookmark for reference',
    sections: [
      {
        title: 'Quick Install',
        steps: [
          { action: 'Mac: curl -fsSL https://claude.ai/install.sh | sh' },
          { action: 'Windows: winget install Anthropic.ClaudeCode' },
          { action: 'Login: claude /login' },
        ],
      },
      {
        title: 'Workflow: Add a Feature',
        steps: [
          { action: 'Use Plan Mode', detail: '"Plan Mode: Add user authentication"' },
          { action: 'Review the plan' },
          { action: 'Ask questions if needed' },
          { action: 'Approve: "Looks good, build it"' },
          { action: 'Claude writes the code' },
        ],
      },
      {
        title: 'Workflow: Debug',
        steps: [
          { action: 'Describe the problem', detail: '"Getting 500 error on /contact form"' },
          { action: 'Paste error messages' },
          { action: 'Claude investigates and fixes' },
        ],
      },
      {
        title: 'Workflow: Write Tests',
        steps: [
          { action: '"Write tests for UserService"' },
          { action: '"Include edge cases: empty input, invalid email"' },
          { action: 'Run tests, iterate if needed' },
        ],
      },
      {
        title: 'Custom Instructions (CLAUDE.md)',
        bullets: [
          'Create CLAUDE.md in project root',
          'Add your coding standards',
          'Claude follows your guidelines automatically',
        ],
        proTip: 'Good CLAUDE.md = consistent code forever.',
      },
      {
        title: 'Common Fixes',
        bullets: [
          '"Command not found" → Re-run install command',
          '"Not logged in" → Run claude /login',
          'Wrong output → Be more specific, add examples',
        ],
      },
    ],
    toolSlugs: ['claude-code'],
    tags: ['reference', 'complete-guide'],
  },
  {
    slug: 'clawd-bot-setup',
    title: 'Set Up Clawd.bot (Your Personal AI Assistant)',
    subtitle: 'Complete setup guide for beginners. Mac, Windows, Telegram, WhatsApp.',
    description: 'Install and configure Clawd.bot, your own personal AI assistant that runs on your computer. Covers Mac and Windows setup, plus Telegram and WhatsApp integration.',
    readTime: 20,
    difficulty: 'beginner',
    whyThisMatters: 'Clawd.bot gives you a personal AI assistant that stays private—everything runs on your computer, not in the cloud. Control who talks to it, what it can do, and where your data goes.',
    whatYoullGet: [
      'Clawd.bot installed and running on your computer',
      'Connected to Telegram or WhatsApp so you can chat with AI from your phone',
      'Full control over your AI assistant',
      'Complete privacy—no cloud required',
    ],
    timeToValue: '30 min complete setup',
    sections: [
      {
        title: 'What You\'ll Need Before Starting',
        bullets: [
          'A Mac or Windows computer',
          'An API key from Anthropic, OpenAI, or MiniMax',
          'A phone (for Telegram or WhatsApp)',
          '30 minutes of uninterrupted time',
        ],
        warning: 'WhatsApp works best with a dedicated phone number (old phone or eSIM recommended)',
      },
      {
        title: 'Mac Setup (Easiest)',
        bullets: [
          'Install Homebrew (package manager)',
          'Install NVM (Node Version Manager)',
          'Install Node.js 22+',
          'Install pnpm and Clawd.bot',
          'Run the setup wizard',
        ],
        proTip: 'If you already have Homebrew and Node.js, you\'re done in 5 minutes.',
      },
      {
        title: 'Windows Setup (Via WSL2)',
        bullets: [
          'Install WSL2 (Windows Subsystem for Linux)',
          'Install Ubuntu inside WSL2',
          'Install Node.js, pnpm, and Clawd.bot',
          'Run the setup wizard',
          'Enable systemd for background service',
        ],
        warning: 'Windows native install isn\'t supported. WSL2 is the way to go.',
      },
      {
        title: 'Connect Telegram',
        bullets: [
          'Create a bot with @BotFather on Telegram',
          'Copy your bot token',
          'Configure it in Clawd.bot',
          'Start chatting',
        ],
        proTip: 'Telegram setup takes 5 minutes total.',
      },
      {
        title: 'Connect WhatsApp',
        bullets: [
          'Get a QR code from Clawd.bot',
          'Scan it with WhatsApp → Settings → Linked Devices',
          'Start chatting',
        ],
        warning: 'Requires a real phone number (not virtual numbers). WhatsApp blocks Google Voice, TextNow, etc.',
      },
      {
        title: 'Troubleshooting',
        bullets: [
          'Use `clawdbot doctor` to diagnose most issues',
          'Check `clawdbot status` to see if everything is running',
          'View live logs with `clawdbot logs --follow`',
          'See full guide for common errors and fixes',
        ],
        proTip: '90% of setup issues are fixed by running `clawdbot doctor`',
      },
    ],
    toolSlugs: ['clawd-bot'],
    tags: ['setup', 'beginner', 'complete-guide', 'telegram', 'whatsapp'],
    nextGuide: undefined,
  },
]

export function getStructuredGuideBySlug(slug: string): StructuredGuide | undefined {
  return structuredGuides.find((g) => g.slug === slug)
}

export function getAllStructuredGuides(): StructuredGuide[] {
  return structuredGuides
}
