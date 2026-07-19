# Maximus Public API Documentation

## Base URL
```
https://api.maximus.dev/v1
```

## Authentication
All requests require an API Key in the header:

```
Authorization: Bearer YOUR_API_KEY
```

API Keys are managed in the dashboard under **Settings → API Keys**. Keys can be scoped to specific resources and rate limits.

---

## Response Format

### Success
```json
{
  "success": true,
  "data": {},
  "message": "Operation completed successfully",
  "errors": null,
  "meta": {
    "page": 1,
    "per_page": 20,
    "total": 100
  }
}
```

### Error
```json
{
  "success": false,
  "data": null,
  "message": "Human-readable error description",
  "errors": {
    "field_name": ["Specific validation error"]
  },
  "code": "ERROR_CODE"
}
```

---

## Rate Limits
| Tier | Requests/Hour | Burst |
|------|---------------|-------|
| Free | 100 | 20 |
| Pro | 10,000 | 500 |
| Enterprise | Custom | Custom |

Rate limit headers: `X-RateLimit-Limit`, `X-RateLimit-Remaining`, `X-RateLimit-Reset`

---

## Endpoints

### 🤖 AI Tools
| Method | Endpoint | Description |
|--------|----------|-------------|
| `GET` | `/tools/` | List all available AI tools |
| `GET` | `/tools/{slug}/` | Get tool details (params, examples) |
| `POST` | `/tools/{slug}/run/` | Execute an AI tool |
| `POST` | `/tools/{slug}/run/stream/` | Execute with streaming response |
| `GET` | `/tools/usage/history/` | Get user's tool usage history |
| `GET` | `/tools/credits/balance/` | Get AI credit balance |

### 📦 Digital Downloads
| Method | Endpoint | Description |
|--------|----------|-------------|
| `GET` | `/downloads/` | List digital products (paginated, filterable) |
| `GET` | `/downloads/{slug}/` | Get product details |
| `POST` | `/downloads/{slug}/purchase/` | Create Stripe Checkout session |
| `GET` | `/downloads/{slug}/download/` | Get signed download URL (post-purchase) |
| `GET` | `/downloads/purchases/` | List user's purchases |
| `GET` | `/downloads/licenses/` | List user's license keys |

### 📚 Resources
| Method | Endpoint | Description |
|--------|----------|-------------|
| `GET` | `/resources/` | List resources (paginated, filterable) |
| `GET` | `/resources/{slug}/` | Get resource details |
| `GET` | `/resources/categories/` | List resource categories |

### 📂 Directories
| Method | Endpoint | Description |
|--------|----------|-------------|
| `GET` | `/directories/` | List directory entries |
| `GET` | `/directories/{slug}/` | Get entry details |
| `POST` | `/directories/{slug}/click/` | Track outbound click |
| `GET` | `/directories/categories/` | List categories |

### 📊 Analytics
| Method | Endpoint | Description |
|--------|----------|-------------|
| `POST` | `/analytics/track/` | Track custom event |
| `POST` | `/analytics/pageview/` | Track page view |
| `GET` | `/analytics/events/` | Query events (authenticated) |
| `GET` | `/analytics/funnel/` | Get funnel analysis |

### 🔑 Subscriptions & Billing
| Method | Endpoint | Description |
|--------|----------|-------------|
| `GET` | `/subscriptions/plans/` | List available plans |
| `GET` | `/subscriptions/current/` | Get current subscription |
| `POST` | `/subscriptions/checkout/` | Create Stripe Checkout for plan |
| `POST` | `/subscriptions/portal/` | Create Stripe Billing Portal session |
| `GET` | `/subscriptions/usage/` | Get current usage vs limits |
| `GET` | `/subscriptions/api-keys/` | List API keys |
| `POST` | `/subscriptions/api-keys/` | Create new API key |
| `DELETE` | `/subscriptions/api-keys/{id}/` | Revoke API key |

### 🎯 Leads
| Method | Endpoint | Description |
|--------|----------|-------------|
| `POST` | `/leads/capture/` | Capture lead (public endpoint) |
| `GET` | `/leads/` | List leads (authenticated) |
| `GET` | `/leads/{id}/` | Get lead details |
| `PATCH` | `/leads/{id}/` | Update lead (score, tags, status) |

### 📧 Marketing
| Method | Endpoint | Description |
|--------|----------|-------------|
| `POST` | `/marketing/subscribe/` | Subscribe email (public) |
| `POST` | `/marketing/unsubscribe/` | Unsubscribe (public) |
| `GET` | `/marketing/campaigns/` | List campaigns |
| `GET` | `/marketing/campaigns/{id}/` | Get campaign details |

### 🔌 Plugins
| Method | Endpoint | Description |
|--------|----------|-------------|
| `GET` | `/plugins/` | Browse marketplace (paginated, searchable) |
| `GET` | `/plugins/{slug}/` | Get plugin details |
| `POST` | `/plugins/{slug}/install/` | Install plugin (tenant-scoped) |
| `DELETE` | `/plugins/{slug}/uninstall/` | Uninstall plugin |
| `GET` | `/plugins/installed/` | List installed plugins |

