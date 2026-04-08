# Expense Tracker

A full-stack single-page application for monitoring and categorising personal spending. Users log daily expenses, filter and search their history, and view breakdowns by category and month-over-month trends — giving a clear picture of where money is going without leaving the page.

---

## Tech Stack

| Layer | Technology |
|---|---|
| **Frontend** | Vue 3 (Composition API, `<script setup>`) + TypeScript |
| **Styling** | Tailwind CSS v4 (utility classes + CSS custom property design tokens) |
| **Routing** | Vue Router 5 |
| **State** | Pinia stores (expenses, dashboard, filters) |
| **Charts** | Apache ECharts via vue-echarts |
| **HTTP** | Axios |
| **Backend** | Node.js + Express 5 + TypeScript |
| **ORM / Data** | Prisma 7 with PostgreSQL 18 |
| **Dev tooling** | Vite 8, tsx (hot reload), vue-tsc |

---

## Features

- Add, edit, and delete expenses — each with a title, category, amount, date & time, and optional description
- Inline editing — edit an expense directly in the timeline without opening a separate page
- Confirmation modal before deleting to prevent accidental loss
- Timeline view grouped by day with per-day totals
- Category breakdown with proportional bar on the Expenses page
- Filter by keyword search, category, and date range
- Date-range presets: This month, Last month, Last 30 days, This year
- Sort expenses by date or amount (ascending or descending)
- Dashboard with monthly spend bar chart, cumulative spend line chart, and category doughnut chart
- Stat cards: all-time total, this month, last month with month-on-month % change, and daily average
- Dark mode toggle with system preference detection and `localStorage` persistence
- Responsive layout — works on mobile and desktop

---

## Folder Structure

```
expense-tracker/
├── frontend/
│   └── src/
│       ├── components/     # Reusable UI components (ExpenseForm, ExpenseTimeline, charts, badges)
│       ├── views/          # Page-level components (ExpensesView, DashboardView)
│       ├── stores/         # Pinia stores — expenses, dashboard summaries, filter state
│       ├── composables/    # Shared logic (useTheme — dark mode singleton)
│       ├── utils/          # Pure helpers: currency formatting, date conversion, colour resolution
│       ├── types/          # TypeScript interfaces and category constants
│       └── router/         # Vue Router configuration and route definitions
├── backend/
│   └── src/
│       ├── controllers/    # Route handler logic with input validation and error handling
│       ├── routes/         # Express router definitions
│       └── lib/            # Shared server utilities (Prisma client singleton)
│   └── prisma/
│       ├── schema.prisma   # Database schema (Expense model)
│       ├── prisma.config.ts # Prisma 7 adapter and datasource configuration
│       └── seed.sql        # Sample data (45 expenses across Jan–Apr 2026)
```

---

## Challenges

**Datetime and timezone handling.** The backend stores all dates as UTC timestamps, but `<input type="datetime-local">` produces local time strings with no timezone information. Keeping the edit form pre-populated with the correct local time required a dedicated `toLocalDatetime` utility that adjusts for the user's UTC offset before slicing the ISO string, so the stored UTC value round-trips back to the correct local display.

**Chart colour synchronisation with dark mode.** ECharts requires resolved hex colour values at option-build time, but the design tokens use CSS custom properties in `oklch` format (Tailwind v4). A lazy-initialised canvas context is used to resolve the computed colour value through the browser's own colour normalisation pipeline, allowing CSS variables to drive chart series colours without hard-coding any values.

**Filter state persistence across navigation.** The initial design used a composable with module-level `ref` state to keep filters alive when switching between pages. While it worked, it was semantically a singleton store rather than a composable. Migrating the filter state into a proper Pinia store made the intent explicit, improved testability, and allowed the filter logic to read directly from the expense store without requiring a getter to be passed in as an argument.

**Perceived performance on navigation.** By default, Vue Router destroys and recreates components on every route change, triggering `onMounted` and a fresh network request each time. Adding `<KeepAlive>` to the router view caches component instances across navigation. The Dashboard uses `onActivated` instead of `onMounted` so it refreshes when navigated back to (since expenses may have changed), while the Expenses page loads once and stays in sync through optimistic store updates on create, edit, and delete.

**Prisma 7 adapter configuration.** Prisma 7 moved away from embedding the datasource URL in `schema.prisma` toward a separate `prisma.config.ts` that constructs the adapter programmatically. The migration runner and the runtime client both require the adapter configured independently, which required understanding the distinction between the migrate-time adapter (in `prisma.config.ts`) and the client-time adapter (passed to `new PrismaClient()`).

---

## Prerequisites

- Node.js 24+
- PostgreSQL 18 — [Download for Windows](https://www.postgresql.org/download/windows/) (use the EDB installer)

---

## Setup

### 1. Install dependencies

```cmd
cd frontend
npm install
cd ..\backend
npm install
```

### 2. Configure environment

```cmd
cd backend
copy .env.example .env
```

Edit `backend\.env`:

```
DATABASE_URL=postgresql://postgres:yourpassword@localhost:5432/expense_tracker
PORT=3000
CLIENT_URL=http://localhost:5173
```

### 3. Run migrations

```cmd
cd backend
npm run db:migrate
```

### 4. Seed sample data (optional)

Loads 45 expenses across Jan–Apr 2026:

```cmd
psql postgresql://postgres:yourpassword@localhost:5432/expense_tracker -f backend\prisma\seed.sql
```

### 5. Start the app

Open two Command Prompt windows:

```cmd
cd backend
npm run dev
```

```cmd
cd frontend
npm run dev
```

Frontend: http://localhost:5173  
Backend: http://localhost:3000

---

## Scripts

### Frontend

| Script | Description |
|---|---|
| `npm run dev` | Start Vite dev server |
| `npm run build` | Type-check and build for production |
| `npm run preview` | Preview production build |

### Backend

| Script | Description |
|---|---|
| `npm run dev` | Start dev server with hot reload |
| `npm run build` | Compile TypeScript |
| `npm run start` | Run compiled build |
| `npm run db:migrate` | Apply migrations and generate Prisma client |
| `npm run db:studio` | Open Prisma Studio (database GUI) |
| `npm run db:export` | Export database to `exports/expense_tracker.sql` |
