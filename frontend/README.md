# Pulse Frontend

> React + Vite frontend for Pulse — a daily team check-in app.

## Tech Stack

- **React 18** with Vite (fast builds, low memory)
- **react-router-dom** for client-side routing
- **axios** for API calls with auth token interceptors

## Project Structure

```
frontend/
├── src/
│   ├── api/          # API client (axios, auth interceptors)
│   ├── components/   # Reusable UI components
│   ├── hooks/        # Custom React hooks
│   ├── pages/        # Route-level page components
│   │   ├── LoginPage.jsx
│   │   └── DashboardPage.jsx
│   ├── App.jsx       # Route definitions
│   ├── main.jsx      # Entry point (BrowserRouter)
│   └── index.css     # Global styles
├── index.html
├── package.json
└── vite.config.js    # Dev server + /api proxy config
```

## Getting Started

```bash
cd frontend
npm install
npm run dev
```

The dev server runs on port **5173** with an API proxy to `localhost:3001`.

## Pages

- `/login` — Sign in / Register form with toggle
- `/dashboard` — Daily check-in form (Done / Doing / Blockers) + team feed

## API

The API client (`src/api/client.js`) is pre-configured:
- Base URL: `/api` (proxied in dev)
- Auth token injected from `localStorage`
- Auto-redirect to `/login` on 401