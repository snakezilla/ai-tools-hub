import { notFound } from "next/navigation"
import Link from "next/link"
import type { Metadata } from "next"
import { getRoleCategory, getToolsForRole, roleCategories } from "@/lib/tools"
import { ToolCard } from "@/components/ToolCard"

interface CategoryPageProps {
  params: Promise<{
    slug: string
  }>
}

export async function generateStaticParams() {
  return roleCategories.map((cat) => ({
    slug: cat.slug,
  }))
}

export async function generateMetadata({
  params,
}: CategoryPageProps): Promise<Metadata> {
  const { slug } = await params
  const category = getRoleCategory(slug)

  if (!category) {
    return {
      title: "Category Not Found",
    }
  }

  return {
    title: `${category.name} AI Tools`,
    description: category.description,
    openGraph: {
      title: `${category.name} AI Tools - AI Tools Hub`,
      description: category.description,
      type: "website",
      url: `/category/${category.slug}`,
    },
    twitter: {
      card: "summary_large_image",
      title: `${category.name} AI Tools`,
      description: category.description,
    },
  }
}

export default async function CategoryPage({ params }: CategoryPageProps) {
  const { slug } = await params
  const category = getRoleCategory(slug)

  if (!category) {
    notFound()
  }

  const tools = getToolsForRole(slug)

  return (
    <div className="min-h-screen bg-background">
      {/* Breadcrumb */}
      <nav className="border-b border-border bg-card">
        <div className="max-w-content mx-auto px-4 py-4">
          <div className="flex items-center gap-2 text-sm text-muted">
            <Link href="/" className="hover:text-foreground transition-colors">
              Home
            </Link>
            <span>/</span>
            <span className="text-foreground">{category.name}</span>
          </div>
        </div>
      </nav>

      {/* Header */}
      <header className="py-12 md:py-18 px-4 border-b border-border">
        <div className="max-w-content mx-auto text-center">
          <h1 className="text-heading-lg md:text-heading-xl text-foreground mb-4">
            {category.name}
          </h1>
          <p className="text-body-lg text-muted max-w-2xl mx-auto">
            {category.description}
          </p>
        </div>
      </header>

      {/* Tools Grid */}
      <main className="py-12 md:py-18 px-4">
        <div className="max-w-content mx-auto">
          {tools.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {tools.map((tool) => (
                <ToolCard key={tool.slug} tool={tool} variant="grid" />
              ))}
            </div>
          ) : (
            <div className="text-center py-12">
              <p className="text-muted text-body-lg">
                No tools found for this category yet.
              </p>
              <Link
                href="/"
                className="inline-block mt-4 text-accent hover:text-accent-dark transition-colors"
              >
                Browse all tools
              </Link>
            </div>
          )}
        </div>
      </main>

      {/* Other Categories */}
      <section className="py-12 px-4 bg-card border-t border-border">
        <div className="max-w-content mx-auto">
          <h2 className="text-heading-sm text-foreground mb-6 text-center">
            Browse Other Categories
          </h2>
          <div className="flex flex-wrap justify-center gap-4">
            {roleCategories
              .filter((cat) => cat.slug !== slug)
              .map((cat) => (
                <Link
                  key={cat.slug}
                  href={`/category/${cat.slug}`}
                  className="px-6 py-3 bg-background border border-border rounded-button hover:border-accent hover:text-accent transition-colors"
                >
                  {cat.name}
                </Link>
              ))}
          </div>
        </div>
      </section>
    </div>
  )
}
