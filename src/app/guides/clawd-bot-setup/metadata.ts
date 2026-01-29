import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Clawd.bot Setup Guide for Beginners | Complete Mac & Windows Tutorial',
  description: 'Step-by-step guide to install Clawd.bot on Mac or Windows. Connect Telegram or WhatsApp. No coding experience needed. 30 minutes to full setup.',
  keywords: [
    'clawd.bot setup',
    'clawd.bot installation',
    'clawd.bot Mac',
    'clawd.bot Windows',
    'clawd.bot Telegram',
    'clawd.bot WhatsApp',
    'personal AI assistant',
    'self-hosted AI',
    'AI bot setup guide',
    'beginner tutorial',
  ],
  authors: [{ name: 'Practical Library' }],
  openGraph: {
    title: 'Clawd.bot Complete Setup Guide for Beginners',
    description: 'Install your personal AI assistant in 30 minutes. Mac, Windows, Telegram, WhatsApp—all covered.',
    url: 'https://practicallibrary.com/guides/clawd-bot-setup',
    type: 'article',
    images: [
      {
        url: 'https://practicallibrary.com/og/clawd-bot-setup.png',
        width: 1200,
        height: 630,
        alt: 'Clawd.bot Setup Guide',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Clawd.bot Setup Guide for Beginners',
    description: 'Install your personal AI assistant in 30 minutes.',
    images: ['https://practicallibrary.com/og/clawd-bot-setup.png'],
  },
  alternates: {
    canonical: 'https://practicallibrary.com/guides/clawd-bot-setup',
  },
}

export const schemaMarkup = {
  '@context': 'https://schema.org',
  '@type': 'HowTo',
  name: 'How to Set Up Clawd.bot',
  description: 'Complete beginner-friendly guide to installing and configuring Clawd.bot on Mac or Windows with Telegram or WhatsApp integration',
  estimatedTime: 'PT30M',
  image: 'https://practicallibrary.com/og/clawd-bot-setup.png',
  step: [
    {
      '@type': 'HowToStep',
      name: 'Mac Setup: Install Homebrew and Node.js',
      text: 'Install Homebrew package manager, then use it to install NVM (Node Version Manager) and Node.js 22+',
      url: 'https://practicallibrary.com/guides/clawd-bot-setup#step-1-open-terminal',
    },
    {
      '@type': 'HowToStep',
      name: 'Windows Setup: Install WSL2 and Ubuntu',
      text: 'Open PowerShell as Administrator and run wsl --install to set up Windows Subsystem for Linux',
      url: 'https://practicallibrary.com/guides/clawd-bot-setup#step-1-open-powershell-as-administrator',
    },
    {
      '@type': 'HowToStep',
      name: 'Install Clawd.bot',
      text: 'Install pnpm and Clawd.bot via npm, then run the onboarding wizard',
      url: 'https://practicallibrary.com/guides/clawd-bot-setup#step-7-install-clawdbot',
    },
    {
      '@type': 'HowToStep',
      name: 'Connect Telegram or WhatsApp',
      text: 'Create a Telegram bot with @BotFather or scan a QR code to connect WhatsApp',
      url: 'https://practicallibrary.com/guides/clawd-bot-setup#part-3-set-up-telegram',
    },
    {
      '@type': 'HowToStep',
      name: 'Test Your Setup',
      text: 'Send a message on Telegram or WhatsApp and verify Clawd.bot responds',
      url: 'https://practicallibrary.com/guides/clawd-bot-setup#step-3-test-it',
    },
  ],
  tool: [
    {
      '@type': 'HowToTool',
      name: 'Mac Terminal or Windows PowerShell',
    },
    {
      '@type': 'HowToTool',
      name: 'Telegram App',
    },
    {
      '@type': 'HowToTool',
      name: 'WhatsApp App',
    },
  ],
}
