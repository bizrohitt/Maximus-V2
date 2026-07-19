# Maximus — Features

This document outlines all features **currently implemented** in Maximus as of 2026-07-02.

> **Note:** The codebase implements 19 Django apps — significantly more than the original Phase 4 scope. See [PROJECT_STATE.md](PROJECT_STATE.md) for complete inventory.

---

## 🏗️ Core Platform

- **Modern CMS** powered by Wagtail 6 (BlogIndexPage, BlogDetailPage, custom blocks)
- **SEO-optimized blog system** (Index + Detail pages, meta tags, sitemap, Open Graph)
- **Clean, minimal design system** — Poppins font, brand colors (White primary / Deep Red-Orange secondary / Vibrant Green accent), CSS custom properties
- **Responsive marketing website** — Next.js 14 App Router, mobile-first, TailwindCSS
- **Design tokens** — All styling via CSS variables in `globals.css`, mapped in `tailwind.config.ts`
- **Alpine.js integration** — Loaded in `base.html` for CMS template interactivity

---

## 🤖 AI & Automation

- **Local AI inference** via Ollama (default, self-hosted)
- **Multi-provider abstraction** via LiteLLM (OpenAI, Anthropic, local models)
- **AI Agents:**
  - `ContentAgent` — Blog posts, tool descriptions, marketing copy
  - `SEOAgent` — Meta titles, descriptions, keyword optimization
- **RAG (Retrieval-Augmented Generation)** — Document ingestion, chunking, embedding, retrieval
- **Vector search** — Qdrant and ChromaDB support (`ai/vector.py`)
- **Background AI tasks** — Celery workers (`tasks/ai_tasks.py`)
- **AI Tools system** — Extensible registry with usage tracking (`tools/`)
- **AI Credit system** — Per-user/tenant credits, usage metering, top-up (`ai/credit_system.py`)
- **Wagtail AI integration** — AI-assisted content editing (`ai/wagtail_ai.py`)

---

## 🛠️ Tools & Utilities

- **AI Tool registry** — Dynamic tool definitions, parameters, categories
- **Tool execution** — Sync/async via API, streaming responses
- **Usage history** — Per-user tracking, analytics
- **Extensible architecture** — Add new tools via Django admin

---

## 💰 Commerce & Monetization

- **Digital Downloads Marketplace** — Products, variants, licensing, MinIO delivery
- **Stripe integration** — Checkout, subscriptions, webhooks, customer portal (`downloads/stripe.py`, `subscriptions/stripe.py`)
- **Subscription plans** — Tiered pricing, feature gating, trial support
- **Enterprise billing tier** — Custom contracts, volume discounts
- **API Key management** — Scoped keys, rate limits, usage analytics (`subscriptions/`)
- **Usage metering foundation** — Event-based tracking for billing
- **Plugin marketplace revenue sharing** — Foundation in `plugins/revenue.py`

---

## 📚 Directories & Resources

- **Curated Directories system** — Categories, listings, featured entries, click tracking (`directories/`)
- **Resource Hub** — Downloadable assets, guides, templates (`resources/`)
- **Category/tag taxonomy** — Hierarchical organization
- **Submission workflow** — User submissions, admin moderation

---

## 📈 Marketing & Leads

- **Lead generation** — Forms, capture, scoring, segmentation (`leads/`)
- **Email Marketing foundation:**
  - Subscriber management (lists, tags, custom fields)
  - Campaign creation (templates, scheduling, A/B testing ready)
  - Sending logic via Django Anymail (provider-agnostic) — **needs wiring**
  - Campaign analytics (open, click, bounce)
- **Analytics event tracking** — Custom events, page views, funnel analysis (`analytics/`)
- **UTM parameter handling** — Automatic capture and attribution

---

## 🏢 Enterprise & Marketplace

- **Multi-tenancy** — Tenant isolation, subdomain/domain routing, per-tenant settings (`tenants/`)
- **Tenant middleware** — Automatic tenant resolution from request
- **RBAC (Role-Based Access Control)** — Roles, permissions, scoped to tenant (`tenants/rbac.py`)
- **SSO (SAML / OIDC)** — Placeholders and base implementation (`tenants/sso.py`)
- **White-label branding** — Per-tenant logo, colors, domain, email templates (`tenants/models.py`)
- **Plugin Registry** — Installable extensions, versioning, dependencies (`plugins/`)
- **Plugin Marketplace** — Browse, search, ratings, reviews (`plugins/marketplace.py`)
- **Plugin revenue sharing** — Developer payouts, platform fees (`plugins/revenue.py`)
- **Audit logging** — Comprehensive activity trail (`audit/`)
- **Webhook system** — Outbound events, retry logic, signatures (`webhooks/`)

---

## 📢 Advertising

