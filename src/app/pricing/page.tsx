import { Metadata } from 'next'
import Link from 'next/link'
import { PricingCard } from '@/components/PricingCard'

export const metadata: Metadata = {
  title: 'Pricing',
  description: 'Choose the learning path that fits your needs. From free guides to professional workshops.',
}

export default function PricingPage() {
  return (
    <main className="min-h-screen bg-white">
      {/* Hero */}
      <section className="px-4 py-16 md:py-24">
        <div className="max-w-4xl mx-auto text-center mb-16">
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
            Learning Paths for Every Need
          </h1>
          <p className="text-xl text-gray-600">
            Start free, go deep with courses, or get personalized with workshops.
          </p>
        </div>

        {/* Pricing Cards */}
        <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto mb-16">
          <PricingCard
            title="Free"
            price="$0"
            description="Start your AI journey"
            features={[
              'All tool guides and tutorials',
              'Demo videos for every tool',
              'Community access',
              'Skills library',
              'Email support (48h response)',
            ]}
            cta="Get Started"
            ctaHref="/guides"
          />

          <PricingCard
            title="Mini-Courses"
            price={47}
            description="Deep dive into specific topics"
            features={[
              'Claude Code Essentials ($67)',
              'AI Workflow Builder ($97)',
              'Claude Skills Mastery ($47)',
              'Lifetime access',
              'Downloadable resources',
              'Priority email support',
            ]}
            cta="Browse Courses"
            ctaHref="/courses"
            highlighted
          />

          <PricingCard
            title="Workshops"
            price={295}
            description="Live, hands-on training"
            features={[
              'Half or full-day sessions',
              'Custom curriculum',
              'Max 15 people per group',
              'Q&A and troubleshooting',
              '30-day support period',
              'Certificate of completion',
            ]}
            cta="Schedule Workshop"
            ctaHref="https://calendly.com/placeholder"
          />
        </div>

        {/* Comparison Table */}
        <div className="max-w-6xl mx-auto">
          <h2 className="text-2xl font-bold text-gray-900 mb-8 text-center">
            Detailed Comparison
          </h2>

          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b-2 border-gray-200">
                  <th className="text-left py-4 px-4 font-bold text-gray-900">Feature</th>
                  <th className="text-center py-4 px-4 font-bold text-gray-900">Free</th>
                  <th className="text-center py-4 px-4 font-bold text-gray-900">Courses</th>
                  <th className="text-center py-4 px-4 font-bold text-gray-900">Workshops</th>
                </tr>
              </thead>
              <tbody>
                {[
                  { feature: 'All Guides', free: true, courses: true, workshops: true },
                  { feature: 'Demo Videos', free: true, courses: true, workshops: true },
                  { feature: 'Video Courses', free: false, courses: true, workshops: false },
                  { feature: 'Lifetime Access', free: true, courses: true, workshops: false },
                  { feature: 'Live Training', free: false, courses: false, workshops: true },
                  { feature: 'Custom Curriculum', free: false, courses: false, workshops: true },
                  { feature: 'Group Support', free: false, courses: false, workshops: true },
                  { feature: 'Email Support', free: true, courses: true, workshops: true },
                  { feature: 'Response Time', free: '48h', courses: '24h', workshops: '24h' },
                ].map((row, index) => (
                  <tr key={index} className="border-b border-gray-100 hover:bg-gray-50">
                    <td className="py-4 px-4 font-medium text-gray-900">{row.feature}</td>
                    <td className="py-4 px-4 text-center">
                      {typeof row.free === 'boolean' ? (
                        row.free ? (
                          <svg className="w-5 h-5 text-green-600 mx-auto" fill="currentColor" viewBox="0 0 20 20">
                            <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                          </svg>
                        ) : (
                          <svg className="w-5 h-5 text-gray-400 mx-auto" fill="currentColor" viewBox="0 0 20 20">
                            <path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd" />
                          </svg>
                        )
                      ) : (
                        <span className="text-gray-600">{row.free}</span>
                      )}
                    </td>
                    <td className="py-4 px-4 text-center">
                      {typeof row.courses === 'boolean' ? (
                        row.courses ? (
                          <svg className="w-5 h-5 text-green-600 mx-auto" fill="currentColor" viewBox="0 0 20 20">
                            <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                          </svg>
                        ) : (
                          <svg className="w-5 h-5 text-gray-400 mx-auto" fill="currentColor" viewBox="0 0 20 20">
                            <path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd" />
                          </svg>
                        )
                      ) : (
                        <span className="text-gray-600">{row.courses}</span>
                      )}
                    </td>
                    <td className="py-4 px-4 text-center">
                      {typeof row.workshops === 'boolean' ? (
                        row.workshops ? (
                          <svg className="w-5 h-5 text-green-600 mx-auto" fill="currentColor" viewBox="0 0 20 20">
                            <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                          </svg>
                        ) : (
                          <svg className="w-5 h-5 text-gray-400 mx-auto" fill="currentColor" viewBox="0 0 20 20">
                            <path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd" />
                          </svg>
                        )
                      ) : (
                        <span className="text-gray-600">{row.workshops}</span>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* FAQ */}
        <div className="max-w-3xl mx-auto mt-20">
          <h2 className="text-2xl font-bold text-gray-900 mb-8 text-center">
            Frequently Asked Questions
          </h2>

          <div className="space-y-6">
            {[
              {
                q: 'Can I upgrade from a course to a workshop?',
                a: "Yes! We'll credit 50% of your course purchase toward a workshop.",
              },
              {
                q: 'Is there a team pricing option?',
                a: 'Absolutely. Contact us for group discounts on workshops (10+ people).',
              },
              {
                q: 'Do you offer refunds?',
                a: 'Courses: 7-day money-back guarantee. Workshops: Full refund with 30 days notice.',
              },
              {
                q: 'Are the guides lifetime access?',
                a: 'Yes, all free guides are always available. Courses include lifetime access.',
              },
            ].map((item, index) => (
              <div key={index} className="bg-gray-50 p-6 rounded-lg border border-gray-200">
                <h3 className="font-bold text-gray-900 mb-2">{item.q}</h3>
                <p className="text-gray-600">{item.a}</p>
              </div>
            ))}
          </div>

          <div className="mt-12 p-8 bg-blue-50 rounded-lg border border-blue-200 text-center">
            <h3 className="text-lg font-bold text-gray-900 mb-3">
              Still have questions?
            </h3>
            <p className="text-gray-600 mb-4">
              Reach out to our team—we're here to help!
            </p>
            <Link
              href="/contact"
              className="inline-block px-6 py-3 bg-blue-600 text-white font-medium rounded-lg hover:bg-blue-700 transition"
            >
              Contact Us
            </Link>
          </div>
        </div>
      </section>
    </main>
  )
}
