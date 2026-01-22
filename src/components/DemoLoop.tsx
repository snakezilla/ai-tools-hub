"use client"

import { useRef, useEffect, useState, useCallback } from "react"

interface DemoLoopProps {
  src?: string
  alt: string
  poster?: string
  className?: string
  variant?: "simple" | "interactive"
}

export function DemoLoop({
  src,
  alt,
  poster,
  className = "",
  variant = "simple",
}: DemoLoopProps) {
  const videoRef = useRef<HTMLVideoElement>(null)
  const containerRef = useRef<HTMLDivElement>(null)
  const [isPlaying, setIsPlaying] = useState(false)
  const [isHovered, setIsHovered] = useState(false)
  const [isInView, setIsInView] = useState(false)
  const [hasInteracted, setHasInteracted] = useState(false)
  const [isLoaded, setIsLoaded] = useState(false)
  const [progress, setProgress] = useState(0)

  // Intersection Observer for autoplay when in view
  useEffect(() => {
    const video = videoRef.current
    const container = containerRef.current
    if (!video || !container || !src) return

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          setIsInView(entry.isIntersecting)
        })
      },
      {
        threshold: 0.3,
        rootMargin: "0px",
      }
    )

    observer.observe(container)

    return () => {
      observer.disconnect()
    }
  }, [src])

  // Handle autoplay based on visibility
  useEffect(() => {
    const video = videoRef.current
    if (!video || !src) return

    if (isInView && !hasInteracted) {
      video.play().catch(() => {
        // Autoplay blocked, that's okay
      })
    } else if (!isInView && !hasInteracted) {
      video.pause()
    }
  }, [isInView, hasInteracted, src])

  // Track video state
  useEffect(() => {
    const video = videoRef.current
    if (!video || !src) return

    const handlePlay = () => setIsPlaying(true)
    const handlePause = () => setIsPlaying(false)
    const handleLoadedData = () => setIsLoaded(true)
    const handleTimeUpdate = () => {
      if (video.duration) {
        setProgress((video.currentTime / video.duration) * 100)
      }
    }

    video.addEventListener("play", handlePlay)
    video.addEventListener("pause", handlePause)
    video.addEventListener("loadeddata", handleLoadedData)
    video.addEventListener("timeupdate", handleTimeUpdate)

    return () => {
      video.removeEventListener("play", handlePlay)
      video.removeEventListener("pause", handlePause)
      video.removeEventListener("loadeddata", handleLoadedData)
      video.removeEventListener("timeupdate", handleTimeUpdate)
    }
  }, [src])

  const togglePlayPause = useCallback(() => {
    const video = videoRef.current
    if (!video) return

    setHasInteracted(true)

    if (video.paused) {
      video.play().catch(() => {
        // Play failed
      })
    } else {
      video.pause()
    }
  }, [])

  const handleKeyDown = useCallback(
    (e: React.KeyboardEvent) => {
      if (e.key === " " || e.key === "Enter") {
        e.preventDefault()
        togglePlayPause()
      }
    },
    [togglePlayPause]
  )

  const handleClick = useCallback(
    (e: React.MouseEvent) => {
      if (variant === "interactive") {
        e.preventDefault()
        e.stopPropagation()
        togglePlayPause()
      }
    },
    [variant, togglePlayPause]
  )

  if (!src) {
    // Placeholder when no video available
    return (
      <div
        className={`bg-gradient-to-br from-card to-border rounded-xl flex items-center justify-center ${className}`}
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

  // Simple variant - hover to play with no controls
  if (variant === "simple") {
    const handleMouseEnter = () => {
      const video = videoRef.current
      if (video) {
        video.currentTime = 0
        video.play().catch(() => {})
      }
    }

    const handleMouseLeave = () => {
      const video = videoRef.current
      if (video) {
        video.pause()
        video.currentTime = 0
      }
    }

    return (
      <div
        ref={containerRef}
        className={`relative overflow-hidden rounded-xl bg-gradient-to-br from-card to-border cursor-pointer ${className}`}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
      >
        <video
          ref={videoRef}
          className={`
            w-full h-full object-cover
            transition-opacity duration-500
            ${isLoaded ? "opacity-100" : "opacity-0"}
          `}
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

        {/* Play icon overlay - shows when not playing */}
        {!isPlaying && isLoaded && (
          <div className="absolute inset-0 flex items-center justify-center bg-black/10 transition-opacity">
            <div className="w-12 h-12 rounded-full bg-white/90 flex items-center justify-center shadow-lg">
              <svg
                className="w-5 h-5 text-foreground ml-0.5"
                fill="currentColor"
                viewBox="0 0 24 24"
              >
                <path d="M8 5v14l11-7z" />
              </svg>
            </div>
          </div>
        )}

        {/* Loading skeleton */}
        {!isLoaded && (
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="w-12 h-12 rounded-full bg-accent/10 flex items-center justify-center animate-pulse">
              <svg
                className="w-6 h-6 text-accent/50"
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
          </div>
        )}
      </div>
    )
  }

  // Interactive variant - full controls with play/pause
  return (
    <div
      ref={containerRef}
      className={`group relative overflow-hidden rounded-xl bg-gradient-to-br from-card to-border shadow-card ${className}`}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      onClick={handleClick}
      onKeyDown={handleKeyDown}
      role="button"
      tabIndex={0}
      aria-label={isPlaying ? `Pause ${alt}` : `Play ${alt}`}
    >
      {/* Video element */}
      <video
        ref={videoRef}
        className={`
          w-full h-full object-cover
          transition-all duration-700 ease-out
          ${isLoaded ? "opacity-100 scale-100" : "opacity-0 scale-105"}
        `}
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

      {/* Gradient overlay for depth */}
      <div
        className={`
          absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-transparent
          transition-opacity duration-300
          ${isHovered ? "opacity-100" : "opacity-0"}
          pointer-events-none
        `}
      />

      {/* Play/Pause button overlay */}
      <div
        className={`
          absolute inset-0 flex items-center justify-center
          transition-all duration-300 ease-out
          ${isHovered || !isPlaying ? "opacity-100" : "opacity-0"}
          pointer-events-none
        `}
      >
        <div
          className={`
            w-14 h-14 md:w-16 md:h-16 rounded-full
            bg-white/95 backdrop-blur-sm
            flex items-center justify-center
            shadow-lg shadow-black/10
            transition-all duration-300 ease-out
            ${isHovered ? "scale-100" : "scale-90"}
            group-hover:bg-white group-hover:shadow-xl
          `}
        >
          {isPlaying ? (
            <svg
              className="w-5 h-5 md:w-6 md:h-6 text-foreground"
              fill="currentColor"
              viewBox="0 0 24 24"
            >
              <path d="M6 4h4v16H6V4zm8 0h4v16h-4V4z" />
            </svg>
          ) : (
            <svg
              className="w-5 h-5 md:w-6 md:h-6 text-foreground ml-0.5"
              fill="currentColor"
              viewBox="0 0 24 24"
            >
              <path d="M8 5v14l11-7z" />
            </svg>
          )}
        </div>
      </div>

      {/* Progress bar */}
      <div
        className={`
          absolute bottom-0 left-0 right-0 h-1
          bg-white/20
          transition-opacity duration-300
          ${isHovered ? "opacity-100" : "opacity-0"}
          pointer-events-none
        `}
      >
        <div
          className="h-full bg-accent transition-all duration-100 ease-linear"
          style={{ width: `${progress}%` }}
        />
      </div>

      {/* Loading skeleton */}
      {!isLoaded && (
        <div className="absolute inset-0 flex items-center justify-center bg-gradient-to-br from-card to-border">
          <div className="w-14 h-14 rounded-full bg-accent/10 flex items-center justify-center animate-pulse">
            <svg
              className="w-7 h-7 text-accent/50"
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
        </div>
      )}
    </div>
  )
}
