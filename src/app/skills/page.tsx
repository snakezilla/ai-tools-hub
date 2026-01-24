import { Metadata } from 'next'
import { skills } from '@/lib/skills'
import { DifficultyBadge } from '@/components/ui/DifficultyBadge'
import { SkillCopyButton } from '@/components/SkillCopyButton'

export const metadata: Metadata = {
  title: 'Claude Skills Library - 31+ Verified Skills',
  description: '31+ verified Claude Code skills organized by category: coding, writing, analysis, integration, productivity, and AI. One-click install and instant expertise.',
  keywords: [
    'Claude skills',
    'Claude Code extensions',
    'coding skills',
    'writing skills',
    'SEO audit',
    'code review',
    'api design',
    'prompt engineering',
  ],
  openGraph: {
    title: 'Claude Skills Library | Practical Library',
    description: 'Discover 31+ verified Claude Code skills. Extend Claude with specialized expertise in coding, writing, analysis, and more.',
    url: 'https://practicallibrary.com/skills',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Claude Skills Library | Practical Library',
    description: 'Install 31+ verified Claude Code skills instantly. Code review, copywriting, SEO audits, and more.',
  },
}

const categories = [
  { id: 'coding', name: 'Coding', icon: '💻' },
  { id: 'writing', name: 'Writing', icon: '✍️' },
  { id: 'analysis', name: 'Analysis', icon: '📊' },
  { id: 'integration', name: 'Integration', icon: '🔗' },
  { id: 'productivity', name: 'Productivity', icon: '⚡' },
]

export default function SkillsPage() {
  return (
    <main className="min-h-screen bg-white">
      {/* Hero */}
      <section className="px-4 py-16 md:py-24 border-b border-gray-200">
        <div className="max-w-4xl mx-auto text-center">
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
            Claude Skills Library
          </h1>
          <p className="text-xl text-gray-600 mb-8">
            Extend Claude&apos;s capabilities with curated skills. One-click install.
          </p>
          <p className="text-gray-600">
            {skills.length} skills available • All open-source • Works with Claude Code
          </p>
        </div>
      </section>

      {/* Skills by Category */}
      {categories.map((category) => {
        const categorySkills = skills.filter((s) => s.category === category.id)
        if (categorySkills.length === 0) return null

        return (
          <section key={category.id} className="px-4 py-16 border-b border-gray-200">
            <div className="max-w-4xl mx-auto">
              <div className="flex items-center gap-3 mb-8">
                <span className="text-3xl">{category.icon}</span>
                <h2 className="text-2xl font-bold text-gray-900">{category.name}</h2>
                <span className="ml-auto text-sm bg-gray-100 text-gray-600 px-3 py-1 rounded-full">
                  {categorySkills.length}
                </span>
              </div>

              <div className="grid md:grid-cols-2 gap-6">
                {categorySkills.map((skill) => (
                  <div
                    key={skill.id}
                    className="p-6 bg-gray-50 rounded-lg border border-gray-200 hover:shadow-lg transition flex flex-col"
                  >
                    <div className="mb-3 flex items-start justify-between gap-2">
                      <h3 className="text-lg font-bold text-gray-900">{skill.name}</h3>
                      <DifficultyBadge level={skill.difficulty} />
                    </div>

                    <p className="text-gray-600 text-sm mb-4 flex-1">{skill.description}</p>

                    {skill.installCommand && (
                      <div className="mb-4 p-3 bg-gray-100 rounded font-mono text-xs text-gray-700 overflow-x-auto">
                        {skill.installCommand}
                      </div>
                    )}

                    <SkillCopyButton command={skill.installCommand || ''} />
                  </div>
                ))}
              </div>
            </div>
          </section>
        )
      })}

      {/* CTA */}
      <section className="px-4 py-16">
        <div className="max-w-3xl mx-auto p-8 bg-blue-50 rounded-lg border border-blue-200 text-center">
          <h2 className="text-2xl font-bold text-gray-900 mb-3">
            Can&apos;t find what you need?
          </h2>
          <p className="text-gray-600 mb-6">
            Build your own skill or request one from the community.
          </p>
          <div className="flex gap-4 justify-center flex-wrap">
            <a
              href="https://github.com/anthropics/claude-skills"
              target="_blank"
              rel="noopener noreferrer"
              className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
            >
              View on GitHub
            </a>
            <a href="/contact" className="px-6 py-3 bg-white text-blue-600 border border-blue-600 rounded-lg hover:bg-blue-50">
              Request a Skill
            </a>
          </div>
        </div>
      </section>
    </main>
  )
}
