# Pulse — Architecture & Task Plan

## Product Summary
A lightweight daily team check-in web app. Users sign up, join a team, post daily standups ("Done / Doing / Blockers"), and see their team's feed.

## Tech Stack
- **Frontend**: React + Vite (memory-light, fast builds)
- **Backend**: Node.js / Express or Fastify
- **Database**: SQLite via Turso (team-db CLI for sync, or direct SQLite-backed API)
- **Auth**: Simple email + password with session tokens
- **Deployment**: Static frontend + backend API (to be decided)

## Data Model
- `users` — id, name, email, password_hash, team_id, created_at
- `teams` — id, name, invite_code, created_at
- `checkins` — id, user_id, team_id, done_text, doing_text, blockers_text, date, created_at

## API Endpoints
- `POST /api/auth/register` — create account + team
- `POST /api/auth/login` — get session
- `GET /api/checkins?team_id=X&date=YYYY-MM-DD` — feed
- `POST /api/checkins` — create daily check-in
- `GET /api/team` — my team details

## Frontend Pages
- Login / Register
- Dashboard (today's check-in form + team feed)
- Team settings

## Milestone Plan (first deployable PR)
1. Project scaffold — backend + frontend skeletons
2. Database schema + migration
3. Auth (register/login)
4. Check-in API (create + list)
5. Frontend: login & registration
6. Frontend: dashboard with check-in form + feed
7. QA: integration tests + edge cases
8. Polish & deploy