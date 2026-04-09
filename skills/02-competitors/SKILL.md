# Skill 02 — Competitor Landscape

## Purpose
Research and document the 10 competitors in the customer's market.

## Competitor Count Rule: ALWAYS 10
- Customer provides 0 → research all 10
- Customer provides 1-4 → fill to 10 with research
- Customer provides 5-9 → fill remaining to 10
- Customer provides 10+ → use first 10 from their list

## Inputs
- `location` — city+state or zip
- `business_type` — e.g., "frozen_yogurt", "auto_repair"
- `customer_name` — the customer's business
- `customer_address` — the customer's address
- `customer_competitors` — array of competitor names they provided (can be empty)

## Research Tasks

For each of the 10 competitors, gather:
1. **Name** — full legal business name
2. **Type** — Chain / Independent / Franchise / Dealer / Ice Cream Chain / In-Store / Seasonal
3. **Address** — street address
4. **Yelp rating** — star rating (e.g., 4.3)
5. **Yelp review count** — approximate (e.g., "1,280+")
6. **Google rating** — star rating
7. **Google review count** — approximate
8. **Threat level** — HIGH / MEDIUM / LOW
   - HIGH = strong local presence, many reviews, close to customer
   - MEDIUM = moderate presence, some reviews
   - LOW = seasonal, in-store only, far from customer
9. **Key differentiator** — one sentence on what makes them notable

## Threat Level Criteria
- Chain with 500+ reviews in the market → HIGH
- Independent with 300+ reviews → HIGH
- Chain with 200-500 reviews → MEDIUM
- Independent with under 200 reviews → MEDIUM or LOW
- Seasonal / in-store only → LOW

## Output JSON Structure

```json
{
  "skill": "02-competitors",
  "location": "...",
  "business_type": "...",
  "competitors": [
    {
      "rank": 1,
      "name": "Menchie's Frozen Yogurt",
      "type": "Chain",
      "address": "2700 El Camino Real, Redwood City, CA",
      "yelp_rating": 4.3,
      "yelp_review_count": "1,280+",
      "google_rating": 4.4,
      "google_review_count": "900+",
      "total_reviews": 2180,
      "threat": "HIGH",
      "key_differentiator": "Widest flavor selection (24 rotating) and strong dairy-free program"
    }
    // ... 9 more
  ]
}
```

## Sources
- Yelp.com — ratings, review counts, review snippets
- Google Business — ratings, review counts
- Competitor websites — addresses, business type
- Web search — confirm business is still operating
