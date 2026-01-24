import { Metadata } from 'next'
import Link from 'next/link'

export const metadata: Metadata = {
  title: 'Purchase Successful',
  description: 'Thank you for your purchase. Your course is ready to access.',
}

export default function SuccessPage() {
  return (
    <main className="min-h-screen bg-white flex items-center justify-center px-4">
      <div className="max-w-md w-full text-center">
        {/* Success Icon */}
        <div className="flex justify-center mb-6">
          <div className="p-3 bg-green-100 rounded-full">
            <svg className="w-12 h-12 text-green-600" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
            </svg>
          </div>
        </div>

        {/* Heading */}
        <h1 className="text-3xl font-bold text-gray-900 mb-2">
          Purchase Successful!
        </h1>

        {/* Description */}
        <p className="text-lg text-gray-600 mb-8">
          Thank you for your purchase. Your course is now ready to access.
        </p>

        {/* Details Box */}
        <div className="bg-gray-50 rounded-lg p-6 mb-8 text-left">
          <h2 className="font-semibold text-gray-900 mb-4">What happens next:</h2>
          <ul className="space-y-3 text-gray-600">
            <li className="flex items-start">
              <span className="mr-3 font-bold text-green-600">✓</span>
              <span>Check your email for course access and login instructions</span>
            </li>
            <li className="flex items-start">
              <span className="mr-3 font-bold text-green-600">✓</span>
              <span>You have lifetime access to all course materials</span>
            </li>
            <li className="flex items-start">
              <span className="mr-3 font-bold text-green-600">✓</span>
              <span>Email support available for any questions</span>
            </li>
            <li className="flex items-start">
              <span className="mr-3 font-bold text-green-600">✓</span>
              <span>7-day money-back guarantee if you&apos;re not satisfied</span>
            </li>
          </ul>
        </div>

        {/* CTAs */}
        <div className="space-y-3">
          <Link
            href="/guides"
            className="block w-full px-6 py-3 bg-blue-600 text-white font-medium rounded hover:bg-blue-700 transition text-center"
          >
            Browse More Guides
          </Link>
          <Link
            href="/courses"
            className="block w-full px-6 py-3 border border-gray-300 text-gray-700 font-medium rounded hover:bg-gray-50 transition text-center"
          >
            View All Courses
          </Link>
        </div>

        {/* Support Link */}
        <p className="text-sm text-gray-500 mt-8">
          Having trouble? <Link href="/contact" className="text-blue-600 hover:underline">Contact support</Link>
        </p>
      </div>
    </main>
  )
}
