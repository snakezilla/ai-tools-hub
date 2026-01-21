import React from 'react';
import {
  AbsoluteFill,
  interpolate,
  useCurrentFrame,
  useVideoConfig,
  spring,
  Sequence,
} from 'remotion';

const BRAND_ORANGE = '#F97316';
const BRAND_DARK = '#1A1A2E';
const TERMINAL_BG = '#0D1117';
const TERMINAL_GREEN = '#4ADE80';

interface TypewriterTextProps {
  text: string;
  startFrame: number;
  speed?: number;
}

const TypewriterText: React.FC<TypewriterTextProps> = ({
  text,
  startFrame,
  speed = 2,
}) => {
  const frame = useCurrentFrame();
  const charsToShow = Math.floor((frame - startFrame) / speed);
  const displayText = text.slice(0, Math.max(0, charsToShow));
  const showCursor = frame % 30 < 15 && charsToShow < text.length;

  return (
    <span>
      {displayText}
      {showCursor && <span style={{ color: TERMINAL_GREEN }}>|</span>}
    </span>
  );
};

const TerminalWindow: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  return (
    <div
      style={{
        backgroundColor: TERMINAL_BG,
        borderRadius: 12,
        padding: 20,
        fontFamily: 'Monaco, Menlo, monospace',
        fontSize: 18,
        color: '#E5E5E5',
        boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.5)',
        width: '90%',
        maxWidth: 900,
      }}
    >
      <div
        style={{
          display: 'flex',
          gap: 8,
          marginBottom: 16,
        }}
      >
        <div
          style={{
            width: 12,
            height: 12,
            borderRadius: '50%',
            backgroundColor: '#FF5F56',
          }}
        />
        <div
          style={{
            width: 12,
            height: 12,
            borderRadius: '50%',
            backgroundColor: '#FFBD2E',
          }}
        />
        <div
          style={{
            width: 12,
            height: 12,
            borderRadius: '50%',
            backgroundColor: '#27CA40',
          }}
        />
      </div>
      {children}
    </div>
  );
};

const IntroScene: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const logoScale = spring({
    frame,
    fps,
    config: { damping: 12, stiffness: 100 },
  });

  const titleOpacity = interpolate(frame, [20, 40], [0, 1], {
    extrapolateRight: 'clamp',
  });

  const subtitleOpacity = interpolate(frame, [40, 60], [0, 1], {
    extrapolateRight: 'clamp',
  });

  return (
    <AbsoluteFill
      style={{
        backgroundColor: BRAND_DARK,
        justifyContent: 'center',
        alignItems: 'center',
      }}
    >
      <div
        style={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          transform: `scale(${logoScale})`,
        }}
      >
        {/* Claude Code Logo */}
        <div
          style={{
            width: 120,
            height: 120,
            backgroundColor: BRAND_ORANGE,
            borderRadius: 24,
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            marginBottom: 32,
            boxShadow: '0 0 60px rgba(249, 115, 22, 0.4)',
          }}
        >
          <span style={{ fontSize: 60, color: 'white', fontWeight: 'bold' }}>
            {'</>'}
          </span>
        </div>

        <h1
          style={{
            fontSize: 72,
            fontWeight: 'bold',
            color: 'white',
            margin: 0,
            opacity: titleOpacity,
            fontFamily: 'system-ui, -apple-system, sans-serif',
          }}
        >
          Claude Code
        </h1>

        <p
          style={{
            fontSize: 28,
            color: '#9CA3AF',
            margin: 0,
            marginTop: 16,
            opacity: subtitleOpacity,
            fontFamily: 'system-ui, -apple-system, sans-serif',
          }}
        >
          AI-Powered Coding Assistant in Your Terminal
        </p>
      </div>
    </AbsoluteFill>
  );
};

const FeatureScene: React.FC<{
  title: string;
  description: string;
  icon: string;
}> = ({ title, description, icon }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const scale = spring({
    frame,
    fps,
    config: { damping: 15, stiffness: 80 },
  });

  const textOpacity = interpolate(frame, [15, 30], [0, 1], {
    extrapolateRight: 'clamp',
  });

  return (
    <AbsoluteFill
      style={{
        backgroundColor: BRAND_DARK,
        justifyContent: 'center',
        alignItems: 'center',
        padding: 60,
      }}
    >
      <div
        style={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          transform: `scale(${scale})`,
        }}
      >
        <div
          style={{
            fontSize: 80,
            marginBottom: 24,
          }}
        >
          {icon}
        </div>
        <h2
          style={{
            fontSize: 48,
            fontWeight: 'bold',
            color: 'white',
            margin: 0,
            opacity: textOpacity,
            textAlign: 'center',
            fontFamily: 'system-ui, -apple-system, sans-serif',
          }}
        >
          {title}
        </h2>
        <p
          style={{
            fontSize: 24,
            color: '#9CA3AF',
            margin: 0,
            marginTop: 16,
            opacity: textOpacity,
            textAlign: 'center',
            maxWidth: 600,
            fontFamily: 'system-ui, -apple-system, sans-serif',
          }}
        >
          {description}
        </p>
      </div>
    </AbsoluteFill>
  );
};

