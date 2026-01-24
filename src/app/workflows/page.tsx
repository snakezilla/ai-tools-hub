import Link from "next/link"
import { getAllWorkflows } from "@/lib/workflows"
import { WorkflowCard } from "@/components/WorkflowCard"

export const metadata = {
  title: "AI Workflows | AI Tools Hub",
  description: "Power combos that multiply your productivity. Combine multiple AI tools for exponential results.",
}

export default function WorkflowsPage() {
  const workflows = getAllWorkflows()

  return (
    <main className="min-h-screen py-16 md:py-24">
      <div className="container-content">
        {/* Header */}
        <div className="text-center mb-12 md:mb-16">
          <Link
            href="/"
            className="inline-flex items-center gap-2 text-muted hover:text-accent transition-colors mb-6"
          >
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
            Back to Tools
          </Link>
          <h1 className="text-heading-lg md:text-heading-xl text-foreground mb-4">
            AI Workflows
          </h1>
          <p className="text-body-lg text-muted max-w-2xl mx-auto">
            Power combos that multiply your productivity.
            Combine multiple AI tools for exponential results.
          </p>
        </div>

        {/* Workflows Grid */}
        <div className="grid md:grid-cols-2 gap-6 md:gap-8 max-w-4xl mx-auto">
          {workflows.map((workflow) => (
            <WorkflowCard key={workflow.slug} workflow={workflow} />
          ))}
        </div>

        {/* Skills Callout for Claude Code Users */}
        <div className="mt-12 max-w-2xl mx-auto p-6 bg-gradient-to-r from-blue-50 to-purple-50 rounded-card border border-blue-200">
          <div className="flex items-start gap-4">
            <div className="w-10 h-10 rounded-lg bg-blue-100 flex items-center justify-center flex-shrink-0">
              <svg className="w-5 h-5 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
              </svg>
            </div>
            <div>
              <h3 className="font-semibold text-foreground mb-1">Using Claude Code?</h3>
              <p className="text-body-sm text-muted mb-3">
                Supercharge it with Skills—pre-built commands for code review, testing, copywriting, and more.
                Check out the Skills section on the{" "}
                <Link href="/tools/claude-code" className="text-accent hover:underline">
                  Claude Code page
                </Link>.
              </p>
            </div>
          </div>
        </div>

        {/* CTA */}
        <div className="mt-16 text-center">
          <div className="inline-block p-8 bg-card rounded-card border border-border">
            <h2 className="text-heading-sm text-card-foreground mb-2">
              Want hands-on guidance?
            </h2>
            <p className="text-muted mb-4">
              Our workshops teach you to implement these workflows for your team.
            </p>
            <Link
              href="/workshops"
              className="inline-flex items-center gap-2 px-6 py-3 bg-accent text-accent-foreground rounded-lg font-medium hover:bg-accent/90 transition-colors"
            >
              Explore Workshops
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </Link>
          </div>
        </div>
      </div>
    </main>
  )
}
