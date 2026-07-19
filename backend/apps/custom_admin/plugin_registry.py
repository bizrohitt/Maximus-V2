"""
Maximus Advanced Plugin Hook System
===================================
This module allows extensions to register:
- Menu items
- Dashboard widgets
- Custom admin pages
"""

from typing import Dict, List, Any
from datetime import datetime

# Registry storage
REGISTERED_EXTENSIONS: Dict[str, Dict[str, Any]] = {}


def register_extension(
    slug: str,
    name: str,
    version: str,
    menu_items: List[Dict] = None,
    widgets: List[Dict] = None,
    admin_pages: List[Dict] = None,
    metadata: Dict = None
):
    """
    Register an extension and its capabilities.
    """
    REGISTERED_EXTENSIONS[slug] = {
        "name": name,
        "version": version,
        "registered_at": datetime.now().isoformat(),
        "menu_items": menu_items or [],
        "widgets": widgets or [],
        "admin_pages": admin_pages or [],
        "metadata": metadata or {},
    }


def unregister_extension(slug: str):
    """Remove an extension from the registry."""
    REGISTERED_EXTENSIONS.pop(slug, None)


def get_registered_extensions() -> Dict[str, Dict[str, Any]]:
    return REGISTERED_EXTENSIONS


def get_extension_menu_items() -> List[Dict]:
    """Return all menu items registered by active extensions."""
    items = []
    for ext in REGISTERED_EXTENSIONS.values():
        items.extend(ext.get("menu_items", []))
    return items


def get_extension_widgets() -> List[Dict]:
    """Return all widgets registered by active extensions."""
    widgets = []
    for ext in REGISTERED_EXTENSIONS.values():
        widgets.extend(ext.get("widgets", []))
    return widgets


def get_extension_admin_pages() -> List[Dict]:
    """Return all custom admin pages registered by extensions."""
    pages = []
    for ext in REGISTERED_EXTENSIONS.values():
        pages.extend(ext.get("admin_pages", []))
    return pages


def is_extension_registered(slug: str) -> bool:
    return slug in REGISTERED_EXTENSIONS
