import { getFoundationTools } from "@/lib/tools"
import { ToolCard } from "./ToolCard"

export function ToolsGrid() {
  const tools = getFoundationTools()

  return (
    <section id="tools" className="py-20 px-4 bg-background">
      <div className="max-w-content mx-auto">
        <div className="text-center mb-12">
          <h2 className="text-heading-md text-foreground mb-4">
            Foundation Tools
          </h2>
          <p className="text-body text-muted max-w-2xl mx-auto">
            Master these 7 tools first. Each one can transform how you work.
            Click any card to get started in 5 minutes.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {tools.map((tool) => (
            <ToolCard key={tool.slug} tool={tool} />
          ))}
        </div>
      </div>
    </section>
  )
}
