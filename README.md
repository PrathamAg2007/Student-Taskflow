# TaskFlow — Student Task Management App

Built for Lunorsoft's Full Stack Developer internship assignment (Round 1).

## Live Links
- App: https://student-taskflow-red.vercel.app
- API: https://student-taskflow.onrender.com/api/v1/tasks

Heads up — backend's on Render's free tier, so it spins down when idle. First request after a while might take 30-60 seconds to wake up. Not a bug, just how free hosting works.

## What it does
- Register/login (JWT-based auth) — your tasks are tied to your account
- Create, edit, delete tasks, mark them complete
- Filter by All / Pending / Completed
- Tasks grouped by due date, sorted chronologically, and ordered by priority within the same day
- Dark mode toggle
- Form validation (Joi on the backend, inline validation on the frontend)
- Responsive layout

## Tech Stack
- Frontend: React (Vite), Tailwind CSS
- Backend: Node.js, Express, JWT, Joi, bcrypt
- Database: MongoDB (Atlas)
- Hosted on Vercel (frontend) + Render (backend)

## How it's built
Two separate apps in one repo — `frontend/` and `backend/` — talking over a REST API. Frontend holds everything in React state and hits the backend's endpoints for tasks and auth. Every task request needs a valid JWT in the header; the backend checks it and only ever returns tasks belonging to that user, so accounts can't see each other's data.

## Running it locally
Check `backend/README.md` and `frontend/README.md` — both need to be running at the same time for it to actually work.

## AI tools used
Used Claude and Antigravity throughout — not to generate the app blind, but as a build partner. Claude helped with architecture decisions, debugging (CORS, env vars, deployment issues), and general direction. Antigravity handled the visual styling pass, helped wire the auth flow into the frontend (login/register state, protected routes, token handling), and built out the date-grouping feature. All the core logic — CRUD, state management, API integration — I wrote and understand myself, and can walk through any of it.

## Known limitations
- No "cancel edit" button once you click Edit on a task
- No password reset flow