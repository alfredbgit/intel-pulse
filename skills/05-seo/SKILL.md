# Skill 05 — SEO & Discovery Analysis

## Purpose
Analyze the customer's and competitors' SEO and digital discoverability. Google presence, keyword opportunities, local SEO gaps.

## Inputs
- `customer_name`
- `customer_address`
- `location` — city+state
- `business_type` — e.g., "frozen_yogurt"
- `competitors` — array from Skill 02

## Research Tasks

### Google Trends
1. Get Google Trends score for the category in the location
2. Note 12-month trend: rising / stable / falling
3. Identify peak and low months

### Target Keywords
Find 8-10 keywords the customer should target:
- Primary local keyword ("frozen yogurt [location]")
- Category keyword ("dairy free frozen yogurt near me")
- Competitor keywords ("[competitor name] [location]")
- Quality differentiators ("best frozen yogurt [location]")
- Note difficulty (HIGH/MEDIUM/LOW) based on competition
- Note search intent (informational / transactional / navigational)

### Google Business Profile Analysis
For each competitor (or top 5):
- Is GBP claimed?
- How many photos?
- Post frequency?
- Local SEO score: Strong / Medium / Weak / None

### Local SEO Gaps
- What citations exist? (Yelp, TripAdvisor, Foursquare, local directories)
- What's missing?
- Quick wins for the customer

## Output JSON Structure

```json
{
  "skill": "05-seo",
  "google_trends": {
    "score": 68,
    "category": "Frozen Yogurt",
    "location": "Bay Area",
    "trend": "rising",
    "change_pct": 18,
    "since_year": 2023,
    "peak_month": "July",
    "peak_score": 85,
    "low_month": "January",
    "low_score": 42,
    "current_score": 68,
    "monthly_bars": {
      "jan": 42, "feb": 45, "mar": 52, "apr": 61, "may": 72,
      "jun": 79, "jul": 85, "aug": 81, "sep": 65, "oct": 58,
      "nov": 48, "dec": 44
    }
  },
  "keywords": [
    {
      "keyword": "best frozen yogurt Redwood City",
      "difficulty": "MEDIUM",
      "intent": "navigational",
      "priority": "HIGH",
      "notes": "No one currently dominates this"
    }
  ],
  "competitor_gbp": [
    {
      "name": "Menchie's Redwood City",
      "claimed": true,
      "photos": 12,
      "post_frequency_per_week": 1,
      "last_post_date": "2026-04-04",
      "seo_score": "Strong"
    }
  ],
  "local_seo_gaps": [
    "No independent froyo shop has claimed the 'dairy-free' keyword in Redwood City",
    "S&W Fresh has zero Google Business posts"
  ],
  "quick_wins_for_customer": [
    "Claim Google Business Profile and post weekly",
    "Get listed on Yelp, TripAdvisor, Foursquare"
  ]
}
```
