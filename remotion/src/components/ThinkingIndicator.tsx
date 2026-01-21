import React from "react"
import { useCurrentFrame, interpolate } from "remotion"
import { theme } from "../styles/theme"

interface ThinkingIndicatorProps {
  label?: string
  dotCount?: number
  color?: string
}

export const ThinkingIndicator: React.FC<ThinkingIndicatorProps> = ({
  label = "Thinking...",
  dotCount = 3,
  color = theme.colors.accent,
}) => {
  const frame = useCurrentFrame()

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        gap: theme.spacing.md,
      }}
    >
      {/* Animated dots */}
      <div style={{ display: "flex", gap: theme.spacing.sm }}>
        {Array.from({ length: dotCount }).map((_, i) => {
          const delay = i * 8
          const scale = interpolate(
            (frame + delay) % 30,
            [0, 15, 30],
            [0.6, 1.2, 0.6]
          )
          const opacity = interpolate(
            (frame + delay) % 30,
            [0, 15, 30],
            [0.4, 1, 0.4]
          )

          return (
            <div
              key={i}
              style={{
                width: 12,
                height: 12,
                borderRadius: theme.borderRadius.full,
                backgroundColor: color,
                transform: `scale(${scale})`,
                opacity,
              }}
            />
          )
        })}
      </div>

      {/* Label */}
      <div
        style={{
          fontFamily: theme.fonts.sans,
          fontSize: theme.fontSize.base,
          color: theme.colors.muted,
        }}
      >
        {label}
      </div>
    </div>
  )
}
