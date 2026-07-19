import json
from datetime import timedelta, date
from collections import Counter

from django.http import JsonResponse
from django.utils import timezone
from django.views.decorators.csrf import csrf_exempt
from django.views.decorators.http import require_GET, require_POST
from django.db.models import Count, Q
from django.db.models.functions import TruncDate

from .models import PageView, Event, DailyStats


@csrf_exempt
@require_POST
def track_pageview(request):
    try:
        data = json.loads(request.body)
    except (json.JSONDecodeError, ValueError):
        return JsonResponse({'error': 'Invalid JSON'}, status=400)

    url = data.get('url', '')
    if not url:
        return JsonResponse({'error': 'url is required'}, status=400)

    PageView.objects.create(
        url=url[:500],
        referrer=data.get('referrer', '')[:500],
        visitor_id=data.get('visitor_id', '')[:64],
        ip_address=_get_client_ip(request),
        user_agent=request.headers.get('User-Agent', '')[:500],
        country=data.get('country', '')[:2],
    )
    return JsonResponse({'ok': True})


@csrf_exempt
@require_POST
def track_event(request):
    try:
        data = json.loads(request.body)
    except (json.JSONDecodeError, ValueError):
        return JsonResponse({'error': 'Invalid JSON'}, status=400)

    name = data.get('name', '')
    if not name:
        return JsonResponse({'error': 'name is required'}, status=400)

    Event.objects.create(
        name=name[:100],
        properties=data.get('properties', {}),
        url=data.get('url', '')[:500],
        visitor_id=data.get('visitor_id', '')[:64],
    )
    return JsonResponse({'ok': True})


@csrf_exempt
@require_POST
def track_batch(request):
    try:
        data = json.loads(request.body)
    except (json.JSONDecodeError, ValueError):
        return JsonResponse({'error': 'Invalid JSON'}, status=400)

    events = data.get('events', [])
    pageviews = []
    event_objs = []

    for item in events:
        event_type = item.get('type', 'event')
        if event_type == 'pageview':
            url = item.get('url', '')
            if url:
                pageviews.append(PageView(
                    url=url[:500],
                    referrer=item.get('referrer', '')[:500],
                    visitor_id=item.get('visitor_id', '')[:64],
                    ip_address=_get_client_ip(request),
                    user_agent=request.headers.get('User-Agent', '')[:500],
                ))
        else:
            name = item.get('name', '')
            if name:
                event_objs.append(Event(
                    name=name[:100],
                    properties=item.get('properties', {}),
                    url=item.get('url', '')[:500],
                    visitor_id=item.get('visitor_id', '')[:64],
                ))

    if pageviews:
        PageView.objects.bulk_create(pageviews)
    if event_objs:
        Event.objects.bulk_create(event_objs)

    return JsonResponse({'ok': True, 'tracked': len(pageviews) + len(event_objs)})


@require_GET
def dashboard_stats(request):
    now = timezone.now()
    today = now.date()
    week_ago = today - timedelta(days=7)
    month_ago = today - timedelta(days=30)

    today_views = PageView.objects.filter(created_at__date=today).count()
    week_views = PageView.objects.filter(created_at__date__gte=week_ago).count()
    month_views = PageView.objects.filter(created_at__date__gte=month_ago).count()
    total_views = PageView.objects.count()

    today_events = Event.objects.filter(created_at__date=today).count()
    week_events = Event.objects.filter(created_at__date__gte=week_ago).count()
    month_events = Event.objects.filter(created_at__date__gte=month_ago).count()

    today_visitors = PageView.objects.filter(created_at__date=today).values('visitor_id').distinct().count()
    week_visitors = PageView.objects.filter(created_at__date__gte=week_ago).values('visitor_id').distinct().count()

    return JsonResponse({
        'page_views': {
            'today': today_views,
            'week': week_views,
            'month': month_views,
            'total': total_views,
        },
        'events': {
            'today': today_events,
            'week': week_events,
            'month': month_events,
        },
        'visitors': {
            'today': today_visitors,
            'week': week_visitors,
        },
    })


@require_GET
def page_views_list(request):
    days = int(request.GET.get('days', 30))
    start_date = timezone.now().date() - timedelta(days=days)

    daily = (
        PageView.objects
        .filter(created_at__date__gte=start_date)
        .annotate(date=TruncDate('created_at'))
        .values('date')
        .annotate(count=Count('id'))
        .order_by('date')
    )

    return JsonResponse({
        'data': [{'date': str(d['date']), 'count': d['count']} for d in daily]
    })


@require_GET
def top_pages(request):
    days = int(request.GET.get('days', 7))
    limit = int(request.GET.get('limit', 10))
    start_date = timezone.now().date() - timedelta(days=days)

    pages = (
        PageView.objects
        .filter(created_at__date__gte=start_date)
        .values('url')
        .annotate(count=Count('id'))
        .order_by('-count')[:limit]
    )

    return JsonResponse({
        'data': [{'url': p['url'], 'count': p['count']} for p in pages]
    })


@require_GET
def top_referrers(request):
    days = int(request.GET.get('days', 7))
    limit = int(request.GET.get('limit', 10))
    start_date = timezone.now().date() - timedelta(days=days)

    referrers = (
        PageView.objects
        .filter(created_at__date__gte=start_date)
        .exclude(referrer='')
        .values('referrer')
        .annotate(count=Count('id'))
        .order_by('-count')[:limit]
    )

    return JsonResponse({
        'data': [{'referrer': r['referrer'], 'count': r['count']} for r in referrers]
    })


@require_GET
def events_list(request):
    days = int(request.GET.get('days', 30))
    limit = int(request.GET.get('limit', 50))
    start_date = timezone.now().date() - timedelta(days=days)

    events = Event.objects.filter(created_at__date__gte=start_date)[:limit]

    return JsonResponse({
        'data': [{
            'id': e.id,
            'name': e.name,
            'properties': e.properties,
            'url': e.url,
            'visitor_id': e.visitor_id,
            'created_at': e.created_at.isoformat(),
        } for e in events]
    })


@require_GET
def event_breakdown(request):
    days = int(request.GET.get('days', 7))
    start_date = timezone.now().date() - timedelta(days=days)

    breakdown = (
        Event.objects
        .filter(created_at__date__gte=start_date)
        .values('name')
        .annotate(count=Count('id'))
        .order_by('-count')
    )

    return JsonResponse({
        'data': [{'name': b['name'], 'count': b['count']} for b in breakdown]
    })


def _get_client_ip(request):
    x_forwarded = request.META.get('HTTP_X_FORWARDED_FOR')
    if x_forwarded:
        return x_forwarded.split(',')[0].strip()
    return request.META.get('REMOTE_ADDR')
