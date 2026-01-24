import Link from "next/link"

export function LearningPaths() {
  return (
    <section className="py-16 md:py-24 px-4 bg-gray-50">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-12">
          <h2 className="text-heading-md md:text-heading-lg text-foreground mb-4">
            Choose Your Learning Path
          </h2>
          <p className="text-body-lg text-muted max-w-2xl mx-auto">
            From free guides to live workshops—pick the level that matches your pace and budget.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-6">
          {/* Free Guides */}
          <Link
            href="/guides"
            className="group relative bg-white rounded-lg border border-gray-200 p-8 hover:border-blue-500 hover:shadow-lg transition-all h-full flex flex-col"
          >
            <div className="text-4xl mb-4">📚</div>
            <h3 className="text-heading-sm text-foreground font-bold mb-3 group-hover:text-blue-600 transition">
              Free Guides
            </h3>
            <p className="text-body text-muted mb-6 flex-grow">
              Master AI tools with step-by-step guides. No credit card required.
            </p>
            <div className="space-y-3 text-sm text-gray-700 mb-6">
              <div className="flex items-center gap-2">
                <svg className="w-5 h-5 text-green-600" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                </svg>
                <span>Beginner to Advanced</span>
              </div>
              <div className="flex items-center gap-2">
                <svg className="w-5 h-5 text-green-600" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                </svg>
                <span>20+ Guides</span>
              </div>
              <div className="flex items-center gap-2">
                <svg className="w-5 h-5 text-green-600" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                </svg>
                <span>100% Free</span>
              </div>
            </div>
            <span className="inline-block px-4 py-2 bg-gray-100 text-gray-700 rounded font-semibold group-hover:bg-blue-600 group-hover:text-white transition text-center">
              Explore Guides →
            </span>
          </Link>

          {/* Mini-Courses */}
          <Link
            href="/courses"
            className="group relative bg-white rounded-lg border border-blue-200 p-8 hover:border-blue-500 hover:shadow-lg transition-all h-full flex flex-col ring-1 ring-blue-100"
          >
            <div className="absolute top-4 right-4 px-3 py-1 bg-blue-100 text-blue-700 text-xs font-bold rounded-full">
              POPULAR
            </div>
            <div className="text-4xl mb-4">🎓</div>
            <h3 className="text-heading-sm text-foreground font-bold mb-3 group-hover:text-blue-600 transition">
              Mini-Courses
            </h3>
            <p className="text-body text-muted mb-6 flex-grow">
              2-hour self-paced courses with video, cheat sheets, and lifetime access.
            </p>
            <div className="space-y-3 text-sm text-gray-700 mb-6">
              <div className="flex items-center gap-2">
                <svg className="w-5 h-5 text-green-600" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                </svg>
                <span>$47-$97</span>
              </div>
              <div className="flex items-center gap-2">
                <svg className="w-5 h-5 text-green-600" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                </svg>
                <span>Lifetime Access</span>
              </div>
              <div className="flex items-center gap-2">
                <svg className="w-5 h-5 text-green-600" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                </svg>
                <span>Email Support</span>
              </div>
            </div>
            <span className="inline-block px-4 py-2 bg-blue-600 text-white rounded font-semibold group-hover:bg-blue-700 transition text-center">
              View Courses →
            </span>
          </Link>

          {/* Live Workshops */}
          <Link
            href="/workshops"
            className="group relative bg-white rounded-lg border border-gray-200 p-8 hover:border-blue-500 hover:shadow-lg transition-all h-full flex flex-col"
          >
            <div className="text-4xl mb-4">🎥</div>
            <h3 className="text-heading-sm text-foreground font-bold mb-3 group-hover:text-blue-600 transition">
              Live Workshops
            </h3>
            <p className="text-body text-muted mb-6 flex-grow">
              Interactive 4-hour live sessions with Q&A and 30-day follow-up support.
            </p>
            <div className="space-y-3 text-sm text-gray-700 mb-6">
              <div className="flex items-center gap-2">
                <svg className="w-5 h-5 text-green-600" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                </svg>
                <span>$295-$495</span>
              </div>
              <div className="flex items-center gap-2">
                <svg className="w-5 h-5 text-green-600" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                </svg>
                <span>Live + Recording</span>
              </div>
              <div className="flex items-center gap-2">
                <svg className="w-5 h-5 text-green-600" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                </svg>
                <span>30-Day Support</span>
              </div>
            </div>
            <span className="inline-block px-4 py-2 bg-gray-100 text-gray-700 rounded font-semibold group-hover:bg-blue-600 group-hover:text-white transition text-center">
              Book a Workshop →
            </span>
          </Link>
        </div>
      </div>
    </section>
  )
}
