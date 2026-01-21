import React from "react"
import { theme } from "../styles/theme"

interface MockBrowserProps {
  url: string
  children: React.ReactNode
  width?: number
  height?: number
}

export const MockBrowser: React.FC<MockBrowserProps> = ({
  url,
  children,
  width = 900,
  height = 560,
}) => {
  return (
    <div
      style={{
        width,
        height,
        backgroundColor: theme.colors.card,
        borderRadius: theme.borderRadius.lg,
        boxShadow: "0 25px 50px -12px rgba(0, 0, 0, 0.15)",
        overflow: "hidden",
        display: "flex",
        flexDirection: "column",
      }}
    >
      {/* Browser chrome */}
      <div
        style={{
          height: 44,
          backgroundColor: theme.colors.cardHover,
          borderBottom: `1px solid ${theme.colors.border}`,
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

        {/* URL bar */}
        <div
          style={{
            flex: 1,
            height: 28,
            backgroundColor: theme.colors.card,
            borderRadius: theme.borderRadius.md,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            fontFamily: theme.fonts.sans,
            fontSize: theme.fontSize.sm,
            color: theme.colors.muted,
          }}
        >
          {url}
        </div>
      </div>

      {/* Content area */}
      <div
        style={{
          flex: 1,
          padding: theme.spacing.xl,
          display: "flex",
          flexDirection: "column",
          overflow: "hidden",
        }}
      >
        {children}
      </div>
    </div>
  )
}
