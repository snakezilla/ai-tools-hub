import React from "react"
import { AbsoluteFill, useCurrentFrame, Sequence, interpolate } from "remotion"
import { MockBrowser, Typewriter, ThinkingIndicator, FeatureCallout } from "../components"
import { theme } from "../styles/theme"

export const ChatGPTDemo: React.FC = () => {
  const frame = useCurrentFrame()

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
      <MockBrowser url="chat.openai.com">
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
                backgroundColor: "#10A37F",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                color: "white",
                fontWeight: "bold",
                fontSize: 16,
              }}
            >
              G
            </div>
            <span
              style={{
                fontFamily: theme.fonts.sans,
                fontSize: theme.fontSize.lg,
                fontWeight: 600,
                color: theme.colors.foreground,
              }}
            >
              ChatGPT
            </span>
          </div>

          {/* Chat area */}
          <div style={{ flex: 1, display: "flex", flexDirection: "column", gap: theme.spacing.lg }}>
            {/* User message */}
            <div style={{ display: "flex", justifyContent: "flex-end" }}>
              <div
                style={{
                  maxWidth: "70%",
                  backgroundColor: "#10A37F",
                  color: "white",
                  padding: theme.spacing.md,
                  borderRadius: theme.borderRadius.lg,
                  fontFamily: theme.fonts.sans,
                  fontSize: theme.fontSize.base,
                }}
              >
                <Typewriter
                  text="Explain how compound interest works for my retirement savings"
                  startFrame={5}
                  charsPerSecond={25}
                  textColor="white"
                  cursorColor="white"
                />
              </div>
            </div>

            {/* ChatGPT response area */}
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
                {frame >= 60 && frame < 120 && (
                  <ThinkingIndicator label="ChatGPT is thinking..." />
                )}

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
                      <p style={{ margin: 0, marginBottom: 12, fontWeight: 600 }}>
                        Compound Interest Explained Simply:
                      </p>
                      <p style={{ margin: 0, marginBottom: 12 }}>
                        Think of compound interest as "interest on interest." When you save $10,000 at 7% annually...
                      </p>
                      <p style={{ margin: 0, marginBottom: 12 }}>
                        Year 1: $10,700 → Year 10: $19,672 → Year 30: $76,123
                      </p>
                      <p
                        style={{
                          margin: 0,
                          color: theme.colors.success,
                          fontWeight: 500,
                          fontSize: theme.fontSize.sm,
                        }}
                      >
                        Complex concept → Simple explanation in seconds
                      </p>
                    </div>
                  </div>
                )}

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

        <Sequence from={150}>
          <FeatureCallout
            text="Personal financial tutor • Available 24/7 • No judgment"
            position="bottom"
            startFrame={0}
          />
        </Sequence>
      </MockBrowser>
    </AbsoluteFill>
  )
}
