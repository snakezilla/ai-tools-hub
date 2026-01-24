import type { Metadata, Viewport } from "next"
import { Inter } from "next/font/google"
import { Analytics } from "@vercel/analytics/react"
import "./globals.css"
import { Header } from "@/components/layout/Header"
import { Footer } from "@/components/layout/Footer"

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
})

export const metadata: Metadata = {
  metadataBase: new URL("https://practicallibrary.com"),
  title: {
    default: "Practical Library | Learn AI Tools in 5 Minutes",
    template: "%s | Practical Library",
  },
  icons: {
    icon: "/favicon.svg",
    shortcut: "/favicon.svg",
    apple: "/favicon.svg",
  },
  description:
    "AI tools that save 10+ hours/week. Learn them in 5 minutes. Free educational content for marketers, accountants, and small teams.",
  keywords: [
    "AI tools",
    "Claude",
    "ChatGPT",
    "Manus AI",
    "Zapier",
    "Perplexity",
    "productivity",
    "automation",
    "no-code",
    "workflow",
    "AI education",
    "learn AI",
  ],
  authors: [{ name: "Practical Library" }],
  creator: "Practical Library",
  openGraph: {
    title: "Practical Library | Learn AI Tools in 5 Minutes",
    description: "AI tools that save 10+ hours/week. Learn them in 5 minutes.",
    url: "https://practicallibrary.com",
    siteName: "Practical Library",
    locale: "en_US",
    type: "website",
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "Practical Library - Learn AI Tools in 5 Minutes",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Practical Library | Learn AI Tools in 5 Minutes",
    description: "AI tools that save 10+ hours/week. Learn them in 5 minutes.",
    images: ["/og-image.png"],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
}

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  themeColor: "#FAFAFA",
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <body className={`${inter.variable} font-sans`}>
        <div className="flex min-h-screen flex-col">
          <Header />
          <main className="flex-1">{children}</main>
          <Footer />
        </div>
        <Analytics />
      </body>
    </html>
  )
}