const TerminalDemoScene: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const terminalScale = spring({
    frame,
    fps,
    config: { damping: 15, stiffness: 80 },
  });

  return (
    <AbsoluteFill
      style={{
        backgroundColor: BRAND_DARK,
        justifyContent: 'center',
        alignItems: 'center',
      }}
    >
      <div style={{ transform: `scale(${terminalScale})` }}>
        <TerminalWindow>
          <div style={{ lineHeight: 1.8 }}>
            <div>
              <span style={{ color: TERMINAL_GREEN }}>$</span>{' '}
              <TypewriterText text="claude" startFrame={10} speed={3} />
            </div>
            {frame > 40 && (
              <div style={{ marginTop: 16 }}>
                <span style={{ color: BRAND_ORANGE }}>Claude</span>
                <span style={{ color: '#6B7280' }}> &gt; </span>
                <TypewriterText
                  text="How can I help you today?"
                  startFrame={50}
                  speed={2}
                />
              </div>
            )}
            {frame > 100 && (
              <div style={{ marginTop: 16 }}>
                <span style={{ color: '#60A5FA' }}>You</span>
                <span style={{ color: '#6B7280' }}> &gt; </span>
                <TypewriterText
                  text="Create a React component for user auth"
                  startFrame={110}
                  speed={2}
                />
              </div>
            )}
            {frame > 180 && (
              <div style={{ marginTop: 16 }}>
                <span style={{ color: BRAND_ORANGE }}>Claude</span>
                <span style={{ color: '#6B7280' }}> &gt; </span>
                <span style={{ color: TERMINAL_GREEN }}>
                  Creating auth component...
                </span>
              </div>
            )}
          </div>
        </TerminalWindow>
      </div>
    </AbsoluteFill>
  );
};

const CTAScene: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const scale = spring({
    frame,
    fps,
    config: { damping: 12, stiffness: 100 },
  });

  const pulse = Math.sin(frame / 10) * 0.05 + 1;

  return (
    <AbsoluteFill
      style={{
        backgroundColor: BRAND_DARK,
        justifyContent: 'center',
        alignItems: 'center',
      }}
    >
      <div
        style={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          transform: `scale(${scale})`,
        }}
      >
        <h2
          style={{
            fontSize: 56,
            fontWeight: 'bold',
            color: 'white',
            margin: 0,
            textAlign: 'center',
            fontFamily: 'system-ui, -apple-system, sans-serif',
          }}
        >
          Code Smarter with AI
        </h2>
        <div
          style={{
            marginTop: 40,
            padding: '20px 48px',
            backgroundColor: BRAND_ORANGE,
            borderRadius: 12,
            transform: `scale(${pulse})`,
            boxShadow: '0 0 40px rgba(249, 115, 22, 0.4)',
          }}
        >
          <span
            style={{
              fontSize: 24,
              fontWeight: 'bold',
              color: 'white',
              fontFamily: 'system-ui, -apple-system, sans-serif',
            }}
          >
            Get Started Free
          </span>
        </div>
        <p
          style={{
            fontSize: 20,
            color: '#6B7280',
            marginTop: 32,
            fontFamily: 'Monaco, Menlo, monospace',
          }}
        >
          npm install -g @anthropic-ai/claude-code
        </p>
      </div>
    </AbsoluteFill>
  );
};

export const ClaudeCodeDemo: React.FC = () => {
  return (
    <AbsoluteFill>
      {/* Intro: 0-90 frames (3 seconds) */}
      <Sequence from={0} durationInFrames={90}>
        <IntroScene />
      </Sequence>

      {/* Feature 1: 90-150 frames (2 seconds) */}
      <Sequence from={90} durationInFrames={60}>
        <FeatureScene
          icon="terminal"
          title="Terminal-Native"
          description="Works right in your command line - no IDE plugins needed"
        />
      </Sequence>

      {/* Feature 2: 150-210 frames (2 seconds) */}
      <Sequence from={150} durationInFrames={60}>
        <FeatureScene
          icon="brain"
          title="Context-Aware"
          description="Understands your entire codebase and project structure"
        />
      </Sequence>

      {/* Terminal Demo: 210-420 frames (7 seconds) */}
      <Sequence from={210} durationInFrames={210}>
        <TerminalDemoScene />
      </Sequence>

      {/* CTA: 420-510 frames (3 seconds) */}
      <Sequence from={420} durationInFrames={90}>
        <CTAScene />
      </Sequence>
    </AbsoluteFill>
  );
};
