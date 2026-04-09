# Skill 03 — Pricing Matrix + Promotions Tracker

## Purpose
Document pricing, loyalty programs, and active promotions for all 10 competitors.

## Inputs
- `competitors` — array of competitor names from Skill 02
- `business_type` — e.g., "frozen_yogurt", "auto_repair"
- `customer_name` — the customer's business
- `customer_pricing` — customer's current pricing (if provided)

## Research Tasks

### For each competitor, find:
1. **Price per unit** — per oz (frozen yogurt) or per service (auto repair)
2. **Regular flavor/service count** — how many options
3. **Premium/dairy-free options** — number and quality
4. **Loyalty program** — name and structure
5. **Happy hour / special pricing** — if any
6. **Active promotions** — current promos, value, expiration

### Price Research Sources
- Yelp menus
- Competitor websites
- Uber Eats / DoorDash menus
- Google Business profile
- Web search: "[competitor name] prices"

## Output JSON Structure

```json
{
  "skill": "03-pricing",
  "pricing_matrix": {
    "headers": ["Competitor", "$/unit", "Regular Options", "Premium/Dairy-Free", "Loyalty", "Happy Hour"],
    "rows": [
      ["Menchie's", "$0.68/oz", "24 rotating", "12+ dairy-free", "Free Dilly Cup", "Tue $0.45/oz"]
      // ... per competitor
    ]
  },
  "customer_price_recommendation": {
    "regular": "$0.59-0.65/oz",
    "premium_dairy_free": "$0.69-0.75/oz",
    "rationale": "..."
  },
  "promotions": [
    {
      "competitor": "Menchie's",
      "promotion": "Tuesday Special — all froyo $0.45/oz",
      "value": "$0.23/oz off regular price",
      "channel": "In-store, app",
      "status": "Active Ongoing"
    }
    // ... all active promos across competitors
  ]
}
```

## Notes
- Tutti Frutti Wednesday special is a loss-leader promo — note this
- If no happy hour found, write "None found"
- Flag if any competitor offers delivery pricing
