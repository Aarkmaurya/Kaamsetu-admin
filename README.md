# KaamSetu Admin — Phase 4A

A separate, standalone web application: the KaamSetu Admin Dashboard foundation.
This is **not** part of the Android Customer/Technician app and does not read
their local Room databases. Phase 4A uses mock/demo data only.

## Tech stack

- React 18 + TypeScript (strict)
- Vite 5
- React Router 6
- No UI/icon library dependency — a small hand-built inline-SVG icon set
  lives in `src/components/common/icons.tsx`
- No chart library — the Job Overview card is a lightweight CSS-only bar chart

## Getting started

```bash
npm install
npm run dev
```

The dev server starts at `http://localhost:5173`.

### Demo login

This is a **frontend-only mock login** — there is no backend yet. Use:

- Email: `admin@kaamsetu.test`
- Password: `Demo@1234`

This is intentionally documented here and on the login screen itself; it is
not a real credential and protects nothing. See
`src/services/mock/mockAuthService.ts` for what must change before this is
production-ready authentication.

## Production build

```bash
npm run build   # runs `tsc` for type-checking, then `vite build`
npm run preview # serve the production build locally to sanity-check it
```

Type-check only, without building:

```bash
npm run typecheck
```

## Project structure

```
src/
├── app/
│   ├── router/        # AppRouter — all routes in one place
│   └── providers/      # AppProviders — top-level context composition
├── components/
│   ├── common/          # icons, LoadingState, ErrorState, EmptyState
│   ├── layout/          # AppSidebar, AppHeader, MobileNavigation, DashboardLayout, PageHeader
│   └── dashboard/        # BentoCard, StatCard, WelcomeCard, JobOverviewCard, ActivityList, SystemStatusCard
├── pages/
│   ├── Login/
│   ├── Dashboard/        # the only fully-implemented page in Phase 4A
│   └── Placeholder/      # "Coming in Phase 4B/4C" pages for the rest
├── features/
│   └── auth/             # AuthContext (mock), ProtectedRoute (MVP scaffolding only)
├── services/
│   ├── api/              # httpClient.ts — placeholder for a future real API client
│   └── mock/              # mockAuthService, mockDashboardService (used today)
├── types/                # DashboardData, AdminUser, etc. — the contracts UI depends on
├── data/                  # dashboardMockData.ts — raw typed mock data, never imported by UI directly
├── hooks/                 # useDashboardData — the only place DashboardPage touches fetching
├── utils/                 # formatters.ts
├── styles/                # variables.css (design tokens), global.css (resets/a11y)
├── App.tsx
└── main.tsx
```

## What's implemented in Phase 4A

- KaamSetu Admin branding and a CSS-variable-based design system
- Mock login with validation, loading state, error state, show/hide password
- Responsive dashboard shell: fixed sidebar (desktop), off-canvas drawer (mobile/tablet)
- Fully-built Bento Grid Dashboard: welcome card, 4 stat cards, job overview
  chart, recent activity feed, system status/insights card — all backed by
  typed mock data behind a `DashboardService` interface
- Routes for all six sidebar sections; only `/dashboard` has real content,
  the rest are clean "Coming in Phase 4B/4C" placeholders
- Frontend route protection (`ProtectedRoute`) — clearly documented as MVP
  scaffolding, not real security

## What's intentionally NOT implemented yet

Technician/Job/Service/Area/Complaint management, real authentication, any
real backend or API calls, real analytics. See the doc comments in
`features/auth/` and `services/api/httpClient.ts` for exactly what a real
backend integration will need to add later — this codebase is structured so
that swapping mock services for real ones (`MockDashboardService` →
`ApiDashboardService`, etc.) does not require rewriting any page or component.
