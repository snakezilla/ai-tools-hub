import { Metadata } from 'next'
import { ContactForm } from '@/components/ContactForm'

export const metadata: Metadata = {
  title: 'Contact - Practical Library',
  description: 'Get in touch with Practical Library. Questions about guides, courses, or workshops? We respond within 24 hours.',
  keywords: [
    'contact us',
    'support',
    'feedback',
    'partnership',
    'workshop inquiry',
    'course questions',
  ],
  openGraph: {
    title: 'Contact Us | Practical Library',
    description: 'Reach out with questions, feedback, or partnership opportunities. We respond within 24 hours.',
    url: 'https://practicallibrary.com/contact',
    type: 'website',
  },
  twitter: {
    card: 'summary',
    title: 'Contact Us | Practical Library',
    description: 'Questions about AI tools or courses? Get in touch.',
  },
}

export default function ContactPage() {
  return (
    <main className="min-h-screen bg-white">
      {/* Hero */}
      <section className="px-4 py-16 md:py-24">
        <div className="max-w-3xl mx-auto text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
            Get in Touch
          </h1>
          <p className="text-lg text-gray-600">
            Have a question? Want to share feedback? Or interested in a partnership? We&apos;d love to hear from you.
          </p>
        </div>

        {/* Contact Form */}
        <div className="bg-white p-8 rounded-lg border border-gray-200 max-w-2xl mx-auto mb-12">
          <ContactForm />
        </div>

        {/* Book a Call */}
        <div className="max-w-md mx-auto mt-16 text-center">
          <div className="p-8 bg-gradient-to-br from-blue-50 to-purple-50 rounded-xl border border-blue-100">
            <div className="w-14 h-14 bg-blue-100 rounded-xl flex items-center justify-center mx-auto mb-4">
              <svg className="w-7 h-7 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h18M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
              </svg>
            </div>
            <h3 className="text-xl font-bold text-gray-900 mb-2">Prefer to Talk?</h3>
            <p className="text-gray-600 mb-6">
              Book a free 15-minute call to discuss workshops, courses, or partnerships.
            </p>
            <a
              href="https://cal.com/a-e-joiqod/15min"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center gap-2 px-6 py-3 bg-blue-600 text-white rounded-lg font-semibold hover:bg-blue-700 transition-colors"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h18M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
              </svg>
              Book a Call
            </a>
            <p className="text-xs text-gray-500 mt-4">
              Free • 15 minutes • No pressure
            </p>
          </div>
        </div>
      </section>
    </main>
  )
}
