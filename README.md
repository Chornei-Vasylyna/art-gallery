# Art Gallery

Art Gallery is a web application for browsing and managing artworks. It has a NestJS backend with PostgreSQL persistence and a React/Vite frontend.

## Stack and prerequisites

- Node.js
- pnpm
- Docker and Docker Compose (for the PostgreSQL container)
- PostgreSQL
- Backend: NestJS, TypeORM, TypeScript
- Frontend: React, Vite, TypeScript, Tailwind CSS

## Quick start

```bash
cd backend
pnpm install
cp .env.example .env     # Windows CMD: copy .env.example .env
pnpm db:up               # start the PostgreSQL container
pnpm db:seed             # apply migrations, create the admin and sample artworks
pnpm start:dev
```

In a second terminal:

```bash
cd frontend
pnpm install
cp .env.example .env     # Windows CMD: copy .env.example .env
pnpm dev
```

Open `http://localhost:5173`.

Log in with the admin account described in the "Admin account" section below.

## Step-by-step setup

### 1. Install dependencies

Install each package separately:

```bash
cd backend
pnpm install
```

```bash
cd frontend
pnpm install
```

### 2. Configure the environment

Create the backend environment file from the example:

```bash
cd backend
cp .env.example .env     # Windows CMD: copy .env.example .env
```

Create the frontend environment file from the example:

```bash
cd frontend
cp .env.example .env     # Windows CMD: copy .env.example .env
```

Backend variables:

- `DB_HOST`, `DB_PORT`, `DB_USERNAME`, `DB_PASSWORD`, and `DB_DATABASE` configure the PostgreSQL connection.
- `JWT_ACCESS_SECRET` and `JWT_REFRESH_SECRET` sign authentication tokens.
- `JWT_ACCESS_EXPIRES_IN` and `JWT_REFRESH_EXPIRES_IN` configure token lifetimes.
- `SEED_ADMIN_EMAIL` and `SEED_ADMIN_PASSWORD` configure the seeded admin account.
- `FRONTEND_URL` configures the allowed frontend origin for CORS.

The frontend variable `VITE_API_URL` configures the backend API URL. The provided value is `http://localhost:3000/api`.

### 3. Start the database

The backend compose file starts PostgreSQL:

```bash
cd backend
pnpm db:up
```

This runs `docker compose up -d` and maps `${DB_PORT:-5432}` to PostgreSQL's port 5432. The compose service uses `DB_USERNAME`, `DB_PASSWORD`, and `DB_DATABASE` from the backend `.env`.

To use an existing PostgreSQL database instead, do not start the compose service and change `DB_HOST`, `DB_PORT`, `DB_USERNAME`, `DB_PASSWORD`, and `DB_DATABASE` in `backend/.env`.

### 4. Generate migrations after a schema change

If you change the TypeORM schema, generate a migration by passing the path to the migrations folder and a migration name:

```bash
cd backend
pnpm db:generate src/db/migrations/AddArtworkDescription
```

`AddArtworkDescription` is the migration name. Use a short name that describes the change. Then apply it with `pnpm db:migrate` and commit the generated file.

This command uses the `db:generate` script from `backend/package.json`.

### 5. Apply migrations to the database

The migrations are already committed in `backend/src/db/migrations`. `pnpm db:seed` applies them automatically, so this step is only needed if you want to migrate without seeding (for example, on an existing database).

```bash
cd backend
pnpm db:migrate
```

This uses the `db:migrate` script from `backend/package.json`.

### 6. Seed initial data

The seed applies migrations, clears existing users and artworks, creates the admin account, and inserts eight artworks:

```bash
cd backend
pnpm db:seed
```

Warning: `pnpm db:seed` deletes all existing users and artworks before inserting the sample data. Do not run it against a database with real data.

### 7. Run the application

Start the backend on port 3000:

```bash
cd backend
pnpm start:dev
```

Start the frontend on port 5173:

```bash
cd frontend
pnpm dev
```

The frontend API URL is `http://localhost:3000/api` by default.

### 8. Run with Docker

Docker is used for the PostgreSQL database only (`pnpm db:up`). The backend and frontend are not containerized and run locally.

## Admin account

The seed creates an admin account. By default it uses these development credentials:

- Email: `admin@art-gallery.test`
- Password: `Admin123!`

To use your own credentials, set `SEED_ADMIN_EMAIL` and `SEED_ADMIN_PASSWORD` in `backend/.env` before running `pnpm db:seed`.

## Features and roles

### Regular users

- Register and log in.
- Refresh and log out of an authenticated session.
- View the artwork list and artwork details.
- Filter artworks by artist and type.
- Sort artworks by price.

### Admin users

Admins can do everything regular users can do and can also create, update, and delete artworks.

## API endpoints

All backend endpoints use the `/api` global prefix.

- `POST /api/auth/register` - register a regular user and issue tokens.
- `POST /api/auth/login` - authenticate a user and issue tokens.
- `POST /api/auth/refresh` - refresh tokens using the refresh-token cookie.
- `POST /api/auth/logout` - log out and clear the refresh-token cookie.
- `GET /api/artworks` - list artworks, optionally filtering by `artist` or `type`, or sorting with `sortByPrice=asc|desc`.
- `GET /api/artworks/:id` - get one artwork by UUID.
- `POST /api/artworks` - create an artwork; admin only.
- `PUT /api/artworks/:id` - update an artwork; admin only.
- `DELETE /api/artworks/:id` - delete an artwork; admin only.

## Project structure

```text
.
├── backend/
│   ├── src/
│   │   ├── auth/          # Authentication, tokens, roles, and guards
│   │   ├── artworks/      # Artwork controller, service, DTOs, and types
│   │   └── db/            # TypeORM data source, entities, migrations, seed
│   ├── .env.example       # Backend environment template
│   ├── docker-compose.yml # PostgreSQL service
│   └── package.json       # Backend scripts and dependencies
├── frontend/
│   ├── src/
│   │   ├── app/           # App providers and routing
│   │   ├── features/      # Authentication and artwork features
│   │   ├── pages/         # Page components
│   │   └── shared/        # Shared API, layouts, and UI components
│   ├── .env.example       # Frontend environment template
│   └── package.json       # Frontend scripts and dependencies
└── README.md              # Project documentation
```