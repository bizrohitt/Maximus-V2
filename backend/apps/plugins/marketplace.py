from apps.plugins.models import Plugin


def create_plugin_listing(
    name: str,
    slug: str,
    version: str,
    description: str,
    author: str,
    price: float = 0.0
):
    """Create a new plugin available in the marketplace."""
    return Plugin.objects.create(
        name=name,
        slug=slug,
        version=version,
        description=description,
        author=author,
        config_schema={"price": price}
    )


def get_marketplace_plugins():
    """Get all plugins for the marketplace."""
    return Plugin.objects.filter(is_active=True).order_by('-created_at')