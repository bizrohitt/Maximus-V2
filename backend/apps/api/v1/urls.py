from django.urls import path, include
from rest_framework.routers import DefaultRouter
from apps.keyword_research.api_views import keyword_research_api
from apps.seo_audit.api_views import seo_audit_api
from apps.website_speed.api_views import website_speed_api

router = DefaultRouter()

urlpatterns = [
    path('', include(router.urls)),
    path('', include('apps.users.urls')),
    # path('', include('apps.blog.urls')),  # requires wagtail
    path('', include('apps.tools.urls')),
    path('', include('apps.downloads.urls')),
    path('', include('apps.resources.urls')),
    path('', include('apps.leads.urls')),
    path('', include('apps.directories.urls')),
    path('', include('apps.subscriptions.urls')),
    path('', include('apps.ai.urls')),
    path('', include('apps.analytics.urls')),
    path('', include('apps.plugins.urls')),
    path('', include('apps.tenants.urls')),
    path('', include('apps.marketing.urls')),
    path('', include('apps.webhooks.urls')),
    path('', include('apps.audit.urls')),
    path('', include('apps.ads.urls')),
    path('keyword-research/', keyword_research_api, name='keyword-research'),
    path('seo-audit/', seo_audit_api, name='seo-audit'),
    path('website-speed/', website_speed_api, name='website-speed'),
]
