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

      {/* Premium Guides Section */}
      <section id="premium" className="px-4 py-16 border-t border-border bg-gradient-to-b from-blue-50/50 to-white">
        <div className="max-w-content mx-auto">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-3 h-3 rounded-full bg-accent"></div>
            <h2 className="text-heading-sm text-foreground">Go Deeper</h2>
            <span className="px-2 py-0.5 bg-accent/10 text-accent text-xs font-semibold rounded">PAID</span>
          </div>
          <p className="text-body text-muted mb-8 max-w-2xl">
            Video courses with step-by-step walkthroughs, downloadable resources, and lifetime access.
          </p>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {/* Claude Code Essentials */}
            <Link href="/courses/claude-code-essentials">
              <div className="h-full p-6 bg-white rounded-card border-2 border-accent/20 hover:border-accent hover:shadow-card-hover hover:-translate-y-1 transition-all duration-200 flex flex-col">
                <div className="flex items-center justify-between mb-3">
                  <span className="px-2 py-1 bg-emerald-100 text-emerald-700 text-xs font-semibold rounded">BEGINNER</span>
                  <span className="text-lg font-bold text-foreground">$67</span>
                </div>
                <h3 className="text-lg font-bold text-foreground mb-2">Claude Code Essentials</h3>
                <p className="text-body-sm text-muted mb-4 flex-1">Master Claude Code from installation to shipping your first feature. 2 hours of video.</p>
                <div className="flex items-center text-accent font-medium text-body-sm">
                  View Course
                  <svg className="w-4 h-4 ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                </div>
              </div>
            </Link>

            {/* AI Workflow Builder */}
            <Link href="/courses/ai-workflow-builder">
              <div className="h-full p-6 bg-white rounded-card border-2 border-accent/20 hover:border-accent hover:shadow-card-hover hover:-translate-y-1 transition-all duration-200 flex flex-col">
                <div className="flex items-center justify-between mb-3">
                  <span className="px-2 py-1 bg-amber-100 text-amber-700 text-xs font-semibold rounded">INTERMEDIATE</span>
                  <span className="text-lg font-bold text-foreground">$97</span>
                </div>
                <h3 className="text-lg font-bold text-foreground mb-2">AI Workflow Builder</h3>
                <p className="text-body-sm text-muted mb-4 flex-1">Build 5 complete automation workflows using Claude + other tools. 3 hours of video.</p>
                <div className="flex items-center text-accent font-medium text-body-sm">
                  View Course
                  <svg className="w-4 h-4 ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                </div>
              </div>
            </Link>

            {/* Claude Skills Mastery */}
            <Link href="/courses/claude-skills-mastery">
              <div className="h-full p-6 bg-white rounded-card border-2 border-accent/20 hover:border-accent hover:shadow-card-hover hover:-translate-y-1 transition-all duration-200 flex flex-col">
                <div className="flex items-center justify-between mb-3">
                  <span className="px-2 py-1 bg-amber-100 text-amber-700 text-xs font-semibold rounded">INTERMEDIATE</span>
                  <span className="text-lg font-bold text-foreground">$47</span>
                </div>
                <h3 className="text-lg font-bold text-foreground mb-2">Claude Skills Mastery</h3>
                <p className="text-body-sm text-muted mb-4 flex-1">Unlock superpowers: install, customize, and build your own skills. 1.5 hours of video.</p>
                <div className="flex items-center text-accent font-medium text-body-sm">
                  View Course
                  <svg className="w-4 h-4 ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                </div>
              </div>
            </Link>
          </div>
        </div>
      </section>

      {/* 1:1 Walkthrough Section */}
      <section id="one-on-one" className="px-4 py-16 border-t border-border bg-gradient-to-b from-purple-50/50 to-white">
        <div className="max-w-content mx-auto">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-3 h-3 rounded-full bg-purple-500"></div>
            <h2 className="text-heading-sm text-foreground">1:1 Walkthroughs</h2>
            <span className="px-2 py-0.5 bg-purple-100 text-purple-700 text-xs font-semibold rounded">HANDS-ON</span>
          </div>
          <p className="text-body text-muted mb-8 max-w-2xl">
            Want someone to set it up for you? Our automation team will get your workflows running in one session.
          </p>

          <div className="grid md:grid-cols-2 gap-6 max-w-3xl">
            {/* 1:1 Walkthrough - One-time */}
            <Link href="/pricing#one-on-one">
              <div className="h-full p-6 bg-white rounded-card border-2 border-purple-200 hover:border-purple-500 hover:shadow-card-hover hover:-translate-y-1 transition-all duration-200 flex flex-col">
                <div className="flex items-center justify-between mb-3">
                  <span className="px-2 py-1 bg-purple-100 text-purple-700 text-xs font-semibold rounded">ONE-TIME</span>
                  <span className="text-lg font-bold text-foreground">$650</span>
                </div>
                <h3 className="text-lg font-bold text-foreground mb-2">1:1 Walkthrough</h3>
                <p className="text-body-sm text-muted mb-4 flex-1">
                  A 90-minute session with our automation team. We&apos;ll set up your tools and build your first workflow together.
                </p>
                <ul className="text-body-sm text-muted mb-4 space-y-1">
                  <li className="flex items-center gap-2">
                    <svg className="w-4 h-4 text-purple-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                    90-minute live session
                  </li>
                  <li className="flex items-center gap-2">
                    <svg className="w-4 h-4 text-purple-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                    Custom workflow setup
                  </li>
                  <li className="flex items-center gap-2">
                    <svg className="w-4 h-4 text-purple-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                    Recording included
                  </li>
                </ul>
                <div className="flex items-center text-purple-600 font-medium text-body-sm">
                  Book Session
                  <svg className="w-4 h-4 ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                </div>
              </div>
            </Link>

            {/* Weekly 1:1 Walkthrough - Subscription */}
            <Link href="/pricing#one-on-one">
              <div className="h-full p-6 bg-white rounded-card border-2 border-purple-200 hover:border-purple-500 hover:shadow-card-hover hover:-translate-y-1 transition-all duration-200 flex flex-col relative">
                <span className="absolute -top-3 left-1/2 -translate-x-1/2 bg-purple-500 text-white px-3 py-1 rounded-full text-xs font-semibold">
                  BEST VALUE
                </span>
                <div className="flex items-center justify-between mb-3">
                  <span className="px-2 py-1 bg-purple-100 text-purple-700 text-xs font-semibold rounded">MONTHLY</span>
                  <span className="text-lg font-bold text-foreground">$1,200<span className="text-sm font-normal text-muted">/mo</span></span>
                </div>
                <h3 className="text-lg font-bold text-foreground mb-2">Weekly 1:1 Walkthrough</h3>
                <p className="text-body-sm text-muted mb-4 flex-1">
                  Four 60-minute sessions per month. Ongoing support as you scale your AI workflows.
                </p>
                <ul className="text-body-sm text-muted mb-4 space-y-1">
                  <li className="flex items-center gap-2">
                    <svg className="w-4 h-4 text-purple-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                    4 sessions per month
                  </li>
                  <li className="flex items-center gap-2">
                    <svg className="w-4 h-4 text-purple-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                    Priority scheduling
                  </li>
                  <li className="flex items-center gap-2">
                    <svg className="w-4 h-4 text-purple-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                    Slack support between calls
                  </li>
                </ul>
                <div className="flex items-center text-purple-600 font-medium text-body-sm">
                  Start Subscription
                  <svg className="w-4 h-4 ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                </div>
              </div>
            </Link>
          </div>
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
