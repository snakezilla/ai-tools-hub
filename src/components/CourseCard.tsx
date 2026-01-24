'use client'

import { CheckoutButton } from './CheckoutButton'

interface CourseCardProps {
  course: {
    slug: string
    title: string
    price: number
    description: string
    duration: string
    level: string
    includes: string[]
    image: string
    priceId: string
  }
}

export function CourseCard({ course }: CourseCardProps) {
  return (
    <div className="bg-gray-50 rounded-lg border border-gray-200 overflow-hidden hover:shadow-lg transition">
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
        <div className="flex items-end justify-between gap-2">
          <div className="text-2xl font-bold text-gray-900">
            ${course.price}
          </div>
          <CheckoutButton
            priceId={course.priceId}
            label="Buy Now"
            className="text-sm"
          />
        </div>
      </div>
    </div>
  )
}
