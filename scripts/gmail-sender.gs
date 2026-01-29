/**
 * Gmail Cold Email Sender with AI Enrichment - Google Apps Script
 *
 * HOW TO USE:
 * 1. Create a Google Sheet with columns: firstName, email, company, website, personalized_line
 * 2. Go to Extensions → Apps Script
 * 3. Paste this code
 * 4. Set your Anthropic API key: Run setApiKey() first
 * 5. Run enrichLeads() to generate personalized openers from websites
 * 6. Run sendEmail1/2/3() to send emails
 *
 * The script marks each row as "sent" so you can run it multiple times safely.
 */

// ============ CONFIGURATION ============
const CONFIG = {
  // Your info
  senderName: "Ahsan",

  // Sheet settings
  sheetName: "Leads", // Name of the tab with your leads

  // Email settings
  delayBetweenEmails: 60000, // 60 seconds between emails

  // Column positions (1-indexed)
  columns: {
    firstName: 1,
    email: 2,
    company: 3,
    website: 4,
    personalizedLine: 5,
    sent: 6
  }
};

// ============ EMAIL TEMPLATES ============
const EMAILS = {
  // Email 1: Introduction
  email1: {
    subject: "Stop Googling AI tools. Start using them.",
    body: `Hi {{firstName}},

{{personalized_line}}

I built Practical Library because I was tired of watching smart people waste hours trying to figure out AI tools on their own.

It's a free resource with step-by-step guides designed for non-technical people. If you can send an email, you can follow these.

Check it out: https://practicallibrary.com

– Ahsan`
  },

  // Email 2: Value (send 3 days later)
  email2: {
    subject: "10 hours saved per week (not exaggerating)",
    body: `{{firstName}}, quick follow-up.

The most common feedback I get: "I didn't know this was possible."

Claude Code alone saves most users 10+ hours/week once set up properly.

If you haven't checked out the guides yet: https://practicallibrary.com/guides

– Ahsan

P.S. The Opus workflow is free and uses the most powerful AI available right now: https://practicallibrary.com/workflows`
  },

  // Email 3: Upsell (send 7 days later)
  email3: {
    subject: "Want me to set it up for you?",
    body: `{{firstName}},

Some people prefer to DIY. Others want it done right the first time.

If you're in the second camp:

2-Hour Setup Call — $750
I'll personally set up your AI tools and workflows.

Monthly Check-in — $250/month
As tools evolve, we'll keep you current.

→ Book here: https://cal.com/a-e-joiqod/15min

No pressure. The free guides are always there.

– Ahsan`
  }
};

// ============ AI ENRICHMENT FUNCTIONS ============

/**
 * Set your Anthropic API key (run this once)
 * The key is stored securely in Script Properties
 */
function setApiKey() {
  const ui = SpreadsheetApp.getUi();
  const response = ui.prompt(
    'Set Anthropic API Key',
    'Enter your ANTHROPIC_API_KEY:',
    ui.ButtonSet.OK_CANCEL
  );

  if (response.getSelectedButton() === ui.Button.OK) {
    const apiKey = response.getResponseText().trim();
    PropertiesService.getScriptProperties().setProperty('ANTHROPIC_API_KEY', apiKey);
    ui.alert('API key saved! You can now run enrichLeads().');
  }
}

/**
 * Scrape text content from a website
 */
function scrapeWebsite(url) {
  try {
    if (!url || !url.startsWith('http')) {
      return '';
    }

    const response = UrlFetchApp.fetch(url, {
      muteHttpExceptions: true,
      followRedirects: true,
      headers: {
        'User-Agent': 'Mozilla/5.0 (compatible; LeadEnrichment/1.0)'
      }
    });

    if (response.getResponseCode() !== 200) {
      Logger.log(`Failed to fetch ${url}: HTTP ${response.getResponseCode()}`);
      return '';
    }

    let html = response.getContentText();

    // Strip scripts and styles
    html = html.replace(/<script[^>]*>[\s\S]*?<\/script>/gi, '');
    html = html.replace(/<style[^>]*>[\s\S]*?<\/style>/gi, '');

    // Strip HTML tags
    let text = html.replace(/<[^>]+>/g, ' ');

    // Clean up whitespace
    text = text.replace(/\s+/g, ' ').trim();

    // Limit to 5000 chars for Claude
    return text.slice(0, 5000);

  } catch (error) {
    Logger.log(`Error scraping ${url}: ${error}`);
    return '';
  }
}

