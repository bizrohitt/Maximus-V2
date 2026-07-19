from apps.audit.models import AuditLog
from apps.users.models import User
from apps.tenants.models import Tenant


def log_action(
    user: User = None,
    action: str = "",
    model_name: str = "",
    object_id: str = "",
    details: dict = None,
    tenant: Tenant = None,
    ip_address: str = None
):
    """Log an audit event."""
    return AuditLog.objects.create(
        user=user,
        action=action,
        model_name=model_name,
        object_id=object_id,
        details=details or {},
        tenant=tenant,
        ip_address=ip_address
    )