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
    fullContent: '', // To be filled with detailed content
    toolSlugs: ['claude-skills'],
    tags: ['skills', 'customization', 'extensions'],
  },
  {
    slug: 'zapier-automation-101',
    title: 'Zapier: Automate Your Business',
    description: 'Set up your first automation with Zapier. Connect apps without code and save hours per week.',
    readTime: 18,
    difficulty: 'beginner',
    fullContent: '', // To be filled with detailed content
    toolSlugs: ['zapier'],
    tags: ['automation', 'integration', 'no-code'],
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
