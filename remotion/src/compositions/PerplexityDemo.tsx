import React from "react"
import { AbsoluteFill, useCurrentFrame, Sequence, interpolate } from "remotion"
import { MockBrowser, Typewriter, ThinkingIndicator, FeatureCallout } from "../components"
import { theme } from "../styles/theme"

export const PerplexityDemo: React.FC = () => {
  const frame = useCurrentFrame()

  const outputOpacity = interpolate(frame, [120, 140], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  })

  const sourcesOpacity = interpolate(frame, [160, 180], [0, 1], {
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
      <MockBrowser url="perplexity.ai">
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
                borderRadius: theme.borderRadius.full,
                backgroundColor: "#20B2AA",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                color: "white",
                fontWeight: "bold",
                fontSize: 16,
              }}
            >
              P
            </div>
            <span
              style={{
                fontFamily: theme.fonts.sans,
                fontSize: theme.fontSize.lg,
                fontWeight: 600,
                color: theme.colors.foreground,
              }}
            >
              Perplexity
            </span>
          </div>

          {/* Search area */}
          <div style={{ flex: 1, display: "flex", flexDirection: "column", gap: theme.spacing.lg }}>
            {/* User query */}
            <div
              style={{
                backgroundColor: theme.colors.card,
                border: `1px solid ${theme.colors.border}`,
                padding: theme.spacing.md,
                borderRadius: theme.borderRadius.lg,
              }}
            >
              <Typewriter
                text="What are the best practices for home office ergonomics in 2024?"
                startFrame={5}
                charsPerSecond={28}
                textColor={theme.colors.foreground}
                cursorColor={theme.colors.accent}
              />
            </div>

            {/* Response area */}
            <div
              style={{
                backgroundColor: theme.colors.cardHover,
                padding: theme.spacing.md,
                borderRadius: theme.borderRadius.lg,
                minHeight: 200,
              }}
            >
              {frame >= 60 && frame < 120 && (
                <div style={{ display: "flex", flexDirection: "column", gap: theme.spacing.sm }}>
                  <ThinkingIndicator label="Searching the web..." />
                  <div style={{ fontSize: theme.fontSize.sm, color: theme.colors.muted }}>
                    Analyzing 12 sources...
                  </div>
                </div>
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
                      Home Office Ergonomics Best Practices (2024):
                    </p>
                    <p style={{ margin: 0, marginBottom: 8 }}>
                      <strong>1. Monitor Position:</strong> Top of screen at eye level, arm's length away
                    </p>
                    <p style={{ margin: 0, marginBottom: 8 }}>
                      <strong>2. Chair Setup:</strong> Feet flat, knees at 90°, lumbar support
                    </p>
                    <p style={{ margin: 0, marginBottom: 12 }}>
                      <strong>3. Break Schedule:</strong> 20-20-20 rule for eye strain
                    </p>
                  </div>

                  {/* Sources */}
                  <div style={{ opacity: sourcesOpacity, marginTop: theme.spacing.md }}>
                    <div
                      style={{
                        fontSize: theme.fontSize.sm,
                        color: theme.colors.muted,
                        marginBottom: theme.spacing.xs,
                      }}
                    >
                      Sources:
                    </div>
                    <div style={{ display: "flex", gap: theme.spacing.sm, flexWrap: "wrap" }}>
                      {["Mayo Clinic", "OSHA", "Ergonomics Today"].map((source) => (
                        <span
                          key={source}
                          style={{
                            padding: "4px 8px",
                            backgroundColor: theme.colors.card,
                            border: `1px solid ${theme.colors.border}`,
                            borderRadius: theme.borderRadius.sm,
                            fontSize: theme.fontSize.sm,
                            color: theme.colors.accent,
                          }}
                        >
                          {source}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              )}

              {frame < 60 && (
                <div style={{ color: theme.colors.muted, fontFamily: theme.fonts.sans }}>
                  Ask anything...
                </div>
              )}
            </div>
          </div>
        </div>

        <Sequence from={150}>
          <FeatureCallout
            text="Real-time web search • Cited sources • No ads or SEO spam"
            position="bottom"
            startFrame={0}
          />
        </Sequence>
      </MockBrowser>
    </AbsoluteFill>
  )
}
