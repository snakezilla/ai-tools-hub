import Link from "next/link"

export function Hero() {
  return (
    <section className="py-20 md:py-32 px-4">
      <div className="max-w-content mx-auto text-center">
        <h1 className="text-heading-lg md:text-heading-xl text-foreground mb-6 text-balance">
          The simplest AI walkthrough to become{" "}
          <span className="text-accent">your own CTO</span>.
        </h1>

        <p className="text-body-lg text-muted max-w-2xl mx-auto mb-10">
          No technical background needed. Step-by-step guides that take you from
          zero to automating your work in minutes.
        </p>

        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Link
            href="#calculator"
            className="inline-flex items-center justify-center px-8 py-4 bg-accent text-accent-foreground rounded-button font-semibold text-lg hover:bg-accent-dark transition-colors"
          >
            Calculate Your Savings
          </Link>
          <Link
            href="#tools"
            className="inline-flex items-center justify-center px-8 py-4 bg-card text-card-foreground border border-border rounded-button font-semibold text-lg hover:border-accent hover:text-accent transition-colors"
          >
            Browse Tools
          </Link>
        </div>

        <div className="mt-16 flex items-center justify-center gap-8 text-muted text-sm">
          <div className="flex items-center gap-2">
            <svg className="w-5 h-5 text-success" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
            </svg>
            <span>100% Free</span>
          </div>
          <div className="flex items-center gap-2">
            <svg className="w-5 h-5 text-success" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
            </svg>
            <span>No signup required</span>
          </div>
          <div className="flex items-center gap-2">
            <svg className="w-5 h-5 text-success" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
            </svg>
            <span>Privacy-focused</span>
          </div>
        </div>
      </div>
    </section>
  )
}
