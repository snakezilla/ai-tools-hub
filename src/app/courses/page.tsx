import { Metadata } from 'next'
import Link from 'next/link'
import { CourseCard } from '@/components/CourseCard'

export const metadata: Metadata = {
  title: 'AI Tools Courses - Self-Paced Learning',
  description: 'Self-paced video courses on Claude Code, AI workflow automation, and Claude Skills. Learn from $47-97 with lifetime access and email support.',
  keywords: [
    'online courses',
    'Claude Code course',
    'AI automation course',
    'workflow builder',
    'self-paced learning',
    'video course',
    'lifetime access',
  ],
  openGraph: {
    title: 'AI Tools Courses | Practical Library',
    description: 'Affordable self-paced courses on Claude Code, workflow automation, and skills. Start from $47 with lifetime access.',
    url: 'https://practicallibrary.com/courses',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'AI Tools Courses | Practical Library',
    description: 'Learn Claude Code, automation, and more. Affordable self-paced courses with lifetime access.',
  },
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
    priceId: 'price_1St9N9BFWwFtzH8DF9bmFRBo',
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
    priceId: 'price_1St9NSBFWwFtzH8DKGqctZZq',
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
    priceId: 'price_1St9NjBFWwFtzH8DjtuVVerP',
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
            <CourseCard
              key={course.slug}
              course={course}
            />
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
