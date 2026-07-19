from rest_framework import viewsets, permissions
from .models import Tool, ToolUsage
from .serializers import ToolSerializer, ToolUsageSerializer


class ToolViewSet(viewsets.ReadOnlyModelViewSet):
    queryset = Tool.objects.filter(is_active=True)
    serializer_class = ToolSerializer
    permission_classes = [permissions.AllowAny]


class ToolUsageViewSet(viewsets.ModelViewSet):
    serializer_class = ToolUsageSerializer
    permission_classes = [permissions.IsAuthenticated]

    def get_queryset(self):
        return ToolUsage.objects.filter(user=self.request.user)

    def perform_create(self, serializer):
        serializer.save(user=self.request.user)
