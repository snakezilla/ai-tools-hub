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
        // Premium warm palette - Apple-inspired
        background: "#FEFEFE",
        foreground: "#1D1D1F",
        muted: "#6E6E73",
        "muted-foreground": "#86868B",
        border: "#E8E8ED",
        "border-light": "#F5F5F7",
        accent: {
          DEFAULT: "#0071E3", // Apple blue
          light: "#147CE5",
          dark: "#0062CC",
          muted: "#E8F4FD",
          foreground: "#FFFFFF",
        },
        // Warm green for success states
        success: {
          DEFAULT: "#34C759",
          light: "#E8F8ED",
          dark: "#248A3D",
        },
        // Soft card backgrounds
        card: {
          DEFAULT: "#FFFFFF",
          hover: "#FBFBFD",
          elevated: "#FFFFFF",
          foreground: "#1D1D1F",
        },
        // Subtle warm tones for sections
        section: {
          light: "#FBFBFD",
          warm: "#FEF9F3",
        },
        warning: "#FF9500",
        error: "#FF3B30",
      },
      fontFamily: {
        sans: ["var(--font-inter)", "-apple-system", "BlinkMacSystemFont", "system-ui", "sans-serif"],
      },
      fontSize: {
        // Apple-style typography scale
        "body-xs": ["14px", { lineHeight: "1.5", letterSpacing: "-0.01em" }],
        "body-sm": ["15px", { lineHeight: "1.5", letterSpacing: "-0.01em" }],
        body: ["17px", { lineHeight: "1.65", letterSpacing: "-0.01em" }],
        "body-lg": ["19px", { lineHeight: "1.6", letterSpacing: "-0.01em" }],
        "body-xl": ["21px", { lineHeight: "1.55", letterSpacing: "-0.01em" }],
        "heading-xs": ["21px", { lineHeight: "1.25", fontWeight: "600", letterSpacing: "-0.02em" }],
        "heading-sm": ["24px", { lineHeight: "1.25", fontWeight: "600", letterSpacing: "-0.02em" }],
        "heading-md": ["32px", { lineHeight: "1.15", fontWeight: "600", letterSpacing: "-0.02em" }],
        "heading-lg": ["48px", { lineHeight: "1.1", fontWeight: "600", letterSpacing: "-0.03em" }],
        "heading-xl": ["56px", { lineHeight: "1.05", fontWeight: "600", letterSpacing: "-0.03em" }],
        "heading-2xl": ["72px", { lineHeight: "1.02", fontWeight: "600", letterSpacing: "-0.04em" }],
      },
      spacing: {
        18: "4.5rem",
        22: "5.5rem",
        26: "6.5rem",
        30: "7.5rem",
        34: "8.5rem",
        38: "9.5rem",
      },
      borderRadius: {
        card: "16px",
        "card-lg": "20px",
        "card-xl": "24px",
        button: "12px",
        "button-lg": "14px",
      },
      boxShadow: {
        soft: "0 2px 8px rgba(0, 0, 0, 0.04)",
        card: "0 2px 12px rgba(0, 0, 0, 0.05)",
        "card-hover": "0 8px 32px rgba(0, 0, 0, 0.08)",
        "card-elevated": "0 12px 48px rgba(0, 0, 0, 0.12)",
        button: "0 1px 3px rgba(0, 0, 0, 0.1), 0 1px 2px rgba(0, 0, 0, 0.06)",
        "button-hover": "0 4px 12px rgba(0, 0, 0, 0.15)",
      },
      maxWidth: {
        content: "1200px",
        narrow: "800px",
        hero: "900px",
      },
      animation: {
        "fade-in": "fadeIn 0.5s ease-out",
        "fade-in-up": "fadeInUp 0.6s ease-out",
        "fade-in-up-delay": "fadeInUp 0.6s ease-out 0.15s both",
        "slide-up": "slideUp 0.5s ease-out",
        "scale-in": "scaleIn 0.4s ease-out",
        float: "float 6s ease-in-out infinite",
        pulse: "pulse 2s cubic-bezier(0.4, 0, 0.6, 1) infinite",
        shimmer: "shimmer 2s linear infinite",
      },
      keyframes: {
        fadeIn: {
          "0%": { opacity: "0" },
          "100%": { opacity: "1" },
        },
        fadeInUp: {
          "0%": { opacity: "0", transform: "translateY(20px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
        slideUp: {
          "0%": { opacity: "0", transform: "translateY(16px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
        scaleIn: {
          "0%": { opacity: "0", transform: "scale(0.95)" },
          "100%": { opacity: "1", transform: "scale(1)" },
        },
        float: {
          "0%, 100%": { transform: "translateY(0)" },
          "50%": { transform: "translateY(-10px)" },
        },
        shimmer: {
          "0%": { backgroundPosition: "-200% 0" },
          "100%": { backgroundPosition: "200% 0" },
        },
      },
      transitionTimingFunction: {
        "out-expo": "cubic-bezier(0.19, 1, 0.22, 1)",
      },
    },
  },
  plugins: [],
}

export default config
