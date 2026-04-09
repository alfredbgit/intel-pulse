# PRD — IntelPulse: Fully Automated Order Fulfillment

## What We're Building
End-to-end automated order fulfillment for IntelPulse. No manual intervention at any step. Orders come in, research is run, PDFs are generated and delivered — all automatically on a schedule.

## The Full Automated Flow

```
Customer pays $97
       ↓
Order created in Supabase (status: paid)
       ↓
[Processing Sweep — runs every hour]
  For each order with status = paid:
    1. Finch runs competitor intel research for that location + type
    2. Research output → HTML template → Puppeteer PDF
    3. PDF stored (local or Supabase Storage)
    4. Order status → "processing"
       ↓
[Delivery Sweep — runs noon PST daily]
  For each order with status = processing:
    1. Newman sends email with PDF attached to customer
    2. Order status → "fulfilled"
```

## Component 1: Finch Research Skill

### Purpose
Given a location (city or zip) and business type, return structured competitor intel with full SEO and social media depth.

### Competitor Count: Always 10
- Customer provides 0 → research all 10
- Customer provides 1-4 → fill to 10 with research
- Customer provides 5-9 → fill remaining to 10
- Customer provides 10+ → use first 10 from their list

### Required Report Sections
1. **Executive Summary** — market assessment, top 3 opportunities, market sentiment
2. **Competitor Landscape** — table: name, type, address, rating, reviews, price, threat level
3. **Full Pricing Matrix** — per competitor, per service/oz
4. **SEO & Discovery Analysis** — Google Trends, keyword opportunities, local SEO gaps, Google Business Profile analysis, citation counts
5. **Social Media Deep Dive** — per competitor: Facebook/Instagram/TikTok presence, followers, post frequency, engagement rate, content quality, active promotions
6. **Promotions Tracker** — all active promotions in the market
7. **Customer Sentiment** — top praised, top complained, unmet demand
8. **Top 5 Actionable Findings** — synthesized from all research
9. **30-Day Roadmap** — week-by-week action plan

### SEO Tools to Use
- Google Trends — category search interest over time
- Google Search — manual ranking checks for key terms
- Google Business Profile — competitor GBP details
- Yelp / Google reviews — review count and sentiment
- Note: SEMrush/Ahrefs/Moz require paid accounts — use free tools primarily

### Social Media Tools
- Instagram / Facebook — public pages (follower count, post frequency, last post)
- Manual review of recent content (quality assessment)
- No paid tools needed

### Implementation
- Use `web_search` (Perplexity Sonar) for competitor research
- Target sources: Yelp, Google Business, competitor websites, Google Trends
- Synthesize into the report data structure (JSON)
- Save research JSON to `research/{order_id}.json`

## Component 2: PDF Generation Pipeline

### Purpose
Take research JSON + order data → generate a styled PDF matching the sample report format.

### Input
```javascript
{
  orderId: "uuid",
  customerName: "Mike's Auto",
  businessType: "auto",
  location: "Austin, TX",
  research: { /* Finch output */ }
}
```

### Process
1. Read base HTML template (`sample-report/index.html`)
2. Replace template placeholders with research data:
   - Business name, location, date
   - Competitor grid (name, services, pricing, tagline)
   - Pricing matrix
   - Executive summary
   - Action recommendations
3. Run Puppeteer: `page.pdf()` → `reports/{order_id}.pdf`
4. Upload PDF to Supabase Storage (or keep local for now)

### Tech Notes
- Template already exists at `sample-report/index.html`
- Need to parameterize the HTML template (replace hardcoded "A+ Japanese Auto" etc.)
- Use `fs.writeFileSync` to inject data into HTML string before Puppeteer
- Puppeteer runs in Node.js — needs to be in the order-api project or a separate worker

## Component 3: Processing Sweep (Cron)

### Purpose
Run hourly. Find paid orders, process them, generate PDFs.

### Endpoint
`POST /api/sweep/process` (protected by secret, runs via Vercel Cron or external trigger)

