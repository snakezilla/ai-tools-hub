"use client"

import Link from "next/link"
import { useScrollAnimation } from "@/hooks/useScrollAnimation"

export function ServicesUpsell() {
  const [sectionRef, sectionVisible] = useScrollAnimation({ threshold: 0.2 })
  
  return (
    <section className="section">
      <div className="container-narrow">
        <div 
          ref={sectionRef}
          className={`relative overflow-hidden rounded-card-xl bg-gradient-to-br from-foreground to-foreground/90 text-white p-8 md:p-12 lg:p-16 ${sectionVisible ? 'scroll-visible-scale' : 'scroll-hidden-scale'}`}
        >
          {/* Subtle decorative elements */}
          <div className="absolute top-0 right-0 w-64 h-64 bg-accent/10 rounded-full blur-3xl" />
          <div className="absolute bottom-0 left-0 w-48 h-48 bg-accent/5 rounded-full blur-2xl" />
          
          <div className="relative">
            <div className="text-center max-w-xl mx-auto">
              <h2 className="text-2xl md:text-3xl lg:text-4xl font-semibold mb-4 text-white">
                Need a helping hand?
              </h2>
              <p className="text-lg md:text-xl text-white/80 mb-8">
                Our free guides are enough for most people. But if you want personalized help 
                setting up your AI workflow, we offer 1:1 setup services.
              </p>

              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Link
                  href="/pricing#services"
                  className="inline-flex items-center justify-center gap-2 px-6 py-3.5 bg-white text-foreground rounded-button-lg font-semibold hover:bg-white/90 transition-colors"
                >
                  View Setup Services
                  <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                  </svg>
                </Link>
                <Link
                  href="/contact"
                  className="inline-flex items-center justify-center gap-2 px-6 py-3.5 bg-white/10 text-white rounded-button-lg font-semibold border border-white/20 hover:bg-white/20 transition-colors"
                >
                  Get in Touch
                </Link>
              </div>

              <p className="mt-8 text-body-sm text-white/60">
                No pressure—start with the free guides first. We&apos;re here when you need us.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
