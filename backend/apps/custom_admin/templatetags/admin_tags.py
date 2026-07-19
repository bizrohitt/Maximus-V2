from django import template
from django.urls import reverse, resolve

register = template.Library()


@register.simple_tag(takes_context=True)
def admin_nav_active(context, url_name):
    """Return 'active' if the current path matches the given url_name."""
    request = context.get('request')
    if not request:
        return ''
    try:
        resolved_url = reverse(url_name)
        if request.path.startswith(resolved_url):
            return 'active'
    except Exception:
        pass
    return ''


@register.filter
def currency(value):
    """Format a number as currency."""
    try:
        return f"${float(value):,.2f}"
    except (ValueError, TypeError):
        return "$0.00"


@register.filter
def short_number(value):
    """Format large numbers: 1000 -> 1K, 1000000 -> 1M."""
    try:
        num = float(value)
        if num >= 1_000_000:
            return f"{num / 1_000_000:.1f}M"
        if num >= 1_000:
            return f"{num / 1_000:.1f}K"
        return str(int(num))
    except (ValueError, TypeError):
        return "0"
