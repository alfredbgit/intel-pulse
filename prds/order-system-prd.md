# IntelPulse Order System — PRD

## What we're building
A reusable order system for IntelPulse verticals. Order form → Stripe checkout → database record. Reusable across verticals by swapping a URL param.

## Architecture

### URL Structure
- `/order` — base order page (requires `?type=` param)
- `/order?type=auto` — auto repair vertical
- `/order?type=hvac` — HVAC vertical (future)
- `/order?type=dental` — dental vertical (future)

### Form Fields (all verticals)
- Full name
- Business name
- Email
- Phone (optional)
- Location (zip code or city)
- Target competitors (textarea — which shops/companies they want intel on)
- Notes (optional)

### Vertical Config (per type)
Each vertical has its own config:
- `stripeLink` — the buy.stripe.com URL
- `productName` — e.g. "Auto Repair Intel Report"
- `price` — e.g. "$97"
- `deliveryTime` — "24 hours" / "12 hours"
- `formTitle`, `formSubtitle` — vertical-specific copy

### Flow
1. User lands on `/order?type=auto`
2. Sees vertical-specific form with auto copy/imagery
3. Submits form → POST to `/api/order`
4. Server creates order record (status: `pending`) with all form data
5. Server redirects to vertical's Stripe checkout URL (with order ID in URL param)
6. User completes Stripe payment
7. User returns to `/order/thank-you?order_id=X`
8. Order status updated to `paid` (manual for beta, webhook later)

### Database Schema
```sql
CREATE TABLE orders (
  id TEXT PRIMARY KEY,           -- uuid
  type TEXT NOT NULL,            -- 'auto', 'hvac', etc.
  status TEXT DEFAULT 'pending', -- 'pending', 'paid', 'fulfilled', 'cancelled'
  created_at DATETIME,
  updated_at DATETIME,
  
  -- contact
  name TEXT,
  email TEXT,
  phone TEXT,
  
  -- business
  business_name TEXT,
  location TEXT,
  
  -- order details
  competitors TEXT,              -- newline-separated
  notes TEXT,
  
  -- stripe
  stripe_session_id TEXT,
  stripe_payment_status TEXT,
  
  -- fulfillment
  report_delivered_at DATETIME,
  fulfillment_notes TEXT
);
```

### API Endpoints
- `POST /api/order` — create pending order, redirect to Stripe
- `GET /api/order/:id` — get order status (for thank-you page polling)
- `POST /api/order/:id/webhook` — Stripe webhook (later phase)
- `GET /order` — serve order form page (static HTML + client-side JS)

### Tech Stack
- Node.js + Express API
- SQLite database (file-based, simple for beta)
- Static HTML form page served by Express
- Ralph deploys to Railway (or alternative if Railway CLI unavailable)

### Acceptance Criteria
- [ ] Form at `/order?type=auto` with all fields
- [ ] POST to `/api/order` creates record, redirects to Stripe
- [ ] Order stored in SQLite with all form fields
- [ ] Thank-you page shows order ID and "payment pending" → "paid" transition
- [ ] Reusable for new verticals by adding config + Stripe link only
- [ ] Mobile-responsive form
