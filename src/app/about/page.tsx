import { Metadata } from "next"
import Link from "next/link"

export const metadata: Metadata = {
  title: "About",
  description:
    "Free educational content teaching non-technical users how to use high-impact AI tools. No hype, just actionable steps.",
  openGraph: {
    title: "About AI Tools Hub",
    description:
      "Free, zero-fluff educational content helping non-technical users master AI tools in 5 minutes. No essays. No hype. Just actionable steps.",
    type: "website",
    url: "/about",
  },
  twitter: {
    card: "summary",
    title: "About AI Tools Hub",
    description:
      "Free educational content teaching non-technical users how to use high-impact AI tools.",
  },
}

export default function AboutPage() {
  return (
    <div className="section">
      <div className="container-narrow">
        <h1 className="text-heading-lg text-foreground mb-8">About AI Tools Hub</h1>

        <div className="prose prose-lg max-w-none">
          <p className="text-body-lg text-muted mb-8">
            AI tools have exploded in capability over the past year. But most
            people—marketers, accountants, small business owners, home users—do not
            know where to start. That is where we come in.
          </p>

          <h2 className="text-heading-sm text-foreground mt-12 mb-4">Our Mission</h2>
          <p className="text-body text-muted mb-6">
            We create free, zero-fluff educational content that helps non-technical
            users master AI tools in 5 minutes or less. No essays. No hype. Just
            actionable steps.
          </p>

          <h2 className="text-heading-sm text-foreground mt-12 mb-4">Our Philosophy</h2>
          <ul className="space-y-4 text-body text-muted mb-6">
            <li>
              <strong className="text-foreground">Zero fluff:</strong> Every word
              on this site should help you use a tool. If it does not, we cut it.
            </li>
            <li>
              <strong className="text-foreground">Scannable:</strong> You should
              get value in under 60 seconds per tool page.
            </li>
            <li>
              <strong className="text-foreground">Honest:</strong> We include
              privacy warnings and never oversell. Some tools are not for everyone.
            </li>
            <li>
              <strong className="text-foreground">Current:</strong> AI tools change
              fast. We update our content when tools change.
            </li>
          </ul>

          <h2 className="text-heading-sm text-foreground mt-12 mb-4">How We Make Money</h2>
          <p className="text-body text-muted mb-6">
            All educational content is free. We offer paid in-person workshops for
            teams who want hands-on help implementing these tools. That is it. No
            affiliate links. No sponsored content. No ads.
          </p>

          <h2 className="text-heading-sm text-foreground mt-12 mb-4">
            Why Trust Us?
          </h2>
          <p className="text-body text-muted mb-6">
            We personally test every tool before featuring it. Our validation
            criteria:
          </p>
          <ul className="space-y-2 text-body text-muted mb-6 list-disc list-inside">
            <li>Actually works (tested by us)</li>
            <li>Setup under 30 minutes</li>
            <li>Free tier or trial available</li>
            <li>Clear privacy policy</li>
            <li>Real utility demonstrated</li>
          </ul>

          <div className="mt-12 p-8 bg-card rounded-card border border-border text-center">
            <h3 className="text-heading-sm text-card-foreground mb-4">
              Ready to save 10+ hours/week?
            </h3>
            <p className="text-muted mb-6">
              Start with our foundation tools or calculate your potential savings.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href="/#tools" className="btn-primary">
                Browse Tools
              </Link>
              <Link
                href="/#calculator"
                className="px-6 py-3 border border-border rounded-button font-semibold hover:border-accent hover:text-accent transition-colors"
              >
                Calculate Savings
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
