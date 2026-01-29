"use client"

import Link from "next/link"

export function Hero() {
  return (
    <section className="relative overflow-hidden pt-16 pb-20 md:pt-24 md:pb-32">
      {/* Subtle background gradient */}
      <div className="absolute inset-0 bg-gradient-to-b from-accent-muted/30 via-transparent to-transparent pointer-events-none" />
      
      <div className="container-hero relative">
        {/* Main headline */}
        <div className="text-center animate-fade-in-up">
          <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-heading-2xl font-semibold text-foreground mb-6 md:mb-8 tracking-tight">
            If you can send an email,
            <br className="hidden sm:block" />
            <span className="text-accent"> you can use AI.</span>
          </h1>
          
          <p className="text-body-lg md:text-body-xl text-muted max-w-2xl mx-auto mb-10 md:mb-12 animate-fade-in-up-delay">
            Learn how to build software, automate your business, and save 10+ hours a week—
            <span className="text-foreground font-medium">no coding experience required.</span>
          </p>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-12 md:mb-16 animate-fade-in-up stagger-2">
            <Link
              href="/guides"
              className="btn-primary-lg w-full sm:w-auto min-w-[200px]"
            >
              Start Learning Free
              <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
              </svg>
            </Link>
            <Link
              href="#how-it-works"
              className="btn-secondary w-full sm:w-auto min-w-[200px]"
            >
              See How It Works
            </Link>
          </div>

          {/* Trust Bar */}
          <div className="trust-bar animate-fade-in-up stagger-3">
            <div className="trust-item">
              <svg className="w-5 h-5 text-success" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
              </svg>
              <span>100% Free</span>
            </div>
            <span className="hidden sm:inline text-border">•</span>
            <div className="trust-item">
              <svg className="w-5 h-5 text-success" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
              </svg>
              <span>No signup required</span>
            </div>
            <span className="hidden sm:inline text-border">•</span>
            <div className="trust-item">
              <svg className="w-5 h-5 text-success" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
              </svg>
              <span>Privacy-focused</span>
            </div>
          </div>
        </div>

        {/* Encouraging statement */}
        <div className="mt-16 md:mt-24 text-center">
          <div className="inline-block">
            <div className="bg-section-warm border border-warning/20 rounded-card-lg px-6 py-4 md:px-8 md:py-5 max-w-xl mx-auto">
              <p className="text-body md:text-body-lg text-foreground font-medium">
                ✨ If you can use Claude Code, you can <span className="text-accent">change the way you do business.</span>
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
