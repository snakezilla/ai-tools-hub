import React from "react"
import { AbsoluteFill, useCurrentFrame, Sequence, interpolate } from "remotion"
import { MockBrowser, Typewriter, ThinkingIndicator, FeatureCallout } from "../components"
import { theme } from "../styles/theme"

export const ManusDemo: React.FC = () => {
  const frame = useCurrentFrame()

  const outputOpacity = interpolate(frame, [120, 140], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  })

  const taskProgress = interpolate(frame, [90, 180], [0, 100], {
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
      <MockBrowser url="manus.ai">
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
                backgroundColor: "#6366F1",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                color: "white",
                fontWeight: "bold",
                fontSize: 16,
              }}
            >
              M
            </div>
            <span
              style={{
                fontFamily: theme.fonts.sans,
                fontSize: theme.fontSize.lg,
                fontWeight: 600,
                color: theme.colors.foreground,
              }}
            >
              Manus AI
            </span>
          </div>

          {/* Task input area */}
          <div style={{ flex: 1, display: "flex", flexDirection: "column", gap: theme.spacing.lg }}>
            {/* User task */}
            <div
              style={{
                backgroundColor: theme.colors.card,
                border: `1px solid ${theme.colors.border}`,
                padding: theme.spacing.md,
                borderRadius: theme.borderRadius.lg,
              }}
            >
              <div
                style={{
                  fontSize: theme.fontSize.sm,
                  color: theme.colors.muted,
                  marginBottom: theme.spacing.xs,
                }}
              >
                Task Description
              </div>
              <Typewriter
                text="Research top 10 competitors in organic skincare market and create comparison spreadsheet"
                startFrame={5}
                charsPerSecond={30}
                textColor={theme.colors.foreground}
                cursorColor={theme.colors.accent}
              />
            </div>

            {/* Manus working area */}
            <div
              style={{
                backgroundColor: theme.colors.cardHover,
                padding: theme.spacing.md,
                borderRadius: theme.borderRadius.lg,
                minHeight: 160,
              }}
            >
              {frame >= 60 && frame < 120 && (
                <div style={{ display: "flex", flexDirection: "column", gap: theme.spacing.md }}>
                  <ThinkingIndicator label="Manus is working..." />
                  <div style={{ fontSize: theme.fontSize.sm, color: theme.colors.muted }}>
                    Browsing web • Analyzing data • Creating spreadsheet
                  </div>
                </div>
              )}

              {frame >= 120 && (
                <div style={{ opacity: outputOpacity }}>
                  <div style={{ display: "flex", alignItems: "center", gap: theme.spacing.md, marginBottom: theme.spacing.md }}>
                    <div
                      style={{
                        flex: 1,
                        height: 8,
                        backgroundColor: theme.colors.border,
                        borderRadius: theme.borderRadius.full,
                        overflow: "hidden",
                      }}
                    >
                      <div
                        style={{
                          width: `${taskProgress}%`,
                          height: "100%",
                          backgroundColor: theme.colors.success,
                          transition: "width 0.3s ease",
                        }}
                      />
                    </div>
                    <span style={{ fontSize: theme.fontSize.sm, color: theme.colors.success, fontWeight: 600 }}>
                      {Math.round(taskProgress)}%
                    </span>
                  </div>

                  <div
                    style={{
                      fontFamily: theme.fonts.sans,
                      fontSize: theme.fontSize.base,
                      color: theme.colors.foreground,
                      lineHeight: 1.6,
                    }}
                  >
                    <p style={{ margin: 0, marginBottom: 8 }}>
                      <span style={{ color: theme.colors.success }}>✓</span> Found 10 competitors
                    </p>
                    <p style={{ margin: 0, marginBottom: 8 }}>
                      <span style={{ color: theme.colors.success }}>✓</span> Analyzed pricing, products, reviews
                    </p>
                    <p style={{ margin: 0 }}>
                      <span style={{ color: theme.colors.success }}>✓</span> Spreadsheet ready for download
                    </p>
                  </div>
                </div>
              )}

              {frame < 60 && (
                <div style={{ color: theme.colors.muted, fontFamily: theme.fonts.sans }}>
                  Ready to start task...
                </div>
              )}
            </div>
          </div>
        </div>

        <Sequence from={150}>
          <FeatureCallout
            text="2 hours of research → 5 minutes • Works autonomously"
            position="bottom"
            startFrame={0}
          />
        </Sequence>
      </MockBrowser>
    </AbsoluteFill>
  )
}
