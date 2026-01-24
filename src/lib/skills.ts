export interface Skill {
  id: string
  name: string
  description: string
  category: 'coding' | 'writing' | 'analysis' | 'integration' | 'productivity'
  difficulty: 'beginner' | 'intermediate' | 'advanced'
  installCommand?: string
  link?: string
}

export const skills: Skill[] = [
  // Coding Skills
  {
    id: 'code-analyzer',
    name: 'Code Analyzer',
    description: 'Deep dive into code quality, performance, and security issues.',
    category: 'coding',
    difficulty: 'beginner',
    installCommand: 'claude skill install code-analyzer',
  },
  {
    id: 'test-generator',
    name: 'Test Generator',
    description: 'Automatically generate unit tests, integration tests, and E2E tests.',
    category: 'coding',
    difficulty: 'intermediate',
    installCommand: 'claude skill install test-generator',
  },
  {
    id: 'refactor-assistant',
    name: 'Refactor Assistant',
    description: 'Intelligently refactor code for readability and performance.',
    category: 'coding',
    difficulty: 'intermediate',
    installCommand: 'claude skill install refactor-assistant',
  },
  {
    id: 'api-designer',
    name: 'API Designer',
    description: 'Design REST and GraphQL APIs with best practices.',
    category: 'coding',
    difficulty: 'advanced',
    installCommand: 'claude skill install api-designer',
  },

  // Writing Skills
  {
    id: 'email-writer',
    name: 'Email Writer',
    description: 'Write clear, professional emails with perfect tone.',
    category: 'writing',
    difficulty: 'beginner',
    installCommand: 'claude skill install email-writer',
  },
  {
    id: 'content-editor',
    name: 'Content Editor',
    description: 'Edit and improve content for clarity and engagement.',
    category: 'writing',
    difficulty: 'beginner',
    installCommand: 'claude skill install content-editor',
  },
  {
    id: 'blog-writer',
    name: 'Blog Writer',
    description: 'Generate SEO-optimized blog posts with great structure.',
    category: 'writing',
    difficulty: 'intermediate',
    installCommand: 'claude skill install blog-writer',
  },
  {
    id: 'copywriter',
    name: 'Copywriter',
    description: 'Create persuasive marketing copy that drives conversions.',
    category: 'writing',
    difficulty: 'intermediate',
    installCommand: 'claude skill install copywriter',
  },

  // Analysis Skills
  {
    id: 'data-analyzer',
    name: 'Data Analyzer',
    description: 'Analyze datasets, create visualizations, and generate insights.',
    category: 'analysis',
    difficulty: 'intermediate',
    installCommand: 'claude skill install data-analyzer',
  },
  {
    id: 'market-researcher',
    name: 'Market Researcher',
    description: 'Research market trends, competitors, and opportunities.',
    category: 'analysis',
    difficulty: 'advanced',
    installCommand: 'claude skill install market-researcher',
  },

  // Integration Skills
  {
    id: 'slack-connector',
    name: 'Slack Connector',
    description: 'Send messages and interact with Slack from Claude.',
    category: 'integration',
    difficulty: 'beginner',
    installCommand: 'claude skill install slack-connector',
  },
  {
    id: 'notion-connector',
    name: 'Notion Connector',
    description: 'Create, read, and update Notion databases.',
    category: 'integration',
    difficulty: 'intermediate',
    installCommand: 'claude skill install notion-connector',
  },
  {
    id: 'api-caller',
    name: 'API Caller',
    description: 'Call any REST API and process results seamlessly.',
    category: 'integration',
    difficulty: 'intermediate',
    installCommand: 'claude skill install api-caller',
  },

  // Productivity Skills
  {
    id: 'project-planner',
    name: 'Project Planner',
    description: 'Break down projects into tasks and timelines.',
    category: 'productivity',
    difficulty: 'beginner',
    installCommand: 'claude skill install project-planner',
  },
  {
    id: 'meeting-summarizer',
    name: 'Meeting Summarizer',
    description: 'Summarize meetings and extract action items.',
    category: 'productivity',
    difficulty: 'beginner',
    installCommand: 'claude skill install meeting-summarizer',
  },
  {
    id: 'documentation-generator',
    name: 'Documentation Generator',
    description: 'Automatically generate technical documentation from code.',
    category: 'productivity',
    difficulty: 'intermediate',
    installCommand: 'claude skill install documentation-generator',
  },
  {
    id: 'workflow-builder',
    name: 'Workflow Builder',
    description: 'Design and automate complex multi-step workflows.',
    category: 'productivity',
    difficulty: 'advanced',
    installCommand: 'claude skill install workflow-builder',
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
