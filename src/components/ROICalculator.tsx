"use client"

import { useState } from "react"
import Link from "next/link"

interface CalculatorResult {
  weeklyHours: number
  monthlyHours: number
  yearlyHours: number
  yearlySavings: number
  recommendedTools: string[]
}

const TASKS = [
  { id: "writing", label: "Content writing & editing", hoursPerWeek: 3 },
  { id: "research", label: "Research & information gathering", hoursPerWeek: 2.5 },
  { id: "data", label: "Data analysis & reporting", hoursPerWeek: 2 },
  { id: "email", label: "Email drafting & management", hoursPerWeek: 2 },
  { id: "presentations", label: "Creating presentations", hoursPerWeek: 1.5 },
  { id: "scheduling", label: "Scheduling & coordination", hoursPerWeek: 1 },
  { id: "coding", label: "Coding or technical work", hoursPerWeek: 4 },
  { id: "automation", label: "Repetitive manual tasks", hoursPerWeek: 3 },
]

const TOOL_RECOMMENDATIONS: Record<string, string[]> = {
  writing: ["claude", "chatgpt"],
  research: ["perplexity", "claude"],
  data: ["chatgpt"],
  email: ["claude", "chatgpt"],
  presentations: ["manus-ai"],
  scheduling: ["zapier"],
  coding: ["claude-code"],
  automation: ["zapier"],
}

