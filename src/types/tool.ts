export type PrivacyLevel = "safe" | "caution" | "warning"

export interface PrivacyFlags {
  dataRetention: "yes" | "no" | "configurable"
  trainingOnData: "yes" | "no" | "opt-out"
  enterpriseOption: boolean
}

export interface UseCase {
  role: string
  task: string
  outcome: string
}

export interface QuickstartStep {
  action: string
  detail?: string
}

export interface RelatedTool {
  slug: string
  name: string
  useCase: string
}

export interface Tool {
  slug: string
  name: string
  tagline: string
  company: string

  // Metrics (Hormozi value equation)
  setupMinutes: number
  cost: string
  privacyLevel: PrivacyLevel
  timeSavedPerWeek: string

  // Demo
  demoVideo?: string

  // Content
  useCases: UseCase[]
  quickstart: QuickstartStep[]
  privacyFlags: PrivacyFlags

  // Navigation
  relatedTools: RelatedTool[]
  category: string[]
}

// Foundation tools list (the Big 7)
export const FOUNDATION_TOOLS = [
  "claude",
  "claude-code",
  "chatgpt",
  "manus",
  "copilot",
  "zapier",
  "perplexity",
] as const

export type FoundationToolSlug = typeof FOUNDATION_TOOLS[number]
