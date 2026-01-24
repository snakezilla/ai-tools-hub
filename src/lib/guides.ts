// Detailed guide content that was extracted from tools.ts
// These contain the full QuickstartStep arrays with substeps and detailed privacy info

export interface Guide {
  slug: string
  title: string
  description: string
  readTime: number
  difficulty: 'beginner' | 'intermediate' | 'advanced'
  fullContent: string // MDX or HTML content
  toolSlugs?: string[] // Which tools this guide covers
  tags?: string[]
}

export const guides: Guide[] = [
  {
    slug: 'claude-code-complete-guide',
    title: 'Claude Code: The Complete Guide',
    description: 'Master Claude Code from installation to advanced workflows. This comprehensive guide covers setup, real-world use cases, and pro tips.',
    readTime: 25,
    difficulty: 'intermediate',
    fullContent: `<h2>What is Claude Code?</h2><p>Claude Code is an AI coding assistant that runs in your terminal. It understands your codebase and helps you write, debug, and refactor code at lightning speed.</p><h2>Installation</h2><ol><li><strong>Prerequisites:</strong> Node.js 16+ and npm installed</li><li><strong>Install:</strong> <code>npm install -g @anthropic/claude-code</code></li><li><strong>Verify:</strong> <code>claude --version</code> should show the version</li></ol><h2>Getting Started</h2><ol><li>Navigate to your project: <code>cd your-project</code></li><li>Start Claude Code: <code>claude</code></li><li>Ask a question about your code</li><li>Apply suggestions with one command</li></ol><h2>Real-World Workflows</h2><h3>Workflow 1: Code Review</h3><p><code>claude review src/app.ts</code></p><p>Claude analyzes your code for bugs, performance issues, and best practices.</p><h3>Workflow 2: Add a Feature</h3><p><code>claude add feature "Authentication with JWT"</code></p><p>Claude reads your codebase and suggests implementation.</p><h2>Pro Tips</h2><ul><li><strong>Context is key:</strong> The more code context you give, the better Claude understands</li><li><strong>Be specific:</strong> Instead of "fix this," say "add error handling for failed API calls"</li><li><strong>Review first:</strong> Always review suggested changes before applying</li></ul>`,
    toolSlugs: ['claude-code'],
    tags: ['coding', 'automation', 'development'],
  },
  {
    slug: 'claude-for-writers',
    title: 'Claude for Professional Writing',
    description: 'Use Claude to write better emails, reports, and content. Learn frameworks for high-quality output every time.',
    readTime: 15,
    difficulty: 'beginner',
    fullContent: `<h2>Why Claude for Writing?</h2><p>Claude helps you write clearer, more persuasive content in half the time. It&apos;s like having an editor who never gets tired.</p><h2>The BLUF Framework</h2><p><strong>BLUF</strong> = Bottom Line Up Front. Tell Claude the bottom line first.</p><ol><li><strong>State your goal:</strong> "I need to write an email asking for a budget increase"</li><li><strong>Give context:</strong> "It&apos;s for the marketing team, ROI is 3x"</li><li><strong>Set tone:</strong> "Professional but friendly"</li></ol><h2>Writing Prompts</h2><h3>For Emails:</h3><p>Draft a follow-up email about [topic]. Tone: professional. Include: [key points]</p><h3>For Reports:</h3><p>Write an executive summary about [topic]. Length: 300 words. Key points: [list]</p><h3>For Content:</h3><p>Write a blog post about [topic]. For [audience]. Include examples about [X]</p>`,
    toolSlugs: ['claude'],
    tags: ['writing', 'marketing', 'communication'],
  },
  {
    slug: 'claude-skills-mastery',
    title: 'Claude Skills: Unlock Superpowers',
    description: 'Install and customize Claude Skills to transform Claude into a domain expert. Build your own skills.',
    readTime: 20,
    difficulty: 'advanced',
    fullContent: `<h2>What Are Claude Skills?</h2><p>Skills are custom extensions that give Claude new capabilities. They can integrate with APIs, run code, or add expertise.</p><h2>Installing Skills</h2><ol><li>Go to Claude Skills Library</li><li>Find a skill you want</li><li>Click "Install"</li><li>Grant permissions</li><li>Use immediately</li></ol><h2>Popular Skills</h2><ul><li>Web Scraper: Extract data from websites</li><li>API Connector: Call external APIs</li><li>Code Analyzer: Deep code analysis</li><li>Email Integration: Send/receive emails</li></ul><h2>Building Your Own</h2><p>Skills are JavaScript functions. Define what you need, write the code, upload and test.</p>`,
    toolSlugs: ['claude-skills'],
    tags: ['skills', 'customization', 'extensions'],
  },
  {
    slug: 'zapier-automation-101',
    title: 'Zapier: Automate Your Business',
    description: 'Set up your first automation with Zapier. Connect apps without code and save hours per week.',
    readTime: 18,
    difficulty: 'beginner',
    fullContent: `<h2>What is Zapier?</h2><p>Zapier connects apps and automates workflows. If app A does something, Zapier makes app B react automatically.</p><h2>Your First Zap</h2><h3>Example: Save Gmail Attachments to Google Drive</h3><ol><li>Go to zapier.com and create account</li><li>Click "Create a Zap"</li><li>Trigger: Select Gmail → "New Attachment"</li><li>Action: Select Google Drive → "Create Row"</li><li>Test and enable</li></ol><h2>Popular Automations</h2><ul><li>Save Slack messages to Notion</li><li>Create calendar events from emails</li><li>Log form submissions to spreadsheet</li><li>Send Slack alerts for new leads</li></ul><h2>Pro Tips</h2><ul><li>Use Filters for certain conditions</li><li>Add Delays between actions</li><li>Use Multi-step Zaps to chain actions</li><li>Always test before enabling</li></ul>`,
    toolSlugs: ['zapier'],
    tags: ['automation', 'integration', 'no-code'],
  },
  {
    slug: 'claude-cowork-automation-guide',
    title: 'Claude Cowork: Your Desktop AI Agent',
    description: 'Learn how to use Claude Cowork to organize files, batch rename documents, and automate repetitive file tasks.',
    readTime: 12,
    difficulty: 'beginner',
    fullContent: `<h2>What is Claude Cowork?</h2><p>Claude Cowork is an AI agent that runs on your Mac desktop. It can autonomously organize files, process documents, and handle batch operations safely and securely.</p><h2>Getting Started</h2><ol><li>Install Claude Desktop app</li><li>Subscribe to Claude Pro ($20/mo) or Max</li><li>Open Claude Cowork from the menu</li><li>Grant folder access (start with Downloads)</li></ol><h2>Common Workflows</h2><h3>Organize Downloads Folder</h3><p>Task: "Create subfolders for PDFs, Images, Documents. Move all files into the correct folders."</p><h3>Batch Rename Files</h3><p>Task: "Rename all photos to YYYY-MM-DD_sequence format"</p><h3>Process Receipts</h3><p>Task: "Extract amounts from all receipt PDFs and create a summary spreadsheet"</p><h2>Pro Tips</h2><ul><li><strong>Start Small:</strong> Give Cowork access to one folder first</li><li><strong>Be Specific:</strong> Detailed instructions get better results</li><li><strong>Review First:</strong> Cowork asks before deleting files</li><li><strong>Think Big:</strong> Cowork excels at batch operations on hundreds of files</li></ul>`,
    toolSlugs: ['claude-cowork'],
    tags: ['automation', 'file-management', 'desktop'],
  },
  {
    slug: 'chatgpt-power-user-guide',
    title: 'ChatGPT Power User Guide',
    description: 'Master ChatGPT to write better, research faster, and get smarter answers. Learn proven techniques.',
    readTime: 10,
    difficulty: 'beginner',
    fullContent: `<h2>ChatGPT Fundamentals</h2><p>ChatGPT is versatile. It excels at writing, research, problem-solving, and learning. Quality of output depends on quality of input.</p><h2>The Prompt Framework</h2><p><strong>Structure matters:</strong> Role + Task + Context + Format</p><h3>Example: Research Request</h3><p>"You are a market analyst. Research the latest trends in [industry]. Provide findings in: 1) Key trends 2) Market size 3) Key players"</p><h2>Advanced Techniques</h2><h3>Few-Shot Learning</h3><p>Show ChatGPT examples of what you want. Then ask for the same format with new data.</p><h3>Chain of Thought</h3><p>Ask ChatGPT to think step-by-step. Say: "Let's think through this step-by-step"</p><h3>Iteration</h3><p>Refine outputs. Say: "Better. Now make it more concise." or "Add examples."</p><h2>Common Use Cases</h2><ul><li>Email drafts (saves 10+ min per email)</li><li>Meeting preparation (research competitors, talking points)</li><li>Code explanation (paste code, ask to explain)</li><li>Learning (ask to explain concepts like you're 5)</li></ul>`,
    toolSlugs: ['chatgpt'],
    tags: ['writing', 'research', 'learning'],
  },
  {
    slug: 'ralph-loop-autonomous-development',
    title: 'Ralph Loop: Autonomous Development Overnight',
    description: 'Set up Ralph Loop to build features while you sleep. Complete guide to autonomous coding workflows.',
    readTime: 16,
    difficulty: 'advanced',
    fullContent: `<h2>What is Ralph Loop?</h2><p>Ralph Loop is an autonomous development loop that pairs with Claude Code. Give it a project requirements file, and it builds features, tests them, and iterates—all while you sleep.</p><h2>Prerequisites</h2><ul><li>Claude Code installed and working</li><li>Node.js project with git repo</li><li>Project README with clear instructions</li><li>Claude API access with sufficient credits</li></ul><h2>Setting Up Ralph</h2><ol><li>Clone Ralph repository</li><li>Create requirements.md with your feature specs</li><li>Configure your project path</li><li>Start Ralph with: <code>./ralph.sh</code></li><li>Monitor progress in the log file</li></ol><h2>Best Practices</h2><h3>Write Clear Requirements</h3><p>Ralph works best with specific, well-structured requirements. Include:</p><ul><li>Feature description</li><li>User stories or examples</li><li>Acceptance criteria</li><li>API specs if applicable</li></ul><h3>Manage Costs</h3><p>Ralph makes many API calls. Set spending limits and monitor usage.</p><h3>Review Results</h3><p>Always review generated code before merging. Ralph is powerful but not perfect.</p><h2>Real Example</h2><p>"Build a REST API for a to-do app with Create, Read, Update, Delete operations. Include error handling and input validation."</p><p>Ralph will: Create database schema, write API routes, add tests, and commit to git.</p>`,
    toolSlugs: ['ralph'],
    tags: ['development', 'automation', 'autonomous'],
  },
]

export function getGuideBySlug(slug: string): Guide | undefined {
  return guides.find((g) => g.slug === slug)
}

export function getGuidesByTool(toolSlug: string): Guide[] {
  return guides.filter((g) => g.toolSlugs?.includes(toolSlug))
}

export function getGuidesByDifficulty(difficulty: 'beginner' | 'intermediate' | 'advanced'): Guide[] {
  return guides.filter((g) => g.difficulty === difficulty)
}
