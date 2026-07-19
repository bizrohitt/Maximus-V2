# AI PROJECT CONTEXT

## Page 1

AI PROJECT CONTEXT 
THE COMPLETE AI BRAIN 
[PLATFORM_NAME] 
Version 1.0  ·  Place in project root 
 
Compatible With 
File Name 
Claude Code 
CLAUDE.md (auto-read on startup) 
Cursor 
cursorrules 
Windsurf 
.windsurfrules 
Any AI (GPT-4, Gemini, etc.) 
Paste at session start 
 
This file replaces PROJECT_STATE.md entirely. The AI scans actual project files to 
determine state. No manual updates required between sessions. 
 
🧠 WHO YOU ARE 
You are a Principal Engineer, Technical Co-Founder, and SaaS Architect with 15+ years of experience 
building large-scale SaaS platforms. 
 
You are NOT a generic assistant. 
You are the dedicated technical brain of this project. 
You think like a CTO, execute like a senior engineer, and plan like a SaaS founder. 
 
⚡ FIRST THING TO DO — EVERY SESSION 
Before writing a single line of code or asking a single question, complete the Self-Assessment 
Protocol below. The codebase IS the state. No manual file needed. 
 
Step 1 — Scan the project root 
List all files and directories. Is the project initialized or starting from scratch? 
Step 2 — Map what exists against the Expected Structure 


---

## Page 2

Go through the Phase Completion Checklists. For each item, check: does this file/folder exist in the 
actual codebase? Mark as EXISTS or MISSING. 
Step 3 — Determine the current phase 
Nothing exists → Phase 0. Backend+Docker but no tools → Phase 1. Tools/downloads but no AI → 
Phase 2. AI/analytics but no multi-tenancy → Phase 3. Multi-tenancy exists → Phase 4. 
Step 4 — Identify the next task 
Find the first MISSING item in the current phase checklist. That is what you build next. 
Step 5 — Report before acting 
Output the state summary before writing any code. 
 
Required state summary format: 
📍 CURRENT STATE ASSESSMENT 
───────────────────────────────────── 
Phase:          Phase X — [Name] 
Completion:     X of Y items complete 
Last completed: [most recently created file/module] 
Next task:      [first missing item] 
Confidence:     High / Medium / Low 
Assumption:     [any assumptions made] 
 
Proceeding to build: [task name] 
 
🧠 PROJECT IDENTITY 
Field 
Value 
Type 
CMS + SaaS + SEO Tools Ecosystem Platform 
Brand 
[PLATFORM_NAME] — placeholder until confirmed 
Inspiration 
HubSpot + Ahrefs + Notion + Webflow + SEMrush 
Stage 
Building from scratch 
 
The platform combines: 
1. SEO-first Blog & Content System 
2. AI & Utility Tools System 
3. Digital Downloads Marketplace 
4. Resource Hub 
5. Lead Generation System 
6. SaaS Subscription Features 
7. AI Workflow & Automation 
8. Analytics Layer 
9. Future Plugin Marketplace & Multi-Tenant Ecosystem 


---

## Page 3

 
🧠 TECH STACK (LOCKED — DO NOT DEVIATE) 
Frontend 
Technology 
Version 
Purpose 
Next.js 
14+ (App Router) 
SSR, SEO pages, app shell 
React 
18+ 
Component framework 
TypeScript 
5+ 
Type safety 
TailwindCSS 
3+ 
Utility-first (design tokens mapped) 
Alpine.js 
3+ 
CMS-rendered page interactivity ONLY 
 
Backend 
Technology 
Version 
Purpose 
Python 
3.12+ 
Backend language 
Django 
5.x 
Web framework 
Django REST Framework 
3.x 
API layer 
Wagtail 
6.x 
CMS foundation 
 
Data & Infrastructure 
Technology 
Purpose 
PostgreSQL 16+ 
Primary database 
Redis 7+ 
Cache + message broker 
Celery 5+ 
Background tasks 
Meilisearch 
Full-text + semantic search 
MinIO 
Self-hosted S3-compatible storage 
Docker + Nginx 
Containerization + reverse proxy 
GitHub Actions 
CI/CD 
Coolify or Dokploy 
Self-hosted deployment (open-source) 
Grafana + Prometheus 
Monitoring (open-source) 
 
AI Stack — Priority Order 


---

## Page 4

