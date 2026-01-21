import React from 'react';
import {
  AbsoluteFill,
  useCurrentFrame,
  interpolate,
  spring,
  useVideoConfig,
  Sequence,
} from 'remotion';

export const ClaudeCodeDemo: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  // Act 1: Prompt (0-60 frames, 0-2s)
  const promptText = "Create a React component for a user profile card";
  const charsToShow = Math.floor(interpolate(frame, [10, 50], [0, promptText.length], {
    extrapolateRight: 'clamp',
  }));

  // Act 2: Thinking (60-120 frames, 2-4s)
  const thinkingOpacity = interpolate(frame, [60, 70, 110, 120], [0, 1, 1, 0]);
  const dotCount = Math.floor(interpolate(frame, [60, 120], [0, 12])) % 4;

  // Act 3: Output (120-210 frames, 4-7s)
  const codeLines = [
    "import React from 'react';",
    "",
    "interface UserProfileProps {",
    "  name: string;",
    "  email: string;",
    "  avatar: string;",
    "}",
    "",
    "export const UserProfile: React.FC<UserProfileProps> = ({",
    "  name,",
    "  email,",
    "  avatar",
    "}) => {",
    "  return (",
    "    <div className=\"profile-card\">",
    "      <img src={avatar} alt={name} />",
    "      <h2>{name}</h2>",
    "      <p>{email}</p>",
    "    </div>",
    "  );",
    "};",
  ];

  const codeLinesVisible = Math.floor(
    interpolate(frame, [120, 200], [0, codeLines.length], {
      extrapolateRight: 'clamp',
    })
  );

  const checkmarkScale = spring({
    frame: frame - 190,
    fps,
    config: {
      damping: 12,
    },
  });

  return (
    <AbsoluteFill style={{ backgroundColor: '#1e1e1e' }}>
      {/* Terminal Header */}
      <div
        style={{
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          height: 60,
          backgroundColor: '#2d2d2d',
          borderBottom: '1px solid #404040',
          display: 'flex',
          alignItems: 'center',
          paddingLeft: 30,
          fontFamily: 'monospace',
          color: '#cccccc',
          fontSize: 18,
        }}
      >
        <div style={{ display: 'flex', gap: 10, marginRight: 20 }}>
          <div style={{ width: 12, height: 12, borderRadius: '50%', backgroundColor: '#ff5f56' }} />
          <div style={{ width: 12, height: 12, borderRadius: '50%', backgroundColor: '#ffbd2e' }} />
          <div style={{ width: 12, height: 12, borderRadius: '50%', backgroundColor: '#27c93f' }} />
        </div>
        Claude Code
      </div>

      {/* Main Content */}
      <div
        style={{
          position: 'absolute',
          top: 80,
          left: 30,
          right: 30,
          bottom: 30,
          fontFamily: 'monospace',
          fontSize: 22,
          color: '#d4d4d4',
        }}
      >
        {/* Act 1: Prompt */}
        {frame < 120 && (
          <div style={{ marginBottom: 30 }}>
            <div style={{ color: '#569cd6', marginBottom: 10 }}>
              $ claude
            </div>
            <div style={{ color: '#dcdcaa' }}>
              {promptText.substring(0, charsToShow)}
              {frame < 60 && frame % 20 < 10 && (
                <span style={{ color: '#fff' }}>▊</span>
              )}
            </div>
          </div>
        )}

        {/* Act 2: Thinking */}
        {frame >= 60 && frame < 120 && (
          <div
            style={{
              opacity: thinkingOpacity,
              color: '#4ec9b0',
              marginTop: 20,
            }}
          >
            <div>✨ Analyzing request{'.'.repeat(dotCount)}</div>
            <div style={{ marginTop: 10, fontSize: 18, color: '#888' }}>
              Creating component structure...
            </div>
          </div>
        )}

        {/* Act 3: Code Output */}
        {frame >= 120 && (
          <Sequence from={120}>
            <div>
              <div style={{ color: '#569cd6', marginBottom: 20 }}>
                UserProfile.tsx
              </div>
              {codeLines.slice(0, codeLinesVisible).map((line, i) => (
                <div
                  key={i}
                  style={{
                    marginBottom: 4,
                    color: line.startsWith('import') || line.startsWith('export')
                      ? '#c586c0'
                      : line.includes('interface') || line.includes('const') || line.includes('return')
                      ? '#569cd6'
                      : line.includes('string') || line.includes('React.FC')
                      ? '#4ec9b0'
                      : '#dcdcaa',
                  }}
                >
                  {line || '\u00A0'}
                </div>
              ))}
              {frame >= 190 && (
                <div
                  style={{
                    marginTop: 30,
                    color: '#4ec9b0',
                    display: 'flex',
                    alignItems: 'center',
                    gap: 15,
                    transform: `scale(${checkmarkScale})`,
                  }}
                >
                  <div
                    style={{
                      width: 30,
                      height: 30,
                      borderRadius: '50%',
                      backgroundColor: '#4ec9b0',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      color: '#1e1e1e',
                      fontSize: 20,
                      fontWeight: 'bold',
                    }}
                  >
                    ✓
                  </div>
                  Component created successfully
                </div>
              )}
            </div>
          </Sequence>
        )}
      </div>
    </AbsoluteFill>
  );
};
