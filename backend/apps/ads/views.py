from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import permissions
from .models import AdBanner, PopupBanner
from .serializers import AdBannerSerializer, PopupBannerSerializer


class ActiveBannersView(APIView):
    permission_classes = [permissions.AllowAny]

    def get(self, request, placement=None):
        qs = AdBanner.objects.filter(is_active=True)
        if placement:
            qs = qs.filter(placement=placement)
        serializer = AdBannerSerializer(qs, many=True)
        return Response({'success': True, 'data': serializer.data})


class ActivePopupsView(APIView):
    permission_classes = [permissions.AllowAny]

    def get(self, request):
        popups = PopupBanner.objects.filter(is_active=True)
        serializer = PopupBannerSerializer(popups, many=True)
        return Response({'success': True, 'data': serializer.data})
