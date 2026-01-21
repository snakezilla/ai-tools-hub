interface PrivacyBadgeProps {
  level: "green" | "yellow" | "red"
  className?: string
}

const privacyConfig = {
  green: {
    label: "Privacy-friendly",
    bgColor: "bg-emerald-50",
    textColor: "text-emerald-700",
    borderColor: "border-emerald-200",
  },
  yellow: {
    label: "Review privacy",
    bgColor: "bg-amber-50",
    textColor: "text-amber-700",
    borderColor: "border-amber-200",
  },
  red: {
    label: "Privacy concern",
    bgColor: "bg-red-50",
    textColor: "text-red-700",
    borderColor: "border-red-200",
  },
}

export function PrivacyBadge({ level, className = "" }: PrivacyBadgeProps) {
  const config = privacyConfig[level]

  return (
    <span
      className={`inline-flex items-center px-2.5 py-1 rounded-full text-sm font-medium border ${config.bgColor} ${config.textColor} ${config.borderColor} ${className}`}
    >
      {config.label}
    </span>
  )
}
