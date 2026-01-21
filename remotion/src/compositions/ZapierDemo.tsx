import React from "react"
import { AbsoluteFill, useCurrentFrame, Sequence, interpolate } from "remotion"
import { MockBrowser, Typewriter, FeatureCallout } from "../components"
import { theme } from "../styles/theme"

export const ZapierDemo: React.FC = () => {
  const frame = useCurrentFrame()

  const step1Opacity = interpolate(frame, [60, 80], [0, 1], { extrapolateLeft: "clamp", extrapolateRight: "clamp" })
  const step2Opacity = interpolate(frame, [100, 120], [0, 1], { extrapolateLeft: "clamp", extrapolateRight: "clamp" })
  const step3Opacity = interpolate(frame, [140, 160], [0, 1], { extrapolateLeft: "clamp", extrapolateRight: "clamp" })
  const successOpacity = interpolate(frame, [170, 190], [0, 1], { extrapolateLeft: "clamp", extrapolateRight: "clamp" })

  return (
    <AbsoluteFill
      style={{
        backgroundColor: theme.colors.background,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <MockBrowser url="zapier.com">
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
                backgroundColor: "#FF4A00",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                color: "white",
                fontWeight: "bold",
                fontSize: 16,
              }}
            >
              ⚡
            </div>
            <span
              style={{
                fontFamily: theme.fonts.sans,
                fontSize: theme.fontSize.lg,
                fontWeight: 600,
                color: theme.colors.foreground,
              }}
            >
              Zapier
            </span>
          </div>

          {/* Prompt area */}
          <div
            style={{
              backgroundColor: theme.colors.card,
              border: `1px solid ${theme.colors.border}`,
              padding: theme.spacing.md,
              borderRadius: theme.borderRadius.lg,
              marginBottom: theme.spacing.lg,
            }}
          >
            <div style={{ fontSize: theme.fontSize.sm, color: theme.colors.muted, marginBottom: theme.spacing.xs }}>
              Describe your workflow
            </div>
            <Typewriter
              text="When I get a new email with an invoice, save the attachment to Google Drive and notify me on Slack"
              startFrame={5}
              charsPerSecond={30}
              textColor={theme.colors.foreground}
              cursorColor={theme.colors.accent}
            />
          </div>

          {/* Workflow visualization */}
          <div
            style={{
              flex: 1,
              display: "flex",
              flexDirection: "column",
              gap: theme.spacing.md,
            }}
          >
            {/* Step 1 */}
            <div
              style={{
                opacity: step1Opacity,
                display: "flex",
                alignItems: "center",
                gap: theme.spacing.md,
                padding: theme.spacing.md,
                backgroundColor: theme.colors.cardHover,
                borderRadius: theme.borderRadius.lg,
                border: `1px solid ${theme.colors.border}`,
              }}
            >
              <div
                style={{
                  width: 40,
                  height: 40,
                  borderRadius: theme.borderRadius.md,
                  backgroundColor: "#EA4335",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  color: "white",
                  fontSize: 20,
                }}
              >
                ✉
              </div>
              <div>
                <div style={{ fontWeight: 600, color: theme.colors.foreground }}>Gmail</div>
                <div style={{ fontSize: theme.fontSize.sm, color: theme.colors.muted }}>
                  Trigger: New email with attachment
                </div>
              </div>
            </div>

            {/* Arrow */}
            {frame >= 100 && (
              <div style={{ textAlign: "center", color: theme.colors.muted, fontSize: 20 }}>↓</div>
            )}

            {/* Step 2 */}
            <div
              style={{
                opacity: step2Opacity,
                display: "flex",
                alignItems: "center",
                gap: theme.spacing.md,
                padding: theme.spacing.md,
                backgroundColor: theme.colors.cardHover,
                borderRadius: theme.borderRadius.lg,
                border: `1px solid ${theme.colors.border}`,
              }}
            >
              <div
                style={{
                  width: 40,
                  height: 40,
                  borderRadius: theme.borderRadius.md,
                  backgroundColor: "#4285F4",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  color: "white",
                  fontSize: 20,
                }}
              >
                📁
              </div>
              <div>
                <div style={{ fontWeight: 600, color: theme.colors.foreground }}>Google Drive</div>
                <div style={{ fontSize: theme.fontSize.sm, color: theme.colors.muted }}>
                  Action: Save attachment to /Invoices
                </div>
              </div>
            </div>

            {/* Arrow */}
            {frame >= 140 && (
              <div style={{ textAlign: "center", color: theme.colors.muted, fontSize: 20 }}>↓</div>
            )}

            {/* Step 3 */}
            <div
              style={{
                opacity: step3Opacity,
                display: "flex",
                alignItems: "center",
                gap: theme.spacing.md,
                padding: theme.spacing.md,
                backgroundColor: theme.colors.cardHover,
                borderRadius: theme.borderRadius.lg,
                border: `1px solid ${theme.colors.border}`,
              }}
            >
              <div
                style={{
                  width: 40,
                  height: 40,
                  borderRadius: theme.borderRadius.md,
                  backgroundColor: "#4A154B",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  color: "white",
                  fontSize: 20,
                }}
              >
                #
              </div>
              <div>
                <div style={{ fontWeight: 600, color: theme.colors.foreground }}>Slack</div>
                <div style={{ fontSize: theme.fontSize.sm, color: theme.colors.muted }}>
                  Action: Send notification to #finance
                </div>
              </div>
            </div>

            {/* Success message */}
            {frame >= 170 && (
              <div
                style={{
                  opacity: successOpacity,
                  textAlign: "center",
                  padding: theme.spacing.md,
                  backgroundColor: "#10B98120",
                  borderRadius: theme.borderRadius.lg,
                  color: theme.colors.success,
                  fontWeight: 600,
                }}
              >
                ✓ Zap created and ready to run!
              </div>
            )}
          </div>
        </div>

        <Sequence from={150}>
          <FeatureCallout
            text="No code required • 5,000+ app integrations • Runs 24/7"
            position="bottom"
            startFrame={0}
          />
        </Sequence>
      </MockBrowser>
    </AbsoluteFill>
  )
}
