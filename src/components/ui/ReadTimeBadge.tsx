'use client'

interface ReadTimeBadgeProps {
  minutes: number
}

export function ReadTimeBadge({ minutes }: ReadTimeBadgeProps) {
  return (
    <span className="inline-flex items-center gap-1 text-xs text-gray-600">
      <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
      </svg>
      <span>{minutes} min read</span>
    </span>
  )
}
