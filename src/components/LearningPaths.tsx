"use client"

import Link from "next/link"
import { useScrollAnimation, useStaggerAnimation } from "@/hooks/useScrollAnimation"

export function LearningPaths() {
  const [headerRef, headerVisible] = useScrollAnimation()
  const { containerRef, visibleItems } = useStaggerAnimation(2)
  
  return (
    <section className="section">
      <div className="container-content">
        <div 
          ref={headerRef}
          className={`text-center mb-12 md:mb-16 ${headerVisible ? 'scroll-visible' : 'scroll-hidden'}`}
        >
          <span className="badge-primary mb-4">Choose Your Path</span>
          <h2 className="text-heading-md md:text-heading-lg text-foreground mb-4">
            Start with the essentials, then level up
          </h2>
          <p className="text-body-lg text-muted max-w-2xl mx-auto">
            Whether you have 5 minutes or an afternoon, there&apos;s a path that fits your schedule.
          </p>
        </div>

        <div ref={containerRef} className="grid grid-cols-1 lg:grid-cols-2 gap-6 md:gap-8">
          {/* Essential Tools */}
          <Link 
            href="/guides?filter=essential" 
            className={`path-card-featured group ${visibleItems[0] ? 'scroll-visible-scale' : 'scroll-hidden-scale'} stagger-delay-0`}
          >
            <div className="flex items-start justify-between mb-6">
              <div>
                <span className="badge-success mb-3">Recommended Start</span>
                <h3 className="text-heading-sm md:text-heading-md text-foreground group-hover:text-accent transition-colors">
                  Essential Tools
                </h3>
              </div>
              <div className="w-12 h-12 rounded-2xl bg-accent/10 flex items-center justify-center shrink-0">
                <svg className="w-6 h-6 text-accent" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                </svg>
              </div>
            </div>
            
            <p className="text-body text-muted mb-6">
              The foundation for everything. Master these three tools first—they&apos;ll cover 80% of what most people need.
            </p>

            <div className="space-y-3 mb-6">
              <div className="flex items-center gap-3 text-body-sm">
                <span className="w-8 h-8 rounded-lg bg-white border border-border flex items-center justify-center text-lg">💬</span>
                <span className="text-foreground font-medium">Claude</span>
                <span className="text-muted">— Your AI thinking partner</span>
              </div>
              <div className="flex items-center gap-3 text-body-sm">
                <span className="w-8 h-8 rounded-lg bg-white border border-border flex items-center justify-center text-lg">⌨️</span>
                <span className="text-foreground font-medium">Claude Code</span>
                <span className="text-muted">— Build software with English</span>
              </div>
              <div className="flex items-center gap-3 text-body-sm">
                <span className="w-8 h-8 rounded-lg bg-white border border-border flex items-center justify-center text-lg">🤖</span>
                <span className="text-foreground font-medium">Manus AI</span>
                <span className="text-muted">— Your autonomous assistant</span>
              </div>
            </div>

            <div className="flex items-center text-accent font-semibold gap-2 transition-all">
              Start with Essentials
              <svg className="w-5 h-5 arrow-slide" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
              </svg>
            </div>
          </Link>

          {/* Power Tools */}
          <Link 
            href="/guides?filter=power" 
            className={`path-card group ${visibleItems[1] ? 'scroll-visible-scale' : 'scroll-hidden-scale'} stagger-delay-1`}
          >
            <div className="flex items-start justify-between mb-6">
              <div>
                <span className="badge-muted mb-3">Level Up</span>
                <h3 className="text-heading-sm md:text-heading-md text-foreground group-hover:text-accent transition-colors">
                  Power Tools
                </h3>
              </div>
              <div className="w-12 h-12 rounded-2xl bg-border-light flex items-center justify-center shrink-0">
                <svg className="w-6 h-6 text-muted" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19.428 15.428a2 2 0 00-1.022-.547l-2.387-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.806.547M8 4h8l-1 1v5.172a2 2 0 00.586 1.414l5 5c1.26 1.26.367 3.414-1.415 3.414H4.828c-1.782 0-2.674-2.154-1.414-3.414l5-5A2 2 0 009 10.172V5L8 4z" />
                </svg>
              </div>
            </div>
            
            <p className="text-body text-muted mb-6">
              Once you&apos;ve got the basics, these tools will supercharge your workflow and unlock new possibilities.
            </p>

            <div className="space-y-3 mb-6">
              <div className="flex items-center gap-3 text-body-sm">
                <span className="w-8 h-8 rounded-lg bg-white border border-border flex items-center justify-center text-lg">⚡</span>
                <span className="text-foreground font-medium">Zapier</span>
                <span className="text-muted">— Connect your apps</span>
              </div>
              <div className="flex items-center gap-3 text-body-sm">
                <span className="w-8 h-8 rounded-lg bg-white border border-border flex items-center justify-center text-lg">🔍</span>
                <span className="text-foreground font-medium">Perplexity</span>
                <span className="text-muted">— AI-powered research</span>
              </div>
              <div className="flex items-center gap-3 text-body-sm">
                <span className="w-8 h-8 rounded-lg bg-white border border-border flex items-center justify-center text-lg">📊</span>
                <span className="text-foreground font-medium">Notion AI</span>
                <span className="text-muted">— Smart documentation</span>
              </div>
            </div>

            <div className="flex items-center text-accent font-semibold gap-2 transition-all">
              Explore Power Tools
              <svg className="w-5 h-5 arrow-slide" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
              </svg>
            </div>
          </Link>
        </div>
      </div>
    </section>
  )
}