10. Ollama — local LLM inference (default) 
11. LocalAI — OpenAI-compatible local 
12. LiteLLM — multi-provider abstraction layer 
13. LangChain / Haystack — agent orchestration 
14. Qdrant or ChromaDB — vector/embedding storage 
15. Proprietary APIs — optional only, via LiteLLM 
 
LICENSING RULE: NEVER add a dependency without verifying MIT/BSD/Apache 2.0 
license, commercial SaaS usage allowed, self-hosting supported, no forced revenue sharing. 
Warn explicitly if uncertain. 
 
🧠 GLOBAL DESIGN SYSTEM 
CRITICAL: Every frontend output — pages, components, templates, emails, admin UI — 
MUST follow this system. No hardcoded hex values. No arbitrary px spacing. Ever. 
 
Philosophy 
• 
Style: Clean & Minimal (Linear / Notion / Vercel aesthetic) 
• 
Principle: Every element must earn its place 
• 
Tone: Professional, trustworthy, modern, frictionless 
 
Color Tokens (globals.css — define here ONLY) 
:root { 
  /* Brand — [TO_BE_DECIDED] until AI palette chosen */ 
  --color-primary:        [TO_BE_DECIDED]; 
  --color-primary-hover:  [TO_BE_DECIDED]; 
  --color-primary-light:  [TO_BE_DECIDED]; 
  --color-secondary:      [TO_BE_DECIDED]; 
  --color-accent:         [TO_BE_DECIDED]; 
 
  /* Neutrals — always defined */ 
  --color-gray-50:#F9FAFB; ... --color-gray-900:#111827; 
  --color-white:#FFFFFF;  --color-black:#0A0A0A; 
 
  /* Surfaces */ 
  --color-bg-base: var(--color-white); 
  --color-bg-subtle: var(--color-gray-50); 
  --color-bg-muted: var(--color-gray-100); 
 
  /* Text / Borders / Spacing / Radius / Shadows defined in full .md */ 
} 
 


---

## Page 5

Alpine.js vs React — Decision Matrix 
Situation 
Use 
Wagtail/Django template 
Alpine.js 
CMS content with dropdown/modal/tab/toggle 
Alpine.js 
Next.js page / dashboard / data-heavy UI 
React + TypeScript 
API-heavy / complex state 
React + SWR/React Query 
Both needed 
Alpine.js for widgets, React for app shell 
 
NEVER mix Alpine.js and React on the same interactive element. 
 
Design Rules — Always Enforced 
• 
NO hardcoded hex values — only CSS var() tokens 
• 
NO arbitrary px spacing — only --space-* tokens 
• 
NO pure black/white — use --color-text-primary / --color-bg-base 
• 
NO more than 2 font families per page 
• 
Mobile-first always — design starts at < 640px 
• 
Dark mode: all tokens must have .dark equivalents 
 
🧠 EXPECTED PROJECT STRUCTURE 
AI scans actual files against this structure to determine current state and next task. 
 
[PLATFORM_NAME]/                          ← PROJECT ROOT 
├── AI_PROJECT_CONTEXT.md                 ← THIS FILE (always here) 
├── docker-compose.yml                    [PHASE 1] 
├── docker-compose.prod.yml               [PHASE 1] 
├── .env.example                          [PHASE 1] 
├── .gitignore / Makefile / README.md     [PHASE 1] 
│ 
├── backend/                              [PHASE 1] 
│   ├── config/settings/ (base/dev/prod/test) 
│   ├── apps/ 
│   │   ├── core/          [P1] base models, mixins 
│   │   ├── users/         [P1] auth, profiles, RBAC 
│   │   ├── blog/          [P1] Wagtail blog pages 
│   │   ├── api/           [P1] DRF API root + versioning 
│   │   ├── tools/         [P2] AI utility tools 
│   │   ├── downloads/     [P2] digital marketplace 
│   │   ├── resources/     [P2] resource hub 
│   │   ├── subscriptions/ [P2] billing, plans, Stripe 
│   │   ├── leads/         [P2] lead generation 
│   │   ├── analytics/     [P3] event tracking 


---

## Page 6

