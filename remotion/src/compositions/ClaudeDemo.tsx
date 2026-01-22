import React from "react"
import { AbsoluteFill, useCurrentFrame, Sequence, interpolate, spring, useVideoConfig } from "remotion"

// Claude's actual dark theme colors
const claudeTheme = {
  bg: "#1C1917",
  bgLight: "#292524",
  text: "#E7E5E4",
  textMuted: "#A8A29E",
  accent: "#D4A574",
  accentDark: "#C9956A",
  inputBg: "#292524",
  border: "#44403C",
  success: "#22C55E",
}

// Animated cursor component
const AnimatedCursor: React.FC<{ x: number; y: number; clicking?: boolean }> = ({ x, y, clicking }) => {
  const frame = useCurrentFrame()
  const clickScale = clicking ? interpolate(frame % 10, [0, 5, 10], [1, 0.8, 1]) : 1

  return (
    <div
      style={{
        position: "absolute",
        left: x,
        top: y,
        transform: `scale(${clickScale})`,
        zIndex: 100,
      }}
    >
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
        <path
          d="M5.5 3.21V20.8c0 .45.54.67.85.35l4.86-4.86a.5.5 0 0 1 .35-.15h6.87a.5.5 0 0 0 .35-.85L6.35 2.86a.5.5 0 0 0-.85.35z"
          fill="white"
          stroke="#000"
          strokeWidth="1.5"
        />
      </svg>
      {clicking && (
        <div
          style={{
            position: "absolute",
            top: -10,
            left: -10,
            width: 44,
            height: 44,
            borderRadius: "50%",
            border: "2px solid rgba(255,255,255,0.5)",
            animation: "pulse 0.3s ease-out",
          }}
        />
      )}
    </div>
  )
}

// Claude logo/icon
const ClaudeLogo: React.FC<{ size?: number }> = ({ size = 24 }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none">
    <circle cx="12" cy="12" r="10" fill={claudeTheme.accent} />
    <path
      d="M12 6 L12 12 M12 12 L16 8 M12 12 L8 8 M12 12 L16 16 M12 12 L8 16 M12 12 L12 18 M12 12 L6 12 M12 12 L18 12"
      stroke="white"
      strokeWidth="1.5"
      strokeLinecap="round"
    />
  </svg>
)

// Scene 1: Intro with logo
const IntroScene: React.FC = () => {
  const frame = useCurrentFrame()
  const { fps } = useVideoConfig()

  const logoScale = spring({ frame, fps, config: { damping: 12, stiffness: 100 } })
  const textOpacity = interpolate(frame, [15, 35], [0, 1], { extrapolateRight: "clamp" })
  const subtitleOpacity = interpolate(frame, [35, 55], [0, 1], { extrapolateRight: "clamp" })

  return (
    <AbsoluteFill style={{ backgroundColor: claudeTheme.bg, justifyContent: "center", alignItems: "center" }}>
      <div style={{ textAlign: "center" }}>
        <div style={{ transform: `scale(${logoScale})`, marginBottom: 24 }}>
          <ClaudeLogo size={80} />
        </div>
        <h1
          style={{
            fontFamily: "system-ui, -apple-system, sans-serif",
            fontSize: 56,
            fontWeight: 300,
            color: claudeTheme.text,
            margin: 0,
            opacity: textOpacity,
            letterSpacing: "-0.02em",
          }}
        >
          Claude
        </h1>
        <p
          style={{
            fontFamily: "system-ui, -apple-system, sans-serif",
            fontSize: 20,
            color: claudeTheme.textMuted,
            margin: "12px 0 0 0",
            opacity: subtitleOpacity,
          }}
        >
          Get started in 2 minutes
        </p>
      </div>
    </AbsoluteFill>
  )
}

