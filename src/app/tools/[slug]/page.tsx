import { notFound } from "next/navigation"
import Link from "next/link"
import type { Metadata } from "next"
import { getToolBySlug, tools } from "@/lib/tools"
import { ToolCard } from "@/components/ToolCard"

interface ToolPageProps {
  params: Promise<{
    slug: string
  }>
}

export async function generateStaticParams() {
  return tools.map((tool) => ({
    slug: tool.slug,
  }))
}

export async function generateMetadata({
  params,
}: ToolPageProps): Promise<Metadata> {
  const { slug } = await params
  const tool = getToolBySlug(slug)

  if (!tool) {
    return {
      title: "Tool Not Found",
    }
  }

  const description = `${tool.tagline}. Learn ${tool.name} in 5 minutes. Setup: ${tool.setupTime}. Time saved: ${tool.timeSaved}.`

  return {
    title: `${tool.name} - 5-Minute Mastery`,
    description,
    openGraph: {
      title: `${tool.name} - Learn in 5 Minutes`,
      description,
      type: "article",
      url: `/tools/${tool.slug}`,
      images: [
        {
          url: `/og-tools/${tool.slug}.png`,
          width: 1200,
          height: 630,
          alt: `${tool.name} - AI Tools Hub`,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: `${tool.name} - Learn in 5 Minutes`,
      description,
      images: [`/og-tools/${tool.slug}.png`],
    },
  }
}

export default async function ToolPage({ params }: ToolPageProps) {
  const { slug } = await params
  const tool = getToolBySlug(slug)

  if (!tool) {
    notFound()
  }

  return (
    <div className="min-h-screen bg-background">
      <nav className="border-b border-border bg-card">
        <div className="max-w-content mx-auto px-4 py-4">
          <Link
            href="/"
            className="inline-flex items-center gap-2 text-muted hover:text-foreground transition-colors"
          >
            <svg
              className="w-4 h-4"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M15 19l-7-7 7-7"
              />
            </svg>
            Back to all tools
          </Link>
        </div>
      </nav>

      <main className="max-w-narrow mx-auto px-4 py-12">
        <ToolCard tool={tool} variant="full" />

        <div className="mt-12 p-8 bg-card rounded-card border border-border text-center">
          <h2 className="text-heading-sm text-card-foreground mb-4">
            Want help implementing {tool.name} for your team?
          </h2>
          <p className="text-muted mb-6">
            Book a hands-on workshop. Get personalized setup, custom workflows,
            and 90-day support.
          </p>
          <Link
            href="/workshops"
            className="inline-flex items-center justify-center px-8 py-4 bg-accent text-accent-foreground rounded-button font-semibold hover:bg-accent-dark transition-colors"
          >
            Book a Workshop
          </Link>
        </div>
      </main>
    </div>
  )
}
