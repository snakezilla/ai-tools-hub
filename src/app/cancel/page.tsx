import { Metadata } from 'next'
import Link from 'next/link'

export const metadata: Metadata = {
  title: 'Checkout Cancelled',
  description: 'Your checkout was cancelled. Return to browse courses.',
}

export default function CancelPage() {
  return (
    <main className="min-h-screen bg-white flex items-center justify-center px-4">
      <div className="max-w-md w-full text-center">
        {/* Cancel Icon */}
        <div className="flex justify-center mb-6">
          <div className="p-3 bg-amber-100 rounded-full">
            <svg className="w-12 h-12 text-amber-600" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
            </svg>
          </div>
        </div>

        {/* Heading */}
        <h1 className="text-3xl font-bold text-gray-900 mb-2">
          Checkout Cancelled
        </h1>

        {/* Description */}
        <p className="text-lg text-gray-600 mb-8">
          Your checkout was cancelled. No charge was made to your account.
        </p>

        {/* Options */}
        <div className="bg-gray-50 rounded-lg p-6 mb-8 text-left">
          <h2 className="font-semibold text-gray-900 mb-4">What can we do better?</h2>
          <div className="space-y-3">
            <label className="flex items-center cursor-pointer">
              <input type="radio" name="reason" value="price" className="mr-3" />
              <span className="text-gray-700">Course was too expensive</span>
            </label>
            <label className="flex items-center cursor-pointer">
              <input type="radio" name="reason" value="unsure" className="mr-3" />
              <span className="text-gray-700">Not sure if it&apos;s right for me</span>
            </label>
            <label className="flex items-center cursor-pointer">
              <input type="radio" name="reason" value="technical" className="mr-3" />
              <span className="text-gray-700">Technical issues with checkout</span>
            </label>
            <label className="flex items-center cursor-pointer">
              <input type="radio" name="reason" value="other" className="mr-3" />
              <span className="text-gray-700">Other reason</span>
            </label>
          </div>
        </div>

        {/* CTAs */}
        <div className="space-y-3">
          <Link
            href="/contact?type=question"
            className="block w-full px-6 py-3 bg-blue-600 text-white font-medium rounded hover:bg-blue-700 transition text-center"
          >
            Get Help / Ask a Question
          </Link>
          <Link
            href="/pricing"
            className="block w-full px-6 py-3 border border-gray-300 text-gray-700 font-medium rounded hover:bg-gray-50 transition text-center"
          >
            View All Options
          </Link>
          <Link
            href="/courses"
            className="block w-full px-6 py-3 text-gray-600 font-medium rounded hover:text-gray-900 transition text-center"
          >
            Return to Courses
          </Link>
        </div>

        {/* Guarantee */}
        <p className="text-sm text-gray-500 mt-8">
          Worried about your purchase? All courses include a 7-day money-back guarantee.
        </p>
      </div>
    </main>
  )
}
