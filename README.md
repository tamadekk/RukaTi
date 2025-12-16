![RukaTi Cover](public/social-preview.png)

# RukaTi [ Hand to You ]

> **"Find help. Offer help. Simple."**

An uncompromisingly simple service marketplace for Rijeka. Functional, fast, and free of clutter.

---

## // THE PROBLEM

**Finding help in Rijeka is broken.**
You need a mechanic, an electrician, or a cleaner.

- **Google Maps:** Too broad, hard to filter.
- **Facebook Groups:** Outdated, chaotic, unsearchable.
- **Njuškalo:** Overwhelmed with ads, primarily for selling goods.

There is no dedicated, single place to simply _connect_ with local service providers.

## // THE SOLUTION

**RukaTi** solves this with a **Technical Minimalist** approach.
It is a dedicated hub where:

- **Customers** find services in seconds.
- **Providers** get visibility without managing complex profiles.
- **No specific app needed** - just a fast, responsive web platform.

## // MVP SCOPE

We are building the essentials first. No bloat.

### Core Features

- [ ] **Service Management**: Create, update, and delete service listings.
- [ ] **Availability Toggle**: A simple `on/off` switch for providers ("Accepting Work").
- [ ] **Neighborhood Filters**: Find help in _Zamet_, _Centar_, or _Trsat_ (no complex maps).
- [ ] **Saved List**: Simple "favorites" to compare providers later.

### Trust & Communication

- [ ] **Reviews**: Community-driven feedback system.
- [ ] **Direct Chat**: Built-in messaging to arrange details.
- [ ] **Promoted Listings**: Visibility boosts for top-rated services.

---

## // QUICK START

**Prerequisites:** [Bun](https://bun.sh/) & [Supabase](https://supabase.com/) project.

```bash
# 1. Clone
git clone https://github.com/your-username/rukati.git
cd rukati

# 2. Install
bun install

# 3. Configure .env.local
VITE_SUPABASE_URL=...
VITE_SUPABASE_ANON_KEY=...

# 4. Run
bun dev
```

---

_Built with [React](https://react.dev/), [Vite](https://vitejs.dev/), [Tailwind](https://tailwindcss.com/), & [Supabase](https://supabase.com/)._
