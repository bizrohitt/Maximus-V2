# Maximus — AI Agent Context

## Tech Stack
- **Frontend:** Next.js 14.2 (App Router) + React 18 + TypeScript + Tailwind CSS
- **Backend:** Django 5 + DRF 3.15 + Wagtail 6 (deferred)
- **Database:** SQLite3 (dev) / PostgreSQL 16 (prod)
- **Infra:** Docker, Redis, Celery, MinIO, Qdrant, Nginx

## Project Structure

```
/
├── frontend/          Next.js 14 App Router
│   ├── app/
│   │   ├── (marketing)/  Public pages (tools, blog, downloads)
│   │   ├── (auth)/       Login, register
│   │   ├── (dashboard)/  User dashboard pages
│   │   ├── admin/        Custom admin (Django templates via Next.js rewrites)
│   │   └── ai-tools/     AI tool pages with [slug] routes
│   ├── components/
│   │   ├── ui/           Shared UI (Button, Modal, Badge, etc.)
│   │   ├── layout/       Header, Footer, Navbar, HoneypotBait, GiftPopupCTA
│   │   └── marketing/    Popups, CTAs, newsletter forms
│   ├── lib/api/          Typed API client
│   └── styles/           globals.css with CSS custom properties
│
├── backend/            Django 5
│   ├── config/         settings (dev/prod/base), urls, wsgi
│   └── apps/
│       ├── core/       BaseModel, SiteSettings, BlockedIP, SecurityMiddleware
│       ├── users/      Custom User, RBAC
│       ├── api/        DRF v1 root
│       ├── marketing/  Newsletter, subscribers, campaigns
│       ├── ai/         Ollama, LiteLLM, RAG, vector, agents
│       ├── tools/      AI tool registry, execution
│       ├── tenants/    Multi-tenancy, SSO, white-label
│       ├── plugins/    Plugin marketplace, revenue sharing
│       └── ...         ~19 apps total
│
├── docker-compose.yml  Prod stack
└── docs/               Architecture, features, state docs
```

## Key Conventions for AI Agents

### Backend
- **Service Layer Pattern:** Business logic in `services.py`, views are thin
- **UUID PKs on all models** (`apps/core/models.py:BaseModel`)
- **Design tokens:** Colors via `var(--color-*)` CSS variables
- **DRF throttling:** `anon: 100/hour`, `user: 1000/hour`
- **JWT Auth:** Access (15min) + Refresh (7d httpOnly cookie)

### Frontend
- **App Router** with route groups: `(marketing)/`, `(auth)/`, `(dashboard)/`
- **'use client'** only when needed (hooks, state, effects)
- **CSS variables** for all colors, no hardcoded values
- **Framer Motion REMOVED** — all animations use CSS transitions/keyframes
- **API calls** via `lib/api/client.ts` (typed fetch wrapper)

## Security System (Honeypot)

Auto-blocks bots/scanners. See `docs/SECURITY.md`.

## Build & Test Commands

| Command | Purpose |
|---------|---------|
| `cd frontend && npx next build` | Full frontend build (lint + types + compile) |
| `cd frontend && npx next dev` | Frontend dev server (port 3000) |
| `cd backend && python manage.py check` | Django system check |
| `cd backend && python manage.py runserver` | Django dev server (port 8000) |
| `cd backend && python manage.py makemigrations` | New DB migrations |
| `cd backend && python manage.py migrate` | Apply migrations |

## Important Gotchas
- No opencode.json or AGENTS.md existed before — this file was created fresh
- Wagtail is in requirements.txt but commented out of INSTALLED_APPS
- Redis and Celery are installed but not wired in Django settings (no CACHES config)
- `/login` page module missing — pre-existing build warning
- Design token `purple` was removed from Palette type; use `gold`, `navy`, `wine`, `slate`, `forest`, `rose`, `copper`, `obsidian`
