from django.urls import path, include

urlpatterns = [
    path('auth/token/', include('apps.users.auth_urls')),
    path('', include('apps.admin_api.urls')),
]
