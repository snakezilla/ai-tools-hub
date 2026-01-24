import { Metadata } from 'next'
import Link from 'next/link'

export const metadata: Metadata = {
  title: 'Mini-Courses',
  description: 'Self-paced video courses on AI tools. Learn at your own pace with lifetime access.',
}

const courses = [
  {
    slug: 'claude-code-essentials',
    title: 'Claude Code Essentials',
    price: 67,
    description: 'Master Claude Code from installation to shipping your first feature.',
    duration: '2 hours',
    level: 'Beginner',
    includes: ['Installation setup', '5 real-world workflows', 'Pro tips & tricks', 'Lifetime access', 'Email support'],
    image: '🚀',
  },
  {
    slug: 'ai-workflow-builder',
    title: 'AI Workflow Builder',
    price: 97,
    description: 'Build 5 complete automation workflows using Claude + other tools.',
    duration: '3 hours',
    level: 'Intermediate',
    includes: ['5 complete projects', 'Step-by-step video guides', 'Source code included', 'Lifetime access', 'Priority support'],
    image: '⚙️',
  },
  {
    slug: 'claude-skills-mastery',
    title: 'Claude Skills Mastery',
    price: 47,
    description: 'Unlock superpowers: install, customize, and build your own skills.',
    duration: '1.5 hours',
    level: 'Intermediate',
    includes: ['20+ skills library', 'Installation guide', 'Customization tutorial', 'Lifetime access', 'Email support'],
    image: '✨',
  },
]

export default function CoursesPage() {
  return (
    <main className="min-h-screen bg-white">
      {/* Hero */}
      <section className="px-4 py-16 md:py-24">
        <div className="max-w-4xl mx-auto text-center mb-16">
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
            Self-Paced Video Courses
          </h1>
          <p className="text-xl text-gray-600">
            Learn at your own pace. Lifetime access. No subscriptions.
          </p>
        </div>

        {/* Courses Grid */}
        <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {courses.map((course) => (
            <div key={course.slug} className="bg-gray-50 rounded-lg border border-gray-200 overflow-hidden hover:shadow-lg transition">
              {/* Image Placeholder */}
              <div className="h-32 bg-gradient-to-br from-blue-100 to-blue-50 flex items-center justify-center text-6xl">
                {course.image}
              </div>

              {/* Content */}
              <div className="p-6">
                <div className="flex items-start justify-between mb-3">
                  <h3 className="text-lg font-bold text-gray-900">{course.title}</h3>
                </div>

                <div className="flex items-center gap-2 mb-4">
                  <span className="inline-block px-2 py-1 bg-blue-100 text-blue-700 text-xs font-medium rounded">
                    {course.level}
                  </span>
                  <span className="text-sm text-gray-600">{course.duration}</span>
                </div>

                <p className="text-gray-600 text-sm mb-6">{course.description}</p>

                {/* Features */}
                <ul className="space-y-2 mb-6">
                  {course.includes.map((item, index) => (
                    <li key={index} className="flex items-center gap-2 text-sm text-gray-700">
                      <svg className="w-4 h-4 text-green-600 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                      </svg>
                      {item}
                    </li>
                  ))}
                </ul>

                {/* Price & CTA */}
                <div className="flex items-end justify-between">
                  <div className="text-2xl font-bold text-gray-900">
                    ${course.price}
                  </div>
                  <Link
                    href={`/courses/${course.slug}`}
                    className="px-4 py-2 bg-blue-600 text-white text-sm font-medium rounded hover:bg-blue-700 transition"
                  >
                    Learn More
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* CTA */}
        <div className="mt-20 max-w-2xl mx-auto p-8 bg-blue-50 rounded-lg border border-blue-200 text-center">
          <h2 className="text-2xl font-bold text-gray-900 mb-3">
            Not sure which course is right for you?
          </h2>
          <p className="text-gray-600 mb-6">
            All courses include a 7-day money-back guarantee. Try one risk-free!
          </p>
          <Link
            href="/contact?type=question"
            className="inline-block px-6 py-3 bg-blue-600 text-white font-medium rounded hover:bg-blue-700 transition"
          >
            Ask a Question
          </Link>
        </div>
      </section>
    </main>
  )
}
