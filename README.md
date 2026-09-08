# Mini Task Board

GitHub repository: [Arpit-mandhan-001/mini-task-board](https://github.com/Arpit-mandhan-001/mini-task-board)

Mini Task Board is a full-stack task management application. It allows a user to create tasks, view all tasks, filter them by status, change a task status, and delete tasks.

The project was built as an assignment to demonstrate a frontend, REST API, database connection, input validation, SQL queries, and error handling working together.

## Main Features

- Create a task with a title and an optional status.
- View all tasks sorted by newest first.
- Filter tasks by `All`, `To Do`, `In Progress`, or `Done`.
- Change the status of an existing task.
- Delete a task.
- See the total number of tasks and the count for each status.
- Display loading states while data is being requested.
- Display user-friendly errors when a request fails.
- Roll back the screen when an optimistic status update or delete request fails.
- Check that task titles are not empty.
- Check that task statuses use only the allowed values.

## Technologies Used

### Frontend

- Next.js
- React
- TypeScript
- Tailwind CSS
- `lucide-react` for interface icons

### Backend

- Node.js
- Express
- TypeScript
- `mysql2` for MySQL access
- `dotenv` for environment variables
- `cors` for frontend-to-backend requests

### Database

- MySQL
- The database contains a `tasks` table with an ID, title, status, and creation time.

## Application Structure

```text
mini-task-board/
|-- database/
|   |-- schema.sql       Database and table definition
|   `-- seed.sql         Example task records
|-- frontend/
|   |-- app/             Next.js page and global styles
|   |-- components/      React task components
|   |-- services/        Functions that call the REST API
|   `-- types/           Frontend TypeScript types
|-- server/
|   `-- src/
|       |-- config/      MySQL connection pool
|       |-- controller/  HTTP request and response handling
|       |-- middleware/  Validation and error-handling middleware
|       |-- repository/  SQL queries
|       |-- routes/      API route definitions
|       |-- services/    Business rules and validation
|       `-- types/       Backend TypeScript types
`-- README.md
```

## Requirements

Install these tools before running the project:

- Node.js 18 or a newer compatible version
- npm
- MySQL 8 or a compatible MySQL server
- Git, if you are cloning the repository

## Clone the Repository

```bash
git clone https://github.com/Arpit-mandhan-001/mini-task-board.git
cd mini-task-board
```

## Database Setup

1. Start the MySQL server.
2. Open MySQL Workbench, the MySQL command line, or another MySQL client.
3. Run `database/schema.sql` first. This creates the `mini_task_manager` database and the `tasks` table.
4. Run `database/seed.sql` if you want the example tasks shown in the application.

The schema creates these task statuses:

- `todo`
- `in-progress`
- `done`

The schema file drops and recreates the `tasks` table. Do not run it against a database that contains data you need to keep unless you have a backup.

## Backend Setup

Open a terminal in the `server` folder:

```bash
cd server
npm install
```

Create or update `server/.env` with your local MySQL settings:

```env
PORT=
DB_HOST=
DB_PORT=
DB_USER=
DB_PASSWORD=
DB_NAME=
```

Use the username and password configured on your own computer. Do not commit real passwords or other secrets to GitHub.

Start the backend in development mode:

```bash
npm run dev
```

The API runs at `http://localhost:4001` when `PORT=4001` is used. The server connects to MySQL before it starts listening for requests.

## Frontend Setup

Open a second terminal in the `frontend` folder:

```bash
cd frontend
npm install
```

Create or update `frontend/.env`:

```env
NEXT_PUBLIC_API_URL=BACKEND_URL
```

Start the frontend:

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in a browser.

The backend and frontend must both be running. If the frontend shows a connection warning, check that the backend is running, MySQL is available, and `NEXT_PUBLIC_API_URL` points to the correct API address.

## Available Scripts

### Frontend scripts

Run these commands from `frontend`:

| Command         | Purpose                              |
| --------------- | ------------------------------------ |
| `npm run dev`   | Start the Next.js development server |
| `npm run build` | Create a production build            |
| `npm run start` | Start the production build           |
| `npm run lint`  | Run the configured lint command      |

### Backend scripts

Run these commands from `server`:

| Command       | Purpose                                         |
| ------------- | ----------------------------------------------- |
| `npm run dev` | Start the Express server with automatic restart |
| `npm start`   | Start the compiled server from `dist/server.js` |

The backend package does not currently include a TypeScript build script. Use `npm run dev` for local development. A production build script would need to be added before using `npm start` from a fresh checkout.

## REST API

The base URL is `http://localhost:4001/api`.

| Method   | Endpoint            | Purpose                          |
| -------- | ------------------- | -------------------------------- |
| `GET`    | `/health`           | Check whether the API is running |
| `GET`    | `/tasks`            | Return all tasks                 |
| `GET`    | `/tasks/:id`        | Return one task by ID            |
| `POST`   | `/tasks`            | Create a task                    |
| `PATCH`  | `/tasks/:id/status` | Change a task status             |
| `DELETE` | `/tasks/:id`        | Delete a task                    |

### Create a task

Request body:

```json
{
  "title": "Review the assignment",
  "status": "todo"
}
```

`status` is optional and defaults to `todo`.

### Update a task status

Request body:

```json
{
  "status": "done"
}
```

Successful responses use a common format such as:

```json
{
  "success": true,
  "data": {}
}
```

Failed responses use this format:

```json
{
  "success": false,
  "error": "Explanation of the problem"
}
```

## SQL Safety

The SQL queries used by the task repository are parameterized. User-provided values are passed separately from the SQL statement through `mysql2`, for example:

```ts
pool.query("INSERT INTO tasks (title, status) VALUES (?, ?)", [title, status]);
```

The project does not build SQL by concatenating user input into query strings. This reduces the risk of SQL injection for task titles, statuses, and IDs.

The repository has one dynamic query builder for updating optional fields. Its column names come only from the server's fixed list of allowed fields (`title` and `status`), while the actual values and task ID remain parameterized. The current API exposes only the safer status update route.

## Validation and Error Handling

The project checks both normal and failure cases instead of handling only the successful path.

### Validation covered

- Empty or whitespace-only task titles return a `400` error.
- Invalid status values return a `400` error.
- Invalid task ID formats return a `400` error.
- Requests for missing task IDs return a `404` error.
- Database connection failure prevents the server from starting.
- Missing tasks are checked after update and delete operations.

### Frontend error handling

- Initial task loading shows a connection warning when the API cannot be reached.
- Failed task creation keeps the form data and displays an error.
- Failed status updates restore the previous task status in the interface.
- Failed deletes restore the removed task in the interface.
- Loading, submitting, updating, and deleting states disable the relevant controls.
- Empty task titles are checked before a create request is sent.

### Backend error handling

- Controllers use `try/catch` and pass database or service errors to the next Express handler.
- Services create errors with suitable HTTP status codes for invalid input and missing records.
- The response format includes `success` and an error message so the frontend can display the problem.

The repository includes an `errorHandler` middleware implementation in `server/src/middleware/errorHandler.ts`. At the time of writing, `server/src/app.ts` does not register that middleware with `app.use(errorHandler)`. Therefore, expected validation and missing-record errors are handled by the controller/service flow, while unexpected errors currently use Express's default error behavior. Registering the custom middleware would make unexpected API errors follow the same JSON response format.

## Testing the Main Cases Manually

After starting both applications, test these cases in the browser:

1. Load the board and confirm that seeded tasks appear.
2. Add a task with a normal title.
3. Try to submit an empty title and confirm that validation prevents it.
4. Change a task through all three statuses.
5. Filter the list by each status.
6. Delete a task and confirm that it disappears.
7. Stop the backend and refresh the frontend to confirm that a connection error is shown.

You can also check the API health endpoint at [http://localhost:4001/api/health](http://localhost:4001/api/health).
