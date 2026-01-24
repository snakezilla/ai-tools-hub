import { Metadata } from 'next'
import Link from 'next/link'
import { getAllStructuredGuides } from '@/lib/structured-guides'
import type { StructuredGuide } from '@/components/GuideContent'
import { DifficultyBadge } from '@/components/ui/DifficultyBadge'
import { ReadTimeBadge } from '@/components/ui/ReadTimeBadge'

export const metadata: Metadata = {
  title: 'AI Tool Guides - Learn in Minutes | Practical Library',
  description: 'Quick, practical guides to master AI tools. No fluff. Just the steps you need to get value fast.',
  keywords: [
    'AI guides',
    'Claude Code guide',
    'Claude tutorial',
    'AI tools tutorial',
    'quick start guides',
  ],
  openGraph: {
    title: 'AI Tool Guides | Practical Library',
    description: 'Learn AI tools in 2-5 minutes. Practical steps, no fluff.',
    url: 'https://practicallibrary.com/guides',
    type: 'website',
  },
}

export default function GuidesPage() {
  const guides = getAllStructuredGuides()
  const beginnerGuides = guides.filter((g) => g.difficulty === 'beginner')
  const intermediateGuides = guides.filter((g) => g.difficulty === 'intermediate')
  const advancedGuides = guides.filter((g) => g.difficulty === 'advanced')

  return (
    <main className="min-h-screen bg-background">
      {/* Hero */}
      <section className="px-4 py-16 md:py-20 border-b border-border">
        <div className="max-w-content mx-auto text-center">
          <h1 className="text-heading-lg md:text-heading-xl text-foreground mb-4">
            Learn in <span className="text-accent">Minutes</span>, Not Hours
          </h1>
          <p className="text-body-lg text-muted max-w-2xl mx-auto mb-8">
            Quick, practical guides. Each one shows you exactly what to do—no essays, no fluff.
          </p>

          {/* Quick Filter */}
          <div className="flex gap-3 justify-center flex-wrap">
            <a
              href="#beginner"
              className="px-5 py-2.5 bg-emerald-50 text-emerald-700 border border-emerald-200 rounded-button font-medium hover:bg-emerald-100 transition"
            >
              Start Here ({beginnerGuides.length})
            </a>
            <a
              href="#intermediate"
              className="px-5 py-2.5 bg-amber-50 text-amber-700 border border-amber-200 rounded-button font-medium hover:bg-amber-100 transition"
            >
              Level Up ({intermediateGuides.length})
            </a>
            {advancedGuides.length > 0 && (
              <a
                href="#advanced"
                className="px-5 py-2.5 bg-red-50 text-red-700 border border-red-200 rounded-button font-medium hover:bg-red-100 transition"
              >
                Advanced ({advancedGuides.length})
              </a>
            )}
          </div>
        </div>
      </section>

      {/* Beginner Section */}
      <section id="beginner" className="px-4 py-16 border-b border-border">
        <div className="max-w-content mx-auto">
          <div className="flex items-center gap-3 mb-8">
            <div className="w-3 h-3 rounded-full bg-emerald-500"></div>
            <h2 className="text-heading-sm text-foreground">Start Here</h2>
            <span className="text-body-sm text-muted">New to AI tools? Begin with these.</span>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {beginnerGuides.map((guide) => (
              <GuideCard key={guide.slug} guide={guide} />
            ))}
          </div>

          {beginnerGuides.length === 0 && (
            <p className="text-muted text-center py-12">Coming soon!</p>
          )}
        </div>
      </section>

      {/* Intermediate Section */}
      <section id="intermediate" className="px-4 py-16 border-b border-border">
        <div className="max-w-content mx-auto">
          <div className="flex items-center gap-3 mb-8">
            <div className="w-3 h-3 rounded-full bg-amber-500"></div>
            <h2 className="text-heading-sm text-foreground">Level Up</h2>
            <span className="text-body-sm text-muted">Ready for more? Go deeper.</span>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {intermediateGuides.map((guide) => (
              <GuideCard key={guide.slug} guide={guide} />
            ))}
          </div>

          {intermediateGuides.length === 0 && (
            <p className="text-muted text-center py-12">Coming soon!</p>
          )}
        </div>
      </section>

      {/* Advanced Section */}
      {advancedGuides.length > 0 && (
        <section id="advanced" className="px-4 py-16">
          <div className="max-w-content mx-auto">
            <div className="flex items-center gap-3 mb-8">
              <div className="w-3 h-3 rounded-full bg-red-500"></div>
              <h2 className="text-heading-sm text-foreground">Advanced</h2>
              <span className="text-body-sm text-muted">Power user territory.</span>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {advancedGuides.map((guide) => (
                <GuideCard key={guide.slug} guide={guide} />
              ))}
            </div>
          </div>
        </section>
      )}

      {/* CTA */}
      <section className="px-4 py-16 bg-gray-50 border-t border-border">
        <div className="max-w-2xl mx-auto text-center">
          <h2 className="text-heading-sm text-foreground mb-4">Want hands-on practice?</h2>
          <p className="text-body text-muted mb-6">
            Our courses give you real projects, expert feedback, and a community to learn with.
          </p>
          <Link
            href="/courses"
            className="inline-block px-8 py-4 bg-accent text-accent-foreground rounded-button font-semibold text-lg hover:bg-accent-dark transition"
          >
            Browse Courses
          </Link>
        </div>
      </section>
    </main>
  )
}

function GuideCard({ guide }: { guide: StructuredGuide }) {
  return (
    <Link href={`/guides/${guide.slug}`}>
      <div className="h-full p-6 bg-card rounded-card border border-border hover:shadow-card-hover hover:-translate-y-1 transition-all duration-200 flex flex-col">
        <div className="flex items-center gap-3 mb-3">
          <DifficultyBadge level={guide.difficulty} />
          <ReadTimeBadge minutes={guide.readTime} />
        </div>

        <h3 className="text-lg font-bold text-foreground mb-2">{guide.title}</h3>
        <p className="text-body-sm text-muted mb-4 flex-1">{guide.description}</p>

        <div className="flex items-center text-accent font-medium text-body-sm">
          Read Guide
          <svg className="w-4 h-4 ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
          </svg>
        </div>
      </div>
    </Link>
  )
}
