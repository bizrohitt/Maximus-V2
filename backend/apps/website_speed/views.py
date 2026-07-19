from django.shortcuts import render
from rest_framework.decorators import api_view, permission_classes
from rest_framework.permissions import AllowAny
from rest_framework.response import Response
from .analyzer import analyze_page_performance
from .scoring import calculate_speed_score


def speed_test_page(request):
    return render(request, 'website_speed/tool_form.html')


@api_view(['POST'])
@permission_classes([AllowAny])
def run_speed_test(request):
    url = request.data.get('url')
    if not url:
        return Response({'success': False, 'error': 'URL is required'}, status=400)

    result = analyze_page_performance(url)
    if result.get("success"):
        scoring = calculate_speed_score(result)
        result["score"] = scoring["score"]
        result["recommendations"] = scoring["recommendations"]

    return Response(result)