### 🏢 Tenants (Enterprise)
| Method | Endpoint | Description |
|--------|----------|-------------|
| `GET` | `/tenants/current/` | Get current tenant info |
| `GET` | `/tenants/users/` | List tenant users |
| `POST` | `/tenants/users/invite/` | Invite user to tenant |
| `PATCH` | `/tenants/users/{id}/` | Update user role |
| `GET` | `/tenants/branding/` | Get white-label config |
| `PATCH` | `/tenants/branding/` | Update white-label config |

### 🪝 Webhooks
| Method | Endpoint | Description |
|--------|----------|-------------|
| `POST` | `/webhooks/` | Register webhook endpoint |
| `GET` | `/webhooks/` | List registered webhooks |
| `DELETE` | `/webhooks/{id}/` | Delete webhook |
| `POST` | `/webhooks/{id}/test/` | Send test payload |

---

## Webhook Events
Your registered endpoints will receive these events:

| Event | Description | Payload |
|-------|-------------|---------|
| `user.created` | New user registered | `{user_id, email, tenant_id}` |
| `user.updated` | User profile changed | `{user_id, changes}` |
| `subscription.created` | New subscription started | `{subscription_id, plan, status}` |
| `subscription.updated` | Subscription changed | `{subscription_id, changes}` |
| `subscription.cancelled` | Subscription cancelled | `{subscription_id}` |
| `payment.succeeded` | Payment completed | `{payment_id, amount, currency}` |
| `payment.failed` | Payment failed | `{payment_id, error}` |
| `plugin.installed` | Plugin installed | `{plugin_id, tenant_id}` |
| `plugin.uninstalled` | Plugin uninstalled | `{plugin_id, tenant_id}` |
| `content.published` | Wagtail page published | `{page_id, title, url}` |
| `lead.captured` | New lead captured | `{lead_id, source, data}` |
| `tool.executed` | AI tool run | `{tool_slug, user_id, credits_used}` |

### Webhook Security
- **Signature**: `X-Maximus-Signature` header (HMAC-SHA256 of payload with webhook secret)
- **Timestamp**: `X-Maximus-Timestamp` (prevent replay attacks, 5min tolerance)
- **Verification**: Compute HMAC(payload + timestamp) and compare

---

## Blog & Content (Wagtail)
| Method | Endpoint | Description |
|--------|----------|-------------|
| `GET` | `/blog/posts/` | List published posts (paginated) |
| `GET` | `/blog/posts/{slug}/` | Get post details |
| `GET` | `/blog/categories/` | List categories |
| `GET` | `/blog/tags/` | List tags |
| `GET` | `/blog/search/` | Full-text search (Meilisearch) |

---

## Error Codes

| Code | HTTP Status | Description |
|------|-------------|-------------|
| `AUTHENTICATION_FAILED` | 401 | Invalid or missing API key |
| `PERMISSION_DENIED` | 403 | Insufficient scope/permissions |
| `RATE_LIMIT_EXCEEDED` | 429 | Too many requests |
| `VALIDATION_ERROR` | 400 | Request body invalid |
| `NOT_FOUND` | 404 | Resource doesn't exist |
| `QUOTA_EXCEEDED` | 402 | AI credits or plan limit reached |
| `WEBHOOK_VERIFICATION_FAILED` | 400 | Invalid signature |
| `INTERNAL_ERROR` | 500 | Server error |

---

## SDKs & Examples

### Python
```python
import httpx

client = httpx.Client(
    base_url="https://api.maximus.dev/v1",
    headers={"Authorization": "Bearer YOUR_API_KEY"}
)

# Run AI tool
response = client.post("/tools/seo-title-generator/run/", json={
    "topic": "Best practices for SaaS pricing",
    "tone": "professional"
})
print(response.json())
```

### JavaScript/TypeScript
```typescript
const api = axios.create({
  baseURL: "https://api.maximus.dev/v1",
  headers: { Authorization: "Bearer YOUR_API_KEY" }
});

// Run AI tool
const result = await api.post("/tools/seo-title-generator/run/", {
  topic: "Best practices for SaaS pricing",
  tone: "professional"
});
```

### cURL
```bash
curl -X POST https://api.maximus.dev/v1/tools/seo-title-generator/run/ \
  -H "Authorization: Bearer YOUR_API_KEY" \
  -H "Content-Type: application/json" \
  -d '{"topic": "SaaS pricing", "tone": "professional"}'
```

---

## OpenAPI / Swagger
Interactive documentation available at:
```
https://api.maximus.dev/api/docs/
```

Download OpenAPI spec:
```
https://api.maximus.dev/api/schema/
```

---

## Changelog
| Version | Date | Changes |
|---------|------|---------|
| **v2** | 2026-07-02 | Full endpoint inventory for 19-app architecture |
| **v1** | 2026-06-21 | Initial basic endpoints |

---

**Last Updated:** 2026-07-02  
**Source of Truth:** Backend route files (`backend/apps/*/urls.py`)