"use client"

import { useRef, useState, useEffect, useCallback } from "react"

interface VideoPlayerProps {
  src: string
  alt: string
  poster?: string
  className?: string
  aspectRatio?: "16/9" | "4/3" | "1/1" | "auto"
}

export function VideoPlayer({
  src,
  alt,
  poster,
  className = "",
  aspectRatio = "16/9",
}: VideoPlayerProps) {
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
    if (!video || !container) return

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          setIsInView(entry.isIntersecting)
        })
      },
      {
        threshold: 0.5,
        rootMargin: "0px",
      }
    )

    observer.observe(container)

    return () => {
      observer.disconnect()
    }
  }, [])

  // Handle autoplay based on visibility
  useEffect(() => {
    const video = videoRef.current
    if (!video) return

    if (isInView && !hasInteracted) {
      video.play().catch(() => {
        // Autoplay blocked, that's okay
      })
    } else if (!isInView && !hasInteracted) {
      video.pause()
    }
  }, [isInView, hasInteracted])

  // Track video state
  useEffect(() => {
    const video = videoRef.current
    if (!video) return

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
  }, [])

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

  const aspectClasses = {
    "16/9": "aspect-video",
    "4/3": "aspect-[4/3]",
    "1/1": "aspect-square",
    auto: "",
  }

  return (
    <div
      ref={containerRef}
      className={`group relative overflow-hidden rounded-xl bg-gradient-to-br from-card to-border ${aspectClasses[aspectRatio]} ${className}`}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      onClick={togglePlayPause}
      onKeyDown={handleKeyDown}
      role="button"
      tabIndex={0}
      aria-label={isPlaying ? `Pause ${alt}` : `Play ${alt}`}
    >
      {/* Video element */}
      <video
        ref={videoRef}
        className={`
          absolute inset-0 w-full h-full object-cover
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
        `}
      />

      {/* Play/Pause button overlay */}
      <div
        className={`
          absolute inset-0 flex items-center justify-center
          transition-all duration-300 ease-out
          ${isHovered || !isPlaying ? "opacity-100" : "opacity-0"}
        `}
      >
        <div
          className={`
            w-16 h-16 md:w-20 md:h-20 rounded-full
            bg-white/90 backdrop-blur-sm
            flex items-center justify-center
            shadow-lg shadow-black/10
            transition-all duration-300 ease-out
            ${isHovered ? "scale-100" : "scale-90"}
            group-hover:bg-white group-hover:shadow-xl
          `}
        >
          {isPlaying ? (
            <svg
              className="w-6 h-6 md:w-8 md:h-8 text-foreground"
              fill="currentColor"
              viewBox="0 0 24 24"
            >
              <path d="M6 4h4v16H6V4zm8 0h4v16h-4V4z" />
            </svg>
          ) : (
            <svg
              className="w-6 h-6 md:w-8 md:h-8 text-foreground ml-1"
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
          bg-black/10
          transition-opacity duration-300
          ${isHovered ? "opacity-100" : "opacity-0"}
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
          <div className="w-16 h-16 rounded-full bg-accent/10 flex items-center justify-center animate-pulse">
            <svg
              className="w-8 h-8 text-accent/50"
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
