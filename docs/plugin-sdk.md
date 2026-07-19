# Plugin SDK Documentation

## Overview

Maximus supports a plugin system for extending functionality. Plugins are Django apps that integrate with the core platform via a standardized API.

## Plugin Architecture

```
┌─────────────────────────────────────────────┐
│                Plugin System                │
├─────────────────────────────────────────────┤
│  Plugin Model          → Core metadata      │
│  PluginReview          → Ratings & reviews  │
│  marketplace.py        → Plugin listings    │
│  revenue.py            → Revenue sharing    │
│  services.py           → Install/uninstall  │
└─────────────────────────────────────────────┘
```

## Plugin Model

All plugins inherit from `BaseModel` and have:

| Field | Type | Description |
|-------|------|-------------|
| `name` | CharField | Plugin display name |
| `slug` | SlugField | Unique identifier |
| `version` | CharField | Semantic version |
| `description` | TextField | Plugin description |
| `author` | CharField | Plugin author |
| `is_active` | BooleanField | Enable/disable |
| `config_schema` | JSONField | Configuration schema |
| `price` | DecimalField | Plugin price |
| `download_count` | PositiveIntegerField | Download counter |

## Creating a Plugin

### Step 1: Create a Django App

```bash
python manage.py startapp my_plugin backend/apps/my_plugin
```

### Step 2: Register the Plugin

```python
# backend/apps/my_plugin/models.py
from apps.plugins.models import Plugin

class MyPlugin(Plugin):
    """Your plugin model."""
    custom_field = models.CharField(max_length=255)
    
    class Meta:
        verbose_name = "My Plugin"
        verbose_name_plural = "My Plugins"
```

### Step 3: Define Configuration Schema

```python
# backend/apps/my_plugin/config.py
PLUGIN_CONFIG_SCHEMA = {
    "type": "object",
    "properties": {
        "api_key": {"type": "string", "title": "API Key"},
        "enabled_features": {
            "type": "array",
            "items": {"type": "string"},
            "title": "Enabled Features"
        }
    },
    "required": ["api_key"]
}
```

### Step 4: Register in Admin

```python
# backend/apps/my_plugin/admin.py
from django.contrib import admin
from .models import MyPlugin

@admin.register(MyPlugin)
class MyPluginAdmin(admin.ModelAdmin):
    list_display = ('name', 'version', 'author', 'is_active')
    list_filter = ('is_active', 'author')
    search_fields = ('name', 'description')
```

## Plugin Configuration

Plugins use `config_schema` to define their configuration:

```python
# Example config_schema
{
    "api_key": "sk-1234567890",
    "enabled_features": ["feature1", "feature2"],
    "settings": {
        "timeout": 30,
        "retries": 3
    }
}
```

## Plugin Marketplace

### Listing a Plugin

```python
from apps.plugins.marketplace import create_plugin_listing

# Create a new plugin listing
plugin = create_plugin_listing(
    name="My Awesome Plugin",
    slug="my-awesome-plugin",
    version="1.0.0",
    description="A plugin that does amazing things",
    author="Your Name",
    price=29.99
)
```

### Getting Marketplace Plugins

```python
from apps.plugins.marketplace import get_marketplace_plugins

# Get all active plugins
plugins = get_marketplace_plugins()
```

## Revenue Sharing

Maximus uses an 80/20 revenue split:

- **80%** goes to plugin author
- **20%** goes to Maximus platform

```python
from apps.plugins.revenue import calculate_revenue_share

# Calculate revenue share
result = calculate_revenue_share(plugin_price=29.99)
# Returns: {'platform_share': 6.0, 'author_share': 23.99, 'platform_fee_percentage': '20%'}
```

## Plugin Installation

### Installing for a Tenant

```python
from apps.plugins.services import install_plugin
from apps.tenants.models import Tenant

# Install plugin for a tenant
result = install_plugin(tenant=tenant, plugin=plugin)
# Returns: {'status': 'installed', 'tenant': 'tenant-slug', 'plugin': 'plugin-slug', 'version': '1.0.0'}
```

### Uninstalling

```python
from apps.plugins.services import uninstall_plugin

# Uninstall plugin from tenant
result = uninstall_plugin(tenant=tenant, plugin=plugin)
# Returns: {'status': 'uninstalled', 'tenant': 'tenant-slug', 'plugin': 'plugin-slug'}
```

## Enterprise Features

### White-label Branding
- Per-tenant logo, colors, domain, email templates
- Configure via `Tenant.branding`

### SSO Integration
- SAML and OIDC support
- Implement via `tenants/sso.py`

### Custom Billing Tiers
- Plugin pricing can be tied to subscription plans
- Use `price` field in Plugin model

## Plugin Development Guidelines

1. **Follow Django conventions** — Use models, views, templates as needed
2. **Use design tokens** — All UI must use CSS custom properties
3. **Include tests** — Write unit tests for your plugin
4. **Document configuration** — Define clear `config_schema`
5. **Version your plugin** — Use semantic versioning

## Plugin API Endpoints

| Endpoint | Method | Description |
|----------|--------|-------------|
| `/api/v1/plugins/` | GET | List all plugins |
| `/api/v1/plugins/{slug}/` | GET | Get plugin details |
| `/api/v1/plugins/{slug}/install/` | POST | Install plugin |
| `/api/v1/plugins/{slug}/uninstall/` | POST | Uninstall plugin |
| `/api/v1/plugins/{slug}/reviews/` | GET | Get plugin reviews |
| `/api/v1/plugins/{slug}/reviews/` | POST | Add plugin review |

## Troubleshooting

### Plugin Not Showing
- Check `is_active` is `True`
- Verify plugin is registered in Django admin
- Check database migrations are applied

### Configuration Errors
- Validate `config_schema` JSON
- Check required fields are provided
- Verify API keys are valid

### Installation Issues
- Ensure plugin app is in `INSTALLED_APPS`
- Check for migration conflicts
- Verify tenant permissions

---

**Last Updated:** 2026-07-02  
**Version:** 2.0 (reflects actual 19-app codebase)  
**Source of Truth:** [PROJECT_STATE.md](PROJECT_STATE.md)