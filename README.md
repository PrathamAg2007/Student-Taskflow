# TaskFlow — Student Task Management App

A full-stack task management application built for Lunorsoft's Full Stack Developer internship assignment (Round 1).

## Live Links
- Frontend: https://student-taskflow-red.vercel.app
- Backend API: https://student-taskflow.onrender.com/api/v1/tasks

Note: the backend is hosted on Render's free tier, which spins down after inactivity. The first request after idle time may take 30–60 seconds to respond — this is expected, not a bug.

## Features
- Create, edit, delete, and mark tasks as complete
- Filter tasks by All / Pending / Completed
- Tasks grouped and sorted by due date
- Fully responsive UI

## Tech Stack
- Frontend: React (Vite), Tailwind CSS
- Backend: Node.js, Express
- Database: MongoDB (Atlas)
- Deployment: Vercel (frontend), Render (backend)

## Architecture
Frontend and backend are separate apps in one repo (`frontend/` and `backend/`), communicating over a REST API. The frontend holds task state in React and calls the backend's CRUD endpoints (`/api/v1/tasks`) via fetch. The backend handles validation, database operations via Mongoose, and returns JSON.

## Running Locally
See `backend/README.md` and `frontend/README.md` for setup instructions for each half. Both need to be running simultaneously for the app to work locally.

## AI Tools Used
Claude was used throughout development - for architectural guidance, debugging and for the final visual styling pass (CSS/Tailwind classes only). All component logic, state management, and API integration were written and understood by me. AI was used as a guide and pair-debugging tool, not to generate the application unsupervised.

## Known Limitations
- No "cancel edit" button — clicking Edit populates the form, but there's currently no way to back out without submitting or refreshing
- No authentication (tasks are not user-scoped)