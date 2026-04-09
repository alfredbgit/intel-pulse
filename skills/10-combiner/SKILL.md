# Skill 10 — Report Combiner + PDF Generator

## Purpose
Take all skill outputs (01-09) and combine them into a complete, styled PDF report.

## Inputs
All skill JSON outputs from:
- Skill 01 — Cover + Executive Summary
- Skill 02 — Competitor Landscape
- Skill 03 — Pricing + Promotions
- Skill 04 — Review Sentiment Analysis
- Skill 05 — SEO & Discovery
- Skill 06 — Social Media
- Skill 08 — Top 5 Actionable Findings
- Skill 09 — 30-Day Roadmap

## Combiner Tasks

### 1. Validate all required skills are complete
- Check that all 8 skills have returned valid JSON
- If any skill is missing or failed, note it but still generate the report

### 2. Inject data into HTML template
The report template (`/report-template/index.html`) has placeholder markers for each section. Replace them with the actual data from each skill's JSON output.

### 3. Handle missing data gracefully
- If a skill's output is missing a field, use "Data pending" or skip that section
- Never show a blank — always have something

### 4. Generate PDF
Use Puppeteer to convert the completed HTML to PDF:
```javascript
await page.pdf({
  path: `/reports/${customer_slug}-${date}.pdf`,
  format: 'Letter',
  printBackground: true,
  margin: { top: 0, right: 0, bottom: 0, left: 0 }
});
```

### 5. Save outputs
- PDF: `/reports/{customer_slug}-report-{YYYYMMDD}.pdf`
- Combined JSON: `/reports/{customer_slug}-research-{YYYYMMDD}.json` (all skill outputs merged)

## HTML Template Sections (in order)

### Page 1: Cover + Executive Summary
- Logo + header
- Business name + location + date
- Market metrics bar (3 KPIs)
- Executive summary paragraph
- Competitor landscape table

### Page 2: Pricing + Promotions
- Pricing matrix table
- Recommendation box
- Active promotions tracker

### Page 3-4: Review Sentiment Analysis — THE CORE
- Customer review metrics (4 KPI boxes)
- Praise/complaint columns
- Verbatim quotes
- Cross-competitor sentiment table
- Sentiment gap analysis

### Page 5: SEO & Discovery
- Google Trends chart
- Keyword opportunity table
- GBP analysis table

### Page 6: Social Media
- Competitor social matrix
- Assessment box
- Customer social action plan

### Page 7: Top 5 Actionable Findings
- 5 finding cards

### Page 8: 30-Day Roadmap
- Week-by-week roadmap boxes
- Month 1 success metrics
- Month 2 lookahead

## Output JSON Structure

```json
{
  "skill": "10-combiner",
  "status": "success",
  "customer_slug": "yumi-yogurt",
  "report_date": "2026-04-06",
  "pdf_path": "/reports/yumi-yogurt-report-20260406.pdf",
  "json_path": "/reports/yumi-yogurt-research-20260406.json",
  "pages_generated": 8,
  "sections_included": ["cover", "competitors", "pricing", "reviews", "seo", "social", "findings", "roadmap"],
  "sections_skipped": []
}
```

## Notes
- The HTML template is a single file with all CSS inline
- No external dependencies except Google Fonts (loaded via CDN)
- PDF should be print-ready: no broken images, all fonts embedded
- Run Puppeteer with `--no-sandbox` flag for compatibility
