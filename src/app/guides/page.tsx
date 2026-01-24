import { Metadata } from 'next'
import Link from 'next/link'
import { guides } from '@/lib/guides'
import { DifficultyBadge } from '@/components/ui/DifficultyBadge'
import { ReadTimeBadge } from '@/components/ui/ReadTimeBadge'

export const metadata: Metadata = {
  title: 'Master AI Tools - Step-by-Step Guides | Practical Library',
  description: 'Deep-dive guides to master AI tools and workflows. From Claude Code to workflow automation. Learn from practitioners, by practitioners. No fluff.',
  keywords: [
    'AI guides',
    'Claude Code guide',
    'Claude tutorial',
    'AI tools tutorial',
    'workflow automation',
    'step by step guide',
    'beginner to advanced',
    'AI learning',
    'tool mastery',
  ],
  openGraph: {
    title: 'Master AI Tools - Step-by-Step Guides | Practical Library',
    description: 'Learn to master AI tools with our comprehensive guides. From setup to advanced workflows. No fluff, just practical knowledge.',
    url: 'https://practicallibrary.com/guides',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Master AI Tools - Guides | Practical Library',
    description: 'Step-by-step guides to master Claude Code, workflow automation, and 15+ AI tools.',
  },
}

export default function GuidesPage() {
  const beginnerGuides = guides.filter((g) => g.difficulty === 'beginner')
  const intermediateGuides = guides.filter((g) => g.difficulty === 'intermediate')
  const advancedGuides = guides.filter((g) => g.difficulty === 'advanced')

  return (
    <main className="min-h-screen bg-white">
      {/* Hero */}
      <section className="px-4 py-16 md:py-24 border-b border-gray-200">
        <div className="max-w-4xl mx-auto text-center">
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
            Deep-Dive Guides
          </h1>
          <p className="text-xl text-gray-600 mb-8">
            Master every tool with step-by-step guides. Written by practitioners. No fluff.
          </p>

          {/* Quick Filter */}
          <div className="flex gap-2 justify-center flex-wrap">
            <a
              href="#beginner"
              className="px-4 py-2 bg-emerald-50 text-emerald-700 border border-emerald-200 rounded-lg hover:bg-emerald-100 transition"
            >
              Beginner
            </a>
            <a
              href="#intermediate"
              className="px-4 py-2 bg-amber-50 text-amber-700 border border-amber-200 rounded-lg hover:bg-amber-100 transition"
            >
              Intermediate
            </a>
            <a
              href="#advanced"
              className="px-4 py-2 bg-red-50 text-red-700 border border-red-200 rounded-lg hover:bg-red-100 transition"
            >
              Advanced
            </a>
          </div>
        </div>
      </section>

      {/* Beginner Section */}
      <section id="beginner" className="px-4 py-16 border-b border-gray-200">
        <div className="max-w-4xl mx-auto">
          <div className="flex items-center gap-3 mb-8">
            <h2 className="text-2xl font-bold text-gray-900">Beginner Guides</h2>
            <span className="text-sm bg-emerald-50 text-emerald-700 px-3 py-1 rounded-full border border-emerald-200">
              {beginnerGuides.length}
            </span>
          </div>

          <div className="grid md:grid-cols-2 gap-6">
            {beginnerGuides.map((guide) => (
              <GuideCard key={guide.slug} guide={guide} />
            ))}
          </div>

          {beginnerGuides.length === 0 && (
            <p className="text-gray-500 text-center py-12">No beginner guides yet. Check back soon!</p>
          )}
        </div>
      </section>

      {/* Intermediate Section */}
      <section id="intermediate" className="px-4 py-16 border-b border-gray-200">
        <div className="max-w-4xl mx-auto">
          <div className="flex items-center gap-3 mb-8">
            <h2 className="text-2xl font-bold text-gray-900">Intermediate Guides</h2>
            <span className="text-sm bg-amber-50 text-amber-700 px-3 py-1 rounded-full border border-amber-200">
              {intermediateGuides.length}
            </span>
          </div>

          <div className="grid md:grid-cols-2 gap-6">
            {intermediateGuides.map((guide) => (
              <GuideCard key={guide.slug} guide={guide} />
            ))}
          </div>

          {intermediateGuides.length === 0 && (
            <p className="text-gray-500 text-center py-12">No intermediate guides yet. Check back soon!</p>
          )}
        </div>
      </section>

      {/* Advanced Section */}
      <section id="advanced" className="px-4 py-16">
        <div className="max-w-4xl mx-auto">
          <div className="flex items-center gap-3 mb-8">
            <h2 className="text-2xl font-bold text-gray-900">Advanced Guides</h2>
            <span className="text-sm bg-red-50 text-red-700 px-3 py-1 rounded-full border border-red-200">
              {advancedGuides.length}
            </span>
          </div>

          <div className="grid md:grid-cols-2 gap-6">
            {advancedGuides.map((guide) => (
              <GuideCard key={guide.slug} guide={guide} />
            ))}
          </div>

          {advancedGuides.length === 0 && (
            <p className="text-gray-500 text-center py-12">No advanced guides yet. Check back soon!</p>
          )}
        </div>
      </section>
    </main>
  )
}

function GuideCard({ guide }: { guide: typeof guides[0] }) {
  return (
    <Link href={`/guides/${guide.slug}`}>
      <div className="p-6 bg-gray-50 rounded-lg border border-gray-200 hover:shadow-lg transition h-full flex flex-col">
        <div className="mb-4 flex items-start justify-between gap-2">
          <h3 className="text-lg font-bold text-gray-900 flex-1">{guide.title}</h3>
        </div>

        <p className="text-gray-600 text-sm mb-4 flex-1">{guide.description}</p>

        <div className="flex items-center gap-3 mb-4">
          <DifficultyBadge level={guide.difficulty} />
          <ReadTimeBadge minutes={guide.readTime} />
        </div>

        {guide.tags && guide.tags.length > 0 && (
          <div className="flex flex-wrap gap-2">
            {guide.tags.slice(0, 2).map((tag) => (
              <span key={tag} className="text-xs bg-gray-100 text-gray-600 px-2 py-1 rounded">
                {tag}
              </span>
            ))}
          </div>
        )}
      </div>
    </Link>
  )
}
