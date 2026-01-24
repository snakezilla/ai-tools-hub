import { Metadata } from 'next'
import Link from 'next/link'
import { skills, getTopSkills } from '@/lib/skills'

export const metadata: Metadata = {
  title: 'Claude Skills Library',
  description: '20+ community-built skills to extend Claude&apos;s capabilities. Browse, install, and customize.',
}

const categories = ['productivity', 'development', 'marketing', 'business', 'research', 'writing']

export default function SkillsPage() {
  const topSkills = getTopSkills(8)

  return (
    <main className="min-h-screen bg-white">
      {/* Hero */}
      <section className="px-4 py-16 md:py-24">
        <div className="max-w-4xl mx-auto text-center mb-16">
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
            Claude Skills Library
          </h1>
          <p className="text-xl text-gray-600 mb-8">
            20+ skills to transform Claude into a domain expert. Install in seconds, customize to your needs.
          </p>
          <div className="flex gap-4 justify-center flex-wrap">
            <div className="flex items-center gap-2">
              <span className="text-2xl font-bold text-blue-600">{skills.length}</span>
              <span className="text-gray-600">Skills Available</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="text-2xl font-bold text-green-600">4.7★</span>
              <span className="text-gray-600">Average Rating</span>
            </div>
          </div>
        </div>

        {/* Top Skills */}
        <div className="max-w-6xl mx-auto mb-16">
          <h2 className="text-2xl font-bold text-gray-900 mb-8 text-center">
            Top Rated Skills
          </h2>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {topSkills.map((skill) => (
              <Link
                key={skill.id}
                href={skill.url}
                target="_blank"
                rel="noopener noreferrer"
                className="group"
              >
                <div className="bg-gray-50 border border-gray-200 rounded-lg p-6 h-full hover:shadow-lg transition flex flex-col">
                  <div className="flex items-start justify-between mb-3">
                    <h3 className="font-bold text-gray-900 group-hover:text-blue-600 transition flex-1">
                      {skill.name}
                    </h3>
                  </div>

                  <p className="text-gray-600 text-sm mb-4 flex-1">{skill.description}</p>

                  <div className="flex items-center justify-between pt-4 border-t border-gray-200">
                    <div className="flex items-center gap-1">
                      <span className="text-yellow-500 font-bold">{skill.rating}</span>
                      <span className="text-yellow-500">★</span>
                    </div>
                    <span className="text-blue-600 text-sm font-medium group-hover:underline">
                      Install →
                    </span>
                  </div>

                  {/* Category Badge */}
                  <div className="mt-3">
                    <span className="inline-block px-2 py-1 bg-blue-100 text-blue-700 text-xs font-medium rounded capitalize">
                      {skill.category}
                    </span>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>

        {/* Browse by Category */}
        <div className="max-w-6xl mx-auto mb-16">
          <h2 className="text-2xl font-bold text-gray-900 mb-8 text-center">
            Browse by Category
          </h2>

          <div className="grid md:grid-cols-3 gap-6">
            {categories.map((category) => {
              const categorySkills = skills.filter((s) => s.category === category)
              const topOfCategory = categorySkills.sort((a, b) => (b.rating || 0) - (a.rating || 0))[0]

              return (
                <div
                  key={category}
                  className="bg-gradient-to-br from-gray-50 to-gray-100 border border-gray-200 rounded-lg p-6 hover:shadow-md transition"
                >
                  <h3 className="text-lg font-bold text-gray-900 mb-2 capitalize">
                    {category}
                  </h3>
                  <p className="text-gray-600 text-sm mb-4">
                    {categorySkills.length} skill{categorySkills.length !== 1 ? 's' : ''}
                  </p>

                  {topOfCategory && (
                    <div className="mb-4 p-3 bg-white rounded border border-gray-200">
                      <p className="text-sm font-medium text-gray-900 mb-1">
                        Top Rated:
                      </p>
                      <Link
                        href={topOfCategory.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-blue-600 hover:text-blue-700 text-sm font-medium"
                      >
                        {topOfCategory.name}
                      </Link>
                    </div>
                  )}

                  <Link
                    href={`/skills?category=${category}`}
                    className="inline-flex items-center gap-1 text-blue-600 hover:text-blue-700 text-sm font-medium"
                  >
                    View All →
                  </Link>
                </div>
              )
            })}
          </div>
        </div>

        {/* All Skills */}
        <div className="max-w-6xl mx-auto mb-16">
          <h2 className="text-2xl font-bold text-gray-900 mb-8 text-center">
            All {skills.length} Skills
          </h2>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
            {skills.map((skill) => (
              <Link
                key={skill.id}
                href={skill.url}
                target="_blank"
                rel="noopener noreferrer"
                className="group"
              >
                <div className="border border-gray-200 rounded-lg p-4 hover:shadow-md transition">
                  <div className="flex items-start justify-between mb-2">
                    <h4 className="font-medium text-gray-900 group-hover:text-blue-600 transition flex-1">
                      {skill.name}
                    </h4>
                    <span className="text-yellow-500 font-bold text-sm">{skill.rating}★</span>
                  </div>

                  <p className="text-gray-600 text-sm mb-3 line-clamp-2">{skill.description}</p>

                  <div className="flex items-center justify-between">
                    <div className="flex gap-1 flex-wrap">
                      <span className="inline-block px-2 py-0.5 bg-gray-100 text-gray-700 text-xs rounded capitalize">
                        {skill.category}
                      </span>
                      <span className="inline-block px-2 py-0.5 bg-blue-50 text-blue-700 text-xs rounded capitalize">
                        {skill.difficulty}
                      </span>
                    </div>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>

        {/* CTA */}
        <div className="mt-20 max-w-2xl mx-auto p-8 bg-blue-50 rounded-lg border border-blue-200 text-center">
          <h2 className="text-2xl font-bold text-gray-900 mb-3">
            Want to build your own skill?
          </h2>
          <p className="text-gray-600 mb-6">
            Learn how to create custom skills in our courses and guides. Share with the community and help others solve problems.
          </p>
          <Link
            href="/guides/claude-skills-mastery"
            className="inline-block px-6 py-3 bg-blue-600 text-white font-medium rounded hover:bg-blue-700 transition"
          >
            Learn Skill Building
          </Link>
        </div>
      </section>
    </main>
  )
}
