'use client'

import { useState } from 'react'
import Link from 'next/link'

export interface GuideSection {
  title: string
  description?: string
  steps?: {
    action: string
    detail?: string
    note?: string
  }[]
  bullets?: string[]
  proTip?: string
  warning?: string
}

export interface StructuredGuide {
  slug: string
  title: string
  subtitle: string
  description: string
  readTime: number
  difficulty: 'beginner' | 'intermediate' | 'advanced'
  // Value-first content
  whyThisMatters: string
  whatYoullGet: string[]
  timeToValue: string
  // Structured sections
  sections: GuideSection[]
  // Optional extras
  toolSlugs?: string[]
  tags?: string[]
  nextGuide?: { slug: string; title: string }
}

interface GuideContentProps {
  guide: StructuredGuide
}

export function GuideContent({ guide }: GuideContentProps) {
  const [expandedSections, setExpandedSections] = useState<Set<number>>(new Set([0]))

  const toggleSection = (index: number) => {
    const newExpanded = new Set(expandedSections)
    if (newExpanded.has(index)) {
      newExpanded.delete(index)
    } else {
      newExpanded.add(index)
    }
    setExpandedSections(newExpanded)
  }

  const expandAll = () => {
    setExpandedSections(new Set(guide.sections.map((_, i) => i)))
  }

  const collapseAll = () => {
    setExpandedSections(new Set())
  }

  return (
    <div className="max-w-narrow mx-auto">
      {/* Value Proposition Box */}
      <div className="bg-gradient-to-br from-accent/5 to-accent/10 border border-accent/20 rounded-card p-6 md:p-8 mb-10">
        <p className="text-xs uppercase tracking-wider text-accent font-semibold mb-2">
          Why This Matters
        </p>
        <p className="text-body-lg text-foreground font-medium mb-4">
          {guide.whyThisMatters}
        </p>
        <div className="flex items-center gap-2 text-sm text-muted">
          <svg className="w-4 h-4 text-accent" fill="currentColor" viewBox="0 0 20 20">
            <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-12a1 1 0 10-2 0v4a1 1 0 00.293.707l2.828 2.829a1 1 0 101.415-1.415L11 9.586V6z" clipRule="evenodd" />
          </svg>
          <span>{guide.timeToValue}</span>
        </div>
      </div>

      {/* What You'll Get */}
      <div className="mb-10">
        <h2 className="text-heading-sm text-foreground mb-4">What You&apos;ll Walk Away With</h2>
        <ul className="space-y-3">
          {guide.whatYoullGet.map((item, idx) => (
            <li key={idx} className="flex items-start gap-3">
              <svg className="w-5 h-5 text-success flex-shrink-0 mt-0.5" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
              </svg>
              <span className="text-body text-foreground">{item}</span>
            </li>
          ))}
        </ul>
      </div>

      {/* Section Controls */}
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-heading-sm text-foreground">Step-by-Step Guide</h2>
        <div className="flex gap-2 text-sm">
          <button
            onClick={expandAll}
            className="text-accent hover:text-accent-dark transition"
          >
            Expand all
          </button>
          <span className="text-muted">|</span>
          <button
            onClick={collapseAll}
            className="text-accent hover:text-accent-dark transition"
          >
            Collapse all
          </button>
        </div>
      </div>

      {/* Sections */}
      <div className="space-y-4 mb-12">
        {guide.sections.map((section, idx) => (
          <div
            key={idx}
            className="border border-border rounded-card overflow-hidden bg-card"
          >
            <button
              onClick={() => toggleSection(idx)}
              className="w-full flex items-center justify-between p-5 text-left hover:bg-card-hover transition"
            >
              <div className="flex items-center gap-4">
                <span className="flex items-center justify-center w-8 h-8 rounded-full bg-accent/10 text-accent font-semibold text-sm">
                  {idx + 1}
                </span>
                <span className="text-lg font-semibold text-foreground">
                  {section.title}
                </span>
              </div>
              <svg
                className={`w-5 h-5 text-muted transition-transform ${
                  expandedSections.has(idx) ? 'rotate-180' : ''
                }`}
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
              </svg>
            </button>

            {expandedSections.has(idx) && (
              <div className="px-5 pb-5 pt-0">
                <div className="pl-12">
                  {section.description && (
                    <p className="text-body text-muted mb-4">{section.description}</p>
                  )}

                  {/* Steps */}
                  {section.steps && section.steps.length > 0 && (
                    <ol className="space-y-4 mb-4">
                      {section.steps.map((step, stepIdx) => (
                        <li key={stepIdx} className="flex gap-3">
                          <span className="flex-shrink-0 w-6 h-6 rounded-full bg-gray-100 text-gray-600 text-sm font-medium flex items-center justify-center">
                            {stepIdx + 1}
                          </span>
                          <div className="flex-1">
                            <p className="text-body text-foreground font-medium">
                              {step.action}
                            </p>
                            {step.detail && (
                              <p className="text-body-sm text-muted mt-1">{step.detail}</p>
                            )}
                            {step.note && (
                              <p className="text-body-sm text-accent mt-1 italic">{step.note}</p>
                            )}
                          </div>
                        </li>
                      ))}
                    </ol>
                  )}

                  {/* Bullets */}
                  {section.bullets && section.bullets.length > 0 && (
                    <ul className="space-y-2 mb-4">
                      {section.bullets.map((bullet, bulletIdx) => (
                        <li key={bulletIdx} className="flex items-start gap-2">
                          <span className="text-accent mt-1">•</span>
                          <span className="text-body text-foreground">{bullet}</span>
                        </li>
                      ))}
                    </ul>
                  )}

                  {/* Warning */}
                  {section.warning && (
                    <div className="bg-warning/10 border border-warning/30 rounded-lg p-4 mb-4">
                      <div className="flex items-start gap-3">
                        <svg className="w-5 h-5 text-warning flex-shrink-0 mt-0.5" fill="currentColor" viewBox="0 0 20 20">
                          <path fillRule="evenodd" d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                        </svg>
                        <p className="text-body-sm text-foreground">{section.warning}</p>
                      </div>
                    </div>
                  )}

                  {/* Pro Tip */}
                  {section.proTip && (
                    <div className="bg-accent/5 border border-accent/20 rounded-lg p-4">
                      <div className="flex items-start gap-3">
                        <span className="text-accent font-bold text-sm">TIP</span>
                        <p className="text-body-sm text-foreground">{section.proTip}</p>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            )}
          </div>
        ))}
      </div>

      {/* Next Guide CTA */}
      {guide.nextGuide && (
        <div className="bg-gray-50 border border-border rounded-card p-6 text-center">
          <p className="text-sm text-muted mb-2">Ready for more?</p>
          <Link
            href={`/guides/${guide.nextGuide.slug}`}
            className="text-lg font-semibold text-accent hover:text-accent-dark transition"
          >
            {guide.nextGuide.title} →
          </Link>
        </div>
      )}

      {/* Related Tools */}
      {guide.toolSlugs && guide.toolSlugs.length > 0 && (
        <div className="mt-12 pt-8 border-t border-border">
          <h3 className="text-heading-xs text-foreground mb-4">Tools Covered in This Guide</h3>
          <div className="flex flex-wrap gap-3">
            {guide.toolSlugs.map((slug) => (
              <Link
                key={slug}
                href={`/tools/${slug}`}
                className="px-4 py-2 bg-card border border-border rounded-lg text-body-sm text-foreground hover:border-accent hover:text-accent transition"
              >
                {slug.split('-').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ')}
              </Link>
            ))}
          </div>
        </div>
      )}
    </div>
  )
}
