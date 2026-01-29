"use client"

import { useScrollAnimation, useStaggerAnimation } from "@/hooks/useScrollAnimation"

export function ValueProps() {
  const [headerRef, headerVisible] = useScrollAnimation()
  const { containerRef, visibleItems } = useStaggerAnimation(3)
  
  const props = [
    {
      icon: (
        <svg className="w-7 h-7 text-accent" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
        </svg>
      ),
      title: "Free Guides",
      description: "Step-by-step tutorials written in plain English. No jargon, no assumptions about what you know.",
    },
    {
      icon: (
        <svg className="w-7 h-7 text-accent" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
        </svg>
      ),
      title: "No Coding Required",
      description: "You don't need to be technical. If you can type a sentence, you have all the skills you need.",
    },
    {
      icon: (
        <svg className="w-7 h-7 text-accent" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
        </svg>
      ),
      title: "Real Results",
      description: "Build actual tools for your business. Not theory—practical skills you can use tomorrow.",
    },
  ]

  return (
    <section id="how-it-works" className="section-sm bg-section-light">
      <div className="container-content">
        <div 
          ref={headerRef}
          className={`text-center mb-12 md:mb-16 ${headerVisible ? 'scroll-visible' : 'scroll-hidden'}`}
        >
          <h2 className="text-heading-sm md:text-heading-md text-foreground mb-4">
            Learning AI doesn&apos;t have to be hard
          </h2>
          <p className="text-body-lg text-muted max-w-xl mx-auto">
            We break down powerful tools into simple, actionable steps.
          </p>
        </div>

        <div ref={containerRef} className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8">
          {props.map((prop, index) => (
            <div
              key={index}
              className={`feature-card group ${visibleItems[index] ? 'scroll-visible-scale' : 'scroll-hidden-scale'} stagger-delay-${index}`}
            >
              <div className="feature-icon icon-bounce">
                {prop.icon}
              </div>
              <h3 className="text-heading-xs text-foreground mb-3">
                {prop.title}
              </h3>
              <p className="text-body text-muted leading-relaxed">
                {prop.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
