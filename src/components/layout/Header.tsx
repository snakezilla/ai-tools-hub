"use client"

import Link from "next/link"
import { useState } from "react"
import { roleCategories } from "@/lib/tools"

export function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const [categoriesOpen, setCategoriesOpen] = useState(false)

  return (
    <header className="sticky top-0 z-50 border-b border-border bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/80">
      <nav className="container-content flex h-16 items-center justify-between">
        {/* Logo */}
        <Link href="/" className="flex items-center gap-2">
          <span className="text-heading-xs text-foreground">AI Tools Hub</span>
        </Link>

        {/* Desktop Navigation */}
        <div className="hidden md:flex items-center gap-8">
          <Link href="/#tools" className="text-body-sm text-muted hover:text-foreground transition-colors">
            Tools
          </Link>
          <Link href="/workflows" className="text-body-sm text-muted hover:text-foreground transition-colors">
            Workflows
          </Link>

          {/* Categories Dropdown */}
          <div className="relative">
            <button
              type="button"
              className="text-body-sm text-muted hover:text-foreground transition-colors flex items-center gap-1"
              onClick={() => setCategoriesOpen(!categoriesOpen)}
              onBlur={() => setTimeout(() => setCategoriesOpen(false), 150)}
            >
              Categories
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
              </svg>
            </button>
            {categoriesOpen && (
              <div className="absolute top-full left-0 mt-2 w-48 bg-card border border-border rounded-lg shadow-lg py-2">
                {roleCategories.map((cat) => (
                  <Link
                    key={cat.slug}
                    href={`/category/${cat.slug}`}
                    className="block px-4 py-2 text-sm text-muted hover:text-foreground hover:bg-background transition-colors"
                  >
                    {cat.name}
                  </Link>
                ))}
              </div>
            )}
          </div>

          <Link href="/workshops" className="text-body-sm text-muted hover:text-foreground transition-colors">
            Workshops
          </Link>
          <Link href="/about" className="text-body-sm text-muted hover:text-foreground transition-colors">
            About
          </Link>
          <Link href="/#calculator" className="btn-primary text-body-sm">
            Calculate ROI
          </Link>
        </div>

        {/* Mobile Menu Button */}
        <button
          type="button"
          className="md:hidden p-2 text-muted hover:text-foreground"
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
        <div className="md:hidden border-t border-border bg-background">
          <div className="container-content py-4 flex flex-col gap-4">
            <Link
              href="/#tools"
              className="text-body text-muted hover:text-foreground transition-colors py-2"
              onClick={() => setMobileMenuOpen(false)}
            >
              Tools
            </Link>
            <Link
              href="/workflows"
              className="text-body text-muted hover:text-foreground transition-colors py-2"
              onClick={() => setMobileMenuOpen(false)}
            >
              Workflows
            </Link>

            {/* Mobile Categories */}
            <div className="border-t border-border pt-4">
              <div className="text-sm text-muted mb-2">Browse by role:</div>
              <div className="flex flex-wrap gap-2">
                {roleCategories.map((cat) => (
                  <Link
                    key={cat.slug}
                    href={`/category/${cat.slug}`}
                    className="px-3 py-1 text-sm bg-card border border-border rounded-full hover:border-accent hover:text-accent transition-colors"
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    {cat.name}
                  </Link>
                ))}
              </div>
            </div>

            <Link
              href="/workshops"
              className="text-body text-muted hover:text-foreground transition-colors py-2"
              onClick={() => setMobileMenuOpen(false)}
            >
              Workshops
            </Link>
            <Link
              href="/about"
              className="text-body text-muted hover:text-foreground transition-colors py-2"
              onClick={() => setMobileMenuOpen(false)}
            >
              About
            </Link>
            <Link
              href="/#calculator"
              className="btn-primary text-center"
              onClick={() => setMobileMenuOpen(false)}
            >
              Calculate ROI
            </Link>
          </div>
        </div>
      )}
    </header>
  )
}
