'use client'

type Difficulty = 'beginner' | 'intermediate' | 'advanced'

interface DifficultyBadgeProps {
  level: Difficulty
}

const colors: Record<Difficulty, string> = {
  beginner: 'bg-emerald-50 text-emerald-700 border-emerald-200',
  intermediate: 'bg-amber-50 text-amber-700 border-amber-200',
  advanced: 'bg-red-50 text-red-700 border-red-200',
}

const labels: Record<Difficulty, string> = {
  beginner: 'Beginner',
  intermediate: 'Intermediate',
  advanced: 'Advanced',
}

export function DifficultyBadge({ level }: DifficultyBadgeProps) {
  return (
    <span className={`inline-block px-2.5 py-0.5 rounded-full text-xs font-medium border ${colors[level]}`}>
      {labels[level]}
    </span>
  )
}
