# Day-1 — Node.js + MySQL

A simple REST API built with **Express** and **MySQL2**, created as part of the DevOps recap series.

## Project Structure

```
day-1/
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

docker context use my-vps
docker build -t nodemysql:1.0 .
docker network create mysql-server_mysql-network 
docker run -d --name day1container --network mysql-server_mysql-network --env-file .env nodemysql:1.0
docker logs day1container
