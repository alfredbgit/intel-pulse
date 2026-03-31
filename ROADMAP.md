# ROADMAP — IntelPulse

| Date | Feature | Status |
|------|---------|--------|
| 2026-03-30 | Landing page (static) | ✅ Complete |

## Notes

- Landing page live at https://intel-pulse.netlify.app
- Stripe Payment Links are **placeholders** — must be replaced with real links from Stripe Dashboard
  - Starter: `https://buy.stripe.com/YOUR_STARTER_PAYMENT_LINK_ID`
  - Growth: `https://buy.stripe.com/YOUR_GROWTH_PAYMENT_LINK_ID`
- Intake form collects: name, email, company, competitor list, plan
- After Stripe links are provided, update `STRIPE_LINKS` in `index.html` and redeploy
- Manual-first delivery: Newman sends reports until automation is built
