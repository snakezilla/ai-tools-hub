import Link from "next/link"
import { Logo } from "@/components/Logo"

export function Footer() {
  return (
    <footer className="border-t border-border bg-card-DEFAULT">
      <div className="container-content py-12 md:py-16">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-8 md:gap-12">
          {/* Brand */}
          <div className="sm:col-span-2">
            <Link href="/" className="flex items-center gap-2">
              <Logo size="sm" />
            </Link>
            <p className="mt-4 text-body-sm text-muted max-w-md">
              Free educational content that teaches non-technical users how to use high-impact AI tools.
              Save 10+ hours per week with tools that didn&apos;t exist a year ago.
            </p>
          </div>

          {/* Free Tools */}
          <div>
            <h4 className="text-body font-semibold text-foreground mb-4">Free Guides</h4>
            <ul className="space-y-3">
              <li>
                <Link href="/tools/claude" className="text-body-sm text-muted hover:text-foreground transition-colors">
                  Claude
                </Link>
              </li>
              <li>
                <Link href="/tools/claude-code" className="text-body-sm text-muted hover:text-foreground transition-colors">
                  Claude Code
                </Link>
              </li>
              <li>
                <Link href="/tools/manus-ai" className="text-body-sm text-muted hover:text-foreground transition-colors">
                  Manus AI
                </Link>
              </li>
              <li>
                <Link href="/guides" className="text-body-sm text-muted hover:text-foreground transition-colors">
                  All Guides →
                </Link>
              </li>
            </ul>
          </div>

          {/* Paid */}
          <div>
            <h4 className="text-body font-semibold text-foreground mb-4">Paid Products</h4>
            <ul className="space-y-3">
              <li>
                <Link href="/courses/claude-code-essentials" className="text-body-sm text-muted hover:text-foreground transition-colors">
                  Claude Code Essentials
                </Link>
              </li>
              <li>
                <Link href="/courses/ai-workflow-builder" className="text-body-sm text-muted hover:text-foreground transition-colors">
                  AI Workflow Builder
                </Link>
              </li>
              <li>
                <Link href="/pricing#one-on-one" className="text-body-sm text-muted hover:text-foreground transition-colors">
                  1:1 Walkthroughs
                </Link>
              </li>
              <li>
                <Link href="/workshops" className="text-body-sm text-muted hover:text-foreground transition-colors">
                  Team Workshops
                </Link>
              </li>
            </ul>
          </div>

          {/* Company */}
          <div>
            <h4 className="text-body font-semibold text-foreground mb-4">Company</h4>
            <ul className="space-y-3">
              <li>
                <Link href="/about" className="text-body-sm text-muted hover:text-foreground transition-colors">
                  About
                </Link>
              </li>
              <li>
                <Link href="/contact" className="text-body-sm text-muted hover:text-foreground transition-colors">
                  Contact
                </Link>
              </li>
              <li>
                <Link href="/pricing" className="text-body-sm text-muted hover:text-foreground transition-colors">
                  Pricing
                </Link>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom */}
        <div className="mt-12 pt-8 border-t border-border flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-body-sm text-muted">
            {new Date().getFullYear()} Practical Library. All rights reserved.
          </p>
          <p className="text-body-sm text-muted">
            Built with tools we teach.
          </p>
        </div>
      </div>
    </footer>
  )
}
