# Agent Coding Standards

These rules must be followed by the AI agent when modifying or creating code.

## 1. Architecture: Smart Pages, Dumb Components
- **Pages** (`src/pages`) act as "Smart Containers". They handle:
    - Data fetching (e.g., Supabase calls).
    - Store interaction (`useMarketStore`, `useUserSession`).
    - State management.
- **Components** (`src/components`) should be "Dumb" (Presentational). They:
    - Receive data via `props`.
    - Emit events via callback props (e.g., `onSave`, `onClick`).
    - Contain minimal internal state (only UI-specific state like `isOpen`).

## 2. Component Extraction
- Proactively extract complex or repetitive UI blocks into named, reusable components.
- Do not leave large chunks of JSX inline if they can be semantically named (e.g., `<AuthButtons />`, `<ServiceCard />`).

## 3. Constants
- Avoid hardcoding values (links, configuration, magic numbers).
- Use existing constant files (e.g., `src/const/navigation-links.ts`) or create new ones in `src/const`.
- Update existing constants rather than creating duplicates active code.

## 4. Library Reuse
- Before writing a helper function, check `src/lib` for existing implementations.
- Example: Use `signOut` from `src/lib/authentication.ts` instead of directly manipulating the session store.

## 5. TypeScript Preferences
- **Strictly prefer `type` over `interface`**.
- Use type aliases for props definitions (e.g., `type Props = { ... }`).
