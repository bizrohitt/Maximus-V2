# Maximus

**Maximus** is a modern, self-hosted **CMS + SaaS + SEO Tools Ecosystem Platform** — production-ready and significantly beyond MVP.

It combines the power of content management, AI tools, digital commerce, enterprise features, and extensibility into one clean, scalable platform.

---

## ✨ Key Features

| Category | Features |
|----------|----------|
| **CMS & Content** | Wagtail 6 SEO-first blog, custom blocks, media management, scheduling, revisions |
| **AI & Automation** | Ollama (local), LiteLLM (multi-provider), RAG, Vector Search (Qdrant/Chroma), AI Agents, Credit System |
| **Tools & Utilities** | Extensible AI tool registry, usage tracking, history, streaming responses |
| **Commerce** | Digital Downloads marketplace, Stripe subscriptions, API keys, usage metering, enterprise billing |
| **Marketing & Growth** | Lead generation, email campaigns (Anymail), directories, resource hub, ad management |
| **Enterprise** | Multi-tenancy, RBAC, SSO (SAML/OIDC), white-label, audit logs, webhooks |
| **Extensibility** | Plugin marketplace, revenue sharing, plugin SDK |
| **Analytics** | Event tracking, page views, funnels, real-time dashboards |

---

## 🛠 Tech Stack

| Layer | Technology |
|-------|------------|
| **Frontend** | Next.js 14 (App Router) + React 18 + TypeScript 5 + TailwindCSS 3 |
| **Backend** | Django 5 + Wagtail 6 + Django REST Framework 3 |
| **Database** | PostgreSQL 16 + Redis 7 |
| **AI** | Ollama (default) + LiteLLM + LangChain/Haystack + Qdrant/ChromaDB |
| **Storage** | MinIO (S3-compatible) |
| **Search** | Meilisearch (full-text) + Qdrant (vector) |
| **Tasks** | Celery 5 (Redis broker) |
| **Deployment** | Docker + Nginx + Coolify/Dokploy (self-hosted) |
| **Monitoring** | Grafana + Prometheus |
| **CI/CD** | GitHub Actions |

---

## 🚀 Getting Started

### 1. Clone the repository
```bash
git clone https://github.com/yourusername/maximus.git
cd maximus
```

### 2. Environment Setup
```bash
cp .env.example .env
# Edit .env with your values
```

### 3. Start with Docker
```bash
docker-compose up --build
```

### Access Points
| Service | URL |
|---------|-----|
| **Frontend (Next.js)** | http://localhost:3000 |
| **Django Admin (Legacy)** | http://localhost:8000/admin |
| **Wagtail CMS (Legacy)** | http://localhost:8000/cms |
| **Custom Admin Dashboard** | http://localhost:8000/admin/ *(In Development)* |
| **MinIO Console** | http://localhost:9001 |
| **Meilisearch** | http://localhost:7700 |
| **Qdrant** | http://localhost:6333 |

> **Note:** The legacy `/admin` (Django) and `/cms` (Wagtail) will be replaced by the **unified Custom Admin Dashboard** at `/admin/` (Phase 5).

---

## 📁 Project Structure

```
Maximus/
├── AI_PROJECT_CONTEXT.md      # AI brain — read this first!
├── PROJECT_STATE.md           # Current implementation status
├── CHANGELOG.md               # Version history
├── CONTRIBUTING.md            # Contribution guidelines
├── SECURITY.md                # Security policy
├── docker-compose.yml         # Development environment
├── docker-compose.prod.yml    # Production overrides
├── .env.example               # Environment template
├── .env.production.example    # Production template
├── .gitignore
├── README.md
├── LICENSE
│
├── backend/                   # Django + Wagtail (19 apps)
│   ├── config/                # Settings, URLs
│   ├── apps/
│   │   ├── core/              # BaseModel, admin dashboard
│   │   ├── users/             # Auth, RBAC
│   │   ├── blog/              # Wagtail blog
│   │   ├── api/               # DRF v1
│   │   ├── tools/             # AI tools
│   │   ├── downloads/         # Marketplace + Stripe
│   │   ├── resources/         # Resource hub
│   │   ├── subscriptions/     # Billing + API keys
│   │   ├── leads/             # Lead generation
│   │   ├── analytics/         # Event tracking
│   │   ├── ai/                # Ollama, RAG, Agents, Credits
│   │   ├── directories/       # Curated directories
│   │   ├── marketing/         # Email campaigns
│   │   ├── ads/               # Ad management
│   │   ├── plugins/           # Marketplace + revenue
│   │   ├── tenants/           # Multi-tenancy + SSO
│   │   ├── audit/             # Audit logging
│   │   └── webhooks/          # Outbound webhooks
│   ├── tasks/                 # Celery tasks
│   └── requirements.txt
│
├── frontend/                  # Next.js 14 App Router
│   ├── app/
│   │   ├── (marketing)/       # Public pages
│   │   ├── (auth)/            # Login, register
│   │   └── (dashboard)/       # User dashboard
│   ├── components/
│   │   ├── ui/                # Button, Modal, Badge
│   │   └── layout/            # Header, Footer, MobileNav
│   ├── lib/api/               # Typed API client
│   ├── types/                 # TypeScript interfaces
│   └── styles/globals.css          # Design tokens
│── tailwind.config.ts        # Token mapping
│
├── templates/                 # Wagtail + Alpine.js
│   ├── base.html              # Alpine.js CDN loaded
│   ├── blog/                  # Blog templates
│   └── emails/                # Campaign template
│
├── nginx/                     # Reverse proxy config
├── .github/workflows/         # CI/CD
└── docs/                      # Documentation
    ├── ARCHITECTURE.md        # System architecture
    ├── api.md                 # Public API documentation
    ├── design-system.md       # Design system specifications
    ├── plugin-sdk.md          # Plugin development guide
    ├── deployment.md          # Production deployment guide
    ├── features.md            # Complete feature inventory
    ├── roadmap.md             # Development roadmap
    ├── admin-features.md      # Admin features summary
    └── project-state.md       # Current implementation status
```

