import Link from "next/link"
import type { Tool } from "@/lib/tools"
import { DemoLoop } from "./DemoLoop"

interface ToolCardProps {
  tool: Tool
  variant?: "grid" | "full"
}

function PrivacyBadge({ level }: { level: Tool["privacy"] }) {
  const colors = {
    green: "bg-success/10 text-success",
    yellow: "bg-warning/10 text-warning",
    red: "bg-error/10 text-error",
  }

  const labels = {
    green: "Privacy-friendly",
    yellow: "Review settings",
    red: "Caution",
  }

  return (
    <span className={`px-2 py-0.5 rounded-full text-xs font-medium ${colors[level]}`}>
      {labels[level]}
    </span>
  )
}

export function ToolCard({ tool, variant = "grid" }: ToolCardProps) {
  if (variant === "grid") {
    return (
      <Link
        href={`/tools/${tool.slug}`}
        className="group block bg-card rounded-card border border-border p-6 shadow-card hover:shadow-card-hover transition-all duration-200 hover:-translate-y-0.5"
      >
        <div className="flex items-start justify-between mb-4">
          <div>
            <h3 className="text-heading-xs text-card-foreground group-hover:text-accent transition-colors">
              {tool.name}
            </h3>
            <p className="text-muted text-body-sm mt-1">{tool.tagline}</p>
          </div>
          <PrivacyBadge level={tool.privacy} />
        </div>

        <DemoLoop
          src={tool.demoVideo}
          alt={`${tool.name} demo`}
          className="w-full h-40 object-cover mb-4"
        />

        <div className="grid grid-cols-2 gap-4 text-sm">
          <div className="flex items-center gap-2">
            <span className="text-muted">Setup:</span>
            <span className="font-medium text-card-foreground">{tool.setupTime}</span>
          </div>
          <div className="flex items-center gap-2">
            <span className="text-muted">Cost:</span>
            <span className="font-medium text-card-foreground">{tool.cost}</span>
          </div>
          <div className="col-span-2 flex items-center gap-2">
            <span className="text-accent">Time saved:</span>
            <span className="font-semibold text-accent">{tool.timeSaved}</span>
          </div>
        </div>
      </Link>
    )
  }

  // Full variant for tool detail pages
  return (
    <div className="bg-card rounded-card border border-border shadow-card overflow-hidden">
      {/* Header */}
      <div className="p-4 md:p-8 border-b border-border">
        <div className="flex items-start justify-between gap-3 mb-2">
          <h1 className="text-heading-md md:text-heading-lg text-card-foreground">{tool.name}</h1>
          <PrivacyBadge level={tool.privacy} />
        </div>
        <p className="text-body text-muted">{tool.tagline}</p>
      </div>

      {/* Stats Bar */}
      <div className="grid grid-cols-2 md:grid-cols-4 divide-x divide-border bg-background">
        <div className="p-3 md:p-4 text-center border-b md:border-b-0 border-border">
          <div className="text-muted text-xs md:text-sm mb-1">Setup</div>
          <div className="font-semibold text-card-foreground text-sm md:text-base">{tool.setupTime}</div>
        </div>
        <div className="p-3 md:p-4 text-center border-b md:border-b-0 border-border">
          <div className="text-muted text-xs md:text-sm mb-1">Cost</div>
          <div className="font-semibold text-card-foreground text-sm md:text-base">{tool.cost}</div>
        </div>
        <div className="p-3 md:p-4 text-center flex flex-col items-center">
          <div className="text-muted text-xs md:text-sm mb-1">Privacy</div>
          <PrivacyBadge level={tool.privacy} />
        </div>
        <div className="p-3 md:p-4 text-center">
          <div className="text-muted text-xs md:text-sm mb-1">Time Saved</div>
          <div className="font-semibold text-accent text-sm md:text-base">{tool.timeSaved}</div>
        </div>
      </div>

      {/* Demo */}
      <div className="p-4 md:p-8 border-b border-border">
        <DemoLoop
          src={tool.demoVideo}
          alt={`${tool.name} demo showing prompt to output`}
          className="w-full h-48 md:h-80 object-cover"
          variant="interactive"
        />
      </div>

      {/* Use Cases */}
      <div className="p-4 md:p-8 border-b border-border">
        <h2 className="text-heading-sm text-card-foreground mb-4 md:mb-6">3 Use Cases</h2>
        <div className="space-y-4">
          {tool.useCases.map((useCase, index) => (
            <div
              key={index}
              className="flex items-start gap-4 p-4 bg-background rounded-lg"
            >
              <div className="w-8 h-8 rounded-full bg-accent/10 text-accent flex items-center justify-center font-semibold text-sm">
                {index + 1}
              </div>
              <div>
                <div className="font-medium text-card-foreground">
                  <span className="text-accent">{useCase.role}:</span> {useCase.task}
                </div>
                <div className="text-muted text-sm mt-1">→ {useCase.outcome}</div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* What Is It - Explanation */}
      {tool.whatIsIt && (
        <div className="p-4 md:p-8 border-b border-border bg-gradient-to-br from-accent/5 to-accent/10">
          <h2 className="text-heading-sm text-card-foreground mb-4 flex items-center gap-2">
            <svg className="w-5 h-5 text-accent" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            What is {tool.name}?
          </h2>
          <p className="text-card-foreground/90 text-base md:text-lg leading-relaxed">
            {tool.whatIsIt}
          </p>
        </div>
      )}

      {/* System Requirements */}
      {tool.systemRequirements && (
        <div className="p-4 md:p-8 border-b border-border">
          <h2 className="text-heading-sm text-card-foreground mb-4 flex items-center gap-2">
            <svg className="w-5 h-5 text-accent" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
            </svg>
            System Requirements
          </h2>
          <div className="grid md:grid-cols-2 gap-6">
            {/* Supported Browsers */}
            {tool.systemRequirements.browsers && tool.systemRequirements.browsers.length > 0 && (
              <div className="bg-success/5 rounded-lg p-4 border border-success/20">
                <h3 className="font-semibold text-card-foreground text-sm mb-3 flex items-center gap-2">
                  <svg className="w-4 h-4 text-success" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  Supported Browsers
                </h3>
                <ul className="space-y-1.5">
                  {tool.systemRequirements.browsers.map((browser, i) => (
                    <li key={i} className="text-sm text-card-foreground/80 flex items-center gap-2">
                      <span className="text-success">✓</span>
                      {browser}
                    </li>
                  ))}
                </ul>
              </div>
            )}

            {/* Operating Systems */}
            {tool.systemRequirements.operatingSystems && tool.systemRequirements.operatingSystems.length > 0 && (
              <div className="bg-accent/5 rounded-lg p-4 border border-accent/20">
                <h3 className="font-semibold text-card-foreground text-sm mb-3 flex items-center gap-2">
                  <svg className="w-4 h-4 text-accent" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                  </svg>
                  Operating Systems
                </h3>
                <ul className="space-y-1.5">
                  {tool.systemRequirements.operatingSystems.map((os, i) => (
                    <li key={i} className="text-sm text-card-foreground/80 flex items-center gap-2">
                      <span className="text-accent">✓</span>
                      {os}
                    </li>
                  ))}
                </ul>
              </div>
            )}

            {/* Prerequisites */}
            {tool.systemRequirements.prerequisites && tool.systemRequirements.prerequisites.length > 0 && (
              <div className="bg-warning/5 rounded-lg p-4 border border-warning/20">
                <h3 className="font-semibold text-card-foreground text-sm mb-3 flex items-center gap-2">
                  <svg className="w-4 h-4 text-warning" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
                  </svg>
                  You&apos;ll Need First
                </h3>
                <ul className="space-y-1.5">
                  {tool.systemRequirements.prerequisites.map((prereq, i) => (
                    <li key={i} className="text-sm text-card-foreground/80 flex items-center gap-2">
                      <span className="text-warning">→</span>
                      {prereq}
                    </li>
                  ))}
                </ul>
              </div>
            )}

            {/* Not Supported */}
            {tool.systemRequirements.notSupported && tool.systemRequirements.notSupported.length > 0 && (
              <div className="bg-error/5 rounded-lg p-4 border border-error/20">
                <h3 className="font-semibold text-card-foreground text-sm mb-3 flex items-center gap-2">
                  <svg className="w-4 h-4 text-error" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                  Not Supported
                </h3>
                <ul className="space-y-1.5">
                  {tool.systemRequirements.notSupported.map((item, i) => (
                    <li key={i} className="text-sm text-card-foreground/80 flex items-center gap-2">
                      <span className="text-error">✗</span>
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </div>
        </div>
      )}

      {/* Skill Collections */}
      {tool.skillCollections && tool.skillCollections.length > 0 && (
        <div className="p-4 md:p-8 border-b border-border">
          <h2 className="text-heading-sm text-card-foreground mb-2">Skill Collections</h2>
          <p className="text-muted text-sm mb-6">
            Free, open-source skill packs that add specialized expertise to Claude Code. Click any to install.
          </p>
          <div className="grid gap-4 md:gap-6">
            {tool.skillCollections.map((collection, index) => (
              <div
                key={index}
                className="bg-background rounded-xl border border-border p-5 md:p-6 hover:border-accent/50 hover:shadow-lg transition-all duration-200"
              >
                {/* Header */}
                <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-3 mb-4">
                  <div>
                    <h3 className="text-lg font-semibold text-card-foreground flex items-center gap-2">
                      <span className="w-8 h-8 rounded-lg bg-accent/10 flex items-center justify-center text-accent text-sm font-bold">
                        {index + 1}
                      </span>
                      {collection.name}
                    </h3>
                    <p className="text-muted text-sm mt-1">{collection.forWho}</p>
                  </div>
                  <span className="px-3 py-1 bg-accent/10 text-accent text-sm font-medium rounded-full whitespace-nowrap">
                    {collection.skillCount}
                  </span>
                </div>

                {/* Description */}
                <p className="text-card-foreground/80 text-sm mb-4 leading-relaxed">
                  {collection.description}
                </p>

                {/* Highlights */}
                <div className="mb-4">
                  <div className="text-xs font-semibold text-muted uppercase tracking-wide mb-2">
                    Key Skills Included
                  </div>
                  <ul className="grid sm:grid-cols-2 gap-2">
                    {collection.highlights.map((highlight, hIndex) => (
                      <li key={hIndex} className="flex items-start gap-2 text-sm">
                        <span className="text-accent mt-0.5">→</span>
                        <span className="text-card-foreground/80">{highlight}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* GitHub Link */}
                <a
                  href={collection.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 px-4 py-2 bg-card hover:bg-accent/10 border border-border hover:border-accent rounded-lg text-sm font-medium text-card-foreground hover:text-accent transition-colors"
                >
                  <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
                  </svg>
                  View on GitHub
                  <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                  </svg>
                </a>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Quickstart */}
      <div className="p-4 md:p-8 border-b border-border">
        <h2 className="text-heading-sm text-card-foreground mb-4 md:mb-6">Quickstart Guide</h2>
        <ol className="space-y-6">
          {tool.quickstart.map((step, index) => {
            const isOption = typeof step !== "string" && step.isOption
            const nextStep = tool.quickstart[index + 1]
            const nextIsOption = nextStep && typeof nextStep !== "string" && nextStep.isOption
            const prevStep = tool.quickstart[index - 1]
            const prevIsOption = prevStep && typeof prevStep !== "string" && prevStep.isOption

            // Get step number accounting for option groupings
            let stepNumber = index + 1
            for (let i = 0; i < index; i++) {
              const s = tool.quickstart[i]
              if (typeof s !== "string" && s.isOption) {
                const nextS = tool.quickstart[i + 1]
                if (nextS && typeof nextS !== "string" && nextS.isOption) {
                  stepNumber--
                }
              }
            }

            return (
              <li key={index} className="relative">
                {/* Show OR divider between consecutive options */}
                {isOption && prevIsOption && (
                  <div className="flex items-center gap-3 mb-6 -mt-3">
                    <div className="flex-1 h-px bg-border"></div>
                    <span className="px-3 py-1 bg-warning/10 text-warning font-bold text-sm rounded-full">OR</span>
                    <div className="flex-1 h-px bg-border"></div>
                  </div>
                )}

                <div className={`flex items-start gap-3 ${isOption ? "p-4 rounded-lg border-2 border-dashed border-accent/30 bg-accent/5" : ""}`}>
                  <span className={`w-7 h-7 rounded-full flex items-center justify-center text-sm font-semibold flex-shrink-0 mt-0.5 ${
                    isOption ? "bg-warning/20 text-warning" : "bg-accent text-accent-foreground"
                  }`}>
                    {isOption ? (prevIsOption ? "B" : "A") : stepNumber}
                  </span>
                  <div className="flex-1">
                    <div className="flex items-center gap-2 flex-wrap">
                      <span className={`font-medium text-sm md:text-base ${isOption ? "text-warning" : "text-card-foreground"}`}>
                        {typeof step === "string" ? step : step.text}
                      </span>
                      {typeof step !== "string" && step.link && (
                        <a
                          href={step.link}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-accent hover:text-accent-dark underline text-sm"
                        >
                          ↗
                        </a>
                      )}
                    </div>
                    {typeof step !== "string" && step.substeps && step.substeps.length > 0 && (
                      <ul className="mt-2 ml-0 space-y-1.5">
                        {step.substeps.map((substep, subIndex) => (
                          <li key={subIndex} className="flex items-start gap-2 text-sm text-muted">
                            <span className="text-accent/60 mt-1">›</span>
                            <span className="text-card-foreground/80">{substep}</span>
                          </li>
                        ))}
                      </ul>
                    )}
                  </div>
                </div>
              </li>
            )
          })}
        </ol>
      </div>

      {/* Pro Tips */}
      {tool.proTips && tool.proTips.length > 0 && (
        <div className="p-4 md:p-8 border-b border-border bg-accent/5">
          <h2 className="text-heading-sm text-card-foreground mb-4 md:mb-6 flex items-center gap-2">
            <svg className="w-5 h-5 text-accent" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
            </svg>
            Pro Tips
          </h2>
          <ul className="space-y-3">
            {tool.proTips.map((tip, index) => (
              <li key={index} className="flex items-start gap-3">
                <span className="text-accent font-bold text-lg leading-none mt-0.5">•</span>
                <span className="text-card-foreground text-sm md:text-base">{tip}</span>
              </li>
            ))}
          </ul>
        </div>
      )}

      {/* Privacy Flags */}
      <div className="p-4 md:p-8 border-b border-border bg-background">
        <h2 className="text-heading-sm text-card-foreground mb-4 flex items-center gap-2">
          <svg className="w-5 h-5 text-muted" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
          </svg>
          <span>Privacy & Compliance</span>
        </h2>
        <div className="space-y-0">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between py-3 border-b border-border gap-1">
            <span className="text-muted text-sm">Data retention</span>
            <span className="font-medium text-card-foreground text-sm sm:text-right max-w-xs">
              {tool.privacyFlags.dataRetention}
            </span>
          </div>
          <div className="flex flex-col sm:flex-row sm:items-center justify-between py-3 border-b border-border gap-1">
            <span className="text-muted text-sm">Training on your data</span>
            <span className={`font-medium text-sm sm:text-right max-w-xs ${
              tool.privacyFlags.trainingOnData.toLowerCase().includes("no")
                ? "text-success"
                : tool.privacyFlags.trainingOnData.toLowerCase().includes("yes")
                  ? "text-warning"
                  : "text-card-foreground"
            }`}>
              {tool.privacyFlags.trainingOnData}
            </span>
          </div>
          <div className="flex flex-col sm:flex-row sm:items-center justify-between py-3 border-b border-border gap-1">
            <span className="text-muted text-sm">Enterprise option</span>
            <span className="font-medium text-card-foreground text-sm sm:text-right max-w-xs">
              {tool.privacyFlags.enterpriseOption}
            </span>
          </div>
          {tool.privacyFlags.hipaaAvailable && (
            <div className="flex flex-col sm:flex-row sm:items-center justify-between py-3 border-b border-border gap-1">
              <span className="text-muted text-sm">HIPAA / BAA available</span>
              <span className={`font-medium text-sm sm:text-right max-w-xs ${
                tool.privacyFlags.hipaaAvailable.toLowerCase().includes("yes")
                  ? "text-success"
                  : "text-card-foreground"
              }`}>
                {tool.privacyFlags.hipaaAvailable}
              </span>
            </div>
          )}
          {tool.privacyFlags.optOutMethod && (
            <div className="flex flex-col sm:flex-row sm:items-start justify-between py-3 gap-1">
              <span className="text-muted text-sm">How to opt out</span>
              <span className="font-medium text-card-foreground text-sm sm:text-right max-w-xs">
                {tool.privacyFlags.optOutMethod}
              </span>
            </div>
          )}
        </div>
      </div>

      {/* Related Tools */}
      <div className="p-4 md:p-8">
        <h2 className="text-heading-sm text-card-foreground mb-4">Related Tools</h2>
        <div className="flex flex-col sm:flex-row sm:flex-wrap gap-3">
          {tool.relatedTools.map((related) => (
            <Link
              key={related.slug}
              href={`/tools/${related.slug}`}
              className="px-4 py-2 bg-background rounded-lg border border-border hover:border-accent hover:text-accent transition-colors text-sm md:text-base"
            >
              <span className="font-medium">{related.name}</span>
              <span className="text-muted text-sm ml-2">— {related.useCase}</span>
            </Link>
          ))}
        </div>
      </div>
    </div>
  )
}
