"""
Advanced Role-Based Access Control for Tenants
"""

ROLES = {
    'owner': ['all'],
    'admin': ['manage_users', 'manage_plugins', 'view_analytics'],
    'editor': ['create_content', 'edit_content'],
    'viewer': ['view_content'],
}


def has_permission(tenant_user, permission: str) -> bool:
    """Check if a tenant user has a specific permission."""
    role = tenant_user.role
    if role == 'owner':
        return True
    return permission in ROLES.get(role, [])