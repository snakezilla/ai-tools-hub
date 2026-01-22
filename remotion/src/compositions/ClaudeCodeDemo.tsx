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

// Claude Code mascot - pixel art style pig
const ClaudeMascot: React.FC<{ scale?: number }> = ({ scale = 1 }) => (
  <div
    style={{
      display: "grid",
      gridTemplateColumns: "repeat(4, 1fr)",
      gap: 2 * scale,
      width: 48 * scale,
      height: 32 * scale,
    }}
  >
    {/* Row 1: ears */}
    <div style={{ backgroundColor: "#E8A4A4", width: 10 * scale, height: 8 * scale, borderRadius: 2 }} />
    <div style={{ backgroundColor: "transparent", width: 10 * scale, height: 8 * scale }} />
    <div style={{ backgroundColor: "transparent", width: 10 * scale, height: 8 * scale }} />
    <div style={{ backgroundColor: "#E8A4A4", width: 10 * scale, height: 8 * scale, borderRadius: 2 }} />
    {/* Row 2: face top */}
    <div style={{ backgroundColor: "#E8A4A4", width: 10 * scale, height: 10 * scale }} />
    <div style={{ backgroundColor: "#E8A4A4", width: 10 * scale, height: 10 * scale }} />
    <div style={{ backgroundColor: "#E8A4A4", width: 10 * scale, height: 10 * scale }} />
    <div style={{ backgroundColor: "#E8A4A4", width: 10 * scale, height: 10 * scale }} />
    {/* Row 3: face bottom with snout */}
    <div style={{ backgroundColor: "#E8A4A4", width: 10 * scale, height: 10 * scale }} />
    <div style={{ backgroundColor: "#D4908A", width: 10 * scale, height: 10 * scale, borderRadius: 2 }} />
    <div style={{ backgroundColor: "#D4908A", width: 10 * scale, height: 10 * scale, borderRadius: 2 }} />
    <div style={{ backgroundColor: "#E8A4A4", width: 10 * scale, height: 10 * scale }} />
  </div>
)

