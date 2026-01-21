import { Metadata } from "next"
import Link from "next/link"

export const metadata: Metadata = {
  title: "AI Workshops for Teams",
  description:
    "Hands-on workshops teaching your team to use AI tools effectively. Half-day and full-day sessions with 90-day support. 100% money-back guarantee.",
  openGraph: {
    title: "AI Workshops for Teams - AI Tools Hub",
    description:
      "In-person workshops that get your team using AI tools by end of day. No theory. Just hands-on implementation with 90-day support.",
    type: "website",
    url: "/workshops",
  },
  twitter: {
    card: "summary_large_image",
    title: "AI Workshops for Teams",
    description:
      "In-person workshops that get your team using AI tools by end of day. 100% money-back guarantee.",
  },
}

const WORKSHOP_PACKAGES = [
  {
    name: "Team Starter",
    duration: "Half-day (4 hours)",
    teamSize: "5-10 people",
    tools: 3,
    features: [
      "Hands-on setup of 3 core tools",
      "Custom workflow design for your team",
      "Live Q&A and troubleshooting",
      "30-day email support",
    ],
    price: "$2,000",
  },
  {
    name: "Full Implementation",
    duration: "Full-day (8 hours)",
    teamSize: "5-20 people",
    tools: 5,
    features: [
      "Hands-on setup of 5 tools",
      "Department-specific workflows",
      "Integration between tools",
      "Individual coaching sessions",
      "90-day email support",
    ],
    price: "$3,300",
    popular: true,
  },
  {
    name: "Enterprise",
    duration: "Multi-day",
    teamSize: "20+ people",
    tools: "Unlimited",
    features: [
      "Full organizational rollout",
      "Custom training materials",
      "Executive briefings",
      "Change management support",
      "Dedicated support channel",
    ],
    price: "Custom",
  },
]

export default function WorkshopsPage() {
  return (
    <div className="section">
      <div className="container-content">
        {/* Hero */}
        <div className="max-w-3xl mx-auto text-center mb-16">
          <h1 className="text-heading-lg text-foreground mb-6">
            Stop Googling. Start Doing.
          </h1>
          <p className="text-body-lg text-muted mb-8">
            In-person workshops that get your team using AI tools by end of day.
            No theory. No slides. Just hands-on implementation.
          </p>
          <Link href="/#calculator" className="btn-primary">
            Calculate Your Team&apos;s Savings First
          </Link>
        </div>

        {/* Guarantee */}
        <div className="bg-accent/5 border border-accent/20 rounded-card p-8 max-w-2xl mx-auto mb-16 text-center">
          <h2 className="text-heading-sm text-foreground mb-4">
            Our Guarantee
          </h2>
          <p className="text-body text-muted">
            If your team does not save at least 10 hours in the first month after
            our workshop, we will refund 100% of your investment. No questions asked.
          </p>
        </div>

        {/* Packages */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
          {WORKSHOP_PACKAGES.map((pkg) => (
            <div
              key={pkg.name}
              className={`card p-8 relative ${
                pkg.popular ? "border-accent border-2" : ""
              }`}
            >
              {pkg.popular && (
                <span className="absolute -top-3 left-1/2 -translate-x-1/2 bg-accent text-accent-foreground px-4 py-1 rounded-full text-sm font-medium">
                  Most Popular
                </span>
              )}
              <h3 className="text-heading-sm text-card-foreground mb-2">
                {pkg.name}
              </h3>
              <div className="text-3xl font-bold text-accent mb-6">
                {pkg.price}
              </div>
              <div className="space-y-2 text-sm text-muted mb-6">
                <div>Duration: {pkg.duration}</div>
                <div>Team size: {pkg.teamSize}</div>
                <div>Tools covered: {pkg.tools}</div>
              </div>
              <ul className="space-y-3 mb-8">
                {pkg.features.map((feature, index) => (
                  <li
                    key={index}
                    className="flex items-start gap-2 text-card-foreground"
                  >
                    <svg
                      className="w-5 h-5 text-success flex-shrink-0 mt-0.5"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M5 13l4 4L19 7"
                      />
                    </svg>
                    {feature}
                  </li>
                ))}
              </ul>
              <a
                href="mailto:workshops@aitools.hub?subject=Workshop Inquiry"
                className={`block text-center py-3 rounded-button font-semibold transition-colors ${
                  pkg.popular
                    ? "bg-accent text-accent-foreground hover:bg-accent-dark"
                    : "bg-background border border-border hover:border-accent hover:text-accent"
                }`}
              >
                Get Started
              </a>
            </div>
          ))}
        </div>

        {/* What You'll Learn */}
        <div className="max-w-3xl mx-auto">
          <h2 className="text-heading-md text-foreground text-center mb-8">
            What Your Team Will Learn
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {[
              "Set up and configure core AI tools",
              "Write effective prompts that get results",
              "Build automated workflows with Zapier",
              "Understand privacy and security best practices",
              "Integrate AI into existing processes",
              "Troubleshoot common issues independently",
            ].map((item, index) => (
              <div
                key={index}
                className="flex items-center gap-3 p-4 bg-card rounded-lg border border-border"
              >
                <span className="w-8 h-8 rounded-full bg-accent/10 text-accent flex items-center justify-center font-semibold text-sm">
                  {index + 1}
                </span>
                <span className="text-card-foreground">{item}</span>
              </div>
            ))}
          </div>
        </div>

        {/* CTA */}
        <div className="mt-16 text-center">
          <p className="text-muted mb-4">
            Not sure which package is right for your team?
          </p>
          <a
            href="mailto:workshops@aitools.hub?subject=Workshop Consultation"
            className="text-accent hover:underline font-medium"
          >
            Schedule a free 15-minute consultation →
          </a>
        </div>
      </div>
    </div>
  )
}
