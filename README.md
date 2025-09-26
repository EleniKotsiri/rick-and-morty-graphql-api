# Rick & Morty GraphQL Character Cards

A responsive Next.js + TypeScript app using Apollo Client, HeroUI, and Tailwind CSS to browse characters from the [Rick & Morty API](https://rickandmortyapi.com/). It features debounced search, pagination, and a detail drawer with image, origin, location, and episode count.

---

## Tech Stack

* **Next.js** (App Router; mix of RSC + Client Components)
* **Apollo Client** with `@apollo/client-integration-nextjs`
* **GraphQL** endpoint: `https://rickandmortyapi.com/graphql` (public)
* **HeroUI** + **Tailwind CSS** + **lucide-react** (for icons)
* **TypeScript** with strict types for queries, fragments, and UI

---

## Features

* **Search by name** using `characters(filter: { name })`, with a reusable **debounce hook** to limit requests while typing
* **Pagination** with accessible controls and fast back/forward thanks to Apollo cache
* **Detail drawer** shows image, status, species, gender, origin, location, and episode count
* **GraphQL fragments** separate **BasicCharacterFields** and **DetailCharacterFields**, keeping queries small and reusable
* **Queries split by feature**: dedicated operations for `characters-list` vs `character-detail`
* **Type-safe** query variables and response shapes
* **String normalization** utility (e.g., `unknown → Unknown` without title-casing multi-word values)
* **URL persistence** of `name` and `page` for shareable, reload-friendly URLs
* **A11y** semantics (labels, roles, keyboard close)
* **Theme toggle** (light/dark) with `lucide-react` icons

---

## Getting Started

### Prerequisites

* Node.js **18+** (tested with **v22.16.0**)
* npm (or swap commands for pnpm/yarn)

### Setup

```bash
git clone https://github.com/EleniKotsiri/rick-and-morty-graphql-api.git
cd rick-and-morty-graphql-api
npm install
npm run dev
```

Open [http://localhost:3000/](http://localhost:3000/).

### Scripts

```bash
npm run dev      # Start development server (Fast Refresh)
npm run build    # Production build
npm run start    # Start production server
npm run lint     # Run ESLint
```

---

## Project Structure

```txt
.
├─ public/
├─ src/
│  ├─ apollo/
│  │  ├─ apollo-client.ts          # RSC helpers (registerApolloClient, PreloadQuery)
│  │  └─ apollo-wrapper.tsx        # Client provider (ApolloNextAppProvider)
│  ├─ app/
│  │  ├─ globals.css               # Tailwind globals
│  │  ├─ hero.ts                   # HeroUI config
│  │  ├─ layout.tsx                # Root layout
│  │  ├─ page.tsx                  # Homepage
│  │  └─ providers.tsx             # UI/theme providers
│  ├─ components/
│  │  ├─ character/
│  │  │  ├─ character-card.tsx     # Character card
│  │  │  ├─ characters-list.tsx    # Search + pagination + URL sync
│  │  │  └─ character-detail.tsx   # Drawer fetching details by id
│  │  ├─ shared/                   # Files that can be used across all pages
│  │  │  ├─ footer.tsx
│  │  │  └─ header/
│  │  │     ├─ index.tsx
│  │  │     └─ theme-toggle.tsx    # Component to toggle theme
│  │  └─ ui/                       # UI components that can be reusable
│  │     ├─ search-input.tsx
│  │     ├─ skeleton-grid.tsx      # Skeleton fallback component
│  │     └─ status-dot.tsx         # UI dot for character's status
│  ├─ graphql/                     # GraphQL fragments & queries
│  │  ├─ fragments.ts              # BasicCharacterFields & DetailCharacterFields fragments
│  │  └─ queries/
│  │     ├─ characters-list.query.ts
│  │     └─ character-detail.query.ts
│  ├─ hooks/
│  │  └─ use-debounce.ts           # Reusable hook to debounce input
│  ├─ lib/
│  │  └─ utils.ts                  # normalize/format helper
│  └─ types/
│     └─ character-types.ts        # CharacterBasic/CharacterDetailType, query & var types
├─ package.json
├─ tailwind.config.ts              # Global tailwind config
├─ tsconfig.json
└─ README.md
```

---

## Architecture & Decisions

### URL as state (deep-linking)

* Server page (`src/app/page.tsx`) reads `searchParams` and preloads with the same variables to avoid hydration mismatch.
* Client list mirrors state and URL with `router.replace`, rebuilding the query string to drop unknown keys.
* Empty `name` and `page=1` are omitted for clean URLs.
* Out-of-range pages: if `info.pages` is known and `page > pages`, snap to **page 1**. If `info` is missing but `page > 1` and there are no results, also clamp immediately.

### Apollo Integration

* Config follows the official `@apollo/client-integration-nextjs` guidance.
* RSC: `registerApolloClient` + `PreloadQuery` stream data into the client cache.
* Client: `ApolloNextAppProvider` ensures hooks share one Apollo instance.
* **Fragments & query split**: `fragments.ts` centralizes field selections; queries are split per feature to avoid over-fetching and improve reuse.

### Types

* `CharacterBasic` for list items; `CharacterDetailType` extends it for the drawer. Query data/variable types keep hooks type-safe.

### Search UX & Debounce

* The input updates **raw** `name` immediately (URL updates instantly). The GraphQL query uses a **debounced** name (≈450 ms) to limit requests.
* On raw name change, page resets to 1 (skips first render via a ref to avoid resetting on initial load).

### Pagination & Clamping

* If `info.pages` is known and `page > pages`, we **set page to 1**.
* If `info` is missing but `page > 1` and results are empty, we also clamp immediately and avoid flashing a “No results” placeholder.

### Styling & Responsiveness

* Tailwind + HeroUI. The drawer keeps content scrollable and stays usable on mobile.
* Responsive grid layout for character cards with pagination for navigation.
* Theme Toggle uses HeroUI’s theming and `lucide-react` icons (`Sun`/`Moon`).

---

## Accessibility

* Descriptive labels and roles.
* Drawer supports keyboard close and reduced motion defaults.
* Status indicators are text-backed and color-accessible.

---

## URL & Apollo Cache Interaction (Behavior)

Apollo caches per operation + variables. For example:

```
characters(name: "rick", page: 1)
characters(name: "rick", page: 2)
```

Each result is cached. Navigation between pages or back/forward reuses cached data when available, keeping the UI responsive.

---

## How this project meets the evaluation criteria

### Responsiveness

* Tailwind utilities and container config produce a clean layout on mobile, tablet, and desktop.
* Drawer content scrolls, with sticky actions on small screens for better reach.

### Code Quality

* Modular components in `src/components` (domain-driven `character/` + reusable `ui/`).
* Strict TypeScript types in `src/types` for queries and components.
* GraphQL fragments prevent duplication; utils extracted to `src/lib`.
* No dead code; naming is descriptive and consistent.

### UI Design

* Minimal, balanced styling with HeroUI primitives and Tailwind.
* Consistent iconography via `lucide-react`.
* Focus/hover states and skeletons for perceived performance.

### Functional

* Debounced search drives `characters(filter: { name })`.
* Pagination works with accessible controls.
* Detail drawer fetches and displays extended data.
* URL reflects `name`/`page` so refresh and deep-links are preserved.
