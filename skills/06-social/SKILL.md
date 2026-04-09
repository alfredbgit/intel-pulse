# Skill 06 — Social Media Deep Dive

## Purpose
Analyze competitor social media presence, content quality, and engagement. Identify gaps the customer can own.

## Inputs
- `competitors` — array from Skill 02
- `customer_name`

## Research Tasks

For each competitor (prioritize top 5 by threat):
1. **Instagram** — account? followers? posts/week? last post? content quality?
2. **TikTok** — account? followers? posts/week? last post?
3. **Facebook** — page? followers? posts/week?
4. **Post frequency** — posts per week (estimated)
5. **Last post date** — when did they last post?
6. **Content quality** — professional photos? Reels? UGC? Stories?
7. **Engagement rate** — (likes + comments) / followers × 100

## Engagement Rate Formula
```
engagement_rate = (avg_likes + avg_comments) / follower_count × 100
```
If exact numbers unavailable, estimate: <1% = low, 1-3% = medium, 3%+ = high

## Social Media Assessment
- Which platforms matter most for this business type?
- What's completely uncontested in this market?
- What's working for the competitors who are active?

## Output JSON Structure

```json
{
  "skill": "06-social",
  "competitor_social": [
    {
      "name": "Menchie's Redwood City",
      "instagram": {
        "has": true,
        "followers": 2400,
        "posts_per_week": 5,
        "last_post_date": "2026-04-04",
        "engagement_rate": 4.2,
        "content_quality": "Professional — Reels, UGC, flavor drops",
        "quality_rating": "high"
      },
      "tiktok": {
        "has": false
      },
      "facebook": {
        "has": true,
        "followers": 1400,
        "posts_per_week": 1,
        "last_post_date": "2026-04-01"
      }
    }
  ],
  "market_social_summary": {
    "total_with_instagram": 2,
    "total_with_tiktok": 0,
    "total_with_facebook": 2,
    "uncontested_platforms": ["TikTok"],
    "best_performing_account": "Menchie's — 4.2% engagement"
  },
  "customer_social_plan": {
    "instagram": {
      "priority": "HIGH",
      "action": "Claim + activate immediately",
      "frequency": "3x/week minimum",
      "content_types": ["Reels", "UGC", "flavor drops", "community"]
    },
    "tiktok": {
      "priority": "MEDIUM",
      "action": "Create account — no competition to beat",
      "frequency": "2x/week",
      "content_types": ["Behind-the-scenes", "product demos"]
    },
    "google_business": {
      "priority": "HIGH",
      "action": "Claim + post weekly",
      "frequency": "1 post/week"
    }
  }
}
```
