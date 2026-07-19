# Maximus — Project State

**Last Updated:** 2026-07-19  
**Version:** 2.1

---

## Overview

Full-stack AI platform: 13 working AI tools + 28 planned tools. Custom admin dashboard with plugin marketplace architecture. Django 5 + Next.js 14.

---

## Active Development

### Honeypot Security System (7/19/2026) ✅ Done

Auto-blocking bot/scanner protection across 3 layers:

| Layer | What | Files |
|-------|------|-------|
| Frontend bait links | 20 invisible `<a>` links in every page — only crawlers follow | `frontend/components/layout/HoneypotBait.tsx` |
| Backend middleware | Catches 55+ scanner paths + bait routes, returns 404, auto-blocks IP | `backend/apps/core/middleware.py` |
| URL fallback | Route-level traps for anything middleware misses | `backend/apps/core/honeypot_urls.py` |

**Models:** `BlockedIP` (admin: unblock action), `SuspiciousActivity` (read-only audit log)  
**Behavior:** First hit → 404 + IP blocked → all subsequent requests 403  
**Dev mode:** Honeypot disabled when `DEBUG=True`  
**Brute-force protection:** 5 login attempts per 5min window → auto-block

### Key Files

| File | Purpose |
|------|---------|
| `docs/AGENTS.md` | AI agent context — conventions, commands, gotchas |
| `docs/ARCHITECTURE.md` | Full system architecture, 19 apps, deployment topology |
| `docs/features.md` | All implemented features inventory |
| `docs/PROJECT_STATE.md` | This file |
| `docker-compose.yml` | Production stack definition |

---

## Previous Work

- Gift rain + newsletter popup (`GiftPopupCTA`) replaces old `PopupCTA`
- Theme provider with 8 palettes (gold, navy, wine, etc.)
- Framer Motion → CSS animations migration

---

## Pending / Known Issues

| Issue | Status |
|-------|--------|
| `/login` Next.js page missing | Pre-existing build warning |
| Newsletter API endpoint 404 | Backend route not registered in Django URLs |
| Dashboard `/(dashboard)/page` prerender | Fixed with route group layout |

---

## Tech Stack

- **Backend:** Django 5, DRF 3.15, Wagtail 6 (deferred)
- **Frontend:** Next.js 14.2, React 18, TypeScript, Tailwind CSS
- **Infra:** PostgreSQL 16, Redis 7, Celery 5, MinIO, Qdrant
- **Auth:** JWT (access 15min + refresh 7d httpOnly)
- **AI:** Ollama (default), LiteLLM (multi-provider), RAG pipeline
