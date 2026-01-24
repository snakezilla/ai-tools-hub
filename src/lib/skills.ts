export interface Skill {
  id: string
  name: string
  description: string
  category: 'coding' | 'writing' | 'analysis' | 'integration' | 'productivity' | 'ai'
  difficulty: 'beginner' | 'intermediate' | 'advanced'
  installCommand?: string
  link?: string
  githubUrl?: string
  author?: string
  verified?: boolean
}

export const skills: Skill[] = [
  // === CODING SKILLS ===
  {
    id: 'code-review',
    name: 'Code Review',
    description: 'Systematic code review with security checks, performance analysis, and best practices.',
    category: 'coding',
    difficulty: 'intermediate',
    installCommand: 'claude /code-review',
    githubUrl: 'https://github.com/travisvn/awesome-claude-skills',
    author: 'Awesome Claude Skills',
    verified: true,
  },
  {
    id: 'frontend-design',
    name: 'Frontend Design',
    description: 'UI/UX expertise for building beautiful, accessible interfaces with React.',
    category: 'coding',
    difficulty: 'intermediate',
    installCommand: 'claude /frontend-design',
    githubUrl: 'https://github.com/travisvn/awesome-claude-skills',
    author: 'Awesome Claude Skills',
    verified: true,
  },
  {
    id: 'test-generator',
    name: 'Test Generator',
    description: 'Generate comprehensive unit tests, integration tests, and E2E tests with Jest/Playwright.',
    category: 'coding',
    difficulty: 'intermediate',
    installCommand: 'claude /test-generator',
    githubUrl: 'https://github.com/travisvn/awesome-claude-skills',
    author: 'Awesome Claude Skills',
    verified: true,
  },
  {
    id: 'refactor-code',
    name: 'Refactor Code',
    description: 'Intelligently refactor code for readability, performance, and maintainability.',
    category: 'coding',
    difficulty: 'intermediate',
    installCommand: 'claude /refactor-code',
    githubUrl: 'https://github.com/travisvn/awesome-claude-skills',
    author: 'Awesome Claude Skills',
    verified: true,
  },
  {
    id: 'api-design',
    name: 'API Designer',
    description: 'Design REST and GraphQL APIs following best practices and OpenAPI specs.',
    category: 'coding',
    difficulty: 'advanced',
    installCommand: 'claude /api-design',
    githubUrl: 'https://github.com/travisvn/awesome-claude-skills',
    author: 'Awesome Claude Skills',
    verified: true,
  },
  {
    id: 'database-design',
    name: 'Database Design',
    description: 'Design database schemas with normalization, indexing, and query optimization.',
    category: 'coding',
    difficulty: 'advanced',
    installCommand: 'claude /database-design',
    githubUrl: 'https://github.com/travisvn/awesome-claude-skills',
    author: 'Community',
  },
  {
    id: 'typescript-expert',
    name: 'TypeScript Expert',
    description: 'Write type-safe TypeScript with advanced generics, decorators, and patterns.',
    category: 'coding',
    difficulty: 'advanced',
    installCommand: 'claude /typescript-expert',
    githubUrl: 'https://github.com/travisvn/awesome-claude-skills',
    author: 'Awesome Claude Skills',
    verified: true,
  },

  // === WRITING SKILLS ===
  {
    id: 'copywriting',
    name: 'Copywriting',
    description: 'Create persuasive marketing copy using proven frameworks (AIDA, PAS) that drives conversions.',
    category: 'writing',
    difficulty: 'intermediate',
    installCommand: 'claude /copywriting',
    githubUrl: 'https://github.com/coreyhaines31/marketingskills',
    author: 'Marketing Skills',
    verified: true,
  },
  {
    id: 'email-sequences',
    name: 'Email Sequences',
    description: 'Build complete email campaigns and nurture sequences with high open rates.',
    category: 'writing',
    difficulty: 'intermediate',
    installCommand: 'claude /email-sequences',
    githubUrl: 'https://github.com/coreyhaines31/marketingskills',
    author: 'Marketing Skills',
    verified: true,
  },
  {
    id: 'blog-writer',
    name: 'Blog Writer',
    description: 'Generate SEO-optimized blog posts with proper structure, CTAs, and internal linking.',
    category: 'writing',
    difficulty: 'intermediate',
    installCommand: 'claude /blog-writer',
    githubUrl: 'https://github.com/travisvn/awesome-claude-skills',
    author: 'Awesome Claude Skills',
    verified: true,
  },
  {
    id: 'technical-writing',
    name: 'Technical Writing',
    description: 'Write clear technical documentation, API docs, and developer guides.',
    category: 'writing',
    difficulty: 'intermediate',
    installCommand: 'claude /technical-writing',
    githubUrl: 'https://github.com/travisvn/awesome-claude-skills',
    author: 'Awesome Claude Skills',
    verified: true,
  },
  {
    id: 'content-editor',
    name: 'Content Editor',
    description: 'Edit and improve content for clarity, tone, grammar, and engagement.',
    category: 'writing',
    difficulty: 'beginner',
    installCommand: 'claude /content-editor',
    githubUrl: 'https://github.com/travisvn/awesome-claude-skills',
    author: 'Awesome Claude Skills',
    verified: true,
  },
  {
    id: 'brand-guidelines',
    name: 'Brand Guidelines',
    description: 'Maintain consistent brand voice, tone, and style across all communications.',
    category: 'writing',
    difficulty: 'beginner',
    installCommand: 'claude /brand-guidelines',
    githubUrl: 'https://github.com/travisvn/awesome-claude-skills',
    author: 'Community',
  },

  // === ANALYSIS SKILLS ===
  {
    id: 'seo-audit',
    name: 'SEO Audit',
    description: 'Technical SEO analysis with actionable recommendations for rankings improvement.',
    category: 'analysis',
    difficulty: 'intermediate',
    installCommand: 'claude /seo-audit',
    githubUrl: 'https://github.com/coreyhaines31/marketingskills',
    author: 'Marketing Skills',
    verified: true,
  },
  {
    id: 'page-cro',
    name: 'Page CRO',
    description: 'Landing page analysis with specific conversion rate optimization recommendations.',
    category: 'analysis',
    difficulty: 'intermediate',
    installCommand: 'claude /page-cro',
    githubUrl: 'https://github.com/coreyhaines31/marketingskills',
    author: 'Marketing Skills',
    verified: true,
  },
  {
    id: 'competitor-analysis',
    name: 'Competitor Analysis',
    description: 'Analyze competitor strategies, positioning, features, and pricing.',
    category: 'analysis',
    difficulty: 'intermediate',
    installCommand: 'claude /competitor-analysis',
    githubUrl: 'https://github.com/travisvn/awesome-claude-skills',
    author: 'Awesome Claude Skills',
    verified: true,
  },
  {
    id: 'data-analysis',
    name: 'Data Analysis',
    description: 'Analyze datasets, create visualizations, and generate actionable insights.',
    category: 'analysis',
    difficulty: 'intermediate',
    installCommand: 'claude /data-analysis',
    githubUrl: 'https://github.com/travisvn/awesome-claude-skills',
    author: 'Awesome Claude Skills',
    verified: true,
  },
  {
    id: 'market-research',
    name: 'Market Research',
    description: 'Research market trends, identify opportunities, and analyze industry landscape.',
    category: 'analysis',
    difficulty: 'advanced',
    installCommand: 'claude /market-research',
    githubUrl: 'https://github.com/travisvn/awesome-claude-skills',
    author: 'Awesome Claude Skills',
    verified: true,
  },
  {
    id: 'user-research',
    name: 'User Research',
    description: 'Design user interviews, surveys, and analyze user behavior patterns.',
    category: 'analysis',
    difficulty: 'intermediate',
    installCommand: 'claude /user-research',
    githubUrl: 'https://github.com/travisvn/awesome-claude-skills',
    author: 'Community',
  },

  // === INTEGRATION SKILLS ===
  {
    id: 'slack-integration',
    name: 'Slack Integration',
    description: 'Send messages, create threads, and interact with Slack from Claude Code.',
    category: 'integration',
    difficulty: 'beginner',
    installCommand: 'claude /slack-integration',
    githubUrl: 'https://github.com/travisvn/awesome-claude-skills',
    author: 'Awesome Claude Skills',
    verified: true,
  },
  {
    id: 'api-caller',
    name: 'API Caller',
    description: 'Call any REST API, handle responses, and integrate external services.',
    category: 'integration',
    difficulty: 'intermediate',
    installCommand: 'claude /api-caller',
    githubUrl: 'https://github.com/travisvn/awesome-claude-skills',
    author: 'Awesome Claude Skills',
    verified: true,
  },
  {
    id: 'database-query',
    name: 'Database Query',
    description: 'Query SQL databases, execute migrations, and manage data safely.',
    category: 'integration',
    difficulty: 'intermediate',
    installCommand: 'claude /database-query',
    githubUrl: 'https://github.com/travisvn/awesome-claude-skills',
    author: 'Community',
  },
  {
    id: 'webhook-handler',
    name: 'Webhook Handler',
    description: 'Handle incoming webhooks from Stripe, GitHub, Zapier, and other services.',
    category: 'integration',
    difficulty: 'intermediate',
    installCommand: 'claude /webhook-handler',
    githubUrl: 'https://github.com/travisvn/awesome-claude-skills',
    author: 'Community',
  },

  // === PRODUCTIVITY SKILLS ===
  {
    id: 'project-planner',
    name: 'Project Planner',
    description: 'Break down projects into actionable tasks, timelines, and milestones.',
    category: 'productivity',
    difficulty: 'beginner',
    installCommand: 'claude /project-planner',
    githubUrl: 'https://github.com/travisvn/awesome-claude-skills',
    author: 'Awesome Claude Skills',
    verified: true,
  },
  {
    id: 'meeting-notes',
    name: 'Meeting Notes',
    description: 'Transform meeting recordings/transcripts into summaries and action items.',
    category: 'productivity',
    difficulty: 'beginner',
    installCommand: 'claude /meeting-notes',
    githubUrl: 'https://github.com/travisvn/awesome-claude-skills',
    author: 'Awesome Claude Skills',
    verified: true,
  },
  {
    id: 'documentation-generator',
    name: 'Documentation Generator',
    description: 'Auto-generate technical documentation, README files, and API docs from code.',
    category: 'productivity',
    difficulty: 'intermediate',
    installCommand: 'claude /documentation-generator',
    githubUrl: 'https://github.com/travisvn/awesome-claude-skills',
    author: 'Awesome Claude Skills',
    verified: true,
  },
  {
    id: 'workflow-builder',
    name: 'Workflow Builder',
    description: 'Design and document complex multi-step workflows and processes.',
    category: 'productivity',
    difficulty: 'advanced',
    installCommand: 'claude /workflow-builder',
    githubUrl: 'https://github.com/travisvn/awesome-claude-skills',
    author: 'Awesome Claude Skills',
    verified: true,
  },
  {
    id: 'code-organizer',
    name: 'Code Organizer',
    description: 'Reorganize codebases, fix imports, and improve project structure.',
    category: 'productivity',
    difficulty: 'intermediate',
    installCommand: 'claude /code-organizer',
    githubUrl: 'https://github.com/travisvn/awesome-claude-skills',
    author: 'Community',
  },

  // === AI SKILLS ===
  {
    id: 'prompt-engineer',
    name: 'Prompt Engineer',
    description: 'Optimize and refine prompts for better Claude outputs across any task.',
    category: 'ai',
    difficulty: 'intermediate',
    installCommand: 'claude /prompt-engineer',
    githubUrl: 'https://github.com/travisvn/awesome-claude-skills',
    author: 'Awesome Claude Skills',
    verified: true,
  },
  {
    id: 'chain-of-thought',
    name: 'Chain of Thought',
    description: 'Guide Claude through complex reasoning with step-by-step problem solving.',
    category: 'ai',
    difficulty: 'intermediate',
    installCommand: 'claude /chain-of-thought',
    githubUrl: 'https://github.com/travisvn/awesome-claude-skills',
    author: 'Community',
  },
  {
    id: 'mcp-builder',
    name: 'MCP Builder',
    description: 'Build custom Model Context Protocol servers for extending Claude capabilities.',
    category: 'ai',
    difficulty: 'advanced',
    installCommand: 'claude /mcp-builder',
    githubUrl: 'https://github.com/travisvn/awesome-claude-skills',
    author: 'Community',
  },
]

export function getSkillsByCategory(category: Skill['category']): Skill[] {
  return skills.filter((s) => s.category === category)
}

export function getSkillsByDifficulty(difficulty: Skill['difficulty']): Skill[] {
  return skills.filter((s) => s.difficulty === difficulty)
}

export function searchSkills(query: string): Skill[] {
  const q = query.toLowerCase()
  return skills.filter(
    (s) =>
      s.name.toLowerCase().includes(q) ||
      s.description.toLowerCase().includes(q) ||
      s.category.toLowerCase().includes(q)
  )
}
