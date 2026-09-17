# TaskFlow — Backend

## Setup
1. `cd backend`
2. `npm install`
3. Create a `.env` file with:

MONGO_URI=your_mongodb_atlas_connection_string
PORT=3000

4. `npm run dev` (or `node app.js`)

Server runs on `http://localhost:3000`.

## API Endpoints
- `GET /api/v1/tasks` — get all tasks
- `POST /api/v1/tasks` — create a task
- `GET /api/v1/tasks/:id` — get one task
- `PATCH /api/v1/tasks/:id` — update a task
- `DELETE /api/v1/tasks/:id` — delete a task