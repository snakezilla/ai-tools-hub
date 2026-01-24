import { Metadata } from 'next'
import Link from 'next/link'
import { getCourseBySlug, getAllCourses } from '@/lib/courses'
import { CheckoutButton } from '@/components/CheckoutButton'

interface Props {
  params: Promise<{ slug: string }>
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params
  const course = getCourseBySlug(slug)

  if (!course) {
    return {
      title: 'Course Not Found',
      description: 'The course you are looking for does not exist.',
    }
  }

  return {
    title: `${course.title} | Practical Library`,
    description: course.description,
    openGraph: {
      title: course.title,
      description: course.description,
      type: 'website',
      url: `https://practicallibrary.com/courses/${slug}`,
    },
  }
}

export async function generateStaticParams() {
  return getAllCourses().map((course) => ({
    slug: course.slug,
  }))
}

export default async function CourseDetailPage({ params }: Props) {
  const { slug } = await params
  const course = getCourseBySlug(slug)

  if (!course) {
    return (
      <main className="min-h-screen bg-white">
        <div className="max-w-4xl mx-auto px-4 py-24 text-center">
          <h1 className="text-3xl font-bold text-gray-900 mb-4">Course Not Found</h1>
          <p className="text-lg text-gray-600 mb-8">
            The course you&apos;re looking for doesn&apos;t exist.
          </p>
          <Link
            href="/courses"
            className="inline-block px-6 py-3 bg-blue-600 text-white font-medium rounded hover:bg-blue-700 transition"
          >
            Back to Courses
          </Link>
        </div>
      </main>
    )
  }

  return (
    <main className="min-h-screen bg-white">
      {/* Hero Section */}
      <section className="px-4 py-12 md:py-20 bg-gradient-to-br from-blue-50 to-white">
        <div className="max-w-4xl mx-auto">
          <div className="flex items-center gap-2 mb-6">
            <span className="text-4xl">{course.image}</span>
            <div>
              <div className="inline-block px-3 py-1 bg-blue-100 text-blue-700 text-sm font-medium rounded">
                {course.level}
              </div>
            </div>
          </div>

          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
            {course.title}
          </h1>
          <p className="text-xl text-gray-600 mb-8 max-w-2xl">
            {course.description}
          </p>

          {/* Course Meta */}
          <div className="grid grid-cols-3 gap-4 mb-8 max-w-2xl">
            <div className="flex items-center gap-2 text-gray-700">
              <svg className="w-5 h-5 text-blue-600" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-11a1 1 0 10-2 0v3.586L7.707 9.293a1 1 0 00-1.414 1.414l3 3a1 1 0 001.414 0l3-3a1 1 0 00-1.414-1.414L11 10.586V7z" clipRule="evenodd" />
              </svg>
              <span>{course.duration}</span>
            </div>
            <div className="flex items-center gap-2 text-gray-700">
              <svg className="w-5 h-5 text-blue-600" fill="currentColor" viewBox="0 0 20 20">
                <path d="M2 11a1 1 0 011-1h2a1 1 0 011 1v5a1 1 0 01-1 1H3a1 1 0 01-1-1v-5zM8 7a1 1 0 011-1h2a1 1 0 011 1v9a1 1 0 01-1 1H9a1 1 0 01-1-1V7zM14 4a1 1 0 011-1h2a1 1 0 011 1v12a1 1 0 01-1 1h-2a1 1 0 01-1-1V4z" />
              </svg>
              <span>{course.level}</span>
            </div>
            <div className="flex items-center gap-2 text-gray-700">
              <svg className="w-5 h-5 text-blue-600" fill="currentColor" viewBox="0 0 20 20">
                <path d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z" />
              </svg>
              <span>By {course.instructor || 'Practical Library'}</span>
            </div>
          </div>

          {/* Price and CTA */}
          <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-6 p-6 bg-blue-50 rounded-lg border border-blue-200">
            <div>
              <p className="text-gray-600 text-sm mb-1">Course Price</p>
              <p className="text-4xl font-bold text-gray-900">
                ${course.price}
              </p>
              <p className="text-sm text-gray-600 mt-2">One-time payment • Lifetime access</p>
            </div>
            <CheckoutButton
              priceId={course.priceId}
              label="Enroll Now"
              className="px-8 py-4 bg-blue-600 text-white font-bold rounded hover:bg-blue-700 transition text-lg md:text-base w-full md:w-auto"
            />
          </div>

          {/* Guarantee */}
          <p className="text-center text-sm text-gray-600 mt-4">
            {course.moneyBackGuarantee && '✓ 7-day money-back guarantee • '}
            ✓ Lifetime access • ✓ Email support
          </p>
        </div>
      </section>

      {/* Main Content Grid */}
      <section className="px-4 py-16 md:py-24">
        <div className="max-w-4xl mx-auto grid md:grid-cols-3 gap-12">
          {/* Left Column */}
          <div className="md:col-span-2 space-y-12">
            {/* What You'll Learn */}
            <div>
              <h2 className="text-2xl font-bold text-gray-900 mb-6">What You&apos;ll Learn</h2>
              <ul className="space-y-3">
                {course.whatYouLearn.map((item, idx) => (
                  <li key={idx} className="flex items-start gap-3">
                    <svg className="w-5 h-5 text-green-600 flex-shrink-0 mt-0.5" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                    </svg>
                    <span className="text-gray-700">{item}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Who It&apos;s For */}
            <div>
              <h2 className="text-2xl font-bold text-gray-900 mb-6">Who It&apos;s For</h2>
              <ul className="space-y-2">
                {course.whoItsFor.map((item, idx) => (
                  <li key={idx} className="text-gray-700">• {item}</li>
                ))}
              </ul>
            </div>

            {/* Curriculum */}
            <div>
              <h2 className="text-2xl font-bold text-gray-900 mb-6">Course Curriculum</h2>
              <div className="space-y-4">
                {course.curriculum.map((module, idx) => (
                  <details key={idx} className="border border-gray-200 rounded-lg p-4 group">
                    <summary className="font-semibold text-gray-900 cursor-pointer flex items-center justify-between">
                      <span>{module.title}</span>
                      <span className="group-open:rotate-180 transition-transform">▼</span>
                    </summary>
                    <ul className="mt-4 space-y-2 pl-4 border-l-2 border-blue-200">
                      {module.lessons.map((lesson, lessonIdx) => (
                        <li key={lessonIdx} className="text-gray-700">
                          {lesson}
                        </li>
                      ))}
                    </ul>
                  </details>
                ))}
              </div>
            </div>

            {/* Prerequisites */}
            {course.prerequisites && course.prerequisites.length > 0 && (
              <div>
                <h2 className="text-2xl font-bold text-gray-900 mb-6">Prerequisites</h2>
                <ul className="space-y-2">
                  {course.prerequisites.map((item, idx) => (
                    <li key={idx} className="text-gray-700">• {item}</li>
                  ))}
                </ul>
              </div>
            )}

            {/* FAQ */}
            <div>
              <h2 className="text-2xl font-bold text-gray-900 mb-6">Frequently Asked Questions</h2>
              <div className="space-y-4">
                {course.faq.map((item, idx) => (
                  <details key={idx} className="border border-gray-200 rounded-lg p-4 group">
                    <summary className="font-semibold text-gray-900 cursor-pointer flex items-center justify-between">
                      <span>{item.question}</span>
                      <span className="group-open:rotate-180 transition-transform">▼</span>
                    </summary>
                    <p className="mt-4 text-gray-700">{item.answer}</p>
                  </details>
                ))}
              </div>
            </div>

            {/* Why Learners Choose Us */}
            <div className="bg-blue-50 border border-blue-200 rounded-lg p-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-6">Why Learners Choose Our Courses</h2>
              <ul className="space-y-4">
                <li className="flex items-start gap-3">
                  <svg className="w-6 h-6 text-blue-600 flex-shrink-0 mt-0.5" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                  </svg>
                  <div>
                    <h3 className="font-semibold text-gray-900">Practical, Real-World Examples</h3>
                    <p className="text-gray-700 text-sm">Every lesson comes with actual workflows and code you can use immediately.</p>
                  </div>
                </li>
                <li className="flex items-start gap-3">
                  <svg className="w-6 h-6 text-blue-600 flex-shrink-0 mt-0.5" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                  </svg>
                  <div>
                    <h3 className="font-semibold text-gray-900">Expert Instruction</h3>
                    <p className="text-gray-700 text-sm">Taught by people who use these tools daily in production environments.</p>
                  </div>
                </li>
                <li className="flex items-start gap-3">
                  <svg className="w-6 h-6 text-blue-600 flex-shrink-0 mt-0.5" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                  </svg>
                  <div>
                    <h3 className="font-semibold text-gray-900">No Fluff, No Filler</h3>
                    <p className="text-gray-700 text-sm">Concise lessons that respect your time. Learn what you need, skip the rest.</p>
                  </div>
                </li>
              </ul>
            </div>
          </div>

          {/* Right Column - Sidebar */}
          <div className="md:col-span-1">
            {/* Course Summary Card */}
            <div className="sticky top-4 border border-gray-200 rounded-lg p-6 bg-gray-50">
              <p className="text-sm text-gray-600 mb-2">Course Summary</p>
              <div className="space-y-4 mb-6">
                <div>
                  <p className="text-xs text-gray-500 uppercase tracking-wide">Duration</p>
                  <p className="font-semibold text-gray-900">{course.duration}</p>
                </div>
                <div>
                  <p className="text-xs text-gray-500 uppercase tracking-wide">Level</p>
                  <p className="font-semibold text-gray-900">{course.level}</p>
                </div>
                <div>
                  <p className="text-xs text-gray-500 uppercase tracking-wide">Price</p>
                  <p className="font-semibold text-gray-900">${course.price}</p>
                </div>
                {course.features && course.features.length > 0 && (
                  <div>
                    <p className="text-xs text-gray-500 uppercase tracking-wide mb-2">Includes</p>
                    <ul className="space-y-1">
                      {course.features.map((feature, idx) => (
                        <li key={idx} className="text-sm text-gray-700 flex items-start gap-2">
                          <span className="text-green-600 flex-shrink-0">✓</span>
                          <span>{feature}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
              </div>

              {/* Enroll Button */}
              <CheckoutButton
                priceId={course.priceId}
                label="Enroll Now"
                className="w-full px-4 py-3 bg-blue-600 text-white font-bold rounded hover:bg-blue-700 transition text-center block"
              />

              {/* Guarantee Badge */}
              {course.moneyBackGuarantee && (
                <div className="mt-4 p-3 bg-green-50 border border-green-200 rounded text-center">
                  <p className="text-xs text-green-700 font-semibold">✓ 7-day Money-Back Guarantee</p>
                </div>
              )}

              {/* Additional Info */}
              <p className="text-xs text-gray-600 text-center mt-4">
                Questions? <Link href="/contact" className="text-blue-600 hover:underline">Contact us</Link>
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Related Courses */}
      <section className="px-4 py-16 md:py-24 bg-gray-50 border-t border-gray-200">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-3xl font-bold text-gray-900 mb-8">Other Courses</h2>
          <div className="grid md:grid-cols-2 gap-6">
            {getAllCourses()
              .filter((c) => c.slug !== course.slug)
              .map((relatedCourse) => (
                <Link
                  key={relatedCourse.slug}
                  href={`/courses/${relatedCourse.slug}`}
                  className="border border-gray-200 rounded-lg p-6 bg-white hover:shadow-lg transition"
                >
                  <div className="text-3xl mb-3">{relatedCourse.image}</div>
                  <h3 className="text-lg font-bold text-gray-900 mb-2">{relatedCourse.title}</h3>
                  <p className="text-gray-600 text-sm mb-4">{relatedCourse.shortDescription}</p>
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-medium text-gray-500">${relatedCourse.price}</span>
                    <span className="text-blue-600 font-semibold text-sm">View Course →</span>
                  </div>
                </Link>
              ))}
          </div>
        </div>
      </section>
    </main>
  )
}
