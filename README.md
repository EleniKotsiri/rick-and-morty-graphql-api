# Rick & Morty GraphQL API Implementation

A Next.js + TypeScript app using Apollo Client, HeroUI, and Tailwind CSS to browse characters from the Rick & Morty API. Includes debounced search, pagination, and a responsive detail drawer with image, origin, location, and episode count.

## Tech Stack
- Next.js (App Router, RSC + Client Components)
- Apollo Client with `@apollo/client-integration-nextjs`
- GraphQL endpoint: `https://rickandmortyapi.com/graphql` (public)
- HeroUI and Tailwind CSS
- TypeScript with strict types for queries, fragments, and UI components

## Features
- Search by name using `characters(filter: { name })` with reusable use-debounce hook
- Paginated list with accessible pagination controls
- Detail drawer with image, status, species, gender, origin, location, and episode count
- GraphQL fragments for list (basic) vs detail fields
- TypeScript strict types for queries, fragments, UI 
- Reusable util function for string normalization (first letter is capital in all cases)
- Accessibility-conscious semantics (labels, roles, keyboard close)

## Getting Started

### Prerequisites
- Node.js version 20+ (I used v22.16.0)
- npm (or swap commands for pnpm/yarn if you prefer)

### Setup
```bash
git clone https://github.com/EleniKotsiri/rick-and-morty-graphql-api.git
cd rick-and-morty-graphql-api
npm install
npm run dev
```

### Open on [localhost:3000](http://localhost:3000/)

## Project Structure
```txt
.
├─ app/
│  ├─ layout.tsx
│  └─ page.tsx
├─ src/
│  ├─ apollo/
│  │  ├─ apollo-client.ts          # RSC: registerApolloClient (getClient/query/PreloadQuery)
│  │  └─ apollo-wrapper.tsx        # Client: ApolloNextAppProvider wrapper
│  ├─ app/
│  │  ├─ globals.css               # TailwindCSS global styles
│  │  ├─ hero.ts                   # HeroUI configuration
│  │  ├─ layout.tsx                # Main layout file
│  │  ├─ page.tsx                  # Homepage
│  │  └─ providers.tsx             # HeroUI providers file
│  ├─ components/
│  │  └─ character/
│  │     ├─ character-card.tsx     # Character card
│  │     ├─ characters-list.tsx    # Show all characters + Search functionality
│  │     ├─ character-detail.tsx   # Drawer fetching detail by id (with basic fallback)
│  │  └─ shared/                   # Files that can be used across all pages
│  │     └─ header/
│  │       ├─ index.tsx
│  │       └─ theme-toggle.tsx     # Component to toggle theme
│  │     └─ footer.tsx
│  │  └─ ui/                       # UI components that can be reusable  
│  │     ├─ search-input.tsx       
│  │     ├─ skeleton-grid.tsx      # Skeleton fallback component
│  │     └─ status-dot.tsx         # UI dot for character's status
│  ├─ graphql/                     # GraphQL fragments & queries
│  │  ├─ fragments.ts
│  │  └─ queries/
│  │     ├─ characters-detail.query.ts
│  │     └─ character-list.query.ts
│  ├─ hooks/
│  │  └─ use-debounce.ts           # Reusable hook to debounce input
│  ├─ lib/
│  │  └─ utils.ts                  # Helper functions
│  └─ types/
│     └─ character-types.ts        # CharacterBasic / CharacterDetailType, query & variable types
├─ public/
├─ package.json
├─ tailwind.config.ts              # Tailwind configuration global
└─ README.md
```