/**
 * Call Claude API to generate a personalized opening line
 */
function generatePersonalizedLine(company, websiteContent) {
  const apiKey = PropertiesService.getScriptProperties().getProperty('ANTHROPIC_API_KEY');

  if (!apiKey) {
    throw new Error('API key not set. Run setApiKey() first.');
  }

  if (!websiteContent) {
    return `I came across ${company} and was impressed by your work.`;
  }

  try {
    const payload = {
      model: 'claude-sonnet-4-20250514',
      max_tokens: 150,
      messages: [{
        role: 'user',
        content: `You are helping write a cold email opener. Based on this company's website content, write ONE short, specific, genuine compliment or observation (1-2 sentences max).

Company: ${company}

Website content:
${websiteContent}

Rules:
- Be specific (mention a project, client, service, or achievement you noticed)
- Sound human, not salesy
- Keep it under 25 words
- Don't use phrases like "I noticed" or "I saw that" - just state the observation
- If you can't find anything specific, comment on their industry focus or approach

Output ONLY the personalized line, nothing else.`
      }]
    };

    const response = UrlFetchApp.fetch('https://api.anthropic.com/v1/messages', {
      method: 'post',
      contentType: 'application/json',
      headers: {
        'x-api-key': apiKey,
        'anthropic-version': '2023-06-01'
      },
      payload: JSON.stringify(payload),
      muteHttpExceptions: true
    });

    const result = JSON.parse(response.getContentText());

    if (result.content && result.content[0] && result.content[0].text) {
      return result.content[0].text;
    }

    return `${company}'s approach to their market stood out to me.`;

  } catch (error) {
    Logger.log(`Error generating line for ${company}: ${error}`);
    return `${company}'s work caught my attention.`;
  }
}

/**
 * Enrich all leads with AI-generated personalized lines
 */
function enrichLeads() {
  const sheet = SpreadsheetApp.getActiveSpreadsheet().getSheetByName(CONFIG.sheetName);
  const data = sheet.getDataRange().getValues();

  let enrichedCount = 0;

  for (let i = 1; i < data.length; i++) {
    const row = data[i];
    const company = row[CONFIG.columns.company - 1];
    const website = row[CONFIG.columns.website - 1];
    const existingLine = row[CONFIG.columns.personalizedLine - 1];

    // Skip if already has a personalized line
    if (existingLine && existingLine.trim() !== '') {
      continue;
    }

    Logger.log(`[${i}/${data.length - 1}] Enriching ${company}...`);

    // Scrape website
    const websiteContent = scrapeWebsite(website);

    // Generate personalized line
    const personalizedLine = generatePersonalizedLine(company, websiteContent);

    // Write to sheet
    sheet.getRange(i + 1, CONFIG.columns.personalizedLine).setValue(personalizedLine);

    Logger.log(`  → "${personalizedLine}"`);
    enrichedCount++;

    // Rate limit: wait 2 seconds between requests
    if (i < data.length - 1) {
      Utilities.sleep(2000);
    }
  }

  SpreadsheetApp.getUi().alert(`Done! Enriched ${enrichedCount} leads with personalized lines.`);
}

// ============ MAIN FUNCTIONS ============

/**
 * Send Email 1 to all leads not yet marked as sent
 */
function sendEmail1() {
  sendEmailBatch(EMAILS.email1, "sent_email1");
}

/**
 * Send Email 2 to all leads (run 3 days after Email 1)
 */
function sendEmail2() {
  sendEmailBatch(EMAILS.email2, "sent_email2");
}

/**
 * Send Email 3 to all leads (run 7 days after Email 1)
 */
function sendEmail3() {
  sendEmailBatch(EMAILS.email3, "sent_email3");
}

/**
 * Generic function to send a batch of emails
 */
