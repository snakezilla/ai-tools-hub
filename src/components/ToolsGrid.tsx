import { getToolBySlug, getToolsByTier } from "@/lib/tools"
import { ToolCard } from "./ToolCard"
import { StackedToolCard } from "./StackedToolCard"

export function ToolsGrid() {
  // Get tools for stacked cards
  const claude = getToolBySlug("claude")
  const claudeCowork = getToolBySlug("claude-cowork")
  const claudeCode = getToolBySlug("claude-code")
  const claudeSkills = getToolBySlug("claude-skills")
  const manusAi = getToolBySlug("manus-ai")

  // Get tier 2 tools (Power Tools)
  const tier2Tools = getToolsByTier(2)

  return (
    <section id="tools" className="py-20 px-4 bg-background">
      <div className="max-w-content mx-auto">
        {/* Section 1: Start Here */}
        <div className="mb-16">
          <div className="text-center mb-8">
            <div className="inline-flex items-center gap-2 px-4 py-1.5 bg-accent/10 rounded-full mb-4">
              <span className="w-2 h-2 bg-accent rounded-full animate-pulse"></span>
              <span className="text-accent font-semibold text-sm uppercase tracking-wide">Start Here</span>
            </div>
            <h2 className="text-heading-md text-foreground mb-4">
              Essential Tools
            </h2>
            <p className="text-body text-muted max-w-2xl mx-auto">
              Master these three first. They form the foundation for everything else.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {/* Stacked Card: Claude + Claude Cowork */}
            {claude && claudeCowork && (
              <StackedToolCard parentTool={claude} childTool={claudeCowork} />
            )}

            {/* Stacked Card: Claude Code + Claude Skills */}
            {claudeCode && claudeSkills && (
              <StackedToolCard parentTool={claudeCode} childTool={claudeSkills} />
            )}

            {/* Manus AI */}
            {manusAi && (
              <ToolCard tool={manusAi} />
            )}
          </div>
        </div>

        {/* Section 2: Power Tools */}
        <div>
          <div className="text-center mb-8">
            <h2 className="text-heading-sm text-foreground mb-3">
              Power Tools
            </h2>
            <p className="text-body-sm text-muted max-w-xl mx-auto">
              Add these once you&apos;ve mastered the essentials above.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {tier2Tools.map((tool) => (
              <ToolCard key={tool.slug} tool={tool} />
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
