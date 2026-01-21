// Theme matching the main site's Tailwind config
export const theme = {
  colors: {
    background: "#FAFAFA",
    foreground: "#0A0A0A",
    muted: "#737373",
    mutedForeground: "#A3A3A3",
    border: "#E5E5E5",
    accent: "#2563EB",
    accentLight: "#3B82F6",
    accentDark: "#1D4ED8",
    accentForeground: "#FFFFFF",
    card: "#FFFFFF",
    cardHover: "#F5F5F5",
    cardForeground: "#0A0A0A",
    success: "#10B981",
    warning: "#F59E0B",
    error: "#EF4444",
  },
  fonts: {
    sans: "Inter, system-ui, sans-serif",
    mono: "ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, monospace",
  },
  fontSize: {
    sm: 14,
    base: 18,
    lg: 20,
    xl: 24,
    "2xl": 32,
    "3xl": 48,
  },
  spacing: {
    xs: 4,
    sm: 8,
    md: 16,
    lg: 24,
    xl: 32,
    "2xl": 48,
  },
  borderRadius: {
    sm: 4,
    md: 8,
    lg: 12,
    full: 9999,
  },
} as const

export type Theme = typeof theme
