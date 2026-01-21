import React from "react"
import { theme } from "../styles/theme"

interface MockTerminalProps {
  title?: string
  children: React.ReactNode
  width?: number
  height?: number
}

export const MockTerminal: React.FC<MockTerminalProps> = ({
  title = "Terminal",
  children,
  width = 900,
  height = 560,
}) => {
  return (
    <div
      style={{
        width,
        height,
        backgroundColor: "#1E1E1E",
        borderRadius: theme.borderRadius.lg,
        boxShadow: "0 25px 50px -12px rgba(0, 0, 0, 0.25)",
        overflow: "hidden",
        display: "flex",
        flexDirection: "column",
      }}
    >
      {/* Terminal chrome */}
      <div
        style={{
          height: 36,
          backgroundColor: "#323232",
          borderBottom: "1px solid #3C3C3C",
          display: "flex",
          alignItems: "center",
          padding: `0 ${theme.spacing.md}px`,
          gap: theme.spacing.md,
        }}
      >
        {/* Traffic lights */}
        <div style={{ display: "flex", gap: 8 }}>
          <div
            style={{
              width: 12,
              height: 12,
              borderRadius: theme.borderRadius.full,
              backgroundColor: "#EF4444",
            }}
          />
          <div
            style={{
              width: 12,
              height: 12,
              borderRadius: theme.borderRadius.full,
              backgroundColor: "#F59E0B",
            }}
          />
          <div
            style={{
              width: 12,
              height: 12,
              borderRadius: theme.borderRadius.full,
              backgroundColor: "#10B981",
            }}
          />
        </div>

        {/* Title */}
        <div
          style={{
            flex: 1,
            textAlign: "center",
            fontFamily: theme.fonts.mono,
            fontSize: theme.fontSize.sm,
            color: "#A0A0A0",
          }}
        >
          {title}
        </div>

        {/* Spacer for symmetry */}
        <div style={{ width: 52 }} />
      </div>

      {/* Content area */}
      <div
        style={{
          flex: 1,
          padding: theme.spacing.lg,
          fontFamily: theme.fonts.mono,
          fontSize: 16,
          color: "#D4D4D4",
          lineHeight: 1.6,
          overflow: "hidden",
        }}
      >
        {children}
      </div>
    </div>
  )
}