- **Ad management** — Placements, campaigns, targeting (`ads/`)
- **Ad zones** — Header, sidebar, in-content, footer
- **Performance tracking** — Impressions, clicks, CTR

---

## 🔧 Technical Foundation

- **UUID primary keys** — All models, distributed-system ready
- **Service-layer architecture** — Business logic in `services.py`, thin views
- **Docker + PostgreSQL + Redis + MinIO** — Full containerization
- **Git + CI/CD** — GitHub Actions workflow (`.github/workflows/ci.yml`)
- **Self-hostable** — No vendor lock-in, Coolify/Dokploy ready
- **API versioning** — `/api/v1/` from day one
- **JWT Auth** — Access (15min) + Refresh (7d, httpOnly cookie)
- **Redis split** — DB 0=cache, 1=Celery broker, 2=Celery results

---

## 🎨 Frontend (Next.js + React + TypeScript)

| Area | Pages/Components |
|------|------------------|
| **Marketing** | Home, AI Tools, Downloads, Resources, Directories, Marketplace, Onboarding |
| **Auth** | Login, Register (route group) |
| **Dashboard** | Overview, AI Studio, Billing, Enterprise, Plugins, Settings |
| **UI Components** | Button (variants/sizes), Modal, Badge — all token-compliant |
| **Layout** | Header, Footer, MobileNav — responsive, accessible |
| **API Layer** | Typed client (`lib/api/client.ts`), TypeScript interfaces (`types/api.ts`) |

---

## 📄 Templates (Wagtail + Alpine.js)

- `base.html` — Alpine.js CDN, design tokens, layout structure
- `blog/blog_index_page.html` — Blog listing, pagination, filters
- `blog/blog_detail_page.html` — Article view, SEO, social sharing
- `emails/campaign.html` — Email template with design system

---

## 📦 Infrastructure

| Service | Purpose |
|---------|---------|
| PostgreSQL 16+ | Primary database |
| Redis 7+ | Cache, Celery broker, results |
| Celery 5+ | Background tasks (AI, email, webhooks) |
| MinIO | S3-compatible object storage |
| Qdrant / ChromaDB | Vector embeddings for RAG |
| Nginx | Reverse proxy, static files |
| Grafana + Prometheus | Monitoring (configured) |

---

## 🔐 Security & Compliance

- **JWT with httpOnly refresh cookies** — XSS-resistant auth
- **Rate limiting** — Per-user, per-endpoint (DRF throttles)
- **CORS configured** — Explicit origins
- **Environment-based secrets** — `.env` only, no hardcoded values
- **SQL injection prevention** — Django ORM, parameterized queries
- **CSRF protection** — Django built-in
- **Audit logs** — Immutable activity trail

---

## 📊 Observability

- **Structured logging** — Python `logging` with JSON formatter
- **Health checks** — `/health/` endpoint for orchestration
- **Prometheus metrics** — `/metrics` endpoint
- **Error tracking ready** — Sentry integration point

---

## ⚡ Performance

- **Database indexes** — `db_index=True` on FKs, frequent filters
- **Select/prefetch related** — Service layer enforces
- **Redis caching** — Template fragments, API responses
- **MinIO CDN-ready** — Presigned URLs, edge caching
- **Next.js ISR/SSG** — Marketing pages static, dashboard SSR

---

## 🔮 Features In Progress / Partial

| Feature | Status | Location |
|---------|--------|----------|
| Custom Admin Dashboard | 🟡 In Progress | `core/admin_dashboard.py` (stub) |
| Stripe Webhook Handlers | 🟡 Partial | `subscriptions/webhook.py`, `downloads/webhook.py` |
| Email Campaign Sending | 🟡 Partial | `marketing/email_service.py` (provider stub) |
| SAML/OIDC SSO | 🟡 Placeholders | `tenants/sso.py` |
| Plugin Installation UI | 🟡 Backend ready | `plugins/` models + services |
| Vector Search (Qdrant) | 🟡 Implemented | `ai/vector.py` |

---

## 📋 Open Questions (from AI_PROJECT_CONTEXT.md)

| # | Question | Affects |
|---|----------|---------|
| 1 | Brand name — **Maximus**? | ✅ **SET** |
| 2 | Brand color palette? | ✅ **SET** (White / #B5300A / #3ECF8E) |
| 3 | Icon library — Heroicons or Lucide? | ❌ **PENDING** |
| 4 | Analytics — PostHog, Umami, or Plausible? | ❌ **PENDING** |
| 5 | Email provider — Resend or Postal (self-hosted)? | ❌ **PENDING** |
| 6 | Payment region/currency defaults? | ❌ **PENDING** |

---

**Last Updated:** 2026-07-02  
**Version:** 2.0 (reflects actual 19-app codebase)  
**Source of Truth:** [PROJECT_STATE.md](PROJECT_STATE.md)