export const ClaudeCodeDemo: React.FC = () => {
  const frame = useCurrentFrame()
  const { fps } = useVideoConfig()

  // Scene timing (total ~20 seconds = 600 frames at 30fps)
  // Scene 1: Intro with logo (0-90 frames, 0-3s)
  // Scene 2: Terminal appears (90-180 frames, 3-6s)
  // Scene 3: User typing prompt (180-300 frames, 6-10s)
  // Scene 4: Claude thinking (300-390 frames, 10-13s)
  // Scene 5: Claude responding (390-540 frames, 13-18s)
  // Scene 6: Outro (540-600 frames, 18-20s)

  // Intro animations
  const logoScale = spring({
    frame,
    fps,
    config: { damping: 12, stiffness: 80 },
  })

  const titleOpacity = interpolate(frame, [30, 60], [0, 1], { extrapolateRight: "clamp" })
  const subtitleOpacity = interpolate(frame, [50, 80], [0, 1], { extrapolateRight: "clamp" })

  // Terminal appear animation
  const terminalScale = spring({
    frame: frame - 90,
    fps,
    config: { damping: 15, stiffness: 100 },
  })
  const terminalOpacity = interpolate(frame, [90, 110], [0, 1], { extrapolateRight: "clamp" })

  // User prompt typing
  const userPrompt = "go through my directory and find any old files ready for purge. Also, create a summary of what you find as we scan through"
  const promptChars = Math.floor(
    interpolate(frame, [200, 380], [0, userPrompt.length], {
      extrapolateLeft: "clamp",
      extrapolateRight: "clamp",
      easing: Easing.linear,
    })
  )

  // Thinking animation
  const thinkingDots = Math.floor((frame - 400) / 15) % 4
  const thinkingOpacity = interpolate(frame, [400, 420, 500, 520], [0, 1, 1, 0], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  })

  // Response animation
  const responseLines = [
    "I'll scan through your directory and identify old files.",
    "",
    "Scanning /Users/user/Documents...",
    "  Found: project_backup_2021.zip (3 years old, 2.3 GB)",
    "  Found: old_notes.txt (4 years old, 12 KB)",
    "  Found: archive_photos/ (2 years old, 1.8 GB)",
    "",
    "Scanning /Users/user/Downloads...",
    "  Found: installer_v2.dmg (18 months old, 450 MB)",
    "  Found: meeting_recording.mp4 (2 years old, 890 MB)",
    "",
    "Summary: Found 5 items totaling 5.4 GB ready for review",
  ]

  const visibleLines = Math.floor(
    interpolate(frame, [540, 750], [0, responseLines.length], {
      extrapolateLeft: "clamp",
      extrapolateRight: "clamp",
    })
  )

  // Success checkmark
  const checkmarkScale = spring({
    frame: frame - 760,
    fps,
    config: { damping: 10, stiffness: 120 },
  })

  // Cursor blink
  const cursorVisible = Math.floor(frame / 15) % 2 === 0

  return (
    <AbsoluteFill
      style={{
        background: "linear-gradient(135deg, #0f0f0f 0%, #1a1a2e 50%, #16213e 100%)",
      }}
    >
      {/* Scene 1: Intro */}
      <Sequence from={0} durationInFrames={90}>
        <AbsoluteFill
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <div
            style={{
              transform: `scale(${logoScale})`,
              marginBottom: 24,
            }}
          >
            <ClaudeMascot scale={3} />
          </div>
          <div
            style={{
              fontFamily: "ui-monospace, SFMono-Regular, Menlo, Monaco, monospace",
              fontSize: 48,
              fontWeight: 700,
              color: "#ffffff",
              opacity: titleOpacity,
              letterSpacing: -1,
            }}
          >
            Claude Code
          </div>
          <div
            style={{
              fontFamily: "ui-monospace, SFMono-Regular, Menlo, Monaco, monospace",
              fontSize: 20,
              color: "#888888",
              opacity: subtitleOpacity,
              marginTop: 12,
            }}
          >
            Your AI pair programmer in the terminal
          </div>
        </AbsoluteFill>
      </Sequence>

      {/* Scene 2-6: Terminal */}
      <Sequence from={90}>
        <AbsoluteFill
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            padding: 40,
          }}
        >
          <div
            style={{
              width: 1100,
              height: 640,
              backgroundColor: "#1e1e1e",
              borderRadius: 12,
              boxShadow: "0 40px 80px rgba(0, 0, 0, 0.5), 0 0 0 1px rgba(255,255,255,0.1)",
              overflow: "hidden",
              transform: `scale(${Math.min(1, terminalScale)})`,
              opacity: terminalOpacity,
            }}
          >
            {/* Terminal Header */}
            <div
              style={{
                height: 38,
                backgroundColor: "#323232",
                borderBottom: "1px solid #404040",
                display: "flex",
                alignItems: "center",
                padding: "0 16px",
              }}
            >
              {/* Traffic lights */}
              <div style={{ display: "flex", gap: 8 }}>
                <div
                  style={{
                    width: 12,
                    height: 12,
                    borderRadius: "50%",
                    backgroundColor: "#ff5f56",
                  }}
                />
                <div
                  style={{
                    width: 12,
                    height: 12,
                    borderRadius: "50%",
                    backgroundColor: "#ffbd2e",
                  }}
                />
                <div
                  style={{
                    width: 12,
                    height: 12,
                    borderRadius: "50%",
                    backgroundColor: "#27c93f",
                  }}
                />
              </div>
              {/* Title */}
              <div
                style={{
                  flex: 1,
                  textAlign: "center",
                  fontFamily: "ui-monospace, SFMono-Regular, Menlo, Monaco, monospace",
                  fontSize: 13,
                  color: "#a0a0a0",
                }}
              >
                user — Claude Code — zsh
              </div>
              <div style={{ width: 52 }} />
            </div>

            {/* Terminal Content */}
            <div
              style={{
                padding: 24,
                fontFamily: "ui-monospace, SFMono-Regular, Menlo, Monaco, monospace",
                fontSize: 15,
                lineHeight: 1.7,
                color: "#d4d4d4",
                height: "calc(100% - 38px)",
                overflow: "hidden",
              }}
            >
              {/* Initial command */}
              <div style={{ color: "#888888", marginBottom: 20 }}>
                Last login: Thu Jan 22 16:31:45 on ttys003
              </div>
              <div style={{ color: "#888888", marginBottom: 30 }}>
                <span style={{ color: "#10b981" }}>user@MacBook</span>
                <span style={{ color: "#888" }}> ~ % </span>
                <span style={{ color: "#d4d4d4" }}>claude</span>
              </div>

              {/* Claude Code header */}
              <div style={{ display: "flex", alignItems: "flex-start", gap: 16, marginBottom: 30 }}>
                <ClaudeMascot scale={1.2} />
                <div>
                  <div style={{ color: "#ffffff", fontWeight: 600, fontSize: 17 }}>
                    Claude Code <span style={{ color: "#888888", fontWeight: 400 }}>v2.1.12</span>
                  </div>
                  <div style={{ color: "#888888", fontSize: 14, marginTop: 2 }}>
                    Opus 4.5 · Claude Max
                  </div>
                  <div style={{ color: "#666666", fontSize: 13, marginTop: 2 }}>
                    /Users/user
                  </div>
                </div>
              </div>

              {/* User prompt */}
              <div style={{ marginBottom: 24 }}>
                <div style={{ display: "flex", alignItems: "flex-start" }}>
                  <span style={{ color: "#10b981", marginRight: 8 }}>❯</span>
                  <span style={{ color: "#f0f0f0" }}>
                    {userPrompt.substring(0, promptChars)}
                    {frame >= 200 && frame < 400 && cursorVisible && (
                      <span
                        style={{
                          display: "inline-block",
                          width: 8,
                          height: 18,
                          backgroundColor: "#f0f0f0",
                          marginLeft: 1,
                          verticalAlign: "middle",
                        }}
                      />
                    )}
                  </span>
                </div>
                {frame >= 380 && frame < 400 && (
                  <div style={{ color: "#666666", fontSize: 13, marginTop: 8, marginLeft: 16 }}>
                    ❯❯ bypass permissions on (shift+tab to cycle)
                  </div>
                )}
              </div>

              {/* Thinking indicator */}
              {frame >= 400 && frame < 520 && (
                <div
                  style={{
                    opacity: thinkingOpacity,
                    color: "#f59e0b",
                    display: "flex",
                    alignItems: "center",
                    gap: 8,
                    marginBottom: 20,
                  }}
                >
                  <span style={{ fontSize: 14 }}>⟳</span>
                  <span>Analyzing request{".".repeat(thinkingDots)}</span>
                </div>
              )}

              {/* Response */}
              {frame >= 520 && (
                <div style={{ marginTop: 16 }}>
                  {responseLines.slice(0, visibleLines).map((line, i) => (
                    <div
                      key={i}
                      style={{
                        color: line.startsWith("  Found:")
                          ? "#f59e0b"
                          : line.startsWith("Scanning")
                          ? "#10b981"
                          : line.startsWith("Summary")
                          ? "#3b82f6"
                          : "#d4d4d4",
                        marginBottom: line === "" ? 12 : 4,
                        fontWeight: line.startsWith("Summary") ? 600 : 400,
                      }}
                    >
                      {line || "\u00A0"}
                    </div>
                  ))}

                  {/* Success indicator */}
                  {frame >= 760 && (
                    <div
                      style={{
                        marginTop: 24,
                        display: "flex",
                        alignItems: "center",
                        gap: 12,
                        transform: `scale(${Math.min(1, checkmarkScale)})`,
                      }}
                    >
                      <div
                        style={{
                          width: 28,
                          height: 28,
                          borderRadius: "50%",
                          backgroundColor: "#10b981",
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "center",
                          color: "#ffffff",
                          fontSize: 16,
                          fontWeight: "bold",
                        }}
                      >
                        ✓
                      </div>
                      <span style={{ color: "#10b981", fontWeight: 600 }}>
                        Scan complete — ready to review files
                      </span>
                    </div>
                  )}
                </div>
              )}
            </div>
          </div>
        </AbsoluteFill>
      </Sequence>

      {/* Outro overlay */}
      <Sequence from={800}>
        <AbsoluteFill
          style={{
            background: `linear-gradient(to top, rgba(0,0,0,0.8) 0%, transparent 100%)`,
            display: "flex",
            alignItems: "flex-end",
            justifyContent: "center",
            paddingBottom: 60,
          }}
        >
          <div
            style={{
              fontFamily: "ui-monospace, SFMono-Regular, Menlo, Monaco, monospace",
              fontSize: 24,
              color: "#ffffff",
              textAlign: "center",
              opacity: interpolate(frame, [800, 830], [0, 1], { extrapolateRight: "clamp" }),
            }}
          >
            <span style={{ color: "#10b981" }}>claude.ai/code</span>
            <span style={{ color: "#666666" }}> — Start coding with Claude today</span>
          </div>
        </AbsoluteFill>
      </Sequence>
    </AbsoluteFill>
  )
}