### Logic
```javascript
async function processingSweep() {
  // Find all paid orders not yet processed
  const orders = await supabase
    .from('orders')
    .select('*')
    .eq('status', 'paid')
    .or('report_generated_at.is.null,report_generated_at.lt.updated_at');

  for (const order of orders) {
    try {
      // 1. Run Finch research
      const research = await runFinchResearch(order);

      // 2. Generate PDF
      const pdfPath = await generatePDF(order, research);

      // 3. Store PDF path in order record
      await supabase
        .from('orders')
        .update({ 
          status: 'processing',
          research_data: research,
          report_path: pdfPath,
          processed_at: new Date().toISOString()
        })
        .eq('id', order.id);
    } catch (e) {
      console.error('Failed to process order', order.id, e.message);
      // Don't update status — will retry next sweep
    }
  }
}
```

### Vercel Cron Config
```json
// vercel.json
{
  "crons": [{
    "path": "/api/sweep/process",
    "schedule": "0 * * * *"  // every hour
  }]
}
```

## Component 4: Delivery Sweep (Cron — Noon PST)

### Purpose
Run daily at noon. Find processed orders, email PDF to customer.

### Endpoint
`POST /api/sweep/deliver` (protected by secret)

### Logic
```javascript
async function deliverySweep() {
  const orders = await supabase
    .from('orders')
    .select('*')
    .eq('status', 'processing')
    .eq('type', 'auto'); // filter to ready orders

  for (const order of orders) {
    try {
      // 1. Read PDF
      const pdfBuffer = fs.readFileSync(order.report_path);

      // 2. Send email with PDF via Newman/AgentMail
      await sendEmail({
        to: order.email,
        subject: `Your Intel Report — ${order.business_name || order.location}`,
        body: `Hi ${order.name},\n\nYour competitive intel report for ${order.location} is attached.\n\n...`,
        attachments: [{ filename: `intel-report-${order.id}.pdf`, data: pdfBuffer }]
      });

      // 3. Update status
      await supabase
        .from('orders')
        .update({ status: 'fulfilled', fulfilled_at: new Date().toISOString() })
        .eq('id', order.id);
    } catch (e) {
      console.error('Failed to deliver order', order.id, e.message);
    }
  }
}
```

### Vercel Cron Config
```json
{
  "crons": [{
    "path": "/api/sweep/deliver",
    "schedule": "0 12 * * *"  // noon PST (UTC-8: 20:00 UTC)
  }]
}
```

## Component 5: Email Delivery (Newman)

### Purpose
Send the PDF report to the customer.

### Implementation
Newman handles outbound email. Brief Newman:
```
OUTREACH_REQUEST:
Campaign: IntelPulse Report Delivery
Audience: Customer who paid for an order
Message: Templated email with PDF attachment
Goal: Deliver report to customer, track delivery status
```

For MVP, use AgentMail SMTP directly in the sweep:
```javascript
const nodemailer = require('nodemailer');
const transporter = nodemailer.createTransport({
  host: 'smtp.agentmail.to',
  port: 587,
  secure: false,
  auth: { user: 'alfredbutler@agentmail.to', pass: process.env.AGENTMAIL_PASSWORD }
});
```

## Database Schema Update

Add these columns to `orders` table:
```sql
ALTER TABLE orders ADD COLUMN research_data JSONB;
ALTER TABLE orders ADD COLUMN report_path TEXT;
ALTER TABLE orders ADD COLUMN processed_at TIMESTAMP;
ALTER TABLE orders ADD COLUMN fulfilled_at TIMESTAMP;
```

Or create new table:
```sql
CREATE TABLE report_fulfillment (
  id TEXT PRIMARY KEY,
  order_id TEXT REFERENCES orders(id),
  research_output JSONB,
  pdf_stored_at TIMESTAMP,
  email_sent_at TIMESTAMP,
  email_status TEXT DEFAULT 'pending'
);
```

## Acceptance Criteria

- [ ] Processing sweep: paid order → Finch research → PDF generated → status = processing
- [ ] Delivery sweep: processing order → email sent with PDF → status = fulfilled
- [ ] No manual steps anywhere in the flow
- [ ] Reports delivered by noon PST next day (24hr guarantee)
- [ ] DB is source of truth — delivery sweep re-runs don't double-send
- [ ] Failed orders retry on next sweep cycle
- [ ] End-to-end test with Stripe 4242 completes successfully

## Out of Scope (Phase 1)
- Rush delivery ($349 tier)
- Monthly subscription monitoring
- Multiple verticals (auto only for now)
- Phone debrief integration
