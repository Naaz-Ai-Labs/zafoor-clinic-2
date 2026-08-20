# Zafoor Clinic

Two independently deployed apps in this repo:

- **`WEB/`** — the public marketing site (Vite + React). Deploy to Vercel with
  Root Directory set to `WEB`. Requires `VITE_CRM_API_URL` pointing at the
  CRM's deployed URL (see `WEB/.env.example`).
- **`CRM/`** — the clinic's internal CRM (Next.js + Prisma + Supabase Postgres).
  Deploy to Vercel with Root Directory set to `CRM`. Requires `DATABASE_URL`
  and the `SUPABASE_*` vars (see `CRM/.env.example`) set as Vercel Environment
  Variables — never commit real values, only `.env.example` ships here.

## Deploying on Vercel

Import this repo twice as two separate Vercel projects (or configure two
targets in one project's settings), each with its own **Root Directory**:

1. Project "zafoor-web" → Root Directory: `WEB`
2. Project "zafoor-crm" → Root Directory: `CRM`

Set each project's environment variables in the Vercel dashboard under
Settings → Environment Variables. Both apps share the same Supabase Postgres
database (`CRM` writes to it via Prisma; `WEB` never touches the database
directly — it only calls `CRM`'s public REST API for booking).
