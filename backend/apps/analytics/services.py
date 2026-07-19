from apps.analytics.models import Event, PageView


def track_event(name: str, visitor_id=None, properties=None, url=""):
    return Event.objects.create(
        name=name[:100],
        properties=properties or {},
        url=url[:500],
        visitor_id=visitor_id or '',
    )


def track_page_view(url: str, visitor_id=None, referrer="", ip_address=None, user_agent="", country=""):
    return PageView.objects.create(
        url=url[:500],
        referrer=referrer[:500],
        visitor_id=visitor_id or '',
        ip_address=ip_address,
        user_agent=user_agent[:500],
        country=country[:2],
    )
