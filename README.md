# SpecPilot

SpecPilot is a portfolio-ready API testing platform focused on importing Postman collections, running request suites, and visualizing execution history in a simple web interface.

It was built as a full-stack MVP to demonstrate product thinking, backend architecture, authenticated workflows, Swagger-first API design, and a practical frontend for QA-oriented automation.

## Highlights

- Import Postman collections in JSON format
- Authenticate users with JWT
- Store collections and execution history in PostgreSQL
- Run API requests directly from imported collections
- Visualize pass, fail, and error counts
- Explore and test backend endpoints with Swagger
- Includes a demo CRUD API for local testing and portfolio walkthroughs

## Tech Stack

- Frontend: React 18, TypeScript, Vite, Zustand, Tailwind CSS
- Backend: NestJS, TypeORM, PostgreSQL, JWT, Swagger
- Tooling: Docker Compose, ESLint, Prettier

## Screenshots

These portfolio assets are already included in the repository and can be used in GitHub previews or case-study pages.

![SpecPilot overview](./docs/screenshots/specpilot-overview.svg)
![SpecPilot execution flow](./docs/screenshots/specpilot-execution.svg)
![SpecPilot swagger module](./docs/screenshots/specpilot-swagger.svg)

## Product Flow

1. Register or sign in
2. Upload a Postman collection
3. Configure an optional base URL
4. Execute the imported requests
5. Review history, status codes, and execution outcomes

## Demo Endpoints

The project includes a simple demo module for local showcase and testing:

```text
GET    /api/demo-items
GET    /api/demo-items/:id
POST   /api/demo-items
PATCH  /api/demo-items/:id
DELETE /api/demo-items/:id
```

Swagger is available at [http://localhost:3001/api/docs](http://localhost:3001/api/docs).

## Local Setup

```bash
# 1. Start PostgreSQL
# Reuses an existing local `testaix-postgres` container when available
npm run db:up

# 2. Configure backend env
cp backend/.env.example backend/.env

# 3. Configure frontend env
cp frontend/.env.example frontend/.env

# 4. Run backend
cd backend
npm install
npm run start:dev

# 5. Run frontend
cd ../frontend
npm install
npm run dev
```

App URLs:

- Frontend: `http://localhost:3002`
- Backend: `http://localhost:3001`
- Swagger: `http://localhost:3001/api/docs`

## Portfolio Notes

This repository is safe to publish publicly as a portfolio project, with one important rule: do not commit local `.env` files.

- Keep `backend/.env` and `frontend/.env` local only
- Use `*.env.example` as public configuration templates
- The credentials in examples such as `postgres/postgres` are development-only placeholders
- Replace any secret immediately if it was ever used in a real environment

## Repository Structure

```text
POC_API/
├── backend/
│   ├── src/modules/auth
│   ├── src/modules/collections
│   ├── src/modules/demo-items
│   └── src/modules/test-executions
├── frontend/
│   ├── src/pages
│   ├── src/services
│   └── src/stores
├── docs/
│   ├── screenshots/
│   └── *.json
├── docker-compose.yml
└── README.md
```

## Why This Project Matters

SpecPilot is a strong portfolio piece because it combines:

- real authentication and protected routes
- database persistence
- background-style API execution logic
- documentation-first backend development
- practical QA and developer experience use cases

## Author

Jefferson Reis
