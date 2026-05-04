# RukaTi — Claude Instructions

## Context Recovery

At the start of every session (or after a context reset), read these files in order to rebuild a full picture of the project before doing any work:

1. `docs/business/developer-context.md` — canonical quick-reference: stack, DB schema, dev status, business model, risks, design principles
2. `docs/business/project-overview.md` — vision, mission, value propositions
3. `docs/business/technical-architecture.md` — schema decisions, infrastructure choices
4. `docs/business/milestones-roadmap.md` — phase timelines and current position
5. `docs/business/risk-analysis.md` — known risks with mitigations

For deep dives on a specific area also check:

- `docs/business/business-model-canvas.md` — revenue and cost breakdown
- `docs/business/user-flows.md` — customer and provider journeys
- `docs/business/stakeholder-analysis.md` — who matters and why

> These are Obsidian notes. Wikilinks like `[[technical-architecture]]` resolve to files in `docs/business/`.

---

## Keeping the Docs Current

When you discover something non-obvious during work — a schema constraint, a design decision, a risk materialising — update the relevant doc in `docs/business/` so the next session starts with accurate context. Prefer updating `developer-context.md` for anything that belongs in the quick-reference.

Do **not** duplicate content already in code or git history. Docs capture _why_, not _what_.
