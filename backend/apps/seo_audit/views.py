from django.shortcuts import render
from rest_framework.decorators import api_view, permission_classes
from rest_framework.permissions import AllowAny
from rest_framework.response import Response
from .analyzer import run_seo_audit


def seo_audit_page(request):
    return render(request, 'seo_audit/audit_form.html')


@api_view(['POST'])
@permission_classes([AllowAny])
def run_audit(request):
    url = request.data.get('url')
    if not url:
        return Response({'success': False, 'error': 'URL is required'}, status=400)

    result = run_seo_audit(url)
    return Response(result)