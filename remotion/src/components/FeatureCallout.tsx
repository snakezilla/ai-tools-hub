import React from "react"
import { useCurrentFrame, interpolate, spring, useVideoConfig } from "remotion"
import { theme } from "../styles/theme"

interface FeatureCalloutProps {
  text: string
  position?: "top" | "bottom" | "left" | "right"
  startFrame?: number
}

export const FeatureCallout: React.FC<FeatureCalloutProps> = ({
  text,
  position = "bottom",
  startFrame = 0,
}) => {
  const frame = useCurrentFrame()
  const { fps } = useVideoConfig()

  const adjustedFrame = Math.max(0, frame - startFrame)

  const opacity = interpolate(adjustedFrame, [0, 15], [0, 1], {
    extrapolateRight: "clamp",
  })

  const translateY = spring({
    frame: adjustedFrame,
    fps,
    config: {
      damping: 15,
      stiffness: 100,
    },
  })

  const yOffset = position === "top" ? -20 : position === "bottom" ? 20 : 0
  const xOffset = position === "left" ? -20 : position === "right" ? 20 : 0

  const positionStyles: React.CSSProperties = {
    top: position === "top" ? 0 : position === "bottom" ? "auto" : "50%",
    bottom: position === "bottom" ? 0 : "auto",
    left: position === "left" ? 0 : position === "right" ? "auto" : "50%",
    right: position === "right" ? 0 : "auto",
    transform:
      position === "top" || position === "bottom"
        ? `translateX(-50%) translateY(${(1 - translateY) * yOffset}px)`
        : `translateY(-50%) translateX(${(1 - translateY) * xOffset}px)`,
  }

  return (
    <div
      style={{
        position: "absolute",
        ...positionStyles,
        opacity,
        backgroundColor: theme.colors.foreground,
        color: theme.colors.card,
        padding: `${theme.spacing.sm}px ${theme.spacing.md}px`,
        borderRadius: theme.borderRadius.md,
        fontFamily: theme.fonts.sans,
        fontSize: theme.fontSize.sm,
        fontWeight: 500,
        whiteSpace: "nowrap",
        boxShadow: "0 4px 12px rgba(0, 0, 0, 0.15)",
      }}
    >
      {text}
    </div>
  )
}
