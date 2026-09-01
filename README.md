# VibeCode Backend

Backend API template built with **Bun**, **ElysiaJS**, **Drizzle ORM**, and **MySQL**.

---

## 🛠 Tech Stack

- **Runtime**: [Bun](https://bun.sh/)
- **Framework**: [ElysiaJS](https://elysiajs.com/)
- **ORM**: [Drizzle ORM](https://orm.drizzle.team/)
- **Database**: MySQL (`mysql2` driver)
- **Tooling**: TypeScript, `drizzle-kit`

---

## 📁 Project Structure

```text
├── drizzle/              # Generated SQL migrations (drizzle-kit)
├── src/
│   ├── config/           # Environment and app configuration
│   │   └── env.ts
│   ├── db/               # Database connection and Drizzle schema
│   │   ├── schema/
│   │   │   ├── index.ts
│   │   │   └── users.ts
│   │   └── index.ts
│   ├── routes/           # API Route handlers
│   │   ├── health.ts
│   │   └── users.ts
│   └── index.ts          # Application entry point
├── .env.example          # Environment variables template
├── drizzle.config.ts     # Drizzle Kit configuration
├── package.json
└── tsconfig.json
```

---

## 🚀 Getting Started

### 1. Prerequisites
- [Bun](https://bun.sh/) installed (v1.0+)
- MySQL Server (running locally or remotely)

### 2. Installation
```bash
bun install
```

### 3. Environment Setup
Copy the example `.env` file and adjust your database credentials:
```bash
cp .env.example .env
```

Default variables in `.env`:
```env
PORT=3000
DATABASE_HOST=localhost
DATABASE_PORT=3306
DATABASE_USER=root
DATABASE_PASSWORD=
DATABASE_NAME=vibecode_db
```

### 4. Database Migrations

Generate migration files from your Drizzle schema:
```bash
bun run db:generate
```

Push schema directly to the database:
```bash
bun run db:push
```

Open Drizzle Studio (web UI to inspect and manage your data):
```bash
bun run db:studio
```

### 5. Running the Application

**Development mode** (with auto-reload):
```bash
bun run dev
```

**Production mode**:
```bash
bun run start
```

---

## 🔌 API Endpoints

### General
- `GET /` - Root info & health check overview
- `GET /health` - Service health & MySQL connection status

### Users CRUD
- `GET /users` - Retrieve all users
- `GET /users/:id` - Retrieve a user by ID
- `POST /users` - Create a new user
  ```json
  {
    "name": "John Doe",
    "email": "john@example.com"
  }
  ```
- `DELETE /users/:id` - Delete a user by ID
