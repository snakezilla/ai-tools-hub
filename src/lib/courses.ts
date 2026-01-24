export interface CourseModule {
  title: string
  lessons: string[]
}

export interface CourseFAQ {
  question: string
  answer: string
}

export interface Course {
  slug: string
  title: string
  description: string
  shortDescription: string
  price: number
  duration: string
  level: 'Beginner' | 'Intermediate' | 'Advanced'
  image: string
  priceId: string
  features: string[]
  whatYouLearn: string[]
  whoItsFor: string[]
  curriculum: CourseModule[]
  faq: CourseFAQ[]
  prerequisites?: string[]
  instructor?: string
  certificate?: boolean
  moneyBackGuarantee?: boolean
}

export const courses: Course[] = [
  {
    slug: 'claude-code-essentials',
    title: 'Claude Code Essentials',
    description: 'Master Claude Code from installation to shipping your first feature.',
    shortDescription: 'Master Claude Code from installation to shipping your first feature.',
    price: 67,
    duration: '2 hours',
    level: 'Beginner',
    image: '🚀',
    priceId: process.env.STRIPE_PRICE_CLAUDE_CODE_COURSE || 'price_claude_code_essentials',
    features: [
      'Installation setup',
      '5 real-world workflows',
      'Pro tips & tricks',
      'Lifetime access',
      'Email support',
    ],
    whatYouLearn: [
      'Install Claude Code on Mac, Windows, and Linux',
      'Set up authentication and configure your first project',
      'Use Claude Code to understand and refactor existing code',
      'Build new features using AI pair programming',
      'Debug problems faster with AI assistance',
    ],
    whoItsFor: [
      'Developers new to Claude Code',
      'Founders who want to ship faster',
      'Teams looking to integrate AI into workflows',
      'Self-taught developers',
      'Anyone comfortable with a terminal',
    ],
    curriculum: [
      {
        title: 'Module 1: Getting Started',
        lessons: [
          'What is Claude Code and why it matters',
          'System requirements and installation (Mac/Windows/Linux)',
          'Initial setup and authentication',
          'First successful run and verification',
        ],
      },
      {
        title: 'Module 2: Core Workflows',
        lessons: [
          'Understanding prompt patterns',
          'Code review and refactoring workflow',
          'Building new features from scratch',
          'Debugging with AI pair programming',
          'Project organization best practices',
        ],
      },
      {
        title: 'Module 3: Real-World Projects',
        lessons: [
          'Project 1: Refactoring a legacy component',
          'Project 2: Adding a new feature to existing codebase',
          'Project 3: Building an API from scratch',
          'Project 4: Performance optimization',
          'Project 5: Full feature with tests',
        ],
      },
      {
        title: 'Module 4: Advanced Techniques',
        lessons: [
          'Custom prompts for your workflow',
          'Working with multiple files and context',
          'Integration with your editor',
          'Team best practices',
          'Troubleshooting common issues',
        ],
      },
    ],
    faq: [
      {
        question: 'Do I need to be an experienced developer to take this course?',
        answer: 'No! This course is designed for beginners who are comfortable with basic terminal commands. We start from scratch and build up.',
      },
      {
        question: 'Will this course become outdated?',
        answer: 'No. You have lifetime access and we update course materials whenever there are major changes to Claude Code.',
      },
      {
        question: 'Can I get a refund if I\'m not satisfied?',
        answer: 'Yes! We offer a 7-day money-back guarantee. If you\'re not satisfied for any reason, we\'ll refund your purchase.',
      },
      {
        question: 'Do you provide support?',
        answer: 'Yes. All course students get email support. We typically respond within 24 hours.',
      },
      {
        question: 'What if I have questions after the course?',
        answer: 'You keep lifetime access to the course materials and can reach out to support anytime.',
      },
      {
        question: 'Is there a certificate?',
        answer: 'While there\'s no formal certificate, you\'ll have documented proof of purchase and can showcase your Claude Code projects.',
      },
    ],
    prerequisites: ['Basic familiarity with terminal/command line', 'A text editor (VS Code, Vim, etc.)', 'Mac, Windows, or Linux'],
    instructor: 'Ahsan',
    certificate: false,
    moneyBackGuarantee: true,
  },
  {
    slug: 'ai-workflow-builder',
    title: 'AI Workflow Builder',
    description: 'Build 5 complete automation workflows using Claude + other tools.',
    shortDescription: 'Build 5 complete automation workflows using Claude + other tools.',
    price: 97,
    duration: '3 hours',
    level: 'Intermediate',
    image: '⚙️',
    priceId: process.env.STRIPE_PRICE_WORKFLOW_COURSE || 'price_workflow_builder',
    features: [
      '5 complete projects',
      'Step-by-step video guides',
      'Source code included',
      'Lifetime access',
      'Priority support',
    ],
    whatYouLearn: [
      'Integrate Claude API into production workflows',
      'Build automated content creation pipelines',
      'Create intelligent document processing systems',
      'Set up real-time notification workflows',
      'Monitor and optimize AI performance',
    ],
    whoItsFor: [
      'Product managers wanting to automate workflows',
      'Marketing teams building content at scale',
      'Operations teams reducing manual work',
      'Developers building AI integrations',
      'Entrepreneurs automating their business',
    ],
    curriculum: [
      {
        title: 'Module 1: Foundations',
        lessons: [
          'Claude API overview and authentication',
          'Rate limiting and cost optimization',
          'Error handling and retries',
          'Testing and debugging API calls',
        ],
      },
      {
        title: 'Module 2: Project 1 - Content Generator',
        lessons: [
          'Setting up your first workflow',
          'Prompting for consistent output',
          'Handling user input and variations',
          'Batch processing content',
          'Deployment to production',
        ],
      },
      {
        title: 'Module 3: Project 2 - Document Processor',
        lessons: [
          'Reading and parsing documents',
          'Extracting information with Claude',
          'Formatting and organizing output',
          'Handling errors and edge cases',
          'Database storage integration',
        ],
      },
      {
        title: 'Module 4: Project 3 - Customer Support Bot',
        lessons: [
          'Building a context-aware chatbot',
          'Intent recognition and routing',
          'Maintaining conversation history',
          'Integration with support systems',
          'Analytics and monitoring',
        ],
      },
      {
        title: 'Module 5: Project 4 & 5 - Advanced Automation',
        lessons: [
          'Multi-step workflows',
          'Conditional logic and branching',
          'Webhook integration',
          'Scheduled tasks and cron jobs',
          'Scaling and performance tuning',
        ],
      },
    ],
    faq: [
      {
        question: 'Do I need advanced technical skills?',
        answer: 'You should be comfortable with basic coding concepts, APIs, and JSON. We cover everything step-by-step.',
      },
      {
        question: 'What languages are covered?',
        answer: 'We use Python and Node.js. Examples in both are provided, but you can use any language you prefer.',
      },
      {
        question: 'Will the projects work in my environment?',
        answer: 'Yes! We provide source code and detailed setup instructions for common environments (Mac/Windows/Linux).',
      },
      {
        question: 'How much will it cost to run these workflows?',
        answer: 'The course includes cost optimization strategies. Most workflows cost less than $1/month with proper caching.',
      },
      {
        question: 'Can I modify these projects for my business?',
        answer: 'Absolutely! All source code is yours to modify and use commercially.',
      },
      {
        question: 'Is there ongoing support?',
        answer: 'Yes. Course students get priority support via email.',
      },
    ],
    prerequisites: ['Basic Python or Node.js knowledge', 'Familiarity with APIs and JSON', 'Command line basics'],
    instructor: 'Ahsan',
    certificate: false,
    moneyBackGuarantee: true,
  },
  {
    slug: 'claude-skills-mastery',
    title: 'Claude Skills Mastery',
    description: 'Unlock superpowers: install, customize, and build your own skills.',
    shortDescription: 'Unlock superpowers: install, customize, and build your own skills.',
    price: 47,
    duration: '1.5 hours',
    level: 'Intermediate',
    image: '✨',
    priceId: process.env.STRIPE_PRICE_SKILLS_COURSE || 'price_skills_mastery',
    features: [
      '20+ skills library',
      'Installation guide',
      'Customization tutorial',
      'Lifetime access',
      'Email support',
    ],
    whatYouLearn: [
      'Install and use 20+ pre-built Claude Code skills',
      'Customize existing skills for your workflow',
      'Build your first custom skill from scratch',
      'Share skills with your team',
      'Optimize skill performance',
    ],
    whoItsFor: [
      'Claude Code users wanting to extend functionality',
      'Team leads standardizing workflows',
      'Developers building custom tools',
      'Anyone wanting to automate repetitive tasks',
      'Creators building tools for others',
    ],
    curriculum: [
      {
        title: 'Module 1: Skills Basics',
        lessons: [
          'What are Claude Code skills?',
          'Finding and installing skills',
          'Browsing the skills marketplace',
          'Checking skill compatibility',
        ],
      },
      {
        title: 'Module 2: Installing & Using Skills',
        lessons: [
          'Installation step-by-step',
          'Verifying successful installation',
          'Using skills in Claude Code',
          'Passing parameters to skills',
          'Troubleshooting common issues',
        ],
      },
      {
        title: 'Module 3: Customizing Skills',
        lessons: [
          'Understanding skill structure',
          'Modifying existing skills',
          'Adding custom parameters',
          'Creating skill aliases',
          'Best practices for customization',
        ],
      },
      {
        title: 'Module 4: Building Your First Skill',
        lessons: [
          'Skill anatomy and requirements',
          'Writing skill code',
          'Testing your skill',
          'Documenting your skill',
          'Publishing to the marketplace',
        ],
      },
    ],
    faq: [
      {
        question: 'Do I need to know how to code to customize skills?',
        answer: 'Basic programming knowledge helps, but we walk through everything step-by-step. You can customize most skills with copy-paste.',
      },
      {
        question: 'Can I use skills on Windows/Mac/Linux?',
        answer: 'Yes! Skills work on all platforms.',
      },
      {
        question: 'How do I share custom skills with my team?',
        answer: 'We cover team distribution methods including direct sharing and publishing to private repositories.',
      },
      {
        question: 'Will my custom skills be supported forever?',
        answer: 'Your skills are your responsibility, but we provide lifetime support for troubleshooting.',
      },
      {
        question: 'Can I make money from my skills?',
        answer: 'You can publish skills to the marketplace and earn from downloads. We explain the process in the course.',
      },
      {
        question: 'What if I have ideas for new skills?',
        answer: 'Share your ideas in the course community. Popular requests may get featured in future updates.',
      },
    ],
    prerequisites: ['Claude Code installed and working', 'Basic terminal familiarity', 'Optional: JavaScript or Python knowledge'],
    instructor: 'Ahsan',
    certificate: false,
    moneyBackGuarantee: true,
  },
]

export function getCourseBySlug(slug: string): Course | undefined {
  return courses.find((course) => course.slug === slug)
}

export function getAllCourses(): Course[] {
  return courses
}
