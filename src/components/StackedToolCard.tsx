import Link from "next/link"
import type { Tool } from "@/lib/tools"
import { DemoLoop } from "./DemoLoop"

interface StackedToolCardProps {
  parentTool: Tool
  childTool: Tool
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

export function StackedToolCard({ parentTool, childTool }: StackedToolCardProps) {
  return (
    <div className="relative">
      {/* Parent Card - Claude Code */}
      <Link
        href={`/tools/${parentTool.slug}`}
        className="group block bg-card rounded-t-card border border-border border-b-0 p-6 shadow-card hover:shadow-card-hover transition-all duration-200 hover:-translate-y-0.5"
      >
        <div className="flex items-start justify-between mb-4">
          <div>
            <h3 className="text-heading-xs text-card-foreground group-hover:text-accent transition-colors">
              {parentTool.name}
            </h3>
            <p className="text-muted text-body-sm mt-1">{parentTool.tagline}</p>
          </div>
          <PrivacyBadge level={parentTool.privacy} />
        </div>

        <DemoLoop
          alt={`${parentTool.name} demo`}
          className="w-full h-40 object-cover mb-4"
        />

        <div className="grid grid-cols-2 gap-4 text-sm">
          <div className="flex items-center gap-2">
            <span className="text-muted">Setup:</span>
            <span className="font-medium text-card-foreground">{parentTool.setupTime}</span>
          </div>
          <div className="flex items-center gap-2">
            <span className="text-muted">Cost:</span>
            <span className="font-medium text-card-foreground">{parentTool.cost}</span>
          </div>
          <div className="col-span-2 flex items-center gap-2">
            <span className="text-accent">Time saved:</span>
            <span className="font-semibold text-accent">{parentTool.timeSaved}</span>
          </div>
        </div>
      </Link>

      {/* Child Card - Claude Skills (Attached Extension) */}
      <Link
        href={`/tools/${childTool.slug}`}
        className="group block bg-gradient-to-b from-accent/5 to-card rounded-b-card border border-border border-t-0 p-4 shadow-card hover:shadow-card-hover transition-all duration-200"
      >
        <div className="flex items-center gap-3">
          {/* Extension Icon */}
          <div className="w-10 h-10 rounded-lg bg-accent/10 flex items-center justify-center flex-shrink-0">
            <svg className="w-5 h-5 text-accent" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 4a2 2 0 114 0v1a1 1 0 001 1h3a1 1 0 011 1v3a1 1 0 01-1 1h-1a2 2 0 100 4h1a1 1 0 011 1v3a1 1 0 01-1 1h-3a1 1 0 01-1-1v-1a2 2 0 10-4 0v1a1 1 0 01-1 1H7a1 1 0 01-1-1v-3a1 1 0 00-1-1H4a2 2 0 110-4h1a1 1 0 001-1V7a1 1 0 011-1h3a1 1 0 001-1V4z" />
            </svg>
          </div>

          <div className="flex-1 min-w-0">
            <div className="flex items-center gap-2">
              <h4 className="text-sm font-semibold text-card-foreground group-hover:text-accent transition-colors">
                {childTool.name}
              </h4>
              <span className="text-xs text-accent font-medium bg-accent/10 px-2 py-0.5 rounded-full">
                Extension
              </span>
            </div>
            <p className="text-xs text-muted mt-0.5 truncate">{childTool.tagline}</p>
          </div>

          {/* Arrow */}
          <svg className="w-4 h-4 text-muted group-hover:text-accent transition-colors flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
          </svg>
        </div>

        {/* Quick Stats Row */}
        <div className="flex items-center gap-4 mt-3 pt-3 border-t border-border/50 text-xs">
          <div className="flex items-center gap-1">
            <span className="text-muted">Setup:</span>
            <span className="font-medium text-card-foreground">{childTool.setupTime}</span>
          </div>
          <div className="flex items-center gap-1">
            <span className="text-muted">Cost:</span>
            <span className="font-medium text-card-foreground">{childTool.cost}</span>
          </div>
          <div className="flex items-center gap-1 ml-auto">
            <span className="text-accent">+{childTool.timeSaved}</span>
          </div>
        </div>
      </Link>
    </div>
  )
}
