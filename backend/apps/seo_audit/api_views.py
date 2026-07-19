# backend/apps/seo_audit/api_views.py

from rest_framework.decorators import api_view, permission_classes
from rest_framework.permissions import AllowAny
from rest_framework.response import Response
from .analyzer import run_seo_audit


@api_view(['POST'])
@permission_classes([AllowAny])
def seo_audit_api(request):
    """
    Public API endpoint for SEO Audit Tool.
    Accepts a URL and returns a full SEO report.
    """
    url = request.data.get('url')

    if not url:
        return Response({
            "success": False,
            "error": "URL is required"
        }, status=400)

    result = run_seo_audit(url)
    return Response(result)