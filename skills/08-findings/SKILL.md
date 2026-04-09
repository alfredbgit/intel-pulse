# Skill 08 — Top 5 Actionable Findings

## Purpose
Synthesize all research from Skills 01-06 into 5 concrete, actionable findings. Each finding should tell the customer WHAT to do and WHY it matters.

## Inputs
All previous skill outputs (01-06). Read them all before writing findings.

## Research Tasks
1. Read competitor sentiment data (Skill 04) — what are the top 3 customer strengths? Top 3 weaknesses?
2. Read social media gaps (Skill 06) — what's completely uncontested?
3. Read SEO gaps (Skill 05) — what's the quickest win?
4. Read pricing (Skill 03) — what differentiation is available?
5. Read reviews (Skill 04) — what do customers wish they could get?

## Finding Structure
Each finding must have:
- **The insight** — what you found in the data
- **Why it matters** — the business impact
- **The action** — specific, concrete step to take

## Output JSON Structure

```json
{
  "skill": "08-findings",
  "findings": [
    {
      "rank": 1,
      "title": "Dairy-Free Premium is the Market Gap",
      "insight": "No Redwood City froyo shop is praised for dairy-free quality in reviews. Menchie's leads on selection but customers feel the quality lags.",
      "why_it_matters": "Dairy-free is the fastest-growing segment nationally. The customer who owns this positioning locally wins the health-conscious demographic.",
      "specific_action": "Add 2 premium dairy-free flavors (coconut, oat) and feature them prominently. Train staff to recommend them. Get mentioned in reviews for dairy-free quality."
    },
    {
      "rank": 2,
      "title": "S&W Fresh Has Zero Digital Presence",
      "insight": "Highest-rated local competitor (4.5★) has zero Instagram, no Google posts, no local SEO.",
      "why_it_matters": "Their reputation is entirely walk-in traffic. The customer can appear above them in Google within 30 days.",
      "specific_action": "Claim Google Business Profile, post weekly, activate Instagram. S&W Fresh customers searching online will find the customer instead."
    }
    // ... 3 more findings
  ]
}
```

## Quality Bar
- No generic findings ("improve customer service")
- Every finding must be specific to this customer's market and situation
- If a finding doesn't have a concrete action, it's not a finding
