# Skill 01 — Cover + Executive Summary

## Purpose
Given the customer's business info and high-level market data, produce the report cover and executive summary.

## Inputs
- `business_name` — e.g., "Yumi Yogurt"
- `location` — e.g., "Redwood City, CA"
- `business_type` — e.g., "frozen_yogurt"
- `customer_address` — full address
- `market_trends_score` — Google Trends score (0-100)
- `top_3_opportunities` — array of strings from findings section
- `market_sentiment` — "growing" / "stable" / "declining"
- `competitor_count` — always 10

## Research Tasks
1. Confirm business name, location, type are correct
2. Note the research date (today)
3. Synthesize top 3 opportunities into a compelling exec paragraph
4. Determine market sentiment from Google Trends data

## Output JSON Structure

```json
{
  "skill": "01-cover",
  "business_name": "...",
  "location": "...",
  "business_type": "...",
  "customer_address": "...",
  "report_date": "YYYY-MM-DD",
  "competitor_count": 10,
  "market_trends_score": 68,
  "market_trends_label": "Rising +X% since YYYY",
  "market_sentiment": "growing / stable / declining",
  "top_3_opportunities": [
    "...",
    "...",
    "..."
  ],
  "executive_summary_paragraph": "..."
}
```

## Notes
- Executive summary should be 3-4 sentences
- Lead with the most important market insight
- Include the customer by name in the paragraph
- End with the #1 action the customer should take
