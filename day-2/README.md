# Day-1 — Node.js + MySQL

A simple REST API built with **Express** and **MySQL2**, created as part of the DevOps recap series.

## Project Structure

```
day-2/
├── index.js      # Express server + routes
├── db.js         # MySQL connection pool
├── .env          # Environment variables (not committed)
├── .gitignore
├── package.json
└── README.md
```

## Prerequisites

- Node.js ≥ 18
- MySQL server running locally (or update `.env` for a remote server)

## Setup

```bash
# 1. Install dependencies
npm install

# 2. Configure your DB credentials
cp .env .env.local   # optional, edit .env directly
nano .env

# 3. Start the server
npm start
```

## API Endpoints

| Method | Route        | Description         |
|--------|--------------|---------------------|
| GET    | `/`          | Health check        |
| GET    | `/users`     | Get all users       |
| GET    | `/users/:id` | Get user by ID      |
| POST   | `/users`     | Create a new user   |
| DELETE | `/users/:id` | Delete a user by ID |

### Create a user (example)

```bash
curl -X POST http://localhost:3000/users \
  -H "Content-Type: application/json" \
  -d '{"name": "Alice", "email": "alice@example.com"}'
```

## Environment Variables

| Variable    | Default     | Description          |
|-------------|-------------|----------------------|
| DB_HOST     | localhost   | MySQL host           |
| DB_PORT     | 3306        | MySQL port           |
| DB_USER     | root        | MySQL username       |
| DB_PASSWORD | _(empty)_   | MySQL password       |
| DB_NAME     | testdb      | Database name        |
| PORT        | 3000        | Express server port  |

### Docker
┌─────────────────────────────────────────────┐
│  Stage 1: builder                           │
│  • Installs only prod dependencies          │
│  • npm ci --omit=dev  (no devDeps bloat)    │
└───────────────────┬─────────────────────────┘
                    │  COPY --from=builder
┌───────────────────▼─────────────────────────┐
│  Stage 2: runner                            │
│  • Clean alpine image (no npm, no cache)    │
│  • Gets node_modules from builder stage     │
│  • Copies only app source code              │
│  • Result: smaller, secure final image 🎯   │
└─────────────────────────────────────────────┘

docker context use my-vps
docker build -t nodemysql:2.0 .
## nodemysql:1.0                           b51184cf38e6        197MB           48MB    U   
## nodemysql:2.0                           ef87f253c8fb        192MB         46.4MB
docker network create mysql-server_mysql-network 
docker run -d --name  --env-file .env nodemysql:2.0
docker network connect mysql-server_mysql-network  day2container
docker logs --tail 3 --since 10mday2container
