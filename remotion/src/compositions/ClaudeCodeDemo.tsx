import React from "react"
import { AbsoluteFill, useCurrentFrame, Sequence, interpolate } from "remotion"
import { MockTerminal, FeatureCallout } from "../components"
import { theme } from "../styles/theme"

// 7 seconds at 30fps = 210 frames
// Act 1: 0-60 frames (command typing)
// Act 2: 60-120 frames (processing)
// Act 3: 120-210 frames (output reveal)

export const ClaudeCodeDemo: React.FC = () => {
  const frame = useCurrentFrame()

  // Typewriter effect for command
  const commandText = 'claude "Add user authentication to this app"'
  const charsPerSecond = 20
  const framesPerChar = 30 / charsPerSecond
  const commandChars = Math.min(
    commandText.length,
    Math.floor(Math.max(0, frame - 10) / framesPerChar)
  )
  const displayedCommand = commandText.slice(0, commandChars)

  // Cursor blink
  const cursorVisible = frame < 60 ? true : false
  const cursorBlink = frame % 30 < 15

  // Processing dots
  const dotsCount = frame >= 60 && frame < 120 ? ((Math.floor(frame / 10) % 3) + 1) : 0

  // Output animation
  const outputOpacity = interpolate(frame, [120, 140], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  })

  return (
    <AbsoluteFill
      style={{
        backgroundColor: "#0D0D0D",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <MockTerminal title="Terminal — claude-code">
        <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
          {/* Prompt line */}
          <div style={{ display: "flex", alignItems: "center" }}>
            <span style={{ color: "#10B981" }}>~/my-project</span>
            <span style={{ color: "#6B7280", marginLeft: 8, marginRight: 8 }}>$</span>
            <span style={{ color: "#D4D4D4" }}>{displayedCommand}</span>
            {cursorVisible && cursorBlink && (
              <span
                style={{
                  display: "inline-block",
                  width: 8,
                  height: 18,
                  backgroundColor: "#D4D4D4",
                  marginLeft: 2,
                }}
              />
            )}
          </div>

          {/* Processing state */}
          {frame >= 60 && frame < 120 && (
            <div style={{ marginTop: 16 }}>
              <div style={{ color: "#60A5FA", display: "flex", alignItems: "center", gap: 8 }}>
                <span>Analyzing codebase</span>
                <span>{".".repeat(dotsCount)}</span>
              </div>
              <div style={{ color: "#A3A3A3", marginTop: 8, fontSize: 14 }}>
                Found: package.json, src/App.tsx, src/components/...
              </div>
            </div>
          )}

          {/* Output */}
          {frame >= 120 && (
            <div style={{ marginTop: 16, opacity: outputOpacity }}>
              <div style={{ color: "#10B981", marginBottom: 8 }}>
                Creating authentication system...
              </div>

              <div style={{ fontSize: 14, color: "#A3A3A3", marginBottom: 16 }}>
                <div style={{ marginBottom: 4 }}>
                  <span style={{ color: "#10B981" }}>+</span> src/lib/auth.ts
                </div>
                <div style={{ marginBottom: 4 }}>
                  <span style={{ color: "#10B981" }}>+</span> src/components/LoginForm.tsx
                </div>
                <div style={{ marginBottom: 4 }}>
                  <span style={{ color: "#10B981" }}>+</span> src/components/SignupForm.tsx
                </div>
                <div style={{ marginBottom: 4 }}>
                  <span style={{ color: "#F59E0B" }}>~</span> src/App.tsx (modified)
                </div>
              </div>

              <div
                style={{
                  backgroundColor: "#1F2937",
                  padding: 12,
                  borderRadius: 8,
                  fontSize: 14,
                }}
              >
                <div style={{ color: "#60A5FA", marginBottom: 4 }}>
                  Authentication complete:
                </div>
                <div style={{ color: "#D4D4D4" }}>
                  - JWT-based auth with refresh tokens
                </div>
                <div style={{ color: "#D4D4D4" }}>
                  - Protected route wrapper
                </div>
                <div style={{ color: "#D4D4D4" }}>
                  - Login/Signup forms with validation
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Feature callout */}
        <Sequence from={160}>
          <FeatureCallout
            text="10 minutes vs 4 hours • Production-ready • Best practices"
            position="bottom"
            startFrame={0}
          />
        </Sequence>
      </MockTerminal>
    </AbsoluteFill>
  )
}
