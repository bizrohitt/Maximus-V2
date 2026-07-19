from django.urls import path
from .views import ActiveBannersView, ActivePopupsView

urlpatterns = [
    path('banners/', ActiveBannersView.as_view(), name='active-banners'),
    path('banners/<str:placement>/', ActiveBannersView.as_view(), name='active-banners-placement'),
    path('popups/', ActivePopupsView.as_view(), name='active-popups'),
]
