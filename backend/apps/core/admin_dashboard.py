from django.contrib import admin
from django.db.models import Count
from django.utils import timezone
from datetime import timedelta

from apps.analytics.models import PageView, Event


class MaximusAdminSite(admin.AdminSite):
    site_header = "Maximus Admin"
    site_title = "Maximus"
    index_title = "Dashboard Overview"

    def index(self, request, extra_context=None):
        today = timezone.now().date()
        last_30_days = today - timedelta(days=30)

        page_views = PageView.objects.count()
        recent_events = Event.objects.filter(
            created_at__date__gte=last_30_days
        ).values('name').annotate(count=Count('id')).order_by('-count')[:5]

        context = {
            'page_views': page_views,
            'recent_events': recent_events,
        }

        if extra_context:
            context.update(extra_context)

        return super().index(request, context)


admin_site = MaximusAdminSite(name='maximus_admin')
