# Changelog

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

---

## [2.0.0] — 2026-07-02

### Added — Major Architecture Expansion (19 Django Apps)

**Core Platform**
- Complete Wagtail 6 CMS integration (BlogIndexPage, BlogDetailPage)
- Next.js 14 App Router frontend with route groups
- Design system: Poppins typography, CSS custom properties, Tailwind mapping
- Alpine.js loaded in base template for CMS interactivity
- JWT authentication (access + refresh tokens, httpOnly cookies)
- UUID primary keys across all models
- Service-layer architecture pattern

**AI & Automation (Phase 3+)**
- Ollama local inference integration (default provider)
- LiteLLM multi-provider abstraction layer
- AI Agents: ContentAgent, SEOAgent
- RAG pipeline: document ingestion, chunking, embedding, retrieval
- Vector database support: Qdrant + ChromaDB
- AI Credit system: per-user/tenant credits, usage metering, top-ups
- Celery background AI tasks with Redis broker
- Wagtail AI content editor integration

**Commerce & Monetization (Phase 2+)**
- Digital Downloads marketplace with MinIO delivery
- Stripe integration: Checkout, Subscriptions, Webhooks, Customer Portal
- Subscription plans with feature gating and trial support
- Enterprise billing tier with custom contracts
- API Key management with scopes and rate limits
- Usage metering foundation for billing

**Marketing & Growth (Phase 5+)**
- Lead generation system with scoring and segmentation
- Email Marketing: subscribers, lists, campaigns, templates (Django Anymail)
- Analytics event tracking + page views + funnel analysis
- Curated Directories system with categories and click tracking
- Resource Hub for downloadable assets
- Ad management: placements, campaigns, targeting

**Enterprise & Extensibility (Phase 4+)**
- Multi-tenancy: tenant isolation, subdomain routing, per-tenant settings
- RBAC: roles, permissions, tenant-scoped access control
- SSO foundation: SAML + OIDC placeholders
- White-label branding: per-tenant logo, colors, domain, emails
- Plugin Registry: installable extensions, versioning, dependencies
- Plugin Marketplace: browse, search, ratings, reviews
- Plugin revenue sharing: developer payouts, platform fees
- Audit logging: comprehensive immutable activity trail
- Webhook system: outbound events, retry logic, HMAC signatures

**Frontend (Next.js + React + TypeScript)**
- Marketing pages: Home, AI Tools, Downloads, Resources, Directories, Marketplace, Onboarding
- Auth flow: Login, Register
- Dashboard: Overview, AI Studio, Billing, Enterprise, Plugins, Settings
- UI Components: Button (4 variants, 3 sizes), Modal, Badge — all design-token compliant
- Layout: Header, Footer, MobileNav — responsive, accessible
- Typed API client with TypeScript interfaces

**Infrastructure & DevOps**
- Docker Compose (dev + production overrides)
- GitHub Actions CI workflow
- Nginx reverse proxy configuration
- PostgreSQL 16, Redis 7, MinIO, Qdrant/ChromaDB
- Environment-based configuration (.env.example + production)

---

## [1.0.0] — 2026-06-21

### Added — Initial Phase 4 Completion

- Complete 4-phase development of Maximus platform per original roadmap
- Full-stack architecture (Django + Wagtail + Next.js)
- AI integration with Ollama + RAG + Vector Search
- Plugin Marketplace with reviews and revenue sharing
- Enterprise features (SSO, Audit Logs, RBAC, Multi-tenancy)
- Webhook system and Public API
- Production-ready Docker setup
- Comprehensive documentation

### Changed
- Improved `.gitignore` for cleaner repository

---

## [0.1.0] — 2026-06-15 (Initial Scaffold)

### Added
- Project initialization: Docker, Django, Next.js, Wagtail
- Basic project structure per AI_PROJECT_CONTEXT.md
- Design system tokens (placeholders)
- CI/CD pipeline

---

> **Note:** Versions 0.x and 1.0 represent the original roadmap phases. Version 2.0 reflects the actual implemented codebase which significantly exceeds the original scope (19 apps vs  apps vs 9 planned). See [PROJECT_STATE.md](PROJECT_STATE.md) for complete inventory.