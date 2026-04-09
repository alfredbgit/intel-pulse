# PRD — IntelPulse / Auto Vertical

## What we're building
A focused version of IntelPulse at `intelpulse.net/auto` targeting **auto repair shop owners** — independent shops, multi-bay garages, dealers who want to know what their local competitors are doing.

Same core product: competitive intel PDF report, $199 one-time. Different audience, different language, different hero.

## What it does
Single-page marketing site with:
- Hero oriented to auto repair shop owners (not generic "businesses")
- Language: "your shop" / "your competitors down the street" / "what the dealer across town is charging"
- Auto-specific pain points: pricing transparency, shop vs. dealer, local chain competition
- CTA: order the intel report
- Stripe checkout integration

## Design — Auto-Inspired Hero
Hero should feel like it belongs in the auto industry:
- Imagery: auto shop interior, mechanic working, diagnostic equipment, or clean garage bay — NOT generic office/business
- Colors: industrial but professional — dark grays, reds, amber/yellow (like shop signage), clean white
- Typography: bold, confident, slightly industrial feel
- Headline speaks directly to shop owners

## Pages / Sections
1. **Hero** — "Know what every shop in your zip code is charging" + CTA to order
2. **What You Get** — the report contents, auto-specific (pricing analysis, service mix, marketing tactics, customer reviews)
3. **Who It's For** — independent shop owners, multi-bay garages, dealers
4. **Sample Report** — showing auto-specific data (not generic)
5. **CTA / Order** — $199, Stripe checkout

## Tech
- Same stack as current IntelPulse (static HTML + Stripe.js)
- New subdirectory: `auto/` in the intel-pulse app
- **Price: $97 one-time (beta)** — goal is 10 sales, then adjust up or down based on conversion data

## Revenue Model (Beta)
- **Beta price: $97/report** — first 10 sales = learning data
- **Rush option: $349** — 12hr delivery, phone debrief
- **No subscription lock-in yet** — recurring monitoring product coming later
- Goal: validate demand, refine price, then consider monthly tier

## Acceptance Criteria
- [ ] Hero clearly for auto shop owners, not generic
- [ ] All copy references auto repair context
- [ ] Sample data in report shows auto-specific intel
- [ ] Stripe checkout works on `/auto` route
- [ ] Site live at `intelpulse.net/auto`
