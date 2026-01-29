"use client"

import { useScrollAnimation, useStaggerAnimation } from "@/hooks/useScrollAnimation"

export function Testimonials() {
  const [headerRef, headerVisible] = useScrollAnimation()
  const { containerRef, visibleItems } = useStaggerAnimation(3)
  
  const testimonials = [
    {
      quote: "I thought AI was for developers. Turns out I just needed someone to show me where to click. Now I'm automating half my workweek.",
      name: "Sarah M.",
      role: "Marketing Director",
      initial: "S",
    },
    {
      quote: "Built my first internal tool in an afternoon. My team thought I hired a developer. I just followed the Claude Code guide.",
      name: "Michael R.",
      role: "Operations Manager",
      initial: "M",
    },
    {
      quote: "The 'no coding required' thing sounded too good to be true. It wasn't. I'm now the 'tech person' at my company.",
      name: "Jennifer L.",
      role: "Small Business Owner",
      initial: "J",
    },
  ]

  return (
    <section className="section bg-section-light">
      <div className="container-content">
        <div 
          ref={headerRef}
          className={`text-center mb-12 md:mb-16 ${headerVisible ? 'scroll-visible' : 'scroll-hidden'}`}
        >
          <h2 className="text-heading-md md:text-heading-lg text-foreground mb-4">
            Real people, real results
          </h2>
          <p className="text-body-lg text-muted max-w-xl mx-auto">
            Join thousands of non-technical professionals who are now building with AI.
          </p>
        </div>

        <div ref={containerRef} className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8">
          {testimonials.map((testimonial, index) => (
            <div
              key={index}
              className={`testimonial-card flex flex-col ${visibleItems[index] ? 'scroll-visible-scale' : 'scroll-hidden-scale'} stagger-delay-${index}`}
            >
              {/* Quote */}
              <div className="flex-1 mb-6">
                <svg className="w-8 h-8 text-accent/20 mb-4" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M14.017 21v-7.391c0-5.704 3.731-9.57 8.983-10.609l.995 2.151c-2.432.917-3.995 3.638-3.995 5.849h4v10h-9.983zm-14.017 0v-7.391c0-5.704 3.748-9.57 9-10.609l.996 2.151c-2.433.917-3.996 3.638-3.996 5.849h3.983v10h-9.983z" />
                </svg>
                <p className="text-body text-foreground leading-relaxed">
                  &ldquo;{testimonial.quote}&rdquo;
                </p>
              </div>

              {/* Author */}
              <div className="flex items-center gap-3 pt-4 border-t border-border-light">
                <div className="w-10 h-10 rounded-full bg-accent-muted flex items-center justify-center text-accent font-semibold">
                  {testimonial.initial}
                </div>
                <div>
                  <div className="text-body-sm font-semibold text-foreground">
                    {testimonial.name}
                  </div>
                  <div className="text-body-xs text-muted">
                    {testimonial.role}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
