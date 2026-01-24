'use client'

import { useState } from 'react'

interface CheckoutButtonProps {
  priceId: string
  label?: string
  className?: string
  disabled?: boolean
}

export function CheckoutButton({
  priceId,
  label = 'Buy Now',
  className = '',
  disabled = false,
}: CheckoutButtonProps) {
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  const handleCheckout = async () => {
    setLoading(true)
    setError('')

    try {
      const response = await fetch('/api/checkout', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ priceId }),
      })

      if (!response.ok) {
        throw new Error('Failed to create checkout session')
      }

      const data = await response.json()

      if (data.url) {
        // Redirect to Stripe checkout
        window.location.href = data.url
      } else {
        setError('No checkout URL returned')
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An error occurred')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div>
      <button
        onClick={handleCheckout}
        disabled={loading || disabled}
        className={`px-6 py-3 bg-blue-600 hover:bg-blue-700 disabled:bg-gray-400 text-white font-medium rounded-lg transition duration-200 ${className}`}
      >
        {loading ? 'Processing...' : label}
      </button>
      {error && (
        <p className="text-red-600 text-sm mt-2">{error}</p>
      )}
    </div>
  )
}