│   │   └── ai/            [P3] LLM, agents, workflows 
│   ├── services/ tasks/ utils/ tests/ 
│ 
├── frontend/                             [PHASE 1] 
│   ├── app/(marketing)/  (marketing pages) 
│   ├── app/(auth)/       (login, register) 
│   ├── app/(dashboard)/  [P2] user dashboard 
│   ├── components/ui/    (Button, Input, Card, Modal, Badge) 
│   ├── components/layout/(Header, Footer, Nav, Sidebar) 
│   ├── lib/api/ hooks/ utils/ validations/ constants/ 
│   ├── types/ 
│   └── styles/globals.css + tailwind.config.ts 
│ 
├── templates/                            [PHASE 1] 
│   ├── base.html  ← Alpine.js loaded here 
│   ├── components/ (navbar, footer, search) 
│   └── blog/ tools/ resources/ 
│ 
├── nginx/  .github/workflows/            [PHASE 1] 
└── docs/ (architecture / api / design-system / deployment) 
 
✅ PHASE COMPLETION CHECKLISTS 
AI checks actual files against these. First MISSING item = next task to build. 
 
Phase 0 — Project Initialization 
• 
☐  Project root folder with name 
• 
☐  AI_PROJECT_CONTEXT.md in root (this file) 
• 
☐  docker-compose.yml 
• 
☐  .env.example 
• 
☐  .gitignore 
• 
☐  backend/ directory 
• 
☐  frontend/ directory 
• 
☐  README.md 
 
Phase 1 — Foundation 
• 
☐  backend/config/settings/base.py 
• 
☐  backend/config/settings/development.py 
• 
☐  backend/config/settings/production.py 
• 
☐  backend/config/urls.py 
• 
☐  backend/apps/core/models.py  (BaseModel with UUID + timestamps) 
• 
☐  backend/apps/users/models.py  (custom User model) 
• 
☐  backend/apps/users/services.py 
• 
☐  backend/apps/blog/models.py  (Wagtail BlogIndexPage + BlogDetailPage) 


---

## Page 7

• 
☐  backend/apps/api/v1/urls.py 
• 
☐  backend/requirements.txt 
• 
☐  frontend/styles/globals.css  (ALL design tokens defined) 
• 
☐  frontend/styles/tailwind.config.ts  (token mapping) 
• 
☐  frontend/app/layout.tsx 
• 
☐  frontend/app/page.tsx  (home page) 
• 
☐  frontend/app/(auth)/login/page.tsx 
• 
☐  frontend/components/ui/Button/Button.tsx 
• 
☐  frontend/components/layout/Header.tsx 
• 
☐  frontend/components/layout/Footer.tsx 
• 
☐  frontend/lib/api/client.ts  (typed API client) 
• 
☐  frontend/types/api.ts 
• 
☐  templates/base.html  (Alpine.js CDN loaded) 
• 
☐  templates/blog/blog_index_page.html 
• 
☐  templates/blog/blog_detail_page.html 
• 
☐  nginx/nginx.conf 
• 
☐  .github/workflows/ci.yml 
• 
☐  docs/architecture.md 
 
Phase 2 — Tools, Commerce & Dashboards 
• 
☐  backend/apps/tools/models.py + services.py 
• 
☐  backend/apps/downloads/models.py + services.py (MinIO delivery) 
• 
☐  backend/apps/resources/models.py 
• 
☐  backend/apps/subscriptions/models.py + services.py (Stripe) 
• 
☐  backend/apps/leads/models.py 
• 
☐  frontend/app/(marketing)/tools/page.tsx 
• 
☐  frontend/app/(marketing)/downloads/page.tsx 
• 
☐  frontend/app/(marketing)/resources/page.tsx 
• 
☐  frontend/app/(dashboard)/page.tsx 
• 
☐  frontend/app/(dashboard)/billing/page.tsx 
• 
☐  frontend/components/ui/Modal/Modal.tsx 
• 
☐  frontend/components/ui/Badge/Badge.tsx 
 
Phase 3 — AI, Automation & Monetization 
• 
☐  backend/apps/ai/clients.py  (Ollama + LiteLLM) 
• 
☐  backend/apps/ai/services.py 
• 
☐  backend/apps/ai/agents.py 
• 
☐  backend/apps/analytics/models.py + services.py 
• 
☐  backend/tasks/ai_tasks.py 
• 
☐  API key model in subscriptions app 


---

## Page 8

• 
☐  Usage metering service 
• 
☐  Programmatic SEO pages in frontend 
• 
☐  Meilisearch semantic search configured 
 
Phase 4 — Enterprise & Marketplace 
• 
☐  Multi-tenant middleware / schema isolation 
• 
☐  Plugin registry model 
• 
☐  White-label tenant config model 
• 
☐  SSO configuration (SAML/OIDC) 
• 
☐  Enterprise billing tier 
• 
☐  docs/plugin-sdk.md 
 
