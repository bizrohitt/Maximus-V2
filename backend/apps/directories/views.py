from rest_framework import viewsets, permissions
from .models import DirectoryEntry
from .serializers import DirectoryEntrySerializer


class DirectoryEntryViewSet(viewsets.ReadOnlyModelViewSet):
    queryset = DirectoryEntry.objects.filter(is_active=True)
    serializer_class = DirectoryEntrySerializer
    permission_classes = [permissions.AllowAny]
