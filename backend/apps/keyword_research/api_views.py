from rest_framework.decorators import api_view, permission_classes
from rest_framework.permissions import AllowAny
from rest_framework.response import Response
from .analyzer import generate_keyword_ideas, calculate_keyword_difficulty


@api_view(['POST'])
@permission_classes([AllowAny])
def keyword_research_api(request):
    seed = request.data.get('keyword')
    if not seed:
        return Response({'success': False, 'error': 'Keyword is required'}, status=400)

    keywords = generate_keyword_ideas(seed)
    results = []
    for kw in keywords[:15]:
        difficulty = calculate_keyword_difficulty(kw, [])
        results.append({'keyword': kw, 'difficulty': difficulty})

    return Response({'success': True, 'seed_keyword': seed, 'results': results})
