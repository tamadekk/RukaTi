---
tags: [reference, developer, context]
created: 2026-05-03
---

# Developer Context — RukaTi

Quick-reference for working on this codebase. Synthesized from all business docs.

## What Is RukaTi

Local service marketplace for **Rijeka, Croatia**. Name means "Hand to You" in Croatian.
Connects service seekers with local providers (electricians, cleaners, tutors, pet care, etc.).
Built by a solo developer. Currently in MVP validation.

---

## Tech Stack

| Layer       | Choice                                                               |
| ----------- | -------------------------------------------------------------------- |
| Framework   | React 19 + TypeScript 5.9                                            |
| Build       | Vite 7                                                               |
| Router      | TanStack Router                                                      |
| Styling     | Tailwind CSS 4 + shadcn/ui (Radix primitives)                        |
| State       | Zustand 5 — 4 stores: UserSession, UserProfile, UserServices, Market |
| Forms       | React Hook Form 7 + Zod 4                                            |
| Backend     | Supabase (auth, PostgreSQL, storage)                                 |
| Package mgr | Bun                                                                  |
| Hosting     | Vercel (planned)                                                     |

---

## Database Tables

**user_profile**: user_id, email, full_name, phone_number, role (customer/provider), rating, avatar, bio, created_at

**user_service**: service_id, user_id, title, description, category, location, contact, price_range, availability, rating, service_image, created_at

**reviews** (planned): id, service_id, reviewer_id, reviewer_name, rating (1–5), comment, reviewer_avatar, created_at

Storage buckets: `service-images` (5 MB limit), `avatars` (2 MB limit). RLS enabled.

---

## Service Categories (7)

Home Repairs · Cleaning · Tutoring · Pet Care · Landscaping · Event Help · Other

---

## Development Status (as of Dec 2025)

**Done:** Auth, profile management, service CRUD, image upload, service browsing, category filters, service detail pages, provider profile pages, availability toggle, Technical Minimalist UI.

**~80–90% done:** Service discovery with neighborhood filtering, search, mobile filter drawer, mobile responsiveness.

**Planned (MVP scope):**

- Phase 2: Reviews & ratings, direct messaging, saved services, notifications
- Phase 3: Advanced search, provider analytics, SEO
- Phase 4: Promoted listings, Stripe payments, premium subscriptions

---

## Business Model

**Now (MVP):** Free. No revenue. Focus on user acquisition.

**Revenue (starting month 7):**

- Promoted listings: €10–20/month
- Premium subscriptions: €15/month or €150/year (unlimited listings, analytics, verified badge)
- Future: transaction fee (5–10%), ads (minimal), data/insights B2B

**Year 1 target revenue:** €5,400. Costs: ~€6,000. Net: −€600 (acceptable).

Break-even target: month 8–10.

---

## Key Design Principle

**Technical Minimalist** aesthetic: sharp edges, high-contrast borders, monospace typography. Clean, clutter-free, fast. Target age 20–60. Mobile-first.

The app is positioned against cluttered competitors (Njuškalo, Facebook Groups, Google Maps) — **simplicity is the core value**.

---

## Critical Risks to Keep in Mind

1. **Security** — RLS + Zod validation everywhere. Never bypass input validation.
2. **Supabase dependency** — single point of failure; keep an abstraction layer.
3. **Low adoption** — every UX decision should lower friction for first-time users.
4. **Provider quality** — fake listings are a real concern; don't make it easier to abuse.

---

## Success Metrics (Phase 1 targets)

- 50 registered providers, 200 customers
- 100 service listings
- 500 service views/week
- Average rating > 4.0/5.0

---

## Linked Docs

- [[business-model-canvas]] — full revenue/cost breakdown
- [[milestones-roadmap]] — detailed phase timelines
- [[project-overview]] — vision, mission, value props
- [[risk-analysis]] — all risks with mitigations
- [[stakeholder-analysis]] — who matters and why
- [[technical-architecture]] — schema, stack decisions
- [[user-flows]] — customer and provider journeys
