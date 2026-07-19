from rest_framework import viewsets, permissions
from .models import Resource
from .serializers import ResourceSerializer


class ResourceViewSet(viewsets.ReadOnlyModelViewSet):
    queryset = Resource.objects.filter(is_active=True)
    serializer_class = ResourceSerializer
    permission_classes = [permissions.AllowAny]
