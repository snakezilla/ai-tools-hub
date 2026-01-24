#!/usr/bin/env node

/**
 * Migration utility: Extract detailed quickstart and pro tips from tools.ts
 * and generate guide content templates for guides.ts
 *
 * Usage: npx ts-node scripts/migrate-tool-content-to-guides.ts
 *
 * Output: Prints guide templates to stdout for manual review and copy-paste
 */

import { tools } from '../src/lib/tools'

interface GuideTemplate {
  slug: string
  toolName: string
  fullQuickstart: string[]
  proTips: string[]
}

function generateGuideTemplate(toolSlug: string): GuideTemplate | null {
  const tool = tools.find((t) => t.slug === toolSlug)
  if (!tool) return null

  // Extract full quickstart steps (more than 3)
  const fullQuickstart = tool.quickstart.map((step) => {
    if (typeof step === 'string') return step
    return step.text
  })

  // Extract pro tips
  const proTips = tool.proTips || []

  return {
    slug: toolSlug,
    toolName: tool.name,
    fullQuickstart,
    proTips,
  }
}

function formatGuideContent(template: GuideTemplate): string {
  return `
## ${template.toolName} Complete Guide

**Status:** Guide template generated from tool data. Customize content below before adding to guides.ts

### Quick Overview
- Tool: ${template.toolName}
- Purpose: [Add comprehensive overview here]
- Time to master: [Estimate based on readTime]

### Detailed Quickstart

${template.fullQuickstart
  .map(
    (step, i) => `**Step ${i + 1}:** ${step}`
  )
  .join('\n\n')}

### Pro Tips & Best Practices

${template.proTips.length > 0
  ? template.proTips
      .map((tip) => `- ${tip}`)
      .join('\n')
  : '- [Add custom pro tips here - these were not defined in tool data]'}

### Troubleshooting

[Add common issues and solutions here]

### Workflows & Advanced Use Cases

[Add real-world workflows using this tool]

### Related Tools

[List related tools that work well together]

---
`
}

function main() {
  console.log('='.repeat(70))
  console.log('GUIDE MIGRATION UTILITY')
  console.log('='.repeat(70))
  console.log('\nExtracting detailed content from tools...\n')

  const toolsWithDetailedContent = tools.filter(
    (tool) => tool.quickstart.length > 3 || (tool.proTips && tool.proTips.length > 0)
  )

  console.log(
    `Found ${toolsWithDetailedContent.length} tools with detailed content (quickstart > 3 steps or pro tips)\n`
  )

  const templates: GuideTemplate[] = []

  for (const tool of toolsWithDetailedContent) {
    const template = generateGuideTemplate(tool.slug)
    if (template) {
      templates.push(template)
    }
  }

  // Output templates
  templates.forEach((template, index) => {
    console.log(`\n${'─'.repeat(70)}`)
    console.log(`TEMPLATE ${index + 1}/${templates.length}: ${template.toolName}`)
    console.log(`Slug for guides.ts: "${template.slug}-complete-guide"`)
    console.log(`${' ─'.repeat(35)}`)
    console.log(formatGuideContent(template))
  })

  console.log('\n' + '='.repeat(70))
  console.log('SUMMARY')
  console.log('='.repeat(70))
  console.log(`✓ Generated ${templates.length} guide templates`)
  console.log('\nNext steps:')
  console.log('1. Review templates above')
  console.log('2. Customize content sections (marked with [brackets])')
  console.log('3. Add HTML content to guides.ts with appropriate slug')
  console.log('4. Update tool.fullGuideSlug to match new guide slug')
  console.log('\nTools that need guides:')

  tools
    .filter(
      (tool) => !tool.fullGuideSlug && (tool.quickstart.length > 3 || tool.proTips)
    )
    .forEach((tool) => {
      console.log(`  - ${tool.name} (${tool.slug})`)
    })
}

main()
