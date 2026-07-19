from rest_framework import serializers
from .models import AuditLog


class AuditLogSerializer(serializers.ModelSerializer):
    user_email = serializers.CharField(source='user.email', read_only=True, default=None)

    class Meta:
        model = AuditLog
        fields = ('id', 'user', 'user_email', 'tenant', 'action', 'model_name', 'object_id', 'details', 'ip_address', 'created_at')