export function ROICalculator() {
  const [teamSize, setTeamSize] = useState(1)
  const [selectedTasks, setSelectedTasks] = useState<string[]>([])
  const [hourlyRate, setHourlyRate] = useState(50)
  const [result, setResult] = useState<CalculatorResult | null>(null)

  const handleTaskToggle = (taskId: string) => {
    setSelectedTasks((prev) =>
      prev.includes(taskId)
        ? prev.filter((id) => id !== taskId)
        : [...prev, taskId]
    )
  }

  const calculateSavings = () => {
    // Calculate weekly hours saved (assuming 50% time reduction)
    const weeklyHours = selectedTasks.reduce((total, taskId) => {
      const task = TASKS.find((t) => t.id === taskId)
      return total + (task?.hoursPerWeek || 0) * 0.5 * teamSize
    }, 0)

    // Get unique recommended tools
    const toolSet = new Set<string>()
    selectedTasks.forEach((taskId) => {
      const tools = TOOL_RECOMMENDATIONS[taskId] || []
      tools.forEach((tool) => toolSet.add(tool))
    })

    setResult({
      weeklyHours: Math.round(weeklyHours * 10) / 10,
      monthlyHours: Math.round(weeklyHours * 4.33 * 10) / 10,
      yearlyHours: Math.round(weeklyHours * 52),
      yearlySavings: Math.round(weeklyHours * 52 * hourlyRate),
      recommendedTools: Array.from(toolSet).slice(0, 3),
    })
  }

  const formatToolName = (slug: string) => {
    const names: Record<string, string> = {
      claude: "Claude",
      "claude-code": "Claude Code",
      chatgpt: "ChatGPT",
      "manus-ai": "Manus AI",
      perplexity: "Perplexity",
      zapier: "Zapier",
    }
    return names[slug] || slug
  }

  return (
    <section id="calculator" className="section bg-card-DEFAULT">
      <div className="container-content">
        <div className="text-center mb-12">
          <h2 className="text-heading-md text-foreground mb-4">
            Calculate Your AI Savings
          </h2>
          <p className="text-body text-muted max-w-2xl mx-auto">
            See how much time and money you could save by adopting AI tools.
            Get personalized tool recommendations for your workflow.
          </p>
        </div>

        <div className="max-w-3xl mx-auto">
          <div className="card p-4 md:p-8">
            {/* Team Size */}
            <div className="mb-8">
              <label className="block text-sm font-medium text-foreground mb-2">
                Team Size
              </label>
              <input
                type="range"
                min="1"
                max="50"
                value={teamSize}
                onChange={(e) => setTeamSize(parseInt(e.target.value))}
                className="w-full h-2 bg-border rounded-lg appearance-none cursor-pointer accent-accent"
              />
              <div className="flex justify-between text-sm text-muted mt-1">
                <span>1 person</span>
                <span className="font-semibold text-foreground">{teamSize} {teamSize === 1 ? "person" : "people"}</span>
                <span>50 people</span>
              </div>
            </div>

            {/* Tasks */}
            <div className="mb-8">
              <label className="block text-sm font-medium text-foreground mb-4">
                What tasks take up most of your time? (Select all that apply)
              </label>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                {TASKS.map((task) => (
                  <button
                    key={task.id}
                    onClick={() => handleTaskToggle(task.id)}
                    className={`p-4 rounded-lg border text-left transition-all ${
                      selectedTasks.includes(task.id)
                        ? "border-accent bg-accent/5 text-foreground"
                        : "border-border bg-background text-muted hover:border-accent/50"
                    }`}
                  >
                    <span className="block font-medium">{task.label}</span>
                    <span className="text-sm opacity-75">
                      ~{task.hoursPerWeek} hrs/week typical
                    </span>
                  </button>
                ))}
              </div>
            </div>

            {/* Hourly Rate */}
            <div className="mb-8">
              <label className="block text-sm font-medium text-foreground mb-2">
                Average hourly rate (for ROI calculation)
              </label>
              <div className="flex items-center gap-4">
                <span className="text-muted">$</span>
                <input
                  type="number"
                  min="10"
                  max="500"
                  value={hourlyRate}
                  onChange={(e) => setHourlyRate(parseInt(e.target.value) || 50)}
                  className="w-24 px-4 py-2 border border-border rounded-lg bg-background text-foreground focus:border-accent focus:outline-none"
                />
                <span className="text-muted">/hour</span>
              </div>
            </div>

            {/* Calculate Button */}
            <button
              onClick={calculateSavings}
              disabled={selectedTasks.length === 0}
              className="w-full btn-primary py-4 text-lg disabled:opacity-50 disabled:cursor-not-allowed"
            >
              Calculate My Savings
            </button>
          </div>

          {/* Results */}
          {result && (
            <div className="card p-4 md:p-8 mt-6 md:mt-8 animate-fade-in">
              <h3 className="text-heading-sm text-foreground mb-6 text-center">
                Your Potential Savings
              </h3>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
                <div className="text-center p-4 bg-background rounded-lg">
                  <div className="text-3xl font-bold text-accent">
                    {result.weeklyHours}
                  </div>
                  <div className="text-sm text-muted">hours/week</div>
                </div>
                <div className="text-center p-4 bg-background rounded-lg">
                  <div className="text-3xl font-bold text-accent">
                    {result.yearlyHours}
                  </div>
                  <div className="text-sm text-muted">hours/year</div>
                </div>
                <div className="text-center p-4 bg-background rounded-lg">
                  <div className="text-3xl font-bold text-success">
                    ${result.yearlySavings.toLocaleString()}
                  </div>
                  <div className="text-sm text-muted">potential savings/year</div>
                </div>
              </div>

              {result.recommendedTools.length > 0 && (
                <div className="border-t border-border pt-6">
                  <h4 className="font-medium text-foreground mb-4">
                    Top tools for your workflow:
                  </h4>
                  <div className="flex flex-wrap gap-3">
                    {result.recommendedTools.map((slug) => (
                      <Link
                        key={slug}
                        href={`/tools/${slug}`}
                        className="px-4 py-2 bg-accent/10 text-accent rounded-lg hover:bg-accent/20 transition-colors font-medium"
                      >
                        {formatToolName(slug)} →
                      </Link>
                    ))}
                  </div>
                </div>
              )}

              <div className="mt-8 p-4 bg-accent/5 rounded-lg border border-accent/20 text-center">
                <p className="text-foreground mb-4">
                  Want hands-on help implementing these tools for your team?
                </p>
                <Link href="/workshops" className="btn-primary">
                  Book a Workshop
                </Link>
              </div>
            </div>
          )}
        </div>
      </div>
    </section>
  )
}