// Scene 2: Landing page with sign up
const LandingPageScene: React.FC = () => {
  const frame = useCurrentFrame()
  const { fps } = useVideoConfig()

  const pageOpacity = spring({ frame, fps, config: { damping: 15 } })
  const cursorX = interpolate(frame, [30, 60], [800, 475], { extrapolateRight: "clamp" })
  const cursorY = interpolate(frame, [30, 60], [500, 362], { extrapolateRight: "clamp" })
  const isClicking = frame >= 70 && frame < 80

  return (
    <AbsoluteFill style={{ backgroundColor: claudeTheme.bg }}>
      <div style={{ opacity: pageOpacity, width: "100%", height: "100%", position: "relative" }}>
        {/* Nav bar */}
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            padding: "20px 60px",
          }}
        >
          <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
            <ClaudeLogo size={28} />
            <span style={{ fontFamily: "system-ui", fontSize: 22, fontWeight: 500, color: claudeTheme.text }}>
              Claude
            </span>
          </div>
          <div style={{ display: "flex", gap: 32, alignItems: "center" }}>
            {["Meet Claude", "Platform", "Solutions", "Pricing", "Learn"].map((item) => (
              <span key={item} style={{ fontFamily: "system-ui", fontSize: 14, color: claudeTheme.textMuted }}>
                {item}
              </span>
            ))}
            <button
              style={{
                padding: "10px 20px",
                borderRadius: 8,
                border: `1px solid ${claudeTheme.border}`,
                background: "transparent",
                color: claudeTheme.text,
                fontSize: 14,
                fontFamily: "system-ui",
              }}
            >
              Try Claude
            </button>
          </div>
        </div>

        {/* Main content */}
        <div style={{ display: "flex", padding: "60px 100px", gap: 80 }}>
          {/* Left side - text and form */}
          <div style={{ flex: 1 }}>
            <h1
              style={{
                fontFamily: "Georgia, serif",
                fontSize: 64,
                fontWeight: 400,
                color: claudeTheme.text,
                margin: "0 0 16px 0",
                lineHeight: 1.1,
                fontStyle: "italic",
              }}
            >
              Impossible?
              <br />
              Possible.
            </h1>
            <p style={{ fontFamily: "system-ui", fontSize: 18, color: claudeTheme.textMuted, margin: "0 0 40px 0" }}>
              The AI for problem solvers
            </p>

            {/* Sign up form */}
            <div
              style={{
                backgroundColor: claudeTheme.bgLight,
                borderRadius: 16,
                padding: 32,
                maxWidth: 400,
              }}
            >
              <button
                style={{
                  width: "100%",
                  padding: "14px 20px",
                  borderRadius: 8,
                  border: `1px solid ${claudeTheme.border}`,
                  background: claudeTheme.bg,
                  color: claudeTheme.text,
                  fontSize: 15,
                  fontFamily: "system-ui",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  gap: 10,
                  cursor: "pointer",
                  transform: isClicking ? "scale(0.98)" : "scale(1)",
                  boxShadow: isClicking ? "0 0 0 3px rgba(212, 165, 116, 0.3)" : "none",
                }}
              >
                <span style={{ fontSize: 18 }}>G</span>
                Continue with Google
              </button>

              <div
                style={{
                  textAlign: "center",
                  color: claudeTheme.textMuted,
                  fontSize: 13,
                  margin: "16px 0",
                }}
              >
                OR
              </div>

              <input
                style={{
                  width: "100%",
                  padding: "14px 16px",
                  borderRadius: 8,
                  border: `1px solid ${claudeTheme.border}`,
                  background: claudeTheme.bg,
                  color: claudeTheme.textMuted,
                  fontSize: 15,
                  fontFamily: "system-ui",
                  boxSizing: "border-box",
                }}
                placeholder="Enter your email"
                readOnly
              />

              <button
                style={{
                  width: "100%",
                  padding: "14px 20px",
                  borderRadius: 8,
                  border: "none",
                  background: claudeTheme.text,
                  color: claudeTheme.bg,
                  fontSize: 15,
                  fontFamily: "system-ui",
                  marginTop: 12,
                }}
              >
                Continue with email
              </button>
            </div>
          </div>

          {/* Right side - placeholder for image */}
          <div
            style={{
              flex: 1,
              backgroundColor: claudeTheme.accent,
              borderRadius: 24,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              color: "white",
              fontSize: 48,
              fontFamily: "Georgia, serif",
              fontStyle: "italic",
            }}
          >
            {/* Decorative pattern */}
            <div style={{ opacity: 0.3, fontSize: 120 }}>{"{ }"}</div>
          </div>
        </div>

        {/* Animated cursor */}
        {frame >= 30 && <AnimatedCursor x={cursorX} y={cursorY} clicking={isClicking} />}
      </div>
    </AbsoluteFill>
  )
}

