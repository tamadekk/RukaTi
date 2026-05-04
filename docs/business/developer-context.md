---
tags: [reference, developer, context]
created: 2026-05-03
updated: 2026-05-04
---

# Developer Context — RukaTi

Quick-reference for working on this codebase. Synthesized from all business docs and verified against live Supabase schema.

## What Is RukaTi

Local service marketplace for **Rijeka, Croatia**. Name means "Hand to You" in Croatian.
Connects service seekers with local providers (electricians, cleaners, tutors, pet care, etc.).
Built by a solo developer. Currently past MVP — core features live with real users.

---

## Tech Stack

| Layer       | Choice                                                                      |
| ----------- | --------------------------------------------------------------------------- |
| Framework   | React 19 + TypeScript 5.9                                                   |
| Build       | Vite 7                                                                      |
| Router      | TanStack Router                                                             |
| Styling     | Tailwind CSS 4 + shadcn/ui (Radix primitives)                               |
| State       | Zustand 5 (session, profile, market UI) + TanStack Query (all server state) |
| Forms       | React Hook Form 7 + Zod 4                                                   |
| Backend     | Supabase (auth, PostgreSQL, storage, realtime)                              |
| Package mgr | Bun                                                                         |
| Hosting     | Vercel (planned)                                                            |

---

## Database Tables (verified May 2026)

**user_profile** (24 rows): user_id, email, full_name, phone_number, role (customer/provider), rating (smallint 0–5), avatar, profile_image_url, bio, profile_completed (boolean, default false), created_at

> `profile_completed` gates reviews and other actions. Both `avatar` and `profile_image_url` exist — `avatar` is the active field.

**user_service** (31 rows): service_id, user_id, title, description, category (enum), location, contact, price_range, availability, rating (numeric), service_rating (smallint), service_image (text, single URL), created_at

> Has both `rating` and `service_rating` columns — `rating` is the active one used in queries.

**user_service_review** (8 rows): review_id, user_id, service_id, review_rating (smallint), review_text, created_at

> No reviewer_name/avatar stored — those are joined from user_profile at query time.

**chat_rooms** (3 rows): room_id, user1_id, user2_id, last_message_at, created_at

> No `last_message` text column — last message is fetched via a separate join query.

**chat_messages** (54 rows): message_id, room_id, sender_id, text, created_at

Storage buckets: `service-images` (5 MB limit), `avatars` (2 MB limit). RLS enabled on all tables.

---

## Service Categories (9)

home · cleaning · tutoring · pet-care · landscaping · events · vehicles · beauty · other

> Stored as a PostgreSQL enum `service_category`. Docs previously said 7 — vehicles and beauty were added.

---

## Development Status (as of May 2026)

**Done:**

- Auth (signIn, signUp, signOut, session persistence, protected routes)
- Onboarding flow (full_name, phone, bio, avatar — sets profile_completed)
- Profile management (edit profile, avatar upload)
- Service CRUD (create, edit, delete, multi-image upload UI, availability toggle)
- Service browsing (paginated grid, 9 per page, sort by rating)
- Category filtering
- Full-text search (title ilike) — wired end-to-end
- Service detail pages (gallery, info, description, reviews, similar services, provider card)
- Provider profile pages (accessible from service detail)
- Reviews & ratings (read, write, edit, delete — gated by profile_completed)
- Direct messaging (rooms, messages, realtime subscriptions, send)
- Recently viewed services
- Mobile bottom bar navigation
- Technical Minimalist UI

**Not started:**

- Location/neighborhood filtering (location is a free-text field, no neighborhood enum/filter)
- Saved/bookmarked services (no DB table)
- Notifications (no DB table, no UI)
- "Contact provider" button on service/provider pages — no way to initiate a new conversation from a service or provider page
- Dashboard analytics (current metrics are hardcoded placeholder values)

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

1. **Security** — RLS + Zod validation everywhere. Never bypass input validation. No rate limiting currently implemented.
2. **Supabase dependency** — single point of failure; keep an abstraction layer.
3. **Low adoption** — every UX decision should lower friction for first-time users.
4. **Provider quality** — fake listings are a real concern; don't make it easier to abuse.
5. **Dashboard trust** — metrics shown on the dashboard are hardcoded placeholders; real users will notice.

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
