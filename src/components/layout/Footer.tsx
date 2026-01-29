import Link from "next/link"
import { Logo } from "@/components/Logo"

export function Footer() {
  return (
    <footer className="border-t border-border bg-section-light">
      <div className="container-content py-16 md:py-20">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10 md:gap-12">
          {/* Brand */}
          <div className="sm:col-span-2 lg:col-span-1">
            <Link href="/" className="inline-flex items-center gap-2 mb-5">
              <Logo size="sm" />
            </Link>
            <p className="text-body-sm text-muted leading-relaxed max-w-xs">
              Free guides that teach non-technical people how to use AI tools 
              that didn&apos;t exist a year ago.
            </p>
          </div>

          {/* Learn */}
          <div>
            <h4 className="text-body-sm font-semibold text-foreground uppercase tracking-wide mb-4">
              Learn
            </h4>
            <ul className="space-y-3">
              <li>
                <Link 
                  href="/guides" 
                  className="text-body-sm text-muted hover:text-foreground transition-colors"
                >
                  All Guides
                </Link>
              </li>
              <li>
                <Link 
                  href="/tools/claude" 
                  className="text-body-sm text-muted hover:text-foreground transition-colors"
                >
                  Claude
                </Link>
              </li>
              <li>
                <Link 
                  href="/tools/claude-code" 
                  className="text-body-sm text-muted hover:text-foreground transition-colors"
                >
                  Claude Code
                </Link>
              </li>
              <li>
                <Link 
                  href="/tools/manus-ai" 
                  className="text-body-sm text-muted hover:text-foreground transition-colors"
                >
                  Manus AI
                </Link>
              </li>
              <li>
                <Link 
                  href="/workflows" 
                  className="text-body-sm text-muted hover:text-foreground transition-colors"
                >
                  Workflows
                </Link>
              </li>
            </ul>
          </div>

          {/* Services */}
          <div>
            <h4 className="text-body-sm font-semibold text-foreground uppercase tracking-wide mb-4">
              Services
            </h4>
            <ul className="space-y-3">
              <li>
                <Link 
                  href="/pricing" 
                  className="text-body-sm text-muted hover:text-foreground transition-colors"
                >
                  Pricing
                </Link>
              </li>
              <li>
                <Link 
                  href="/pricing#one-on-one" 
                  className="text-body-sm text-muted hover:text-foreground transition-colors"
                >
                  1:1 Setup Help
                </Link>
              </li>
              <li>
                <Link 
                  href="/workshops" 
                  className="text-body-sm text-muted hover:text-foreground transition-colors"
                >
                  Team Workshops
                </Link>
              </li>
            </ul>
          </div>

          {/* Company */}
          <div>
            <h4 className="text-body-sm font-semibold text-foreground uppercase tracking-wide mb-4">
              Company
            </h4>
            <ul className="space-y-3">
              <li>
                <Link 
                  href="/about" 
                  className="text-body-sm text-muted hover:text-foreground transition-colors"
                >
                  About
                </Link>
              </li>
              <li>
                <Link 
                  href="/contact" 
                  className="text-body-sm text-muted hover:text-foreground transition-colors"
                >
                  Contact
                </Link>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom */}
        <div className="mt-16 pt-8 border-t border-border flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-body-xs text-muted">
            © {new Date().getFullYear()} Practical Library. All rights reserved.
          </p>
          <p className="text-body-xs text-muted">
            Built with the tools we teach.
          </p>
        </div>
      </div>
    </footer>
  )
}
