# Skill 03b — Promotions Tracker

## Purpose
Track every active promotion, deal, and loyalty offer across all 10 competitors RIGHT NOW. This is a living snapshot — promos change often.

## Inputs
- `competitors` — array from Skill 02
- `business_type`

## Research Tasks

For each competitor, search for:
1. **Happy hour** — day, time, discount
2. **Loyalty program** — name, structure, how to earn
3. **Current promos** — seasonal deals, app-only offers, birthday rewards
4. **Referral programs** — any "bring a friend" deals
5. **Subscription** — monthly pass, unlimited visits, etc.

## Sources
- Competitor websites
- Yelp menus
- Uber Eats / DoorDash (promo badges)
- Google Business posts
- Web search: "[competitor name] promotion 2026"
- App stores (for loyalty app details)

## Output JSON Structure

```json
{
  "skill": "03b-promotions",
  "promotions": [
    {
      "competitor": "Menchie's",
      "promo_type": "happy_hour",
      "promotion": "Tuesday Special",
      "description": "All froyo $0.45/oz all day",
      "value": "$0.23/oz off regular $0.68",
      "channel": ["In-store", "App"],
      "status": "Active Ongoing",
      "expires": null,
      "requires_app": false
    },
    {
      "competitor": "Menchie's",
      "promo_type": "loyalty",
      "promotion": "Free Dilly Cup",
      "description": "Free cup on first visit signup",
      "value": "Free cup",
      "channel": ["In-store"],
      "status": "Always active",
      "requires_app": false
    },
    {
      "competitor": "Red Mango",
      "promo_type": "happy_hour",
      "promotion": "Late Night Special",
      "description": "$0.49/oz after 8pm daily",
      "value": "$0.13/oz off regular $0.62",
      "channel": ["In-store"],
      "status": "Active Daily",
      "expires": null,
      "requires_app": false
    }
  ],
  "market_promo_summary": {
    "most_common_promo_type": "Happy hour / day-specific discount",
    "chains_offer_more_promos": true,
    "independents_offer_fewer": true,
    "undiscovered_opportunity": "No competitor offers a subscription/unlimited pass"
  }
}
```

## Notes
- If no promotions found for a competitor, write `[]` — don't invent
- Check expiration dates — many promos say "ongoing" but are actually seasonal
- Note if a promo requires downloading an app — friction reduces effectiveness
