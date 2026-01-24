'use client'

interface PricingCardProps {
  title: string
  price: string | number
  description: string
  features: string[]
  cta: string
  ctaHref: string
  highlighted?: boolean
  priceId?: string
}

export function PricingCard({
  title,
  price,
  description,
  features,
  cta,
  ctaHref,
  highlighted = false,
}: PricingCardProps) {
  return (
    <div
      className={`relative rounded-lg border transition-all duration-200 ${
        highlighted
          ? 'border-blue-500 shadow-lg scale-105 bg-white'
          : 'border-gray-200 bg-gray-50 hover:bg-white hover:shadow-md'
      }`}
    >
      {highlighted && (
        <div className="absolute -top-3 left-1/2 transform -translate-x-1/2 px-3 py-1 bg-blue-600 text-white text-sm font-medium rounded-full">
          Most Popular
        </div>
      )}

      <div className="p-8">
        <h3 className="text-xl font-bold text-gray-900 mb-2">{title}</h3>
        <p className="text-gray-600 text-sm mb-6">{description}</p>

        {/* Price */}
        <div className="mb-6">
          {typeof price === 'number' ? (
            <div className="flex items-baseline gap-1">
              <span className="text-4xl font-bold text-gray-900">${price}</span>
              <span className="text-gray-600">/mo</span>
            </div>
          ) : (
            <div className="text-2xl font-bold text-gray-900">{price}</div>
          )}
        </div>

        {/* CTA Button */}
        <a
          href={ctaHref}
          className={`block w-full text-center px-6 py-3 rounded-lg font-medium transition mb-8 ${
            highlighted
              ? 'bg-blue-600 text-white hover:bg-blue-700'
              : 'bg-white border-2 border-gray-300 text-gray-900 hover:border-gray-400'
          }`}
        >
          {cta}
        </a>

        {/* Features */}
        <ul className="space-y-3">
          {features.map((feature, index) => (
            <li key={index} className="flex items-start gap-3">
              <svg
                className="w-5 h-5 text-green-600 flex-shrink-0 mt-0.5"
                fill="currentColor"
                viewBox="0 0 20 20"
              >
                <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
              </svg>
              <span className="text-gray-700 text-sm">{feature}</span>
            </li>
          ))}
        </ul>
      </div>
    </div>
  )
}
