# IntelPulse Report Skills — Architecture

Modular research skills that each produce a JSON output. A combiner skill assembles them into the final PDF.

## Skill Pipeline

```
INPUT: customer_name, location, business_type, customer_competitors[]
         │
         ▼
    ┌─────────┐
    │ 01-Cover │ → cover.json
    └────┬────┘
         │
    ┌────▼────┐
    │02-Competitors│ → competitors.json
    └────┬────┘
         │
    ┌────▼────┐
    │03-Pricing │ → pricing.json
    └────┬────┘
         │
    ┌────▼────┐
    │04-Reviews │ → reviews.json  ← THE CORE
    └────┬────┘
         │
    ┌────▼────┐
    │05-SEO     │ → seo.json
    └────┬────┘
         │
    ┌────▼────┐
    │06-Social  │ → social.json
    └────┬────┘
         │
    ┌────▼────┐
    │08-Findings│ → findings.json
    └────┬────┘
         │
    ┌────▼────┐
    │09-Roadmap │ → roadmap.json
    └────┬────┘
         │
    ┌────▼────────┐
    │10-Combiner  │ → final PDF
    └─────────────┘
```

## Running the Full Pipeline

```bash
# Run each skill in order
openclaw agent --agent finch --message "Research brief: [customer info]. Output: skills/01-cover/output.json"

# After all skills complete, run combiner
openclaw agent --agent finch --message "Combine all skills at skills/*/output.json into final PDF. Use Skill 10 combiner instructions."
```

## Per-Skill Inputs

Each skill reads from:
- Previous skill's output JSON
- Order form data (customer_name, location, business_type, competitors)

## Output Convention

Each skill writes its JSON output to:
```
skills/{XX-name}/output.json
```

The combiner reads all of them and generates the final PDF.

## Sections Included

| Skill | Section | Priority |
|-------|---------|----------|
| 01 | Cover + Executive Summary | Required |
| 02 | Competitor Landscape | Required |
| 03 | Pricing Matrix + Promotions | Required |
| 04 | **Review Sentiment Analysis** | **CORE — most important** |
| 05 | SEO & Discovery | Required |
| 06 | Social Media Deep Dive | Required |
| 07 | *(Promotions — embedded in 03)* | — |
| 08 | Top 5 Actionable Findings | Required |
| 09 | 30-Day Roadmap | Required |
| 10 | Combiner + PDF Generator | Required |
