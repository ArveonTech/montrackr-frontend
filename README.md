# MonTrackr — Frontend

React + Vite frontend for MonTrackr. UI components, pages and services to interact with the backend API for authentication, transactions, budgets, goals, subscriptions and analytics.

## Features
- Authentication flows (signup, login, OTP)
- Transaction list, add/edit/delete
- Budget and goal management
- Recurring subscriptions UI
- Analytics and charts

## Quickstart

1. Install dependencies

```bash
npm install
```

2. Environment

Create a `.env` or set environment variables for the frontend (Vite uses `VITE_` prefix):

```
VITE_API_URL=http://localhost:5000/api
VITE_SENTRY_DSN= (optional)
```

3. Run

```bash
npm run dev      # start dev server (Vite)
npm run build    # production build
npm run preview  # preview build
```

## Project layout (key folders)
- `src/components/` — reusable UI components
- `src/pages/` — route pages
- `src/features/` — feature-scoped components & logic (transactions, recurring, analytics)
- `src/services/` — API calls and auth helpers
- `src/hooks/` — custom React hooks
- `src/store/` — central state management

## Notes
- API base URL is configured via `VITE_API_URL`.
- Update CORS/settings on backend if connecting to a different host/port.

## Contributing
Add linting, tests and CI as needed. This README is intended as a concise developer starter.