// Scene 3: Dashboard welcome
const DashboardScene: React.FC = () => {
  const frame = useCurrentFrame()
  const { fps } = useVideoConfig()

  const fadeIn = spring({ frame, fps, config: { damping: 15 } })

  return (
    <AbsoluteFill style={{ backgroundColor: claudeTheme.bg, justifyContent: "center", alignItems: "center" }}>
      <div style={{ textAlign: "center", opacity: fadeIn }}>
        {/* Greeting */}
        <div style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: 12, marginBottom: 40 }}>
          <ClaudeLogo size={32} />
          <h1
            style={{
              fontFamily: "Georgia, serif",
              fontSize: 48,
              fontWeight: 400,
              color: claudeTheme.text,
              margin: 0,
            }}
          >
            Afternoon, John
          </h1>
        </div>

        {/* Chat input */}
        <div
          style={{
            backgroundColor: claudeTheme.inputBg,
            borderRadius: 16,
            padding: "16px 20px",
            width: 600,
            border: `1px solid ${claudeTheme.border}`,
          }}
        >
          <div
            style={{
              fontFamily: "system-ui",
              fontSize: 16,
              color: claudeTheme.textMuted,
              textAlign: "left",
              marginBottom: 16,
            }}
          >
            How can I help you today?
          </div>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
            <div style={{ display: "flex", gap: 12 }}>
              <span style={{ color: claudeTheme.textMuted }}>+</span>
              <span style={{ color: claudeTheme.textMuted }}>&#9201;</span>
            </div>
            <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
              <span style={{ color: claudeTheme.textMuted, fontSize: 14 }}>Opus 4.5</span>
              <div
                style={{
                  width: 32,
                  height: 32,
                  borderRadius: 8,
                  backgroundColor: claudeTheme.accent,
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  color: "white",
                }}
              >
                ↑
              </div>
            </div>
          </div>
        </div>

        {/* Quick actions */}
        <div style={{ display: "flex", gap: 12, justifyContent: "center", marginTop: 20 }}>
          {["Learn", "Code", "Create", "Write", "Life stuff"].map((action) => (
            <div
              key={action}
              style={{
                padding: "8px 16px",
                borderRadius: 20,
                border: `1px solid ${claudeTheme.border}`,
                color: claudeTheme.textMuted,
                fontSize: 14,
                fontFamily: "system-ui",
              }}
            >
              {action}
            </div>
          ))}
        </div>
      </div>
    </AbsoluteFill>
  )
}

