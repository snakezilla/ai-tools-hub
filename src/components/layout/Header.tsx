"use client"

import Link from "next/link"
import { useState, useEffect } from "react"
import { Logo } from "@/components/Logo"

export function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 10)
    }
    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  return (
    <header 
      className={`sticky top-0 z-50 transition-all duration-300 ${
        scrolled 
          ? "bg-background/95 backdrop-blur-xl border-b border-border shadow-soft" 
          : "bg-transparent"
      }`}
    >
      <nav className="container-content flex h-16 md:h-18 items-center justify-between">
        {/* Logo */}
        <Link href="/" className="flex items-center gap-2 shrink-0">
          <Logo size="md" />
        </Link>

        {/* Desktop Navigation */}
        <div className="hidden md:flex items-center gap-1">
          <Link 
            href="/guides" 
            className="px-4 py-2 text-body-sm text-muted hover:text-foreground transition-colors rounded-button hover:bg-border-light"
          >
            Guides
          </Link>
          <Link 
            href="/workflows" 
            className="px-4 py-2 text-body-sm text-muted hover:text-foreground transition-colors rounded-button hover:bg-border-light"
          >
            Workflows
          </Link>
          <Link 
            href="/pricing" 
            className="px-4 py-2 text-body-sm text-muted hover:text-foreground transition-colors rounded-button hover:bg-border-light"
          >
            Pricing
          </Link>
          <Link 
            href="/about" 
            className="px-4 py-2 text-body-sm text-muted hover:text-foreground transition-colors rounded-button hover:bg-border-light"
          >
            About
          </Link>
        </div>

        {/* CTA Button */}
        <div className="hidden md:flex items-center gap-4">
          <Link 
            href="/contact" 
            className="text-body-sm text-muted hover:text-foreground transition-colors"
          >
            Contact
          </Link>
          <Link 
            href="/guides" 
            className="btn-primary text-body-sm !py-2.5 !px-5"
          >
            Start Learning
          </Link>
        </div>

        {/* Mobile Menu Button */}
        <button
          type="button"
          className="md:hidden p-2 -mr-2 text-muted hover:text-foreground transition-colors"
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          aria-label="Toggle menu"
        >
          {mobileMenuOpen ? (
            <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
            </svg>
          ) : (
            <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5" />
            </svg>
          )}
        </button>
      </nav>

      {/* Mobile Menu */}
      {mobileMenuOpen && (
        <div className="md:hidden absolute top-full left-0 right-0 bg-background border-b border-border shadow-card animate-fade-in">
          <div className="container-content py-4 flex flex-col gap-1">
            <Link
              href="/guides"
              className="text-body text-foreground py-3 px-2 rounded-button hover:bg-border-light transition-colors"
              onClick={() => setMobileMenuOpen(false)}
            >
              Guides
            </Link>
            <Link
              href="/workflows"
              className="text-body text-foreground py-3 px-2 rounded-button hover:bg-border-light transition-colors"
              onClick={() => setMobileMenuOpen(false)}
            >
              Workflows
            </Link>
            <Link
              href="/pricing"
              className="text-body text-foreground py-3 px-2 rounded-button hover:bg-border-light transition-colors"
              onClick={() => setMobileMenuOpen(false)}
            >
              Pricing
            </Link>
            <Link
              href="/about"
              className="text-body text-foreground py-3 px-2 rounded-button hover:bg-border-light transition-colors"
              onClick={() => setMobileMenuOpen(false)}
            >
              About
            </Link>
            <Link
              href="/contact"
              className="text-body text-foreground py-3 px-2 rounded-button hover:bg-border-light transition-colors"
              onClick={() => setMobileMenuOpen(false)}
            >
              Contact
            </Link>
            <div className="pt-3 mt-2 border-t border-border">
              <Link
                href="/guides"
                className="btn-primary w-full text-center"
                onClick={() => setMobileMenuOpen(false)}
              >
                Start Learning Free
              </Link>
            </div>
          </div>
        </div>
      )}
    </header>
  )
}