---

## 📚 Documentation

| Document | Description |
|----------|-------------|
| [AI_PROJECT_CONTEXT.md](AI_PROJECT_CONTEXT.md) | **Start here** — AI brain with phase checklists |
| [PROJECT_STATE.md](PROJECT_STATE.md) | Current implementation status (19 apps) |
| [CHANGELOG.md](CHANGELOG.md) | Version history |
| [CONTRIBUTING.md](CONTRIBUTING.md) | Contribution guidelines |
| [SECURITY.md](SECURITY.md) | Security policy |
| [docs/ARCHITECTURE.md](docs/ARCHITECTURE.md) | System architecture |
| [docs/api.md](docs/api.md) | Public API documentation |
| [docs/design-system.md](docs/design-system.md) | Design system specifications |
| [docs/plugin-sdk.md](docs/plugin-sdk.md) | Plugin development guide |
| [docs/deployment.md](docs/deployment.md) | Production deployment guide |
| [docs/features.md](docs/features.md) | Complete feature inventory |
| [docs/roadmap.md](docs/roadmap.md) | Development roadmap |
| [docs/admin-features.md](docs/admin-features.md) | Admin features summary |

---

## 🎨 Design System

- **Philosophy**: Clean & Minimal (Linear/Notion/Vercel aesthetic)
- **Typography**: Poppins (primary), JetBrains Mono (code)
- **Colors**: White primary / Deep Red-Orange (#B5300A) secondary / Vibrant Green (#3ECF8E) accent
- **Tokens**: CSS custom properties in `globals.css`, mapped in `tailwind.config.ts`
- **Dark Mode**: Full support via `.dark` class
- **Responsive**: Mobile-first, 8pt grid, 12-column layout

---

## 🔐 Security & Compliance

- JWT auth (15min access + 7d refresh httpOnly cookie)
- Rate limiting (per-user + Nginx)
- Audit logging (immutable)
- Webhook HMAC signatures
- Environment-based secrets
- CORS explicit origins
- SQL injection prevention (Django ORM)
- CSRF protection

---

## 📦 19 Django Apps — Complete

| Phase | Apps |
|-------|------|
| **1** | core, users, blog, api |
| **2** | tools, downloads, resources, subscriptions, leads, directories, marketing, ads |
| **3** | ai, analytics |
| **4** | tenants, plugins, audit, webhooks |

---

## 🎯 Current Focus: Custom Admin Dashboard

**Decision (2026-06-21):** Replace separate Wagtail Admin (`/cms`) + Django Admin (`/admin`) with **one unified Custom Admin Dashboard** at `/admin/`.

- WordPress-like experience
- Combines Wagtail + Django Admin + all custom features
- Consistent design system (Poppins, brand tokens, dark mode)
- Foundation for future **Extension Store**

---

## 🤝 Contributing

Please read [CONTRIBUTING.md](CONTRIBUTING.md) before submitting pull requests.

---

## 📄 License

MIT License — Self-hosted friendly. See [LICENSE](LICENSE).

---

## 🙏 Acknowledgments

Built for creators, marketers, and SaaS founders who want full control over their platform.

**Inspired by:** HubSpot, Ahrefs, Notion, Webflow, SEMrush, Neil Patel Tools

---

> **Version:** 2.0 (19-app architecture)  
> **Last Updated:** 2026-07-02  
> **Status:** Phase 4+ Complete → Phase 5 (Custom Admin Dashboard) In Progress