import { Metadata } from 'next'
import { Hero } from "@/components/Hero"
import { LearningPaths } from "@/components/LearningPaths"
import { ToolsGrid } from "@/components/ToolsGrid"
import { ROICalculator } from "@/components/ROICalculator"

export const metadata: Metadata = {
  title: 'AI Tools Hub - Master Claude Code & AI Automation',
  description: 'Learn Claude Code, AI automation, and productivity tools through interactive guides, courses, and skill training. Master AI tools from beginner to advanced levels.',
  keywords: [
    'Claude Code',
    'AI tools',
    'automation',
    'productivity',
    'Claude AI',
    'AI learning',
    'technical guides',
    'programming skills',
  ],
  openGraph: {
    title: 'AI Tools Hub - Master Claude Code & AI Automation',
    description: 'Learn Claude Code, AI automation, and productivity tools through interactive guides, courses, and skill training.',
    url: 'https://practicallibrary.com',
    type: 'website',
    images: [
      {
        url: 'https://practicallibrary.com/og-image.png',
        width: 1200,
        height: 630,
        alt: 'AI Tools Hub - Master Claude Code',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'AI Tools Hub - Master Claude Code & AI Automation',
    description: 'Learn Claude Code, AI automation, and productivity tools through interactive guides, courses, and skill training.',
    images: ['https://practicallibrary.com/og-image.png'],
  },
  robots: {
    index: true,
    follow: true,
  },
}

export default function HomePage() {
  return (
    <>
      <Hero />
      <ToolsGrid />
      <LearningPaths />
      <ROICalculator />
    </>
  )
}