// Scene 4: Typing prompt
const TypingScene: React.FC = () => {
  const frame = useCurrentFrame()
  const { fps } = useVideoConfig()

  const prompt = "Help me draft a professional email to reschedule a client meeting for next Tuesday"
  const charsToShow = Math.min(Math.floor(frame * 1.2), prompt.length)
  const displayedText = prompt.slice(0, charsToShow)
  const cursorOpacity = frame % 30 < 15 ? 1 : 0.3

  return (
    <AbsoluteFill style={{ backgroundColor: claudeTheme.bg, justifyContent: "center", alignItems: "center" }}>
      <div style={{ textAlign: "center" }}>
        {/* Greeting */}
        <div style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: 12, marginBottom: 40 }}>
          <ClaudeLogo size={32} />
          <h1
            style={{
              fontFamily: "Georgia, serif",
              fontSize: 48,
              fontWeight: 400,
              color: claudeTheme.text,
              margin: 0,
            }}
          >
            Afternoon, John
          </h1>
        </div>

        {/* Chat input with typing */}
        <div
          style={{
            backgroundColor: claudeTheme.inputBg,
            borderRadius: 16,
            padding: "16px 20px",
            width: 700,
            border: `1px solid ${claudeTheme.accent}`,
            boxShadow: `0 0 0 1px ${claudeTheme.accent}`,
          }}
        >
          <div
            style={{
              fontFamily: "system-ui",
              fontSize: 16,
              color: claudeTheme.text,
              textAlign: "left",
              marginBottom: 16,
              minHeight: 24,
            }}
          >
            {displayedText}
            <span
              style={{
                display: "inline-block",
                width: 2,
                height: 20,
                backgroundColor: claudeTheme.accent,
                marginLeft: 2,
                opacity: cursorOpacity,
                verticalAlign: "text-bottom",
              }}
            />
          </div>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
            <div style={{ display: "flex", gap: 12 }}>
              <span style={{ color: claudeTheme.textMuted }}>+</span>
              <span style={{ color: claudeTheme.textMuted }}>&#9201;</span>
            </div>
            <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
              <span style={{ color: claudeTheme.textMuted, fontSize: 14 }}>Opus 4.5</span>
              <div
                style={{
                  width: 32,
                  height: 32,
                  borderRadius: 8,
                  backgroundColor: claudeTheme.accent,
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  color: "white",
                }}
              >
                ↑
              </div>
            </div>
          </div>
        </div>
      </div>
    </AbsoluteFill>
  )
}

// Scene 5: Response
const ResponseScene: React.FC = () => {
  const frame = useCurrentFrame()
  const { fps } = useVideoConfig()

  const responseOpacity = spring({ frame: frame - 30, fps, config: { damping: 15 } })

  const response = `Subject: Request to Reschedule Our Meeting

Dear Sarah,

I hope this message finds you well. Due to an unexpected scheduling conflict, I need to reschedule our meeting originally planned for this Thursday.

Would Tuesday, January 28th work for you instead? I'm available anytime between 10 AM and 4 PM.

Please let me know what time works best for your schedule.

Best regards,
John`

  const linesToShow = Math.min(Math.floor((frame - 30) / 8), response.split("\n").length)
  const displayedResponse = response.split("\n").slice(0, linesToShow).join("\n")

  return (
    <AbsoluteFill style={{ backgroundColor: claudeTheme.bg, padding: 60 }}>
      <div style={{ maxWidth: 900, margin: "0 auto" }}>
        {/* User message */}
        <div style={{ display: "flex", justifyContent: "flex-end", marginBottom: 24 }}>
          <div
            style={{
              backgroundColor: claudeTheme.bgLight,
              borderRadius: 16,
              padding: "16px 20px",
              maxWidth: "70%",
            }}
          >
            <p style={{ fontFamily: "system-ui", fontSize: 16, color: claudeTheme.text, margin: 0 }}>
              Help me draft a professional email to reschedule a client meeting for next Tuesday
            </p>
          </div>
        </div>

        {/* Claude response */}
        <div style={{ display: "flex", gap: 16, opacity: responseOpacity > 0 ? 1 : 0 }}>
          <ClaudeLogo size={32} />
          <div style={{ flex: 1 }}>
            {frame < 30 ? (
              <div style={{ display: "flex", gap: 6, padding: "16px 0" }}>
                {[0, 1, 2].map((i) => (
                  <div
                    key={i}
                    style={{
                      width: 8,
                      height: 8,
                      borderRadius: "50%",
                      backgroundColor: claudeTheme.accent,
                      opacity: interpolate((frame + i * 10) % 30, [0, 15, 30], [0.3, 1, 0.3]),
                    }}
                  />
                ))}
              </div>
            ) : (
              <div
                style={{
                  fontFamily: "system-ui",
                  fontSize: 16,
                  color: claudeTheme.text,
                  lineHeight: 1.7,
                  whiteSpace: "pre-wrap",
                  opacity: responseOpacity,
                }}
              >
                {displayedResponse}
              </div>
            )}
          </div>
        </div>
      </div>
    </AbsoluteFill>
  )
}

