from rest_framework import viewsets, permissions
from .models import AuditLog
from .serializers import AuditLogSerializer


class AuditLogViewSet(viewsets.ReadOnlyModelViewSet):
    serializer_class = AuditLogSerializer
    permission_classes = [permissions.IsAdminUser]

    def get_queryset(self):
        return AuditLog.objects.all().select_related('user', 'tenant')
