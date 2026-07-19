import json
import logging

from django.shortcuts import render
from django.http import HttpResponse
from rest_framework.decorators import api_view, permission_classes
from rest_framework.permissions import AllowAny
from rest_framework.response import Response
from .analyzer import generate_keyword_ideas, calculate_keyword_difficulty
from .exporter import export_keywords_to_csv

logger = logging.getLogger(__name__)


def keyword_tool_page(request):
    return render(request, 'keyword_research/tool_form.html')


@api_view(['POST'])
@permission_classes([AllowAny])
def run_keyword_research(request):
    seed = request.data.get('keyword')
    if not seed:
        return Response({'success': False, 'error': 'Keyword is required'}, status=400)

    keywords = generate_keyword_ideas(seed)
    results = []
    for kw in keywords[:15]:
        difficulty = calculate_keyword_difficulty(kw, [])
        results.append({'keyword': kw, 'difficulty': difficulty})

    return Response({'success': True, 'seed_keyword': seed, 'results': results})


@api_view(['POST'])
@permission_classes([AllowAny])
def export_keywords(request):
    try:
        data = json.loads(request.body)
        keywords = data.get('keywords', [])
        csv_data = export_keywords_to_csv(keywords)
        response = HttpResponse(csv_data, content_type='text/csv')
        response['Content-Disposition'] = 'attachment; filename="keywords.csv"'
        return response
    except (json.JSONDecodeError, TypeError) as e:
        return Response({'success': False, 'error': str(e)}, status=400)