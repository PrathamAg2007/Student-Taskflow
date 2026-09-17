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

## AI Tools Used
I built this myself — the architecture, the CRUD logic, the auth flow, connecting frontend to backend, deployment, all of it. I can walk through any part of this code and explain why it's built the way it is.

Where I used AI: Claude helped me think through architecture decisions, debug issues as they came up (CORS, environment variables, deployment configuration), and reason through concepts I was rusty on. Antigravity helped with the visual styling pass and some of the auth wiring on the frontend, and helped me build the date-grouping feature — but the surrounding logic, and understanding of what it's doing, is mine.

Used them the way I'd use a senior dev pairing with me — not to generate the app and submit it blind.

## Known limitations
- No "cancel edit" button once you click Edit on a task
- No password reset flow