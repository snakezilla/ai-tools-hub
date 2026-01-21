import Link from "next/link"

export function Footer() {
  return (
    <footer className="border-t border-border bg-card-DEFAULT">
      <div className="container-content py-12 md:py-16">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 md:gap-12">
          {/* Brand */}
          <div className="md:col-span-2">
            <Link href="/" className="text-heading-xs text-foreground">
              AI Tools Hub
            </Link>
            <p className="mt-4 text-body-sm text-muted max-w-md">
              Free educational content that teaches non-technical users how to use high-impact AI tools.
              Save 10+ hours per week with tools that didn&apos;t exist a year ago.
            </p>
          </div>

          {/* Tools */}
          <div>
            <h4 className="text-body font-semibold text-foreground mb-4">Foundation Tools</h4>
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
                <Link href="/tools/chatgpt" className="text-body-sm text-muted hover:text-foreground transition-colors">
                  ChatGPT
                </Link>
              </li>
              <li>
                <Link href="/tools/manus" className="text-body-sm text-muted hover:text-foreground transition-colors">
                  Manus AI
                </Link>
              </li>
            </ul>
          </div>

          {/* Company */}
          <div>
            <h4 className="text-body font-semibold text-foreground mb-4">Company</h4>
            <ul className="space-y-3">
              <li>
                <Link href="/workshops" className="text-body-sm text-muted hover:text-foreground transition-colors">
                  Workshops
                </Link>
              </li>
              <li>
                <Link href="/calculator" className="text-body-sm text-muted hover:text-foreground transition-colors">
                  ROI Calculator
                </Link>
              </li>
              <li>
                <Link href="/about" className="text-body-sm text-muted hover:text-foreground transition-colors">
                  About
                </Link>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom */}
        <div className="mt-12 pt-8 border-t border-border flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-body-sm text-muted">
            {new Date().getFullYear()} AI Tools Hub. All rights reserved.
          </p>
          <p className="text-body-sm text-muted">
            Built with tools we teach.
          </p>
        </div>
      </div>
    </footer>
  )
}