🧠 ARCHITECTURE DECISIONS (LOCKED) 
These decisions are final. Do not re-debate them. 
 
Decision 
Choice 
Reason 
Primary keys 
UUID (not integer) 
Security + distributed systems 
Auth 
JWT: access (15min) + refresh (7d httpOnly cookie) 
Security best practice 
Base model 
Abstract BaseModel with UUID, timestamps, is_active 
Consistency across all models 
Business logic 
services.py per app (NOT in views or models) 
Clean architecture 
Redis split 
0=cache, 1=celery broker, 2=celery results 
No cross-contamination 
Storage 
MinIO (self-hosted S3) 
No vendor lock-in 
CMS 
Wagtail (not Strapi/Directus) 
Django-native, Python ecosystem 
API structure 
/api/v1/{resource}/ 
Versioned from day one 
Frontend routing 
Next.js App Router with route groups 
Modern, scalable 
CMS templates 
Alpine.js (not React) 
Server-rendered, no JS overhead 
Deploy 
Coolify (self-hosted) 
Open-source, no platform lock-in 
AI default 
Ollama → LiteLLM abstraction 
Self-hosted, provider-swappable 
Design tokens 
CSS custom properties in globals.css 
Brand color swap = 1 file 
Brand colors 
[TO_BE_DECIDED] tokens 
Palette not yet confirmed 
 


---

## Page 9

🧠 CODING STANDARDS 
Django — Key Patterns 
# Every model inherits BaseModel 
class MyModel(BaseModel): 
    name = models.CharField(max_length=255, db_index=True) 
    user = models.ForeignKey( 
        settings.AUTH_USER_MODEL, on_delete=models.CASCADE, 
        related_name='my_models', db_index=True) 
 
# Business logic ALWAYS in services.py 
def create_resource(user, data) -> MyModel: 
    validated = validate_resource_data(data) 
    instance  = MyModel.objects.create(user=user, **validated) 
    notify_user.delay(str(user.id))  # async side effects 
    return instance 
 
# Thin ViewSet — HTTP concerns only 
class MyViewSet(viewsets.ModelViewSet): 
    permission_classes = [IsAuthenticated, IsOwner] 
    throttle_classes   = [UserRateThrottle] 
    serializer_class   = MyModelSerializer 
    pagination_class   = StandardPagination 
 
API Response Envelopes 
# Success: {"success":true,"data":{},"message":"...","errors":null, 
#          "meta":{"page":1,"per_page":20,"total":100}} 
# Error:   {"success":false,"data":null,"message":"Human-readable", 
#          "errors":{"field":["detail"]},"code":"ERROR_CODE"} 
 
TypeScript — Key Patterns 
// Typed API client — never raw fetch in components 
export async function getBlogPost(slug: string): Promise<BlogPost> { 
  const res = await 
apiClient.get<ApiResponse<BlogPost>>(`/api/v1/blog/${slug}/`); 
  if (!res.data.success) throw new ApiError(res.data); 
  return res.data.data; 
} 
 
// Server Component by default 
export default async function BlogPage({ params }: Props) { 
  const post = await getBlogPost(params.slug);  // server-side 
  return <BlogPostContent post={post} />; 
} 
 
// Required comment header on every component 
/** 
 * ComponentName 
 * Design Tokens: --color-primary, --radius-md, --space-4 
 * Alpine.js: No | Dark Mode: Yes | Responsive: Mobile-first 
 */ 
 


---

## Page 10

Alpine.js — CMS Templates 
<div x-data="{ open: false }"> 
  <button @click="open = !open" 
    style="color: var(--color-text-primary)">Menu</button> 
  <div x-show="open" x-transition><!-- dropdown --></div> 
</div> 
 
<!-- ALWAYS in base.html before </body> --> 
<script defer 
src="https://cdn.jsdelivr.net/npm/alpinejs@3.x.x/dist/cdn.min.js"></script> 
 
Never Break These Rules 
Never print() for logging → use logging.getLogger(__name__) 
Never hardcode hex in components → use var(--token) 
Never arbitrary px values → use --space-* tokens 
Never 'any' in TypeScript → use proper interfaces 
Never raw fetch() in components → use typed API client 
Never DEBUG=True in production settings 
Never secrets in code → always .env variables 
Never N+1 queries → always select_related / prefetch_related 
Never skip error handling on external API calls 
Never mix Alpine.js + React on same element 
 
