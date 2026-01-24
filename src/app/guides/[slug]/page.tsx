import { Metadata } from 'next'
import Link from 'next/link'
import { getGuideBySlug } from '@/lib/guides'
import { DifficultyBadge } from '@/components/ui/DifficultyBadge'
import { ReadTimeBadge } from '@/components/ui/ReadTimeBadge'

interface GuidePageProps {
  params: Promise<{
    slug: string
  }>
}

export async function generateMetadata({ params }: GuidePageProps): Promise<Metadata> {
  const { slug } = await params
  const guide = getGuideBySlug(slug)

  if (!guide) {
    return {
      title: 'Guide not found',
      description: 'The guide you are looking for does not exist.',
    }
  }

  return {
    title: guide.title,
    description: guide.description,
    openGraph: {
      title: guide.title,
      description: guide.description,
      type: 'article',
    },
  }
}

export default async function GuidePage({ params }: GuidePageProps) {
  const { slug } = await params
  const guide = getGuideBySlug(slug)

  if (!guide) {
    return (
      <main className="min-h-screen bg-white px-4 py-16">
        <div className="max-w-2xl mx-auto text-center">
          <h1 className="text-3xl font-bold text-gray-900 mb-4">Guide not found</h1>
          <p className="text-gray-600 mb-8">The guide you are looking for does not exist.</p>
          <Link href="/guides" className="inline-block px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700">
            Back to Guides
          </Link>
        </div>
      </main>
    )
  }

  return (
    <main className="min-h-screen bg-white">
      {/* Header */}
      <section className="px-4 py-12 border-b border-gray-200">
        <div className="max-w-3xl mx-auto">
          <Link href="/guides" className="text-blue-600 hover:text-blue-700 mb-4 inline-block">
            ← Back to Guides
          </Link>

          <h1 className="text-4xl font-bold text-gray-900 mb-4">{guide.title}</h1>
          <p className="text-lg text-gray-600 mb-6">{guide.description}</p>

          <div className="flex items-center gap-4 flex-wrap">
            <DifficultyBadge level={guide.difficulty} />
            <ReadTimeBadge minutes={guide.readTime} />

            {guide.tags && guide.tags.length > 0 && (
              <div className="flex gap-2">
                {guide.tags.map((tag) => (
                  <span key={tag} className="text-sm bg-gray-100 text-gray-600 px-3 py-1 rounded-full">
                    {tag}
                  </span>
                ))}
              </div>
            )}
          </div>
        </div>
      </section>

      {/* Content */}
      <section className="px-4 py-12">
        <div className="max-w-3xl mx-auto prose prose-sm max-w-none">
          {guide.fullContent ? (
            <div dangerouslySetInnerHTML={{ __html: guide.fullContent }} />
          ) : (
            <div className="bg-amber-50 border border-amber-200 rounded-lg p-6 text-center">
              <p className="text-amber-800">
                <strong>Coming soon:</strong> This guide is currently being written. Check back soon for the full content!
              </p>
            </div>
          )}
        </div>
      </section>

      {/* Related Resources */}
      {guide.toolSlugs && guide.toolSlugs.length > 0 && (
        <section className="px-4 py-12 bg-gray-50 border-t border-gray-200">
          <div className="max-w-3xl mx-auto">
            <h2 className="text-2xl font-bold text-gray-900 mb-6">Related Tools</h2>
            <div className="grid md:grid-cols-2 gap-4">
              {guide.toolSlugs.map((toolSlug) => (
                <Link
                  key={toolSlug}
                  href={`/tools/${toolSlug}`}
                  className="p-4 bg-white rounded-lg border border-gray-200 hover:shadow-lg transition"
                >
                  <p className="font-semibold text-gray-900">Learn about {toolSlug.replace(/-/g, ' ')}</p>
                  <p className="text-sm text-gray-600 mt-1">Quick reference and setup →</p>
                </Link>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* CTA */}
      <section className="px-4 py-12">
        <div className="max-w-3xl mx-auto p-8 bg-blue-50 rounded-lg border border-blue-200 text-center">
          <h2 className="text-2xl font-bold text-gray-900 mb-3">Want to master this faster?</h2>
          <p className="text-gray-600 mb-6">
            Check out our hands-on courses and workshops for structured learning with support.
          </p>
          <div className="flex gap-4 justify-center flex-wrap">
            <Link href="/courses" className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700">
              Browse Courses
            </Link>
            <Link href="/contact" className="px-6 py-3 bg-white text-blue-600 border border-blue-600 rounded-lg hover:bg-blue-50">
              Book Workshop
            </Link>
          </div>
        </div>
      </section>
    </main>
  )
}
