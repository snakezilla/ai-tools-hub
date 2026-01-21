import Link from "next/link"
import { notFound } from "next/navigation"
import { getWorkflowBySlug, getAllWorkflows } from "@/lib/workflows"
import { WorkflowCard } from "@/components/WorkflowCard"

interface WorkflowPageProps {
  params: Promise<{ slug: string }>
}

export async function generateStaticParams() {
  const workflows = getAllWorkflows()
  return workflows.map((workflow) => ({
    slug: workflow.slug,
  }))
}

export async function generateMetadata({ params }: WorkflowPageProps) {
  const { slug } = await params
  const workflow = getWorkflowBySlug(slug)
  if (!workflow) return { title: "Workflow Not Found" }

  return {
    title: `${workflow.name} Workflow | AI Tools Hub`,
    description: workflow.tagline,
  }
}

export default async function WorkflowPage({ params }: WorkflowPageProps) {
  const { slug } = await params
  const workflow = getWorkflowBySlug(slug)

  if (!workflow) {
    notFound()
  }

  return (
    <main className="min-h-screen py-16 md:py-24">
      <div className="container-narrow">
        {/* Breadcrumb */}
        <nav className="mb-8">
          <ol className="flex items-center gap-2 text-sm text-muted">
            <li>
              <Link href="/" className="hover:text-accent transition-colors">
                Home
              </Link>
            </li>
            <li>/</li>
            <li>
              <Link href="/workflows" className="hover:text-accent transition-colors">
                Workflows
              </Link>
            </li>
            <li>/</li>
            <li className="text-foreground">{workflow.name}</li>
          </ol>
        </nav>

        {/* Workflow Card (Full Variant) */}
        <WorkflowCard workflow={workflow} variant="full" />

        {/* Back Link */}
        <div className="mt-8 text-center">
          <Link
            href="/workflows"
            className="inline-flex items-center gap-2 text-muted hover:text-accent transition-colors"
          >
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
            View All Workflows
          </Link>
        </div>
      </div>
    </main>
  )
}