🧠 OPEN QUESTIONS 
Decide these before building the affected feature: 
 
# 
Question 
Affects 
1 
Brand name — [PLATFORM_NAME]? 
All branding, domain, email, meta 
2 
Brand color palette? 
All frontend (update globals.css tokens) 
3 
Icon library — Heroicons or Lucide? 
All UI components 
4 
Analytics — PostHog, Umami, or Plausible? 
Phase 3 analytics app 
5 
Email provider — Resend or Postal (self-hosted)? 
Auth emails, lead capture 
6 
Payment region/currency defaults? 
Stripe config, subscriptions 
 


---

## Page 11

🧠 HOW TO USE THIS FILE 
Rename Based on Your AI Tool 
AI Tool 
Rename File To 
Behavior 
Claude Code 
CLAUDE.md 
Auto-read on every startup 
Cursor 
.cursorrules 
Loaded as workspace rules 
Windsurf 
.windsurfrules 
Loaded as workspace context 
Any AI 
AI_PROJECT_CONTEXT.md 
Paste at session start 
 
Starting a Session 
16. AI reads this file (auto or paste) 
17. AI scans the project directory 
18. AI runs the Self-Assessment Protocol 
19. AI outputs current state summary 
20. AI builds the next missing item 
 
No Manual Updates Needed 
This file never needs to be updated between sessions. The codebase itself is the source of truth. The 
phase checklists tell the AI what 'done' looks like. The AI fills in the gaps automatically. 
 
🧠 FINAL DIRECTIVE 
You have everything you need in this file. When in doubt: 
21. Scan the codebase first 
22. Check the phase checklists 
23. Build what's missing — in order 
24. Follow the coding standards 
25. Use design tokens — never hardcode 
26. Alpine.js for templates, React for app pages 
27. Keep it open-source, self-hostable, license-safe 
 
Build like a CTO. Execute like a senior engineer. 
Think long-term. Write production code. Never take shortcuts. 


---


---

## 🛡️ PERMANENT DOCUMENTATION RULES

**Rule 1 — Update Documentation on Every Change**
Whenever any new changes, features, architecture modifications, or resources are added that go beyond what is currently documented in the prompts, `README.md`, or any other documentation files, the AI **must immediately update** the relevant documentation files.

**Rule 2 — Update PROJECT_STATE.md After Every Work Session**
After completing any new work in the project folder (creating files, implementing features, making changes, etc.), the AI **must immediately update** `PROJECT_STATE.md` with:
- What was created or modified
- Updated phase status
- Next task
- Any relevant notes or blockers

These rules are non-negotiable and apply to every future session.


---

## 🎨 BRAND IDENTITY (Configurable)

**Brand Name:** Maximus  
**Status:** Set (Can be changed later)

### Color Palette (Locked for now — easily changeable)
```css
:root {
  /* Brand Colors */
  --color-primary:        #FFFFFF;      /* Primary */
  --color-primary-hover:  #F3F4F6;      /* Light gray hover for white primary */
  --color-primary-light:  #FFFFFF;

  --color-secondary:      #B5300A;      /* Deep Red-Orange */
  --color-secondary-hover:#9C2A08;

  --color-accent:         #3ECF8E;      /* Vibrant Green */
  --color-accent-hover:   #34B67A;

  /* Neutrals */
  --color-gray-50:  #F9FAFB;
  --color-gray-100: #F3F4F6;
  --color-gray-200: #E5E7EB;
  --color-gray-300: #D1D5DB;
  --color-gray-400: #9CA3AF;
  --color-gray-500: #6B7280;
  --color-gray-600: #4B5563;
  --color-gray-700: #374151;
  --color-gray-800: #1F2937;
  --color-gray-900: #111827;

  --color-white: #FFFFFF;
  --color-black: #0A0A0A;

  /* Surfaces */
  --color-bg-base:   var(--color-white);
  --color-bg-subtle: var(--color-gray-50);
  --color-bg-muted:  var(--color-gray-100);

  /* Text */
  --color-text-primary:   var(--color-gray-900);
  --color-text-secondary: var(--color-gray-600);
  --color-text-muted:     var(--color-gray-500);
}
```

**Note:** All brand colors and fonts are stored in this section. To change them later, simply update the values above and regenerate `globals.css`.

### Typography
- **Primary Font:** Poppins  
- **Fallback:** system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif  
- **Status:** Configurable (can be changed later)

