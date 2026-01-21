import type { Config } from "tailwindcss"

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        // Clean, neutral palette - Figma-level aesthetic
        background: "#FAFAFA",
        foreground: "#0A0A0A",
        muted: "#737373",
        "muted-foreground": "#A3A3A3",
        border: "#E5E5E5",
        accent: {
          DEFAULT: "#2563EB",
          light: "#3B82F6",
          dark: "#1D4ED8",
          foreground: "#FFFFFF",
        },
        card: {
          DEFAULT: "#FFFFFF",
          hover: "#F5F5F5",
          foreground: "#0A0A0A",
        },
        success: "#10B981",
        warning: "#F59E0B",
        error: "#EF4444",
      },
      fontFamily: {
        sans: ["var(--font-inter)", "system-ui", "sans-serif"],
      },
      fontSize: {
        // Large, readable typography (18px+ body)
        "body-sm": ["16px", { lineHeight: "1.5" }],
        body: ["18px", { lineHeight: "1.6" }],
        "body-lg": ["20px", { lineHeight: "1.6" }],
        "heading-xs": ["20px", { lineHeight: "1.3", fontWeight: "600" }],
        "heading-sm": ["24px", { lineHeight: "1.3", fontWeight: "600" }],
        "heading-md": ["32px", { lineHeight: "1.2", fontWeight: "700" }],
        "heading-lg": ["48px", { lineHeight: "1.1", fontWeight: "700" }],
        "heading-xl": ["64px", { lineHeight: "1.05", fontWeight: "700" }],
      },
      spacing: {
        // Generous whitespace
        18: "4.5rem",
        22: "5.5rem",
        26: "6.5rem",
        30: "7.5rem",
      },
      borderRadius: {
        card: "12px",
        button: "8px",
      },
      boxShadow: {
        card: "0 1px 3px rgba(0, 0, 0, 0.04), 0 1px 2px rgba(0, 0, 0, 0.06)",
        "card-hover": "0 4px 12px rgba(0, 0, 0, 0.08)",
        "card-active": "0 8px 24px rgba(0, 0, 0, 0.12)",
      },
      maxWidth: {
        content: "1200px",
        narrow: "800px",
      },
      animation: {
        "fade-in": "fadeIn 0.3s ease-out",
        "slide-up": "slideUp 0.4s ease-out",
      },
      keyframes: {
        fadeIn: {
          "0%": { opacity: "0" },
          "100%": { opacity: "1" },
        },
        slideUp: {
          "0%": { opacity: "0", transform: "translateY(12px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
      },
    },
  },
  plugins: [],
}

export default config
