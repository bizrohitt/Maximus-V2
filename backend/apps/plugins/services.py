from apps.plugins.models import Plugin
from apps.tenants.models import Tenant


def install_plugin(tenant: Tenant, plugin: Plugin):
    """Install a plugin for a specific tenant."""
    # In production: copy plugin files, run migrations, register
    return {
        "status": "installed",
        "tenant": tenant.slug,
        "plugin": plugin.slug,
        "version": plugin.version
    }


def uninstall_plugin(tenant: Tenant, plugin: Plugin):
    """Uninstall a plugin from a tenant."""
    return {
        "status": "uninstalled",
        "tenant": tenant.slug,
        "plugin": plugin.slug
    }


def get_available_plugins():
    """Return all active plugins."""
    return Plugin.objects.filter(is_active=True)