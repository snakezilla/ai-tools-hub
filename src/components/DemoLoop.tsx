"use client"

import { useRef, useEffect } from "react"

interface DemoLoopProps {
  src?: string
  alt: string
  poster?: string
  className?: string
}

export function DemoLoop({ src, alt, poster, className = "" }: DemoLoopProps) {
  const videoRef = useRef<HTMLVideoElement>(null)

  useEffect(() => {
    if (videoRef.current) {
      videoRef.current.play().catch(() => {
        // Autoplay blocked by browser, that's okay
      })
    }
  }, [])

  if (!src) {
    // Placeholder when no video available
    return (
      <div
        className={`bg-gradient-to-br from-card to-border rounded-lg flex items-center justify-center ${className}`}
        role="img"
        aria-label={alt}
      >
        <div className="text-center p-8">
          <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-accent/10 flex items-center justify-center">
            <svg
              className="w-8 h-8 text-accent"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={1.5}
                d="M14.752 11.168l-3.197-2.132A1 1 0 0010 9.87v4.263a1 1 0 001.555.832l3.197-2.132a1 1 0 000-1.664z"
              />
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={1.5}
                d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
              />
            </svg>
          </div>
          <p className="text-muted text-sm">Demo coming soon</p>
        </div>
      </div>
    )
  }

  return (
    <video
      ref={videoRef}
      className={`rounded-lg ${className}`}
      autoPlay
      muted
      loop
      playsInline
      preload="metadata"
      poster={poster}
      aria-label={alt}
    >
      <source src={src} type="video/mp4" />
      Your browser does not support the video tag.
    </video>
  )
}
