from rest_framework import viewsets, permissions
from .models import Tenant, TenantUser
from .serializers import TenantSerializer, TenantUserSerializer


class TenantViewSet(viewsets.ModelViewSet):
    serializer_class = TenantSerializer
    permission_classes = [permissions.IsAuthenticated]

    def get_queryset(self):
        if self.request.user.is_staff:
            return Tenant.objects.all()
        return Tenant.objects.filter(tenantuser__user=self.request.user)


class TenantUserViewSet(viewsets.ModelViewSet):
    serializer_class = TenantUserSerializer
    permission_classes = [permissions.IsAuthenticated]

    def get_queryset(self):
        return TenantUser.objects.filter(user=self.request.user)
