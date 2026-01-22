import React from "react"
import {
  AbsoluteFill,
  useCurrentFrame,
  interpolate,
  spring,
  useVideoConfig,
  Sequence,
  Easing,
} from "remotion"

// Manus hand logo
const ManusLogo: React.FC<{ size?: number; color?: string }> = ({
  size = 64,
  color = "#ffffff",
}) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 64 64"
    fill="none"
    style={{ display: "block" }}
  >
    {/* Stylized OK hand gesture */}
    <circle cx="32" cy="32" r="10" fill={color} opacity={0.3} />
    <path
      d="M32 8c-2 0-4 1-5 3l-2 4c-1 2-2 5-1 7l1 4-8-2c-3-1-6 1-6 4s2 5 5 5l12 2v8c0 3 2 5 5 5s5-2 5-5v-8l12-2c3 0 5-2 5-5s-3-5-6-4l-8 2 1-4c1-2 0-5-1-7l-2-4c-1-2-3-3-5-3z"
      fill={color}
    />
    {/* Sparkle effects */}
    <circle cx="18" cy="12" r="2" fill={color} opacity={0.6} />
    <circle cx="46" cy="12" r="2" fill={color} opacity={0.6} />
    <circle cx="14" cy="20" r="1.5" fill={color} opacity={0.4} />
    <circle cx="50" cy="20" r="1.5" fill={color} opacity={0.4} />
  </svg>
)

// File attachment component
const FileAttachment: React.FC<{
  name: string
  type: "text" | "pdf"
  size: string
  opacity: number
}> = ({ name, type, size, opacity }) => (
  <div
    style={{
      display: "flex",
      alignItems: "center",
      gap: 12,
      padding: "12px 16px",
      backgroundColor: "#2a2a2a",
      borderRadius: 8,
      opacity,
      transform: `translateY(${(1 - opacity) * 10}px)`,
    }}
  >
    <div
      style={{
        width: 36,
        height: 36,
        borderRadius: 6,
        backgroundColor: type === "pdf" ? "#dc2626" : "#3b82f6",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        color: "#ffffff",
        fontSize: 12,
        fontWeight: 600,
      }}
    >
      {type === "pdf" ? "PDF" : "TXT"}
    </div>
    <div style={{ flex: 1 }}>
      <div
        style={{
          color: "#e5e5e5",
          fontSize: 14,
          fontWeight: 500,
          marginBottom: 2,
          overflow: "hidden",
          textOverflow: "ellipsis",
          whiteSpace: "nowrap",
          maxWidth: 180,
        }}
      >
        {name}
      </div>
      <div style={{ color: "#888888", fontSize: 12 }}>
        {type.toUpperCase()} · {size}
      </div>
    </div>
  </div>
)

// Task step component
const TaskStep: React.FC<{
  text: string
  completed: boolean
  opacity: number
  progress?: number
}> = ({ text, completed, opacity, progress }) => (
  <div
    style={{
      display: "flex",
      alignItems: "center",
      gap: 12,
      opacity,
      transform: `translateX(${(1 - opacity) * 20}px)`,
    }}
  >
    <div
      style={{
        width: 20,
        height: 20,
        borderRadius: 4,
        backgroundColor: completed ? "#10b981" : "#3a3a3a",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        color: "#ffffff",
        fontSize: 12,
      }}
    >
      {completed ? "✓" : ""}
    </div>
    <div style={{ flex: 1 }}>
      <div style={{ color: "#d4d4d4", fontSize: 14 }}>{text}</div>
      {progress !== undefined && progress < 100 && (
        <div
          style={{
            marginTop: 6,
            height: 4,
            backgroundColor: "#3a3a3a",
            borderRadius: 2,
            overflow: "hidden",
          }}
        >
          <div
            style={{
              width: `${progress}%`,
              height: "100%",
              backgroundColor: "#10b981",
              borderRadius: 2,
            }}
          />
        </div>
      )}
    </div>
  </div>
)

