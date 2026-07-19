# Maximus Architecture Overview

## High-Level Architecture

```
┌─────────────────────┐         ┌─────────────────────┐
│   Next.js Frontend  │ ◄─────► │   Django + Wagtail  │
│   (App Router)      │   API   │   Backend           │
└─────────────────────┘         └─────────────────────┘
                                          │
                     ┌────────────────────┼────────────────────┐
                     ▼                    ▼                    ▼
               PostgreSQL            Redis + Celery       MinIO + Qdrant
               (Primary DB)          (Cache + Tasks)      (Storage + Vector)
```

---

## Core Components

### 1. Frontend (Next.js 14 + React 18 + TypeScript + TailwindCSS)
- **Marketing Pages** (`app/(marketing)/`): Home, AI Tools, Downloads, Resources, Directories, Marketplace, AI Tools, Onboarding
- **Auth** (`app/(auth)/`): Login, Register
- **Dashboard** (`app/(dashboard)/`): Overview, AI Studio, Billing, Enterprise, Plugins, Settings
- **UI Components** (`components/ui/`): Button (4 variants, 3 sizes), Modal, Badge — all design-token compliant
- **Layout Components** (`components/layout/`): Header, Footer, MobileNav — responsive, accessible
- **API Layer** (`lib/api/`): Typed client, TypeScript interfaces, React Query ready
- **Design System** (`styles/globals.css`, `tailwind.config.ts`): CSS custom properties, token mapping

### 2. Backend (Django 5 + Wagtail 6 + DRF) — **19 Apps**

| Category | Apps | Purpose |
|----------|------|---------|
| **Core** | `core`, `users`, `blog`, `api` | Foundation, auth, CMS, API root |
| **Business** | `tools`, `downloads`, `resources`, `subscriptions`, `leads`, `directories`, `marketing`, `ads` | Tools, commerce, content, billing, growth |
| **AI Layer** | `ai` | Ollama, LiteLLM, Agents, RAG, Vector, Credits, Wagtail AI |
| **Enterprise** | `tenants`, `plugins`, `audit`, `webhooks` | Multi-tenancy, marketplace, audit, integrations |

#### Core Apps (Phase 1)
- **`core`**: `BaseModel` (UUID, timestamps, `is_active`), admin dashboard utilities
- **`users`**: Custom User model, RBAC, profiles, JWT auth
- **`blog`**: Wagtail `BlogIndexPage`, `BlogDetailPage`, SEO fields
- **`api`**: DRF v1 root, versioning, standard pagination/response envelopes

#### Business Apps (Phase 2+)
- **`tools`**: AI tool registry, execution, usage tracking
- **`downloads`**: Digital products, variants, licenses, MinIO delivery, Stripe checkout/webhooks
- **`resources`**: Resource hub, categories, downloads
- **`subscriptions`**: Plans, features, Stripe billing, API keys, usage metering
- **`leads`**: Capture forms, scoring, segmentation, export
- **`directories`**: Curated listings, categories, featured, click tracking
- **`marketing`**: Subscribers, lists, campaigns, templates, Anymail sending
- **`ads`**: Placements, campaigns, targeting, performance metrics

#### AI Layer (Phase 3)
- **`ai`**: 
  - `clients.py` — Ollama + LiteLLM clients
  - `services.py` — High-level AI operations
  - `agents.py` — ContentAgent, SEOAgent
  - `rag.py` — Document ingestion, chunking, embedding, retrieval
  - `vector.py` — Qdrant + ChromaDB clients
  - `credit_system.py` — Per-user/tenant credits, metering, top-ups
  - `wagtail_ai.py` — Wagtail editor integration
  - `models.py` — ToolUsage, AICredit, AIAgent, VectorDocument

#### Enterprise Apps (Phase 4+)
- **`tenants`**: Tenant, TenantUser, WhiteLabelConfig, middleware, RBAC, SSO
- **`plugins`**: Plugin, PluginReview, PluginInstallation, marketplace, revenue sharing
- **`audit`**: AuditLog, middleware, admin integration
- **`webhooks`**: Outbound events, retry logic, HMAC signatures, delivery tracking

### 3. Infrastructure
| Service | Purpose | Configuration |
|---------|---------|---------------|
| **PostgreSQL 16+** | Primary relational DB | UUID PKs, indexes on FKs, connection pooling |
| **Redis 7+** | Cache, Celery broker, results | DB 0=cache, 1=broker, 2=results |
| **Celery 5+** | Background tasks | AI, email, webhooks, analytics |
| **MinIO** | S3-compatible object storage | Presigned URLs, bucket policies |
| **Qdrant / ChromaDB** | Vector embeddings | RAG, semantic search |
| **Meilisearch** | Full-text search | Blog, tools, resources |
| **Nginx** | Reverse proxy, SSL, static files | Rate limiting, caching headers |
| **Docker** | Containerization | Multi-stage builds, dev/prod compose |
| **Coolify / Dokploy** | Self-hosted deployment | Git-based, zero-downtime |
| **Grafana + Prometheus** | Monitoring | Metrics, dashboards, alerts |

---

## Key Design Principles

