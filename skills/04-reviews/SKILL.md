# Skill 04 — Review Sentiment Analysis — THE CORE PRODUCT

## Purpose
Analyze ALL available reviews (Yelp + Google) for the customer's business AND all 10 competitors. Cluster sentiment into themes. Extract verbatim quotes. This is the most important and differentiated section of the report.

## Inputs
- `customer_name` — the customer's business
- `customer_address` — customer's address
- `competitors` — array of competitor names from Skill 02
- `business_type` — e.g., "frozen_yogurt"

## Research Tasks

### For the CUSTOMER's business:
1. **Total reviews:** Yelp count + Google count
2. **Average ratings:** Yelp stars + Google stars
3. **Sentiment clustering — WHAT CUSTOMERS LOVE:**
   - Theme (e.g., "Staff friendliness")
   - % of positive reviews citing it
   - Verbatim quote (anonymized: "I love the staff, they're so helpful")
4. **Sentiment clustering — WHAT CUSTOMERS COMPLAIN ABOUT:**
   - Theme (e.g., "Long wait times")
   - % of negative reviews citing it
   - Verbatim quote

### For each of the 10 competitors:
1. **Total reviews:** Yelp + Google
2. **Average rating:** combined or dominant platform
3. **Positive %** — estimated % of 4-5 star reviews
4. **Top 3 praise themes** — most commonly praised things
5. **Top 3 complaint themes** — most commonly complained about things
6. **One verbatim positive quote**
7. **One verbatim negative quote**

### Cross-Competitor Comparison:
- Comparison table: customer vs. each competitor
- Where does customer rate better/worse vs. competitors?
- What gaps exist that customer could own?

### Sentiment Gap Analysis:
- What do customers in this market WISH they could get but can't find?
- What is NO competitor praised for?
- These gaps = actionable opportunities

## Data Collection Methods
- **Yelp.com** — search "[business name] reviews" → read review snippets
- **Google Business** — search "[business name] reviews" → ratings and themes
- **Web search** — "what customers say about [business name]" → synthesis
- **Note:** Full review text scraping requires paid APIs — use web search synthesis for MVP

## Output JSON Structure

```json
{
  "skill": "04-reviews",
  "customer": {
    "name": "Yumi Yogurt",
    "total_reviews": 203,
    "yelp_rating": 4.3,
    "yelp_count": 142,
    "google_count": 61,
    "positive_pct": 70,
    "negative_pct": 23,
    "mixed_pct": 7,
    "praise_themes": [
      { "theme": "Flavor variety", "pct": 32, "quote": "Always something new to try..." },
      { "theme": "Friendly staff", "pct": 26, "quote": "The team remembers my order..." }
    ],
    "complaint_themes": [
      { "theme": "Long weekend wait times", "pct": 18, "quote": "Lines out the door on Saturdays..." },
      { "theme": "Limited parking", "pct": 14, "quote": "Hard to find parking..." }
    ]
  },
  "competitor_sentiment": [
    {
      "name": "Menchie's Redwood City",
      "total_reviews": 2180,
      "avg_rating": 4.3,
      "positive_pct": 82,
      "top_praise": ["Staff friendliness", "Clean environment", "Dairy-free options"],
      "top_complaint": ["Cookie dough tastes fake", "Price vs. portions"],
      "positive_quote": "...",
      "negative_quote": "..."
    }
  ],
  "cross_comparison": {
    "customer_vs_chains": "Yumi trails Menchie's by ~10 points on positive % due to volume, not quality",
    "customer_vs_independents": "Yumi has more social proof than local independents"
  },
  "sentiment_gaps": [
    { "gap": "Nobody praised for late-night service", "opportunity": "Launch late-night special, own this in reviews" },
    { "gap": "Nobody praised for dairy-free quality", "opportunity": "Lead with premium dairy-free positioning" }
  ]
}
```

## Notes
- This section should take the most research time — 10-15 minutes
- Focus on themes that appear across multiple reviews, not one-off comments
- If a competitor has very few reviews, note that the data is limited
- Positive % + Negative % may not sum to 100% — remainder is "mixed" (3-star reviews)
