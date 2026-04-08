# Expense Tracker

A full-stack expense tracking application built with Vue 3 + Node.js.

## Stack

- **Frontend:** Vue 3, TypeScript, Vite, Pinia, Vue Router, Tailwind CSS
- **Backend:** Node.js, Express 5, TypeScript, Prisma 7
- **Database:** PostgreSQL 18

## Prerequisites

- Node.js 24+
- PostgreSQL 18 — [Download for Windows](https://www.postgresql.org/download/windows/) (use the EDB installer)
- nvm (recommended for Node version management)

---

## Setup

### 1. Clone and install dependencies

```bash
# Frontend
cd frontend
npm install

# Backend
cd ../backend
npm install
```

### 2. Configure environment

```bash
cd backend
cp .env.example .env
```

Edit `backend/.env` and set your PostgreSQL credentials:

```env
DATABASE_URL="postgresql://postgres:yourpassword@localhost:5432/expense_tracker"
PORT=3000
CLIENT_URL=http://localhost:5173
```

### 3. Set up the database

```bash
cd backend
npm run db:migrate    # run migrations
npm run db:generate   # generate Prisma client
```

### 4. Run the app

Open two terminals:

```bash
# Terminal 1 — backend
cd backend
npm run dev

# Terminal 2 — frontend
cd frontend
npm run dev
```

Frontend: http://localhost:5173  
Backend: http://localhost:3000

---

## Scripts

### Frontend (`/frontend`)

| Script | Description |
|--------|-------------|
| `npm run dev` | Start dev server |
| `npm run build` | Build for production |
| `npm run preview` | Preview production build |

### Backend (`/backend`)

| Script | Description |
|--------|-------------|
| `npm run dev` | Start dev server with hot reload |
| `npm run build` | Compile TypeScript |
| `npm run start` | Run compiled build |
| `npm run db:migrate` | Run database migrations |
| `npm run db:generate` | Generate Prisma client |
| `npm run db:studio` | Open Prisma Studio |
