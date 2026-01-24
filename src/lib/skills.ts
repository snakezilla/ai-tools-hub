// Claude Skills library - curated collection of top skills
// Each skill includes metadata for searching and filtering

export interface Skill {
  id: string
  name: string
  description: string
  category: 'productivity' | 'development' | 'marketing' | 'business' | 'research' | 'writing'
  difficulty: 'beginner' | 'intermediate' | 'advanced'
  rating: number // 1-5
  installs?: number
  tags: string[]
  url: string // Link to skill or installation instructions
}

export const skills: Skill[] = [
  {
    id: 'prompt-optimizer',
    name: 'Prompt Optimizer',
    description: 'Refine and improve your prompts for better Claude responses. Uses best practices to enhance clarity and effectiveness.',
    category: 'productivity',
    difficulty: 'beginner',
    rating: 4.8,
    installs: 15000,
    tags: ['prompting', 'optimization', 'AI'],
    url: 'https://claude.ai/skills/prompt-optimizer',
  },
  {
    id: 'code-reviewer',
    name: 'Code Reviewer',
    description: 'Automated code review skill that checks for bugs, security issues, and best practices. Perfect for catching issues before production.',
    category: 'development',
    difficulty: 'intermediate',
    rating: 4.7,
    installs: 12000,
    tags: ['code', 'review', 'quality'],
    url: 'https://claude.ai/skills/code-reviewer',
  },
  {
    id: 'api-designer',
    name: 'API Designer',
    description: 'Design RESTful APIs with best practices. Get OpenAPI specs, endpoint documentation, and error handling patterns.',
    category: 'development',
    difficulty: 'intermediate',
    rating: 4.6,
    installs: 8000,
    tags: ['API', 'design', 'backend'],
    url: 'https://claude.ai/skills/api-designer',
  },
  {
    id: 'content-strategist',
    name: 'Content Strategist',
    description: 'Plan content calendars, outline blog posts, and develop SEO strategies. Includes keyword research and competitor analysis.',
    category: 'marketing',
    difficulty: 'intermediate',
    rating: 4.7,
    installs: 10000,
    tags: ['content', 'marketing', 'SEO'],
    url: 'https://claude.ai/skills/content-strategist',
  },
  {
    id: 'executive-summarizer',
    name: 'Executive Summarizer',
    description: 'Automatically create concise executive summaries of long documents. Perfect for reports, emails, and meeting notes.',
    category: 'business',
    difficulty: 'beginner',
    rating: 4.9,
    installs: 18000,
    tags: ['summarization', 'business', 'efficiency'],
    url: 'https://claude.ai/skills/executive-summarizer',
  },
  {
    id: 'research-analyst',
    name: 'Research Analyst',
    description: 'Analyze research papers, identify key findings, and synthesize multiple sources. Great for literature reviews.',
    category: 'research',
    difficulty: 'advanced',
    rating: 4.5,
    installs: 5000,
    tags: ['research', 'analysis', 'academic'],
    url: 'https://claude.ai/skills/research-analyst',
  },
  {
    id: 'data-visualizer',
    name: 'Data Visualizer',
    description: 'Generate data visualization code and recommendations. Creates charts, dashboards, and visual explanations of data.',
    category: 'development',
    difficulty: 'intermediate',
    rating: 4.6,
    installs: 9000,
    tags: ['data', 'visualization', 'charts'],
    url: 'https://claude.ai/skills/data-visualizer',
  },
  {
    id: 'copywriter-assistant',
    name: 'Copywriter Assistant',
    description: 'Write compelling marketing copy, sales pages, and email sequences. A/B testing recommendations included.',
    category: 'writing',
    difficulty: 'beginner',
    rating: 4.7,
    installs: 14000,
    tags: ['writing', 'marketing', 'sales'],
    url: 'https://claude.ai/skills/copywriter-assistant',
  },
  {
    id: 'documentation-generator',
    name: 'Documentation Generator',
    description: 'Automatically generate comprehensive documentation from code. Saves hours on API docs and README files.',
    category: 'development',
    difficulty: 'intermediate',
    rating: 4.8,
    installs: 11000,
    tags: ['documentation', 'code', 'technical'],
    url: 'https://claude.ai/skills/documentation-generator',
  },
  {
    id: 'business-analyst',
    name: 'Business Analyst',
    description: 'Analyze business problems, identify opportunities, and create strategic recommendations. Includes financial modeling.',
    category: 'business',
    difficulty: 'advanced',
    rating: 4.6,
    installs: 6000,
    tags: ['business', 'analysis', 'strategy'],
    url: 'https://claude.ai/skills/business-analyst',
  },
  {
    id: 'qa-tester',
    name: 'QA Tester',
    description: 'Generate comprehensive test cases, edge cases, and QA documentation. Helps catch bugs before users do.',
    category: 'development',
    difficulty: 'intermediate',
    rating: 4.7,
    installs: 9500,
    tags: ['testing', 'QA', 'quality'],
    url: 'https://claude.ai/skills/qa-tester',
  },
  {
    id: 'mentor-coach',
    name: 'Mentor Coach',
    description: 'Get personalized mentoring and coaching. Provides feedback, suggests resources, and tracks progress.',
    category: 'business',
    difficulty: 'beginner',
    rating: 4.8,
    installs: 13000,
    tags: ['mentoring', 'coaching', 'development'],
    url: 'https://claude.ai/skills/mentor-coach',
  },
]

export function getSkillsByCategory(category: string): Skill[] {
  return skills.filter((s) => s.category === category)
}

export function getSkillsByDifficulty(difficulty: string): Skill[] {
  return skills.filter((s) => s.difficulty === difficulty)
}

export function getTopSkills(limit: number = 5): Skill[] {
  return [...skills].sort((a, b) => (b.rating || 0) - (a.rating || 0)).slice(0, limit)
}

export function searchSkills(query: string): Skill[] {
  const lower = query.toLowerCase()
  return skills.filter(
    (s) =>
      s.name.toLowerCase().includes(lower) ||
      s.description.toLowerCase().includes(lower) ||
      s.tags.some((t) => t.toLowerCase().includes(lower))
  )
}
