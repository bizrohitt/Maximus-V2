from django.contrib import admin
from django.urls import path, include
from django.conf import settings
from django.conf.urls.static import static

urlpatterns = [
    # Honeypot traps — MUST be first so they shadow any real routes
    path('', include('apps.core.honeypot_urls')),
    path('admin/', include('apps.custom_admin.urls')),
    path('django-admin/', admin.site.urls),
    path('api/v1/', include('apps.api.urls')),
    path('api/v1/', include('apps.api.v1.urls')),
]

if settings.DEBUG:
    urlpatterns += static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)