export const ManusDemo: React.FC = () => {
  const frame = useCurrentFrame()
  const { fps } = useVideoConfig()

  // Scene timing (total ~25 seconds = 750 frames at 30fps)
  // Scene 1: Sign-in page (0-180 frames, 0-6s)
  // Scene 2: Transition (180-210 frames, 6-7s)
  // Scene 3: Chat interface - user message (210-360 frames, 7-12s)
  // Scene 4: Manus response (360-600 frames, 12-20s)
  // Scene 5: Outro (600-750 frames, 20-25s)

  // Sign-in page animations
  const logoScale = spring({
    frame,
    fps,
    config: { damping: 12, stiffness: 80 },
  })

  const signInTitleOpacity = interpolate(frame, [20, 50], [0, 1], {
    extrapolateRight: "clamp",
  })

  const button1Opacity = interpolate(frame, [40, 60], [0, 1], {
    extrapolateRight: "clamp",
  })
  const button2Opacity = interpolate(frame, [50, 70], [0, 1], {
    extrapolateRight: "clamp",
  })
  const button3Opacity = interpolate(frame, [60, 80], [0, 1], {
    extrapolateRight: "clamp",
  })

  const successScale = spring({
    frame: frame - 120,
    fps,
    config: { damping: 10, stiffness: 120 },
  })

  // Chat interface animations
  const chatOpacity = interpolate(frame, [210, 240], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  })

  // User message typing
  const userMessage =
    "I need to synthesize this report into a one-page poster using the provided template and style guide. Ask me any questions."
  const messageChars = Math.floor(
    interpolate(frame, [260, 380], [0, userMessage.length], {
      extrapolateLeft: "clamp",
      extrapolateRight: "clamp",
      easing: Easing.linear,
    })
  )

  // File attachments appear
  const file1Opacity = interpolate(frame, [300, 320], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  })
  const file2Opacity = interpolate(frame, [320, 340], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  })
  const file3Opacity = interpolate(frame, [340, 360], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  })

  // Manus response
  const responseOpacity = interpolate(frame, [400, 420], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  })

  // Task steps
  const step1Opacity = interpolate(frame, [450, 470], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  })
  const step1Progress = interpolate(frame, [470, 500], [0, 100], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  })
  const step2Opacity = interpolate(frame, [500, 520], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  })
  const step2Progress = interpolate(frame, [520, 560], [0, 100], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  })
  const step3Opacity = interpolate(frame, [560, 580], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  })
  const step3Progress = interpolate(frame, [580, 620], [0, 100], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  })

  // Transition between scenes
  const signInVisible = frame < 200
  const chatVisible = frame >= 200

  return (
    <AbsoluteFill style={{ backgroundColor: "#0a0a0a" }}>
      {/* Dot pattern background */}
      <div
        style={{
          position: "absolute",
          inset: 0,
          backgroundImage:
            "radial-gradient(circle, #333333 1px, transparent 1px)",
          backgroundSize: "24px 24px",
          opacity: 0.3,
        }}
      />

      {/* Scene 1: Sign-in Page */}
      {signInVisible && (
        <Sequence from={0} durationInFrames={200}>
          <AbsoluteFill
            style={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              justifyContent: "center",
              opacity: interpolate(frame, [180, 200], [1, 0], {
                extrapolateLeft: "clamp",
                extrapolateRight: "clamp",
              }),
            }}
          >
            {/* Header with logo */}
            <div
              style={{
                position: "absolute",
                top: 24,
                left: 32,
                display: "flex",
                alignItems: "center",
                gap: 12,
              }}
            >
              <ManusLogo size={32} />
              <span
                style={{
                  fontFamily: "Inter, system-ui, sans-serif",
                  fontSize: 20,
                  fontWeight: 600,
                  color: "#ffffff",
                }}
              >
                manus
              </span>
            </div>

            {/* Sign-in card */}
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                width: 420,
              }}
            >
              <div style={{ transform: `scale(${logoScale})`, marginBottom: 32 }}>
                <ManusLogo size={80} />
              </div>

              <h1
                style={{
                  fontFamily: "Inter, system-ui, sans-serif",
                  fontSize: 32,
                  fontWeight: 600,
                  color: "#ffffff",
                  margin: 0,
                  marginBottom: 8,
                  opacity: signInTitleOpacity,
                }}
              >
                Sign in or sign up
              </h1>
              <p
                style={{
                  fontFamily: "Inter, system-ui, sans-serif",
                  fontSize: 16,
                  color: "#888888",
                  margin: 0,
                  marginBottom: 40,
                  opacity: signInTitleOpacity,
                }}
              >
                Start creating with Manus
              </p>

              {/* Sign-in buttons */}
              <div style={{ display: "flex", flexDirection: "column", gap: 12, width: "100%" }}>
                <button
                  style={{
                    width: "100%",
                    padding: "14px 20px",
                    backgroundColor: "#2a2a2a",
                    border: "1px solid #3a3a3a",
                    borderRadius: 8,
                    color: "#ffffff",
                    fontSize: 15,
                    fontWeight: 500,
                    fontFamily: "Inter, system-ui, sans-serif",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    gap: 10,
                    cursor: "pointer",
                    opacity: button1Opacity,
                    transform: `translateY(${(1 - button1Opacity) * 10}px)`,
                  }}
                >
                  <span style={{ fontSize: 18 }}>G</span>
                  Continue with Google
                </button>

                <button
                  style={{
                    width: "100%",
                    padding: "14px 20px",
                    backgroundColor: "#2a2a2a",
                    border: "1px solid #3a3a3a",
                    borderRadius: 8,
                    color: "#ffffff",
                    fontSize: 15,
                    fontWeight: 500,
                    fontFamily: "Inter, system-ui, sans-serif",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    gap: 10,
                    cursor: "pointer",
                    opacity: button2Opacity,
                    transform: `translateY(${(1 - button2Opacity) * 10}px)`,
                  }}
                >
                  <span style={{ fontSize: 14 }}>⊞</span>
                  Continue with Microsoft
                </button>

                <button
                  style={{
                    width: "100%",
                    padding: "14px 20px",
                    backgroundColor: "#2a2a2a",
                    border: "1px solid #3a3a3a",
                    borderRadius: 8,
                    color: "#ffffff",
                    fontSize: 15,
                    fontWeight: 500,
                    fontFamily: "Inter, system-ui, sans-serif",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    gap: 10,
                    cursor: "pointer",
                    opacity: button3Opacity,
                    transform: `translateY(${(1 - button3Opacity) * 10}px)`,
                  }}
                >
                  <span style={{ fontSize: 16 }}></span>
                  Continue with Apple
                </button>
              </div>

              {/* Divider */}
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  width: "100%",
                  margin: "24px 0",
                  opacity: button3Opacity,
                }}
              >
                <div style={{ flex: 1, height: 1, backgroundColor: "#3a3a3a" }} />
                <span
                  style={{
                    padding: "0 16px",
                    color: "#666666",
                    fontSize: 14,
                    fontFamily: "Inter, system-ui, sans-serif",
                  }}
                >
                  Or
                </span>
                <div style={{ flex: 1, height: 1, backgroundColor: "#3a3a3a" }} />
              </div>

              {/* Email input */}
              <input
                style={{
                  width: "100%",
                  padding: "14px 20px",
                  backgroundColor: "#1a1a1a",
                  border: "1px solid #3a3a3a",
                  borderRadius: 8,
                  color: "#888888",
                  fontSize: 15,
                  fontFamily: "Inter, system-ui, sans-serif",
                  outline: "none",
                  opacity: button3Opacity,
                }}
                placeholder="Enter your email address"
              />

              {/* Success indicator */}
              {frame >= 120 && (
                <div
                  style={{
                    marginTop: 16,
                    width: "100%",
                    padding: "12px 16px",
                    backgroundColor: "#1a1a1a",
                    border: "1px solid #3a3a3a",
                    borderRadius: 8,
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "space-between",
                    transform: `scale(${Math.min(1, successScale)})`,
                  }}
                >
                  <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
                    <div
                      style={{
                        width: 24,
                        height: 24,
                        borderRadius: "50%",
                        backgroundColor: "#10b981",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        color: "#ffffff",
                        fontSize: 14,
                      }}
                    >
                      ✓
                    </div>
                    <span
                      style={{
                        color: "#ffffff",
                        fontSize: 15,
                        fontFamily: "Inter, system-ui, sans-serif",
                      }}
                    >
                      Success!
                    </span>
                  </div>
                  <span
                    style={{
                      color: "#f97316",
                      fontSize: 12,
                      fontWeight: 600,
                      fontFamily: "Inter, system-ui, sans-serif",
                    }}
                  >
                    CLOUDFLARE
                  </span>
                </div>
              )}

              {/* Continue button */}
              <button
                style={{
                  marginTop: 16,
                  width: "100%",
                  padding: "14px 20px",
                  backgroundColor: "#4a4a4a",
                  border: "none",
                  borderRadius: 8,
                  color: "#888888",
                  fontSize: 15,
                  fontWeight: 500,
                  fontFamily: "Inter, system-ui, sans-serif",
                  cursor: "pointer",
                  opacity: button3Opacity,
                }}
              >
                Continue
              </button>
            </div>
          </AbsoluteFill>
        </Sequence>
      )}

      {/* Scene 2-4: Chat Interface */}
      {chatVisible && (
        <Sequence from={200}>
          <AbsoluteFill
            style={{
              opacity: chatOpacity,
            }}
          >
            {/* Header */}
            <div
              style={{
                height: 56,
                borderBottom: "1px solid #2a2a2a",
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
                padding: "0 24px",
              }}
            >
              <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
                <span
                  style={{
                    fontFamily: "Inter, system-ui, sans-serif",
                    fontSize: 16,
                    fontWeight: 500,
                    color: "#ffffff",
                  }}
                >
                  Manus 1.6
                </span>
                <span style={{ color: "#666666", fontSize: 14 }}>▾</span>
              </div>
              <div style={{ display: "flex", gap: 16 }}>
                <span
                  style={{
                    fontFamily: "Inter, system-ui, sans-serif",
                    fontSize: 14,
                    color: "#888888",
                  }}
                >
                  Collaborate
                </span>
                <span
                  style={{
                    fontFamily: "Inter, system-ui, sans-serif",
                    fontSize: 14,
                    color: "#888888",
                  }}
                >
                  Share
                </span>
              </div>
            </div>

            {/* Chat content */}
            <div
              style={{
                flex: 1,
                padding: "40px 80px",
                display: "flex",
                flexDirection: "column",
                gap: 32,
                overflow: "hidden",
              }}
            >
              {/* User message */}
              <div
                style={{
                  maxWidth: 700,
                  marginLeft: "auto",
                }}
              >
                <div
                  style={{
                    backgroundColor: "#2a2a2a",
                    borderRadius: 16,
                    padding: 20,
                    marginBottom: 16,
                  }}
                >
                  <p
                    style={{
                      margin: 0,
                      fontFamily: "Inter, system-ui, sans-serif",
                      fontSize: 16,
                      color: "#e5e5e5",
                      lineHeight: 1.6,
                    }}
                  >
                    {userMessage.substring(0, messageChars)}
                    {frame >= 260 && frame < 390 && Math.floor(frame / 15) % 2 === 0 && (
                      <span
                        style={{
                          display: "inline-block",
                          width: 2,
                          height: 18,
                          backgroundColor: "#e5e5e5",
                          marginLeft: 2,
                          verticalAlign: "middle",
                        }}
                      />
                    )}
                  </p>
                </div>

                {/* File attachments */}
                <div
                  style={{
                    display: "grid",
                    gridTemplateColumns: "1fr 1fr",
                    gap: 12,
                  }}
                >
                  <FileAttachment
                    name="project_content.txt"
                    type="text"
                    size="3.08 KB"
                    opacity={file1Opacity}
                  />
                  <FileAttachment
                    name="Research_Report.pdf"
                    type="pdf"
                    size="2.28 MB"
                    opacity={file2Opacity}
                  />
                  <FileAttachment
                    name="Poster_Template.pdf"
                    type="pdf"
                    size="1.71 MB"
                    opacity={file3Opacity}
                  />
                </div>
              </div>

              {/* Manus response */}
              {frame >= 400 && (
                <div
                  style={{
                    maxWidth: 700,
                    opacity: responseOpacity,
                  }}
                >
                  {/* Manus header */}
                  <div
                    style={{
                      display: "flex",
                      alignItems: "center",
                      gap: 12,
                      marginBottom: 16,
                    }}
                  >
                    <ManusLogo size={28} />
                    <span
                      style={{
                        fontFamily: "Inter, system-ui, sans-serif",
                        fontSize: 15,
                        fontWeight: 600,
                        color: "#ffffff",
                      }}
                    >
                      manus
                    </span>
                  </div>

                  <p
                    style={{
                      margin: 0,
                      marginBottom: 20,
                      fontFamily: "Inter, system-ui, sans-serif",
                      fontSize: 16,
                      color: "#d4d4d4",
                      lineHeight: 1.6,
                    }}
                  >
                    Understood, I will synthesize the report into a one-page poster using the
                    provided template and general vibe. Let me get started!
                  </p>

                  {/* Task steps */}
                  <div
                    style={{
                      backgroundColor: "#1a1a1a",
                      borderRadius: 12,
                      padding: 20,
                      display: "flex",
                      flexDirection: "column",
                      gap: 16,
                    }}
                  >
                    <div
                      style={{
                        fontFamily: "Inter, system-ui, sans-serif",
                        fontSize: 14,
                        fontWeight: 600,
                        color: "#888888",
                        marginBottom: 4,
                      }}
                    >
                      Review uploaded files and understand requirements
                    </div>

                    <TaskStep
                      text="Reading project_content.txt"
                      completed={step1Progress >= 100}
                      opacity={step1Opacity}
                      progress={step1Progress}
                    />
                    <TaskStep
                      text="Viewing Research_Report.pdf"
                      completed={step2Progress >= 100}
                      opacity={step2Opacity}
                      progress={step2Progress}
                    />
                    <TaskStep
                      text="Analyzing Poster_Template.pdf"
                      completed={step3Progress >= 100}
                      opacity={step3Opacity}
                      progress={step3Progress}
                    />

                    {frame >= 640 && (
                      <div
                        style={{
                          marginTop: 8,
                          padding: "12px 16px",
                          backgroundColor: "#10b98115",
                          borderRadius: 8,
                          border: "1px solid #10b98130",
                          opacity: interpolate(frame, [640, 660], [0, 1], {
                            extrapolateRight: "clamp",
                          }),
                        }}
                      >
                        <p
                          style={{
                            margin: 0,
                            fontFamily: "Inter, system-ui, sans-serif",
                            fontSize: 14,
                            color: "#10b981",
                          }}
                        >
                          ✓ All files processed. Ready to generate poster layout...
                        </p>
                      </div>
                    )}
                  </div>
                </div>
              )}
            </div>
          </AbsoluteFill>
        </Sequence>
      )}

      {/* Outro */}
      <Sequence from={700}>
        <AbsoluteFill
          style={{
            background: "linear-gradient(to top, rgba(0,0,0,0.9) 0%, transparent 100%)",
            display: "flex",
            alignItems: "flex-end",
            justifyContent: "center",
            paddingBottom: 60,
          }}
        >
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              gap: 16,
              opacity: interpolate(frame, [700, 730], [0, 1], {
                extrapolateRight: "clamp",
              }),
            }}
          >
            <ManusLogo size={40} />
            <div
              style={{
                fontFamily: "Inter, system-ui, sans-serif",
                fontSize: 24,
                color: "#ffffff",
                textAlign: "center",
              }}
            >
              <span style={{ fontWeight: 600 }}>manus.ai</span>
              <span style={{ color: "#666666" }}> — Your AI assistant that gets things done</span>
            </div>
          </div>
        </AbsoluteFill>
      </Sequence>
    </AbsoluteFill>
  )
}
