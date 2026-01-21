import Link from "next/link"
import type { Tool } from "@/lib/tools"
import { DemoLoop } from "./DemoLoop"

interface ToolCardProps {
  tool: Tool
  variant?: "grid" | "full"
}

function PrivacyBadge({ level }: { level: Tool["privacy"] }) {
  const colors = {
    green: "bg-success/10 text-success",
    yellow: "bg-warning/10 text-warning",
    red: "bg-error/10 text-error",
  }

  const labels = {
    green: "Privacy-friendly",
    yellow: "Review settings",
    red: "Caution",
  }

  return (
    <span className={`px-2 py-0.5 rounded-full text-xs font-medium ${colors[level]}`}>
      {labels[level]}
    </span>
  )
}

export function ToolCard({ tool, variant = "grid" }: ToolCardProps) {
  if (variant === "grid") {
    return (
      <Link
        href={`/tools/${tool.slug}`}
        className="group block bg-card rounded-card border border-border p-6 shadow-card hover:shadow-card-hover transition-all duration-200 hover:-translate-y-0.5"
      >
        <div className="flex items-start justify-between mb-4">
          <div>
            <h3 className="text-heading-xs text-card-foreground group-hover:text-accent transition-colors">
              {tool.name}
            </h3>
            <p className="text-muted text-body-sm mt-1">{tool.tagline}</p>
          </div>
          <PrivacyBadge level={tool.privacy} />
        </div>

        <DemoLoop
          alt={`${tool.name} demo`}
          className="w-full h-40 object-cover mb-4"
        />

        <div className="grid grid-cols-2 gap-4 text-sm">
          <div className="flex items-center gap-2">
            <span className="text-muted">Setup:</span>
            <span className="font-medium text-card-foreground">{tool.setupTime}</span>
          </div>
          <div className="flex items-center gap-2">
            <span className="text-muted">Cost:</span>
            <span className="font-medium text-card-foreground">{tool.cost}</span>
          </div>
          <div className="col-span-2 flex items-center gap-2">
            <span className="text-accent">Time saved:</span>
            <span className="font-semibold text-accent">{tool.timeSaved}</span>
          </div>
        </div>
      </Link>
    )
  }

  // Full variant for tool detail pages
  return (
    <div className="bg-card rounded-card border border-border shadow-card overflow-hidden">
      {/* Header */}
      <div className="p-4 md:p-8 border-b border-border">
        <div className="flex items-start justify-between gap-3 mb-2">
          <h1 className="text-heading-md md:text-heading-lg text-card-foreground">{tool.name}</h1>
          <PrivacyBadge level={tool.privacy} />
        </div>
        <p className="text-body text-muted">{tool.tagline}</p>
      </div>

      {/* Stats Bar */}
      <div className="grid grid-cols-2 md:grid-cols-4 divide-x divide-border bg-background">
        <div className="p-3 md:p-4 text-center border-b md:border-b-0 border-border">
          <div className="text-muted text-xs md:text-sm mb-1">Setup</div>
          <div className="font-semibold text-card-foreground text-sm md:text-base">{tool.setupTime}</div>
        </div>
        <div className="p-3 md:p-4 text-center border-b md:border-b-0 border-border">
          <div className="text-muted text-xs md:text-sm mb-1">Cost</div>
          <div className="font-semibold text-card-foreground text-sm md:text-base">{tool.cost}</div>
        </div>
        <div className="p-3 md:p-4 text-center">
          <div className="text-muted text-xs md:text-sm mb-1">Privacy</div>
          <PrivacyBadge level={tool.privacy} />
        </div>
        <div className="p-3 md:p-4 text-center">
          <div className="text-muted text-xs md:text-sm mb-1">Time Saved</div>
          <div className="font-semibold text-accent text-sm md:text-base">{tool.timeSaved}</div>
        </div>
      </div>

      {/* Demo */}
      <div className="p-4 md:p-8 border-b border-border">
        <DemoLoop
          alt={`${tool.name} demo showing prompt to output`}
          className="w-full h-48 md:h-64 object-cover rounded-lg"
        />
      </div>

      {/* Use Cases */}
      <div className="p-4 md:p-8 border-b border-border">
        <h2 className="text-heading-sm text-card-foreground mb-4 md:mb-6">3 Use Cases</h2>
        <div className="space-y-4">
          {tool.useCases.map((useCase, index) => (
            <div
              key={index}
              className="flex items-start gap-4 p-4 bg-background rounded-lg"
            >
              <div className="w-8 h-8 rounded-full bg-accent/10 text-accent flex items-center justify-center font-semibold text-sm">
                {index + 1}
              </div>
              <div>
                <div className="font-medium text-card-foreground">
                  <span className="text-accent">{useCase.role}:</span> {useCase.task}
                </div>
                <div className="text-muted text-sm mt-1">→ {useCase.outcome}</div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Quickstart */}
      <div className="p-4 md:p-8 border-b border-border">
        <h2 className="text-heading-sm text-card-foreground mb-4 md:mb-6">Quickstart</h2>
        <ol className="space-y-3">
          {tool.quickstart.map((step, index) => (
            <li key={index} className="flex items-start gap-3">
              <span className="w-6 h-6 rounded-full bg-accent text-accent-foreground flex items-center justify-center text-sm font-medium flex-shrink-0">
                {index + 1}
              </span>
              <span className="text-card-foreground text-sm md:text-base">{step}</span>
            </li>
          ))}
        </ol>
      </div>

      {/* Pro Tips */}
      {tool.proTips && tool.proTips.length > 0 && (
        <div className="p-4 md:p-8 border-b border-border bg-accent/5">
          <h2 className="text-heading-sm text-card-foreground mb-4 md:mb-6 flex items-center gap-2">
            <svg className="w-5 h-5 text-accent" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
            </svg>
            Pro Tips
          </h2>
          <ul className="space-y-3">
            {tool.proTips.map((tip, index) => (
              <li key={index} className="flex items-start gap-3">
                <span className="text-accent font-bold text-lg leading-none mt-0.5">•</span>
                <span className="text-card-foreground text-sm md:text-base">{tip}</span>
              </li>
            ))}
          </ul>
        </div>
      )}

      {/* Privacy Flags */}
      <div className="p-4 md:p-8 border-b border-border bg-background">
        <h2 className="text-heading-sm text-card-foreground mb-4 flex items-center gap-2">
          <span>Privacy Flags</span>
        </h2>
        <div className="space-y-3">
          <div className="flex items-center justify-between py-2 border-b border-border">
            <span className="text-muted">Data retention</span>
            <span className="font-medium text-card-foreground">
              {tool.privacyFlags.dataRetention}
            </span>
          </div>
          <div className="flex items-center justify-between py-2 border-b border-border">
            <span className="text-muted">Training on your data</span>
            <span className="font-medium text-card-foreground">
              {tool.privacyFlags.trainingOnData}
            </span>
          </div>
          <div className="flex items-center justify-between py-2">
            <span className="text-muted">Enterprise option</span>
            <span className="font-medium text-card-foreground">
              {tool.privacyFlags.enterpriseOption}
            </span>
          </div>
        </div>
      </div>

      {/* Related Tools */}
      <div className="p-4 md:p-8">
        <h2 className="text-heading-sm text-card-foreground mb-4">Related Tools</h2>
        <div className="flex flex-col sm:flex-row sm:flex-wrap gap-3">
          {tool.relatedTools.map((related) => (
            <Link
              key={related.slug}
              href={`/tools/${related.slug}`}
              className="px-4 py-2 bg-background rounded-lg border border-border hover:border-accent hover:text-accent transition-colors text-sm md:text-base"
            >
              <span className="font-medium">{related.name}</span>
              <span className="text-muted text-sm ml-2">— {related.useCase}</span>
            </Link>
          ))}
        </div>
      </div>
    </div>
  )
}
