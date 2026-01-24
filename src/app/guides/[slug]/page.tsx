import { Metadata } from 'next'
import Link from 'next/link'
import { getStructuredGuideBySlug, getAllStructuredGuides } from '@/lib/structured-guides'
import { GuideContent } from '@/components/GuideContent'
import { DifficultyBadge } from '@/components/ui/DifficultyBadge'
import { ReadTimeBadge } from '@/components/ui/ReadTimeBadge'

interface GuidePageProps {
  params: Promise<{
    slug: string
  }>
}

export async function generateMetadata({ params }: GuidePageProps): Promise<Metadata> {
  const { slug } = await params
  const guide = getStructuredGuideBySlug(slug)

  if (!guide) {
    return {
      title: 'Guide not found',
      description: 'The guide you are looking for does not exist.',
    }
  }

  return {
    title: `${guide.title} | Practical Library`,
    description: guide.description,
    openGraph: {
      title: guide.title,
      description: guide.description,
      type: 'article',
    },
  }
}

export async function generateStaticParams() {
  return getAllStructuredGuides().map((guide) => ({
    slug: guide.slug,
  }))
}

export default async function GuidePage({ params }: GuidePageProps) {
  const { slug } = await params
  const guide = getStructuredGuideBySlug(slug)

  if (!guide) {
    return (
      <main className="min-h-screen bg-background px-4 py-16">
        <div className="max-w-2xl mx-auto text-center">
          <h1 className="text-heading-md text-foreground mb-4">Guide not found</h1>
          <p className="text-body text-muted mb-8">The guide you are looking for does not exist.</p>
          <Link href="/guides" className="inline-block px-6 py-3 bg-accent text-accent-foreground rounded-button font-semibold hover:bg-accent-dark transition">
            Back to Guides
          </Link>
        </div>
      </main>
    )
  }

  return (
    <main className="min-h-screen bg-background">
      {/* Header */}
      <section className="px-4 py-12 md:py-16 border-b border-border">
        <div className="max-w-narrow mx-auto">
          <Link href="/guides" className="text-accent hover:text-accent-dark mb-6 inline-flex items-center gap-2 text-body-sm font-medium transition">
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
            All Guides
          </Link>

          <h1 className="text-heading-md md:text-heading-lg text-foreground mb-3">{guide.title}</h1>
          <p className="text-body-lg text-muted mb-6">{guide.subtitle}</p>

          <div className="flex items-center gap-4 flex-wrap">
            <DifficultyBadge level={guide.difficulty} />
            <ReadTimeBadge minutes={guide.readTime} />

            {guide.tags && guide.tags.length > 0 && (
              <div className="flex gap-2">
                {guide.tags.map((tag) => (
                  <span key={tag} className="text-sm bg-gray-100 text-muted px-3 py-1 rounded-full">
                    {tag}
                  </span>
                ))}
              </div>
            )}
          </div>
        </div>
      </section>

      {/* Content */}
      <section className="px-4 py-12 md:py-16">
        <GuideContent guide={guide} />
      </section>

      {/* CTA */}
      <section className="px-4 py-12 md:py-16 bg-gray-50 border-t border-border">
        <div className="max-w-narrow mx-auto p-8 bg-accent/5 rounded-card border border-accent/20 text-center">
          <h2 className="text-heading-sm text-foreground mb-3">Want to go deeper?</h2>
          <p className="text-body text-muted mb-6">
            Our courses give you hands-on practice with real projects and expert support.
          </p>
          <div className="flex gap-4 justify-center flex-wrap">
            <Link href="/courses" className="px-6 py-3 bg-accent text-accent-foreground rounded-button font-semibold hover:bg-accent-dark transition">
              Browse Courses
            </Link>
            <Link href="/contact" className="px-6 py-3 bg-card text-foreground border border-border rounded-button font-semibold hover:border-accent hover:text-accent transition">
              Ask a Question
            </Link>
          </div>
        </div>
      </section>
    </main>
  )
}
