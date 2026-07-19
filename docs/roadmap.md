# Maximus — Development Roadmap

This document outlines the development direction of **Maximus**.

> **Note:** The codebase has significantly exceeded the original 4-phase roadmap. See [PROJECT_STATE.md](PROJECT_STATE.md) for actual implementation status.

---

## ✅ Completed Phases (Actual)

| Phase | Name | Status | Key Deliverables |
|-------|------|--------|------------------|
| **Phase 0** | Project Initialization | ✅ Done | Docker, env, gitignore, project structure |
| **Phase 1** | Foundation | ✅ Done | Django/Wagtail/Next.js, auth, blog, API, design system, CI/CD |
| **Phase 2** | Tools, Commerce & Dashboards | ✅ Done | AI Tools, Downloads, Resources, Subscriptions, Leads, Directories |
| **Phase 3** | AI, Automation & Monetization | ✅ Done | Ollama, LiteLLM, RAG, Vector Search, AI Credits, Agents, Analytics |
| **Phase 4** | Enterprise, Multi-Tenant & Marketplace | ✅ Done | Multi-tenancy, Plugin Registry, White-label, SSO (SAML/OIDC), Audit, Webhooks |

---

## 🔴 Current Priority: Custom Admin Dashboard (New Direction — 2026-06-21)

**Decision:** Replace separate Wagtail Admin (`/cms`) + Django Admin (`/admin`) with **one unified Custom Admin Dashboard** at `/admin/`.

### Phase 5 — Custom Admin Dashboard (IN PROGRESS)

- [ ] **Admin Layout & Navigation** — Sidebar with sections: Dashboard, Content (Wagtail), Commerce, AI Tools, Marketing, Advertising, Analytics, Extensions, Settings
- [ ] **Dashboard Overview** — Key metrics, recent activity, quick actions
- [ ] **Wagtail CMS Integration** — Page tree, content editing within custom UI
- [ ] **Django Model Admin Sections** — All 19 apps accessible via consistent UI
- [ ] **Design System Compliance** — Poppins font, brand colors, tokens, dark mode
- [ ] **Alpine.js Interactivity** — Dropdowns, modals, tabs, toggles
- [ ] **Extension Store Foundation** — Plugin marketplace UI in admin

---

## 🟡 Phase 6 — Production Polish

- [ ] Full Stripe webhook integration (subscription events, invoice handling)
- [ ] Complete email marketing system (Django Anymail + campaign templates + sending)
- [ ] User onboarding flow (wizard, feature discovery, first-value moments)
- [ ] Coolify/Dokploy production deployment guide (detailed, step-by-step)
- [ ] API rate limiting & throttling
- [ ] Comprehensive test coverage (unit, integration, e2e)

---

## 🟢 Phase 7 — AI Enhancements

- [ ] Vector search integration (Qdrant / ChromaDB) — **Partially done in `ai/vector.py`**
- [ ] RAG-based content generation — **Partially done in `ai/rag.py`**
- [ ] AI content editor inside Wagtail — **Partially done in `ai/wagtail_ai.py`**
- [ ] Usage-based AI credit system — **Done in `ai/credit_system.py`**
- [ ] AI workflow builder (no-code, visual)
- [ ] Semantic search across all content

---

## 🔵 Phase 8 — Marketplace & Plugins

- [ ] Full plugin marketplace (browse, install, update, review)
- [ ] Plugin installation from admin (one-click)
- [ ] Revenue sharing for plugin developers — **Foundation in `plugins/revenue.py`**
- [ ] Plugin review & rating system — **Models exist in `plugins/models.py`**
- [ ] Plugin SDK improvements & examples

---

## 🟣 Phase 9 — Advanced Enterprise

- [ ] Full SAML + OIDC SSO — **Placeholders in `tenants/sso.py`**
- [ ] Comprehensive audit logs — **Models in `audit/models.py`**
- [ ] RBAC expansion (fine-grained permissions) — **Foundation in `tenants/rbac.py`**
- [ ] Custom domain + white-label automation — **Models in `tenants/models.py`**
- [ ] SLA monitoring & alerting

---

## 🟠 Phase 10 — Mobile, Integrations & Public API

- [ ] Mobile-responsive dashboard improvements
- [ ] Zapier / Make.com integration
- [ ] Webhook system — **Done in `webhooks/` app**
- [ ] Public API documentation (OpenAPI/Swagger) — **Basic in `docs/api.md`**
- [ ] API versioning strategy

---

## 🌟 Long-term Vision

- Multi-language support (i18n)
- Team collaboration features (comments, mentions, sharing)
- AI workflow builder (no-code, visual)
- Native mobile apps (React Native / Tauri)
- Federated multi-instance deployment

---

## Version History

| Version | Date | Notes |
|---------|------|-------|
| **2.0** | 2026-07-02 | Major update: reflects actual 19-app codebase, new admin dashboard priority |
| **1.0** | 2026-06-21 | Original 4-phase roadmap |

---

> **Last Updated:** 2026-07-02  
> **Current Focus:** Custom Admin Dashboard (Phase 5)  
> **Source of Truth:** [PROJECT_STATE.md](PROJECT_STATE.md) — codebase is authoritative