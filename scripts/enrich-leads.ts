/**
 * Lead Enrichment Script
 *
 * Takes a CSV of leads with company websites, scrapes each site,
 * uses Claude to generate a personalized opening line, and outputs
 * an enriched CSV ready for Instantly.ai import.
 *
 * Usage:
 *   npx ts-node scripts/enrich-leads.ts input.csv output.csv
 *
 * Input CSV format:
 *   firstName,email,company,website
 *   John,john@acme.com,Acme Marketing,https://acmemarketing.com
 *
 * Output CSV adds:
 *   personalized_line - AI-generated opener based on their website
 */

import Anthropic from '@anthropic-ai/sdk'
import * as fs from 'fs'
import * as path from 'path'

// Initialize Anthropic client
const anthropic = new Anthropic({
  apiKey: process.env.ANTHROPIC_API_KEY,
})

interface Lead {
  firstName: string
  email: string
  company: string
  website: string
  personalized_line?: string
}

/**
 * Fetch and extract text content from a website
 */
async function scrapeWebsite(url: string): Promise<string> {
  try {
    const response = await fetch(url, {
      headers: {
        'User-Agent': 'Mozilla/5.0 (compatible; LeadEnrichment/1.0)',
      },
      signal: AbortSignal.timeout(10000), // 10 second timeout
    })

    if (!response.ok) {
      throw new Error(`HTTP ${response.status}`)
    }

    const html = await response.text()

    // Extract text content (simple approach - strip HTML tags)
    const text = html
      .replace(/<script[^>]*>[\s\S]*?<\/script>/gi, '')
      .replace(/<style[^>]*>[\s\S]*?<\/style>/gi, '')
      .replace(/<[^>]+>/g, ' ')
      .replace(/\s+/g, ' ')
      .trim()
      .slice(0, 5000) // Limit to first 5000 chars

    return text
  } catch (error) {
    console.error(`Failed to scrape ${url}:`, error)
    return ''
  }
}

/**
 * Use Claude to generate a personalized opening line
 */
async function generatePersonalizedLine(
  company: string,
  websiteContent: string
): Promise<string> {
  if (!websiteContent) {
    return `I came across ${company} and was impressed by your work.`
  }

  try {
    const response = await anthropic.messages.create({
      model: 'claude-sonnet-4-20250514',
      max_tokens: 150,
      messages: [
        {
          role: 'user',
          content: `You are helping write a cold email opener. Based on this company's website content, write ONE short, specific, genuine compliment or observation (1-2 sentences max).

Company: ${company}

Website content:
${websiteContent}

Rules:
- Be specific (mention a project, client, service, or achievement you noticed)
- Sound human, not salesy
- Keep it under 25 words
- Don't use phrases like "I noticed" or "I saw that" - just state the observation
- If you can't find anything specific, comment on their industry focus or approach

Output ONLY the personalized line, nothing else.`,
        },
      ],
    })

    const textContent = response.content.find(c => c.type === 'text')
    return textContent?.text || `${company}'s approach to their market stood out to me.`
  } catch (error) {
    console.error(`Failed to generate line for ${company}:`, error)
    return `${company}'s work caught my attention.`
  }
}

/**
 * Parse CSV content into leads array
 */
function parseCSV(content: string): Lead[] {
  const lines = content.trim().split('\n')
  const headers = lines[0].split(',').map(h => h.trim().toLowerCase())

  return lines.slice(1).map(line => {
    const values = line.split(',').map(v => v.trim())
    const lead: Record<string, string> = {}

    headers.forEach((header, i) => {
      lead[header] = values[i] || ''
    })

    return {
      firstName: lead.firstname || lead.first_name || lead.name || '',
      email: lead.email || '',
      company: lead.company || lead.company_name || '',
      website: lead.website || lead.url || lead.company_website || '',
    }
  })
}

/**
 * Convert leads array to CSV string
 */
function toCSV(leads: Lead[]): string {
  const headers = ['firstName', 'email', 'company', 'website', 'personalized_line']
  const rows = leads.map(lead =>
    headers.map(h => {
      const value = lead[h as keyof Lead] || ''
      // Escape quotes and wrap in quotes if contains comma
      if (value.includes(',') || value.includes('"')) {
        return `"${value.replace(/"/g, '""')}"`
      }
      return value
    }).join(',')
  )

  return [headers.join(','), ...rows].join('\n')
}

/**
 * Main function
 */
async function main() {
  const args = process.argv.slice(2)

  if (args.length < 2) {
    console.log('Usage: npx ts-node scripts/enrich-leads.ts input.csv output.csv')
    console.log('')
    console.log('Input CSV should have columns: firstName, email, company, website')
    process.exit(1)
  }

  const inputFile = args[0]
  const outputFile = args[1]

  if (!process.env.ANTHROPIC_API_KEY) {
    console.error('Error: ANTHROPIC_API_KEY environment variable not set')
    process.exit(1)
  }

  // Read input CSV
  console.log(`Reading ${inputFile}...`)
  const content = fs.readFileSync(inputFile, 'utf-8')
  const leads = parseCSV(content)

  console.log(`Found ${leads.length} leads to enrich`)

  // Process each lead
  for (let i = 0; i < leads.length; i++) {
    const lead = leads[i]
    console.log(`[${i + 1}/${leads.length}] Processing ${lead.company}...`)

    // Scrape website
    const websiteContent = await scrapeWebsite(lead.website)

    // Generate personalized line
    lead.personalized_line = await generatePersonalizedLine(
      lead.company,
      websiteContent
    )

    console.log(`  → "${lead.personalized_line}"`)

    // Rate limit: wait 1 second between requests
    if (i < leads.length - 1) {
      await new Promise(resolve => setTimeout(resolve, 1000))
    }
  }

  // Write output CSV
  console.log(`\nWriting enriched leads to ${outputFile}...`)
  fs.writeFileSync(outputFile, toCSV(leads))

  console.log('Done!')
}

main().catch(console.error)
