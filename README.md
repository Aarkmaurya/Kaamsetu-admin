# KaamSetu Admin — Phase 4A + 4B

A separate, standalone web application: the KaamSetu Admin Dashboard.
This is **not** part of the Android Customer/Technician app and does not read
their local Room databases. Everything through Phase 4B uses mock/demo data
only — see `src/data/mock/` and `src/data/repositories/`.

## What's in Phase 4B

Four management modules, all with working local state (not fake buttons):

- **Technicians** (`/technicians`) — search, filter by status/skill/area, view
  details in a drawer, Approve/Reject/Suspend with confirmation dialogs on
  the destructive actions
- **Jobs** (`/jobs`) — search, filter by status/service/area, details drawer
  that structurally cannot show customer phone/address (those fields don't
  exist on `AdminJob` at all — see `types/job.ts`)
- **Services** (`/services`) — search, Add/Edit via a shared form dialog,
  Enable/Disable (no destructive delete)
- **Areas** (`/areas`) — City → Area → Locality expandable tree, Add at any
  level, Enable/Disable at any level, plus a read-only Service Availability
  preview (mock relationships only, shaped for future real matching)

Every module follows: **UI → hook (`useSyncExternalStore`) → repository →
mock data**, using a small hand-rolled `ListStore` helper (see
`data/repositories/ListStore.ts`) instead of adding a state-management
dependency. Swapping a repository's backing store for real API calls later
does not require touching any page or component.

## Deployment — newly added in this phase

Phase 4A did not include a CI/deploy workflow. `.github/workflows/deploy.yml`
is new: it builds the app and deploys it to GitHub Pages on every push to
`main`. It sets the Vite `base` path to `/<repo-name>/` automatically from
the GitHub Actions context (see `vite.config.ts` and the `basename` passed to
`BrowserRouter` in `AppRouter.tsx`), and adds a `404.html` fallback so
client-side routes survive a hard refresh on Pages.

**One-time repo setup required:** in the repo's Settings → Pages, set
"Source" to **GitHub Actions** (not "Deploy from a branch"). Without this,
the workflow will run but Pages won't serve its output.

## Tech stack

- React 18 + TypeScript (strict)
- Vite 5
- React Router 6
- No UI/icon library dependency — a small hand-built inline-SVG icon set
  lives in `src/components/common/icons.tsx`
- No chart library — the Job Overview card is a lightweight CSS-only bar chart
- No state-management library — `ListStore` + `useSyncExternalStore` instead

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
│   ├── common/          # icons, StatusBadge, SearchInput, FilterSelect, Button,
│   │                     Dialog, ConfirmDialog, Drawer, ResponsiveTable, states
│   ├── layout/          # AppSidebar, AppHeader, MobileNavigation, DashboardLayout, PageHeader
│   ├── dashboard/        # BentoCard, StatCard, WelcomeCard, JobOverviewCard, ActivityList, SystemStatusCard
│   ├── technicians/      # TechnicianTable, TechnicianFilters, TechnicianDetailsDrawer, TechnicianSummaryCards
│   ├── jobs/             # JobTable, JobFilters, JobDetailsDrawer, JobSummaryCards
│   ├── services/         # ServiceTable, ServiceFormDialog
│   └── areas/            # AreaTree, AddNodeDialog
├── pages/
│   ├── Login/
│   ├── Dashboard/
│   ├── Technicians/  Jobs/  Services/  Areas/    # Phase 4B — fully implemented
│   └── Placeholder/      # "Coming in Phase 4C" (Complaints only, now)
├── features/
│   └── auth/             # AuthContext (mock), ProtectedRoute (MVP scaffolding only)
├── services/
│   ├── api/              # httpClient.ts — placeholder for a future real API client
│   └── mock/              # mockAuthService, mockDashboardService
├── types/                # Technician, AdminJob, AdminService, City/ServiceArea/Locality, etc.
├── data/
│   ├── mock/              # raw typed mock arrays — never imported by UI directly
│   └── repositories/      # ListStore + one repository per module (mutations live here)
├── hooks/                 # useTechnicians, useJobs, useServices, useAreas, useDashboardData
├── utils/                 # formatters.ts, statusPresentation.ts
├── styles/                # variables.css (design tokens), global.css (resets/a11y)
├── App.tsx
└── main.tsx
```

## What's implemented

**Phase 4A:** KaamSetu Admin branding, design system, mock login, responsive
dashboard shell (sidebar/header/mobile drawer), Bento Grid dashboard, frontend
route protection (documented as MVP scaffolding, not real security).

**Phase 4B:** the four management modules described above, plus a new
GitHub Pages deploy workflow (see the Deployment section).

## What's intentionally NOT implemented yet

Complaints management, real authentication, any real backend or API calls,
real analytics, payments, chat, live tracking. See the doc comments in
`features/auth/`, `services/api/httpClient.ts`, and each repository file
(e.g. `data/repositories/technicianRepository.ts`) for exactly what a real
backend integration will need to add later — this codebase is structured so
that swapping mock repositories for real API-backed ones does not require
rewriting any page or component.
