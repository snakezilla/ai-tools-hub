import React from "react"
import { useCurrentFrame, useVideoConfig, interpolate } from "remotion"
import { theme } from "../styles/theme"

interface TypewriterProps {
  text: string
  startFrame?: number
  charsPerSecond?: number
  cursorColor?: string
  textColor?: string
  fontSize?: number
}

export const Typewriter: React.FC<TypewriterProps> = ({
  text,
  startFrame = 0,
  charsPerSecond = 20,
  cursorColor = theme.colors.accent,
  textColor = theme.colors.foreground,
  fontSize = theme.fontSize.lg,
}) => {
  const frame = useCurrentFrame()
  const { fps } = useVideoConfig()

  const framesPerChar = fps / charsPerSecond
  const adjustedFrame = Math.max(0, frame - startFrame)
  const charsToShow = Math.floor(adjustedFrame / framesPerChar)
  const displayedText = text.slice(0, charsToShow)
  const isTyping = charsToShow < text.length && frame >= startFrame

  // Cursor blink animation (every 15 frames)
  const cursorOpacity = isTyping ? 1 : interpolate(
    frame % 30,
    [0, 15, 30],
    [1, 0, 1]
  )

  return (
    <div
      style={{
        fontFamily: theme.fonts.sans,
        fontSize,
        color: textColor,
        lineHeight: 1.5,
        display: "flex",
        alignItems: "center",
      }}
    >
      <span>{displayedText}</span>
      <span
        style={{
          display: "inline-block",
          width: 2,
          height: fontSize * 1.2,
          backgroundColor: cursorColor,
          marginLeft: 2,
          opacity: cursorOpacity,
        }}
      />
    </div>
  )
}
