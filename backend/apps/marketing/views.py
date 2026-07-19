from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import permissions
from .models import EmailSettings
from .serializers import EmailSettingsSerializer


class EmailSettingsView(APIView):
    permission_classes = [permissions.IsAdminUser]

    def get(self, request):
        settings = EmailSettings.load()
        serializer = EmailSettingsSerializer(settings)
        return Response({'success': True, 'data': serializer.data})