1. **Service Layer Pattern** — All business logic lives in `services.py`, never in views or models
2. **UUID Primary Keys** — Used across all models for security and distributed systems
3. **Design Tokens** — All styling uses CSS custom properties defined in `globals.css`
4. **AI-First** — Ollama is the default AI provider; proprietary APIs optional via LiteLLM
5. **Self-Hostable** — No vendor lock-in; all services run on standard VPS
6. **API Versioning** — `/api/v1/{resource}/` from day one
7. **Alpine.js for CMS** — Server-rendered templates use Alpine.js; React for app pages
8. **JWT Auth** — Access token (15min) + Refresh token (7d, httpOnly cookie)
9. **Multi-Tenant Ready** — Middleware resolves tenant; all models tenant-scoped

---

## Data Flow Example (AI Tool Execution)

```
1. User triggers AI tool from frontend (Next.js dashboard)
         │
         ▼
2. API request: POST /api/v1/tools/{slug}/run/
         │
         ▼
3. Django ViewSet → ToolService.execute_tool()
         │
         ▼
4. ai/services.py calls Ollama (via LiteLLM) or RAG pipeline
         │
         ▼
5. ToolUsage record created (user, tool, input, output, credits)
         │
         ▼
6. AICredit deducted via credit_system.py
         │
         ▼
7. Response returned to frontend (streaming or JSON)
```

---

## Custom Admin Dashboard Architecture (Phase 5 — In Progress)

```
┌─────────────────────────────────────────────────────────────┐
│                    /admin/  (Single Unified)                │
├─────────────────────────────────────────────────────────────┤
│  Sidebar Navigation                                         │
│  ├─ Dashboard (Overview, Metrics, Quick Actions)           │
│  ├─ Content (Wagtail: Pages, Blog, Media, Forms)           │
│  ├─ Commerce (Downloads, Orders, Subscriptions, Coupons)   │
│  ├─ AI Tools (Registry, Usage, Credits, Agents)            │
│  ├─ Marketing (Leads, Campaigns, Subscribers, Directories) │
│  ├─ Advertising (Placements, Campaigns, Reports)           │
│  ├─ Analytics (Events, Funnels, Real-time)                 │
│  ├─ Extensions (Plugin Marketplace, Installed, Revenue)    │
│  └─ Settings (Tenants, Users, RBAC, SSO, White-label)      │
├─────────────────────────────────────────────────────────────┤
│  Tech: Django Views + Tailwind + Alpine.js                 │
│  Design: Poppins, Brand Tokens, Dark Mode, Mobile-first    │
└─────────────────────────────────────────────────────────────┘
```

---

## Security Architecture

- **Authentication**: JWT (RS256) with short-lived access + long-lived refresh cookies
- **Authorization**: DRF permissions + tenant-scoped RBAC (`tenants/rbac.py`)
- **Rate Limiting**: Per-user throttles (DRF) + Nginx rate limits
- **CORS**: Explicit origins only
- **Secrets**: Environment variables only (`.env`), never in code
- **Audit**: Immutable logs for all sensitive operations (`audit/`)
- **Webhooks**: HMAC signature verification, replay protection

---

## Scalability Considerations

| Layer | Strategy |
|-------|----------|
| **Database** | Read replicas, connection pooling (PgBouncer), partitioning for audit logs |
| **Cache** | Redis Cluster, cache-aside pattern, template fragment caching |
| **Tasks** | Celery workers autoscaled by queue depth, priority queues |
| **Storage** | MinIO distributed mode, CDN in front (Cloudflare) |
| **Search** | Meilisearch cluster, Qdrant distributed |
| **Frontend** | Next.js ISR/SSG for marketing, SSR for dashboard, edge caching |
| **Multi-region** | PostgreSQL streaming replication, Redis cross-region, DNS failover |

---

## Deployment Topology (Production)

```
                    ┌─────────────┐
                    │   Coolify   │  (Git-based deploy)
                    └──────┬──────┘
                           │
          ┌────────────────┼────────────────┐
          ▼                ▼                ▼
    ┌──────────┐    ┌──────────┐    ┌──────────┐
    │  Web     │    │  Worker  │    │  Cron    │
    │ (Nginx + │    │ (Celery) │    │ (Beat)   │
    │  Next.js │    │          │    │          │
    └──────────┘    └──────────┘    └──────────┬──┘
          │                │                │
          └────────────────┼────────────────┘
                           │
          ┌────────────────┼────────────────┐
          ▼                ▼                ▼
    ┌──────────┐    ┌──────────┐    ┌──────────┐
    │PostgreSQL│    │  Redis   │    │  MinIO   │
    │  (Primary)│   │ (Cluster)│    │ (Dist.)  │
    └──────────┘    └──────────┘    └──────────┘
          │
          ▼
    ┌──────────┐    ┌──────────┐
    │ Qdrant/  │    │ Meili-   │
    │ ChromaDB │    │ search   │
    └──────────┘    └──────────┘
```

---

**Last Updated:** 2026-07-02  
**Version:** 2.0 (reflects 19-app architecture)  
**Source of Truth:** [PROJECT_STATE.md](PROJECT_STATE.md)