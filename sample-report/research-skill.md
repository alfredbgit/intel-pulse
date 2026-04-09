# IntelPulse Research Skill — Competitor Intel for Auto Repair Shops

## When to Use This Skill

When Logan or an automated sweep requests research for an IntelPulse order.

## Input

Logan provides:
- `location` — city+state or zip code (e.g., "Austin, TX" or "94102")
- `business_type` — "auto" (for now, only auto repair shops supported)
- `customer_competitors` — (optional) specific shops the customer named in their order form
- `customer_name` — the customer's business name
- `customer_address` — the customer's address

## Competitor Count Rule: ALWAYS 10

The report MUST contain exactly 10 competitors. Business logic:
- Customer provides 0 → research all 10
- Customer provides 1-4 → fill to 10 with research
- Customer provides 5-9 → fill remaining to 10
- Customer provides 10+ → use first 10 from their list

## Required Report Sections (in order)

### Section 1: Cover + Executive Summary (0.5 page)
- Customer business name, location, date
- 3 key metrics: Google Trends score, avg market rating, recommended price
- Executive summary paragraph: market overview + top 3 opportunities + key risk

### Section 2: Competitor Landscape (1 page)
Table with all 10 competitors:
- Name, type (Chain/Independent/Dealer), address
- Star rating + review count (Yelp + Google)
- Threat level (HIGH/MEDIUM/LOW)
- Key differentiator in one sentence

### Section 3: Full Pricing Matrix (0.5 page)
Table comparing all competitors on:
- Price per service item (oil change, brake service, etc.)
- Any published combo deals
- Happy hour / late-night pricing
- Subscription / loyalty programs

### Section 4: REVIEW SENTIMENT ANALYSIS — THE CORE PRODUCT (1.5 pages)
**This is the most important and differentiated section of the report.**

For each of the 10 competitors AND the customer's own business:
1. **Total reviews:** Yelp count + Google count + total
2. **Average rating:** Yelp stars + Google stars (separate and combined)
3. **Sentiment clusters — WHAT CUSTOMERS LOVE:**
   - Theme + % of positive reviews citing it
   - Direct quotes from reviews (verbatim, anonymized)
4. **Sentiment clusters — WHAT CUSTOMERS HATE:**
   - Theme + % of negative reviews citing it
   - Direct quotes from reviews (verbatim, anonymized)

**Cross-Comparison Table:**
| Business | Total Reviews | Avg Rating | Positive % | Top Praise | Top Complaint |
|----------|-------------|-----------|-----------|------------|---------------|
| [Customer] | TBD | TBD | TBD | TBD | TBD |
| Competitor 1 | ... | ... | ... | ... | ... |

**Customer vs. Competitors:**
- Where does the customer's business rate vs. competitors on sentiment?
- What do customers say about the customer's business specifically?
- What gaps exist that the customer could own?

### Section 5: SEO & Discovery Analysis (0.75 page)
- Google Trends for the category in the location
- Keyword opportunities: suggested 10 keywords the customer should target
- Google Business Profile: competitor GBP analysis (claimed, active, post frequency)
- Local SEO gaps

### Section 6: Social Media Deep Dive (0.75 page)
Per competitor (top 5 if all 10 have SM):
- Platform presence: Facebook, Instagram, TikTok
- Follower counts (approximate)
- Post frequency (posts/week)
- Content quality: photos, videos, UGC
- Engagement rate: (likes+comments)/followers × 100

### Section 7: Top 5 Actionable Findings (0.5 page)
Synthesized from all research above. Each finding: what it is, why it matters, specific action to take.

### Section 8: 30-Day Roadmap (0.5 page)
Week-by-week action plan:
- Week 1: Foundation
- Week 2: Content / review strategy
- Week 3: Differentiation
- Week 4: Measure and iterate

## Research Sources

### For Review Sentiment (most important):
- **Yelp** — ratings, review counts, review text themes
- **Google Business** — ratings, review counts, review text themes
- **Web search** — "Yelp reviews [competitor name]" for review summaries
- **Web search** — "what customers say about [competitor]" for sentiment synthesis

### For Pricing:
- Yelp menus, competitor websites, Uber Eats/Seamless menus
- Dealer websites for service pricing benchmarks

### For SEO:
- Google Trends (trends.google.com)
- Google Search (manual ranking checks for key terms)
- Google Business Profile

### For Social Media:
- Instagram / Facebook public pages
- Manual review of recent posts
- SimilarWeb or Social Blade for follower estimates

## Per-Competitor Research Checklist

For each of 10 competitors, gather:
- [ ] Business name + address + type
- [ ] Yelp: star rating + review count
- [ ] Google: star rating + review count
- [ ] KEY: What do positive reviews say? (top 2-3 themes)
- [ ] KEY: What do negative reviews say? (top 2-3 themes)
- [ ] KEY: One verbatim quote from a positive review
- [ ] KEY: One verbatim quote from a negative review
- [ ] Price: per service or per oz
- [ ] Google Business: claimed / last post date
- [ ] Website: has one? menu published?
- [ ] Facebook: followers? last post? posts/week?
- [ ] Instagram: followers? posts/week?
- [ ] Active promotions
- [ ] Threat level: HIGH / MEDIUM / LOW