function sendEmailBatch(emailTemplate, sentColumnName) {
  const sheet = SpreadsheetApp.getActiveSpreadsheet().getSheetByName(CONFIG.sheetName);
  const data = sheet.getDataRange().getValues();
  const headers = data[0];

  // Find or create the sent column
  let sentColIndex = headers.indexOf(sentColumnName);
  if (sentColIndex === -1) {
    sentColIndex = headers.length;
    sheet.getRange(1, sentColIndex + 1).setValue(sentColumnName);
  }

  let sentCount = 0;

  for (let i = 1; i < data.length; i++) {
    const row = data[i];
    const firstName = row[CONFIG.columns.firstName - 1];
    const email = row[CONFIG.columns.email - 1];
    const company = row[CONFIG.columns.company - 1];
    const personalizedLine = row[CONFIG.columns.personalizedLine - 1] || `${company}'s work caught my attention.`;
    const alreadySent = row[sentColIndex];

    // Skip if already sent or no email
    if (alreadySent === "YES" || !email) {
      continue;
    }

    // Personalize the email
    const subject = emailTemplate.subject
      .replace(/\{\{firstName\}\}/g, firstName)
      .replace(/\{\{company\}\}/g, company);

    const body = emailTemplate.body
      .replace(/\{\{firstName\}\}/g, firstName)
      .replace(/\{\{company\}\}/g, company)
      .replace(/\{\{personalized_line\}\}/g, personalizedLine);

    try {
      // Send the email
      GmailApp.sendEmail(email, subject, body, {
        name: CONFIG.senderName
      });

      // Mark as sent
      sheet.getRange(i + 1, sentColIndex + 1).setValue("YES");
      sentCount++;

      Logger.log(`Sent to: ${email}`);

      // Delay between emails
      if (i < data.length - 1) {
        Utilities.sleep(CONFIG.delayBetweenEmails);
      }

    } catch (error) {
      Logger.log(`Failed to send to ${email}: ${error}`);
      sheet.getRange(i + 1, sentColIndex + 1).setValue("FAILED: " + error.message);
    }
  }

  Logger.log(`Done! Sent ${sentCount} emails.`);
  SpreadsheetApp.getUi().alert(`Done! Sent ${sentCount} emails.`);
}

/**
 * Create a sample sheet with the right columns
 */
function createSampleSheet() {
  const ss = SpreadsheetApp.getActiveSpreadsheet();
  let sheet = ss.getSheetByName(CONFIG.sheetName);

  if (!sheet) {
    sheet = ss.insertSheet(CONFIG.sheetName);
  }

  // Set headers (now includes website column)
  sheet.getRange(1, 1, 1, 6).setValues([
    ["firstName", "email", "company", "website", "personalized_line", "sent_email1"]
  ]);

  // Add sample data (personalized_line left blank for AI to fill)
  sheet.getRange(2, 1, 2, 4).setValues([
    ["John", "john@example.com", "Acme Marketing", "https://acmemarketing.com"],
    ["Sarah", "sarah@example.com", "TechCorp", "https://techcorp.io"]
  ]);

  // Format
  sheet.getRange(1, 1, 1, 6).setFontWeight("bold");
  sheet.setFrozenRows(1);

  SpreadsheetApp.getUi().alert('Sample sheet created!\n\n1. Replace with your real leads\n2. Run "Set API Key" to add your Anthropic key\n3. Run "Enrich Leads" to generate personalized openers\n4. Run "Send Email 1" to start your campaign');
}

/**
 * Add menu to Google Sheets
 */
function onOpen() {
  const ui = SpreadsheetApp.getUi();
  ui.createMenu('Email Campaign')
    .addItem('Create Sample Sheet', 'createSampleSheet')
    .addSeparator()
    .addItem('Set API Key', 'setApiKey')
    .addItem('Enrich Leads with AI', 'enrichLeads')
    .addSeparator()
    .addItem('Send Email 1 (Introduction)', 'sendEmail1')
    .addItem('Send Email 2 (Value) - Day 3', 'sendEmail2')
    .addItem('Send Email 3 (Upsell) - Day 7', 'sendEmail3')
    .addToUi();
}
