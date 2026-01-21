import React from "react"
import { AbsoluteFill, useCurrentFrame, Sequence, interpolate } from "remotion"
import { MockBrowser, Typewriter, ThinkingIndicator, FeatureCallout } from "../components"
import { theme } from "../styles/theme"

// 7 seconds at 30fps = 210 frames
// Act 1: 0-60 frames (prompt typing)
// Act 2: 60-120 frames (thinking)
// Act 3: 120-210 frames (output reveal)

export const ClaudeDemo: React.FC = () => {
  const frame = useCurrentFrame()

  // Output reveal animation
  const outputOpacity = interpolate(frame, [120, 140], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  })

  return (
    <AbsoluteFill
      style={{
        backgroundColor: theme.colors.background,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <MockBrowser url="claude.ai">
        <div style={{ display: "flex", flexDirection: "column", height: "100%" }}>
          {/* Header */}
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: theme.spacing.sm,
              marginBottom: theme.spacing.lg,
            }}
          >
            <div
              style={{
                width: 32,
                height: 32,
                borderRadius: theme.borderRadius.md,
                backgroundColor: "#D4A574",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                color: "white",
                fontWeight: "bold",
                fontSize: 16,
              }}
            >
              C
            </div>
            <span
              style={{
                fontFamily: theme.fonts.sans,
                fontSize: theme.fontSize.lg,
                fontWeight: 600,
                color: theme.colors.foreground,
              }}
            >
              Claude
            </span>
          </div>

          {/* Chat area */}
          <div style={{ flex: 1, display: "flex", flexDirection: "column", gap: theme.spacing.lg }}>
            {/* User message */}
            <div style={{ display: "flex", justifyContent: "flex-end" }}>
              <div
                style={{
                  maxWidth: "70%",
                  backgroundColor: theme.colors.accent,
                  color: "white",
                  padding: theme.spacing.md,
                  borderRadius: theme.borderRadius.lg,
                  fontFamily: theme.fonts.sans,
                  fontSize: theme.fontSize.base,
                }}
              >
                <Typewriter
                  text="Help me draft a professional email to reschedule a client meeting"
                  startFrame={5}
                  charsPerSecond={25}
                  textColor="white"
                  cursorColor="white"
                />
              </div>
            </div>

            {/* Claude response area */}
            <div style={{ display: "flex", justifyContent: "flex-start" }}>
              <div
                style={{
                  maxWidth: "80%",
                  backgroundColor: theme.colors.cardHover,
                  padding: theme.spacing.md,
                  borderRadius: theme.borderRadius.lg,
                  minHeight: 180,
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                {/* Thinking state */}
                {frame >= 60 && frame < 120 && (
                  <ThinkingIndicator label="Claude is thinking..." />
                )}

                {/* Output state */}
                {frame >= 120 && (
                  <div style={{ opacity: outputOpacity }}>
                    <div
                      style={{
                        fontFamily: theme.fonts.sans,
                        fontSize: theme.fontSize.base,
                        color: theme.colors.foreground,
                        lineHeight: 1.6,
                      }}
                    >
                      <p style={{ margin: 0, marginBottom: 12 }}>
                        <strong>Subject:</strong> Request to Reschedule Our Meeting
                      </p>
                      <p style={{ margin: 0, marginBottom: 12 }}>
                        Dear [Client Name],
                      </p>
                      <p style={{ margin: 0, marginBottom: 12 }}>
                        I hope this message finds you well. I need to reschedule our meeting originally planned for [date]...
                      </p>
                      <p
                        style={{
                          margin: 0,
                          color: theme.colors.success,
                          fontWeight: 500,
                          fontSize: theme.fontSize.sm,
                        }}
                      >
                        Ready to copy and customize
                      </p>
                    </div>
                  </div>
                )}

                {/* Placeholder during typing */}
                {frame < 60 && (
                  <div
                    style={{
                      color: theme.colors.muted,
                      fontFamily: theme.fonts.sans,
                      fontSize: theme.fontSize.base,
                    }}
                  >
                    Waiting for message...
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>

        {/* Feature callout */}
        <Sequence from={150}>
          <FeatureCallout
            text="5 minutes vs 30 minutes • Professional tone • Ready to send"
            position="bottom"
            startFrame={0}
          />
        </Sequence>
      </MockBrowser>
    </AbsoluteFill>
  )
}