// Scene 6: Outro
const OutroScene: React.FC = () => {
  const frame = useCurrentFrame()
  const { fps } = useVideoConfig()

  const scale = spring({ frame, fps, config: { damping: 12, stiffness: 100 } })
  const checkOpacity = interpolate(frame, [20, 40], [0, 1], { extrapolateRight: "clamp" })
  const coworkOpacity = interpolate(frame, [50, 70], [0, 1], { extrapolateRight: "clamp" })
  const coworkSlide = interpolate(frame, [50, 70], [20, 0], { extrapolateRight: "clamp" })

  return (
    <AbsoluteFill style={{ backgroundColor: claudeTheme.bg, justifyContent: "center", alignItems: "center" }}>
      <div style={{ textAlign: "center" }}>
        {/* Success check */}
        <div
          style={{
            transform: `scale(${scale})`,
            width: 80,
            height: 80,
            borderRadius: "50%",
            backgroundColor: claudeTheme.success,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            margin: "0 auto 20px auto",
          }}
        >
          <span style={{ fontSize: 40, color: "white", opacity: checkOpacity }}>&#10003;</span>
        </div>

        <h1
          style={{
            fontFamily: "system-ui",
            fontSize: 36,
            fontWeight: 600,
            color: claudeTheme.text,
            margin: "0 0 8px 0",
          }}
        >
          {"You're all set!"}
        </h1>

        <p style={{ fontFamily: "system-ui", fontSize: 18, color: claudeTheme.textMuted, margin: "0 0 24px 0" }}>
          Start using Claude at claude.ai
        </p>

        <div
          style={{
            display: "inline-block",
            padding: "10px 24px",
            borderRadius: 12,
            backgroundColor: claudeTheme.accent,
            color: "white",
            fontSize: 15,
            fontWeight: 500,
            fontFamily: "system-ui",
          }}
        >
          Time saved: 5-10 hrs/week
        </div>

        {/* Claude Cowork CTA */}
        <div
          style={{
            marginTop: 32,
            opacity: coworkOpacity,
            transform: `translateY(${coworkSlide}px)`,
          }}
        >
          <div
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: 8,
              padding: "12px 24px",
              borderRadius: 12,
              border: `1px solid ${claudeTheme.border}`,
              backgroundColor: claudeTheme.bgLight,
            }}
          >
            <span style={{ fontSize: 18 }}>🚀</span>
            <div style={{ textAlign: "left" }}>
              <p
                style={{
                  fontFamily: "system-ui",
                  fontSize: 15,
                  fontWeight: 600,
                  color: claudeTheme.accent,
                  margin: 0,
                }}
              >
                Level up → Claude Cowork
              </p>
              <p
                style={{
                  fontFamily: "system-ui",
                  fontSize: 13,
                  color: claudeTheme.textMuted,
                  margin: "4px 0 0 0",
                }}
              >
                AI with perfect memory of your entire screen history
              </p>
            </div>
          </div>
        </div>

        {/* Branding */}
        <p style={{ fontFamily: "system-ui", fontSize: 13, color: claudeTheme.textMuted, marginTop: 28 }}>
          practicallibrary.com
        </p>
      </div>
    </AbsoluteFill>
  )
}

// Main composition - 15 seconds total (450 frames at 30fps)
export const ClaudeDemo: React.FC = () => {
  return (
    <AbsoluteFill>
      {/* Intro - 2 seconds */}
      <Sequence from={0} durationInFrames={60}>
        <IntroScene />
      </Sequence>

      {/* Landing page - 3 seconds */}
      <Sequence from={60} durationInFrames={90}>
        <LandingPageScene />
      </Sequence>

      {/* Dashboard - 2 seconds */}
      <Sequence from={150} durationInFrames={60}>
        <DashboardScene />
      </Sequence>

      {/* Typing - 3 seconds */}
      <Sequence from={210} durationInFrames={90}>
        <TypingScene />
      </Sequence>

      {/* Response - 3 seconds */}
      <Sequence from={300} durationInFrames={90}>
        <ResponseScene />
      </Sequence>

      {/* Outro - 3.5 seconds */}
      <Sequence from={390} durationInFrames={105}>
        <OutroScene />
      </Sequence>
    </AbsoluteFill>
  )
}
