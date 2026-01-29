import { Metadata } from 'next'
import Script from 'next/script'
import { metadata as guideMetadata, schemaMarkup } from './metadata'

export const metadata: Metadata = guideMetadata

export default function ClawdBotSetupLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <Script
        id="clawd-bot-schema"
        type="application/ld+json"
        strategy="afterInteractive"
      >
        {JSON.stringify(schemaMarkup)}
      </Script>
      {children}
    </>
  )
}
