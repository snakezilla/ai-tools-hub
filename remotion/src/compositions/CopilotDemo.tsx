import React from "react"
import { AbsoluteFill, useCurrentFrame, Sequence, interpolate } from "remotion"
import { MockBrowser, Typewriter, ThinkingIndicator, FeatureCallout } from "../components"
import { theme } from "../styles/theme"

export const CopilotDemo: React.FC = () => {
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
      <MockBrowser url="microsoft365.com">
        <div style={{ display: "flex", flexDirection: "column", height: "100%" }}>
          {/* Header - Microsoft style */}
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
                borderRadius: theme.borderRadius.sm,
                background: "linear-gradient(135deg, #00A4EF 0%, #7FBA00 50%, #F25022 100%)",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                color: "white",
                fontWeight: "bold",
                fontSize: 14,
              }}
            >
              ✦
            </div>
            <span
              style={{
                fontFamily: theme.fonts.sans,
                fontSize: theme.fontSize.lg,
                fontWeight: 600,
                color: theme.colors.foreground,
              }}
            >
              Microsoft Copilot
            </span>
          </div>

          {/* Excel context indicator */}
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: theme.spacing.sm,
              marginBottom: theme.spacing.md,
              padding: theme.spacing.sm,
              backgroundColor: "#217346",
              borderRadius: theme.borderRadius.sm,
              color: "white",
              fontSize: theme.fontSize.sm,
            }}
          >
            <span>📊</span>
            <span>Working in: Q4_Sales_Data.xlsx</span>
          </div>

          {/* Chat area */}
          <div style={{ flex: 1, display: "flex", flexDirection: "column", gap: theme.spacing.lg }}>
            {/* User message */}
            <div style={{ display: "flex", justifyContent: "flex-end" }}>
              <div
                style={{
                  maxWidth: "70%",
                  backgroundColor: "#0078D4",
                  color: "white",
                  padding: theme.spacing.md,
                  borderRadius: theme.borderRadius.lg,
                  fontFamily: theme.fonts.sans,
                  fontSize: theme.fontSize.base,
                }}
              >
                <Typewriter
                  text="Create a pivot table showing sales by region and quarter"
                  startFrame={5}
                  charsPerSecond={25}
                  textColor="white"
                  cursorColor="white"
                />
              </div>
            </div>

            {/* Copilot response area */}
            <div style={{ display: "flex", justifyContent: "flex-start" }}>
              <div
                style={{
                  maxWidth: "80%",
                  backgroundColor: theme.colors.cardHover,
                  padding: theme.spacing.md,
                  borderRadius: theme.borderRadius.lg,
                  minHeight: 160,
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                {frame >= 60 && frame < 120 && (
                  <ThinkingIndicator label="Copilot is analyzing your data..." />
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
                      <p style={{ margin: 0, marginBottom: 12 }}>
                        <span style={{ color: theme.colors.success }}>✓</span> Created pivot table on new sheet
                      </p>
                      <div
                        style={{
                          backgroundColor: theme.colors.card,
                          border: `1px solid ${theme.colors.border}`,
                          borderRadius: theme.borderRadius.sm,
                          padding: theme.spacing.sm,
                          marginBottom: 12,
                          fontFamily: theme.fonts.mono,
                          fontSize: theme.fontSize.sm,
                        }}
                      >
                        <div>Region | Q1 | Q2 | Q3 | Q4</div>
                        <div>North | $45K | $52K | $48K | $61K</div>
                        <div>South | $38K | $41K | $44K | $55K</div>
                      </div>
                      <p
                        style={{
                          margin: 0,
                          color: theme.colors.success,
                          fontWeight: 500,
                          fontSize: theme.fontSize.sm,
                        }}
                      >
                        Pivot table created • Charts available
                      </p>
                    </div>
                  </div>
                )}

                {frame < 60 && (
                  <div style={{ color: theme.colors.muted, fontFamily: theme.fonts.sans }}>
                    Ready to help with your spreadsheet...
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>

        <Sequence from={150}>
          <FeatureCallout
            text="No formulas to learn • Works with your existing files"
            position="bottom"
            startFrame={0}
          />
        </Sequence>
      </MockBrowser>
    </AbsoluteFill>
  )
}
