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
    fullContent: '', // To be filled with detailed content
    toolSlugs: ['claude-code'],
    tags: ['coding', 'automation', 'development'],
  },
  {
    slug: 'claude-for-writers',
    title: 'Claude for Professional Writing',
    description: 'Use Claude to write better emails, reports, and content. Learn frameworks for high-quality output every time.',
    readTime: 15,
    difficulty: 'beginner',
    fullContent: '', // To be filled with detailed content
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
