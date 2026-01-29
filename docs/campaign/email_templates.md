# Practical Library - Email Campaign Templates

## AI Personalization Variable

Use `{{personalized_line}}` in your emails - this gets replaced with an AI-generated opener based on each company's website.

Run the enrichment script before importing leads:
```bash
ANTHROPIC_API_KEY=your_key npx ts-node scripts/enrich-leads.ts leads.csv enriched_leads.csv
```

---

## Email Sequence (3 Emails)

### Email 1: Introduction (Day 0)

**Subject:** Stop Googling AI tools. Start using them.

```
Hi {{firstName}},

{{personalized_line}}

I built Practical Library because I was tired of watching smart people waste hours trying to figure out AI tools on their own.

It's a free resource with step-by-step guides designed for non-technical people. If you can send an email, you can follow these.

The tools themselves (Claude, Zapier, Perplexity) aren't complicated — but knowing which ones to use and how to connect them? That's where most people get stuck.

Check it out: https://practicallibrary.com

– Ahsan
```

---

### Email 2: Value + Proof (Day 3)

**Subject:** 10 hours saved per week (not exaggerating)

```
{{firstName}}, quick follow-up.

The most common feedback I get: "I didn't know this was possible."

Claude Code alone saves most users 10+ hours/week once set up properly. The ROI calculator on the site lets you see the math for your specific situation.

Here's what people are automating:
→ First drafts of content, emails, reports
→ Research that used to take hours
→ Repetitive workflows between tools

If you haven't checked out the guides yet: https://practicallibrary.com/guides

– Ahsan

P.S. The Opus workflow is free and uses the most powerful AI available right now. Worth 5 minutes: https://practicallibrary.com/workflows
```

---

### Email 3: Upsell Offer (Day 7)

**Subject:** Want me to set it up for you?

```
{{firstName}},

Some people prefer to DIY. Others want it done right the first time.

If you're in the second camp:

**2-Hour Setup Call — $750**
I'll personally set up your AI tools and workflows. By the end of the call, you'll have working automations saving you time.

**Monthly Check-in — $250/month**
AI tools change fast. Every month we'll review what's new, update your workflows, and make sure you're getting maximum value.

→ Book a call to discuss: https://cal.com/a-e-joiqod/15min

No pressure either way. The free guides are always there.

– Ahsan

P.S. If your team needs training, we also do workshops: https://practicallibrary.com/workshops
```

---

## Instantly.ai Setup

### Custom Variables to Import

When importing your enriched CSV to Instantly, map these columns:
- `firstName` → {{firstName}}
- `email` → email
- `company` → {{company}}
- `personalized_line` → {{personalized_line}}

### Campaign Settings

- **Sending schedule:** Mon-Fri, 8am-6pm (recipient's timezone)
- **Daily limit:** 30-50 emails per account
- **Wait between emails:** 3-5 minutes

### Sequence Timing

| Step | Email | Wait |
|------|-------|------|
| 1 | Email 1 (Introduction) | — |
| 2 | Email 2 (Value) | 3 days |
| 3 | Email 3 (Upsell) | 4 days |

---

## Lead Sources

### Marketing Agencies
- Apollo.io: "marketing agency" + employee count 5-50
- LinkedIn Sales Navigator: Marketing agency owners
- Clutch.co directory scrape

### Accounting Firms
- Apollo.io: "CPA firm" OR "accounting firm" + 5-50 employees
- LinkedIn: "Partner" at accounting firms
- State CPA society directories

### Real Estate
- Apollo.io: "real estate brokerage" + 5-50 employees
- LinkedIn: "Broker/Owner" at real estate companies
- Local MLS directories

---

## Metrics to Track

- **Open rate target:** >40%
- **Reply rate target:** >5%
- **Meeting booked rate:** >2%
- **Positive reply rate:** >3%

If metrics are low:
1. Test different subject lines
2. Improve personalized_line prompt
3. Adjust sending times
4. Check email deliverability
