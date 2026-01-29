import { Metadata } from 'next'
import { Hero } from "@/components/Hero"
import { ValueProps } from "@/components/ValueProps"
import { LearningPaths } from "@/components/LearningPaths"
import { Testimonials } from "@/components/Testimonials"
import { ServicesUpsell } from "@/components/ServicesUpsell"

export const metadata: Metadata = {
  title: 'Practical Library — Learn AI Tools Without the Tech Jargon',
  description: 'If you can send an email, you can use AI. Learn Claude Code, Manus AI, and automation tools through free, step-by-step guides designed for non-technical business owners.',
  keywords: [
    'Claude Code',
    'AI tools for business',
    'learn AI',
    'no code AI',
    'AI automation',
    'Manus AI',
    'Claude AI',
    'AI for non-technical',
    'business automation',
    'AI guides',
  ],
  openGraph: {
    title: 'Practical Library — Learn AI Tools Without the Tech Jargon',
    description: 'If you can send an email, you can use AI. Free guides for non-technical business owners.',
    url: 'https://practicallibrary.com',
    type: 'website',
    images: [
      {
        url: 'https://practicallibrary.com/og-image.png',
        width: 1200,
        height: 630,
        alt: 'Practical Library - AI Tools for Everyone',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Practical Library — Learn AI Tools Without the Tech Jargon',
    description: 'If you can send an email, you can use AI. Free guides for non-technical business owners.',
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
      <ValueProps />
      <LearningPaths />
      <Testimonials />
      <ServicesUpsell />
    </>
  )
}
