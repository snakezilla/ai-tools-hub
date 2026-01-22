import { getFoundationTools, getToolBySlug } from "@/lib/tools"
import { ToolCard } from "./ToolCard"
import { StackedToolCard } from "./StackedToolCard"

export function ToolsGrid() {
  const foundationTools = getFoundationTools()
  const claudeCode = getToolBySlug("claude-code")
  const claudeSkills = getToolBySlug("claude-skills")

  // Filter out Claude Code and Claude Skills from regular display
  // Claude Skills will be shown stacked under Claude Code
  const regularTools = foundationTools.filter(
    tool => tool.slug !== "claude-code" && tool.slug !== "claude-skills"
  )

  return (
    <section id="tools" className="py-20 px-4 bg-background">
      <div className="max-w-content mx-auto">
        <div className="text-center mb-12">
          <h2 className="text-heading-md text-foreground mb-4">
            Foundation Tools
          </h2>
          <p className="text-body text-muted max-w-2xl mx-auto">
            Master these essential tools first. Each one can transform how you work.
            Click any card to get started in 5 minutes.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {/* First tool - Claude (regular card) */}
          {regularTools.slice(0, 1).map((tool) => (
            <ToolCard key={tool.slug} tool={tool} />
          ))}

          {/* Stacked Card: Claude Code + Claude Skills */}
          {claudeCode && claudeSkills && (
            <StackedToolCard parentTool={claudeCode} childTool={claudeSkills} />
          )}

          {/* Remaining tools */}
          {regularTools.slice(1).map((tool) => (
            <ToolCard key={tool.slug} tool={tool} />
          ))}
        </div>
      </div>
    </section>
  )
}
